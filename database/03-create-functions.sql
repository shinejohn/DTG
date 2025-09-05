-- =========================================================================
-- DOWNTOWN GUIDE - DATABASE FUNCTIONS
-- STEP 3: CREATE ALL FUNCTIONS
-- =========================================================================
-- This file creates all custom functions used throughout the application
-- Run this AFTER 02-create-indexes.sql

-- -------------------------------------------------------------------------
-- UTILITY FUNCTIONS
-- -------------------------------------------------------------------------

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate a random referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
    i INTEGER;
BEGIN
    FOR i IN 1..8 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate distance between two points (in miles)
CREATE OR REPLACE FUNCTION public.calculate_distance(
    lat1 DECIMAL(10,8),
    lon1 DECIMAL(11,8),
    lat2 DECIMAL(10,8),
    lon2 DECIMAL(11,8)
)
RETURNS DECIMAL AS $$
DECLARE
    R DECIMAL := 3959; -- Radius of Earth in miles
    dlat DECIMAL;
    dlon DECIMAL;
    a DECIMAL;
    c DECIMAL;
BEGIN
    dlat := radians(lat2 - lat1);
    dlon := radians(lon2 - lon1);
    a := sin(dlat/2) * sin(dlat/2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2) * sin(dlon/2);
    c := 2 * atan2(sqrt(a), sqrt(1-a));
    RETURN R * c;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- BUSINESS FUNCTIONS
-- -------------------------------------------------------------------------

-- Function to update business rating when reviews change
CREATE OR REPLACE FUNCTION public.update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP IN ('INSERT', 'UPDATE') THEN
        UPDATE public.businesses 
        SET 
            average_rating = (
                SELECT ROUND(AVG(rating)::numeric, 2) 
                FROM public.reviews 
                WHERE business_id = NEW.business_id AND status = 'published'
            ),
            review_count = (
                SELECT COUNT(*) 
                FROM public.reviews 
                WHERE business_id = NEW.business_id AND status = 'published'
            )
        WHERE id = NEW.business_id;
    END IF;
    
    IF TG_OP = 'DELETE' THEN
        UPDATE public.businesses 
        SET 
            average_rating = (
                SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) 
                FROM public.reviews 
                WHERE business_id = OLD.business_id AND status = 'published'
            ),
            review_count = (
                SELECT COUNT(*) 
                FROM public.reviews 
                WHERE business_id = OLD.business_id AND status = 'published'
            )
        WHERE id = OLD.business_id;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to check if business is currently open
CREATE OR REPLACE FUNCTION public.is_business_open(business_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    current_day INTEGER;
    current_time_val TIME;
    is_open BOOLEAN := false;
    special_hours RECORD;
    regular_hours RECORD;
BEGIN
    current_day := EXTRACT(DOW FROM NOW());
    current_time_val := NOW()::TIME;
    
    -- Check special hours first
    SELECT * INTO special_hours
    FROM public.business_special_hours
    WHERE business_id = is_business_open.business_id
    AND date = CURRENT_DATE;
    
    IF FOUND THEN
        IF special_hours.is_closed THEN
            RETURN false;
        ELSIF special_hours.open_time IS NOT NULL AND special_hours.close_time IS NOT NULL THEN
            RETURN current_time_val >= special_hours.open_time AND current_time_val <= special_hours.close_time;
        END IF;
    END IF;
    
    -- Check regular hours
    SELECT * INTO regular_hours
    FROM public.business_hours
    WHERE business_id = is_business_open.business_id
    AND day_of_week = current_day;
    
    IF FOUND THEN
        IF regular_hours.is_closed THEN
            RETURN false;
        ELSIF regular_hours.is_24_hours THEN
            RETURN true;
        ELSIF regular_hours.open_time IS NOT NULL AND regular_hours.close_time IS NOT NULL THEN
            RETURN current_time_val >= regular_hours.open_time AND current_time_val <= regular_hours.close_time;
        END IF;
    END IF;
    
    RETURN false;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- EVENT FUNCTIONS
-- -------------------------------------------------------------------------

-- Function to update event attendee count
CREATE OR REPLACE FUNCTION public.update_event_attendee_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE public.events
        SET attendee_count = (
            SELECT COUNT(*)
            FROM public.event_attendees
            WHERE event_id = NEW.event_id
            AND status = 'going'
        )
        WHERE id = NEW.event_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.events
        SET attendee_count = (
            SELECT COUNT(*)
            FROM public.event_attendees
            WHERE event_id = OLD.event_id
            AND status = 'going'
        )
        WHERE id = OLD.event_id;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to get upcoming events for a community
CREATE OR REPLACE FUNCTION public.get_upcoming_events(
    community_id UUID,
    limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    title VARCHAR(255),
    start_date TIMESTAMPTZ,
    location_name VARCHAR(255),
    event_category event_category,
    attendee_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.title,
        e.start_date,
        e.location_name,
        e.event_category,
        e.attendee_count
    FROM public.events e
    WHERE e.community_id = get_upcoming_events.community_id
    AND e.start_date >= NOW()
    AND e.status = 'published'
    ORDER BY e.start_date ASC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- GAMIFICATION FUNCTIONS
-- -------------------------------------------------------------------------

-- Function to award points to a user
CREATE OR REPLACE FUNCTION public.award_points(
    user_id UUID,
    community_id UUID,
    points_amount INTEGER,
    transaction_type VARCHAR(50),
    description TEXT,
    reference_type VARCHAR(50) DEFAULT NULL,
    reference_id UUID DEFAULT NULL
)
RETURNS void AS $$
DECLARE
    current_week_start DATE;
    current_month_start DATE;
BEGIN
    -- Calculate week and month starts
    current_week_start := date_trunc('week', NOW())::DATE;
    current_month_start := date_trunc('month', NOW())::DATE;
    
    -- Insert transaction record
    INSERT INTO public.point_transactions (
        user_id,
        community_id,
        points,
        transaction_type,
        description,
        reference_type,
        reference_id
    ) VALUES (
        award_points.user_id,
        award_points.community_id,
        points_amount,
        award_points.transaction_type,
        award_points.description,
        award_points.reference_type,
        award_points.reference_id
    );
    
    -- Update or insert user points
    INSERT INTO public.user_points (
        user_id,
        community_id,
        total_points,
        current_month_points,
        current_week_points
    ) VALUES (
        award_points.user_id,
        award_points.community_id,
        points_amount,
        points_amount,
        points_amount
    )
    ON CONFLICT (user_id, community_id) DO UPDATE SET
        total_points = user_points.total_points + points_amount,
        current_month_points = CASE 
            WHEN date_trunc('month', user_points.updated_at)::DATE = current_month_start 
            THEN user_points.current_month_points + points_amount
            ELSE points_amount
        END,
        current_week_points = CASE 
            WHEN date_trunc('week', user_points.updated_at)::DATE = current_week_start 
            THEN user_points.current_week_points + points_amount
            ELSE points_amount
        END,
        updated_at = NOW();
    
    -- Check and update level
    PERFORM public.update_user_level(award_points.user_id, award_points.community_id);
END;
$$ LANGUAGE plpgsql;

-- Function to update user level based on points
CREATE OR REPLACE FUNCTION public.update_user_level(
    user_id UUID,
    community_id UUID
)
RETURNS void AS $$
DECLARE
    user_total_points INTEGER;
    new_level INTEGER;
    level_threshold INTEGER;
BEGIN
    -- Get user's total points
    SELECT total_points INTO user_total_points
    FROM public.user_points
    WHERE user_id = update_user_level.user_id
    AND community_id = update_user_level.community_id;
    
    -- Calculate new level (100 points per level, exponential growth)
    new_level := FLOOR(SQRT(user_total_points / 50))::INTEGER + 1;
    level_threshold := POWER(new_level, 2) * 50;
    
    -- Update user level
    UPDATE public.user_points
    SET 
        level = new_level,
        level_progress = user_total_points - (POWER(new_level - 1, 2) * 50),
        level_threshold = level_threshold
    WHERE user_id = update_user_level.user_id
    AND community_id = update_user_level.community_id;
END;
$$ LANGUAGE plpgsql;

-- Function to process check-in
CREATE OR REPLACE FUNCTION public.process_check_in(
    p_user_id UUID,
    p_business_id UUID,
    p_latitude DECIMAL(10, 8),
    p_longitude DECIMAL(11, 8)
)
RETURNS TABLE (
    success BOOLEAN,
    points_earned INTEGER,
    streak_count INTEGER,
    message TEXT
) AS $$
DECLARE
    v_business RECORD;
    v_last_checkin RECORD;
    v_points_earned INTEGER := 10;
    v_streak_count INTEGER := 1;
    v_distance DECIMAL;
    v_community_id UUID;
BEGIN
    -- Get business details
    SELECT * INTO v_business
    FROM public.businesses
    WHERE id = p_business_id;
    
    IF NOT FOUND THEN
        RETURN QUERY SELECT false, 0, 0, 'Business not found'::TEXT;
        RETURN;
    END IF;
    
    v_community_id := v_business.community_id;
    
    -- Calculate distance to business
    v_distance := public.calculate_distance(
        p_latitude, p_longitude,
        v_business.latitude, v_business.longitude
    );
    
    -- Check if within 0.1 miles (528 feet)
    IF v_distance > 0.1 THEN
        RETURN QUERY SELECT false, 0, 0, 'You must be at the business location to check in'::TEXT;
        RETURN;
    END IF;
    
    -- Check last check-in
    SELECT * INTO v_last_checkin
    FROM public.check_ins
    WHERE user_id = p_user_id
    AND business_id = p_business_id
    ORDER BY created_at DESC
    LIMIT 1;
    
    -- Check if already checked in today
    IF FOUND AND v_last_checkin.created_at::DATE = CURRENT_DATE THEN
        RETURN QUERY SELECT false, 0, 0, 'You have already checked in here today'::TEXT;
        RETURN;
    END IF;
    
    -- Calculate streak
    IF FOUND AND v_last_checkin.created_at::DATE = CURRENT_DATE - INTERVAL '1 day' THEN
        v_streak_count := v_last_checkin.streak_count + 1;
        -- Bonus points for streak
        IF v_streak_count >= 7 THEN
            v_points_earned := v_points_earned + 20;
        ELSIF v_streak_count >= 3 THEN
            v_points_earned := v_points_earned + 10;
        END IF;
    END IF;
    
    -- Insert check-in
    INSERT INTO public.check_ins (
        user_id,
        business_id,
        community_id,
        latitude,
        longitude,
        points_earned,
        is_streak_continued,
        streak_count
    ) VALUES (
        p_user_id,
        p_business_id,
        v_community_id,
        p_latitude,
        p_longitude,
        v_points_earned,
        v_streak_count > 1,
        v_streak_count
    );
    
    -- Award points
    PERFORM public.award_points(
        p_user_id,
        v_community_id,
        v_points_earned,
        'check_in',
        'Check-in at ' || v_business.name,
        'check_in',
        p_business_id
    );
    
    -- Update user account stats
    UPDATE public.user_points
    SET check_ins_count = check_ins_count + 1
    WHERE user_id = p_user_id
    AND community_id = v_community_id;
    
    RETURN QUERY SELECT true, v_points_earned, v_streak_count, 'Check-in successful!'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Function to check achievement progress
CREATE OR REPLACE FUNCTION public.check_achievement_progress(
    p_user_id UUID,
    p_achievement_id UUID
)
RETURNS void AS $$
DECLARE
    v_achievement RECORD;
    v_user_stats RECORD;
    v_progress INTEGER := 0;
    v_is_completed BOOLEAN := false;
    v_community_id UUID;
BEGIN
    -- Get achievement details
    SELECT * INTO v_achievement
    FROM public.achievements
    WHERE id = p_achievement_id;
    
    IF NOT FOUND THEN
        RETURN;
    END IF;
    
    -- For now, we'll use the first community for the user
    -- In production, this would be more sophisticated
    SELECT community_id INTO v_community_id
    FROM public.user_points
    WHERE user_id = p_user_id
    LIMIT 1;
    
    -- Get user stats
    SELECT * INTO v_user_stats
    FROM public.user_points
    WHERE user_id = p_user_id
    AND community_id = v_community_id;
    
    -- Check progress based on achievement requirements
    -- This is simplified - in production, requirements would be JSON with specific criteria
    CASE v_achievement.category
        WHEN 'check_in' THEN
            v_progress := v_user_stats.check_ins_count;
        WHEN 'review' THEN
            v_progress := v_user_stats.reviews_count;
        WHEN 'photo' THEN
            v_progress := v_user_stats.photos_uploaded;
        WHEN 'deal' THEN
            v_progress := v_user_stats.deals_redeemed;
        WHEN 'points' THEN
            v_progress := v_user_stats.total_points;
        ELSE
            v_progress := 0;
    END CASE;
    
    -- For this example, let's say requirement is stored as a simple number in requirements JSONB
    -- In production, this would be more complex
    IF v_achievement.requirements->>'target' IS NOT NULL THEN
        v_is_completed := v_progress >= (v_achievement.requirements->>'target')::INTEGER;
    END IF;
    
    -- Update or insert user achievement progress
    INSERT INTO public.user_achievements (
        user_id,
        achievement_id,
        community_id,
        progress,
        is_completed,
        completed_at
    ) VALUES (
        p_user_id,
        p_achievement_id,
        v_community_id,
        v_progress,
        v_is_completed,
        CASE WHEN v_is_completed THEN NOW() ELSE NULL END
    )
    ON CONFLICT (user_id, achievement_id, community_id) DO UPDATE SET
        progress = v_progress,
        is_completed = v_is_completed,
        completed_at = CASE 
            WHEN v_is_completed AND user_achievements.completed_at IS NULL 
            THEN NOW() 
            ELSE user_achievements.completed_at 
        END,
        updated_at = NOW();
    
    -- Award points if newly completed
    IF v_is_completed AND v_achievement.point_reward > 0 THEN
        PERFORM public.award_points(
            p_user_id,
            v_community_id,
            v_achievement.point_reward,
            'achievement',
            'Completed achievement: ' || v_achievement.name,
            'achievement',
            p_achievement_id
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- SEARCH FUNCTIONS
-- -------------------------------------------------------------------------

-- Function to search businesses by location and filters
CREATE OR REPLACE FUNCTION public.search_businesses(
    p_community_id UUID,
    p_search_query TEXT DEFAULT NULL,
    p_category_id UUID DEFAULT NULL,
    p_latitude DECIMAL(10,8) DEFAULT NULL,
    p_longitude DECIMAL(11,8) DEFAULT NULL,
    p_radius_miles INTEGER DEFAULT 10,
    p_is_open_now BOOLEAN DEFAULT false,
    p_price_range TEXT[] DEFAULT NULL,
    p_min_rating DECIMAL(3,2) DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    category VARCHAR(100),
    average_rating DECIMAL(3,2),
    review_count INTEGER,
    price_range VARCHAR(10),
    distance_miles DECIMAL,
    is_open BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.name,
        b.category,
        b.average_rating,
        b.review_count,
        b.price_range,
        CASE 
            WHEN p_latitude IS NOT NULL AND p_longitude IS NOT NULL 
            THEN public.calculate_distance(p_latitude, p_longitude, b.latitude, b.longitude)
            ELSE NULL
        END AS distance_miles,
        public.is_business_open(b.id) AS is_open
    FROM public.businesses b
    WHERE b.community_id = p_community_id
    AND b.status = 'active'
    AND (p_search_query IS NULL OR 
         b.name ILIKE '%' || p_search_query || '%' OR
         b.description ILIKE '%' || p_search_query || '%')
    AND (p_category_id IS NULL OR b.category_id = p_category_id)
    AND (p_price_range IS NULL OR b.price_range = ANY(p_price_range))
    AND (p_min_rating IS NULL OR b.average_rating >= p_min_rating)
    AND (NOT p_is_open_now OR public.is_business_open(b.id))
    AND (p_latitude IS NULL OR p_longitude IS NULL OR
         public.calculate_distance(p_latitude, p_longitude, b.latitude, b.longitude) <= p_radius_miles)
    ORDER BY 
        CASE WHEN p_latitude IS NOT NULL AND p_longitude IS NOT NULL 
             THEN public.calculate_distance(p_latitude, p_longitude, b.latitude, b.longitude)
             ELSE 0 
        END ASC,
        b.average_rating DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- NOTIFICATION FUNCTIONS
-- -------------------------------------------------------------------------

-- Function to create a notification
CREATE OR REPLACE FUNCTION public.create_notification(
    p_user_id UUID,
    p_type VARCHAR(50),
    p_title VARCHAR(255),
    p_body TEXT,
    p_reference_type VARCHAR(50) DEFAULT NULL,
    p_reference_id UUID DEFAULT NULL,
    p_icon_url VARCHAR(500) DEFAULT NULL,
    p_action_url VARCHAR(500) DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_notification_id UUID;
BEGIN
    INSERT INTO public.notifications (
        user_id,
        type,
        title,
        body,
        reference_type,
        reference_id,
        icon_url,
        action_url
    ) VALUES (
        p_user_id,
        p_type,
        p_title,
        p_body,
        p_reference_type,
        p_reference_id,
        p_icon_url,
        p_action_url
    )
    RETURNING id INTO v_notification_id;
    
    RETURN v_notification_id;
END;
$$ LANGUAGE plpgsql;

-- Function to mark notifications as read
CREATE OR REPLACE FUNCTION public.mark_notifications_read(
    p_user_id UUID,
    p_notification_ids UUID[] DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE public.notifications
    SET is_read = true
    WHERE user_id = p_user_id
    AND (p_notification_ids IS NULL OR id = ANY(p_notification_ids))
    AND is_read = false;
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- END OF FUNCTION CREATION
-- =========================================================================
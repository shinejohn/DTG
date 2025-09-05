-- =========================================================================
-- DOWNTOWN GUIDE - DATABASE TRIGGERS
-- STEP 4: CREATE ALL TRIGGERS
-- =========================================================================
-- This file creates all triggers that automate database operations
-- Run this AFTER 03-create-functions.sql

-- -------------------------------------------------------------------------
-- TIMESTAMP UPDATE TRIGGERS
-- -------------------------------------------------------------------------

-- Communities
CREATE TRIGGER update_communities_updated_at
    BEFORE UPDATE ON public.communities
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Business categories
CREATE TRIGGER update_business_categories_updated_at
    BEFORE UPDATE ON public.business_categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Business subcategories
CREATE TRIGGER update_business_subcategories_updated_at
    BEFORE UPDATE ON public.business_subcategories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Article categories
CREATE TRIGGER update_article_categories_updated_at
    BEFORE UPDATE ON public.article_categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- User accounts
CREATE TRIGGER update_user_accounts_updated_at
    BEFORE UPDATE ON public.user_accounts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- User profiles
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Businesses
CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Business hours
CREATE TRIGGER update_business_hours_updated_at
    BEFORE UPDATE ON public.business_hours
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Business photos
CREATE TRIGGER update_business_photos_updated_at
    BEFORE UPDATE ON public.business_photos
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Menu items
CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON public.menu_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Organizations
CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Venues
CREATE TRIGGER update_venues_updated_at
    BEFORE UPDATE ON public.venues
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Events
CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Event attendees
CREATE TRIGGER update_event_attendees_updated_at
    BEFORE UPDATE ON public.event_attendees
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Articles
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Reviews
CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Deals
CREATE TRIGGER update_deals_updated_at
    BEFORE UPDATE ON public.deals
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Marketplace listings
CREATE TRIGGER update_marketplace_listings_updated_at
    BEFORE UPDATE ON public.marketplace_listings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- User points
CREATE TRIGGER update_user_points_updated_at
    BEFORE UPDATE ON public.user_points
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Achievements
CREATE TRIGGER update_achievements_updated_at
    BEFORE UPDATE ON public.achievements
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- User achievements
CREATE TRIGGER update_user_achievements_updated_at
    BEFORE UPDATE ON public.user_achievements
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Challenges
CREATE TRIGGER update_challenges_updated_at
    BEFORE UPDATE ON public.challenges
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Challenge participants
CREATE TRIGGER update_challenge_participants_updated_at
    BEFORE UPDATE ON public.challenge_participants
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- User collections
CREATE TRIGGER update_user_collections_updated_at
    BEFORE UPDATE ON public.user_collections
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- -------------------------------------------------------------------------
-- BUSINESS RATING TRIGGERS
-- -------------------------------------------------------------------------

-- Update business rating when reviews are added/updated/deleted
CREATE TRIGGER update_business_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_business_rating();

-- -------------------------------------------------------------------------
-- EVENT ATTENDEE COUNT TRIGGERS
-- -------------------------------------------------------------------------

-- Update event attendee count when attendees change
CREATE TRIGGER update_event_attendee_count_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.event_attendees
    FOR EACH ROW EXECUTE FUNCTION public.update_event_attendee_count();

-- -------------------------------------------------------------------------
-- GAMIFICATION TRIGGERS
-- -------------------------------------------------------------------------

-- Update review count in user points when review is published
CREATE OR REPLACE FUNCTION public.update_user_review_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND (TG_OP = 'INSERT' OR OLD.status != 'published') THEN
        -- Award points for the review
        PERFORM public.award_points(
            NEW.user_id,
            (SELECT community_id FROM public.businesses WHERE id = NEW.business_id),
            20,
            'review',
            'Posted review for business',
            'review',
            NEW.id
        );
        
        -- Update review count
        UPDATE public.user_points
        SET reviews_count = reviews_count + 1
        WHERE user_id = NEW.user_id
        AND community_id = (SELECT community_id FROM public.businesses WHERE id = NEW.business_id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_review_count_trigger
    AFTER INSERT OR UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_user_review_count();

-- Award points when user uploads a photo
CREATE OR REPLACE FUNCTION public.award_photo_points()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.is_approved = true THEN
        -- Award points for photo upload
        PERFORM public.award_points(
            NEW.user_id,
            (SELECT community_id FROM public.businesses WHERE id = NEW.business_id),
            5,
            'photo',
            'Uploaded photo for business',
            'photo',
            NEW.id
        );
        
        -- Update photo count
        UPDATE public.user_points
        SET photos_uploaded = photos_uploaded + 1
        WHERE user_id = NEW.user_id
        AND community_id = (SELECT community_id FROM public.businesses WHERE id = NEW.business_id);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_photo_points_trigger
    AFTER INSERT ON public.business_photos
    FOR EACH ROW 
    WHEN (NEW.user_id IS NOT NULL)
    EXECUTE FUNCTION public.award_photo_points();

-- Award points when user redeems a deal
CREATE OR REPLACE FUNCTION public.award_deal_redemption_points()
RETURNS TRIGGER AS $$
BEGIN
    -- Award points for deal redemption
    PERFORM public.award_points(
        NEW.user_id,
        (SELECT community_id FROM public.deals WHERE id = NEW.deal_id),
        15,
        'deal_redemption',
        'Redeemed a deal',
        'deal',
        NEW.deal_id
    );
    
    -- Update deals redeemed count
    UPDATE public.user_points
    SET deals_redeemed = deals_redeemed + 1
    WHERE user_id = NEW.user_id
    AND community_id = (SELECT community_id FROM public.deals WHERE id = NEW.deal_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_deal_redemption_points_trigger
    AFTER INSERT ON public.deal_redemptions
    FOR EACH ROW EXECUTE FUNCTION public.award_deal_redemption_points();

-- -------------------------------------------------------------------------
-- REFERRAL SYSTEM TRIGGERS
-- -------------------------------------------------------------------------

-- Generate referral code for new users
CREATE OR REPLACE FUNCTION public.generate_user_referral_code()
RETURNS TRIGGER AS $$
DECLARE
    referral_code TEXT;
    code_exists BOOLEAN := true;
BEGIN
    -- Generate unique referral code
    WHILE code_exists LOOP
        referral_code := public.generate_referral_code();
        SELECT EXISTS(
            SELECT 1 FROM public.referrals WHERE referral_code = referral_code
        ) INTO code_exists;
    END LOOP;
    
    -- Create referral entry for new user
    INSERT INTO public.referrals (
        referrer_user_id,
        referral_code,
        status
    ) VALUES (
        NEW.id,
        referral_code,
        'active'
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_user_referral_code_trigger
    AFTER INSERT ON public.user_accounts
    FOR EACH ROW EXECUTE FUNCTION public.generate_user_referral_code();

-- Process successful referral
CREATE OR REPLACE FUNCTION public.process_referral_completion()
RETURNS TRIGGER AS $$
DECLARE
    v_referral RECORD;
BEGIN
    -- Check if user was referred
    SELECT * INTO v_referral
    FROM public.referrals
    WHERE referred_user_id = NEW.id
    AND status = 'pending';
    
    IF FOUND THEN
        -- Update referral status
        UPDATE public.referrals
        SET 
            status = 'completed',
            completed_at = NOW(),
            referrer_points_earned = 50,
            referred_points_earned = 25
        WHERE id = v_referral.id;
        
        -- Award points to referrer
        PERFORM public.award_points(
            v_referral.referrer_user_id,
            NEW.preferred_community_id,
            50,
            'referral',
            'Referred a new user',
            'referral',
            v_referral.id
        );
        
        -- Award points to referred user
        PERFORM public.award_points(
            NEW.id,
            NEW.preferred_community_id,
            25,
            'referral',
            'Joined through referral',
            'referral',
            v_referral.id
        );
        
        -- Update referral count for referrer
        UPDATE public.user_points
        SET referrals_count = referrals_count + 1
        WHERE user_id = v_referral.referrer_user_id
        AND community_id = NEW.preferred_community_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER process_referral_completion_trigger
    AFTER UPDATE OF is_verified ON public.user_accounts
    FOR EACH ROW 
    WHEN (NEW.is_verified = true AND OLD.is_verified = false)
    EXECUTE FUNCTION public.process_referral_completion();

-- -------------------------------------------------------------------------
-- NOTIFICATION TRIGGERS
-- -------------------------------------------------------------------------

-- Create notification for business owner when review is posted
CREATE OR REPLACE FUNCTION public.notify_business_review()
RETURNS TRIGGER AS $$
DECLARE
    v_business RECORD;
BEGIN
    IF NEW.status = 'published' AND (TG_OP = 'INSERT' OR OLD.status != 'published') THEN
        -- Get business details
        SELECT * INTO v_business
        FROM public.businesses
        WHERE id = NEW.business_id;
        
        IF v_business.owner_user_id IS NOT NULL THEN
            -- Create notification for business owner
            PERFORM public.create_notification(
                v_business.owner_user_id,
                'new_review',
                'New Review Posted',
                'Your business received a new ' || NEW.rating || '-star review',
                'review',
                NEW.id,
                NULL,
                '/business/' || v_business.slug || '/reviews'
            );
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_business_review_trigger
    AFTER INSERT OR UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.notify_business_review();

-- Create notification when user achieves a new achievement
CREATE OR REPLACE FUNCTION public.notify_achievement_completion()
RETURNS TRIGGER AS $$
DECLARE
    v_achievement RECORD;
BEGIN
    IF NEW.is_completed = true AND OLD.is_completed = false THEN
        -- Get achievement details
        SELECT * INTO v_achievement
        FROM public.achievements
        WHERE id = NEW.achievement_id;
        
        -- Create notification
        PERFORM public.create_notification(
            NEW.user_id,
            'achievement_unlocked',
            'Achievement Unlocked!',
            'You unlocked the "' || v_achievement.name || '" achievement!',
            'achievement',
            NEW.achievement_id,
            v_achievement.icon_url,
            '/profile/achievements'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_achievement_completion_trigger
    AFTER UPDATE ON public.user_achievements
    FOR EACH ROW 
    WHEN (NEW.is_completed = true AND OLD.is_completed = false)
    EXECUTE FUNCTION public.notify_achievement_completion();

-- =========================================================================
-- END OF TRIGGER CREATION
-- =========================================================================
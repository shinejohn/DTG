-- =========================================================================
-- DOWNTOWN GUIDE - GAMIFICATION & COMMUNITY FEATURES
-- Adds missing tables for points, achievements, leaderboards
-- =========================================================================

-- -------------------------------------------------------------------------
-- USER POINTS & LEVELS
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id),
  
  -- Point totals
  total_points INTEGER DEFAULT 0,
  current_month_points INTEGER DEFAULT 0,
  current_week_points INTEGER DEFAULT 0,
  
  -- Level system
  level INTEGER DEFAULT 1,
  level_progress INTEGER DEFAULT 0, -- Points toward next level
  level_threshold INTEGER DEFAULT 100, -- Points needed for next level
  
  -- Stats for UI display
  check_ins_count INTEGER DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  photos_uploaded INTEGER DEFAULT 0,
  deals_redeemed INTEGER DEFAULT 0,
  referrals_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, community_id)
);

-- -------------------------------------------------------------------------
-- POINT TRANSACTIONS (Track how points were earned)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id),
  
  -- Transaction details
  points INTEGER NOT NULL,
  transaction_type VARCHAR(50) NOT NULL, -- 'check_in', 'review', 'photo', 'deal_redemption', 'referral', 'achievement'
  description TEXT,
  
  -- Reference to related entity
  reference_type VARCHAR(50), -- 'business', 'event', 'deal', 'achievement'
  reference_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- ACHIEVEMENTS (Badges/Challenges)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  
  -- Display
  icon_url VARCHAR(500),
  badge_url VARCHAR(500),
  color_hex VARCHAR(7),
  
  -- Categories
  category VARCHAR(50), -- 'explorer', 'foodie', 'social', 'deals', 'community'
  tier VARCHAR(20), -- 'bronze', 'silver', 'gold', 'platinum'
  
  -- Requirements (flexible JSON)
  requirements JSONB NOT NULL,
  /* Example requirements:
  {
    "type": "check_in_count",
    "target": 10,
    "timeframe": "all_time",
    "filters": {"category": "restaurants"}
  }
  */
  
  -- Rewards
  point_reward INTEGER DEFAULT 0,
  
  -- Visibility
  is_active BOOLEAN DEFAULT true,
  is_secret BOOLEAN DEFAULT false, -- Hidden until earned
  
  -- Scope
  is_global BOOLEAN DEFAULT true, -- Available in all communities
  community_ids UUID[], -- Specific communities if not global
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- USER ACHIEVEMENTS (Track what users have earned)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id),
  
  -- Progress tracking
  progress INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  
  -- For new achievement notifications
  is_seen BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_id, community_id)
);

-- -------------------------------------------------------------------------
-- LEADERBOARDS (Cached for performance)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES public.communities(id),
  
  -- Leaderboard type
  board_type VARCHAR(50) NOT NULL, -- 'weekly', 'monthly', 'all_time'
  category VARCHAR(50), -- 'overall', 'check_ins', 'reviews', 'deals', etc.
  
  -- Time period
  period_start DATE,
  period_end DATE,
  
  -- Cached rankings (JSON array for performance)
  rankings JSONB NOT NULL,
  /* Example structure:
  [
    {
      "rank": 1,
      "user_id": "uuid",
      "username": "john123",
      "display_name": "John Doe",
      "avatar_url": "...",
      "points": 1250,
      "level": 5
    }
  ]
  */
  
  -- Metadata
  last_calculated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, board_type, category, period_start)
);

-- -------------------------------------------------------------------------
-- CHECK-INS (Track user visits)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id),
  
  -- Location verification
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Points earned
  points_earned INTEGER DEFAULT 0,
  
  -- Streak tracking
  is_streak_continued BOOLEAN DEFAULT false,
  streak_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Prevent multiple check-ins too quickly
  UNIQUE(user_id, business_id, created_at::date)
);

-- -------------------------------------------------------------------------
-- CHALLENGES (Time-limited community challenges)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES public.communities(id),
  
  -- Basic info
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Timing
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  
  -- Requirements
  challenge_type VARCHAR(50), -- 'visit_count', 'category_exploration', 'deal_redemption'
  requirements JSONB NOT NULL,
  
  -- Rewards
  point_bonus INTEGER DEFAULT 0,
  achievement_id UUID REFERENCES public.achievements(id),
  
  -- Display
  image_url VARCHAR(500),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- CHALLENGE PARTICIPANTS
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Progress
  progress JSONB DEFAULT '{}',
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  
  -- Rewards claimed
  rewards_claimed BOOLEAN DEFAULT false,
  
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(challenge_id, user_id)
);

-- -------------------------------------------------------------------------
-- REFERRALS (Track user referrals)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Tracking
  referral_code VARCHAR(50),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'expired'
  
  -- Rewards
  referrer_points_earned INTEGER DEFAULT 0,
  referred_points_earned INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  
  UNIQUE(referred_user_id) -- Each user can only be referred once
);

-- -------------------------------------------------------------------------
-- DEAL REDEMPTIONS (Track coupon usage)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.deal_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id),
  
  -- Redemption details
  redemption_code VARCHAR(50),
  discount_amount DECIMAL(10,2),
  
  -- Points earned
  points_earned INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(20) DEFAULT 'redeemed', -- 'redeemed', 'used', 'expired'
  
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  used_at TIMESTAMPTZ,
  
  -- Prevent multiple redemptions
  UNIQUE(deal_id, user_id)
);

-- -------------------------------------------------------------------------
-- NOTIFICATIONS (For achievements, challenges, etc.)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Notification details
  type VARCHAR(50) NOT NULL, -- 'achievement_earned', 'challenge_completed', 'points_earned', 'new_deal'
  title VARCHAR(255) NOT NULL,
  body TEXT,
  
  -- Reference
  reference_type VARCHAR(50),
  reference_id UUID,
  
  -- Display
  icon_url VARCHAR(500),
  action_url VARCHAR(500),
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- -------------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE AT SCALE (8000+ communities)
-- -------------------------------------------------------------------------

-- User points lookups
CREATE INDEX idx_user_points_user_community ON public.user_points(user_id, community_id);
CREATE INDEX idx_user_points_community_level ON public.user_points(community_id, level DESC, total_points DESC);

-- Point transactions
CREATE INDEX idx_point_transactions_user ON public.point_transactions(user_id, created_at DESC);
CREATE INDEX idx_point_transactions_type ON public.point_transactions(transaction_type, created_at DESC);

-- Achievements
CREATE INDEX idx_user_achievements_user ON public.user_achievements(user_id, is_completed);
CREATE INDEX idx_user_achievements_unseen ON public.user_achievements(user_id, is_seen) WHERE NOT is_seen;

-- Leaderboards
CREATE INDEX idx_leaderboards_lookup ON public.leaderboards(community_id, board_type, category, period_start DESC);

-- Check-ins
CREATE INDEX idx_check_ins_user_date ON public.check_ins(user_id, created_at DESC);
CREATE INDEX idx_check_ins_business ON public.check_ins(business_id, created_at DESC);

-- Challenges
CREATE INDEX idx_challenges_active ON public.challenges(community_id, is_active, end_date) WHERE is_active;
CREATE INDEX idx_challenge_participants_user ON public.challenge_participants(user_id, is_completed);

-- Notifications
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, is_read, created_at DESC) WHERE NOT is_read;

-- -------------------------------------------------------------------------
-- RLS POLICIES
-- -------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_read_achievements" ON public.achievements
  FOR SELECT USING (is_active = true AND NOT is_secret);

CREATE POLICY "public_read_leaderboards" ON public.leaderboards
  FOR SELECT USING (true);

CREATE POLICY "public_read_challenges" ON public.challenges
  FOR SELECT USING (is_active = true);

-- User-specific policies
CREATE POLICY "users_own_points" ON public.user_points
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_transactions" ON public.point_transactions
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "users_own_achievements" ON public.user_achievements
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_checkins" ON public.check_ins
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_challenge_participation" ON public.challenge_participants
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_referrals" ON public.referrals
  FOR SELECT TO authenticated
  USING (auth.uid() = referrer_user_id OR auth.uid() = referred_user_id);

CREATE POLICY "users_create_referrals" ON public.referrals
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = referrer_user_id);

CREATE POLICY "users_own_redemptions" ON public.deal_redemptions
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_notifications" ON public.notifications
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- -------------------------------------------------------------------------
-- FUNCTIONS FOR GAMIFICATION
-- -------------------------------------------------------------------------

-- Function to award points
CREATE OR REPLACE FUNCTION public.award_points(
  p_user_id UUID,
  p_community_id UUID,
  p_points INTEGER,
  p_transaction_type VARCHAR,
  p_description TEXT DEFAULT NULL,
  p_reference_type VARCHAR DEFAULT NULL,
  p_reference_id UUID DEFAULT NULL
) RETURNS void AS $$
BEGIN
  -- Insert transaction
  INSERT INTO public.point_transactions (
    user_id, community_id, points, transaction_type, 
    description, reference_type, reference_id
  ) VALUES (
    p_user_id, p_community_id, p_points, p_transaction_type,
    p_description, p_reference_type, p_reference_id
  );
  
  -- Update user points
  INSERT INTO public.user_points (user_id, community_id, total_points)
  VALUES (p_user_id, p_community_id, p_points)
  ON CONFLICT (user_id, community_id)
  DO UPDATE SET
    total_points = user_points.total_points + p_points,
    current_month_points = user_points.current_month_points + p_points,
    current_week_points = user_points.current_week_points + p_points,
    updated_at = NOW();
    
  -- Check for level up
  PERFORM public.check_level_up(p_user_id, p_community_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check level up
CREATE OR REPLACE FUNCTION public.check_level_up(
  p_user_id UUID,
  p_community_id UUID
) RETURNS void AS $$
DECLARE
  v_current_points INTEGER;
  v_current_level INTEGER;
  v_new_level INTEGER;
BEGIN
  SELECT total_points, level 
  INTO v_current_points, v_current_level
  FROM public.user_points
  WHERE user_id = p_user_id AND community_id = p_community_id;
  
  -- Simple level calculation: level = floor(sqrt(points/100))
  v_new_level := FLOOR(SQRT(v_current_points::FLOAT / 100))::INTEGER + 1;
  
  IF v_new_level > v_current_level THEN
    UPDATE public.user_points
    SET level = v_new_level,
        level_threshold = (v_new_level * v_new_level) * 100
    WHERE user_id = p_user_id AND community_id = p_community_id;
    
    -- Create notification
    INSERT INTO public.notifications (
      user_id, type, title, body
    ) VALUES (
      p_user_id, 
      'level_up',
      'Level Up!',
      'Congratulations! You reached level ' || v_new_level || '!'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =========================================================================
-- END GAMIFICATION SCHEMA
-- =========================================================================
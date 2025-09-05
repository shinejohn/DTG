-- Generated migration for [username]

-- Table: badge
CREATE TABLE IF NOT EXISTS public.badge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  earned_at TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.badge ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "badge_access" ON public.badge
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: friend
CREATE TABLE IF NOT EXISTS public.friend (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  username TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.friend ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "friend_access" ON public.friend
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: review
CREATE TABLE IF NOT EXISTS public.review (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_image TEXT NOT NULL,
  rating INTEGER NOT NULL,
  content TEXT NOT NULL,
  photos JSONB NOT NULL,
  helpful_votes INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.review ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "review_access" ON public.review
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: photo
CREATE TABLE IF NOT EXISTS public.photo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  url TEXT NOT NULL,
  business_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  caption TEXT,
  created_at TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.photo ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "photo_access" ON public.photo
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: check_in
CREATE TABLE IF NOT EXISTS public.check_in (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_image TEXT NOT NULL,
  comment TEXT,
  created_at TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.check_in ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "check_in_access" ON public.check_in
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: favorite
CREATE TABLE IF NOT EXISTS public.favorite (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_image TEXT NOT NULL,
  business_category TEXT NOT NULL,
  created_at TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.favorite ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "favorite_access" ON public.favorite
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: rewards_summary
CREATE TABLE IF NOT EXISTS public.rewards_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  points_balance INTEGER NOT NULL,
  lifetime_points INTEGER NOT NULL,
  level TEXT NOT NULL,
  next_level TEXT NOT NULL,
  points_to_next_level INTEGER NOT NULL,
  progress_percentage INTEGER NOT NULL,
  recent_points_activity JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.rewards_summary ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "rewards_summary_access" ON public.rewards_summary
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: achievement
CREATE TABLE IF NOT EXISTS public.achievement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  progress INTEGER NOT NULL,
  total INTEGER NOT NULL,
  completed BOOLEAN NOT NULL,
  earned_at TEXT,
  category TEXT NOT NULL,
  points INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.achievement ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "achievement_access" ON public.achievement
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: loyalty_membership
CREATE TABLE IF NOT EXISTS public.loyalty_membership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_image TEXT NOT NULL,
  tier TEXT NOT NULL,
  points_balance INTEGER NOT NULL,
  member_since TEXT NOT NULL,
  perks JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.loyalty_membership ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "loyalty_membership_access" ON public.loyalty_membership
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: leaderboard_position
CREATE TABLE IF NOT EXISTS public.leaderboard_position (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rank INTEGER NOT NULL,
  total_participants INTEGER NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL,
  trend TEXT NOT NULL,
  friends_ahead JSONB NOT NULL,
  friends_behind JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leaderboard_position ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "leaderboard_position_access" ON public.leaderboard_position
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: user_profile
CREATE TABLE IF NOT EXISTS public.user_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  username TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  cover_photo TEXT NOT NULL,
  bio TEXT NOT NULL,
  location TEXT NOT NULL,
  member_since TEXT NOT NULL,
  is_verified BOOLEAN NOT NULL,
  stats JSONB NOT NULL,
  badges JSONB NOT NULL,
  friends JSONB NOT NULL,
  reviews JSONB NOT NULL,
  photos JSONB NOT NULL,
  check_ins JSONB NOT NULL,
  favorites JSONB NOT NULL,
  rewards_summary JSONB,
  achievements JSONB,
  loyalty_memberships JSONB,
  leaderboard_position JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "user_profile_access" ON public.user_profile
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


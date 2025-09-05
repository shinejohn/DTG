-- Generated migration for Rewards

-- Table: user_points
CREATE TABLE IF NOT EXISTS public.user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current INTEGER NOT NULL,
  lifetime INTEGER NOT NULL,
  level INTEGER NOT NULL,
  next_level_at INTEGER NOT NULL,
  rank TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "user_points_access" ON public.user_points
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: point_transaction
CREATE TABLE IF NOT EXISTS public.point_transaction (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  business_name TEXT,
  business_id TEXT,
  date TEXT NOT NULL,
  icon_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.point_transaction ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "point_transaction_access" ON public.point_transaction
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: coupon
CREATE TABLE IF NOT EXISTS public.coupon (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_logo TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount TEXT NOT NULL,
  category TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  point_cost INTEGER,
  is_exclusive BOOLEAN,
  is_recommended BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.coupon ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "coupon_access" ON public.coupon
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: achievement
CREATE TABLE IF NOT EXISTS public.achievement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  progress INTEGER NOT NULL,
  total INTEGER NOT NULL,
  completed_at TEXT,
  point_reward INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.achievement ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "achievement_access" ON public.achievement
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: user_achievement
CREATE TABLE IF NOT EXISTS public.user_achievement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_completed BOOLEAN NOT NULL,
  is_new BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_achievement ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "user_achievement_access" ON public.user_achievement
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: leaderboard_entry
CREATE TABLE IF NOT EXISTS public.leaderboard_entry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  points INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  is_current_user BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leaderboard_entry ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "leaderboard_entry_access" ON public.leaderboard_entry
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Generated migration for loyalty

-- Table: loyalty_program
CREATE TABLE IF NOT EXISTS public.loyalty_program (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  points_settings TEXT NOT NULL,
  tiers JSONB NOT NULL,
  rewards JSONB NOT NULL,
  join_bonus INTEGER NOT NULL,
  referral_bonus JSONB NOT NULL,
  birthday_bonus INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  last_modified TEXT NOT NULL,
  stats JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.loyalty_program ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "loyalty_program_access" ON public.loyalty_program
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: loyalty_tier
CREATE TABLE IF NOT EXISTS public.loyalty_tier (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  threshold INTEGER NOT NULL,
  benefits JSONB NOT NULL,
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  multiplier INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.loyalty_tier ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "loyalty_tier_access" ON public.loyalty_tier
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: loyalty_reward
CREATE TABLE IF NOT EXISTS public.loyalty_reward (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  points_cost INTEGER NOT NULL,
  type TEXT NOT NULL,
  value TEXT NOT NULL,
  image TEXT,
  restrictions JSONB,
  availability TEXT NOT NULL,
  quantity_available INTEGER,
  quantity_redeemed INTEGER NOT NULL,
  tier_restriction JSONB,
  is_active BOOLEAN NOT NULL,
  created_at TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.loyalty_reward ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "loyalty_reward_access" ON public.loyalty_reward
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: loyalty_member
CREATE TABLE IF NOT EXISTS public.loyalty_member (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  points_balance INTEGER NOT NULL,
  lifetime_points INTEGER NOT NULL,
  tier TEXT NOT NULL,
  join_date TEXT NOT NULL,
  last_active TEXT NOT NULL,
  total_spent INTEGER NOT NULL,
  visits_count INTEGER NOT NULL,
  birthday_month INTEGER,
  birthday_day INTEGER,
  reward_history JSONB NOT NULL,
  points_history JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.loyalty_member ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "loyalty_member_access" ON public.loyalty_member
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: points_activity
CREATE TABLE IF NOT EXISTS public.points_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  member_id TEXT NOT NULL,
  member_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  order_id TEXT,
  reward_id TEXT,
  adjusted_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.points_activity ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "points_activity_access" ON public.points_activity
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Generated migration for Achievements

-- Table: achievement
CREATE TABLE IF NOT EXISTS public.achievement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  progress INTEGER NOT NULL,
  total INTEGER NOT NULL,
  completed_at TEXT,
  point_reward INTEGER NOT NULL,
  badge_url TEXT,
  is_completed BOOLEAN NOT NULL,
  is_new BOOLEAN,
  is_secret BOOLEAN,
  requirements JSONB,
  business_id TEXT,
  business_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.achievement ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "achievement_access" ON public.achievement
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: friend
CREATE TABLE IF NOT EXISTS public.friend (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  username TEXT NOT NULL,
  avatar TEXT NOT NULL,
  achievements JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.friend ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "friend_access" ON public.friend
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


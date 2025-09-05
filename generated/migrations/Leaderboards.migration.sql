-- Generated migration for Leaderboards

-- Table: leaderboard_entry
CREATE TABLE IF NOT EXISTS public.leaderboard_entry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  username TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  points INTEGER NOT NULL,
  review_count INTEGER NOT NULL,
  check_in_count INTEGER NOT NULL,
  achievement_count INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  previous_rank INTEGER,
  is_current_user BOOLEAN NOT NULL,
  is_friend BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leaderboard_entry ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "leaderboard_entry_access" ON public.leaderboard_entry
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: challenge
CREATE TABLE IF NOT EXISTS public.challenge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  category TEXT NOT NULL,
  participants INTEGER NOT NULL,
  leaderboard JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.challenge ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "challenge_access" ON public.challenge
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


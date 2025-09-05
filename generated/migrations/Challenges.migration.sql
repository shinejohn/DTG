-- Generated migration for Challenges

-- Table: challenge
CREATE TABLE IF NOT EXISTS public.challenge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  status TEXT NOT NULL,
  progress INTEGER,
  total INTEGER NOT NULL,
  participants INTEGER NOT NULL,
  rewards JSONB NOT NULL,
  business JSONB,
  leaderboard JSONB,
  milestones JSONB,
  joined_at TEXT,
  completed_at TEXT,
  friends_participating JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.challenge ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "challenge_access" ON public.challenge
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


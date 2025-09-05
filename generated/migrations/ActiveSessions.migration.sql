-- Generated migration for ActiveSessions

-- Table: session
CREATE TABLE IF NOT EXISTS public.session (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  device TEXT NOT NULL,
  location JSONB NOT NULL,
  last_active TEXT NOT NULL,
  is_current_session BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.session ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "session_access" ON public.session
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


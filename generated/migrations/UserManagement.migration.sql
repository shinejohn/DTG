-- Generated migration for UserManagement

-- Table: user
CREATE TABLE IF NOT EXISTS public.user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  join_date TEXT NOT NULL,
  last_active TEXT NOT NULL,
  profile_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "user_access" ON public.user
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


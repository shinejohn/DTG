-- Generated migration for Language

-- Table: language_option
CREATE TABLE IF NOT EXISTS public.language_option (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  local_name TEXT NOT NULL,
  flag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.language_option ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "language_option_access" ON public.language_option
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


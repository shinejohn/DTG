-- Generated migration for Tabs

-- Table: tab
CREATE TABLE IF NOT EXISTS public.tab (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  label JSONB NOT NULL,
  content JSONB NOT NULL,
  disabled BOOLEAN,
  icon JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.tab ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "tab_access" ON public.tab
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


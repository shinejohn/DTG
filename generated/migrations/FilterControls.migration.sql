-- Generated migration for FilterControls

-- Table: filter_option
CREATE TABLE IF NOT EXISTS public.filter_option (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT NOT NULL,
  options JSONB,
  min INTEGER,
  max INTEGER,
  step INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.filter_option ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "filter_option_access" ON public.filter_option
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


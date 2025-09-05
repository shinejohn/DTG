-- Generated migration for Typography

-- Table: typography_variant
CREATE TABLE IF NOT EXISTS public.typography_variant (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.typography_variant ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "typography_variant_access" ON public.typography_variant
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


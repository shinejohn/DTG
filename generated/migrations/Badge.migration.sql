-- Generated migration for Badge

-- Table: badge_variant
CREATE TABLE IF NOT EXISTS public.badge_variant (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.badge_variant ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "badge_variant_access" ON public.badge_variant
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


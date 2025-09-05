-- Generated migration for BrandConfiguration

-- Table: brand
CREATE TABLE IF NOT EXISTS public.brand (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  logo TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  brand_type TEXT NOT NULL,
  features JSONB NOT NULL,
  communities JSONB,
  experience JSONB,
  page_sections JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.brand ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "brand_access" ON public.brand
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


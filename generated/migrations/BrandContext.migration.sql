-- Generated migration for BrandContext

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
  is_primary BOOLEAN,
  features JSONB NOT NULL,
  communities JSONB NOT NULL,
  experience JSONB NOT NULL,
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


-- Table: brand_context_type
CREATE TABLE IF NOT EXISTS public.brand_context_type (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  current_brand TEXT NOT NULL,
  set_current_brand JSONB NOT NULL,
  brands JSONB NOT NULL,
  set_brands JSONB NOT NULL,
  primary_brand TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.brand_context_type ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "brand_context_type_access" ON public.brand_context_type
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


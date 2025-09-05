-- Generated migration for Deals

-- Table: business
CREATE TABLE IF NOT EXISTS public.business (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  logo TEXT,
  rating INTEGER NOT NULL,
  review_count INTEGER NOT NULL,
  distance INTEGER,
  location TEXT NOT NULL,
  coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "business_access" ON public.business
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: deal
CREATE TABLE IF NOT EXISTS public.deal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  business JSONB NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount_type TEXT NOT NULL,
  discount_value INTEGER,
  discount_code TEXT,
  category TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  start_date TEXT NOT NULL,
  is_exclusive BOOLEAN,
  is_recommended BOOLEAN,
  is_featured BOOLEAN,
  point_cost INTEGER,
  image_url TEXT,
  tags JSONB NOT NULL,
  redemption_count INTEGER NOT NULL,
  save_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.deal ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "deal_access" ON public.deal
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: filter_options
CREATE TABLE IF NOT EXISTS public.filter_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  categories JSONB NOT NULL,
  discount_types JSONB NOT NULL,
  sort_by TEXT NOT NULL,
  only_exclusive BOOLEAN NOT NULL,
  max_distance INTEGER NOT NULL,
  search_term TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.filter_options ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "filter_options_access" ON public.filter_options
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


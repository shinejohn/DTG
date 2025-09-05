-- Generated migration for Favorites

-- Table: business
CREATE TABLE IF NOT EXISTS public.business (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  image TEXT NOT NULL,
  rating INTEGER NOT NULL,
  review_count INTEGER NOT NULL,
  price_range TEXT NOT NULL,
  address TEXT NOT NULL,
  distance TEXT,
  tags JSONB,
  saved_at TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "business_access" ON public.business
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: custom_list
CREATE TABLE IF NOT EXISTS public.custom_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  business_ids JSONB NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.custom_list ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "custom_list_access" ON public.custom_list
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


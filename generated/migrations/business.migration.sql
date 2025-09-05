-- Generated migration for business

-- Table: business_hours
CREATE TABLE IF NOT EXISTS public.business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monday TEXT NOT NULL,
  tuesday TEXT NOT NULL,
  wednesday TEXT NOT NULL,
  thursday TEXT NOT NULL,
  friday TEXT NOT NULL,
  saturday TEXT NOT NULL,
  sunday TEXT NOT NULL,
  holiday_hours JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "business_hours_access" ON public.business_hours
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: photo
CREATE TABLE IF NOT EXISTS public.photo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  url TEXT NOT NULL,
  alt TEXT NOT NULL,
  is_primary BOOLEAN,
  type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.photo ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "photo_access" ON public.photo
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: business
CREATE TABLE IF NOT EXISTS public.business (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  description TEXT NOT NULL,
  short_description TEXT NOT NULL,
  contact JSONB NOT NULL,
  hours JSONB NOT NULL,
  features JSONB NOT NULL,
  amenities JSONB NOT NULL,
  payment_methods JSONB NOT NULL,
  price_range TEXT NOT NULL,
  photos JSONB NOT NULL,
  menu JSONB,
  social_media JSONB,
  reviews JSONB,
  articles JSONB,
  events JSONB,
  rating INTEGER,
  review_count INTEGER,
  status TEXT NOT NULL,
  verified BOOLEAN NOT NULL,
  featured BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "business_access" ON public.business
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


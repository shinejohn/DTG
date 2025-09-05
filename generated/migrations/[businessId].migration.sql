-- Generated migration for [businessId]

-- Table: business
CREATE TABLE IF NOT EXISTS public.business (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  image TEXT NOT NULL,
  address TEXT NOT NULL,
  rating INTEGER NOT NULL,
  review_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "business_access" ON public.business
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: review_form
CREATE TABLE IF NOT EXISTS public.review_form (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  overall_rating INTEGER NOT NULL,
  category_ratings JSONB NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  photos JSONB NOT NULL,
  photo_preview_urls JSONB NOT NULL,
  tags JSONB NOT NULL,
  visit_date TEXT,
  is_anonymous BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.review_form ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "review_form_access" ON public.review_form
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


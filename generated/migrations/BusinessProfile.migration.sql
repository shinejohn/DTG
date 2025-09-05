-- Generated migration for BusinessProfile

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


-- Table: menu_item
CREATE TABLE IF NOT EXISTS public.menu_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  photo_url TEXT,
  popular BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.menu_item ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "menu_item_access" ON public.menu_item
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: social_links
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facebook TEXT,
  instagram TEXT,
  twitter TEXT,
  linkedin TEXT,
  youtube TEXT,
  yelp TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "social_links_access" ON public.social_links
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: review
CREATE TABLE IF NOT EXISTS public.review (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_image TEXT,
  rating INTEGER NOT NULL,
  date TEXT NOT NULL,
  content TEXT NOT NULL,
  helpful INTEGER NOT NULL,
  images JSONB,
  response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.review ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "review_access" ON public.review
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: article
CREATE TABLE IF NOT EXISTS public.article (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  publish_date TEXT NOT NULL,
  author TEXT NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT NOT NULL,
  image_url TEXT,
  tags JSONB NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.article ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "article_access" ON public.article
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: event
CREATE TABLE IF NOT EXISTS public.event (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  image_url TEXT,
  organizer TEXT NOT NULL,
  price TEXT,
  ticket_url TEXT,
  tags JSONB NOT NULL,
  capacity INTEGER,
  attendees INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.event ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "event_access" ON public.event
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


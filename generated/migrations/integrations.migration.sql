-- Generated migration for integrations

-- Table: business
CREATE TABLE IF NOT EXISTS public.business (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  logo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "business_access" ON public.business
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: platform
CREATE TABLE IF NOT EXISTS public.platform (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  icon JSONB NOT NULL,
  connected BOOLEAN NOT NULL,
  last_sync TEXT,
  status TEXT NOT NULL,
  stats JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.platform ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "platform_access" ON public.platform
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: news_item
CREATE TABLE IF NOT EXISTS public.news_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  date TEXT NOT NULL,
  image TEXT,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  sentiment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.news_item ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "news_item_access" ON public.news_item
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: event_item
CREATE TABLE IF NOT EXISTS public.event_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  image TEXT,
  url TEXT NOT NULL,
  status TEXT NOT NULL,
  attendees INTEGER,
  sponsored BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.event_item ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "event_item_access" ON public.event_item
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: notification
CREATE TABLE IF NOT EXISTS public.notification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  platform TEXT NOT NULL,
  read BOOLEAN NOT NULL,
  type TEXT NOT NULL,
  icon JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.notification ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "notification_access" ON public.notification
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: content_item
CREATE TABLE IF NOT EXISTS public.content_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  date TEXT NOT NULL,
  platforms JSONB NOT NULL,
  status TEXT NOT NULL,
  engagement JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.content_item ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "content_item_access" ON public.content_item
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


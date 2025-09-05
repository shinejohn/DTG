-- Generated migration for events

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


-- Table: event
CREATE TABLE IF NOT EXISTS public.event (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  end_date TEXT,
  location TEXT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL,
  event_type TEXT NOT NULL,
  capacity INTEGER,
  attendees INTEGER,
  ticket_price INTEGER,
  is_free BOOLEAN,
  visibility TEXT NOT NULL,
  organizer TEXT NOT NULL,
  tags JSONB,
  synced_with JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.event ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "event_access" ON public.event
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: sponsor
CREATE TABLE IF NOT EXISTS public.sponsor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  logo TEXT,
  event_id TEXT NOT NULL,
  sponsorship_level TEXT NOT NULL,
  contribution INTEGER NOT NULL,
  benefits JSONB NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.sponsor ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "sponsor_access" ON public.sponsor
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: sponsorship_opportunity
CREATE TABLE IF NOT EXISTS public.sponsorship_opportunity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_id TEXT NOT NULL,
  organizer_name TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  sponsorship_levels JSONB NOT NULL,
  attendee_count INTEGER,
  description TEXT NOT NULL,
  application_deadline TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.sponsorship_opportunity ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "sponsorship_opportunity_access" ON public.sponsorship_opportunity
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: event_metrics
CREATE TABLE IF NOT EXISTS public.event_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  view_count INTEGER NOT NULL,
  registration_count INTEGER NOT NULL,
  attendance_count INTEGER NOT NULL,
  engagement_rate INTEGER NOT NULL,
  ticket_revenue INTEGER,
  demographic_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.event_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "event_metrics_access" ON public.event_metrics
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


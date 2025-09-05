-- Generated migration for analytics

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


-- Table: key_metric
CREATE TABLE IF NOT EXISTS public.key_metric (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change INTEGER NOT NULL,
  trend TEXT NOT NULL,
  icon JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.key_metric ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "key_metric_access" ON public.key_metric
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: traffic_data
CREATE TABLE IF NOT EXISTS public.traffic_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  views INTEGER NOT NULL,
  calls INTEGER NOT NULL,
  directions INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.traffic_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "traffic_data_access" ON public.traffic_data
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: demographic_data
CREATE TABLE IF NOT EXISTS public.demographic_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value INTEGER NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.demographic_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "demographic_data_access" ON public.demographic_data
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: hourly_traffic
CREATE TABLE IF NOT EXISTS public.hourly_traffic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hour TEXT NOT NULL,
  traffic INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.hourly_traffic ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "hourly_traffic_access" ON public.hourly_traffic
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: weekday_traffic
CREATE TABLE IF NOT EXISTS public.weekday_traffic (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day TEXT NOT NULL,
  traffic INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.weekday_traffic ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "weekday_traffic_access" ON public.weekday_traffic
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: review_trend
CREATE TABLE IF NOT EXISTS public.review_trend (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  avg_rating INTEGER NOT NULL,
  review_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.review_trend ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "review_trend_access" ON public.review_trend
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: review_sentiment
CREATE TABLE IF NOT EXISTS public.review_sentiment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value INTEGER NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.review_sentiment ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "review_sentiment_access" ON public.review_sentiment
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: photo_performance
CREATE TABLE IF NOT EXISTS public.photo_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  url TEXT NOT NULL,
  views INTEGER NOT NULL,
  engagement INTEGER NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.photo_performance ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "photo_performance_access" ON public.photo_performance
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: competitor_data
CREATE TABLE IF NOT EXISTS public.competitor_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  views INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  review_count INTEGER NOT NULL,
  response_rate INTEGER NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.competitor_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "competitor_data_access" ON public.competitor_data
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


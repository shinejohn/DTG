-- Generated migration for coupons

-- Table: coupon
CREATE TABLE IF NOT EXISTS public.coupon (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  code TEXT NOT NULL,
  discount TEXT NOT NULL,
  constraints JSONB NOT NULL,
  targeting JSONB NOT NULL,
  validity JSONB NOT NULL,
  performance JSONB NOT NULL,
  created_at TEXT NOT NULL,
  last_modified TEXT NOT NULL,
  template TEXT,
  category_tags JSONB NOT NULL,
  display_options JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.coupon ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "coupon_access" ON public.coupon
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: coupon_template
CREATE TABLE IF NOT EXISTS public.coupon_template (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  default_discount INTEGER NOT NULL,
  image TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT,
  popularity_score INTEGER NOT NULL,
  category_tags JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.coupon_template ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "coupon_template_access" ON public.coupon_template
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: customer_segment
CREATE TABLE IF NOT EXISTS public.customer_segment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  count INTEGER NOT NULL,
  criteria JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.customer_segment ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "customer_segment_access" ON public.customer_segment
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


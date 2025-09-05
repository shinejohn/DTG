-- Generated migration for Pricing

-- Table: pricing_plan
CREATE TABLE IF NOT EXISTS public.pricing_plan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  monthly_price TEXT NOT NULL,
  annual_price TEXT NOT NULL,
  features JSONB NOT NULL,
  popular BOOLEAN,
  button_text TEXT NOT NULL,
  button_link TEXT NOT NULL,
  feature_categories JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.pricing_plan ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "pricing_plan_access" ON public.pricing_plan
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: f_a_q
CREATE TABLE IF NOT EXISTS public.f_a_q (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.f_a_q ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "f_a_q_access" ON public.f_a_q
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


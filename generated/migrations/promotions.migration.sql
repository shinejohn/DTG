-- Generated migration for promotions

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


-- Table: promotion
CREATE TABLE IF NOT EXISTS public.promotion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  discount_type TEXT,
  discount_value INTEGER,
  code TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  is_paused BOOLEAN,
  is_recurring BOOLEAN,
  recurrence_pattern TEXT,
  target_audience TEXT,
  redemption_limit INTEGER,
  redemption_count INTEGER NOT NULL,
  view_count INTEGER NOT NULL,
  save_count INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.promotion ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "promotion_access" ON public.promotion
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


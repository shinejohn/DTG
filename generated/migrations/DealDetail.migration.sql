-- Generated migration for DealDetail

-- Table: deal
CREATE TABLE IF NOT EXISTS public.deal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  business_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  discount JSONB NOT NULL,
  expiry_date TEXT NOT NULL,
  code TEXT NOT NULL,
  how_to_redeem TEXT,
  terms_and_conditions TEXT,
  is_exclusive BOOLEAN NOT NULL,
  is_popular BOOLEAN NOT NULL,
  is_recommended BOOLEAN NOT NULL,
  redemption_count INTEGER NOT NULL,
  points_cost INTEGER,
  business JSONB NOT NULL,
  related_deals JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.deal ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "deal_access" ON public.deal
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


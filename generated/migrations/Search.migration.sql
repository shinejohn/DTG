-- Generated migration for Search

-- Table: search_params
CREATE TABLE IF NOT EXISTS public.search_params (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  q TEXT,
  category TEXT,
  location TEXT,
  radius INTEGER,
  price_range TEXT,
  rating INTEGER,
  open_now BOOLEAN,
  features JSONB,
  sort TEXT,
  page INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.search_params ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "search_params_access" ON public.search_params
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


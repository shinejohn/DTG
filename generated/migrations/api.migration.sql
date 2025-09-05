-- Generated migration for api

-- Table: api_response
CREATE TABLE IF NOT EXISTS public.api_response (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data TEXT NOT NULL,
  error TEXT NOT NULL,
  status INTEGER NOT NULL,
  is_loading BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.api_response ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "api_response_access" ON public.api_response
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: request_options
CREATE TABLE IF NOT EXISTS public.request_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headers JSONB,
  params TEXT,
  cache JSONB,
  signal JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.request_options ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "request_options_access" ON public.request_options
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


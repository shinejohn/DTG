-- Generated migration for useAsync

-- Table: use_async_state
CREATE TABLE IF NOT EXISTS public.use_async_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data TEXT NOT NULL,
  error TEXT NOT NULL,
  is_loading BOOLEAN NOT NULL,
  is_success BOOLEAN NOT NULL,
  is_error BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.use_async_state ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "use_async_state_access" ON public.use_async_state
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: use_async_options
CREATE TABLE IF NOT EXISTS public.use_async_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  immediate BOOLEAN,
  on_success JSONB,
  on_error JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.use_async_options ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "use_async_options_access" ON public.use_async_options
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


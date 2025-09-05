-- Generated migration for AppContext

-- Table: app_state
CREATE TABLE IF NOT EXISTS public.app_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user TEXT NOT NULL,
  ui JSONB NOT NULL,
  preferences JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.app_state ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "app_state_access" ON public.app_state
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: action
CREATE TABLE IF NOT EXISTS public.action (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.action ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "action_access" ON public.action
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Generated migration for Button

-- Table: button_variant
CREATE TABLE IF NOT EXISTS public.button_variant (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.button_variant ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "button_variant_access" ON public.button_variant
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: button_size
CREATE TABLE IF NOT EXISTS public.button_size (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.button_size ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "button_size_access" ON public.button_size
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


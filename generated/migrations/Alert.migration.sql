-- Generated migration for Alert

-- Table: alert_variant
CREATE TABLE IF NOT EXISTS public.alert_variant (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.alert_variant ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "alert_variant_access" ON public.alert_variant
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


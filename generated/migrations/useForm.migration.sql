-- Generated migration for useForm

-- Table: form_options
CREATE TABLE IF NOT EXISTS public.form_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initial_values JSONB NOT NULL,
  on_submit JSONB NOT NULL,
  validate JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.form_options ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "form_options_access" ON public.form_options
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


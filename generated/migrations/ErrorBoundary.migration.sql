-- Generated migration for ErrorBoundary

-- Table: state
CREATE TABLE IF NOT EXISTS public.state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  has_error BOOLEAN NOT NULL,
  error TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.state ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "state_access" ON public.state
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


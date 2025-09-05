-- Generated migration for useOnClickOutside

-- Table: event
CREATE TABLE IF NOT EXISTS public.event (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.event ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "event_access" ON public.event
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


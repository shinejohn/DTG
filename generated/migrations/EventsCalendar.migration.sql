-- Generated migration for EventsCalendar

-- Table: event
CREATE TABLE IF NOT EXISTS public.event (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id INTEGER NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  date_obj TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  attendees INTEGER NOT NULL,
  price TEXT NOT NULL,
  duration TEXT,
  weather TEXT,
  coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.event ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "event_access" ON public.event
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


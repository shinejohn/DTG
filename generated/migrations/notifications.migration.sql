-- Generated migration for notifications

-- Table: notification
CREATE TABLE IF NOT EXISTS public.notification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  priority TEXT NOT NULL,
  read BOOLEAN NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.notification ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "notification_access" ON public.notification
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


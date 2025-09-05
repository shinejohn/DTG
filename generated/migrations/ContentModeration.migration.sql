-- Generated migration for ContentModeration

-- Table: moderation_item
CREATE TABLE IF NOT EXISTS public.moderation_item (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  user TEXT NOT NULL,
  user_avatar TEXT,
  business TEXT,
  date TEXT NOT NULL,
  status TEXT NOT NULL,
  flag_reason TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.moderation_item ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "moderation_item_access" ON public.moderation_item
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


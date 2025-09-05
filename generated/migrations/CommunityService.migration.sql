-- Generated migration for CommunityService

-- Table: community
CREATE TABLE IF NOT EXISTS public.community (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  brand_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.community ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "community_access" ON public.community
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Generated migration for Referrals

-- Table: referral
CREATE TABLE IF NOT EXISTS public.referral (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  status TEXT NOT NULL,
  invited_at TEXT NOT NULL,
  registered_at TEXT,
  points_earned INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.referral ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "referral_access" ON public.referral
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: referral_stats
CREATE TABLE IF NOT EXISTS public.referral_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_invites INTEGER NOT NULL,
  successful_referrals INTEGER NOT NULL,
  pending_referrals INTEGER NOT NULL,
  total_points_earned INTEGER NOT NULL,
  referral_code TEXT NOT NULL,
  referral_link TEXT NOT NULL,
  referral_bonus INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.referral_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "referral_stats_access" ON public.referral_stats
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: referral_campaign
CREATE TABLE IF NOT EXISTS public.referral_campaign (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  bonus INTEGER NOT NULL,
  regular_bonus INTEGER NOT NULL,
  expires_at TEXT NOT NULL,
  is_active BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.referral_campaign ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "referral_campaign_access" ON public.referral_campaign
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


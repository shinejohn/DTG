-- Generated migration for Billing

-- Table: user
CREATE TABLE IF NOT EXISTS public.user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "user_access" ON public.user
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: subscription
CREATE TABLE IF NOT EXISTS public.subscription (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TEXT NOT NULL,
  current_period_end TEXT NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL,
  trial_end TEXT,
  billing_cycle TEXT NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.subscription ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "subscription_access" ON public.subscription
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: payment_method
CREATE TABLE IF NOT EXISTS public.payment_method (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  type TEXT NOT NULL,
  is_default BOOLEAN NOT NULL,
  details JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.payment_method ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "payment_method_access" ON public.payment_method
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: invoice
CREATE TABLE IF NOT EXISTS public.invoice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  number TEXT NOT NULL,
  date TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  description TEXT NOT NULL,
  download_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.invoice ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "invoice_access" ON public.invoice
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: usage_metric
CREATE TABLE IF NOT EXISTS public.usage_metric (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  used INTEGER NOT NULL,
  limit INTEGER NOT NULL,
  unit TEXT NOT NULL,
  icon JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.usage_metric ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "usage_metric_access" ON public.usage_metric
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: plan
CREATE TABLE IF NOT EXISTS public.plan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  monthly_price INTEGER NOT NULL,
  annual_price INTEGER NOT NULL,
  features JSONB NOT NULL,
  popular BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.plan ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "plan_access" ON public.plan
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


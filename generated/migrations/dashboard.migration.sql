-- Generated migration for dashboard

-- Table: overview_metric
CREATE TABLE IF NOT EXISTS public.overview_metric (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change INTEGER NOT NULL,
  icon JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.overview_metric ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "overview_metric_access" ON public.overview_metric
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: review
CREATE TABLE IF NOT EXISTS public.review (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  rating INTEGER NOT NULL,
  date TEXT NOT NULL,
  text TEXT NOT NULL,
  photos JSONB,
  is_responded BOOLEAN NOT NULL,
  response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.review ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "review_access" ON public.review
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: performance_data
CREATE TABLE IF NOT EXISTS public.performance_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  views INTEGER NOT NULL,
  calls INTEGER NOT NULL,
  directions INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.performance_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "performance_data_access" ON public.performance_data
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: customer_insight
CREATE TABLE IF NOT EXISTS public.customer_insight (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change INTEGER NOT NULL,
  icon JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.customer_insight ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "customer_insight_access" ON public.customer_insight
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: a_i_suggestion
CREATE TABLE IF NOT EXISTS public.a_i_suggestion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL,
  action TEXT,
  action_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.a_i_suggestion ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "a_i_suggestion_access" ON public.a_i_suggestion
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: business
CREATE TABLE IF NOT EXISTS public.business (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  cover_image TEXT NOT NULL,
  logo TEXT,
  description TEXT NOT NULL,
  completion_percentage INTEGER NOT NULL,
  verified BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.business ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "business_access" ON public.business
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: coupon_performance
CREATE TABLE IF NOT EXISTS public.coupon_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL,
  value INTEGER NOT NULL,
  status TEXT NOT NULL,
  views INTEGER NOT NULL,
  redemptions INTEGER NOT NULL,
  redemption_rate INTEGER NOT NULL,
  revenue INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.coupon_performance ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "coupon_performance_access" ON public.coupon_performance
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: loyalty_program_stats
CREATE TABLE IF NOT EXISTS public.loyalty_program_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_members INTEGER NOT NULL,
  member_growth INTEGER NOT NULL,
  tier_distribution JSONB NOT NULL,
  points_issued INTEGER NOT NULL,
  points_redeemed INTEGER NOT NULL,
  redemption_rate INTEGER NOT NULL,
  average_engagement INTEGER NOT NULL,
  active_members INTEGER NOT NULL,
  active_members_percentage INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.loyalty_program_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "loyalty_program_stats_access" ON public.loyalty_program_stats
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: achievement_participation
CREATE TABLE IF NOT EXISTS public.achievement_participation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  participants INTEGER NOT NULL,
  completions INTEGER NOT NULL,
  completion_rate INTEGER NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.achievement_participation ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "achievement_participation_access" ON public.achievement_participation
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


-- Table: reward_program_r_o_i
CREATE TABLE IF NOT EXISTS public.reward_program_r_o_i (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  total_revenue INTEGER NOT NULL,
  reward_influenced_revenue INTEGER NOT NULL,
  roi_percentage INTEGER NOT NULL,
  cost_of_rewards INTEGER NOT NULL,
  net_profit INTEGER NOT NULL,
  customer_retention INTEGER NOT NULL,
  repeat_purchase_rate INTEGER NOT NULL,
  average_order_value INTEGER NOT NULL,
  average_order_value_change INTEGER NOT NULL,
  lifetime_value INTEGER NOT NULL,
  lifetime_value_change INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.reward_program_r_o_i ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "reward_program_r_o_i_access" ON public.reward_program_r_o_i
  FOR ALL TO authenticated
  USING (auth.uid() IS NOT NULL);


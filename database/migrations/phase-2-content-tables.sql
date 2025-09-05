-- =========================================================================
-- PHASE 2: CONTENT TABLES - Events, News, Deals, Reviews, and User Content
-- =========================================================================
-- Creates tables for user-generated and business content
-- Based on Magic Patterns UI analysis

-- -------------------------------------------------------------------------
-- Events System
-- -------------------------------------------------------------------------

-- Events (both community and business events)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  organizer_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  
  -- Event Details
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  event_type VARCHAR(50) DEFAULT 'general', -- business, community, private, meetup, conference, etc.
  
  -- Scheduling
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  all_day BOOLEAN DEFAULT false,
  timezone VARCHAR(50) DEFAULT 'America/Chicago',
  recurring_pattern JSONB, -- {type: 'weekly', interval: 1, days: ['monday', 'wednesday']}
  
  -- Location
  venue_name VARCHAR(200),
  address_street VARCHAR(200),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_virtual BOOLEAN DEFAULT false,
  virtual_link VARCHAR(500),
  
  -- Event Management
  capacity INTEGER,
  current_attendees INTEGER DEFAULT 0,
  registration_required BOOLEAN DEFAULT false,
  registration_deadline TIMESTAMPTZ,
  price DECIMAL(10,2) DEFAULT 0.00,
  is_free BOOLEAN DEFAULT true,
  
  -- Content
  featured_image_url VARCHAR(500),
  gallery_images TEXT[], -- array of image URLs
  tags TEXT[],
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed', 'private')),
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT true,
  
  -- SEO
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  interested_count INTEGER DEFAULT 0,
  attending_count INTEGER DEFAULT 0,
  
  -- Timestamps
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event categories for classification
CREATE TABLE IF NOT EXISTS public.event_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50),
  color_hex VARCHAR(7) DEFAULT '#6B7280',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table for event categories (many-to-many)
CREATE TABLE IF NOT EXISTS public.event_category_assignments (
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.event_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (event_id, category_id)
);

-- Event attendees/RSVPs
CREATE TABLE IF NOT EXISTS public.event_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'interested' CHECK (status IN ('interested', 'attending', 'maybe', 'not_attending')),
  registration_data JSONB, -- additional registration information
  checked_in BOOLEAN DEFAULT false,
  check_in_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- -------------------------------------------------------------------------
-- News and Articles System
-- -------------------------------------------------------------------------

-- News articles and blog posts
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  
  -- Content
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url VARCHAR(500),
  gallery_images TEXT[],
  
  -- Classification
  article_type VARCHAR(50) DEFAULT 'article', -- article, news, blog, press_release, guide
  tags TEXT[],
  
  -- Publishing
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'scheduled')),
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  is_featured BOOLEAN DEFAULT false,
  is_breaking_news BOOLEAN DEFAULT false,
  
  -- SEO
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  canonical_url VARCHAR(500),
  
  -- Engagement
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  
  -- Content Management
  editor_notes TEXT,
  last_reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article categories
CREATE TABLE IF NOT EXISTS public.article_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table for article categories
CREATE TABLE IF NOT EXISTS public.article_category_assignments (
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.article_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (article_id, category_id)
);

-- -------------------------------------------------------------------------
-- Reviews and Ratings System
-- -------------------------------------------------------------------------

-- User reviews for businesses
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Review Content
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(200),
  content TEXT,
  
  -- Review Details
  visit_date DATE,
  service_rating INTEGER CHECK (service_rating BETWEEN 1 AND 5),
  atmosphere_rating INTEGER CHECK (atmosphere_rating BETWEEN 1 AND 5),
  value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
  
  -- Photos
  photos TEXT[], -- array of photo URLs
  
  -- Moderation
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('pending', 'published', 'flagged', 'removed')),
  is_verified_visit BOOLEAN DEFAULT false,
  moderation_notes TEXT,
  
  -- Engagement
  helpful_count INTEGER DEFAULT 0,
  unhelpful_count INTEGER DEFAULT 0,
  reply_count INTEGER DEFAULT 0,
  
  -- Business Response
  business_response TEXT,
  business_response_date TIMESTAMPTZ,
  business_responder_id UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, user_id) -- One review per user per business
);

-- Review helpfulness votes
CREATE TABLE IF NOT EXISTS public.review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type VARCHAR(10) CHECK (vote_type IN ('helpful', 'unhelpful')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

-- -------------------------------------------------------------------------
-- Deals and Promotions System
-- -------------------------------------------------------------------------

-- Business deals and promotions
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  
  -- Deal Details
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Deal Type and Value
  deal_type VARCHAR(50) NOT NULL, -- percentage, fixed_amount, bogo, free_item, bundle
  discount_percentage INTEGER CHECK (discount_percentage BETWEEN 0 AND 100),
  discount_amount DECIMAL(10,2),
  original_price DECIMAL(10,2),
  sale_price DECIMAL(10,2),
  
  -- Terms and Conditions
  terms_conditions TEXT,
  minimum_purchase DECIMAL(10,2),
  maximum_discount DECIMAL(10,2),
  applicable_items TEXT[], -- specific menu items or products
  
  -- Availability
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  days_of_week INTEGER[], -- 0=Sunday, 1=Monday, etc.
  time_restrictions JSONB, -- {start_time: "10:00", end_time: "15:00"}
  
  -- Usage Limits
  usage_limit_per_user INTEGER,
  total_usage_limit INTEGER,
  current_usage_count INTEGER DEFAULT 0,
  
  -- Promo Codes
  promo_code VARCHAR(50),
  is_code_required BOOLEAN DEFAULT false,
  
  -- Visibility and Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'expired', 'cancelled')),
  is_featured BOOLEAN DEFAULT false,
  is_exclusive BOOLEAN DEFAULT false,
  
  -- Targeting
  target_audience JSONB, -- demographics, location, loyalty tier, etc.
  
  -- Images
  featured_image_url VARCHAR(500),
  gallery_images TEXT[],
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  redemption_count INTEGER DEFAULT 0,
  save_count INTEGER DEFAULT 0, -- users who saved the deal
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, slug)
);

-- Deal categories for organization
CREATE TABLE IF NOT EXISTS public.deal_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50),
  color_hex VARCHAR(7) DEFAULT '#6B7280',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table for deal categories
CREATE TABLE IF NOT EXISTS public.deal_category_assignments (
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.deal_categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (deal_id, category_id)
);

-- Deal usage tracking
CREATE TABLE IF NOT EXISTS public.deal_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  
  -- Redemption Details
  redemption_code VARCHAR(100), -- unique code for this redemption
  redemption_amount DECIMAL(10,2), -- actual amount saved
  original_amount DECIMAL(10,2),
  final_amount DECIMAL(10,2),
  
  -- Verification
  is_verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES auth.users(id),
  verification_method VARCHAR(50), -- qr_code, manual, pos_integration
  
  -- Location and Context
  redeemed_at_location JSONB, -- store location, coordinates
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'cancelled', 'expired')),
  
  redeemed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User saved deals (wishlist/favorites)
CREATE TABLE IF NOT EXISTS public.user_saved_deals (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, deal_id)
);

-- -------------------------------------------------------------------------
-- User Favorites and Collections
-- -------------------------------------------------------------------------

-- User favorites for businesses, events, articles, etc.
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Polymorphic references (only one should be set)
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  
  -- Metadata
  favorite_type VARCHAR(20) NOT NULL CHECK (favorite_type IN ('business', 'event', 'article', 'deal')),
  notes TEXT, -- personal notes about the favorite
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure polymorphic integrity
  CHECK (
    (favorite_type = 'business' AND business_id IS NOT NULL AND event_id IS NULL AND article_id IS NULL AND deal_id IS NULL) OR
    (favorite_type = 'event' AND event_id IS NOT NULL AND business_id IS NULL AND article_id IS NULL AND deal_id IS NULL) OR
    (favorite_type = 'article' AND article_id IS NOT NULL AND business_id IS NULL AND event_id IS NULL AND deal_id IS NULL) OR
    (favorite_type = 'deal' AND deal_id IS NOT NULL AND business_id IS NULL AND event_id IS NULL AND article_id IS NULL)
  )
);

-- User collections (custom lists of favorites)
CREATE TABLE IF NOT EXISTS public.user_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  cover_image_url VARCHAR(500),
  color_hex VARCHAR(7) DEFAULT '#6B7280',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction table for collection items
CREATE TABLE IF NOT EXISTS public.collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES public.user_collections(id) ON DELETE CASCADE,
  favorite_id UUID NOT NULL REFERENCES public.user_favorites(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(collection_id, favorite_id)
);

-- -------------------------------------------------------------------------
-- Indexes for Performance
-- -------------------------------------------------------------------------

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_business_id ON public.events(business_id);
CREATE INDEX IF NOT EXISTS idx_events_organizer ON public.events(organizer_user_id);
CREATE INDEX IF NOT EXISTS idx_events_dates ON public.events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_events_location ON public.events(address_city, address_state);
CREATE INDEX IF NOT EXISTS idx_events_coords ON public.events(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_featured ON public.events(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_events_published ON public.events(published_at, status);

-- Articles indexes
CREATE INDEX IF NOT EXISTS idx_articles_author ON public.articles(author_user_id);
CREATE INDEX IF NOT EXISTS idx_articles_business ON public.articles(business_id);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published_at, status);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_articles_type ON public.articles(article_type);
CREATE INDEX IF NOT EXISTS idx_articles_search ON public.articles USING gin(to_tsvector('english', title || ' ' || excerpt || ' ' || COALESCE(content, '')));

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON public.reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_date ON public.reviews(created_at);

-- Deals indexes
CREATE INDEX IF NOT EXISTS idx_deals_business_id ON public.deals(business_id);
CREATE INDEX IF NOT EXISTS idx_deals_dates ON public.deals(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_deals_status ON public.deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_featured ON public.deals(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_deals_code ON public.deals(promo_code) WHERE promo_code IS NOT NULL;

-- User favorites indexes
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_type ON public.user_favorites(favorite_type);
CREATE INDEX IF NOT EXISTS idx_user_favorites_business ON public.user_favorites(business_id) WHERE business_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_favorites_event ON public.user_favorites(event_id) WHERE event_id IS NOT NULL;

-- -------------------------------------------------------------------------
-- Row Level Security (RLS) Policies
-- -------------------------------------------------------------------------

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "events_public_read" ON public.events
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "events_organizer_write" ON public.events
  FOR ALL TO authenticated
  USING (organizer_user_id = auth.uid() OR (public.events.business_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = public.events.business_id AND b.owner_user_id = auth.uid()
  )))
  WITH CHECK (organizer_user_id = auth.uid() OR (public.events.business_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = public.events.business_id AND b.owner_user_id = auth.uid()
  )));

-- Articles policies
CREATE POLICY "articles_public_read" ON public.articles
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "articles_author_write" ON public.articles
  FOR ALL TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

-- Reviews policies
CREATE POLICY "reviews_read" ON public.reviews
  FOR SELECT TO authenticated
  USING (status = 'published' OR auth.uid() = user_id);

CREATE POLICY "reviews_own_write" ON public.reviews
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Deals policies
CREATE POLICY "deals_public_read" ON public.deals
  FOR SELECT TO authenticated
  USING (status = 'active' AND start_date <= NOW() AND end_date >= NOW());

CREATE POLICY "deals_business_write" ON public.deals
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = public.deals.business_id AND b.owner_user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = public.deals.business_id AND b.owner_user_id = auth.uid()
  ));

-- User favorites policies
CREATE POLICY "user_favorites_own" ON public.user_favorites
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User collections policies  
CREATE POLICY "user_collections_own" ON public.user_collections
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Categories are public read
CREATE POLICY "event_categories_read" ON public.event_categories
  FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "article_categories_read" ON public.article_categories
  FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "deal_categories_read" ON public.deal_categories
  FOR SELECT TO authenticated
  USING (is_active = true);

-- -------------------------------------------------------------------------
-- Triggers for Updated Timestamps
-- -------------------------------------------------------------------------

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_deals_updated_at
    BEFORE UPDATE ON public.deals
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_user_collections_updated_at
    BEFORE UPDATE ON public.user_collections
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- -------------------------------------------------------------------------
-- Functions for Aggregation Updates
-- -------------------------------------------------------------------------

-- Function to update business review stats
CREATE OR REPLACE FUNCTION public.update_business_review_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE public.businesses 
    SET 
      average_rating = (
        SELECT ROUND(AVG(rating)::numeric, 2) 
        FROM public.reviews 
        WHERE public.reviews.business_id = NEW.business_id AND status = 'published'
      ),
      review_count = (
        SELECT COUNT(*) 
        FROM public.reviews 
        WHERE public.reviews.business_id = NEW.business_id AND status = 'published'
      )
    WHERE id = NEW.business_id;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.businesses 
    SET 
      average_rating = (
        SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) 
        FROM public.reviews 
        WHERE public.reviews.business_id = OLD.business_id AND status = 'published'
      ),
      review_count = (
        SELECT COUNT(*) 
        FROM public.reviews 
        WHERE public.reviews.business_id = OLD.business_id AND status = 'published'
      )
    WHERE id = OLD.business_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Apply trigger to reviews table
CREATE TRIGGER update_business_review_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_business_review_stats();

-- -------------------------------------------------------------------------
-- Comments for Documentation
-- -------------------------------------------------------------------------

COMMENT ON TABLE public.events IS 'Community and business events with RSVP functionality';
COMMENT ON TABLE public.articles IS 'News articles, blog posts, and content management';
COMMENT ON TABLE public.reviews IS 'User reviews and ratings for businesses';
COMMENT ON TABLE public.deals IS 'Business deals, promotions, and coupons';
COMMENT ON TABLE public.user_favorites IS 'User favorites across all content types';
COMMENT ON TABLE public.user_collections IS 'User-created collections of favorites';

-- =========================================================================
-- END PHASE 2: CONTENT TABLES
-- =========================================================================
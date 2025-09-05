-- =========================================================================
-- PHASE 2: CONTENT & INTERACTION TABLES
-- =========================================================================
-- Creates content management and user interaction tables
-- Based on UI requirements from Magic Patterns

-- -------------------------------------------------------------------------
-- Event Management System  
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
  
  -- Recurrence (if needed later)
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern JSONB, -- {type: 'weekly', days: [1,3,5], until: '2024-12-31'}
  
  -- Location (optional - could be virtual)
  is_virtual BOOLEAN DEFAULT false,
  location_name VARCHAR(255),
  address_street VARCHAR(200),
  address_city VARCHAR(100),
  address_state VARCHAR(100), 
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  meeting_url VARCHAR(500), -- for virtual events
  
  -- Capacity and Registration
  capacity INTEGER,
  registration_required BOOLEAN DEFAULT false,
  registration_url VARCHAR(500),
  attendee_count INTEGER DEFAULT 0,
  
  -- Visuals
  featured_image_url VARCHAR(500),
  gallery_images TEXT[],
  
  -- Pricing
  is_free BOOLEAN DEFAULT true,
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  pricing_info TEXT,
  
  -- Categories and Tags
  event_category public.event_category, -- From base schema enum
  tags TEXT[],
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'postponed', 'completed')),
  cancellation_reason TEXT,
  
  -- SEO
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  
  -- Metadata
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  interested_count INTEGER DEFAULT 0,
  
  -- Publishing
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event attendees/interested users
CREATE TABLE IF NOT EXISTS public.event_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'interested' CHECK (status IN ('interested', 'going', 'maybe', 'not_going')),
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
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article categories (flexible taxonomy)
CREATE TABLE IF NOT EXISTS public.article_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.article_categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article to category mapping
CREATE TABLE IF NOT EXISTS public.article_category_mapping (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.article_categories(id) ON DELETE CASCADE,
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
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200),
  content TEXT NOT NULL,
  pros TEXT,
  cons TEXT,
  
  -- Photos
  photos TEXT[],
  
  -- Response from business
  owner_response TEXT,
  owner_response_at TIMESTAMPTZ,
  
  -- Verification
  is_verified_purchase BOOLEAN DEFAULT false,
  visit_date DATE,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'flagged', 'removed')),
  flagged_reason TEXT,
  
  -- Helpful votes
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(business_id, user_id) -- One review per user per business
);

-- Review votes (helpful/not helpful)
CREATE TABLE IF NOT EXISTS public.review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type VARCHAR(20) NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),
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
  
  -- Deal details
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  terms_conditions TEXT,
  
  -- Discount info
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed', 'bogo', 'freebie', 'other')),
  discount_value DECIMAL(10,2), -- percentage or fixed amount
  discount_description VARCHAR(200), -- "20% off", "$5 off", "Buy one get one free"
  
  -- Validity
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  
  -- Usage limits
  max_uses_total INTEGER,
  max_uses_per_user INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  
  -- Redemption
  promo_code VARCHAR(50),
  requires_coupon BOOLEAN DEFAULT true,
  online_only BOOLEAN DEFAULT false,
  in_store_only BOOLEAN DEFAULT false,
  
  -- Images
  image_url VARCHAR(500),
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'expired', 'paused', 'sold_out')),
  
  -- Features
  is_featured BOOLEAN DEFAULT false,
  is_exclusive BOOLEAN DEFAULT false, -- exclusive to our platform
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(business_id, slug)
);

-- Deal redemptions tracking (for analytics)
CREATE TABLE IF NOT EXISTS public.deal_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  redemption_code VARCHAR(100) UNIQUE,
  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- User Interaction Tables
-- -------------------------------------------------------------------------

-- User saved items (favorites)
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  
  -- Polymorphic favorites
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  
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
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  cover_image_url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, slug)
);

-- Items in collections
CREATE TABLE IF NOT EXISTS public.collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES public.user_collections(id) ON DELETE CASCADE,
  favorite_id UUID NOT NULL REFERENCES public.user_favorites(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
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

-- Collections indexes
CREATE INDEX IF NOT EXISTS idx_user_collections_user ON public.user_collections(user_id);
CREATE INDEX IF NOT EXISTS idx_user_collections_public ON public.user_collections(is_public) WHERE is_public = true;

-- -------------------------------------------------------------------------
-- Row Level Security (RLS) Policies
-- -------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_category_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

-- Events policies
CREATE POLICY "events_public_read" ON public.events
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "events_organizer_write" ON public.events
  FOR ALL TO authenticated
  USING (organizer_user_id = auth.uid() OR (events.business_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = events.business_id AND b.owner_user_id = auth.uid()
  )))
  WITH CHECK (organizer_user_id = auth.uid() OR (events.business_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = events.business_id AND b.owner_user_id = auth.uid()
  )));

-- Articles policies
CREATE POLICY "articles_public_read" ON public.articles
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "articles_author_write" ON public.articles
  FOR ALL TO authenticated
  USING (author_user_id = auth.uid())
  WITH CHECK (author_user_id = auth.uid());

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
    WHERE b.id = deals.business_id AND b.owner_user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = deals.business_id AND b.owner_user_id = auth.uid()
  ));

-- User favorites policies
CREATE POLICY "user_favorites_own" ON public.user_favorites
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User collections policies  
CREATE POLICY "user_collections_own" ON public.user_collections
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR is_public = true)
  WITH CHECK (auth.uid() = user_id);

-- Collection items policies
CREATE POLICY "collection_items_read" ON public.collection_items
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_collections c
    WHERE c.id = collection_id 
    AND (c.user_id = auth.uid() OR c.is_public = true)
  ));

CREATE POLICY "collection_items_write" ON public.collection_items
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.user_collections c
    WHERE c.id = collection_id AND c.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_collections c
    WHERE c.id = collection_id AND c.user_id = auth.uid()
  ));

-- Event attendees policies
CREATE POLICY "event_attendees_read" ON public.event_attendees
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.events e
    WHERE e.id = event_id AND e.status = 'published'
  ));

CREATE POLICY "event_attendees_write" ON public.event_attendees
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Article categories public read
CREATE POLICY "article_categories_read" ON public.article_categories
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Review votes policies
CREATE POLICY "review_votes_own" ON public.review_votes
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Deal redemptions policies
CREATE POLICY "deal_redemptions_own" ON public.deal_redemptions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- -------------------------------------------------------------------------
-- Triggers for Updated Timestamps
-- -------------------------------------------------------------------------

-- Apply to all tables with updated_at
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

CREATE TRIGGER update_event_attendees_updated_at
    BEFORE UPDATE ON public.event_attendees
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_article_categories_updated_at
    BEFORE UPDATE ON public.article_categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- -------------------------------------------------------------------------
-- Business Rating Aggregation Trigger
-- -------------------------------------------------------------------------

-- Function to update business ratings when reviews change
CREATE OR REPLACE FUNCTION public.update_business_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP IN ('INSERT', 'UPDATE') THEN
    UPDATE public.businesses 
    SET 
      average_rating = (
        SELECT ROUND(AVG(rating)::numeric, 2) 
        FROM public.reviews 
        WHERE reviews.business_id = NEW.business_id AND status = 'published'
      ),
      review_count = (
        SELECT COUNT(*) 
        FROM public.reviews 
        WHERE reviews.business_id = NEW.business_id AND status = 'published'
      )
    WHERE id = NEW.business_id;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.businesses 
    SET 
      average_rating = (
        SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) 
        FROM public.reviews 
        WHERE reviews.business_id = OLD.business_id AND status = 'published'
      ),
      review_count = (
        SELECT COUNT(*) 
        FROM public.reviews 
        WHERE reviews.business_id = OLD.business_id AND status = 'published'
      )
    WHERE id = OLD.business_id;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update business ratings
CREATE TRIGGER update_business_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_business_rating();

-- =========================================================================
-- END PHASE 2: CONTENT & INTERACTION TABLES
-- =========================================================================
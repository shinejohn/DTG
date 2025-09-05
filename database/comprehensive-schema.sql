-- =========================================================================
-- COMPREHENSIVE DOWNTOWN GUIDE DATABASE SCHEMA
-- UI-Driven Design Based on Magic Patterns Analysis
-- =========================================================================
-- This schema includes only essential MakerKit components plus complete
-- Magic Patterns functionality for cloud deployment

-- -------------------------------------------------------------------------
-- ESSENTIAL MAKERKIT FOUNDATION (Minimal Required)
-- -------------------------------------------------------------------------

-- Essential enums (only what we need)
CREATE TYPE public.user_role AS ENUM('user', 'business_owner', 'admin');

-- Simple accounts (no complex multi-tenancy)
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  account_type public.user_role DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- CORE USER SYSTEM (Magic Patterns Driven)
-- -------------------------------------------------------------------------

-- Extended user profiles (what the UI actually needs)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  
  -- Profile Information (from Login/Register UI)
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  email VARCHAR(320) NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT,
  
  -- Location (from Home UI - city selection)
  current_city VARCHAR(100),
  current_state VARCHAR(100),
  current_country VARCHAR(100) DEFAULT 'US',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Preferences (from UI components)
  theme_preference VARCHAR(20) DEFAULT 'light', -- light, dark
  language_preference VARCHAR(10) DEFAULT 'en',
  distance_unit VARCHAR(10) DEFAULT 'miles', -- miles, kilometers
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  
  -- Activity Tracking
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  last_city_search VARCHAR(100),
  
  -- Status
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User search history (from search UI)
CREATE TABLE IF NOT EXISTS public.user_search_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  search_query VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  category VARCHAR(100),
  results_count INTEGER DEFAULT 0,
  clicked_business_id UUID, -- if user clicked a result
  searched_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- COMMUNITIES AND BRANDS (from Home UI city selection)
-- -------------------------------------------------------------------------

-- Communities (cities/regions the app serves)
CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL, -- "New York City"
  slug VARCHAR(100) NOT NULL UNIQUE, -- "nyc"
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'US',
  
  -- Geographic bounds for the community
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  radius_miles INTEGER DEFAULT 25, -- search radius
  
  -- Brand customization (from UI)
  primary_color VARCHAR(7) DEFAULT '#3B82F6',
  background_image_url VARCHAR(500),
  logo_url VARCHAR(500),
  
  -- Content customization
  headline_template VARCHAR(200) DEFAULT 'Discover {city}',
  description_template VARCHAR(500) DEFAULT 'Explore the best of {city}',
  search_placeholder VARCHAR(200) DEFAULT 'Search for restaurants, shops, events...',
  
  -- SEO
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- BUSINESS DIRECTORY (Core Magic Patterns Functionality)
-- -------------------------------------------------------------------------

-- Business categories (from CategorySection UI)
CREATE TABLE IF NOT EXISTS public.business_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50), -- lucide icon names
  color_hex VARCHAR(7) DEFAULT '#6B7280',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business subcategories
CREATE TABLE IF NOT EXISTS public.business_subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.business_categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- Main business directory (from BusinessProfile and FeaturedPlaces UI)
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  
  -- Basic Information (from BusinessProfile UI)
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  short_description TEXT,
  tagline VARCHAR(200),
  
  -- Classification
  category_id UUID NOT NULL REFERENCES public.business_categories(id),
  subcategory_id UUID REFERENCES public.business_subcategories(id),
  tags TEXT[], -- for search
  
  -- Contact Information
  phone VARCHAR(20),
  email VARCHAR(320),
  website_url VARCHAR(300),
  
  -- Address (essential for location-based app)
  address_street VARCHAR(200),
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  
  -- Business Details (from UI mock data)
  price_range VARCHAR(10) CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
  features TEXT[], -- ["wifi", "outdoor_seating", "wheelchair_accessible"]
  amenities TEXT[], -- ["parking", "takeout", "delivery"]
  payment_methods TEXT[], -- ["cash", "credit_card", "mobile_payment"]
  
  -- Images (from BusinessCard UI)
  logo_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  gallery_images TEXT[], -- array of image URLs
  
  -- Social Media
  social_facebook VARCHAR(100),
  social_instagram VARCHAR(100),
  social_twitter VARCHAR(100),
  social_yelp VARCHAR(200),
  
  -- Status and Verification
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'closed')),
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false, -- for FeaturedPlaces component
  is_claimed BOOLEAN DEFAULT false,
  
  -- Metrics (from UI components)
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  phone_clicks INTEGER DEFAULT 0,
  website_clicks INTEGER DEFAULT 0,
  direction_requests INTEGER DEFAULT 0,
  
  -- SEO
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- Business hours (from BusinessProfile UI)
CREATE TABLE IF NOT EXISTS public.business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday
  is_closed BOOLEAN DEFAULT false,
  open_time TIME,
  close_time TIME,
  is_24_hours BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, day_of_week)
);

-- Menu items (from business dashboard UI)
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(100), -- "Beverages", "Breakfast", "Lunch"
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  dietary_tags TEXT[], -- ["vegetarian", "vegan", "gluten-free"]
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- CONTENT SYSTEM (News, Events, from NewsAndEvents UI)
-- -------------------------------------------------------------------------

-- Articles and news (from NewsAndEvents component)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  
  -- Content
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url VARCHAR(500),
  
  -- Classification
  article_type VARCHAR(50) DEFAULT 'news', -- news, event, guide, business_feature
  tags TEXT[],
  
  -- Publishing
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false, -- for TrendingNow component
  
  -- Engagement
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- Events (from EventsCalendar and NewsAndEvents UI)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  organizer_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  
  -- Event Details
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Scheduling
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  all_day BOOLEAN DEFAULT false,
  timezone VARCHAR(50) DEFAULT 'America/New_York',
  
  -- Location
  venue_name VARCHAR(200),
  address_street VARCHAR(200),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_virtual BOOLEAN DEFAULT false,
  virtual_link VARCHAR(500),
  
  -- Event Details
  price DECIMAL(10,2) DEFAULT 0.00,
  is_free BOOLEAN DEFAULT true,
  capacity INTEGER,
  current_attendees INTEGER DEFAULT 0,
  
  -- Content
  featured_image_url VARCHAR(500),
  gallery_images TEXT[],
  tags TEXT[],
  
  -- Status
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  is_featured BOOLEAN DEFAULT false,
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  interested_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- -------------------------------------------------------------------------
-- USER ENGAGEMENT (Reviews, Favorites, from CommunityActivity UI)
-- -------------------------------------------------------------------------

-- Reviews (from ReviewCard component and CommunityActivity)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Review Content
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(200),
  content TEXT,
  
  -- Additional Ratings
  service_rating INTEGER CHECK (service_rating BETWEEN 1 AND 5),
  atmosphere_rating INTEGER CHECK (atmosphere_rating BETWEEN 1 AND 5),
  value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
  
  -- Context
  visit_date DATE,
  photos TEXT[], -- review photos
  
  -- Status
  status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('pending', 'published', 'flagged', 'removed')),
  is_verified BOOLEAN DEFAULT false,
  
  -- Engagement
  helpful_count INTEGER DEFAULT 0,
  
  -- Business Response
  business_response TEXT,
  business_response_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(business_id, user_id) -- one review per user per business
);

-- User favorites (from UI - save/favorite functionality)
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  notes TEXT, -- personal notes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, business_id)
);

-- Deals and promotions (from business dashboard UI)
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  
  -- Deal Details
  title VARCHAR(200) NOT NULL,
  description TEXT,
  deal_type VARCHAR(50) NOT NULL, -- percentage, fixed_amount, bogo, free_item
  discount_percentage INTEGER CHECK (discount_percentage BETWEEN 0 AND 100),
  discount_amount DECIMAL(10,2),
  
  -- Terms
  terms_conditions TEXT,
  promo_code VARCHAR(50),
  
  -- Availability
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  usage_limit INTEGER,
  current_usage INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'expired')),
  is_featured BOOLEAN DEFAULT false,
  
  -- Content
  image_url VARCHAR(500),
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  claim_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- ANALYTICS (from business dashboard UI)
-- -------------------------------------------------------------------------

-- Business analytics summary (for dashboard UI)
CREATE TABLE IF NOT EXISTS public.business_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- Profile metrics (from dashboard mock data)
  profile_views INTEGER DEFAULT 0,
  phone_clicks INTEGER DEFAULT 0,
  website_clicks INTEGER DEFAULT 0,
  direction_requests INTEGER DEFAULT 0,
  photo_views INTEGER DEFAULT 0,
  
  -- Engagement
  review_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  
  -- Deal performance
  deal_views INTEGER DEFAULT 0,
  deal_redemptions INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, date)
);

-- -------------------------------------------------------------------------
-- SEARCH AND DISCOVERY
-- -------------------------------------------------------------------------

-- Search analytics (to improve search results)
CREATE TABLE IF NOT EXISTS public.search_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  search_query VARCHAR(255) NOT NULL,
  category_filter VARCHAR(100),
  results_count INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  date DATE DEFAULT CURRENT_DATE,
  
  -- Aggregate by date for performance
  UNIQUE(community_id, search_query, category_filter, date)
);

-- -------------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- -------------------------------------------------------------------------

-- User profiles
CREATE INDEX IF NOT EXISTS idx_user_profiles_location ON public.user_profiles(current_city, current_state);
CREATE INDEX IF NOT EXISTS idx_user_profiles_active ON public.user_profiles(last_active_at);

-- Businesses (critical for location-based searches)
CREATE INDEX IF NOT EXISTS idx_businesses_location ON public.businesses(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_businesses_community ON public.businesses(community_id, status);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses(category_id, status);
CREATE INDEX IF NOT EXISTS idx_businesses_featured ON public.businesses(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_businesses_rating ON public.businesses(average_rating);
CREATE INDEX IF NOT EXISTS idx_businesses_search ON public.businesses USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- Reviews (for community activity)
CREATE INDEX IF NOT EXISTS idx_reviews_business ON public.reviews(business_id, status);
CREATE INDEX IF NOT EXISTS idx_reviews_recent ON public.reviews(created_at DESC, status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating, status);

-- Events (for events calendar)
CREATE INDEX IF NOT EXISTS idx_events_dates ON public.events(start_date, end_date, status);
CREATE INDEX IF NOT EXISTS idx_events_community ON public.events(community_id, status);
CREATE INDEX IF NOT EXISTS idx_events_featured ON public.events(is_featured, status);

-- Articles (for news feed)
CREATE INDEX IF NOT EXISTS idx_articles_community ON public.articles(community_id, status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published_at DESC, status);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(is_featured, status);

-- Analytics
CREATE INDEX IF NOT EXISTS idx_business_analytics_business_date ON public.business_analytics(business_id, date);
CREATE INDEX IF NOT EXISTS idx_search_analytics_community_date ON public.search_analytics(community_id, date);

-- -------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- -------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- User data policies
CREATE POLICY "users_own_data" ON public.user_profiles
  FOR ALL TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "users_own_favorites" ON public.user_favorites
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_reviews" ON public.reviews
  FOR ALL TO authenticated
  USING (auth.uid() = user_id OR status = 'published')
  WITH CHECK (auth.uid() = user_id);

-- Business policies (public read for active businesses)
CREATE POLICY "businesses_public_read" ON public.businesses
  FOR SELECT TO authenticated
  USING (status = 'active');

CREATE POLICY "businesses_owner_write" ON public.businesses
  FOR ALL TO authenticated
  USING (auth.uid() = owner_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

-- Content policies (public read for published content)
CREATE POLICY "events_public_read" ON public.events
  FOR SELECT TO authenticated
  USING (status = 'published');

CREATE POLICY "articles_public_read" ON public.articles
  FOR SELECT TO authenticated
  USING (status = 'published');

CREATE POLICY "deals_public_read" ON public.deals
  FOR SELECT TO authenticated
  USING (status = 'active' AND start_date <= NOW() AND end_date >= NOW());

-- -------------------------------------------------------------------------
-- FUNCTIONS AND TRIGGERS
-- -------------------------------------------------------------------------

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

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
        WHERE business_id = NEW.business_id AND status = 'published'
      ),
      review_count = (
        SELECT COUNT(*) 
        FROM public.reviews 
        WHERE business_id = NEW.business_id AND status = 'published'
      )
    WHERE id = NEW.business_id;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE public.businesses 
    SET 
      average_rating = (
        SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) 
        FROM public.reviews 
        WHERE business_id = OLD.business_id AND status = 'published'
      ),
      review_count = (
        SELECT COUNT(*) 
        FROM public.reviews 
        WHERE business_id = OLD.business_id AND status = 'published'
      )
    WHERE id = OLD.business_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Trigger for review stats
CREATE TRIGGER update_business_review_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_business_review_stats();

-- =========================================================================
-- SEED DATA (Essential for Magic Patterns UI to work)
-- =========================================================================

-- Default communities (from Home UI city selector)
INSERT INTO public.communities (id, name, slug, state, country, latitude, longitude, headline_template, description_template) VALUES
('01234567-89ab-cdef-0123-456789abcdef', 'New York City', 'nyc', 'New York', 'US', 40.7128, -74.0060, 'Discover {city}', 'Explore the best of {city}'),
('01234567-89ab-cdef-0123-456789abcde0', 'Los Angeles', 'la', 'California', 'US', 34.0522, -118.2437, 'Experience {city}', 'Find amazing places in {city}'),
('01234567-89ab-cdef-0123-456789abcde1', 'Chicago', 'chicago', 'Illinois', 'US', 41.8781, -87.6298, 'Explore {city}', 'Discover hidden gems in {city}'),
('01234567-89ab-cdef-0123-456789abcde2', 'Austin', 'austin', 'Texas', 'US', 30.2672, -97.7431, 'Keep it weird in {city}', 'Experience the unique culture of {city}')
ON CONFLICT (slug) DO NOTHING;

-- Business categories (from CategorySection UI)
INSERT INTO public.business_categories (name, slug, icon_name, color_hex, display_order) VALUES
('Restaurants', 'restaurants', 'utensils', '#F59E0B', 1),
('Cafés & Coffee', 'cafes-coffee', 'coffee', '#8B5CF6', 2),
('Bars & Nightlife', 'bars-nightlife', 'wine', '#EF4444', 3),
('Shopping', 'shopping', 'shopping-bag', '#3B82F6', 4),
('Health & Wellness', 'health-wellness', 'heart', '#14B8A6', 5),
('Entertainment', 'entertainment', 'film', '#7C3AED', 6),
('Services', 'services', 'briefcase', '#4338CA', 7),
('Hotels & Lodging', 'hotels-lodging', 'bed', '#7C2D12', 8)
ON CONFLICT (slug) DO NOTHING;

-- Subcategories for restaurants
INSERT INTO public.business_subcategories (category_id, name, slug, display_order) VALUES
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Fine Dining', 'fine-dining', 1),
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Casual Dining', 'casual-dining', 2),
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Fast Food', 'fast-food', 3),
((SELECT id FROM public.business_categories WHERE slug = 'cafes-coffee'), 'Coffee Shops', 'coffee-shops', 1),
((SELECT id FROM public.business_categories WHERE slug = 'cafes-coffee'), 'Bakeries', 'bakeries', 2)
ON CONFLICT (category_id, slug) DO NOTHING;

-- =========================================================================
-- END COMPREHENSIVE SCHEMA
-- =========================================================================
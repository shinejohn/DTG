-- =========================================================================
-- DOWNTOWN GUIDE - COMPLETE DATABASE SCHEMA
-- STEP 1: CREATE ALL TABLES
-- =========================================================================
-- This file creates all tables in the correct order with proper dependencies
-- Run this FIRST before any other files

-- -------------------------------------------------------------------------
-- ENUMS AND TYPES
-- -------------------------------------------------------------------------

-- User types
DO $$ BEGIN
  CREATE TYPE user_type AS ENUM ('consumer', 'business_owner', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Event categories
DO $$ BEGIN
  CREATE TYPE event_category AS ENUM (
    'community', 'music', 'sports', 'arts', 'food', 
    'education', 'business', 'charity', 'government', 'other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- -------------------------------------------------------------------------
-- CORE TABLES (NO DEPENDENCIES)
-- -------------------------------------------------------------------------

-- Communities table
CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  county VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'US',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  radius_miles INTEGER DEFAULT 25,
  timezone VARCHAR(50) DEFAULT 'America/Chicago',
  population INTEGER,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business categories
CREATE TABLE IF NOT EXISTS public.business_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50),
  color_hex VARCHAR(7) DEFAULT '#6B7280',
  parent_id UUID REFERENCES public.business_categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business subcategories
CREATE TABLE IF NOT EXISTS public.business_subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.business_categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- Article categories
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

-- -------------------------------------------------------------------------
-- USER RELATED TABLES
-- -------------------------------------------------------------------------

-- User accounts (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_accounts (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type public.user_type DEFAULT 'consumer',
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  bio TEXT,
  ip_location_city VARCHAR(100),
  ip_location_state VARCHAR(100),
  ip_location_country VARCHAR(100) DEFAULT 'US',
  preferred_community_id UUID REFERENCES public.communities(id),
  last_detected_latitude DECIMAL(10, 8),
  last_detected_longitude DECIMAL(11, 8),
  interested_categories public.event_category[],
  email_notifications BOOLEAN DEFAULT true,
  notification_radius_miles INTEGER DEFAULT 10,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  can_create_events BOOLEAN DEFAULT true,
  can_sell BOOLEAN DEFAULT false,
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  last_community_detected VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Extended user profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  bio TEXT,
  avatar_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  location_city VARCHAR(100),
  location_state VARCHAR(100),
  location_country VARCHAR(100),
  date_of_birth DATE,
  phone VARCHAR(20),
  website_url VARCHAR(300),
  is_public BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  verification_level VARCHAR(20) DEFAULT 'none',
  preferences JSONB DEFAULT '{}',
  social_links JSONB DEFAULT '{}',
  privacy_settings JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{}',
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User location history
CREATE TABLE IF NOT EXISTS public.user_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  is_current BOOLEAN DEFAULT false,
  accuracy_meters INTEGER,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- BUSINESS RELATED TABLES
-- -------------------------------------------------------------------------

-- Main businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  business_type VARCHAR(50),
  description TEXT,
  short_description TEXT,
  tagline VARCHAR(200),
  category_id UUID REFERENCES public.business_categories(id),
  subcategory_id UUID REFERENCES public.business_subcategories(id),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  tags TEXT[],
  can_host_events BOOLEAN DEFAULT false,
  event_space_capacity INTEGER,
  phone VARCHAR(20),
  email VARCHAR(320),
  website_url VARCHAR(300),
  contact_email VARCHAR(320),
  contact_phone VARCHAR(20),
  address_street VARCHAR(200),
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_postal_code VARCHAR(20),
  address_country VARCHAR(100) DEFAULT 'US',
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  hours_of_operation JSONB,
  facebook_url VARCHAR(200),
  instagram_handle VARCHAR(100),
  profile_image_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  price_range VARCHAR(10) CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
  features TEXT[],
  amenities TEXT[],
  payment_methods TEXT[],
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'rejected', 'closed')),
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_claimed BOOLEAN DEFAULT false,
  verification_date TIMESTAMPTZ,
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  logo_url VARCHAR(500),
  social_links JSONB DEFAULT '{}',
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  review_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  claimed_at TIMESTAMPTZ,
  last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(community_id, slug)
);

-- Business hours
CREATE TABLE IF NOT EXISTS public.business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  is_closed BOOLEAN DEFAULT false,
  open_time TIME,
  close_time TIME,
  is_24_hours BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, day_of_week)
);

-- Special hours
CREATE TABLE IF NOT EXISTS public.business_special_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_closed BOOLEAN DEFAULT false,
  open_time TIME,
  close_time TIME,
  reason VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, date)
);

-- Business photos
CREATE TABLE IF NOT EXISTS public.business_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(200),
  caption TEXT,
  photo_type VARCHAR(20) DEFAULT 'general' CHECK (
    photo_type IN ('logo', 'cover', 'exterior', 'interior', 'food', 'menu', 'team', 'product', 'general')
  ),
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu items
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(100),
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  dietary_restrictions TEXT[],
  allergens TEXT[],
  spice_level INTEGER CHECK (spice_level BETWEEN 0 AND 5),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  organization_type VARCHAR(50),
  description TEXT,
  mission_statement TEXT,
  contact_email VARCHAR(320),
  contact_phone VARCHAR(20),
  website_url VARCHAR(300),
  address_street VARCHAR(200),
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  logo_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  social_links JSONB DEFAULT '{}',
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Venues
CREATE TABLE IF NOT EXISTS public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  venue_type VARCHAR(50),
  description TEXT,
  capacity INTEGER,
  indoor_capacity INTEGER,
  outdoor_capacity INTEGER,
  amenities TEXT[],
  rental_info TEXT,
  contact_email VARCHAR(320),
  contact_phone VARCHAR(20),
  website_url VARCHAR(300),
  address_street VARCHAR(200),
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  photos TEXT[],
  is_accessible BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- CONTENT TABLES
-- -------------------------------------------------------------------------

-- Events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL,
  organizer_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  event_type VARCHAR(50) DEFAULT 'general',
  event_category public.event_category,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  all_day BOOLEAN DEFAULT false,
  timezone VARCHAR(50) DEFAULT 'America/Chicago',
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern JSONB,
  is_virtual BOOLEAN DEFAULT false,
  location_name VARCHAR(255),
  address_street VARCHAR(200),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  meeting_url VARCHAR(500),
  capacity INTEGER,
  registration_required BOOLEAN DEFAULT false,
  registration_url VARCHAR(500),
  attendee_count INTEGER DEFAULT 0,
  featured_image_url VARCHAR(500),
  gallery_images TEXT[],
  is_free BOOLEAN DEFAULT true,
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  pricing_info TEXT,
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'postponed', 'completed')),
  cancellation_reason TEXT,
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  interested_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event attendees
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

-- Articles
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url VARCHAR(500),
  gallery_images TEXT[],
  article_type VARCHAR(50) DEFAULT 'article',
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived', 'scheduled')),
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  is_featured BOOLEAN DEFAULT false,
  is_breaking_news BOOLEAN DEFAULT false,
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  view_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Article category mapping
CREATE TABLE IF NOT EXISTS public.article_category_mapping (
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.article_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200),
  content TEXT NOT NULL,
  pros TEXT,
  cons TEXT,
  photos TEXT[],
  owner_response TEXT,
  owner_response_at TIMESTAMPTZ,
  is_verified_purchase BOOLEAN DEFAULT false,
  visit_date DATE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'flagged', 'removed')),
  flagged_reason TEXT,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, user_id)
);

-- Review votes
CREATE TABLE IF NOT EXISTS public.review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type VARCHAR(20) NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(review_id, user_id)
);

-- Deals
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  terms_conditions TEXT,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percentage', 'fixed', 'bogo', 'freebie', 'other')),
  discount_value DECIMAL(10,2),
  discount_description VARCHAR(200),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  max_uses_total INTEGER,
  max_uses_per_user INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  promo_code VARCHAR(50),
  requires_coupon BOOLEAN DEFAULT true,
  online_only BOOLEAN DEFAULT false,
  in_store_only BOOLEAN DEFAULT false,
  image_url VARCHAR(500),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'expired', 'paused', 'sold_out')),
  is_featured BOOLEAN DEFAULT false,
  is_exclusive BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, slug)
);

-- Deal redemptions
CREATE TABLE IF NOT EXISTS public.deal_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  redemption_code VARCHAR(100) UNIQUE,
  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marketplace listings
CREATE TABLE IF NOT EXISTS public.marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2),
  listing_type VARCHAR(50),
  category VARCHAR(100),
  condition VARCHAR(50),
  photos TEXT[],
  location_description VARCHAR(200),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_negotiable BOOLEAN DEFAULT true,
  is_available BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- GAMIFICATION TABLES
-- -------------------------------------------------------------------------

-- User points
CREATE TABLE IF NOT EXISTS public.user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id),
  total_points INTEGER DEFAULT 0,
  current_month_points INTEGER DEFAULT 0,
  current_week_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  level_progress INTEGER DEFAULT 0,
  level_threshold INTEGER DEFAULT 100,
  check_ins_count INTEGER DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  photos_uploaded INTEGER DEFAULT 0,
  deals_redeemed INTEGER DEFAULT 0,
  referrals_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, community_id)
);

-- Point transactions
CREATE TABLE IF NOT EXISTS public.point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id),
  points INTEGER NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  description TEXT,
  reference_type VARCHAR(50),
  reference_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  icon_url VARCHAR(500),
  badge_url VARCHAR(500),
  color_hex VARCHAR(7),
  category VARCHAR(50),
  tier VARCHAR(20),
  requirements JSONB NOT NULL,
  point_reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_secret BOOLEAN DEFAULT false,
  is_global BOOLEAN DEFAULT true,
  community_ids UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User achievements
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id),
  progress INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  is_seen BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id, community_id)
);

-- Leaderboards
CREATE TABLE IF NOT EXISTS public.leaderboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES public.communities(id),
  board_type VARCHAR(50) NOT NULL,
  category VARCHAR(50),
  period_start DATE,
  period_end DATE,
  rankings JSONB NOT NULL,
  last_calculated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(community_id, board_type, category, period_start)
);

-- Check-ins
CREATE TABLE IF NOT EXISTS public.check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  community_id UUID REFERENCES public.communities(id),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  points_earned INTEGER DEFAULT 0,
  is_streak_continued BOOLEAN DEFAULT false,
  streak_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, business_id, created_at::date)
);

-- Challenges
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES public.communities(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  challenge_type VARCHAR(50),
  requirements JSONB NOT NULL,
  point_bonus INTEGER DEFAULT 0,
  achievement_id UUID REFERENCES public.achievements(id),
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Challenge participants
CREATE TABLE IF NOT EXISTS public.challenge_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  progress JSONB DEFAULT '{}',
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  rewards_claimed BOOLEAN DEFAULT false,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(challenge_id, user_id)
);

-- Referrals
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  referral_code VARCHAR(50),
  status VARCHAR(20) DEFAULT 'pending',
  referrer_points_earned INTEGER DEFAULT 0,
  referred_points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(referred_user_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  reference_type VARCHAR(50),
  reference_id UUID,
  icon_url VARCHAR(500),
  action_url VARCHAR(500),
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- -------------------------------------------------------------------------
-- USER INTERACTION TABLES
-- -------------------------------------------------------------------------

-- User favorites
CREATE TABLE IF NOT EXISTS public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  favorite_type VARCHAR(20) NOT NULL CHECK (favorite_type IN ('business', 'event', 'article', 'deal')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (
    (favorite_type = 'business' AND business_id IS NOT NULL AND event_id IS NULL AND article_id IS NULL AND deal_id IS NULL) OR
    (favorite_type = 'event' AND event_id IS NOT NULL AND business_id IS NULL AND article_id IS NULL AND deal_id IS NULL) OR
    (favorite_type = 'article' AND article_id IS NOT NULL AND business_id IS NULL AND event_id IS NULL AND deal_id IS NULL) OR
    (favorite_type = 'deal' AND deal_id IS NOT NULL AND business_id IS NULL AND event_id IS NULL AND article_id IS NULL)
  )
);

-- User collections
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

-- Collection items
CREATE TABLE IF NOT EXISTS public.collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES public.user_collections(id) ON DELETE CASCADE,
  favorite_id UUID NOT NULL REFERENCES public.user_favorites(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(collection_id, favorite_id)
);

-- =========================================================================
-- END OF TABLE CREATION
-- =========================================================================
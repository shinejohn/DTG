-- =========================================================================
-- DOWNTOWN GUIDE - MUSIC & ENTERTAINMENT MARKETPLACE SCHEMA
-- B2C Platform for Venues, Performers, Events, and Commerce
-- =========================================================================
-- Community-driven platform where venues and performers connect,
-- promote events, sell tickets, book gigs, and sell gear

-- -------------------------------------------------------------------------
-- CORE USER SYSTEM (Simplified B2C)
-- -------------------------------------------------------------------------

-- User types for the marketplace
CREATE TYPE public.user_type AS ENUM(
  'fan',           -- Regular user who browses, buys tickets, follows artists
  'performer',     -- Musicians, bands, DJs, comedians, etc.
  'venue_owner',   -- Venue managers and owners
  'promoter',      -- Event promoters and organizers
  'admin'          -- Platform administrators
);

-- Listing status types
CREATE TYPE public.listing_status AS ENUM(
  'draft',
  'active',
  'paused',
  'expired',
  'sold_out',
  'cancelled'
);

-- Simple user accounts (no complex multi-tenancy)
CREATE TABLE IF NOT EXISTS public.user_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_type public.user_type DEFAULT 'fan',
  
  -- Profile Information
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  bio TEXT,
  
  -- Location (for community detection)
  ip_location_city VARCHAR(100),
  ip_location_state VARCHAR(100),
  ip_location_country VARCHAR(100) DEFAULT 'US',
  preferred_community_id UUID, -- can override IP detection
  last_detected_latitude DECIMAL(10, 8),
  last_detected_longitude DECIMAL(11, 8),
  
  -- Preferences
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  
  -- Verification
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  can_sell BOOLEAN DEFAULT false, -- needs verification to sell
  
  -- Activity
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  last_community_detected VARCHAR(100),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- COMMUNITIES (City-Based Navigation)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'US',
  
  -- Geographic data for IP detection
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  radius_miles INTEGER DEFAULT 50,
  
  -- IP range detection (simplified)
  ip_ranges JSONB, -- array of IP range objects for geo-detection
  
  -- Community customization
  hero_image_url VARCHAR(500),
  description TEXT,
  music_scene_description TEXT, -- "Known for indie rock and jazz..."
  
  -- Stats
  venue_count INTEGER DEFAULT 0,
  performer_count INTEGER DEFAULT 0,
  upcoming_event_count INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- VENUES (Physical Locations)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id),
  
  -- Basic Information
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  venue_type VARCHAR(50), -- 'bar', 'club', 'theater', 'stadium', 'restaurant'
  description TEXT,
  
  -- Capacity and Features
  capacity_standing INTEGER,
  capacity_seated INTEGER,
  stage_size_sqft INTEGER,
  
  -- Technical Specs
  sound_system TEXT,
  lighting_system TEXT,
  backline_available BOOLEAN DEFAULT false,
  technical_requirements TEXT,
  
  -- Booking Information
  booking_email VARCHAR(320),
  booking_phone VARCHAR(20),
  booking_requirements TEXT,
  typical_deal_types TEXT[], -- ['door_deal', 'guarantee', 'vs_deal']
  
  -- Address and Location
  address_street VARCHAR(200),
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  
  -- Contact and Social
  website_url VARCHAR(300),
  facebook_url VARCHAR(200),
  instagram_handle VARCHAR(100),
  twitter_handle VARCHAR(100),
  
  -- Images
  logo_url VARCHAR(500),
  hero_image_url VARCHAR(500),
  gallery_images TEXT[],
  stage_photos TEXT[],
  
  -- Amenities
  has_parking BOOLEAN DEFAULT false,
  has_vip_area BOOLEAN DEFAULT false,
  has_coat_check BOOLEAN DEFAULT false,
  has_atm BOOLEAN DEFAULT false,
  wheelchair_accessible BOOLEAN DEFAULT true,
  
  -- Financial
  payment_methods TEXT[], -- ['cash', 'card', 'mobile']
  typical_door_price_range VARCHAR(50), -- '$10-20'
  
  -- Status
  status public.listing_status DEFAULT 'active',
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  accepts_online_bookings BOOLEAN DEFAULT false,
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  booking_inquiry_count INTEGER DEFAULT 0,
  event_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- Venue operating hours
CREATE TABLE IF NOT EXISTS public.venue_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID NOT NULL REFERENCES public.venues(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  music_starts_time TIME, -- when live music typically starts
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(venue_id, day_of_week)
);

-- -------------------------------------------------------------------------
-- PERFORMERS (Artists, Bands, DJs, etc.)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.performers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  name VARCHAR(255) NOT NULL, -- Stage name or band name
  slug VARCHAR(255) NOT NULL UNIQUE,
  performer_type VARCHAR(50), -- 'band', 'solo_artist', 'dj', 'comedian'
  genre_primary VARCHAR(50), -- Main genre
  genres TEXT[], -- All genres they play
  bio TEXT,
  formed_year INTEGER,
  hometown_city VARCHAR(100),
  
  -- Current Location (can tour)
  current_community_id UUID REFERENCES public.communities(id),
  touring_radius_miles INTEGER DEFAULT 100,
  
  -- Booking Information
  booking_email VARCHAR(320),
  booking_phone VARCHAR(20),
  typical_fee_range VARCHAR(50), -- '$500-1000'
  technical_rider_url VARCHAR(500),
  hospitality_rider_url VARCHAR(500),
  
  -- Online Presence
  website_url VARCHAR(300),
  spotify_url VARCHAR(300),
  soundcloud_url VARCHAR(300),
  youtube_url VARCHAR(300),
  facebook_url VARCHAR(200),
  instagram_handle VARCHAR(100),
  twitter_handle VARCHAR(100),
  
  -- Media
  profile_image_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  gallery_images TEXT[],
  featured_tracks JSONB, -- [{title, url, platform}]
  
  -- Performance Details
  typical_set_length_minutes INTEGER DEFAULT 45,
  band_member_count INTEGER DEFAULT 1,
  requires_backline BOOLEAN DEFAULT true,
  
  -- Status
  status public.listing_status DEFAULT 'active',
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_touring BOOLEAN DEFAULT false,
  
  -- Metrics
  follower_count INTEGER DEFAULT 0,
  monthly_listeners INTEGER DEFAULT 0,
  gig_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Band members (for bands)
CREATE TABLE IF NOT EXISTS public.performer_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  performer_id UUID NOT NULL REFERENCES public.performers(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100), -- 'vocals', 'guitar', 'drums', etc.
  image_url VARCHAR(500),
  bio TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- EVENTS (Shows, Concerts, Open Mics, etc.)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID NOT NULL REFERENCES public.venues(id),
  community_id UUID NOT NULL REFERENCES public.communities(id),
  created_by_user_id UUID REFERENCES auth.users(id),
  
  -- Event Details
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  event_type VARCHAR(50), -- 'concert', 'open_mic', 'dj_night', 'festival'
  description TEXT,
  
  -- Date and Time
  event_date DATE NOT NULL,
  doors_open_time TIME,
  show_start_time TIME,
  show_end_time TIME,
  
  -- Lineup (ordered)
  headliner_performer_id UUID REFERENCES public.performers(id),
  support_performer_ids UUID[], -- array of performer IDs
  lineup_details JSONB, -- [{performer_id, set_time, set_length}]
  
  -- Ticketing
  is_ticketed BOOLEAN DEFAULT false,
  ticket_provider VARCHAR(50), -- 'internal', 'ticketmaster', 'eventbrite'
  ticket_url VARCHAR(500),
  price_min DECIMAL(10,2),
  price_max DECIMAL(10,2),
  at_door_price DECIMAL(10,2),
  capacity INTEGER,
  tickets_sold INTEGER DEFAULT 0,
  
  -- Age Restrictions
  age_restriction VARCHAR(20), -- 'all_ages', '18+', '21+'
  
  -- Promotion
  poster_image_url VARCHAR(500),
  facebook_event_url VARCHAR(500),
  
  -- Status
  status public.listing_status DEFAULT 'active',
  is_featured BOOLEAN DEFAULT false,
  is_sold_out BOOLEAN DEFAULT false,
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  interested_count INTEGER DEFAULT 0,
  attending_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug, event_date)
);

-- -------------------------------------------------------------------------
-- MARKETPLACE (Gear, Merch, Services)
-- -------------------------------------------------------------------------

-- Marketplace listings for gear, merch, services
CREATE TABLE IF NOT EXISTS public.marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_user_id UUID NOT NULL REFERENCES auth.users(id),
  community_id UUID NOT NULL REFERENCES public.communities(id),
  
  -- Listing Details
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  category VARCHAR(50), -- 'gear', 'merch', 'services', 'lessons'
  subcategory VARCHAR(50), -- 'guitar', 'drums', 'recording', etc.
  description TEXT,
  condition VARCHAR(20), -- 'new', 'like_new', 'good', 'fair'
  
  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  is_negotiable BOOLEAN DEFAULT false,
  accepts_trades BOOLEAN DEFAULT false,
  
  -- Images
  primary_image_url VARCHAR(500),
  gallery_images TEXT[],
  
  -- Location
  location_type VARCHAR(20), -- 'local_pickup', 'will_ship'
  pickup_location VARCHAR(200),
  shipping_available BOOLEAN DEFAULT false,
  shipping_cost DECIMAL(10,2),
  
  -- Seller Info (denormalized for performance)
  seller_type public.user_type,
  seller_name VARCHAR(100),
  seller_avatar_url VARCHAR(500),
  
  -- Status
  status public.listing_status DEFAULT 'active',
  quantity_available INTEGER DEFAULT 1,
  quantity_sold INTEGER DEFAULT 0,
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  inquiry_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- -------------------------------------------------------------------------
-- GIG MARKETPLACE (Booking Requests)
-- -------------------------------------------------------------------------

-- Available dates for venues looking for acts
CREATE TABLE IF NOT EXISTS public.venue_available_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID NOT NULL REFERENCES public.venues(id) ON DELETE CASCADE,
  
  -- Date and Details
  available_date DATE NOT NULL,
  time_slot VARCHAR(50), -- 'happy_hour', 'prime_time', 'late_night'
  set_length_minutes INTEGER DEFAULT 60,
  
  -- What they're looking for
  preferred_genres TEXT[],
  preferred_performer_types TEXT[],
  
  -- Deal Terms
  payment_type VARCHAR(50), -- 'guarantee', 'door_percentage', 'tips_only'
  guarantee_amount DECIMAL(10,2),
  door_percentage INTEGER,
  additional_perks TEXT, -- 'drinks', 'food', 'lodging'
  
  -- Requirements
  must_draw_minimum INTEGER, -- minimum expected attendance
  age_appropriate VARCHAR(20), -- matches venue age restriction
  
  -- Status
  is_booked BOOLEAN DEFAULT false,
  booked_performer_id UUID REFERENCES public.performers(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(venue_id, available_date)
);

-- Performer availability and tour dates
CREATE TABLE IF NOT EXISTS public.performer_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  performer_id UUID NOT NULL REFERENCES public.performers(id) ON DELETE CASCADE,
  
  -- Availability
  available_date DATE NOT NULL,
  available_communities UUID[], -- array of community IDs they can play
  
  -- Preferences
  preferred_venue_types TEXT[],
  minimum_guarantee DECIMAL(10,2),
  
  -- Status
  is_booked BOOLEAN DEFAULT false,
  booked_venue_id UUID REFERENCES public.venues(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(performer_id, available_date)
);

-- -------------------------------------------------------------------------
-- USER ENGAGEMENT
-- -------------------------------------------------------------------------

-- User follows (fans follow performers/venues)
CREATE TABLE IF NOT EXISTS public.user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Polymorphic follow (one of these)
  performer_id UUID REFERENCES public.performers(id) ON DELETE CASCADE,
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  
  -- Notifications
  notify_new_events BOOLEAN DEFAULT true,
  notify_new_music BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure following something
  CHECK (
    (performer_id IS NOT NULL AND venue_id IS NULL) OR
    (venue_id IS NOT NULL AND performer_id IS NULL)
  )
);

-- Reviews and ratings
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- What's being reviewed (polymorphic)
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE,
  performer_id UUID REFERENCES public.performers(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  
  -- Review content
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(200),
  content TEXT,
  
  -- Additional ratings
  sound_quality_rating INTEGER CHECK (sound_quality_rating BETWEEN 1 AND 5),
  venue_rating INTEGER CHECK (venue_rating BETWEEN 1 AND 5),
  performance_rating INTEGER CHECK (performance_rating BETWEEN 1 AND 5),
  
  -- Status
  is_verified_purchase BOOLEAN DEFAULT false, -- bought ticket through platform
  status VARCHAR(20) DEFAULT 'published',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- One review per user per item
  UNIQUE(user_id, venue_id),
  UNIQUE(user_id, performer_id),
  UNIQUE(user_id, event_id),
  
  -- Ensure reviewing something
  CHECK (
    (venue_id IS NOT NULL AND performer_id IS NULL AND event_id IS NULL) OR
    (performer_id IS NOT NULL AND venue_id IS NULL AND event_id IS NULL) OR
    (event_id IS NOT NULL AND venue_id IS NULL AND performer_id IS NULL)
  )
);

-- Messages between users (for bookings, inquiries)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_user_id UUID NOT NULL REFERENCES auth.users(id),
  recipient_user_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Context (what the message is about)
  regarding_venue_id UUID REFERENCES public.venues(id),
  regarding_performer_id UUID REFERENCES public.performers(id),
  regarding_listing_id UUID REFERENCES public.marketplace_listings(id),
  regarding_event_id UUID REFERENCES public.events(id),
  
  -- Message
  subject VARCHAR(200),
  content TEXT NOT NULL,
  
  -- Status
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- TRANSACTIONS (Tickets, Marketplace)
-- -------------------------------------------------------------------------

-- Ticket purchases
CREATE TABLE IF NOT EXISTS public.ticket_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  event_id UUID NOT NULL REFERENCES public.events(id),
  
  -- Order details
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  fees DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Payment
  payment_method VARCHAR(50), -- 'card', 'paypal', etc.
  payment_status VARCHAR(20) DEFAULT 'pending',
  payment_id VARCHAR(100), -- External payment provider ID
  
  -- Tickets
  ticket_codes TEXT[], -- Array of unique ticket codes
  qr_code_url VARCHAR(500),
  
  -- Status
  order_status VARCHAR(20) DEFAULT 'pending',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marketplace transactions
CREATE TABLE IF NOT EXISTS public.marketplace_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_user_id UUID NOT NULL REFERENCES auth.users(id),
  listing_id UUID NOT NULL REFERENCES public.marketplace_listings(id),
  
  -- Order details
  quantity INTEGER NOT NULL DEFAULT 1,
  agreed_price DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  
  -- Payment
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending',
  
  -- Fulfillment
  fulfillment_method VARCHAR(20), -- 'pickup', 'shipping'
  tracking_number VARCHAR(100),
  
  -- Status
  order_status VARCHAR(20) DEFAULT 'pending',
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- ANALYTICS AND DISCOVERY
-- -------------------------------------------------------------------------

-- Track what's trending in each community
CREATE TABLE IF NOT EXISTS public.community_trending (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id),
  
  -- What's trending
  trending_type VARCHAR(50), -- 'performer', 'venue', 'event', 'genre'
  trending_id UUID, -- Reference to the trending item
  trending_name VARCHAR(255),
  
  -- Metrics
  score DECIMAL(10,2) DEFAULT 0, -- Calculated trending score
  view_count INTEGER DEFAULT 0,
  engagement_count INTEGER DEFAULT 0,
  
  -- Time window
  date_calculated DATE DEFAULT CURRENT_DATE,
  
  UNIQUE(community_id, trending_type, trending_id, date_calculated)
);

-- -------------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- -------------------------------------------------------------------------

-- Location-based queries (critical for community detection)
CREATE INDEX idx_venues_location ON public.venues(latitude, longitude);
CREATE INDEX idx_venues_community_active ON public.venues(community_id, status);
CREATE INDEX idx_events_date_community ON public.events(event_date, community_id, status);
CREATE INDEX idx_events_venue ON public.events(venue_id, status);

-- Performer searches
CREATE INDEX idx_performers_genres ON public.performers USING gin(genres);
CREATE INDEX idx_performers_community ON public.performers(current_community_id, status);

-- User activity
CREATE INDEX idx_user_accounts_community ON public.user_accounts(preferred_community_id);
CREATE INDEX idx_user_accounts_type ON public.user_accounts(user_type);

-- Marketplace
CREATE INDEX idx_marketplace_community_category ON public.marketplace_listings(community_id, category, status);
CREATE INDEX idx_marketplace_seller ON public.marketplace_listings(seller_user_id, status);

-- Full text search
CREATE INDEX idx_venues_search ON public.venues USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_performers_search ON public.performers USING gin(to_tsvector('english', name || ' ' || COALESCE(bio, '')));
CREATE INDEX idx_events_search ON public.events USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- -------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- -------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.user_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public read access (no login required for browsing)
CREATE POLICY "public_read_communities" ON public.communities
  FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_venues" ON public.venues
  FOR SELECT USING (status = 'active');

CREATE POLICY "public_read_performers" ON public.performers
  FOR SELECT USING (status = 'active');

CREATE POLICY "public_read_events" ON public.events
  FOR SELECT USING (status = 'active');

CREATE POLICY "public_read_listings" ON public.marketplace_listings
  FOR SELECT USING (status = 'active');

-- Authenticated user policies
CREATE POLICY "users_own_account" ON public.user_accounts
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "venues_owner_write" ON public.venues
  FOR ALL TO authenticated
  USING (auth.uid() = owner_user_id)
  WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "performers_owner_write" ON public.performers
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_messages" ON public.messages
  FOR ALL TO authenticated
  USING (auth.uid() = sender_user_id OR auth.uid() = recipient_user_id);

-- -------------------------------------------------------------------------
-- FUNCTIONS AND TRIGGERS
-- -------------------------------------------------------------------------

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_venues_updated_at
    BEFORE UPDATE ON public.venues
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_performers_updated_at
    BEFORE UPDATE ON public.performers
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function to detect community from IP (simplified)
CREATE OR REPLACE FUNCTION public.detect_community_from_location(
    lat DECIMAL,
    lon DECIMAL
) RETURNS UUID AS $$
DECLARE
    community_id UUID;
BEGIN
    -- Find nearest community within reasonable distance
    SELECT id INTO community_id
    FROM public.communities
    WHERE is_active = true
      AND ST_DWithin(
          ST_MakePoint(lon, lat)::geography,
          ST_MakePoint(longitude, latitude)::geography,
          radius_miles * 1609.34 -- convert miles to meters
      )
    ORDER BY ST_Distance(
        ST_MakePoint(lon, lat)::geography,
        ST_MakePoint(longitude, latitude)::geography
    )
    LIMIT 1;
    
    RETURN community_id;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- INITIAL SEED DATA
-- -------------------------------------------------------------------------

-- Default communities
INSERT INTO public.communities (name, slug, state, latitude, longitude, music_scene_description) VALUES
('Austin', 'austin', 'Texas', 30.2672, -97.7431, 'Live Music Capital of the World with legendary venues and a thriving indie scene'),
('Nashville', 'nashville', 'Tennessee', 36.1627, -86.7816, 'Music City USA - Home of country music and a growing rock scene'),
('Los Angeles', 'los-angeles', 'California', 34.0522, -118.2437, 'Entertainment capital with venues from intimate clubs to massive arenas'),
('New York City', 'new-york', 'New York', 40.7128, -74.0060, 'The city that never sleeps - Jazz, punk, hip-hop and everything in between'),
('Chicago', 'chicago', 'Illinois', 41.8781, -87.6298, 'Blues capital with a rich musical heritage and vibrant local scene'),
('Seattle', 'seattle', 'Washington', 47.6062, -122.3321, 'Grunge birthplace with a strong indie and alternative music culture')
ON CONFLICT (slug) DO NOTHING;

-- =========================================================================
-- END MUSIC MARKETPLACE SCHEMA
-- =========================================================================
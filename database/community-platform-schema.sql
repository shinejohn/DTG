-- =========================================================================
-- DOWNTOWN GUIDE - COMPREHENSIVE COMMUNITY PLATFORM SCHEMA
-- B2C Platform for ALL Community Events, Venues, Businesses & Commerce
-- =========================================================================
-- Community-driven platform for everything happening in a city:
-- Music venues, civic meetings, school events, community gatherings,
-- local businesses, performers, and marketplace

-- -------------------------------------------------------------------------
-- CORE USER SYSTEM (B2C Community Platform)
-- -------------------------------------------------------------------------

-- User types for the platform
CREATE TYPE public.user_type AS ENUM(
  'resident',         -- Regular community member
  'business_owner',   -- Any business (restaurant, store, service)
  'venue_manager',    -- Manages event spaces
  'performer',        -- Musicians, speakers, entertainers
  'organizer',        -- Event organizers (any type)
  'city_official',    -- Municipal/government users
  'school_admin',     -- School district users
  'nonprofit_admin',  -- Nonprofit organizations
  'admin'            -- Platform administrators
);

-- Entity types that can host events
CREATE TYPE public.entity_type AS ENUM(
  'venue',           -- Traditional venues (bars, theaters, etc)
  'business',        -- Any business that hosts events
  'organization',    -- Nonprofits, clubs, associations
  'school',          -- Schools and educational institutions
  'government',      -- City/county/state entities
  'community_space', -- Parks, community centers, etc
  'private'          -- Private residences or spaces
);

-- Event categories
CREATE TYPE public.event_category AS ENUM(
  'music',           -- Concerts, shows
  'sports',          -- Games, tournaments
  'civic',           -- City meetings, hearings
  'education',       -- Classes, workshops
  'fundraiser',      -- Charity events, bake sales
  'social',          -- Meetups, parties
  'arts',            -- Gallery openings, theater
  'food',            -- Food festivals, tastings
  'market',          -- Farmers markets, craft fairs
  'religious',       -- Church events
  'business',        -- Grand openings, sales
  'community'        -- General community events
);

-- Simple user accounts
CREATE TABLE IF NOT EXISTS public.user_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_type public.user_type DEFAULT 'resident',
  
  -- Profile Information
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  bio TEXT,
  
  -- Location (for community detection)
  ip_location_city VARCHAR(100),
  ip_location_state VARCHAR(100),
  ip_location_country VARCHAR(100) DEFAULT 'US',
  preferred_community_id UUID,
  last_detected_latitude DECIMAL(10, 8),
  last_detected_longitude DECIMAL(11, 8),
  
  -- Preferences
  interested_categories public.event_category[],
  email_notifications BOOLEAN DEFAULT true,
  notification_radius_miles INTEGER DEFAULT 10,
  
  -- Verification
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  can_create_events BOOLEAN DEFAULT true,
  can_sell BOOLEAN DEFAULT false,
  
  -- Activity
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  last_community_detected VARCHAR(100),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- COMMUNITIES (City/Region Based)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  county VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'US',
  
  -- Geographic data
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  radius_miles INTEGER DEFAULT 25,
  population INTEGER,
  
  -- Community info
  description TEXT,
  hero_image_url VARCHAR(500),
  city_logo_url VARCHAR(500),
  
  -- Important links
  city_website_url VARCHAR(300),
  visitor_center_url VARCHAR(300),
  chamber_commerce_url VARCHAR(300),
  
  -- Stats
  business_count INTEGER DEFAULT 0,
  venue_count INTEGER DEFAULT 0,
  organization_count INTEGER DEFAULT 0,
  upcoming_event_count INTEGER DEFAULT 0,
  
  -- Settings
  timezone VARCHAR(50) DEFAULT 'America/Chicago',
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- BUSINESSES (All Types - Not Just Entertainment)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id),
  
  -- Basic Information
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  business_type VARCHAR(50), -- 'restaurant', 'retail', 'service', etc
  description TEXT,
  
  -- Classification
  category VARCHAR(100),
  subcategory VARCHAR(100),
  tags TEXT[],
  
  -- Can this business host events?
  can_host_events BOOLEAN DEFAULT false,
  event_space_capacity INTEGER,
  
  -- Contact
  phone VARCHAR(20),
  email VARCHAR(320),
  website_url VARCHAR(300),
  
  -- Address
  address_street VARCHAR(200),
  address_city VARCHAR(100) NOT NULL,
  address_state VARCHAR(100) NOT NULL,
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  
  -- Hours
  hours_of_operation JSONB, -- Flexible hours structure
  
  -- Social
  facebook_url VARCHAR(200),
  instagram_handle VARCHAR(100),
  
  -- Images
  logo_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  gallery_images TEXT[],
  
  -- Status
  is_verified BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  follower_count INTEGER DEFAULT 0,
  event_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- -------------------------------------------------------------------------
-- ORGANIZATIONS (Nonprofits, Clubs, Schools, Government)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id),
  
  -- Basic Information
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  organization_type public.entity_type NOT NULL,
  description TEXT,
  
  -- Specific subtypes
  subtype VARCHAR(100), -- 'high_school', 'library', 'elks_club', 'city_council'
  
  -- Contact
  contact_name VARCHAR(100),
  contact_phone VARCHAR(20),
  contact_email VARCHAR(320),
  website_url VARCHAR(300),
  
  -- Address
  address_street VARCHAR(200),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  address_postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Event hosting
  has_event_space BOOLEAN DEFAULT true,
  event_space_details TEXT,
  typical_event_types public.event_category[],
  
  -- Images
  logo_url VARCHAR(500),
  building_image_url VARCHAR(500),
  
  -- Status
  is_verified BOOLEAN DEFAULT true, -- Most orgs are pre-verified
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- -------------------------------------------------------------------------
-- VENUES (Traditional Entertainment/Event Venues)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id), -- Links to business if applicable
  owner_user_id UUID REFERENCES auth.users(id),
  community_id UUID NOT NULL REFERENCES public.communities(id),
  
  -- Venue Information
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  venue_type VARCHAR(50), -- 'bar', 'theater', 'stadium', 'arena'
  description TEXT,
  
  -- Capacity
  capacity_standing INTEGER,
  capacity_seated INTEGER,
  
  -- Features (for entertainment venues)
  has_stage BOOLEAN DEFAULT false,
  has_sound_system BOOLEAN DEFAULT false,
  has_lighting BOOLEAN DEFAULT false,
  
  -- Booking
  accepts_external_bookings BOOLEAN DEFAULT true,
  booking_email VARCHAR(320),
  booking_phone VARCHAR(20),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- -------------------------------------------------------------------------
-- PERFORMERS (Musicians, Speakers, Entertainers)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.performers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  performer_type VARCHAR(50), -- 'band', 'speaker', 'comedian', 'magician'
  description TEXT,
  
  -- For musicians
  genres TEXT[],
  
  -- For speakers/presenters
  topics TEXT[],
  
  -- Location
  home_community_id UUID REFERENCES public.communities(id),
  will_travel_miles INTEGER DEFAULT 50,
  
  -- Booking
  booking_email VARCHAR(320),
  typical_fee_range VARCHAR(50),
  
  -- Media
  profile_image_url VARCHAR(500),
  media_links JSONB, -- Videos, audio samples, etc
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- EVENTS (Everything happening in the community)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id),
  created_by_user_id UUID REFERENCES auth.users(id),
  
  -- Host (who's organizing - polymorphic)
  host_type public.entity_type NOT NULL,
  host_business_id UUID REFERENCES public.businesses(id),
  host_organization_id UUID REFERENCES public.organizations(id),
  host_venue_id UUID REFERENCES public.venues(id),
  
  -- Event Details
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  event_category public.event_category NOT NULL,
  event_subcategory VARCHAR(100), -- More specific type
  
  -- Date and Time
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ,
  all_day BOOLEAN DEFAULT false,
  
  -- Recurrence
  is_recurring BOOLEAN DEFAULT false,
  recurrence_pattern JSONB, -- For weekly meetings, etc
  
  -- Location
  location_name VARCHAR(200),
  address_street VARCHAR(200),
  address_city VARCHAR(100),
  address_state VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_virtual BOOLEAN DEFAULT false,
  virtual_url VARCHAR(500),
  
  -- Details
  is_free BOOLEAN DEFAULT true,
  price DECIMAL(10,2),
  registration_required BOOLEAN DEFAULT false,
  registration_url VARCHAR(500),
  
  -- Capacity
  capacity INTEGER,
  current_attendees INTEGER DEFAULT 0,
  
  -- Age/Audience
  age_restriction VARCHAR(50), -- 'all_ages', '18+', '21+', 'family_friendly'
  target_audience VARCHAR(100), -- 'families', 'seniors', 'youth'
  
  -- Images
  poster_image_url VARCHAR(500),
  gallery_images TEXT[],
  
  -- Contact
  contact_name VARCHAR(100),
  contact_email VARCHAR(320),
  contact_phone VARCHAR(20),
  
  -- For entertainment events
  performer_ids UUID[], -- Array of performer IDs if applicable
  
  -- Status
  status VARCHAR(20) DEFAULT 'active',
  is_featured BOOLEAN DEFAULT false,
  is_cancelled BOOLEAN DEFAULT false,
  cancellation_reason TEXT,
  
  -- Metrics
  view_count INTEGER DEFAULT 0,
  interested_count INTEGER DEFAULT 0,
  attending_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug, start_datetime)
);

-- -------------------------------------------------------------------------
-- MARKETPLACE (Tickets, Gear, Services, Items)
-- -------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_user_id UUID NOT NULL REFERENCES auth.users(id),
  community_id UUID NOT NULL REFERENCES public.communities(id),
  
  -- Listing Details
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  category VARCHAR(50), -- 'tickets', 'gear', 'services', 'items'
  description TEXT,
  
  -- For tickets
  event_id UUID REFERENCES public.events(id),
  
  -- Pricing
  price DECIMAL(10,2),
  is_negotiable BOOLEAN DEFAULT false,
  
  -- Quantity
  quantity_available INTEGER DEFAULT 1,
  quantity_sold INTEGER DEFAULT 0,
  
  -- Images
  primary_image_url VARCHAR(500),
  gallery_images TEXT[],
  
  -- Status
  status VARCHAR(20) DEFAULT 'active',
  expires_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(community_id, slug)
);

-- -------------------------------------------------------------------------
-- USER ENGAGEMENT
-- -------------------------------------------------------------------------

-- User follows (follow anything)
CREATE TABLE IF NOT EXISTS public.user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- What they're following (polymorphic)
  business_id UUID REFERENCES public.businesses(id),
  organization_id UUID REFERENCES public.organizations(id),
  venue_id UUID REFERENCES public.venues(id),
  performer_id UUID REFERENCES public.performers(id),
  
  -- Preferences
  notify_new_events BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event attendance/interest
CREATE TABLE IF NOT EXISTS public.event_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  status VARCHAR(20) DEFAULT 'interested', -- 'interested', 'attending', 'attended'
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Messages between users
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_user_id UUID NOT NULL REFERENCES auth.users(id),
  recipient_user_id UUID NOT NULL REFERENCES auth.users(id),
  
  -- Context
  regarding_type VARCHAR(50), -- What the message is about
  regarding_id UUID, -- ID of the thing
  
  subject VARCHAR(200),
  content TEXT NOT NULL,
  
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- DISCOVERY AND ANALYTICS
-- -------------------------------------------------------------------------

-- What's trending/popular in each community
CREATE TABLE IF NOT EXISTS public.community_trending (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID NOT NULL REFERENCES public.communities(id),
  
  -- What's trending
  trending_type VARCHAR(50), -- 'event', 'business', 'topic'
  trending_id UUID,
  trending_title VARCHAR(255),
  trending_category public.event_category,
  
  -- Metrics
  score DECIMAL(10,2) DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  
  date_calculated DATE DEFAULT CURRENT_DATE,
  
  UNIQUE(community_id, trending_type, trending_id, date_calculated)
);

-- -------------------------------------------------------------------------
-- INDEXES FOR PERFORMANCE
-- -------------------------------------------------------------------------

-- Location-based queries
CREATE INDEX idx_businesses_location ON public.businesses(latitude, longitude);
CREATE INDEX idx_organizations_location ON public.organizations(latitude, longitude);
CREATE INDEX idx_events_location ON public.events(latitude, longitude);
CREATE INDEX idx_events_datetime ON public.events(start_datetime, end_datetime);
CREATE INDEX idx_events_community_category ON public.events(community_id, event_category);

-- User activity
CREATE INDEX idx_user_accounts_community ON public.user_accounts(preferred_community_id);

-- Full text search
CREATE INDEX idx_businesses_search ON public.businesses USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_organizations_search ON public.organizations USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_events_search ON public.events USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- -------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- -------------------------------------------------------------------------

-- Enable RLS
ALTER TABLE public.user_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public read for browsing (no login required)
CREATE POLICY "public_read_communities" ON public.communities
  FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_businesses" ON public.businesses
  FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_organizations" ON public.organizations
  FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_venues" ON public.venues
  FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_events" ON public.events
  FOR SELECT USING (status = 'active' AND NOT is_cancelled);

CREATE POLICY "public_read_listings" ON public.marketplace_listings
  FOR SELECT USING (status = 'active');

-- User policies (login required for create/update)
CREATE POLICY "users_own_account" ON public.user_accounts
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_own_messages" ON public.messages
  FOR ALL TO authenticated
  USING (auth.uid() = sender_user_id OR auth.uid() = recipient_user_id);

CREATE POLICY "users_create_events" ON public.events
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by_user_id);

-- -------------------------------------------------------------------------
-- FUNCTIONS AND TRIGGERS
-- -------------------------------------------------------------------------

-- Update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_user_accounts_updated_at
    BEFORE UPDATE ON public.user_accounts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON public.businesses
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Community detection function
CREATE OR REPLACE FUNCTION public.detect_community_from_ip(
    user_ip INET
) RETURNS UUID AS $$
DECLARE
    community_id UUID;
    lat DECIMAL;
    lon DECIMAL;
BEGIN
    -- This would integrate with an IP geolocation service
    -- For now, return default community
    SELECT id INTO community_id
    FROM public.communities
    WHERE is_active = true
    ORDER BY is_featured DESC
    LIMIT 1;
    
    RETURN community_id;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- SEED DATA
-- -------------------------------------------------------------------------

-- Communities
INSERT INTO public.communities (name, slug, state, description) VALUES
('Austin', 'austin', 'Texas', 'A vibrant city with music, tech, and strong community spirit'),
('Nashville', 'nashville', 'Tennessee', 'Music City with rich cultural heritage and growing diversity'),
('Portland', 'portland', 'Oregon', 'Creative community with strong civic engagement'),
('Milwaukee', 'milwaukee', 'Wisconsin', 'Brew City with festivals, sports, and lakefront activities'),
('San Antonio', 'san-antonio', 'Texas', 'Rich history meets modern community life')
ON CONFLICT (slug) DO NOTHING;

-- =========================================================================
-- END COMMUNITY PLATFORM SCHEMA
-- =========================================================================
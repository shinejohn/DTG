-- =========================================================================
-- DOWNTOWN GUIDE - SSR-OPTIMIZED COMMUNITY PLATFORM SCHEMA
-- Optimized for React Router 7 SSR with Public/Anonymous Access
-- =========================================================================
-- Key considerations for SSR:
-- 1. Public data must be accessible without authentication
-- 2. Optimized views for common public queries
-- 3. Proper RLS policies for anonymous access
-- 4. Materialized views for performance

-- -------------------------------------------------------------------------
-- ENABLE ANONYMOUS ACCESS FOR SUPABASE
-- -------------------------------------------------------------------------

-- Ensure anon role can access public data
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- -------------------------------------------------------------------------
-- Previous schema tables remain the same...
-- Adding SSR-specific optimizations
-- -------------------------------------------------------------------------

-- =========================================================================
-- SSR-OPTIMIZED VIEWS FOR PUBLIC DATA ACCESS
-- =========================================================================

-- -------------------------------------------------------------------------
-- PUBLIC EVENT FEED VIEW (for homepage and event listings)
-- -------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.public_events_feed AS
SELECT 
  e.id,
  e.title,
  e.slug,
  e.description,
  e.event_category,
  e.event_subcategory,
  e.start_datetime,
  e.end_datetime,
  e.all_day,
  
  -- Location
  e.location_name,
  e.address_city,
  e.address_state,
  e.latitude,
  e.longitude,
  e.is_virtual,
  
  -- Details
  e.is_free,
  e.price,
  e.registration_required,
  e.age_restriction,
  e.target_audience,
  
  -- Images
  e.poster_image_url,
  
  -- Host info (denormalized for performance)
  CASE 
    WHEN e.host_type = 'business' THEN b.name
    WHEN e.host_type = 'organization' THEN o.name
    WHEN e.host_type = 'venue' THEN v.name
    ELSE 'Community Event'
  END as host_name,
  
  CASE 
    WHEN e.host_type = 'business' THEN b.logo_url
    WHEN e.host_type = 'organization' THEN o.logo_url
    ELSE NULL
  END as host_logo_url,
  
  -- Metrics
  e.view_count,
  e.interested_count,
  e.attending_count,
  
  -- Community
  e.community_id,
  c.name as community_name,
  c.slug as community_slug
  
FROM public.events e
LEFT JOIN public.businesses b ON e.host_business_id = b.id
LEFT JOIN public.organizations o ON e.host_organization_id = o.id
LEFT JOIN public.venues v ON e.host_venue_id = v.id
JOIN public.communities c ON e.community_id = c.id
WHERE e.status = 'active' 
  AND NOT e.is_cancelled
  AND e.start_datetime >= NOW() - INTERVAL '1 day'; -- Include today's events

-- Grant public access
GRANT SELECT ON public.public_events_feed TO anon;

-- -------------------------------------------------------------------------
-- PUBLIC BUSINESS DIRECTORY VIEW
-- -------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.public_business_directory AS
SELECT 
  b.id,
  b.name,
  b.slug,
  b.business_type,
  b.description,
  b.category,
  b.subcategory,
  b.tags,
  
  -- Contact (limited for public)
  b.phone,
  b.website_url,
  
  -- Location
  b.address_city,
  b.address_state,
  b.latitude,
  b.longitude,
  
  -- Features
  b.can_host_events,
  b.event_space_capacity,
  
  -- Images
  b.logo_url,
  b.cover_image_url,
  
  -- Social
  b.facebook_url,
  b.instagram_handle,
  
  -- Status
  b.is_verified,
  b.is_featured,
  
  -- Metrics
  b.view_count,
  b.follower_count,
  b.event_count,
  
  -- Community
  b.community_id,
  c.name as community_name,
  c.slug as community_slug
  
FROM public.businesses b
JOIN public.communities c ON b.community_id = c.id
WHERE b.is_active = true;

GRANT SELECT ON public.public_business_directory TO anon;

-- -------------------------------------------------------------------------
-- PUBLIC TRENDING VIEW (for homepage trending section)
-- -------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.public_trending AS
SELECT 
  t.community_id,
  t.trending_type,
  t.trending_id,
  t.trending_title,
  t.trending_category,
  t.score,
  t.view_count,
  c.name as community_name,
  c.slug as community_slug,
  t.date_calculated
FROM public.community_trending t
JOIN public.communities c ON t.community_id = c.id
WHERE t.date_calculated = CURRENT_DATE
ORDER BY t.score DESC
LIMIT 20;

GRANT SELECT ON public.public_trending TO anon;

-- -------------------------------------------------------------------------
-- COMMUNITY STATS VIEW (for community pages)
-- -------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.public_community_stats AS
SELECT 
  c.id,
  c.name,
  c.slug,
  c.state,
  c.description,
  c.hero_image_url,
  c.city_logo_url,
  c.timezone,
  c.business_count,
  c.venue_count,
  c.organization_count,
  c.upcoming_event_count,
  
  -- Calculate real-time stats
  (SELECT COUNT(*) FROM public.events e 
   WHERE e.community_id = c.id 
   AND e.start_datetime >= NOW() 
   AND e.start_datetime <= NOW() + INTERVAL '7 days'
   AND e.status = 'active') as events_this_week,
   
  (SELECT COUNT(*) FROM public.events e 
   WHERE e.community_id = c.id 
   AND e.start_datetime >= NOW() 
   AND e.start_datetime <= NOW() + INTERVAL '30 days'
   AND e.status = 'active') as events_this_month
   
FROM public.communities c
WHERE c.is_active = true;

GRANT SELECT ON public.public_community_stats TO anon;

-- =========================================================================
-- UPDATED RLS POLICIES FOR SSR
-- =========================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "public_read_communities" ON public.communities;
DROP POLICY IF EXISTS "public_read_businesses" ON public.businesses;
DROP POLICY IF EXISTS "public_read_organizations" ON public.organizations;
DROP POLICY IF EXISTS "public_read_venues" ON public.venues;
DROP POLICY IF EXISTS "public_read_events" ON public.events;
DROP POLICY IF EXISTS "public_read_listings" ON public.marketplace_listings;

-- Create new policies that work with both anon and authenticated roles

-- Communities - always public
CREATE POLICY "anyone_read_communities" ON public.communities
  FOR SELECT USING (is_active = true);

-- Businesses - public when active
CREATE POLICY "anyone_read_businesses" ON public.businesses
  FOR SELECT USING (is_active = true);

-- Organizations - public when active  
CREATE POLICY "anyone_read_organizations" ON public.organizations
  FOR SELECT USING (is_active = true);

-- Venues - public when active
CREATE POLICY "anyone_read_venues" ON public.venues
  FOR SELECT USING (is_active = true);

-- Events - public when active and not cancelled
CREATE POLICY "anyone_read_events" ON public.events
  FOR SELECT USING (status = 'active' AND NOT is_cancelled);

-- Marketplace - public when active
CREATE POLICY "anyone_read_listings" ON public.marketplace_listings
  FOR SELECT USING (status = 'active' AND (expires_at IS NULL OR expires_at > NOW()));

-- Event attendance counts (aggregate data is public)
CREATE POLICY "anyone_read_attendance_counts" ON public.event_attendance
  FOR SELECT USING (true);

-- User follows counts (aggregate only)
CREATE OR REPLACE VIEW public.public_follow_counts AS
SELECT 
  business_id,
  organization_id,
  venue_id,
  performer_id,
  COUNT(*) as follower_count
FROM public.user_follows
GROUP BY business_id, organization_id, venue_id, performer_id;

GRANT SELECT ON public.public_follow_counts TO anon;

-- =========================================================================
-- PERFORMANCE OPTIMIZATIONS FOR SSR
-- =========================================================================

-- Materialized view for homepage data (refresh every hour)
CREATE MATERIALIZED VIEW IF NOT EXISTS public.homepage_data AS
SELECT 
  c.id as community_id,
  c.name as community_name,
  c.slug as community_slug,
  
  -- Featured events (next 7 days)
  (SELECT json_agg(e.* ORDER BY e.start_datetime)
   FROM (
     SELECT * FROM public.public_events_feed
     WHERE community_id = c.id
     AND start_datetime BETWEEN NOW() AND NOW() + INTERVAL '7 days'
     ORDER BY is_featured DESC, start_datetime
     LIMIT 10
   ) e) as featured_events,
   
  -- Featured businesses
  (SELECT json_agg(b.* ORDER BY b.is_featured DESC, b.view_count DESC)
   FROM (
     SELECT * FROM public.public_business_directory
     WHERE community_id = c.id
     ORDER BY is_featured DESC, view_count DESC
     LIMIT 10
   ) b) as featured_businesses,
   
  -- Trending items
  (SELECT json_agg(t.*)
   FROM (
     SELECT * FROM public.public_trending
     WHERE community_id = c.id
     LIMIT 5
   ) t) as trending_items,
   
  -- Categories with counts
  (SELECT json_agg(cat.*)
   FROM (
     SELECT 
       event_category,
       COUNT(*) as count
     FROM public.events
     WHERE community_id = c.id
     AND status = 'active'
     AND start_datetime >= NOW()
     GROUP BY event_category
     ORDER BY count DESC
   ) cat) as event_categories
   
FROM public.communities c
WHERE c.is_active = true;

-- Create index for fast refresh
CREATE UNIQUE INDEX idx_homepage_data_community ON public.homepage_data(community_id);

-- Grant access
GRANT SELECT ON public.homepage_data TO anon;

-- Refresh function (call periodically)
CREATE OR REPLACE FUNCTION public.refresh_homepage_data()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.homepage_data;
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- SSR-SPECIFIC FUNCTIONS
-- =========================================================================

-- Function to get initial page data for SSR (no auth required)
CREATE OR REPLACE FUNCTION public.get_community_page_data(
  community_slug_param VARCHAR
)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'community', row_to_json(c.*),
    'events', (
      SELECT json_agg(e.*)
      FROM public.public_events_feed e
      WHERE e.community_slug = community_slug_param
      AND e.start_datetime >= NOW()
      ORDER BY e.start_datetime
      LIMIT 20
    ),
    'businesses', (
      SELECT json_agg(b.*)
      FROM public.public_business_directory b
      WHERE b.community_slug = community_slug_param
      AND b.is_featured = true
      LIMIT 10
    ),
    'trending', (
      SELECT json_agg(t.*)
      FROM public.public_trending t
      WHERE t.community_slug = community_slug_param
      LIMIT 5
    )
  ) INTO result
  FROM public.public_community_stats c
  WHERE c.slug = community_slug_param;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

-- Grant execute to anon
GRANT EXECUTE ON FUNCTION public.get_community_page_data(VARCHAR) TO anon;

-- Function to detect community from coordinates (for IP geolocation)
CREATE OR REPLACE FUNCTION public.detect_community_from_coords(
  lat DECIMAL,
  lon DECIMAL
)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'id', id,
    'name', name,
    'slug', slug,
    'distance_miles', (
      ST_Distance(
        ST_MakePoint(lon, lat)::geography,
        ST_MakePoint(longitude, latitude)::geography
      ) / 1609.34
    )::integer
  ) INTO result
  FROM public.communities
  WHERE is_active = true
  ORDER BY ST_Distance(
    ST_MakePoint(lon, lat)::geography,
    ST_MakePoint(longitude, latitude)::geography
  )
  LIMIT 1;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

GRANT EXECUTE ON FUNCTION public.detect_community_from_coords(DECIMAL, DECIMAL) TO anon;

-- =========================================================================
-- END SSR OPTIMIZATIONS
-- =========================================================================
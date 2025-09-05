-- =========================================================================
-- DOWNTOWN GUIDE - DATABASE INDEXES
-- STEP 2: CREATE ALL INDEXES
-- =========================================================================
-- This file creates all indexes for performance optimization
-- Run this AFTER 01-create-all-tables.sql

-- -------------------------------------------------------------------------
-- CORE TABLE INDEXES
-- -------------------------------------------------------------------------

-- Communities indexes
CREATE INDEX IF NOT EXISTS idx_communities_slug ON public.communities(slug);
CREATE INDEX IF NOT EXISTS idx_communities_active ON public.communities(is_active);
CREATE INDEX IF NOT EXISTS idx_communities_location ON public.communities(state, county);
CREATE INDEX IF NOT EXISTS idx_communities_coords ON public.communities(latitude, longitude);

-- Business categories indexes
CREATE INDEX IF NOT EXISTS idx_business_categories_slug ON public.business_categories(slug);
CREATE INDEX IF NOT EXISTS idx_business_categories_parent ON public.business_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_business_categories_active ON public.business_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_business_categories_order ON public.business_categories(display_order, name);

-- Business subcategories indexes
CREATE INDEX IF NOT EXISTS idx_business_subcategories_category ON public.business_subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_business_subcategories_slug ON public.business_subcategories(category_id, slug);
CREATE INDEX IF NOT EXISTS idx_business_subcategories_active ON public.business_subcategories(is_active);

-- Article categories indexes
CREATE INDEX IF NOT EXISTS idx_article_categories_slug ON public.article_categories(slug);
CREATE INDEX IF NOT EXISTS idx_article_categories_parent ON public.article_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_article_categories_active ON public.article_categories(is_active);

-- -------------------------------------------------------------------------
-- USER TABLE INDEXES
-- -------------------------------------------------------------------------

-- User accounts indexes
CREATE INDEX IF NOT EXISTS idx_user_accounts_email ON public.user_accounts(email);
CREATE INDEX IF NOT EXISTS idx_user_accounts_username ON public.user_accounts(username);
CREATE INDEX IF NOT EXISTS idx_user_accounts_type ON public.user_accounts(user_type);
CREATE INDEX IF NOT EXISTS idx_user_accounts_community ON public.user_accounts(preferred_community_id);
CREATE INDEX IF NOT EXISTS idx_user_accounts_location ON public.user_accounts(ip_location_city, ip_location_state);
CREATE INDEX IF NOT EXISTS idx_user_accounts_active ON public.user_accounts(is_active, last_active_at);

-- User profiles indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_public ON public.user_profiles(is_public);
CREATE INDEX IF NOT EXISTS idx_user_profiles_location ON public.user_profiles(location_city, location_state);
CREATE INDEX IF NOT EXISTS idx_user_profiles_active ON public.user_profiles(last_active_at);

-- User locations indexes
CREATE INDEX IF NOT EXISTS idx_user_locations_user ON public.user_locations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_locations_current ON public.user_locations(user_id, is_current);
CREATE INDEX IF NOT EXISTS idx_user_locations_coords ON public.user_locations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_user_locations_time ON public.user_locations(recorded_at);

-- -------------------------------------------------------------------------
-- BUSINESS TABLE INDEXES
-- -------------------------------------------------------------------------

-- Businesses indexes
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON public.businesses(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_community ON public.businesses(community_id);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses(community_id, slug);
CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses(category_id);
CREATE INDEX IF NOT EXISTS idx_businesses_subcategory ON public.businesses(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_businesses_location ON public.businesses(address_city, address_state);
CREATE INDEX IF NOT EXISTS idx_businesses_coords ON public.businesses(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON public.businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_verified ON public.businesses(is_verified);
CREATE INDEX IF NOT EXISTS idx_businesses_featured ON public.businesses(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_businesses_rating ON public.businesses(average_rating);
-- Note: Full text search indexes removed - will be created as generated columns with indexes

-- Business hours indexes
CREATE INDEX IF NOT EXISTS idx_business_hours_business ON public.business_hours(business_id);
CREATE INDEX IF NOT EXISTS idx_business_hours_day ON public.business_hours(business_id, day_of_week);

-- Business special hours indexes
CREATE INDEX IF NOT EXISTS idx_business_special_hours_business ON public.business_special_hours(business_id);
CREATE INDEX IF NOT EXISTS idx_business_special_hours_date ON public.business_special_hours(business_id, date);

-- Business photos indexes
CREATE INDEX IF NOT EXISTS idx_business_photos_business ON public.business_photos(business_id);
CREATE INDEX IF NOT EXISTS idx_business_photos_user ON public.business_photos(user_id);
CREATE INDEX IF NOT EXISTS idx_business_photos_type ON public.business_photos(photo_type);
CREATE INDEX IF NOT EXISTS idx_business_photos_primary ON public.business_photos(business_id, is_primary);
CREATE INDEX IF NOT EXISTS idx_business_photos_order ON public.business_photos(business_id, display_order);

-- Menu items indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_business ON public.menu_items(business_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(business_id, category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(business_id, is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON public.menu_items(business_id, is_featured);

-- Organizations indexes
CREATE INDEX IF NOT EXISTS idx_organizations_owner ON public.organizations(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_organizations_community ON public.organizations(community_id);
CREATE INDEX IF NOT EXISTS idx_organizations_slug ON public.organizations(slug);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON public.organizations(organization_type);
CREATE INDEX IF NOT EXISTS idx_organizations_location ON public.organizations(address_city, address_state);
CREATE INDEX IF NOT EXISTS idx_organizations_coords ON public.organizations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_organizations_active ON public.organizations(is_active);

-- Venues indexes
CREATE INDEX IF NOT EXISTS idx_venues_business ON public.venues(business_id);
CREATE INDEX IF NOT EXISTS idx_venues_organization ON public.venues(organization_id);
CREATE INDEX IF NOT EXISTS idx_venues_community ON public.venues(community_id);
CREATE INDEX IF NOT EXISTS idx_venues_slug ON public.venues(slug);
CREATE INDEX IF NOT EXISTS idx_venues_type ON public.venues(venue_type);
CREATE INDEX IF NOT EXISTS idx_venues_location ON public.venues(address_city, address_state);
CREATE INDEX IF NOT EXISTS idx_venues_coords ON public.venues(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_venues_capacity ON public.venues(capacity);
CREATE INDEX IF NOT EXISTS idx_venues_active ON public.venues(is_active);

-- -------------------------------------------------------------------------
-- CONTENT TABLE INDEXES
-- -------------------------------------------------------------------------

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_business ON public.events(business_id);
CREATE INDEX IF NOT EXISTS idx_events_organization ON public.events(organization_id);
CREATE INDEX IF NOT EXISTS idx_events_venue ON public.events(venue_id);
CREATE INDEX IF NOT EXISTS idx_events_organizer ON public.events(organizer_user_id);
CREATE INDEX IF NOT EXISTS idx_events_community ON public.events(community_id);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_dates ON public.events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_events_category ON public.events(event_category);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_featured ON public.events(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_events_location ON public.events(address_city, address_state);
CREATE INDEX IF NOT EXISTS idx_events_coords ON public.events(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_events_virtual ON public.events(is_virtual);
CREATE INDEX IF NOT EXISTS idx_events_free ON public.events(is_free);
CREATE INDEX IF NOT EXISTS idx_events_published ON public.events(published_at, status);
-- Note: Full text search indexes removed - will be created as generated columns with indexes

-- Event attendees indexes
CREATE INDEX IF NOT EXISTS idx_event_attendees_event ON public.event_attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user ON public.event_attendees(user_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_status ON public.event_attendees(status);
CREATE INDEX IF NOT EXISTS idx_event_attendees_checkin ON public.event_attendees(event_id, check_in_time);

-- Articles indexes
CREATE INDEX IF NOT EXISTS idx_articles_author ON public.articles(author_user_id);
CREATE INDEX IF NOT EXISTS idx_articles_business ON public.articles(business_id);
CREATE INDEX IF NOT EXISTS idx_articles_community ON public.articles(community_id);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_type ON public.articles(article_type);
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published_at, status);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_articles_breaking ON public.articles(is_breaking_news, status);
-- Note: Full text search indexes removed - will be created as generated columns with indexes

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_business ON public.reviews(business_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_date ON public.reviews(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_verified ON public.reviews(is_verified_purchase);
CREATE INDEX IF NOT EXISTS idx_reviews_helpful ON public.reviews(helpful_count);

-- Review votes indexes
CREATE INDEX IF NOT EXISTS idx_review_votes_review ON public.review_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_review_votes_user ON public.review_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_review_votes_type ON public.review_votes(vote_type);

-- Deals indexes
CREATE INDEX IF NOT EXISTS idx_deals_business ON public.deals(business_id);
CREATE INDEX IF NOT EXISTS idx_deals_community ON public.deals(community_id);
CREATE INDEX IF NOT EXISTS idx_deals_slug ON public.deals(business_id, slug);
CREATE INDEX IF NOT EXISTS idx_deals_dates ON public.deals(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_deals_status ON public.deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_featured ON public.deals(is_featured, status);
CREATE INDEX IF NOT EXISTS idx_deals_code ON public.deals(promo_code) WHERE promo_code IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_deals_type ON public.deals(discount_type);
CREATE INDEX IF NOT EXISTS idx_deals_active ON public.deals(status, start_date, end_date);

-- Deal redemptions indexes
CREATE INDEX IF NOT EXISTS idx_deal_redemptions_deal ON public.deal_redemptions(deal_id);
CREATE INDEX IF NOT EXISTS idx_deal_redemptions_user ON public.deal_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_deal_redemptions_code ON public.deal_redemptions(redemption_code);
CREATE INDEX IF NOT EXISTS idx_deal_redemptions_date ON public.deal_redemptions(redeemed_at);

-- Marketplace listings indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_seller ON public.marketplace_listings(seller_user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_business ON public.marketplace_listings(business_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_community ON public.marketplace_listings(community_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_type ON public.marketplace_listings(listing_type);
CREATE INDEX IF NOT EXISTS idx_marketplace_category ON public.marketplace_listings(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_available ON public.marketplace_listings(is_available);
CREATE INDEX IF NOT EXISTS idx_marketplace_price ON public.marketplace_listings(price);
CREATE INDEX IF NOT EXISTS idx_marketplace_location ON public.marketplace_listings(latitude, longitude);

-- -------------------------------------------------------------------------
-- GAMIFICATION TABLE INDEXES
-- -------------------------------------------------------------------------

-- User points indexes
CREATE INDEX IF NOT EXISTS idx_user_points_user ON public.user_points(user_id);
CREATE INDEX IF NOT EXISTS idx_user_points_community ON public.user_points(community_id);
CREATE INDEX IF NOT EXISTS idx_user_points_total ON public.user_points(total_points);
CREATE INDEX IF NOT EXISTS idx_user_points_month ON public.user_points(current_month_points);
CREATE INDEX IF NOT EXISTS idx_user_points_week ON public.user_points(current_week_points);
CREATE INDEX IF NOT EXISTS idx_user_points_level ON public.user_points(level);

-- Point transactions indexes
CREATE INDEX IF NOT EXISTS idx_point_transactions_user ON public.point_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_community ON public.point_transactions(community_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_type ON public.point_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_point_transactions_date ON public.point_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_point_transactions_reference ON public.point_transactions(reference_type, reference_id);

-- Achievements indexes
CREATE INDEX IF NOT EXISTS idx_achievements_slug ON public.achievements(slug);
CREATE INDEX IF NOT EXISTS idx_achievements_category ON public.achievements(category);
CREATE INDEX IF NOT EXISTS idx_achievements_tier ON public.achievements(tier);
CREATE INDEX IF NOT EXISTS idx_achievements_active ON public.achievements(is_active);
CREATE INDEX IF NOT EXISTS idx_achievements_global ON public.achievements(is_global);

-- User achievements indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement ON public.user_achievements(achievement_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_community ON public.user_achievements(community_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_completed ON public.user_achievements(is_completed);
CREATE INDEX IF NOT EXISTS idx_user_achievements_date ON public.user_achievements(completed_at);

-- Leaderboards indexes
CREATE INDEX IF NOT EXISTS idx_leaderboards_community ON public.leaderboards(community_id);
CREATE INDEX IF NOT EXISTS idx_leaderboards_type ON public.leaderboards(board_type);
CREATE INDEX IF NOT EXISTS idx_leaderboards_period ON public.leaderboards(period_start, period_end);

-- Check-ins indexes
CREATE INDEX IF NOT EXISTS idx_check_ins_user ON public.check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_business ON public.check_ins(business_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_community ON public.check_ins(community_id);
CREATE INDEX IF NOT EXISTS idx_check_ins_date ON public.check_ins(created_at);
CREATE INDEX IF NOT EXISTS idx_check_ins_coords ON public.check_ins(latitude, longitude);

-- Challenges indexes
CREATE INDEX IF NOT EXISTS idx_challenges_community ON public.challenges(community_id);
CREATE INDEX IF NOT EXISTS idx_challenges_dates ON public.challenges(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_challenges_type ON public.challenges(challenge_type);
CREATE INDEX IF NOT EXISTS idx_challenges_active ON public.challenges(is_active);
CREATE INDEX IF NOT EXISTS idx_challenges_achievement ON public.challenges(achievement_id);

-- Challenge participants indexes
CREATE INDEX IF NOT EXISTS idx_challenge_participants_challenge ON public.challenge_participants(challenge_id);
CREATE INDEX IF NOT EXISTS idx_challenge_participants_user ON public.challenge_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_participants_completed ON public.challenge_participants(is_completed);

-- Referrals indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON public.referrals(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON public.referrals(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_code ON public.referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON public.referrals(status);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON public.notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_reference ON public.notifications(reference_type, reference_id);
CREATE INDEX IF NOT EXISTS idx_notifications_expires ON public.notifications(expires_at);

-- -------------------------------------------------------------------------
-- USER INTERACTION TABLE INDEXES
-- -------------------------------------------------------------------------

-- User favorites indexes
CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_type ON public.user_favorites(favorite_type);
CREATE INDEX IF NOT EXISTS idx_user_favorites_business ON public.user_favorites(business_id) WHERE business_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_favorites_event ON public.user_favorites(event_id) WHERE event_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_favorites_article ON public.user_favorites(article_id) WHERE article_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_favorites_deal ON public.user_favorites(deal_id) WHERE deal_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_favorites_date ON public.user_favorites(created_at);

-- User collections indexes
CREATE INDEX IF NOT EXISTS idx_user_collections_user ON public.user_collections(user_id);
CREATE INDEX IF NOT EXISTS idx_user_collections_slug ON public.user_collections(user_id, slug);
CREATE INDEX IF NOT EXISTS idx_user_collections_public ON public.user_collections(is_public) WHERE is_public = true;

-- Collection items indexes
CREATE INDEX IF NOT EXISTS idx_collection_items_collection ON public.collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_favorite ON public.collection_items(favorite_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_order ON public.collection_items(collection_id, display_order);

-- -------------------------------------------------------------------------
-- COMPOSITE INDEXES FOR COMMON QUERIES
-- -------------------------------------------------------------------------

-- Find businesses by location and category
CREATE INDEX IF NOT EXISTS idx_businesses_location_category 
ON public.businesses(community_id, category_id, status, is_verified);

-- Find events by date and location
CREATE INDEX IF NOT EXISTS idx_events_date_location 
ON public.events(community_id, start_date, status) 
WHERE status = 'published';

-- Find active deals by business
CREATE INDEX IF NOT EXISTS idx_deals_active_business 
ON public.deals(business_id, status, start_date, end_date) 
WHERE status = 'active';

-- Find user's recent activity
CREATE INDEX IF NOT EXISTS idx_user_activity 
ON public.user_accounts(id, last_active_at);

-- Find popular businesses
CREATE INDEX IF NOT EXISTS idx_businesses_popular 
ON public.businesses(community_id, average_rating, review_count) 
WHERE status = 'active' AND is_verified = true;

-- =========================================================================
-- END OF INDEX CREATION
-- =========================================================================
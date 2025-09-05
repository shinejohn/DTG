-- =========================================================================
-- DOWNTOWN GUIDE - ROW LEVEL SECURITY POLICIES
-- STEP 5: CREATE ALL RLS POLICIES
-- =========================================================================
-- This file creates all Row Level Security policies
-- Run this AFTER all tables and functions are created

-- -------------------------------------------------------------------------
-- ENABLE RLS ON ALL TABLES
-- -------------------------------------------------------------------------

-- Core tables
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;

-- User tables
ALTER TABLE public.user_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_locations ENABLE ROW LEVEL SECURITY;

-- Business tables
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_special_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

-- Content tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_category_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;

-- Gamification tables
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- User interaction tables
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------------------
-- PUBLIC READ POLICIES (No authentication required)
-- -------------------------------------------------------------------------

-- Communities are publicly readable
CREATE POLICY "communities_public_read" ON public.communities
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- Business categories are publicly readable
CREATE POLICY "business_categories_public_read" ON public.business_categories
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "business_subcategories_public_read" ON public.business_subcategories
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- Article categories are publicly readable
CREATE POLICY "article_categories_public_read" ON public.article_categories
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- Active businesses are publicly readable
CREATE POLICY "businesses_public_read" ON public.businesses
    FOR SELECT TO anon, authenticated
    USING (status = 'active');

-- Business hours are publicly readable
CREATE POLICY "business_hours_public_read" ON public.business_hours
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "business_special_hours_public_read" ON public.business_special_hours
    FOR SELECT TO anon, authenticated
    USING (true);

-- Approved business photos are publicly readable
CREATE POLICY "business_photos_public_read" ON public.business_photos
    FOR SELECT TO anon, authenticated
    USING (is_approved = true);

-- Available menu items are publicly readable
CREATE POLICY "menu_items_public_read" ON public.menu_items
    FOR SELECT TO anon, authenticated
    USING (is_available = true);

-- Active organizations and venues are publicly readable
CREATE POLICY "organizations_public_read" ON public.organizations
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "venues_public_read" ON public.venues
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- Published events are publicly readable
CREATE POLICY "events_public_read" ON public.events
    FOR SELECT TO anon, authenticated
    USING (status = 'published');

-- Published articles are publicly readable
CREATE POLICY "articles_public_read" ON public.articles
    FOR SELECT TO anon, authenticated
    USING (status = 'published');

-- Published reviews are publicly readable
CREATE POLICY "reviews_public_read" ON public.reviews
    FOR SELECT TO anon, authenticated
    USING (status = 'published');

-- Active deals are publicly readable
CREATE POLICY "deals_public_read" ON public.deals
    FOR SELECT TO anon, authenticated
    USING (status = 'active' AND start_date <= NOW() AND end_date >= NOW());

-- Available marketplace listings are publicly readable
CREATE POLICY "marketplace_listings_public_read" ON public.marketplace_listings
    FOR SELECT TO anon, authenticated
    USING (is_available = true);

-- Achievements are publicly readable
CREATE POLICY "achievements_public_read" ON public.achievements
    FOR SELECT TO anon, authenticated
    USING (is_active = true AND is_secret = false);

-- Public leaderboards are readable
CREATE POLICY "leaderboards_public_read" ON public.leaderboards
    FOR SELECT TO anon, authenticated
    USING (true);

-- Public user collections are readable
CREATE POLICY "user_collections_public_read" ON public.user_collections
    FOR SELECT TO anon, authenticated
    USING (is_public = true);

-- -------------------------------------------------------------------------
-- USER ACCOUNT POLICIES
-- -------------------------------------------------------------------------

-- Users can read their own account
CREATE POLICY "user_accounts_own_read" ON public.user_accounts
    FOR SELECT TO authenticated
    USING (id = auth.uid());

-- Users can update their own account
CREATE POLICY "user_accounts_own_update" ON public.user_accounts
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Users can read and manage their own profile
CREATE POLICY "user_profiles_own" ON public.user_profiles
    FOR ALL TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Users can view public profiles
CREATE POLICY "user_profiles_public_read" ON public.user_profiles
    FOR SELECT TO authenticated
    USING (is_public = true);

-- Users can manage their own locations
CREATE POLICY "user_locations_own" ON public.user_locations
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- -------------------------------------------------------------------------
-- BUSINESS OWNER POLICIES
-- -------------------------------------------------------------------------

-- Business owners can manage their businesses
CREATE POLICY "businesses_owner_all" ON public.businesses
    FOR ALL TO authenticated
    USING (owner_user_id = auth.uid())
    WITH CHECK (owner_user_id = auth.uid());

-- Business owners can manage their business hours
CREATE POLICY "business_hours_owner" ON public.business_hours
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_hours.business_id
            AND b.owner_user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_hours.business_id
            AND b.owner_user_id = auth.uid()
        )
    );

-- Business owners can manage special hours
CREATE POLICY "business_special_hours_owner" ON public.business_special_hours
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_special_hours.business_id
            AND b.owner_user_id = auth.uid()
        )
    );

-- Business owners can manage photos
CREATE POLICY "business_photos_owner" ON public.business_photos
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = business_photos.business_id
            AND b.owner_user_id = auth.uid()
        )
    );

-- Business owners can manage menu items
CREATE POLICY "menu_items_owner" ON public.menu_items
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = menu_items.business_id
            AND b.owner_user_id = auth.uid()
        )
    );

-- Business owners can manage their deals
CREATE POLICY "deals_owner" ON public.deals
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = deals.business_id
            AND b.owner_user_id = auth.uid()
        )
    );

-- -------------------------------------------------------------------------
-- EVENT POLICIES
-- -------------------------------------------------------------------------

-- Event organizers can manage their events
CREATE POLICY "events_organizer" ON public.events
    FOR ALL TO authenticated
    USING (
        organizer_user_id = auth.uid() OR
        (business_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = events.business_id
            AND b.owner_user_id = auth.uid()
        ))
    );

-- Authenticated users can create events
CREATE POLICY "events_create" ON public.events
    FOR INSERT TO authenticated
    WITH CHECK (
        organizer_user_id = auth.uid() OR
        (business_id IS NOT NULL AND EXISTS (
            SELECT 1 FROM public.businesses b
            WHERE b.id = events.business_id
            AND b.owner_user_id = auth.uid()
        ))
    );

-- Users can manage their event attendance
CREATE POLICY "event_attendees_own" ON public.event_attendees
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Public can view event attendee counts
CREATE POLICY "event_attendees_read" ON public.event_attendees
    FOR SELECT TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.events e
            WHERE e.id = event_attendees.event_id
            AND e.status = 'published'
        )
    );

-- -------------------------------------------------------------------------
-- CONTENT CREATION POLICIES
-- -------------------------------------------------------------------------

-- Users can create articles
CREATE POLICY "articles_create" ON public.articles
    FOR INSERT TO authenticated
    WITH CHECK (author_user_id = auth.uid());

-- Authors can manage their articles
CREATE POLICY "articles_author" ON public.articles
    FOR ALL TO authenticated
    USING (author_user_id = auth.uid())
    WITH CHECK (author_user_id = auth.uid());

-- Users can create reviews
CREATE POLICY "reviews_create" ON public.reviews
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can manage their own reviews
CREATE POLICY "reviews_own" ON public.reviews
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Users can vote on reviews
CREATE POLICY "review_votes_create" ON public.review_votes
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can manage their review votes
CREATE POLICY "review_votes_own" ON public.review_votes
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- -------------------------------------------------------------------------
-- GAMIFICATION POLICIES
-- -------------------------------------------------------------------------

-- Users can view their own points
CREATE POLICY "user_points_own" ON public.user_points
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Users can view their point transactions
CREATE POLICY "point_transactions_own" ON public.point_transactions
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Users can view their achievements
CREATE POLICY "user_achievements_own" ON public.user_achievements
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Users can view public achievements of others
CREATE POLICY "user_achievements_public" ON public.user_achievements
    FOR SELECT TO authenticated
    USING (is_completed = true);

-- Users can create check-ins
CREATE POLICY "check_ins_create" ON public.check_ins
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can view their own check-ins
CREATE POLICY "check_ins_own" ON public.check_ins
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Users can participate in challenges
CREATE POLICY "challenge_participants_create" ON public.challenge_participants
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can manage their challenge participation
CREATE POLICY "challenge_participants_own" ON public.challenge_participants
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Public can view active challenges
CREATE POLICY "challenges_public_read" ON public.challenges
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- -------------------------------------------------------------------------
-- USER INTERACTION POLICIES
-- -------------------------------------------------------------------------

-- Users can manage their favorites
CREATE POLICY "user_favorites_own" ON public.user_favorites
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Users can manage their collections
CREATE POLICY "user_collections_own" ON public.user_collections
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Users can manage items in their collections
CREATE POLICY "collection_items_own" ON public.collection_items
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_collections c
            WHERE c.id = collection_items.collection_id
            AND c.user_id = auth.uid()
        )
    );

-- Public can view items in public collections
CREATE POLICY "collection_items_public" ON public.collection_items
    FOR SELECT TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_collections c
            WHERE c.id = collection_items.collection_id
            AND c.is_public = true
        )
    );

-- -------------------------------------------------------------------------
-- MARKETPLACE POLICIES
-- -------------------------------------------------------------------------

-- Users can create marketplace listings
CREATE POLICY "marketplace_listings_create" ON public.marketplace_listings
    FOR INSERT TO authenticated
    WITH CHECK (seller_user_id = auth.uid());

-- Users can manage their listings
CREATE POLICY "marketplace_listings_own" ON public.marketplace_listings
    FOR ALL TO authenticated
    USING (seller_user_id = auth.uid())
    WITH CHECK (seller_user_id = auth.uid());

-- -------------------------------------------------------------------------
-- REFERRAL POLICIES
-- -------------------------------------------------------------------------

-- Users can view their referrals
CREATE POLICY "referrals_own" ON public.referrals
    FOR SELECT TO authenticated
    USING (
        referrer_user_id = auth.uid() OR
        referred_user_id = auth.uid()
    );

-- -------------------------------------------------------------------------
-- NOTIFICATION POLICIES
-- -------------------------------------------------------------------------

-- Users can only see their own notifications
CREATE POLICY "notifications_own" ON public.notifications
    FOR ALL TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- -------------------------------------------------------------------------
-- DEAL REDEMPTION POLICIES
-- -------------------------------------------------------------------------

-- Users can redeem deals
CREATE POLICY "deal_redemptions_create" ON public.deal_redemptions
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can view their redemptions
CREATE POLICY "deal_redemptions_own" ON public.deal_redemptions
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- =========================================================================
-- END OF RLS POLICY CREATION
-- =========================================================================
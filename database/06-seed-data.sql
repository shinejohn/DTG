-- =========================================================================
-- DOWNTOWN GUIDE - SEED DATA
-- STEP 6: INSERT INITIAL DATA
-- =========================================================================
-- This file creates initial data for the application
-- Run this AFTER all tables, functions, triggers, and policies are created

-- -------------------------------------------------------------------------
-- COMMUNITIES
-- -------------------------------------------------------------------------

INSERT INTO public.communities (id, name, slug, county, state, country, latitude, longitude, radius_miles, timezone, population, description) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'New York City', 'nyc', 'New York', 'NY', 'US', 40.7128, -74.0060, 25, 'America/New_York', 8336817, 'The most populous city in the United States'),
('550e8400-e29b-41d4-a716-446655440002', 'Los Angeles', 'la', 'Los Angeles', 'CA', 'US', 34.0522, -118.2437, 30, 'America/Los_Angeles', 3898747, 'The second-most populous city in the United States'),
('550e8400-e29b-41d4-a716-446655440003', 'Chicago', 'chicago', 'Cook', 'IL', 'US', 41.8781, -87.6298, 20, 'America/Chicago', 2746388, 'The third-most populous city in the United States'),
('550e8400-e29b-41d4-a716-446655440004', 'Houston', 'houston', 'Harris', 'TX', 'US', 29.7604, -95.3698, 25, 'America/Chicago', 2304580, 'The most populous city in Texas'),
('550e8400-e29b-41d4-a716-446655440005', 'Phoenix', 'phoenix', 'Maricopa', 'AZ', 'US', 33.4484, -112.0740, 25, 'America/Phoenix', 1608139, 'The capital and most populous city of Arizona');

-- -------------------------------------------------------------------------
-- BUSINESS CATEGORIES
-- -------------------------------------------------------------------------

INSERT INTO public.business_categories (id, name, slug, description, icon_name, color_hex, display_order) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Restaurants', 'restaurants', 'Dining establishments and eateries', 'utensils', '#F59E0B', 1),
('650e8400-e29b-41d4-a716-446655440002', 'Shopping', 'shopping', 'Retail stores and boutiques', 'shopping-bag', '#3B82F6', 2),
('650e8400-e29b-41d4-a716-446655440003', 'Entertainment', 'entertainment', 'Movies, theaters, and fun activities', 'film', '#8B5CF6', 3),
('650e8400-e29b-41d4-a716-446655440004', 'Services', 'services', 'Professional and personal services', 'briefcase', '#10B981', 4),
('650e8400-e29b-41d4-a716-446655440005', 'Health & Beauty', 'health-beauty', 'Health, wellness, and beauty services', 'heart', '#EF4444', 5),
('650e8400-e29b-41d4-a716-446655440006', 'Nightlife', 'nightlife', 'Bars, clubs, and evening entertainment', 'moon', '#6366F1', 6),
('650e8400-e29b-41d4-a716-446655440007', 'Fitness', 'fitness', 'Gyms, sports, and recreational facilities', 'dumbbell', '#14B8A6', 7),
('650e8400-e29b-41d4-a716-446655440008', 'Arts & Culture', 'arts-culture', 'Museums, galleries, and cultural venues', 'palette', '#F97316', 8);

-- -------------------------------------------------------------------------
-- BUSINESS SUBCATEGORIES
-- -------------------------------------------------------------------------

-- Restaurant subcategories
INSERT INTO public.business_subcategories (category_id, name, slug, description, display_order) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'American', 'american', 'American cuisine restaurants', 1),
('650e8400-e29b-41d4-a716-446655440001', 'Italian', 'italian', 'Italian cuisine restaurants', 2),
('650e8400-e29b-41d4-a716-446655440001', 'Mexican', 'mexican', 'Mexican cuisine restaurants', 3),
('650e8400-e29b-41d4-a716-446655440001', 'Asian', 'asian', 'Asian cuisine restaurants', 4),
('650e8400-e29b-41d4-a716-446655440001', 'Fast Food', 'fast-food', 'Quick service restaurants', 5),
('650e8400-e29b-41d4-a716-446655440001', 'Cafes', 'cafes', 'Coffee shops and cafes', 6),
('650e8400-e29b-41d4-a716-446655440001', 'Bakeries', 'bakeries', 'Bakeries and dessert shops', 7),
('650e8400-e29b-41d4-a716-446655440001', 'Fine Dining', 'fine-dining', 'Upscale restaurants', 8);

-- Shopping subcategories
INSERT INTO public.business_subcategories (category_id, name, slug, description, display_order) VALUES
('650e8400-e29b-41d4-a716-446655440002', 'Clothing', 'clothing', 'Clothing and apparel stores', 1),
('650e8400-e29b-41d4-a716-446655440002', 'Electronics', 'electronics', 'Electronics and technology stores', 2),
('650e8400-e29b-41d4-a716-446655440002', 'Home & Garden', 'home-garden', 'Home improvement and garden stores', 3),
('650e8400-e29b-41d4-a716-446655440002', 'Gifts & Specialty', 'gifts-specialty', 'Gift shops and specialty stores', 4),
('650e8400-e29b-41d4-a716-446655440002', 'Books & Media', 'books-media', 'Bookstores and media shops', 5);

-- -------------------------------------------------------------------------
-- ARTICLE CATEGORIES
-- -------------------------------------------------------------------------

INSERT INTO public.article_categories (id, name, slug, description, display_order) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Local News', 'local-news', 'News about the local community', 1),
('750e8400-e29b-41d4-a716-446655440002', 'Business Spotlights', 'business-spotlights', 'Featured local businesses', 2),
('750e8400-e29b-41d4-a716-446655440003', 'Events', 'events', 'Upcoming events and activities', 3),
('750e8400-e29b-41d4-a716-446655440004', 'Food & Dining', 'food-dining', 'Restaurant reviews and food news', 4),
('750e8400-e29b-41d4-a716-446655440005', 'Shopping Guides', 'shopping-guides', 'Shopping tips and recommendations', 5),
('750e8400-e29b-41d4-a716-446655440006', 'Community', 'community', 'Community stories and updates', 6);

-- -------------------------------------------------------------------------
-- ACHIEVEMENTS
-- -------------------------------------------------------------------------

INSERT INTO public.achievements (id, name, slug, description, category, tier, requirements, point_reward, is_global) VALUES
-- Check-in achievements
('850e8400-e29b-41d4-a716-446655440001', 'First Check-in', 'first-checkin', 'Complete your first check-in', 'check_in', 'bronze', '{"target": 1, "type": "check_ins_count"}', 10, true),
('850e8400-e29b-41d4-a716-446655440002', 'Regular Visitor', 'regular-visitor', 'Check in to 10 different places', 'check_in', 'bronze', '{"target": 10, "type": "check_ins_count"}', 50, true),
('850e8400-e29b-41d4-a716-446655440003', 'Local Expert', 'local-expert', 'Check in to 50 different places', 'check_in', 'silver', '{"target": 50, "type": "check_ins_count"}', 200, true),
('850e8400-e29b-41d4-a716-446655440004', 'City Explorer', 'city-explorer', 'Check in to 100 different places', 'check_in', 'gold', '{"target": 100, "type": "check_ins_count"}', 500, true),

-- Review achievements
('850e8400-e29b-41d4-a716-446655440005', 'First Review', 'first-review', 'Write your first review', 'review', 'bronze', '{"target": 1, "type": "reviews_count"}', 20, true),
('850e8400-e29b-41d4-a716-446655440006', 'Reviewer', 'reviewer', 'Write 10 reviews', 'review', 'bronze', '{"target": 10, "type": "reviews_count"}', 100, true),
('850e8400-e29b-41d4-a716-446655440007', 'Critic', 'critic', 'Write 25 reviews', 'review', 'silver', '{"target": 25, "type": "reviews_count"}', 250, true),
('850e8400-e29b-41d4-a716-446655440008', 'Master Critic', 'master-critic', 'Write 50 reviews', 'review', 'gold', '{"target": 50, "type": "reviews_count"}', 500, true),

-- Photo achievements
('850e8400-e29b-41d4-a716-446655440009', 'Shutterbug', 'shutterbug', 'Upload your first photo', 'photo', 'bronze', '{"target": 1, "type": "photos_uploaded"}', 5, true),
('850e8400-e29b-41d4-a716-446655440010', 'Photographer', 'photographer', 'Upload 25 photos', 'photo', 'silver', '{"target": 25, "type": "photos_uploaded"}', 100, true),

-- Deal achievements
('850e8400-e29b-41d4-a716-446655440011', 'Deal Hunter', 'deal-hunter', 'Redeem your first deal', 'deal', 'bronze', '{"target": 1, "type": "deals_redeemed"}', 15, true),
('850e8400-e29b-41d4-a716-446655440012', 'Bargain Expert', 'bargain-expert', 'Redeem 10 deals', 'deal', 'silver', '{"target": 10, "type": "deals_redeemed"}', 150, true),

-- Points achievements
('850e8400-e29b-41d4-a716-446655440013', 'Getting Started', 'getting-started', 'Earn 100 points', 'points', 'bronze', '{"target": 100, "type": "total_points"}', 0, true),
('850e8400-e29b-41d4-a716-446655440014', 'Point Collector', 'point-collector', 'Earn 1000 points', 'points', 'silver', '{"target": 1000, "type": "total_points"}', 0, true),
('850e8400-e29b-41d4-a716-446655440015', 'Point Master', 'point-master', 'Earn 5000 points', 'points', 'gold', '{"target": 5000, "type": "total_points"}', 0, true);

-- -------------------------------------------------------------------------
-- SAMPLE BUSINESSES (for NYC)
-- -------------------------------------------------------------------------

-- Sample businesses (without owner_user_id since we don't have auth users yet)
INSERT INTO public.businesses (
    id, owner_user_id, community_id, name, slug, 
    description, short_description, 
    category_id, category, 
    phone, email, website_url,
    address_street, address_city, address_state, address_postal_code,
    latitude, longitude,
    price_range, status, is_verified, is_featured
) VALUES
(
    'a50e8400-e29b-41d4-a716-446655440001',
    null, -- No owner yet, will be claimed later
    '550e8400-e29b-41d4-a716-446655440001',
    'Joe''s Pizza',
    'joes-pizza',
    'Authentic New York style pizza since 1975. Our hand-tossed pizzas are made with the finest ingredients and baked to perfection in our traditional brick ovens.',
    'Classic NYC pizza joint serving slices since 1975',
    '650e8400-e29b-41d4-a716-446655440001',
    'Restaurants',
    '(212) 555-0123',
    'info@joespizza.com',
    'https://joespizza.com',
    '123 Broadway',
    'New York',
    'NY',
    '10001',
    40.7489,
    -73.9680,
    '$$',
    'active',
    true,
    true
),
(
    'a50e8400-e29b-41d4-a716-446655440002',
    null,
    '550e8400-e29b-41d4-a716-446655440001',
    'Central Perk Coffee',
    'central-perk-coffee',
    'Your neighborhood coffee shop with the best brews in town. We serve locally roasted coffee, fresh pastries, and a warm atmosphere.',
    'Cozy coffee shop with locally roasted beans',
    '650e8400-e29b-41d4-a716-446655440001',
    'Restaurants',
    '(212) 555-0456',
    'hello@centralperk.com',
    'https://centralperk.com',
    '456 5th Avenue',
    'New York',
    'NY',
    '10018',
    40.7505,
    -73.9934,
    '$',
    'active',
    true,
    false
),
(
    'a50e8400-e29b-41d4-a716-446655440003',
    null,
    '550e8400-e29b-41d4-a716-446655440001',
    'The Book Nook',
    'the-book-nook',
    'Independent bookstore featuring a curated selection of fiction, non-fiction, and local authors. Regular author events and book clubs.',
    'Indie bookstore with author events',
    '650e8400-e29b-41d4-a716-446655440002',
    'Shopping',
    '(212) 555-0789',
    'read@thebooknook.com',
    'https://thebooknook.com',
    '789 Park Avenue',
    'New York',
    'NY',
    '10021',
    40.7695,
    -73.9645,
    '$$',
    'active',
    true,
    false
);

-- Sample business hours for Joe's Pizza
INSERT INTO public.business_hours (business_id, day_of_week, open_time, close_time) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 0, '11:00', '23:00'), -- Sunday
('a50e8400-e29b-41d4-a716-446655440001', 1, '11:00', '23:00'), -- Monday
('a50e8400-e29b-41d4-a716-446655440001', 2, '11:00', '23:00'), -- Tuesday
('a50e8400-e29b-41d4-a716-446655440001', 3, '11:00', '23:00'), -- Wednesday
('a50e8400-e29b-41d4-a716-446655440001', 4, '11:00', '23:00'), -- Thursday
('a50e8400-e29b-41d4-a716-446655440001', 5, '11:00', '00:00'), -- Friday
('a50e8400-e29b-41d4-a716-446655440001', 6, '11:00', '00:00'); -- Saturday

-- Sample menu items for Joe's Pizza
INSERT INTO public.menu_items (business_id, name, description, price, category, is_available, is_featured, display_order) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 'Classic Cheese Pizza', 'Our signature pizza with mozzarella and tomato sauce', 18.00, 'Pizza', true, true, 1),
('a50e8400-e29b-41d4-a716-446655440001', 'Pepperoni Pizza', 'Classic cheese topped with pepperoni', 20.00, 'Pizza', true, true, 2),
('a50e8400-e29b-41d4-a716-446655440001', 'Margherita Pizza', 'Fresh mozzarella, basil, and tomatoes', 22.00, 'Pizza', true, false, 3),
('a50e8400-e29b-41d4-a716-446655440001', 'Garlic Knots', 'Fresh baked knots with garlic butter', 6.00, 'Appetizers', true, false, 4),
('a50e8400-e29b-41d4-a716-446655440001', 'Caesar Salad', 'Romaine lettuce, parmesan, croutons', 10.00, 'Salads', true, false, 5);

-- -------------------------------------------------------------------------
-- SAMPLE EVENTS
-- -------------------------------------------------------------------------

INSERT INTO public.events (
    id, community_id, business_id, organizer_user_id,
    title, slug, description, short_description,
    event_type, event_category,
    start_date, end_date,
    location_name, address_street, address_city, address_state, address_postal_code,
    latitude, longitude,
    is_free, status, is_featured
) VALUES
(
    'b50e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    null,
    null,
    'Downtown Farmers Market',
    'downtown-farmers-market',
    'Weekly farmers market featuring local produce, artisanal foods, and handmade crafts. Support local farmers and enjoy fresh, seasonal products.',
    'Weekly farmers market with local vendors',
    'community',
    'food',
    NOW() + INTERVAL '3 days',
    NOW() + INTERVAL '3 days' + INTERVAL '4 hours',
    'Union Square Park',
    '201 Park Avenue South',
    'New York',
    'NY',
    '10003',
    40.7359,
    -73.9911,
    true,
    'published',
    true
),
(
    'b50e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440001',
    'a50e8400-e29b-41d4-a716-446655440001',
    null, -- No organizer yet
    'Pizza Making Workshop',
    'pizza-making-workshop',
    'Learn the secrets of authentic New York pizza! Join our head chef for a hands-on workshop where you''ll learn to make dough, sauce, and create your own pizza.',
    'Hands-on pizza making class',
    'business',
    'food',
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '7 days' + INTERVAL '2 hours',
    'Joe''s Pizza',
    '123 Broadway',
    'New York',
    'NY',
    '10001',
    40.7489,
    -73.9680,
    false,
    'published',
    false
);

-- -------------------------------------------------------------------------
-- SAMPLE DEALS
-- -------------------------------------------------------------------------

INSERT INTO public.deals (
    id, business_id, community_id,
    title, slug, description,
    discount_type, discount_value, discount_description,
    start_date, end_date,
    status, is_featured
) VALUES
(
    'c50e8400-e29b-41d4-a716-446655440001',
    'a50e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Lunch Special',
    'lunch-special',
    'Get 2 slices and a drink for a special price. Available Monday-Friday 11am-3pm.',
    'fixed',
    2.00,
    '$2 off combo',
    NOW(),
    NOW() + INTERVAL '30 days',
    'active',
    true
),
(
    'c50e8400-e29b-41d4-a716-446655440002',
    'a50e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440001',
    'Happy Hour Coffee',
    'happy-hour-coffee',
    'All coffee drinks 20% off from 2-5pm daily.',
    'percentage',
    20.00,
    '20% off coffee',
    NOW(),
    NOW() + INTERVAL '60 days',
    'active',
    false
);

-- =========================================================================
-- END OF SEED DATA
-- =========================================================================
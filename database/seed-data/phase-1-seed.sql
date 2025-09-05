-- =========================================================================
-- PHASE 1: SEED DATA - Core foundational data
-- =========================================================================
-- Seeds initial categories, sample businesses, and test data
-- Based on Magic Patterns UI components

-- -------------------------------------------------------------------------
-- Business Categories Seed Data
-- -------------------------------------------------------------------------

INSERT INTO public.business_categories (id, name, slug, description, icon_name, color_hex, display_order, is_active) VALUES
-- Food & Dining
('01234567-89ab-cdef-0123-456789abcdef', 'Restaurants', 'restaurants', 'Dining establishments serving prepared meals', 'utensils', '#F59E0B', 1, true),
('01234567-89ab-cdef-0123-456789abcde0', 'Cafés & Coffee', 'cafes-coffee', 'Coffee shops, cafés, and light dining', 'coffee', '#8B5CF6', 2, true),
('01234567-89ab-cdef-0123-456789abcde1', 'Bars & Nightlife', 'bars-nightlife', 'Bars, pubs, and nightlife venues', 'wine', '#EF4444', 3, true),
('01234567-89ab-cdef-0123-456789abcde2', 'Fast Food', 'fast-food', 'Quick service and fast-casual dining', 'zap', '#10B981', 4, true),

-- Shopping & Retail
('01234567-89ab-cdef-0123-456789abcde3', 'Shopping', 'shopping', 'Retail stores and shopping centers', 'shopping-bag', '#3B82F6', 5, true),
('01234567-89ab-cdef-0123-456789abcde4', 'Fashion & Apparel', 'fashion-apparel', 'Clothing, accessories, and fashion stores', 'shirt', '#EC4899', 6, true),
('01234567-89ab-cdef-0123-456789abcde5', 'Electronics', 'electronics', 'Electronics and tech stores', 'smartphone', '#6366F1', 7, true),

-- Services
('01234567-89ab-cdef-0123-456789abcde6', 'Health & Wellness', 'health-wellness', 'Healthcare, fitness, and wellness services', 'heart', '#14B8A6', 8, true),
('01234567-89ab-cdef-0123-456789abcde7', 'Beauty & Personal Care', 'beauty-personal-care', 'Salons, spas, and personal care services', 'scissors', '#F97316', 9, true),
('01234567-89ab-cdef-0123-456789abcde8', 'Automotive', 'automotive', 'Auto repair, dealerships, and services', 'car', '#64748B', 10, true),

-- Entertainment & Recreation
('01234567-89ab-cdef-0123-456789abcde9', 'Entertainment', 'entertainment', 'Movies, theaters, and entertainment venues', 'film', '#7C3AED', 11, true),
('01234567-89ab-cdef-0123-456789abcdea', 'Sports & Recreation', 'sports-recreation', 'Sports facilities, gyms, and recreation', 'activity', '#059669', 12, true),
('01234567-89ab-cdef-0123-456789abcdeb', 'Arts & Culture', 'arts-culture', 'Museums, galleries, and cultural venues', 'palette', '#DC2626', 13, true),

-- Professional Services
('01234567-89ab-cdef-0123-456789abcdec', 'Professional Services', 'professional-services', 'Legal, financial, and business services', 'briefcase', '#4338CA', 14, true),
('01234567-89ab-cdef-0123-456789abcded', 'Real Estate', 'real-estate', 'Real estate agents and property services', 'home', '#B91C1C', 15, true),

-- Other
('01234567-89ab-cdef-0123-456789abcdee', 'Hotels & Lodging', 'hotels-lodging', 'Hotels, motels, and accommodation', 'bed', '#7C2D12', 16, true);

-- -------------------------------------------------------------------------
-- Business Subcategories Seed Data
-- -------------------------------------------------------------------------

INSERT INTO public.business_subcategories (category_id, name, slug, display_order, is_active) VALUES
-- Restaurants subcategories
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Fine Dining', 'fine-dining', 1, true),
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Casual Dining', 'casual-dining', 2, true),
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Italian', 'italian', 3, true),
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Mexican', 'mexican', 4, true),
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Asian', 'asian', 5, true),
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'American', 'american', 6, true),
((SELECT id FROM public.business_categories WHERE slug = 'restaurants'), 'Mediterranean', 'mediterranean', 7, true),

-- Cafés & Coffee subcategories
((SELECT id FROM public.business_categories WHERE slug = 'cafes-coffee'), 'Coffee Shops', 'coffee-shops', 1, true),
((SELECT id FROM public.business_categories WHERE slug = 'cafes-coffee'), 'Bakeries', 'bakeries', 2, true),
((SELECT id FROM public.business_categories WHERE slug = 'cafes-coffee'), 'Dessert Cafés', 'dessert-cafes', 3, true),
((SELECT id FROM public.business_categories WHERE slug = 'cafes-coffee'), 'Tea Houses', 'tea-houses', 4, true),

-- Shopping subcategories
((SELECT id FROM public.business_categories WHERE slug = 'shopping'), 'Department Stores', 'department-stores', 1, true),
((SELECT id FROM public.business_categories WHERE slug = 'shopping'), 'Specialty Stores', 'specialty-stores', 2, true),
((SELECT id FROM public.business_categories WHERE slug = 'shopping'), 'Boutiques', 'boutiques', 3, true),
((SELECT id FROM public.business_categories WHERE slug = 'shopping'), 'Antiques', 'antiques', 4, true),

-- Health & Wellness subcategories
((SELECT id FROM public.business_categories WHERE slug = 'health-wellness'), 'Fitness Centers', 'fitness-centers', 1, true),
((SELECT id FROM public.business_categories WHERE slug = 'health-wellness'), 'Medical Centers', 'medical-centers', 2, true),
((SELECT id FROM public.business_categories WHERE slug = 'health-wellness'), 'Dental Offices', 'dental-offices', 3, true),
((SELECT id FROM public.business_categories WHERE slug = 'health-wellness'), 'Chiropractors', 'chiropractors', 4, true),

-- Beauty & Personal Care subcategories
((SELECT id FROM public.business_categories WHERE slug = 'beauty-personal-care'), 'Hair Salons', 'hair-salons', 1, true),
((SELECT id FROM public.business_categories WHERE slug = 'beauty-personal-care'), 'Spas', 'spas', 2, true),
((SELECT id FROM public.business_categories WHERE slug = 'beauty-personal-care'), 'Nail Salons', 'nail-salons', 3, true),
((SELECT id FROM public.business_categories WHERE slug = 'beauty-personal-care'), 'Barbershops', 'barbershops', 4, true);

-- =========================================================================
-- Sample Business Data (for development and testing)
-- Note: In production, these would be inserted through the application
-- =========================================================================

-- Sample user profile (assuming a test user exists)
INSERT INTO public.user_profiles (
  id,
  account_id,
  username,
  display_name,
  bio,
  location_city,
  location_state,
  location_country,
  is_public,
  is_verified,
  preferences,
  notification_settings
) VALUES (
  (SELECT id FROM auth.users LIMIT 1), -- Use existing user
  (SELECT id FROM public.accounts WHERE is_personal_account = true LIMIT 1), -- Use existing account
  'downtown_explorer',
  'Downtown Explorer',
  'Local business enthusiast and community advocate',
  'Austin',
  'Texas',
  'United States',
  true,
  true,
  '{"theme": "light", "language": "en", "distance_unit": "miles"}',
  '{"email_notifications": true, "push_notifications": true, "marketing": false}'
) ON CONFLICT (id) DO NOTHING;

-- Sample businesses
WITH sample_account AS (
  SELECT id as account_id, primary_owner_user_id as owner_id
  FROM public.accounts 
  WHERE is_personal_account = true 
  LIMIT 1
),
restaurant_category AS (
  SELECT id as category_id FROM public.business_categories WHERE slug = 'restaurants'
),
coffee_category AS (
  SELECT id as category_id FROM public.business_categories WHERE slug = 'cafes-coffee'
),
casual_subcategory AS (
  SELECT id as subcategory_id FROM public.business_subcategories WHERE slug = 'casual-dining'
),
coffee_subcategory AS (
  SELECT id as subcategory_id FROM public.business_subcategories WHERE slug = 'coffee-shops'
)
INSERT INTO public.businesses (
  account_id,
  owner_user_id,
  name,
  slug,
  description,
  short_description,
  tagline,
  category_id,
  subcategory_id,
  contact_email,
  contact_phone,
  website_url,
  address_street,
  address_city,
  address_state,
  address_postal_code,
  latitude,
  longitude,
  price_range,
  features,
  amenities,
  payment_methods,
  status,
  is_verified,
  is_featured,
  is_claimed,
  logo_url,
  cover_image_url,
  social_links,
  average_rating,
  review_count,
  seo_title,
  seo_description
) SELECT 
  sa.account_id,
  sa.owner_id,
  'Urban Bites Café',
  'urban-bites-cafe',
  'A cozy café in the heart of downtown, serving specialty coffee, fresh pastries, and healthy breakfast and lunch options. We pride ourselves on sourcing locally roasted coffee beans and using organic ingredients whenever possible.',
  'Cozy downtown café serving specialty coffee and fresh, healthy meals',
  'Your neighborhood coffee experience',
  cc.category_id,
  cs.subcategory_id,
  'info@urbanbites.com',
  '(555) 123-4567',
  'https://urbanbites.com',
  '123 Main Street',
  'Austin',
  'Texas',
  '78701',
  30.2672,
  -97.7431,
  '$$',
  ARRAY['wifi', 'outdoor_seating', 'wheelchair_accessible', 'pet_friendly'],
  ARRAY['free_wifi', 'outdoor_patio', 'parking', 'takeout', 'delivery'],
  ARRAY['cash', 'credit_card', 'mobile_payment'],
  'active',
  true,
  true,
  true,
  'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=200',
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200',
  '{"facebook": "urbanbites", "instagram": "@urbanbites", "twitter": "@urbanbites"}',
  4.7,
  134,
  'Urban Bites Café - Best Coffee in Downtown Austin',
  'Experience the finest coffee and fresh food in downtown Austin. Urban Bites Café offers a cozy atmosphere perfect for work or socializing.'
FROM sample_account sa, coffee_category cc, coffee_subcategory cs;

-- Add another sample business
WITH sample_account AS (
  SELECT id as account_id, primary_owner_user_id as owner_id
  FROM public.accounts 
  WHERE is_personal_account = true 
  LIMIT 1
),
restaurant_category AS (
  SELECT id as category_id FROM public.business_categories WHERE slug = 'restaurants'
),
casual_subcategory AS (
  SELECT id as subcategory_id FROM public.business_subcategories WHERE slug = 'casual-dining'
)
INSERT INTO public.businesses (
  account_id,
  owner_user_id,
  name,
  slug,
  description,
  short_description,
  tagline,
  category_id,
  subcategory_id,
  contact_email,
  contact_phone,
  address_street,
  address_city,
  address_state,
  address_postal_code,
  latitude,
  longitude,
  price_range,
  features,
  amenities,
  payment_methods,
  status,
  is_verified,
  is_featured,
  is_claimed,
  cover_image_url,
  average_rating,
  review_count
) SELECT 
  sa.account_id,
  sa.owner_id,
  'Downtown Grill',
  'downtown-grill',
  'Classic American grill serving premium steaks, fresh seafood, and craft cocktails in a sophisticated yet welcoming atmosphere.',
  'Premium steaks and fresh seafood in downtown',
  'Where great food meets great company',
  rc.category_id,
  cs.subcategory_id,
  'hello@downtowngrill.com',
  '(555) 987-6543',
  '456 Commerce Street',
  'Austin',
  'Texas',
  '78701',
  30.2683,
  -97.7442,
  '$$$',
  ARRAY['full_bar', 'wheelchair_accessible', 'private_dining'],
  ARRAY['valet_parking', 'reservations', 'happy_hour', 'live_music'],
  ARRAY['cash', 'credit_card', 'mobile_payment'],
  'active',
  true,
  false,
  true,
  'https://images.unsplash.com/photo-1555992336-03a23c9a19d8?w=1200',
  4.5,
  89
FROM sample_account sa, restaurant_category rc, casual_subcategory cs;

-- -------------------------------------------------------------------------
-- Sample Business Hours
-- -------------------------------------------------------------------------

-- Urban Bites Café hours
INSERT INTO public.business_hours (business_id, day_of_week, open_time, close_time) 
SELECT b.id, generate_series(1, 5), '06:30'::time, '19:00'::time
FROM public.businesses b WHERE b.slug = 'urban-bites-cafe';

INSERT INTO public.business_hours (business_id, day_of_week, open_time, close_time) 
SELECT b.id, 6, '07:00'::time, '20:00'::time
FROM public.businesses b WHERE b.slug = 'urban-bites-cafe';

INSERT INTO public.business_hours (business_id, day_of_week, open_time, close_time) 
SELECT b.id, 0, '08:00'::time, '18:00'::time
FROM public.businesses b WHERE b.slug = 'urban-bites-cafe';

-- Downtown Grill hours
INSERT INTO public.business_hours (business_id, day_of_week, open_time, close_time) 
SELECT b.id, generate_series(1, 4), '11:00'::time, '22:00'::time
FROM public.businesses b WHERE b.slug = 'downtown-grill';

INSERT INTO public.business_hours (business_id, day_of_week, open_time, close_time) 
SELECT b.id, generate_series(5, 6), '11:00'::time, '23:00'::time
FROM public.businesses b WHERE b.slug = 'downtown-grill';

INSERT INTO public.business_hours (business_id, day_of_week, open_time, close_time) 
SELECT b.id, 0, '12:00'::time, '21:00'::time
FROM public.businesses b WHERE b.slug = 'downtown-grill';

-- -------------------------------------------------------------------------
-- Sample Menu Items (for Urban Bites Café)
-- -------------------------------------------------------------------------

INSERT INTO public.menu_items (business_id, name, description, price, category, is_available, is_featured, dietary_restrictions, display_order)
SELECT 
  b.id,
  menu_item.name,
  menu_item.description,
  menu_item.price,
  menu_item.category,
  true,
  menu_item.is_featured,
  menu_item.dietary_restrictions,
  menu_item.display_order
FROM public.businesses b,
  (VALUES 
    ('Signature Blend Coffee', 'Our house blend featuring notes of chocolate and caramel', 3.50, 'Beverages', false, ARRAY['']::text[], 1),
    ('Vanilla Latte', 'Espresso with steamed milk and vanilla syrup', 4.25, 'Beverages', true, ARRAY['vegetarian']::text[], 2),
    ('Avocado Toast', 'Fresh avocado on artisan sourdough with lime and sea salt', 8.95, 'Breakfast', true, ARRAY['vegetarian', 'vegan']::text[], 3),
    ('Classic Croissant', 'Buttery, flaky croissant baked fresh daily', 3.25, 'Pastries', false, ARRAY['vegetarian']::text[], 4),
    ('Quinoa Salad Bowl', 'Mixed greens, quinoa, roasted vegetables, and tahini dressing', 12.50, 'Lunch', true, ARRAY['vegetarian', 'vegan', 'gluten-free']::text[], 5),
    ('Grilled Chicken Sandwich', 'Herb-marinated chicken breast with mixed greens and tomato', 11.95, 'Lunch', false, ARRAY['']::text[], 6)
  ) AS menu_item(name, description, price, category, is_featured, dietary_restrictions, display_order)
WHERE b.slug = 'urban-bites-cafe';

-- -------------------------------------------------------------------------
-- Sample Business Photos
-- -------------------------------------------------------------------------

INSERT INTO public.business_photos (business_id, url, alt_text, photo_type, is_primary, display_order)
SELECT 
  b.id,
  photo.url,
  photo.alt_text,
  photo.photo_type,
  photo.is_primary,
  photo.display_order
FROM public.businesses b,
  (VALUES 
    ('https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800', 'Urban Bites Café interior showing cozy seating area', 'interior', true, 1),
    ('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800', 'Fresh coffee beans and brewing equipment', 'product', false, 2),
    ('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', 'Outdoor patio seating area', 'exterior', false, 3),
    ('https://images.unsplash.com/photo-1551887373-6edba6dacbb1?w=800', 'Avocado toast and coffee on wooden table', 'food', false, 4)
  ) AS photo(url, alt_text, photo_type, is_primary, display_order)
WHERE b.slug = 'urban-bites-cafe';

INSERT INTO public.business_photos (business_id, url, alt_text, photo_type, is_primary, display_order)
SELECT 
  b.id,
  photo.url,
  photo.alt_text,
  photo.photo_type,
  photo.is_primary,
  photo.display_order
FROM public.businesses b,
  (VALUES 
    ('https://images.unsplash.com/photo-1555992336-03a23c9a19d8?w=800', 'Downtown Grill elegant dining room', 'interior', true, 1),
    ('https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800', 'Grilled steak with vegetables', 'food', false, 2),
    ('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800', 'Restaurant bar area with craft cocktails', 'interior', false, 3)
  ) AS photo(url, alt_text, photo_type, is_primary, display_order)
WHERE b.slug = 'downtown-grill';

-- =========================================================================
-- END PHASE 1 SEED DATA
-- =========================================================================
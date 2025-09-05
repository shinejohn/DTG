-- =========================================================================
-- PHASE 1: CORE TABLES - Foundation Schema for Downtown Guide
-- =========================================================================
-- Creates the foundational tables for users, businesses, and categories
-- Based on Magic Patterns UI analysis

-- -------------------------------------------------------------------------
-- Categories and Taxonomy
-- -------------------------------------------------------------------------

-- Primary business categories
CREATE TABLE IF NOT EXISTS public.business_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_name VARCHAR(50), -- For UI icons
  color_hex VARCHAR(7) DEFAULT '#6B7280',
  parent_id UUID REFERENCES public.business_categories(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  seo_title VARCHAR(150),
  seo_description VARCHAR(300),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subcategories for granular classification
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

-- -------------------------------------------------------------------------
-- User Extended Profile (extends MakerKit auth.users)
-- -------------------------------------------------------------------------

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
  verification_level VARCHAR(20) DEFAULT 'none', -- none, phone, email, identity, business
  preferences JSONB DEFAULT '{}',
  social_links JSONB DEFAULT '{}', -- {twitter, instagram, facebook, linkedin}
  privacy_settings JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{}',
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User location history for personalization
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
-- Business Extensions (enhances existing businesses table)
-- -------------------------------------------------------------------------

-- Add category foreign keys to existing businesses table
ALTER TABLE public.businesses 
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.business_categories(id),
  ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES public.business_subcategories(id),
  ADD COLUMN IF NOT EXISTS short_description TEXT,
  ADD COLUMN IF NOT EXISTS tagline VARCHAR(200),
  ADD COLUMN IF NOT EXISTS contact_email VARCHAR(320),
  ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(20),
  ADD COLUMN IF NOT EXISTS price_range VARCHAR(10) CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
  ADD COLUMN IF NOT EXISTS features TEXT[],
  ADD COLUMN IF NOT EXISTS amenities TEXT[],
  ADD COLUMN IF NOT EXISTS payment_methods TEXT[],
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended', 'rejected', 'closed')),
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_claimed BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS verification_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS seo_title VARCHAR(150),
  ADD COLUMN IF NOT EXISTS seo_description VARCHAR(300),
  ADD COLUMN IF NOT EXISTS logo_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS cover_image_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS favorite_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS claimed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_updated_at TIMESTAMPTZ DEFAULT NOW();

-- Business hours
CREATE TABLE IF NOT EXISTS public.business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday
  is_closed BOOLEAN DEFAULT false,
  open_time TIME,
  close_time TIME,
  is_24_hours BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, day_of_week)
);

-- Special hours (holidays, temporary changes)
CREATE TABLE IF NOT EXISTS public.business_special_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_closed BOOLEAN DEFAULT false,
  open_time TIME,
  close_time TIME,
  reason VARCHAR(100), -- holiday, special event, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(business_id, date)
);

-- Business photos and media
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

-- Business menu items (for restaurants/food businesses)
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category VARCHAR(100), -- appetizers, mains, desserts, etc.
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  dietary_restrictions TEXT[], -- vegetarian, vegan, gluten-free, etc.
  allergens TEXT[], -- nuts, dairy, etc.
  spice_level INTEGER CHECK (spice_level BETWEEN 0 AND 5),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- Indexes for Performance
-- -------------------------------------------------------------------------

-- User profiles indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_location ON public.user_profiles(location_city, location_state);
CREATE INDEX IF NOT EXISTS idx_user_profiles_last_active ON public.user_profiles(last_active_at);

-- User locations indexes
CREATE INDEX IF NOT EXISTS idx_user_locations_user_id ON public.user_locations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_locations_current ON public.user_locations(user_id, is_current);
CREATE INDEX IF NOT EXISTS idx_user_locations_coords ON public.user_locations(latitude, longitude);

-- Business indexes (only create new ones)
CREATE INDEX IF NOT EXISTS idx_businesses_category ON public.businesses(category_id);
CREATE INDEX IF NOT EXISTS idx_businesses_subcategory ON public.businesses(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_businesses_featured ON public.businesses(is_featured);
CREATE INDEX IF NOT EXISTS idx_businesses_verified ON public.businesses(is_verified);
CREATE INDEX IF NOT EXISTS idx_businesses_rating ON public.businesses(average_rating);

-- Business hours indexes
CREATE INDEX IF NOT EXISTS idx_business_hours_business_id ON public.business_hours(business_id);
CREATE INDEX IF NOT EXISTS idx_business_special_hours_business_date ON public.business_special_hours(business_id, date);

-- Business photos indexes
CREATE INDEX IF NOT EXISTS idx_business_photos_business_id ON public.business_photos(business_id);
CREATE INDEX IF NOT EXISTS idx_business_photos_type ON public.business_photos(business_id, photo_type);
CREATE INDEX IF NOT EXISTS idx_business_photos_primary ON public.business_photos(business_id, is_primary);

-- Menu items indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_business_id ON public.menu_items(business_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(business_id, category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON public.menu_items(business_id, is_available);

-- Category indexes
CREATE INDEX IF NOT EXISTS idx_business_categories_parent ON public.business_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_business_categories_active ON public.business_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_business_subcategories_category ON public.business_subcategories(category_id);

-- -------------------------------------------------------------------------
-- Row Level Security (RLS) Policies
-- -------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_locations ENABLE ROW LEVEL SECURITY;
-- businesses RLS already enabled in base schema
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_special_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_subcategories ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "user_profiles_own_read" ON public.user_profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id OR is_public = true);

CREATE POLICY "user_profiles_own_write" ON public.user_profiles
  FOR ALL TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User locations policies
CREATE POLICY "user_locations_own" ON public.user_locations
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Business policies already defined in base schema, skip here

-- Business hours policies
CREATE POLICY "business_hours_read" ON public.business_hours
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.status = 'active'
  ));

CREATE POLICY "business_hours_write" ON public.business_hours
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.owner_user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.owner_user_id = auth.uid()
  ));

-- Business photos policies
CREATE POLICY "business_photos_read" ON public.business_photos
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.status = 'active'
  ));

CREATE POLICY "business_photos_write" ON public.business_photos
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.owner_user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.owner_user_id = auth.uid()
  ));

-- Menu items policies
CREATE POLICY "menu_items_read" ON public.menu_items
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.status = 'active'
  ));

CREATE POLICY "menu_items_write" ON public.menu_items
  FOR ALL TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.owner_user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.businesses b 
    WHERE b.id = business_id 
    AND b.owner_user_id = auth.uid()
  ));

-- Categories are public read
CREATE POLICY "categories_public_read" ON public.business_categories
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "subcategories_public_read" ON public.business_subcategories
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- -------------------------------------------------------------------------
-- Triggers for Updated Timestamps
-- -------------------------------------------------------------------------

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- businesses trigger already exists in base schema

CREATE TRIGGER update_business_hours_updated_at
    BEFORE UPDATE ON public.business_hours
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_business_photos_updated_at
    BEFORE UPDATE ON public.business_photos
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_menu_items_updated_at
    BEFORE UPDATE ON public.menu_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_business_categories_updated_at
    BEFORE UPDATE ON public.business_categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_business_subcategories_updated_at
    BEFORE UPDATE ON public.business_subcategories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- -------------------------------------------------------------------------
-- Comments for Documentation
-- -------------------------------------------------------------------------

COMMENT ON TABLE public.user_profiles IS 'Extended user profiles linked to MakerKit auth system';
COMMENT ON TABLE public.businesses IS 'Main business directory with comprehensive business information';
COMMENT ON TABLE public.business_categories IS 'Hierarchical business categorization system';
COMMENT ON TABLE public.business_hours IS 'Regular operating hours for businesses';
COMMENT ON TABLE public.business_photos IS 'Business photo gallery and media management';
COMMENT ON TABLE public.menu_items IS 'Menu items for food service businesses';

-- =========================================================================
-- END PHASE 1: CORE TABLES
-- =========================================================================
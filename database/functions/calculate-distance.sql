-- Function to calculate distance between two coordinates using Haversine formula
-- Returns distance in miles

CREATE OR REPLACE FUNCTION public.calculate_distance(
    lat1 DOUBLE PRECISION,
    lon1 DOUBLE PRECISION,
    lat2 DOUBLE PRECISION,
    lon2 DOUBLE PRECISION
) RETURNS DOUBLE PRECISION AS $$
DECLARE
    R CONSTANT DOUBLE PRECISION := 3959; -- Earth's radius in miles
    dlat DOUBLE PRECISION;
    dlon DOUBLE PRECISION;
    a DOUBLE PRECISION;
    c DOUBLE PRECISION;
    distance DOUBLE PRECISION;
BEGIN
    -- Convert degrees to radians
    dlat := RADIANS(lat2 - lat1);
    dlon := RADIANS(lon2 - lon1);
    
    -- Haversine formula
    a := SIN(dlat/2) * SIN(dlat/2) + 
         COS(RADIANS(lat1)) * COS(RADIANS(lat2)) * 
         SIN(dlon/2) * SIN(dlon/2);
    
    c := 2 * ATAN2(SQRT(a), SQRT(1-a));
    
    distance := R * c;
    
    RETURN distance;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.calculate_distance(DOUBLE PRECISION, DOUBLE PRECISION, DOUBLE PRECISION, DOUBLE PRECISION) TO authenticated;

-- Function to find businesses within a certain distance
CREATE OR REPLACE FUNCTION public.find_businesses_by_distance(
    user_lat DOUBLE PRECISION,
    user_lon DOUBLE PRECISION,
    max_distance_miles DOUBLE PRECISION,
    community_id UUID
) RETURNS TABLE (
    id UUID,
    name VARCHAR,
    slug VARCHAR,
    description TEXT,
    category VARCHAR,
    subcategory VARCHAR,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    address VARCHAR,
    city VARCHAR,
    state VARCHAR,
    zip_code VARCHAR,
    phone VARCHAR,
    email VARCHAR,
    website VARCHAR,
    hours_of_operation JSONB,
    logo_url VARCHAR,
    cover_image_url VARCHAR,
    images TEXT[],
    amenities TEXT[],
    price_range INT,
    rating_average NUMERIC,
    rating_count INT,
    distance_miles DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.name,
        b.slug,
        b.description,
        b.category,
        b.subcategory,
        b.latitude,
        b.longitude,
        b.address,
        b.city,
        b.state,
        b.zip_code,
        b.phone,
        b.email,
        b.website,
        b.hours_of_operation,
        b.logo_url,
        b.cover_image_url,
        b.images,
        b.amenities,
        b.price_range,
        b.rating_average,
        b.rating_count,
        public.calculate_distance(user_lat, user_lon, b.latitude, b.longitude) AS distance_miles
    FROM 
        public.businesses b
    WHERE 
        b.community_id = find_businesses_by_distance.community_id
        AND b.is_active = true
        AND b.latitude IS NOT NULL
        AND b.longitude IS NOT NULL
        AND public.calculate_distance(user_lat, user_lon, b.latitude, b.longitude) <= max_distance_miles
    ORDER BY 
        distance_miles ASC;
END;
$$ LANGUAGE plpgsql STABLE;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.find_businesses_by_distance(DOUBLE PRECISION, DOUBLE PRECISION, DOUBLE PRECISION, UUID) TO authenticated;
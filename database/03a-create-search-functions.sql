-- =========================================================================
-- DOWNTOWN GUIDE - SEARCH FUNCTIONS
-- STEP 3A: CREATE SEARCH FUNCTIONS
-- =========================================================================
-- This file creates search functions that can be used instead of generated columns
-- Run this AFTER 03-create-functions.sql

-- -------------------------------------------------------------------------
-- BUSINESS SEARCH FUNCTION
-- -------------------------------------------------------------------------

-- Function to search businesses using full-text search
CREATE OR REPLACE FUNCTION public.search_businesses_fulltext(
    p_search_query TEXT,
    p_community_id UUID DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    name VARCHAR(255),
    category VARCHAR(100),
    average_rating DECIMAL(3,2),
    review_count INTEGER,
    price_range VARCHAR(10),
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.name,
        b.category,
        b.average_rating,
        b.review_count,
        b.price_range,
        ts_rank(
            to_tsvector('english', 
                COALESCE(b.name, '') || ' ' || 
                COALESCE(b.description, '') || ' ' || 
                COALESCE(b.short_description, '') || ' ' ||
                COALESCE(b.category, '') || ' ' ||
                COALESCE(b.subcategory, '') || ' ' ||
                COALESCE(array_to_string(b.tags, ' '), '')
            ),
            plainto_tsquery('english', p_search_query)
        ) AS rank
    FROM public.businesses b
    WHERE (p_community_id IS NULL OR b.community_id = p_community_id)
    AND b.status = 'active'
    AND to_tsvector('english', 
            COALESCE(b.name, '') || ' ' || 
            COALESCE(b.description, '') || ' ' || 
            COALESCE(b.short_description, '') || ' ' ||
            COALESCE(b.category, '') || ' ' ||
            COALESCE(b.subcategory, '') || ' ' ||
            COALESCE(array_to_string(b.tags, ' '), '')
        ) @@ plainto_tsquery('english', p_search_query)
    ORDER BY rank DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- EVENT SEARCH FUNCTION
-- -------------------------------------------------------------------------

-- Function to search events using full-text search
CREATE OR REPLACE FUNCTION public.search_events_fulltext(
    p_search_query TEXT,
    p_community_id UUID DEFAULT NULL,
    p_start_date TIMESTAMPTZ DEFAULT NULL,
    p_end_date TIMESTAMPTZ DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title VARCHAR(255),
    start_date TIMESTAMPTZ,
    location_name VARCHAR(255),
    event_category event_category,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.title,
        e.start_date,
        e.location_name,
        e.event_category,
        ts_rank(
            to_tsvector('english', 
                COALESCE(e.title, '') || ' ' || 
                COALESCE(e.description, '') || ' ' || 
                COALESCE(e.short_description, '') || ' ' ||
                COALESCE(e.location_name, '') || ' ' ||
                COALESCE(array_to_string(e.tags, ' '), '')
            ),
            plainto_tsquery('english', p_search_query)
        ) AS rank
    FROM public.events e
    WHERE (p_community_id IS NULL OR e.community_id = p_community_id)
    AND e.status = 'published'
    AND (p_start_date IS NULL OR e.start_date >= p_start_date)
    AND (p_end_date IS NULL OR e.start_date <= p_end_date)
    AND to_tsvector('english', 
            COALESCE(e.title, '') || ' ' || 
            COALESCE(e.description, '') || ' ' || 
            COALESCE(e.short_description, '') || ' ' ||
            COALESCE(e.location_name, '') || ' ' ||
            COALESCE(array_to_string(e.tags, ' '), '')
        ) @@ plainto_tsquery('english', p_search_query)
    ORDER BY rank DESC, e.start_date ASC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- ARTICLE SEARCH FUNCTION
-- -------------------------------------------------------------------------

-- Function to search articles using full-text search
CREATE OR REPLACE FUNCTION public.search_articles_fulltext(
    p_search_query TEXT,
    p_community_id UUID DEFAULT NULL,
    p_article_type VARCHAR(50) DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title VARCHAR(300),
    excerpt TEXT,
    article_type VARCHAR(50),
    published_at TIMESTAMPTZ,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.title,
        a.excerpt,
        a.article_type,
        a.published_at,
        ts_rank(
            to_tsvector('english', 
                COALESCE(a.title, '') || ' ' || 
                COALESCE(a.excerpt, '') || ' ' || 
                COALESCE(a.content, '') || ' ' ||
                COALESCE(array_to_string(a.tags, ' '), '')
            ),
            plainto_tsquery('english', p_search_query)
        ) AS rank
    FROM public.articles a
    WHERE (p_community_id IS NULL OR a.community_id = p_community_id)
    AND a.status = 'published'
    AND (p_article_type IS NULL OR a.article_type = p_article_type)
    AND to_tsvector('english', 
            COALESCE(a.title, '') || ' ' || 
            COALESCE(a.excerpt, '') || ' ' || 
            COALESCE(a.content, '') || ' ' ||
            COALESCE(array_to_string(a.tags, ' '), '')
        ) @@ plainto_tsquery('english', p_search_query)
    ORDER BY rank DESC, a.published_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- GLOBAL SEARCH FUNCTION
-- -------------------------------------------------------------------------

-- Function to search across multiple entity types
CREATE OR REPLACE FUNCTION public.global_search(
    p_search_query TEXT,
    p_community_id UUID DEFAULT NULL,
    p_entity_types TEXT[] DEFAULT ARRAY['business', 'event', 'article'],
    p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
    entity_type TEXT,
    entity_id UUID,
    title TEXT,
    description TEXT,
    rank REAL
) AS $$
DECLARE
    v_limit_per_type INTEGER;
BEGIN
    -- Calculate limit per entity type
    v_limit_per_type := CEIL(p_limit::NUMERIC / array_length(p_entity_types, 1))::INTEGER;
    
    RETURN QUERY
    -- Search businesses
    SELECT 
        'business'::TEXT AS entity_type,
        b.id AS entity_id,
        b.name AS title,
        b.short_description AS description,
        b.rank
    FROM public.search_businesses_fulltext(p_search_query, p_community_id, v_limit_per_type, 0) b
    WHERE 'business' = ANY(p_entity_types)
    
    UNION ALL
    
    -- Search events
    SELECT 
        'event'::TEXT AS entity_type,
        e.id AS entity_id,
        e.title AS title,
        e.location_name AS description,
        e.rank
    FROM public.search_events_fulltext(p_search_query, p_community_id, NULL, NULL, v_limit_per_type, 0) e
    WHERE 'event' = ANY(p_entity_types)
    
    UNION ALL
    
    -- Search articles
    SELECT 
        'article'::TEXT AS entity_type,
        a.id AS entity_id,
        a.title AS title,
        a.excerpt AS description,
        a.rank
    FROM public.search_articles_fulltext(p_search_query, p_community_id, NULL, v_limit_per_type, 0) a
    WHERE 'article' = ANY(p_entity_types)
    
    ORDER BY rank DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------------------
-- SEARCH SUGGESTION FUNCTION
-- -------------------------------------------------------------------------

-- Function to get search suggestions based on partial input
CREATE OR REPLACE FUNCTION public.get_search_suggestions(
    p_query TEXT,
    p_community_id UUID DEFAULT NULL,
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    suggestion TEXT,
    entity_type TEXT,
    count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    WITH suggestions AS (
        -- Business names
        SELECT 
            b.name AS suggestion,
            'business' AS entity_type,
            COUNT(*) AS count
        FROM public.businesses b
        WHERE (p_community_id IS NULL OR b.community_id = p_community_id)
        AND b.status = 'active'
        AND b.name ILIKE p_query || '%'
        GROUP BY b.name
        
        UNION ALL
        
        -- Event titles
        SELECT 
            e.title AS suggestion,
            'event' AS entity_type,
            COUNT(*) AS count
        FROM public.events e
        WHERE (p_community_id IS NULL OR e.community_id = p_community_id)
        AND e.status = 'published'
        AND e.start_date >= NOW()
        AND e.title ILIKE p_query || '%'
        GROUP BY e.title
        
        UNION ALL
        
        -- Business categories
        SELECT DISTINCT
            b.category AS suggestion,
            'category' AS entity_type,
            COUNT(*) AS count
        FROM public.businesses b
        WHERE (p_community_id IS NULL OR b.community_id = p_community_id)
        AND b.status = 'active'
        AND b.category ILIKE p_query || '%'
        GROUP BY b.category
    )
    SELECT * FROM suggestions
    ORDER BY 
        CASE 
            WHEN suggestion ILIKE p_query || '%' THEN 0
            ELSE 1
        END,
        count DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- =========================================================================
-- END OF SEARCH FUNCTION CREATION
-- =========================================================================
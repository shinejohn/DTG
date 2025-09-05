-- =========================================================================
-- DOWNTOWN GUIDE - SEARCH COLUMNS AND INDEXES
-- STEP 2A: CREATE GENERATED COLUMNS FOR FULL-TEXT SEARCH
-- =========================================================================
-- This file creates generated columns and their indexes for full-text search
-- Run this AFTER 02-create-indexes.sql

-- -------------------------------------------------------------------------
-- GENERATED COLUMNS FOR FULL-TEXT SEARCH
-- -------------------------------------------------------------------------

-- Add search column to businesses table
ALTER TABLE public.businesses 
ADD COLUMN IF NOT EXISTS search_vector tsvector 
GENERATED ALWAYS AS (
    to_tsvector('english', 
        COALESCE(name, '') || ' ' || 
        COALESCE(description, '') || ' ' || 
        COALESCE(short_description, '') || ' ' ||
        COALESCE(category, '') || ' ' ||
        COALESCE(subcategory, '') || ' ' ||
        COALESCE(array_to_string(tags, ' '), '')
    )
) STORED;

-- Add search column to events table
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS search_vector tsvector 
GENERATED ALWAYS AS (
    to_tsvector('english', 
        COALESCE(title, '') || ' ' || 
        COALESCE(description, '') || ' ' || 
        COALESCE(short_description, '') || ' ' ||
        COALESCE(location_name, '') || ' ' ||
        COALESCE(array_to_string(tags, ' '), '')
    )
) STORED;

-- Add search column to articles table
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS search_vector tsvector 
GENERATED ALWAYS AS (
    to_tsvector('english', 
        COALESCE(title, '') || ' ' || 
        COALESCE(excerpt, '') || ' ' || 
        COALESCE(content, '') || ' ' ||
        COALESCE(array_to_string(tags, ' '), '')
    )
) STORED;

-- -------------------------------------------------------------------------
-- FULL-TEXT SEARCH INDEXES
-- -------------------------------------------------------------------------

-- Create GIN indexes on the generated search columns
CREATE INDEX IF NOT EXISTS idx_businesses_search ON public.businesses USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_events_search ON public.events USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_articles_search ON public.articles USING gin(search_vector);

-- =========================================================================
-- END OF SEARCH COLUMN CREATION
-- =========================================================================
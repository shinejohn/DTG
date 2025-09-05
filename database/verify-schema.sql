-- =========================================================================
-- VERIFY SCHEMA CREATION
-- =========================================================================
-- Run this to verify all objects were created successfully

-- Check tables were created
SELECT 'Tables created:' as info, COUNT(*) as count 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';

-- Check main tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'communities', 'businesses', 'user_accounts', 'events', 
    'reviews', 'deals', 'user_points', 'achievements'
)
ORDER BY table_name;

-- Check indexes were created
SELECT 'Indexes created:' as info, COUNT(*) as count 
FROM pg_indexes 
WHERE schemaname = 'public';

-- Check functions were created
SELECT 'Functions created:' as info, COUNT(*) as count 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION';

-- List key functions
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION'
AND routine_name IN (
    'update_updated_at', 'update_business_rating', 
    'award_points', 'process_check_in', 'search_businesses'
)
ORDER BY routine_name;

-- Check triggers were created
SELECT 'Triggers created:' as info, COUNT(*) as count 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- Check enums were created
SELECT 'Enums created:' as info, COUNT(*) as count
FROM pg_type 
WHERE typnamespace = 'public'::regnamespace 
AND typtype = 'e';

-- List enum types
SELECT typname as enum_name
FROM pg_type 
WHERE typnamespace = 'public'::regnamespace 
AND typtype = 'e'
ORDER BY typname;

-- =========================================================================
-- END OF VERIFICATION
-- =========================================================================
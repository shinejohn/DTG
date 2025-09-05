# Supabase Database Deployment Order

## IMPORTANT: Execute these files in this EXACT order

### Step 1: Core Schema Setup
**File:** `/database/community-platform-schema.sql`

This creates:
- User types and enums
- Core tables: user_accounts, communities, businesses, organizations, venues
- Events and marketplace tables
- Basic RLS policies
- Initial seed data (5 communities)

### Step 2: UI-Required Tables (Phase 1)
**File:** `/database/migrations/phase-1-core-tables.sql`

This adds:
- business_categories and subcategories
- user_profiles for extended user data
- business_hours and special hours
- business_photos
- menu_items

### Step 3: Content & Review Tables (Phase 2)  
**File:** `/database/migrations/phase-2-content-tables.sql`

This adds:
- events with categories
- articles (blog posts)
- reviews with ratings
- deals and redemptions
- user_favorites and collections

### Step 4: Gamification & Community Features
**File:** `/database/gamification-schema.sql`

This adds:
- User points and levels system
- Achievements and badges
- Check-ins tracking
- Leaderboards (cached for performance)
- Challenges system
- Referral tracking
- Deal redemption tracking
- Notification system

### Step 5: SSR Optimizations 
**File:** `/database/ssr-optimized-schema.sql`

This adds:
- Public views for anonymous access
- Materialized views for performance
- Updated RLS policies for anon role
- SSR-specific functions
- Homepage data aggregation

### Step 6: Seed Data (Optional)
**File:** `/database/seed-data/phase-1-seed.sql`

This adds:
- Sample businesses
- Sample events
- Sample users (for testing)

## How to Deploy to Supabase

1. **In Supabase Dashboard:**
   - Go to SQL Editor
   - Click "New query"

2. **Copy and paste in this EXACT order:**
   - First: `community-platform-schema.sql` - Run it
   - Second: `migrations/phase-1-core-tables.sql` - Run it
   - Third: `migrations/phase-2-content-tables.sql` - Run it
   - Fourth: `gamification-schema.sql` - Run it
   - Fifth: `ssr-optimized-schema.sql` - Run it
   - Sixth (optional): `seed-data/phase-1-seed.sql` - Run it

3. **Verify Installation:**
   ```sql
   -- Check tables exist
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public'
   ORDER BY table_name;
   
   -- Check views exist
   SELECT viewname 
   FROM pg_views 
   WHERE schemaname = 'public';
   ```

## What Each File Does

### community-platform-schema.sql
- Creates all base tables for the B2C platform
- Sets up user accounts (not using MakerKit's complex structure)
- Creates community-based structure
- Enables RLS for security

### ssr-optimized-schema.sql  
- Creates public views that work without authentication
- Optimizes for React Router 7 SSR
- Adds functions for single-query page loads
- Enables anonymous access for public content

## Environment Variables Needed

After deployment, get these from Supabase:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key (keep secret!)
```

## Common Issues

1. **"relation does not exist" error**
   - You ran files out of order
   - Solution: Run community-platform-schema.sql first

2. **"permission denied" error**
   - RLS policies not set correctly
   - Solution: Check that ssr-optimized-schema.sql ran successfully

3. **Can't see data anonymously**
   - Anon role permissions not granted
   - Solution: Ensure ssr-optimized-schema.sql executed completely
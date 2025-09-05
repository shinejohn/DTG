# Database Setup Sequence

## Prerequisites
The Magic Patterns integration requires the MakerKit foundation tables to exist first.

## Setup Order

### Step 1: MakerKit Foundation Setup
Run the MakerKit database setup first:

```bash
# Start local Supabase
pnpm supabase:web:start

# Reset and apply MakerKit schemas
pnpm supabase:web:reset

# Generate TypeScript types
pnpm supabase:web:typegen
```

This creates the required foundation tables:
- `auth.users` (Supabase auth)
- `public.accounts` (MakerKit accounts)
- `public.accounts_memberships`
- `public.roles` and `public.role_permissions`
- Other MakerKit core tables

### Step 2: Magic Patterns Extensions
After MakerKit setup is complete, run our phases:

```bash
# Phase 1: Core tables (users, businesses, categories)
psql -f database/migrations/phase-1-core-tables.sql

# Phase 2: Content tables (events, news, deals, reviews)  
psql -f database/migrations/phase-2-content-tables.sql

# Phase 3: Engagement tables (rewards, achievements, loyalty)
psql -f database/migrations/phase-3-engagement-tables.sql

# Phase 4: Analytics and reporting
psql -f database/migrations/phase-4-analytics-tables.sql

# Phase 5: Advanced features
psql -f database/migrations/phase-5-advanced-tables.sql
```

### Step 3: Seed Data
Load seed data after all tables are created:

```bash
# Load seed data for each phase
psql -f database/seed-data/phase-1-seed.sql
psql -f database/seed-data/phase-2-seed.sql
# ... etc
```

## Dependencies

Our schema extends MakerKit's foundation:

```
MakerKit Foundation Tables:
├── auth.users (Supabase)
├── public.accounts (MakerKit)
├── public.accounts_memberships
├── public.roles
└── public.role_permissions

↓ Extends to ↓

Magic Patterns Tables:
├── public.user_profiles (extends auth.users)
├── public.businesses (links to accounts)
├── public.business_categories
├── public.events
├── public.articles
├── public.reviews
├── public.deals
└── ... (and more)
```

## Error Resolution

If you see "relation does not exist" errors:
1. Ensure MakerKit setup completed successfully
2. Check that Supabase is running locally
3. Verify the proper sequence was followed
4. Check the logs for any MakerKit migration failures
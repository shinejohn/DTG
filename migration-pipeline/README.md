# Mock Data Purge & React Router 7 Migration Pipeline

## Overview
Assembly-line process to systematically convert Magic Patterns files to clean React Router 7 code.

## Directory Structure
```
/migration-pipeline/
  /nomock/          # Stage 1: Mock data removed
    /pages/
    /components/
  /staging/         # Stage 2: React Router 7 converted
    /pages/
    /components/
  /validated/       # Stage 3: Quality checked
    /pages/
    /components/
  /logs/            # Process logs
  /scripts/         # Pipeline scripts
```

## Pipeline Stages

### Stage 1: Mock Data Removal
- Input: `/magic/src/**/*.tsx`
- Process: Remove all mock data constants
- Output: `/nomock/**/*.tsx`
- Validation: No `const mock*`, no hardcoded data

### Stage 2: React Router 7 Conversion
- Input: `/nomock/**/*.tsx`
- Process: Convert to RR7 patterns
  - Replace `useState` for data with `useLoaderData`
  - Remove data fetching from components
  - Add proper TypeScript types
  - Update imports
- Output: `/staging/**/*.tsx`

### Stage 3: Quality Validation
- Input: `/staging/**/*.tsx`
- Process: Automated validation with fix capabilities
- Script: `node scripts/validate-rr7-conversion.js [file] --fix`
- Checks:
  - ✅ Correct import paths (Route types, Supabase client)
  - ✅ Database schema compliance (table/column names)
  - ✅ Required exports (loader, default component)
  - ✅ No console statements in production
  - ✅ Proper error handling in loaders
  - ✅ Headers returned from Supabase
  - ✅ TypeScript types correct
  - ✅ No mock data remains
- Auto-fixes:
  - Import path corrections
  - Table name mappings
  - Console statement removal
  - TypeScript extension removal
- Output: `/validated/**/*.tsx`

### Stage 4: Route Integration
- Input: `/validated/**/*.tsx`
- Process: Create route files with loaders
- Output: `/app/routes/**/*.tsx`

## Conversion Checklist

### Mock Data Removal
- [ ] Remove all `const mock*` declarations
- [ ] Remove hardcoded arrays of data
- [ ] Remove placeholder image URLs
- [ ] Remove fake user data
- [ ] Remove sample text content

### React Router 7 Conversion
- [ ] Add route exports (`loader`, `action`)
- [ ] Replace `useState` for data with `useLoaderData`
- [ ] Move data fetching to loaders
- [ ] Update error handling
- [ ] Add loading states
- [ ] Update TypeScript types

### Quality Checks
- [ ] No references to mock data
- [ ] No client-side data fetching
- [ ] Proper error boundaries
- [ ] Type safety maintained
- [ ] Build passes

## Process Tracking

### Files Processed
- [ ] Home.tsx
- [ ] Business pages (12 files)
- [ ] User pages (8 files)
- [ ] Admin pages (6 files)
- [ ] Components (40+ files)

### Status Key
- 🔴 Not Started
- 🟡 In Progress
- 🟢 Complete
- ⚠️ Issues Found

## Running the Pipeline

```bash
# Stage 1: Remove mock data
npm run pipeline:remove-mock [file]

# Stage 2: Convert to RR7
npm run pipeline:convert-rr7 [file]

# Stage 3: Validate (with optional auto-fix)
node migration-pipeline/scripts/validate-rr7-conversion.js [file]
# or with auto-fix:
node migration-pipeline/scripts/validate-rr7-conversion.js [file] --fix

# Stage 4: Create route
npm run pipeline:create-route [file]

# Run full pipeline on a file
npm run pipeline:full [file]

# Check status
npm run pipeline:status
```

## Common Issues & Auto-fixes

The validation script automatically detects and can fix:

1. **Import Path Issues**
   - `./+types/brand-preview` → `./+types/route`
   - `@/lib/supabase/server.ts` → `@kit/supabase/server-client`

2. **Database Schema Mismatches**
   - `user_accounts` → `accounts`
   - `display_name` → `name`
   - `avatar_url` → `picture_url`

3. **Code Quality**
   - Removes console.log/error statements
   - Removes .ts extensions from imports
   - Ensures proper exports

4. **Warnings (Manual Review)**
   - Missing ErrorBoundary export
   - Missing error handling in loaders
   - Incorrect join syntax (!table_name)
# React Router 7 Conversion Checklist v2
## Enhanced with Automated Validation

This checklist incorporates lessons learned from BrandPreview.tsx conversion and includes automated validation steps.

## Pre-Conversion Setup

### 1. Verify Project Structure
- [ ] Confirm Supabase database schema matches expected tables/columns
- [ ] Verify @kit/supabase package is properly configured
- [ ] Check that React Router 7 is installed and configured
- [ ] Ensure TypeScript types are generated from Supabase

### 2. Database Schema Mapping
Create a mapping document for your specific project:
```typescript
// schema-mappings.ts
export const TABLE_MAPPINGS = {
  // Magic Patterns → Actual Database
  'user_accounts': 'accounts',
  'businesses': 'businesses',
  'reviews': 'reviews',
  'events': 'events',
  'articles': 'articles'
};

export const COLUMN_MAPPINGS = {
  // Common column name differences
  'display_name': 'name',
  'avatar_url': 'picture_url',
  'average_rating': 'rating',
  'review_count': 'reviews_count',
  'profile_image_url': 'picture_url',
  'featured_image_url': 'image_url'
};
```

## Conversion Process

### Stage 1: Mock Data Removal
- [ ] Identify all mock data declarations (const mock*, MOCK_*, fake*, dummy*)
- [ ] Remove mock data objects and arrays
- [ ] Replace hardcoded image URLs with database fields or placeholders
- [ ] Add TODO comments where data will come from loader

### Stage 2: React Router 7 Structure

#### A. Imports (CRITICAL - Most Common Issues)
```typescript
// ✅ CORRECT imports
import type { Route } from './+types/route';  // NOT brand-specific!
import { json, useLoaderData, Link, useNavigate } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';  // NO .ts extension!

// ❌ WRONG imports to avoid
import type { Route } from './+types/brand-preview';  // Component-specific types don't exist
import { getSupabaseServerClient } from '@/lib/supabase/server.ts';  // Wrong path + .ts
```

#### B. Loader Function
```typescript
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    // Database queries here
    const { data, error } = await supabase
      .from('accounts')  // Use correct table name!
      .select(`
        id,
        name,  // Use correct column names!
        picture_url
      `);
    
    if (error) {
      // Log to monitoring service, not console!
      // logger.error('Failed to fetch data', { error });
    }
    
    // ALWAYS return headers!
    return json({ data: data || [] }, { headers });
  } catch (error) {
    // Always have fallback data
    return json({ data: [] }, { headers });
  }
}
```

#### C. Component Structure
```typescript
export default function ComponentName({ loaderData }: Route.ComponentProps) {
  // Option 1: Direct props (recommended)
  const { data } = loaderData;
  
  // Option 2: Hook (if needed in nested components)
  const { data } = useLoaderData<typeof loader>();
  
  // Component logic...
}
```

#### D. Error Boundary (Recommended)
```typescript
export function ErrorBoundary() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1>Error</h1>
      <p>{error?.message || 'Something went wrong'}</p>
    </div>
  );
}
```

### Stage 3: Validation (NEW - Automated!)

Run the validation script after conversion:
```bash
node migration-pipeline/scripts/validate-rr7-conversion.js staging/components/YourComponent.tsx --fix
```

The script will:
1. Check and fix import paths
2. Identify database schema issues
3. Remove console statements
4. Validate required exports
5. Generate a report

### Stage 4: Database Query Updates

#### Common Query Patterns
```typescript
// ❌ WRONG - Magic Patterns style
const { data } = await supabase
  .from('user_accounts')
  .select('display_name, avatar_url');

// ✅ CORRECT - Actual schema
const { data } = await supabase
  .from('accounts')
  .select('name, picture_url');
```

#### Join Syntax
```typescript
// ❌ WRONG - Old Supabase syntax
.select(`
  *,
  user:user_accounts!user_id (*)
`)

// ✅ CORRECT - Current syntax
.select(`
  *,
  user:accounts(*)
`)
.eq('user.id', userId)
```

## Common Pitfalls & Solutions

### 1. Import Path Confusion
**Problem**: Using component-specific type paths
**Solution**: Always use `./+types/route` for Route types

### 2. Missing Headers in Response
**Problem**: Forgetting to return headers from loader
**Solution**: Always return `json(data, { headers })`

### 3. Console Statements
**Problem**: Using console.log/error in production
**Solution**: Use proper logging service or remove

### 4. Database Schema Mismatches
**Problem**: Using mock data column names
**Solution**: Verify actual database schema first

### 5. Missing Error Handling
**Problem**: No try-catch in loader
**Solution**: Always wrap loader logic in try-catch

### 6. Hardcoded Images
**Problem**: Unsplash/placeholder URLs in code
**Solution**: Use database fields or public folder images

## Validation Checklist

Before considering a file complete, verify:

### Automated Checks (via script)
- [ ] All imports are correct
- [ ] No console statements remain
- [ ] Required exports present (loader, default)
- [ ] Database table names are correct
- [ ] No .ts extensions in imports

### Manual Checks
- [ ] Error boundary implemented (recommended)
- [ ] Proper TypeScript types throughout
- [ ] Loading states handled appropriately
- [ ] Empty data states have fallback UI
- [ ] All TODOs from mock removal addressed
- [ ] Component renders without errors
- [ ] Data loads successfully from Supabase

## Testing Process

1. **Build Test**
   ```bash
   npm run typecheck
   npm run build
   ```

2. **Runtime Test**
   - Start dev server
   - Navigate to component route
   - Verify data loads
   - Check browser console for errors
   - Test error states (network offline)

3. **Edge Cases**
   - Empty data response
   - Failed queries
   - Missing route params
   - Unauthorized access

## Migration Script Usage

### Full Pipeline
```bash
# 1. Remove mock data
node scripts/remove-mock-data.js magic/src/components/Example.tsx

# 2. Convert to RR7 (manual or scripted)
# ... conversion process ...

# 3. Validate and fix
node migration-pipeline/scripts/validate-rr7-conversion.js staging/components/Example.tsx --fix

# 4. Final validation
node migration-pipeline/scripts/validate-rr7-conversion.js staging/components/Example.tsx

# 5. Move to validated folder if passed
mv staging/components/Example.tsx validated/components/
```

## Success Criteria

A file is ready for production when:
1. ✅ Validation script passes with no errors
2. ✅ TypeScript compilation succeeds
3. ✅ Component renders without console errors
4. ✅ Data loads from Supabase successfully
5. ✅ Error states are handled gracefully
6. ✅ No mock data or hardcoded content remains

## Appendix: Quick Reference

### Import Template
```typescript
import React from 'react';
import type { Route } from './+types/route';
import { json, useLoaderData, Link, useNavigate } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

// Your other imports...
```

### Loader Template
```typescript
export async function loader({ params, request }: Route.LoaderArgs) {
  const { supabase, headers } = getSupabaseServerClient(request);
  
  try {
    // Your queries here
    
    return json({ /* your data */ }, { headers });
  } catch (error) {
    // Handle error
    return json({ /* fallback data */ }, { headers });
  }
}
```

### Component Template
```typescript
export default function ComponentName({ loaderData }: Route.ComponentProps) {
  const { /* destructure your data */ } = loaderData;
  
  return (
    // Your JSX
  );
}
```

This enhanced checklist should prevent the issues encountered with BrandPreview.tsx and streamline future conversions.
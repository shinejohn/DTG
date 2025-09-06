# Magic Patterns + MakerKit Integration Plan

## Goal
Integrate Magic Patterns UI (Downtown Guide) with MakerKit backend infrastructure while preserving the Magic Patterns look and feel.

## Current Architecture

### Magic Patterns (Frontend - Keep)
- **Location**: `/apps/web/app/components/dtg/*`
- **Pages**: `/apps/web/app/routes/pages/*`
- **Styles**: Custom Tailwind CSS components
- **Features**: Downtown Guide specific UI/UX

### MakerKit (Backend - Keep)
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Billing**: Stripe/LemonSqueezy integration
- **API Routes**: `/api/*` endpoints
- **Infrastructure**: Team accounts, permissions, subscriptions

### MakerKit (Frontend - Replace)
- Marketing pages
- Dashboard UI
- Account settings UI
- All MakerKit styled components

## Integration Strategy

### Phase 1: Route Override ✅
Replace MakerKit's default routes with Magic Patterns routes:

```typescript
// apps/web/app/routes.ts
export default [
  // Keep API routes (MakerKit backend)
  ...apiRoutes,
  
  // Replace with DTG routes (Magic Patterns UI)
  layout('routes/pages/layout.tsx', [
    index('routes/pages/Home.tsx'), // DTG Home instead of marketing
    // All DTG routes...
  ]),
  
  // Keep auth routes but style with DTG components
  authLayout, // Style these with DTG UI
  
  // Remove MakerKit marketing routes
  // Remove MakerKit dashboard routes
] satisfies RouteConfig;
```

### Phase 2: Component Integration

1. **Replace MakerKit UI components with DTG components**:
   - Use DTG Button, Card, Modal, etc. everywhere
   - Remove dependencies on @kit/ui components
   - Keep @kit/auth, @kit/supabase for backend

2. **Update imports in auth pages**:
   ```typescript
   // Before
   import { Button } from '@kit/ui/button';
   
   // After
   import { Button } from '@/components/dtg/ui/Button';
   ```

3. **Style auth pages with DTG design**:
   - Login/Register pages use DTG components
   - Account settings use DTG layouts
   - Error pages use DTG styling

### Phase 3: Backend Integration

1. **Connect DTG features to Supabase**:
   - Businesses → Supabase tables
   - Events → Supabase tables
   - Reviews → Supabase tables
   - Users → Existing auth.users

2. **Add RLS policies for DTG tables**:
   ```sql
   -- Example for businesses table
   CREATE POLICY "Public can view businesses" 
   ON businesses FOR SELECT 
   USING (true);
   
   CREATE POLICY "Business owners can update" 
   ON businesses FOR UPDATE 
   USING (auth.uid() = owner_id);
   ```

3. **Integrate billing for business accounts**:
   - Premium listings
   - Featured placements
   - Analytics access

### Phase 4: Feature Mapping

| Magic Patterns Feature | MakerKit Backend |
|----------------------|------------------|
| User Registration | Supabase Auth |
| Business Profiles | Custom tables + Storage |
| Reviews & Ratings | Custom tables + RLS |
| Events | Custom tables |
| Deals/Coupons | Custom tables |
| Search | Supabase full-text search |
| Analytics | Custom tables + Charts |
| Notifications | @kit/notifications |
| Billing | @kit/billing |

## Implementation Steps

### 1. Update Root Route Configuration
```typescript
// Make DTG home the default
const dtgLayout = layout('routes/pages/layout.tsx', [
  index('routes/pages/Home.tsx'), // This becomes '/'
  // ... all DTG routes
]);

export default [
  // DTG is primary
  dtgLayout,
  
  // Auth with DTG styling
  authLayout,
  
  // API routes unchanged
  ...apiRoutes,
  
  // Admin if needed
  adminLayout,
] satisfies RouteConfig;
```

### 2. Replace Component Imports
Create a migration script to update all imports:
```bash
# Replace @kit/ui imports with DTG components
find . -name "*.tsx" -exec sed -i '' 's/@kit\/ui/\@\/components\/dtg\/ui/g' {} +
```

### 3. Database Schema Updates
Add DTG-specific tables while keeping MakerKit structure:
```sql
-- Keep MakerKit tables
-- accounts, subscriptions, etc.

-- Add DTG tables
CREATE TABLE businesses (
  id UUID PRIMARY KEY,
  owner_id UUID REFERENCES auth.users,
  name TEXT,
  category TEXT,
  -- DTG specific fields
);
```

### 4. Environment Configuration
Update feature flags to disable MakerKit UI features:
```env
# Disable MakerKit marketing
VITE_ENABLE_MARKETING_PAGES=false
# Enable DTG features
VITE_ENABLE_DTG_FEATURES=true
```

## Benefits

1. **Preserved UI/UX**: Magic Patterns design remains intact
2. **Enterprise Backend**: MakerKit's robust infrastructure
3. **Rapid Development**: No need to build auth/billing/teams
4. **Scalability**: Supabase + MakerKit proven architecture
5. **Maintainability**: Clear separation of concerns

## Next Steps

1. Backup current state
2. Update routes.ts to prioritize DTG routes
3. Replace component imports systematically
4. Test auth flows with DTG UI
5. Implement DTG database schema
6. Connect DTG features to backend
7. Remove unused MakerKit UI code
# Downtown Guide Code Improvement Plan

## Overview
This document outlines systematic improvements to enhance code quality, performance, and maintainability.

## 1. Component Export Standardization ✅ High Priority

### Current Issues:
- Inconsistent export patterns (mix of default and named exports)
- Some components use both patterns unnecessarily
- Import confusion leading to build errors

### Improvements:
```typescript
// Standardize to named exports for all components
export function ComponentName() { }
// Keep default export for backward compatibility where needed
export default ComponentName;
```

### Files to Update:
- `/ui/Alert.tsx` - Has both patterns
- `/ui/Avatar.tsx` - Has both patterns  
- `/ui/Badge.tsx` - Already fixed
- `/ui/Button.tsx` - Convert to named export
- `/ui/Card.tsx` - Convert to named export
- `/ui/EmptyState.tsx` - Has both patterns
- `/ui/Input.tsx` - Already uses named export
- `/ui/Modal.tsx` - Convert to named export
- `/ui/Pagination.tsx` - Has both patterns
- `/ui/Rating.tsx` - Has both patterns
- `/ui/Skeleton.tsx` - Has both patterns
- `/ui/Spinner.tsx` - Convert to named export
- `/ui/Tabs.tsx` - Convert to named export
- `/ui/Typography.tsx` - Convert to named export

## 2. TypeScript Type Safety ✅ High Priority

### Current Issues:
- Multiple `any` types found
- Missing type definitions for API responses
- Incomplete interface definitions

### Improvements:
```typescript
// Replace any with proper types
// Before:
const openCouponModal = (coupon: any) => { }

// After:
interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiresAt: Date;
}
const openCouponModal = (coupon: Coupon) => { }
```

### Files to Update:
- `/pages/Search.tsx` - Line 88: `item: any`
- `/pages/Leaderboards.tsx` - Lines 425, 445: `as any`
- `/pages/business/promotions.tsx` - Lines 136, 191: `as any`
- `/pages/profile/Rewards.tsx` - Line 38: `coupon: any`
- `/pages/business/loyalty.tsx` - Lines 951, 959: `as any`

## 3. Performance Optimization 🚀 Medium Priority

### Current Issues:
- No lazy loading for routes
- Large bundle sizes
- No code splitting

### Improvements:
```typescript
// Implement lazy loading for routes
const HomePage = lazy(() => import('./pages/Home'));
const SearchPage = lazy(() => import('./pages/Search'));

// Add Suspense boundaries
<Suspense fallback={<Loading />}>
  <Routes />
</Suspense>
```

### Routes to Optimize:
- Business dashboard routes
- Admin routes
- Profile routes
- Heavy component pages (Events, Deals, etc.)

## 4. Search Enhancement 🔍 High Priority

### Current Issues:
- Basic search implementation
- No full-text search
- Missing video search capability
- No search suggestions

### Improvements:
```typescript
// Add comprehensive search interface
interface SearchFilters {
  query: string;
  category: string;
  location?: string;
  priceRange?: [number, number];
  rating?: number;
  contentType?: 'all' | 'business' | 'event' | 'deal' | 'video';
}

// Implement search suggestions
const useSearchSuggestions = (query: string) => {
  // Debounced search suggestions
};
```

## 5. Error Handling 🛡️ Medium Priority

### Current Issues:
- Limited error boundaries
- No fallback UI for component errors
- Missing error logging

### Improvements:
- Add error boundaries to all route components
- Implement error logging service
- Create user-friendly error pages

## 6. Code Organization 📁 Low Priority

### Current Issues:
- Some large component files
- Mixed concerns in some components
- Duplicate code patterns

### Improvements:
- Extract custom hooks
- Create shared utility functions
- Split large components

## Implementation Priority:

1. **Phase 1 (Immediate)**:
   - Component export standardization
   - TypeScript type safety
   - Search functionality enhancement

2. **Phase 2 (Next Sprint)**:
   - Performance optimization
   - Error handling improvements

3. **Phase 3 (Future)**:
   - Code organization
   - Testing coverage
   - Documentation

## Validation Checklist:
- [ ] All builds pass without errors
- [ ] Type checking passes (`pnpm typecheck`)
- [ ] Linting passes (`pnpm lint`)
- [ ] No performance regressions
- [ ] Maintains backward compatibility
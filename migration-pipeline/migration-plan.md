# React Router 7 Migration Plan - Sequential Quality-First Approach

## 🎯 Scope Summary
- **9 mock declarations** across 49 files
- **701 lines of mock data** to remove
- **386 hardcoded images** to replace
- **130 total files** in Magic Patterns

## 📋 Migration Phases

### Phase 1: Infrastructure Setup (Day 1)
1. ✅ Mock data analysis complete
2. [ ] Generate Supabase TypeScript types
3. [ ] Create server/client Supabase configurations
4. [ ] Set up repository pattern structure
5. [ ] Create base React Router 7 app structure

### Phase 2: Processing Order (Days 2-5)

#### Batch 1: Shared Components (No mock data, but has images)
These have hardcoded images but no mock declarations - easier to start with:
- [ ] BrandPreview.tsx (21 images)
- [ ] CommunityHero.tsx (10 images)
- [ ] CommunityActivity.tsx (8 images)
- [ ] BusinessCard.tsx
- [ ] ReviewCard.tsx

#### Batch 2: Core Pages with Mock Data
Process in order of complexity:
1. [ ] Explore.tsx (1 mock, 33 lines)
2. [ ] Search.tsx (1 mock, 85 lines)
3. [ ] security/TwoFactorAuth.tsx (2 mocks, 6 lines)

#### Batch 3: Business Pages (Biggest challenges)
1. [ ] business/[slug].tsx (1 mock, 166 lines)
2. [ ] business/homepage.tsx (1 mock, 183 lines)
3. [ ] business/dashboard/LoyaltyMembers.tsx (2 mocks, 93 lines)

#### Batch 4: Profile & Rewards
1. [ ] profile/Rewards.tsx (1 mock, 135 lines)

### Phase 3: Quality Gates (Continuous)
After each file:
1. Mock data completely removed ✓
2. TypeScript compilation passes ✓
3. React Router 7 patterns implemented ✓
4. Real Supabase data integrated ✓
5. Component renders without errors ✓

## 🔧 Technical Approach

### For Each File:
```
1. Create backup snapshot
2. Remove mock data declarations
3. Add React Router 7 imports and types
4. Create loader function with Supabase queries
5. Update component to use loaderData
6. Test with real data
7. Validate all quality gates
8. Commit if successful
```

### Mock Data Patterns Found:
- `mockBusiness` - Full business profiles with hours, features, images
- `mockLoyaltyMembers` - Customer data with points/status
- `mockProgramMetrics` - Dashboard statistics
- `mockUserRewards` - Achievements and points
- `mockResults` - Search/explore results
- `mockQRCode` / `mockSecret` - 2FA setup data

## 📊 Success Metrics
- [ ] 0 mock declarations remaining
- [ ] 0 hardcoded image URLs
- [ ] 100% TypeScript compilation
- [ ] All components using React Router 7 loaders
- [ ] Real data from Supabase
- [ ] No console errors

## 🚨 Risk Mitigation
1. **Git snapshots** before each file change
2. **Sequential processing** - one file at a time
3. **Test immediately** after each change
4. **Stop on any error** and reassess
5. **Document patterns** discovered during migration

## 📅 Timeline
- Day 1: Infrastructure setup
- Day 2: Shared components (5 files)
- Day 3: Core pages (3 files)
- Day 4: Business pages (3 files)
- Day 5: Profile/Rewards & final validation

## 🍕 Pizza Party Criteria
- All mock data removed ✓
- All components migrated ✓
- Zero errors in console ✓
- Successfully deployed ✓
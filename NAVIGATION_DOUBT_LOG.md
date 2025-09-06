# DTG Navigation and Component Integration Doubt Log

## Overview
This document tracks uncertainties and changes made during the navigation and component integration verification process for the DTG (Downtown Guide) application.

## Format Guidelines
- **DOUBT ENTRY**: For items with <95% certainty
- **CHANGE MADE**: For confirmed fixes with ≥95% certainty

---

## Doubt Entries

### DOUBT ENTRY #1:
- **File**: /apps/web/app/components/dtg/FeaturedPlaces.tsx  
- **Issue**: Component uses hardcoded mock data for featured businesses
- **Current State**: Static array of 6 mock businesses with fake data
- **Suspected Solution**: Should receive data as props from parent component or use data loader
- **Reason for Doubt**: Real DTG app needs dynamic business data from database
- **Priority**: High (component is reusable and should not contain mock data)

### DOUBT ENTRY #2:
- **File**: /apps/web/app/components/dtg/TrendingNow.tsx
- **Issue**: Component uses hardcoded mock data for trending places
- **Current State**: Static array of 6 mock trending places
- **Suspected Solution**: Should receive data as props or use loader
- **Reason for Doubt**: Real app needs dynamic trending data from database
- **Priority**: High (trending data should be real-time)

### DOUBT ENTRY #3:
- **File**: /apps/web/app/components/dtg/CommunityActivity.tsx
- **Issue**: Component uses hardcoded mock data for community activity
- **Current State**: Static array of mock reviews and check-ins
- **Suspected Solution**: Should fetch recent reviews/activity from database
- **Reason for Doubt**: Community activity should be real-time from database
- **Priority**: High (community activity is a key feature)

### DOUBT ENTRY #4:
- **File**: /apps/web/app/components/dtg/NewsAndEvents.tsx
- **Issue**: Component uses hardcoded mock data for news and events
- **Current State**: Static array of 4 mock news/event items
- **Suspected Solution**: Should fetch from articles and events tables
- **Reason for Doubt**: News and events should be dynamic from database
- **Priority**: High (content must be current)

### DOUBT ENTRY #5:
- **File**: /apps/web/app/routes/pages/Explore.tsx
- **Issue**: Page uses mock CommunityService and mock results data
- **Current State**: Hardcoded mock business results and mock community data
- **Suspected Solution**: Should load communities and businesses from database
- **Reason for Doubt**: Real app needs dynamic data from Supabase
- **Priority**: High (core functionality page)

### DOUBT ENTRY #6:
- **File**: /apps/web/app/routes/pages/Search.tsx
- **Issue**: Missing loader function caused page to crash
- **Current State**: Now has basic loader but returns empty results
- **Suspected Solution**: Should implement actual search functionality with database
- **Reason for Doubt**: Search is non-functional without database integration
- **Priority**: Critical (search is a core feature)

## Changes Made

### CHANGE MADE #1:
- **File**: /apps/web/app/routes/marketing/index.tsx
- **Type**: Navigation
- **Problem**: Homepage has broken navigation links:
  1. "Browse Businesses" link points to `/businesses` which doesn't exist
  2. Quick Links cards are not actual links (just divs with hover effects)
  3. Featured business "Learn More" links all point to "#"
  4. Search bar doesn't have functionality
- **Solution**: 
  1. Change `/businesses` to `/dtg/explore`
  2. Make Quick Links navigate to appropriate DTG routes
  3. Update business links to use proper business detail routes
  4. Add navigation to search page
- **Confidence**: 100% - Routes are clearly defined in routes.ts

### CHANGE MADE #2:
- **File**: /apps/web/app/routes/marketing/index.tsx
- **Type**: Data Integration
- **Problem**: Homepage was displaying mock business data that I mistakenly added
- **Solution**: Removed all mock data, will implement proper data loader
- **Confidence**: 100% - Confirmed businesses table exists in database schema

### CHANGE MADE #3:
- **File**: /apps/web/app/routes/marketing/index.tsx
- **Type**: Data Integration
- **Problem**: Featured businesses section had no data loader
- **Solution**: 
  1. Added loader function to fetch featured businesses from database
  2. Query joins business_categories for category name
  3. Filters by is_featured=true and status=active
  4. Updated component to use loader data with proper fallbacks
  5. Uses actual database fields (slug, cover_image_url, average_rating, etc.)
- **Confidence**: 100% - Database schema matches query structure

### CHANGE MADE #4:
- **File**: /apps/web/app/routes/marketing/index.tsx
- **Type**: Navigation
- **Problem**: Search bar was not functional
- **Solution**: 
  1. Added form wrapper with onSubmit handler
  2. Named input field for form data extraction
  3. Handler navigates to /dtg/search with query parameter
- **Confidence**: 100% - Search route exists in routes.ts

### CHANGE MADE #5:
- **File**: /apps/web/app/components/dtg/Header.tsx
- **Type**: Navigation
- **Problem**: Header navigation links missing `/dtg` prefix and incorrect auth routes:
  1. Desktop nav: `/explore`, `/events`, `/trending`, `/register`, `/rewards`, `/deals`
  2. Mobile nav: same issues
  3. Logo link points to `/` instead of `/dtg`
  4. Profile link points to non-existent `/profile` route
  5. Notifications link missing `/dtg` prefix
- **Solution**: 
  1. Added `/dtg` prefix to all DTG routes: explore, events, trending, rewards, deals
  2. Changed `/register` to `/auth/sign-up` (proper auth route)
  3. Changed logo link from `/` to `/dtg`
  4. Changed profile link from `/profile` to `/home` (user dashboard)
  5. Changed notifications link from `/notifications` to `/dtg/notifications`
  6. Applied same fixes to both desktop and mobile navigation
- **Confidence**: 100% - Routes match those defined in routes.ts

### CHANGE MADE #6:
- **File**: /apps/web/app/components/dtg/FeaturedPlaces.tsx
- **Type**: Navigation
- **Problem**: Business detail links missing `/dtg` prefix
- **Solution**: Changed `/business/${business.id}` to `/dtg/business/${business.id}`
- **Confidence**: 100% - DTG routes require /dtg prefix

### CHANGE MADE #7:
- **File**: /apps/web/app/routes/pages/Home.tsx
- **Type**: Navigation
- **Problem**: Search form not functional - only logging to console
- **Solution**: Updated handleSearch to navigate to `/dtg/search` with query parameters
- **Confidence**: 100% - Search route exists in routes.ts

### CHANGE MADE #8:
- **File**: /apps/web/app/routes/pages/Home.tsx
- **Type**: Data Integration
- **Problem**: Page using mock CommunityService instead of database data
- **Solution**: 
  1. Added loader function to fetch communities from database
  2. Updated component to use loader data
  3. Removed dependency on mock CommunityService
- **Confidence**: 100% - Communities table exists in database schema

### CHANGE MADE #9:
- **File**: /apps/web/app/components/dtg/CategorySection.tsx
- **Type**: Navigation
- **Problem**: Category links pointing to `/search` instead of DTG routes
- **Solution**: Changed `/search?category=` to `/dtg/explore?category=`
- **Confidence**: 100% - Explore page is the correct DTG route for browsing

### CHANGE MADE #10:
- **File**: /apps/web/app/components/dtg/TrendingNow.tsx
- **Type**: Navigation
- **Problem**: Business detail links missing `/dtg` prefix
- **Solution**: Changed `/business/${place.id}` to `/dtg/business/${place.id}`
- **Confidence**: 100% - All DTG routes require /dtg prefix

### CHANGE MADE #11:
- **File**: /apps/web/app/components/dtg/CommunityActivity.tsx
- **Type**: Navigation
- **Problem**: Multiple navigation issues with missing `/dtg` prefix
- **Solution**: 
  1. Profile links: `/profile/` → `/dtg/profile/`
  2. Business links: `/business/` → `/dtg/business/`
  3. View More link: `/community` → `/dtg` (no community route exists)
- **Confidence**: 100% - Routes match DTG route structure

### CHANGE MADE #12:
- **File**: /apps/web/app/components/dtg/NewsAndEvents.tsx
- **Type**: Navigation
- **Problem**: All news/events links missing `/dtg` prefix
- **Solution**: 
  1. News item URLs: `/news/` → `/dtg/news/`
  2. Event item URLs: `/events/` → `/dtg/events/`
  3. View All links: `/news` and `/events` → `/dtg/news` and `/dtg/events`
- **Confidence**: 100% - Routes exist in routes.ts

### CHANGE MADE #13:
- **File**: /apps/web/app/components/dtg/Footer.tsx
- **Type**: Navigation
- **Problem**: All footer links missing proper routing
- **Solution**: 
  1. Explore section: Added `/dtg` prefix to all links
  2. Account section: Changed to proper auth routes (`/auth/sign-in`, `/auth/sign-up`)
  3. Rewards/Settings: Changed to `/home/rewards` and `/home/settings`
  4. Legal links: Changed to actual routes (`/terms-of-service`, `/privacy-policy`, `/cookie-policy`)
  5. Company links: About → `/about`, Contact → `/contact` (still using `#` for Careers/Press)
- **Confidence**: 100% - Matched to existing routes in marketing layout

### CHANGE MADE #14:
- **File**: /apps/web/app/components/dtg/FloatingNavigation.tsx
- **Type**: Import/Navigation
- **Problem**: Missing Link import and all navigation routes incorrect
- **Solution**: 
  1. Added missing `import { Link } from 'react-router'`
  2. Fixed all main navigation: Added `/dtg` prefix
  3. Fixed rewards section: Routes to `/home/*` for user features
  4. Fixed business section: Added `/dtg/business/*` prefix  
  5. Fixed account section: Changed to proper auth routes
  6. Fixed admin section: Changed to `/admin/dtg/*` routes
- **Confidence**: 100% - All routes verified against routes.ts

### CHANGE MADE #15:
- **File**: /apps/web/app/routes/pages/Explore.tsx
- **Type**: Navigation
- **Problem**: Community selection navigates to `/` instead of DTG home
- **Solution**: Changed `navigate('/')` to `navigate('/dtg')`
- **Confidence**: 100% - DTG home is at /dtg

### CHANGE MADE #16:
- **File**: /apps/web/app/routes/pages/Explore.tsx
- **Type**: Navigation
- **Problem**: Business detail links missing `/dtg` prefix
- **Solution**: Changed `/business/${result.id}` to `/dtg/business/${result.id}`
- **Confidence**: 100% - All DTG routes require /dtg prefix

### CHANGE MADE #17:
- **File**: /apps/web/app/routes/pages/Search.tsx
- **Type**: Missing Functionality
- **Problem**: Page crashed due to missing loader function
- **Solution**: 
  1. Added loader function that reads query params
  2. Updated component to use URL search params properly
  3. Made search form update URL params on submit
- **Confidence**: 100% - Fixed crash, search form now functional (though results still need DB integration)

---

## Summary Statistics
- Total Doubts: 6
- Total Changes: 17
- Verification Started: 2025-09-06
- Last Updated: 2025-09-06
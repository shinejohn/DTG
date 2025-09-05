# Downtown Guide Database Schema Definition

Based on Magic Patterns UI analysis, this document defines the complete database schema for the downtown guide application.

## Core Entities Identified from UI Analysis

### Primary Entities
1. **Users** - User profiles, authentication, preferences
2. **Businesses** - Local business listings and profiles
3. **Categories** - Business categorization and hierarchy
4. **Events** - Community events and business events
5. **News & Articles** - Content management and publishing
6. **Reviews** - User reviews and ratings
7. **Deals & Coupons** - Promotional offers
8. **Rewards & Achievements** - Loyalty program and gamification
9. **Analytics** - Business metrics and user engagement
10. **Notifications** - System and user notifications

### Supporting Entities
- Photos/Media, Business Hours, Social Media Links
- User Sessions, Payment Methods, Subscriptions
- Search History, Favorites, User Preferences
- Integrations, API Keys, Webhooks

## Data Relationships Map

```
Users ──┐
        ├── Reviews ──→ Businesses
        ├── Favorites ──→ Businesses/Events/Deals
        ├── Achievements ──→ Rewards Program
        ├── User Sessions
        └── User Preferences

Businesses ──┐
             ├── Events
             ├── Deals/Coupons
             ├── Photos
             ├── Business Hours
             ├── Menu Items
             ├── Analytics
             └── Social Media

Categories ──→ Businesses (hierarchical)

Content ──┐
          ├── Articles/News
          ├── Event Listings
          └── SEO Content
```

## Implementation Phases

### Phase 1: Foundation (Core Tables)
- Users, Businesses, Categories
- Basic authentication and business listings

### Phase 2: Content & Engagement
- Events, News, Reviews, Deals
- User-generated content and interactions

### Phase 3: Loyalty & Gamification
- Rewards, Achievements, Loyalty Programs
- User engagement and retention features

### Phase 4: Analytics & Reporting
- Business analytics, user metrics
- Performance tracking and insights

### Phase 5: Advanced Features
- Integrations, API management
- Advanced search, recommendations, AI features
import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

const rootRoutes = [
  route('robots.txt', 'routes/robots/route.tsx'),
  route('sitemap.xml', 'routes/sitemap/route.tsx'),
  route('version', 'routes/version.ts'),
  route('healthcheck', 'routes/healthcheck.ts'),
  route('update-password', 'routes/update-password.tsx'),
  route('join', 'routes/join.tsx'),
];

const apiRoutes = [
  route('api/accounts', 'routes/api/accounts.ts'),
  route('api/billing/checkout', 'routes/api/billing/checkout.ts'),
  route('api/billing/webhook', 'routes/api/billing/webhook.ts'),
  route('api/db/webhook', 'routes/api/db/webhook.ts'),
  route('api/otp/send', 'routes/api/otp/send.ts'),
];

const marketingLayout = layout('routes/marketing/layout.tsx', [
  index('routes/marketing/index.tsx'),
  route('terms-of-service', 'routes/marketing/terms-of-service.tsx'),
  route('privacy-policy', 'routes/marketing/privacy-policy.tsx'),
  route('pricing', 'routes/marketing/pricing.tsx'),
  route('contact', 'routes/marketing/contact/index.tsx'),
  route('faq', 'routes/marketing/faq.tsx'),
  route('blog', 'routes/marketing/blog/index.tsx'),
  route('blog/:slug', 'routes/marketing/blog/$slug.tsx'),
  route('cookie-policy', 'routes/marketing/cookie-policy.tsx'),
  layout('routes/marketing/docs/layout.tsx', [
    route('docs', 'routes/marketing/docs/index.tsx'),
    route('docs/*', 'routes/marketing/docs/$slug.tsx'),
  ]),
]);

const authLayout = layout('routes/auth/layout.tsx', [
  route('auth/sign-in', 'routes/auth/dtg-sign-in.tsx'),
  route('auth/sign-up', 'routes/auth/dtg-sign-up.tsx'),
  route('auth/password-reset', 'routes/auth/dtg-password-reset.tsx'),
  route('auth/verify', 'routes/auth/verify.tsx'),
  route('auth/callback', 'routes/auth/callback.tsx'),
  route('auth/callback/error', 'routes/auth/callback-error.tsx'),
  route('auth/confirm', 'routes/auth/confirm.tsx'),
]);

const adminLayout = layout('routes/admin/layout.tsx', [
  route('admin', 'routes/admin/index.tsx'),
  route('admin/accounts', 'routes/admin/accounts/index.tsx'),
  route('admin/accounts/:account', 'routes/admin/accounts/$account.tsx'),
]);

const userAccountLayout = layout('routes/home/user/layout.tsx', [
  route('home', 'routes/home/user/index.tsx'),
  route('home/settings', 'routes/home/user/settings.tsx'),
  route('home/billing', 'routes/home/user/billing.tsx'),
  route('home/billing/return', 'routes/home/user/billing-return.tsx'),
]);

const teamAccountLayout = layout('routes/home/account/layout.tsx', [
  route('home/:account', 'routes/home/account/index.tsx'),
  route('home/:account/settings', 'routes/home/account/settings.tsx'),
  route('home/:account/members', 'routes/home/account/members.tsx'),
  route('home/:account/billing', 'routes/home/account/billing.tsx'),
  route(
    'home/:account/billing/return',
    'routes/home/account/billing-return.tsx',
  ),
]);


// Extended Auth Routes (DTG specific)
const extendedAuthLayout = layout('routes/auth/layout.tsx', [
  route('auth/sign-in', 'routes/auth/dtg-sign-in.tsx'),
  route('auth/sign-up', 'routes/auth/dtg-sign-up.tsx'),
  route('auth/password-reset', 'routes/auth/dtg-password-reset.tsx'),
  route('auth/verify', 'routes/auth/verify.tsx'),
  route('auth/callback', 'routes/auth/callback.tsx'),
  route('auth/callback/error', 'routes/auth/callback-error.tsx'),
  route('auth/confirm', 'routes/auth/confirm.tsx'),
]);

// Extended Admin Layout (DTG features)
const extendedAdminLayout = layout('routes/admin/layout.tsx', [
  route('admin', 'routes/admin/index.tsx'),
  route('admin/accounts', 'routes/admin/accounts/index.tsx'),
  route('admin/accounts/:account', 'routes/admin/accounts/$account.tsx'),
  
  // DTG Admin routes
  route('admin/dtg', 'routes/pages/admin/index.tsx'),
  route('admin/dtg/brand-config', 'routes/pages/admin/brand-config.tsx'),
  route('admin/dtg/moderation', 'routes/pages/admin/moderation.tsx'),
  route('admin/dtg/notifications', 'routes/pages/admin/notifications.tsx'),
]);

export default [
  // DTG (Magic Patterns) is now the primary UI
  layout('routes/pages/layout.tsx', [
    // Home page is DTG home, not MakerKit marketing
    index('routes/pages/Home.tsx'),
    
    // All DTG routes
    route('search', 'routes/pages/Search.tsx'),
    route('explore', 'routes/pages/Explore.tsx'),
    route('restaurants', 'routes/pages/Restaurants.tsx'),
    route('deals', 'routes/pages/Deals.tsx'),
    route('deals/:id', 'routes/pages/DealDetail.tsx'),
    route('events', 'routes/pages/Events.tsx'),
    route('events/:id', 'routes/pages/EventDetail.tsx'),
    route('news', 'routes/pages/News.tsx'),
    route('news/:id', 'routes/pages/NewsDetail.tsx'),
    route('trending', 'routes/pages/Trending.tsx'),
    route('favorites', 'routes/pages/Favorites.tsx'),
    route('pricing', 'routes/pages/Pricing.tsx'),
    route('settings', 'routes/pages/Settings.tsx'),
    
    // Business routes
    route('business/:slug', 'routes/pages/business/[slug].tsx'),
    route('business/analytics', 'routes/pages/business/analytics.tsx'),
    route('business/dashboard', 'routes/pages/business/dashboard.tsx'),
    route('business/coupons', 'routes/pages/business/coupons.tsx'),
    route('business/events', 'routes/pages/business/events.tsx'),
    route('business/homepage', 'routes/pages/business/homepage.tsx'),
    route('business/integrations', 'routes/pages/business/integrations.tsx'),
    route('business/loyalty', 'routes/pages/business/loyalty.tsx'),
    route('business/promotions', 'routes/pages/business/promotions.tsx'),
    route('business/profile/edit', 'routes/pages/business/profile/edit.tsx'),
    
    // Profile routes
    route('profile/:username', 'routes/pages/profile/[username].tsx'),
    route('profile/edit', 'routes/pages/profile/edit.tsx'),
    route('profile/rewards', 'routes/pages/profile/Rewards.tsx'),
    
    // Review routes
    route('review/:businessId', 'routes/pages/review/[businessId].tsx'),
  ]),
  
  // Auth routes with DTG styling (keep for backend auth)
  authLayout,
  
  // User account routes (integrated with DTG)
  layout('routes/home/user/layout.tsx', [
    route('account', 'routes/home/user/index.tsx'),
    route('account/settings', 'routes/home/user/settings.tsx'),
    route('account/billing', 'routes/home/user/billing.tsx'),
    route('account/achievements', 'routes/pages/Achievements.tsx'),
    route('account/challenges', 'routes/pages/Challenges.tsx'),
    route('account/rewards', 'routes/pages/Rewards.tsx'),
    route('account/leaderboards', 'routes/pages/Leaderboards.tsx'),
    route('account/referrals', 'routes/pages/Referrals.tsx'),
  ]),
  
  // Admin routes (if needed)
  extendedAdminLayout,
  
  // API routes (keep all MakerKit backend)
  ...apiRoutes,
  ...rootRoutes,
  
  // Team accounts if needed
  teamAccountLayout,
] satisfies RouteConfig;

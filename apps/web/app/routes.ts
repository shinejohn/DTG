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
  route('auth/sign-in', 'routes/auth/sign-in.tsx'),
  route('auth/sign-up', 'routes/auth/sign-up.tsx'),
  route('auth/password-reset', 'routes/auth/password-reset.tsx'),
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

// Downtown Guide (DTG) Routes - Migrated from Magic Patterns
const dtgLayout = layout('routes/pages/layout.tsx', [
  // Main DTG app routes
  route('dtg', 'routes/pages/Home.tsx'),
  route('dtg/app', 'routes/pages/App.tsx'),
  route('dtg/search', 'routes/pages/Search.tsx'),
  route('dtg/explore', 'routes/pages/Explore.tsx'),
  route('dtg/deals', 'routes/pages/Deals.tsx'),
  route('dtg/deals/:id', 'routes/pages/DealDetail.tsx'),
  route('dtg/events', 'routes/pages/Events.tsx'),
  route('dtg/events/:id', 'routes/pages/EventDetail.tsx'),
  route('dtg/news', 'routes/pages/News.tsx'),
  route('dtg/news/:id', 'routes/pages/NewsDetail.tsx'),
  route('dtg/trending', 'routes/pages/Trending.tsx'),
  route('dtg/favorites', 'routes/pages/Favorites.tsx'),
  route('dtg/pricing', 'routes/pages/Pricing.tsx'),
  route('dtg/settings', 'routes/pages/Settings.tsx'),
  
  // Business routes
  route('dtg/business/:slug', 'routes/pages/business/[slug].tsx'),
  route('dtg/business/analytics', 'routes/pages/business/analytics.tsx'),
  route('dtg/business/dashboard', 'routes/pages/business/dashboard.tsx'),
  route('dtg/business/coupons', 'routes/pages/business/coupons.tsx'),
  route('dtg/business/events', 'routes/pages/business/events.tsx'),
  route('dtg/business/homepage', 'routes/pages/business/homepage.tsx'),
  route('dtg/business/integrations', 'routes/pages/business/integrations.tsx'),
  route('dtg/business/loyalty', 'routes/pages/business/loyalty.tsx'),
  route('dtg/business/promotions', 'routes/pages/business/promotions.tsx'),
  route('dtg/business/loyalty-members', 'routes/pages/business/dashboard/LoyaltyMembers.tsx'),
  route('dtg/business/profile/edit', 'routes/pages/business/profile/edit.tsx'),
  
  // Profile routes
  route('dtg/profile/:username', 'routes/pages/profile/[username].tsx'),
  route('dtg/profile/edit', 'routes/pages/profile/edit.tsx'),
  route('dtg/profile/rewards', 'routes/pages/profile/Rewards.tsx'),
  
  // Review routes
  route('dtg/review/:businessId', 'routes/pages/review/[businessId].tsx'),
  
  // Auth pages (DTG specific)
  route('dtg/login', 'routes/pages/Login.tsx'),
  route('dtg/register', 'routes/pages/Register.tsx'),
  route('dtg/forgot-password', 'routes/pages/ForgotPassword.tsx'),
  route('dtg/reset-password', 'routes/pages/ResetPassword.tsx'),
  route('dtg/verify-email', 'routes/pages/VerifyEmail.tsx'),
]);

// Extended User Account Routes (DTG features)
const extendedUserAccountLayout = layout('routes/home/user/layout.tsx', [
  route('home', 'routes/home/user/index.tsx'),
  route('home/settings', 'routes/home/user/settings.tsx'),
  route('home/billing', 'routes/home/user/billing.tsx'),
  route('home/billing/return', 'routes/home/user/billing-return.tsx'),
  
  // DTG user features
  route('home/achievements', 'routes/pages/Achievements.tsx'),
  route('home/challenges', 'routes/pages/Challenges.tsx'),
  route('home/rewards', 'routes/pages/Rewards.tsx'),
  route('home/leaderboards', 'routes/pages/Leaderboards.tsx'),
  route('home/referrals', 'routes/pages/Referrals.tsx'),
  
  // Account management
  route('home/account/deactivate', 'routes/pages/account/Deactivate.tsx'),
  route('home/account/language', 'routes/pages/account/Language.tsx'),
  
  // Security
  route('home/security/sessions', 'routes/pages/security/ActiveSessions.tsx'),
  route('home/security/password', 'routes/pages/security/ChangePassword.tsx'),
  route('home/security/two-factor', 'routes/pages/security/TwoFactorAuth.tsx'),
  
  // Billing
  route('home/billing/payment-method', 'routes/pages/billing/AddPaymentMethod.tsx'),
]);

// Extended Auth Routes (DTG specific)
const extendedAuthLayout = layout('routes/auth/layout.tsx', [
  route('auth/sign-in', 'routes/auth/sign-in.tsx'),
  route('auth/sign-up', 'routes/auth/sign-up.tsx'),
  route('auth/password-reset', 'routes/auth/password-reset.tsx'),
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
  ...rootRoutes,
  ...apiRoutes,
  extendedAdminLayout,
  marketingLayout,
  authLayout,
  extendedUserAccountLayout,
  teamAccountLayout,
  dtgLayout,
] satisfies RouteConfig;

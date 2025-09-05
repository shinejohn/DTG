import type { Config } from '@react-router/dev/config';

//import { vercelPreset } from '@vercel/react-router/vite';

export default {
  appDirectory: 'app',
  routes: './app/routes.ts',  // Explicit routes file
  ssr: true,        // Keep server-side rendering for APIs
  prerender: [
    // Marketing pages - good for SEO
    '/',
    '/pricing',
    '/terms-of-service',
    '/privacy-policy',
    '/contact',
    '/faq',
    '/cookie-policy',
    '/docs',
    
    // Auth pages (public)
    '/auth/sign-in',
    '/auth/sign-up',
    '/auth/password-reset',
    
    // DTG public pages
    '/dtg',
    '/dtg/explore',
    '/dtg/events',
    '/dtg/deals',
    '/dtg/news',
    '/dtg/trending',
    '/dtg/pricing',
    
    // Static utility pages
    '/robots.txt',
    '/sitemap.xml',
  ],
  presets: [
    // vercelPreset()
  ],
} satisfies Config;

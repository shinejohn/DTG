#!/usr/bin/env node

/**
 * Cache warming script that pre-renders pages after server startup
 * This runs in the deploy phase to pre-populate the cache
 */

const PAGES_TO_WARM = [
  '/',
  '/pricing',
  '/terms-of-service',
  '/privacy-policy',
  '/contact',
  '/faq',
  '/cookie-policy',
  '/docs',
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/password-reset',
  '/dtg',
  '/dtg/explore',
  '/dtg/events',
  '/dtg/deals',
  '/dtg/news',
  '/dtg/trending',
  '/dtg/pricing',
];

const SERVER_URL = process.env.VITE_SITE_URL || 'http://localhost:3000';

async function warmCache() {
  console.log('🔥 Starting cache warming...');
  
  // Wait for server to be ready
  await waitForServer();
  
  // Warm each page
  for (const page of PAGES_TO_WARM) {
    try {
      console.log(`📄 Warming ${page}...`);
      const start = Date.now();
      const response = await fetch(`${SERVER_URL}${page}`);
      const duration = Date.now() - start;
      
      if (response.ok) {
        console.log(`✅ ${page} warmed in ${duration}ms`);
      } else {
        console.error(`❌ Failed to warm ${page}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error warming ${page}:`, error);
    }
  }
  
  console.log('✨ Cache warming complete!');
}

async function waitForServer(maxAttempts = 30) {
  console.log('⏳ Waiting for server to be ready...');
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(`${SERVER_URL}/healthcheck`);
      if (response.ok) {
        console.log('✅ Server is ready!');
        return;
      }
    } catch (error) {
      // Server not ready yet
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  throw new Error('Server failed to start within 30 seconds');
}

// Run the cache warming
warmCache().catch(console.error);
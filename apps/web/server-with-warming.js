import { createRequestHandler } from "@react-router/node";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static assets
app.use("/assets", express.static(path.join(__dirname, "build/client/assets")));

// SSR handler
const handler = createRequestHandler({
  build: () => import("./build/server/index.js"),
});

app.all("*", handler);

const port = process.env.PORT || 3000;

// Start server
const server = app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  
  // Warm cache after server starts
  warmCache();
});

// Cache warming function
async function warmCache() {
  console.log('🔥 Starting cache warming...');
  
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
  
  const baseUrl = `http://localhost:${port}`;
  
  // Wait a bit for server to fully initialize
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  for (const page of PAGES_TO_WARM) {
    try {
      console.log(`📄 Warming ${page}...`);
      const start = Date.now();
      const response = await fetch(`${baseUrl}${page}`);
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
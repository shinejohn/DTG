import type { Config } from '@react-router/dev/config';

//import { vercelPreset } from '@vercel/react-router/vite';

export default {
  appDirectory: 'app',
  routes: './app/routes.ts',  // Explicit routes file
  ssr: true,        // Keep server-side rendering for APIs
  prerender: false, // Disable build-time pre-rendering
  presets: [
    // vercelPreset()
  ],
} satisfies Config;

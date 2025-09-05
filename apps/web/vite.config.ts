import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import tailwindCssVitePlugin from '@kit/tailwind-config/vite';

const ALLOWED_HOSTS =
  process.env.NODE_ENV === 'development' ? ['host.docker.internal'] : [];

export default defineConfig(({ command }) => ({
  ssr: {
    noExternal: command === 'build' ? true : undefined,
  },
  plugins: [reactRouter(), tsconfigPaths(), ...tailwindCssVitePlugin.plugins],
  server: {
    allowedHosts: ALLOWED_HOSTS,
  },
  build: {
    sourcemap: false, // Disable sourcemaps in production to fix resolution errors
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      external: ['fsevents'],
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'ui-vendor': ['@radix-ui/react-icons', 'lucide-react', 'recharts'],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['fsevents'],
    entries: [
      './app/root.tsx',
      './app/entry.server.tsx',
      './app/routes/**/*.tsx',
    ],
  },
}));

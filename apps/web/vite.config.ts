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
    rollupOptions: {
      external: ['fsevents'],
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

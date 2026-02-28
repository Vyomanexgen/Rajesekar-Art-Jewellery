import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    devSourcemap: true,
  },
  server: {
    host: true,
    port: 5174,
    strictPort: false,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separate React and React DOM
            if (id.includes('react-dom')) {
              return 'react-dom-vendor';
            }
            if (id.includes('react')) {
              return 'react-vendor';
            }
            // Separate large libraries
            if (id.includes('firebase')) {
              return 'firebase-vendor';
            }
            if (id.includes('recharts')) {
              return 'recharts-vendor';
            }
            // Everything else
            return 'vendor';
          }
        },
      },
    },
  },
});

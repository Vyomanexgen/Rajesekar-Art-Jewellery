import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Tailwind CSS v4 Vite plugin (optional - uncomment if installed)
// import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Uncomment the line below if @tailwindcss/vite is installed
    // tailwindcss(),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  css: {
    devSourcemap: true,
  },
})

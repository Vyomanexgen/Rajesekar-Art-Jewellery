import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
    minify: 'esbuild'
  },
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          'vendor-utils': ['framer-motion', 'recharts'],
          'vendor-other': ['@emailjs/browser', 'file-saver', 'html2canvas', 'jspdf', 'lucide-react', 'react-icons', 'xlsx', 'bootstrap'],
          // Page chunks
          'pages-admin': [
            './src/components/pages/admin/AdminLogin.jsx',
            './src/components/pages/admin/AdminDashboard.jsx',
            './src/admin-components'
          ],
          'pages-checkout': [
            './src/components/pages/checkout/Checkout.jsx',
            './src/components/pages/checkout/Address.jsx',
            './src/components/pages/checkout/Delivery.jsx',
            './src/components/pages/checkout/Payment.jsx',
            './src/components/pages/checkout/Review.jsx'
          ],
          'pages-auth': [
            './src/components/pages/auth/SignIn.jsx',
            './src/components/pages/auth/SignUp.jsx'
          ],
          'pages-orders': [
            './src/components/pages/orders/Order.jsx',
            './src/components/pages/orders/OrderConfirmation.jsx',
            './src/components/pages/orders/TrackOrder.jsx'
          ],
          // Common components
          'components-common': [
            './src/components/common'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
});

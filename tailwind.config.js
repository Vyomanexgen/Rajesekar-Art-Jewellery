/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/hooks/**/*.{js,jsx}",
    "./src/context/**/*.{js,jsx}",
    "./src/utils/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors for jewellery e-commerce
        primary: {
          purple: '#5f2b7f',
          dark: '#351845',
          darker: '#1f1230',
        },
        accent: {
          yellow: '#ffd700',
          'yellow-light': '#ffed4e',
        },
        // Neutral colors
        neutral: {
          light: '#f9f5ff',
          'light-gray': '#f0e5ff',
          gray: '#e5e5e5',
          'dark-gray': '#6b5b7d',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        // Fade in animation for sections
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Slide animation for modals and dropdowns
        slide: {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        // Slide up animation for success messages
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Scale in animation for modals
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Glitter shine for jewellery effects
        glitterShine: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in forwards',
        slide: 'slide 0.25s ease-in-out forwards',
        slideUp: 'slideUp 0.5s ease-out 0.3s both',
        scaleIn: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        glitterShine: 'glitterShine 2s linear infinite',
      },
      boxShadow: {
        'jewellery': '0 6px 16px rgba(0, 0, 0, 0.2)',
        'jewellery-lg': '0 20px 60px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'jewellery': '12px',
        'jewellery-lg': '20px',
      },
    },
  },
  plugins: [],
};


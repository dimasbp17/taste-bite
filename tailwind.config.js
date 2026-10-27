import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF7F2',
          dark: '#F3ECE2',
        },
        ink: {
          DEFAULT: '#1E1A17',
          soft: '#57504A',
          muted: '#8A817A',
        },
        brand: {
          50: '#FFF6EF',
          100: '#FFE9D9',
          DEFAULT: '#C2410C',
          dark: '#9A3412',
        },
        sage: {
          50: '#EEF2EA',
          DEFAULT: '#4D5E46',
        },
        line: '#E9E1D6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(30, 26, 23, 0.04), 0 8px 24px -12px rgba(30, 26, 23, 0.12)',
        lift: '0 2px 4px rgba(30, 26, 23, 0.05), 0 20px 40px -16px rgba(30, 26, 23, 0.22)',
      },
    },
  },
  plugins: [scrollbarHide],
};

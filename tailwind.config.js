const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        shimer: {
          '50%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      colors: {
        oren: '#ff642f',
        pink: '#ffd7c9',
        'biru-muda': '#e3f1ff',
        abu: '#7f7f7f',
        abu2: '#e8e8e8',
        abu3: '#f9f9f9',
      },
      fontFamily: {
        inter: 'Inter, sans-serif',
        playfair: 'Playfair, serif',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
});

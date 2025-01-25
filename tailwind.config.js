/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-purple': '#441752',
        'deep-purple': '#1A1625',
        'muted-plum': '#2D2B3F',
        'accent-blue': '#4F9BFF',
        'accent-pink': '#FF6B9B',
        'accent-green': '#50E3C2',
        'accent-yellow': '#FFD93D',
        'accent-orange': '#FF9F43',
        'accent-violet': '#9B6DFF',
        'soft-lavender': '#B4A5FF',
        'cream-white': '#F5F3FF',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};
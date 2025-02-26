/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#D9ED92',
          100: '#B5E48C',
          200: '#99D98C',
          300: '#76C893',
          400: '#52B69A',
          500: '#34A0A4',
          600: '#168AAD',
          700: '#1A759F',
          800: '#1E6091',
          900: '#184E77',
        },
      },
    },
  },
  plugins: [],
};
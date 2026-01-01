/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'portfolio-white': '#ececec',
        'portfolio-gray': '#d4d2d5',
        'portfolio-black': '#2b2b2b',
      },
    },
  },
  plugins: [],
}

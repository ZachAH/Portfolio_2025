// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // <--- Add this line
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
      // "./src/components/Navbar.jsx" // Keep explicit paths if you added them before
    ],
    theme: {
      extend: {
        colors: {
          metallicGold: '#D4AF37',
          black: '#000000',
          tealGreen: '#5FB49C',
          indigo: '#414288',
          offWhite: '#F0EDEE',
        },
      },
    },
    plugins: [],
  }
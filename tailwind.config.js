// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Or your current dark mode setting
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'], // Your default sans-serif
        // 'dotgothic': ['"DotGothic16"', 'sans-serif'], // Remove or keep if you want it as an option
        // 'learning-curve': ["'Learning Curve Pro'", 'cursive'], // Remove or keep
        'canarias': ["'Canarias'", 'sans-serif'], // Add your new 'Canarias' font
      },
      colors: {
        metallicGold: '#D4AF37',
        black: '#000000',
        tealGreen: '#5FB49C',
        indigo: '#414288',
        offWhite: '#F0EDEE',
      },
      keyframes: { // If you have the neon flicker keyframes here
        neonFlickerOn: {
          // ... your keyframes ...
        }
      },
      animation: { // If you have the neon flicker animation here
        'neon-flicker': 'neonFlickerOn 4s ease-in-out forwards',
      }
    },
  },
  plugins: [],
}
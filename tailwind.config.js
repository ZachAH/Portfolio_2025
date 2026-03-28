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
        'sans': ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        'canarias': ["'Canarias'", 'sans-serif'],
      },
      colors: {
        obsidian: {
          950: '#050505',
          900: '#101010',
          800: '#1a1a1a',
          700: '#262626',
        },
        accent: {
          orange: '#f97316',
          red: '#ef4444',
          blue: '#1d4ed8',
        },
        silver: {
          50: '#f9f9fb',
          100: '#f5f5f7',
          200: '#e5e5e7',
          300: '#d2d2d7',
        }
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(to right, #f97316, #ef4444)',
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'premium-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
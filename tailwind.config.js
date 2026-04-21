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
          950: '#0A1510',
          900: '#0F1F18',
          800: '#183028',
          700: '#224030',
        },
        accent: {
          orange: '#FFB612',
          red: '#183028',
          blue: '#0077C0',
        },
        silver: {
          50: '#f8faff',
          100: '#EEF2FA',
          200: '#D4E0F2',
          300: '#A8BCDC',
        }
      },
      backgroundImage: {
        'sunset-gradient': 'linear-gradient(to right, #003087, #FFB612)',
        'wi-gradient-dark': 'linear-gradient(to right, #FFFFFF, #FFB612)',
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
// src/components/ThemeToggle.jsx
import React from 'react';
import useDarkMode from '../hooks/useDarkMode'; // Adjust import path if needed

// Example using simple text, you can replace with icons (SVG)
export default function ThemeToggle({ handleMouseEnter, handleMouseLeave }) { // Accept handlers if needed
  const [theme, toggleTheme] = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="interactive-element px-3 py-1 rounded border border-gray-500 dark:border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-sm" // Example styling
      onMouseEnter={handleMouseEnter} // Apply cursor effect handlers if passed
      onMouseLeave={handleMouseLeave}
    >
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      {/* Or use Icons: */}
      {/* {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />} */}
    </button>
  );
}

// Example SVG Icons (place these inside the component or import them)
// const SunIcon = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-6.364-.386 1.591-1.591M3 12h2.25m.386-6.364 1.591 1.591" />
//   </svg>
// );
// const MoonIcon = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
//   </svg>
// );
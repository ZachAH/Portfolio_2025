// src/components/ThemeToggle.jsx
import React from 'react';
import useDarkMode from '../hooks/useDarkMode'; // Adjust import path if needed
import { BsToggleOn, BsToggleOff } from 'react-icons/bs'; // Example icons

export default function ThemeToggle({ handleMouseEnter, handleMouseLeave }) {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className={`
        interactive-element 
        p-2 rounded-full 
        border-2 border-transparent ${/* Base border, transparent by default */''}
        focus:outline-none focus:ring-2 
        transition-colors duration-200

        ${/* Light Mode Styles */''}
        text-tealGreen ${/* Icon color in light mode (for BsToggleOn) */''}
        hover:bg-gray-200 
        focus:ring-tealGreen

        ${/* Dark Mode Styles */''}
        dark:bg-black 
        dark:border-purple-500 
        dark:hover:bg-gray-800 ${/* Or dark:hover:bg-purple-900/50 for a subtle purple hover */''}
        dark:focus:ring-purple-500
      `}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {theme === 'light' ? (
        // Light Mode is active: Show "Switch is ON"
        // Icon color here will be controlled by the button's text color in light mode
        <BsToggleOn size={28} /> 
      ) : (
        // Dark Mode is active: Show "Switch is OFF"
        // Icon color here will be controlled by the button's text color in dark mode
        <BsToggleOff size={28} className="text-purple-400" /> // Explicitly set purple icon for dark mode "off" state
      )}
    </button>
  );
}
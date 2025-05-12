// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

export default function useDarkMode() {
  // 1. Initialize state: Check localStorage first, then system preference, default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') { // Ensure code runs only in browser
      const storedTheme = window.localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return storedTheme || (prefersDark ? 'dark' : 'light');
    }
    return 'light'; // Default for server-side rendering or non-browser env
  });

  // 2. Effect to apply class and update localStorage
  useEffect(() => {
    const root = window.document.documentElement; // Get the <html> element

    root.classList.remove('light', 'dark'); // Remove previous theme class
    root.classList.add(theme);             // Add current theme class

    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Re-run only when theme state changes

  // 3. Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 4. Return theme state and toggle function
  return [theme, toggleTheme];
}
// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return storedTheme || (prefersDark ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  // Modified toggleTheme function
  const toggleTheme = () => {
    setThemeState((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      // Set the new theme first so localStorage and class on <html> are updated by useEffect
      // Then, reload the page. The useEffect will run again on the new page load
      // and correctly apply the class from localStorage.
      // A slight delay can sometimes help ensure localStorage is written before reload.
      setTimeout(() => {
        window.location.reload();
      }, 50); // Small delay, can be adjusted or removed if not needed
      return newTheme;
    });
  };

  return [theme, toggleTheme];
}
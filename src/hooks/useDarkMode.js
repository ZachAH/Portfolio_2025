// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';

export default function useDarkMode() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      
      // We prioritize the stored preference first. 
      // If none exists, we default to 'light' regardless of system settings.
      return storedTheme || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    // This ensures the correct class is applied to the <html> element
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      // Keeping your reload logic as requested
      setTimeout(() => {
        window.location.reload();
      }, 50); 
      
      return newTheme;
    });
  };

  return [theme, toggleTheme];
}
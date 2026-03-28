import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import useDarkMode from '../hooks/useDarkMode';

const ThemeToggle = ({ handleMouseEnter, handleMouseLeave }) => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-14 h-7 rounded-full bg-obsidian-800/10 dark:bg-obsidian-700/30 border border-obsidian-200/20 dark:border-obsidian-500/20 transition-all duration-300 outline-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <FiSun className={`text-[10px] ${theme === 'light' ? 'text-accent-orange' : 'text-text-secondary/40'}`} />
        <FiMoon className={`text-[10px] ${theme === 'dark' ? 'text-accent-orange' : 'text-text-secondary/40'}`} />
      </div>
      
      <motion.div
        animate={{ 
          x: theme === 'light' ? -14 : 14,
          backgroundColor: theme === 'light' ? '#f97316' : '#f97316' 
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30 
        }}
        className="z-10 w-5 h-5 rounded-full shadow-lg shadow-accent-orange/20 flex items-center justify-center text-[10px] text-white"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'light' ? <FiSun /> : <FiMoon />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ handleMouseEnter, handleMouseLeave }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Contact', path: '/#contact' },
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-center py-6 pointer-events-none"
    >
      <div 
        className={`flex items-center gap-8 px-8 py-3 rounded-full pointer-events-auto transition-all duration-500 glass ${
          scrolled ? 'shadow-premium-hover scale-95' : 'bg-transparent shadow-none border-transparent'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to="/" className="text-xl font-bold tracking-tighter mr-4 flex items-center group">
          <span className="w-8 h-8 rounded-lg bg-sunset-gradient flex items-center justify-center mr-2 text-white text-xs">ZH</span>
          <span className="hidden sm:inline group-hover:text-accent-orange transition-colors">Zach Howell</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-3 py-1 text-sm font-medium transition-colors hover:text-accent-orange ${
                isActive(link.path) ? 'text-accent-orange' : 'text-text-primary'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-sunset-gradient rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="ml-4 pl-4 border-l border-obsidian-700/20">
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
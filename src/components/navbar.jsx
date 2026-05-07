import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiPhone, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const PHONE_NUMBER = '262-341-7181';
const PHONE_HREF = 'tel:2623417181';

const Navbar = ({ handleMouseEnter, handleMouseLeave }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Why Me?', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Areas Served', path: '/locations' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Free Audit', path: '/audit' },
    { name: 'Contact', path: '/#contact' },
  ];

  const isActive = (path) => {
    if (!path) return false;
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
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-center py-4 sm:py-6 pointer-events-none"
    >
      <div
        className={`flex items-center justify-between sm:justify-center gap-4 sm:gap-8 px-5 sm:px-8 py-3 rounded-full pointer-events-auto transition-all duration-500 w-[90%] sm:w-auto ${
          scrolled ? 'glass shadow-premium-hover scale-95' : 'bg-white/80 dark:bg-obsidian-950/80 backdrop-blur-xl shadow-sm sm:bg-transparent sm:dark:bg-transparent sm:backdrop-blur-none sm:shadow-none'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
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

        <div className="flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full border border-accent-orange/30 bg-accent-orange/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-accent-orange transition-colors hover:bg-accent-orange hover:text-white"
            aria-label={`Call Zach Howell at ${PHONE_NUMBER}`}
          >
            <FiPhone size={14} />
            <span className="hidden sm:inline">{PHONE_NUMBER}</span>
          </a>

          <div className="hidden sm:block pl-4 border-l border-obsidian-700/20">
            <ThemeToggle handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-primary hover:text-accent-orange transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-obsidian-950/20 backdrop-blur-sm z-[-1] md:hidden pointer-events-auto"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[400px] glass-card !rounded-none !border-l border-obsidian-700/10 p-10 flex flex-col md:hidden pointer-events-auto shadow-2xl z-[1001]"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-lg bg-sunset-gradient flex items-center justify-center mr-2 text-white text-xs">ZH</span>
                  <span className="font-bold tracking-tighter">ZH Web Solutions</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-primary hover:text-accent-orange transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-3xl font-bold tracking-tight py-2 block transition-colors ${
                        isActive(link.path) ? 'text-accent-orange' : 'text-text-primary hover:text-accent-orange'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-10 border-t border-obsidian-700/10 flex flex-col gap-6"
              >
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-accent-orange px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white"
                  aria-label={`Call Zach Howell at ${PHONE_NUMBER}`}
                >
                  <FiPhone size={16} />
                  <span>{PHONE_NUMBER}</span>
                </a>

                <div>
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-widest block mb-4">Appearance</span>
                  <ThemeToggle handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseEnter} />
                </div>
                
                <div className="flex items-center gap-4 text-text-secondary">
                  <span className="text-xs font-medium">© 2026 ZH Web Solutions</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

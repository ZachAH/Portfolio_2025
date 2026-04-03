import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ReactGA from 'react-ga4'; // Import GA4

import Navbar from './components/navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import useDarkMode from './hooks/useDarkMode';

import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import './index.css';

// Initialize GA4 with your Measurement ID
ReactGA.initialize(import.meta.env.VITE_GA_ID);

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 1. Handle Smooth Scrolling for Hashes
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }

    // 2. Track Page View in Analytics whenever path changes
    ReactGA.send({ hitType: "pageview", page: pathname + hash });
    
  }, [pathname, hash]);

  return null;
}

function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const refreshSelectors = () => {
      document.querySelectorAll('.interactive-element, a, button').forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    refreshSelectors();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[10000] ${isHovering ? 'custom-cursor--hover' : ''}`}>
      <motion.div
        className="custom-cursor"
        animate={{ x: position.x - 4, y: position.y - 4, scale: isActive ? 0.8 : 1 }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.5 }}
      />
      <motion.div
        className="custom-cursor-ring"
        animate={{
          x: position.x - (isHovering ? 25 : 16),
          y: position.y - (isHovering ? 25 : 16),
          scale: isHovering ? 1.2 : isActive ? 1.1 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.8 }}
      />
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const [theme] = useDarkMode();
  const location = useLocation();

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-obsidian-950 text-white' : 'bg-white text-obsidian-950'}`}>
      <ScrollHandler />
      <AnimatedBackground currentTheme={theme} />
      <Cursor />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
                  </PageWrapper>
                }
              />
              <Route
                path="/services"
                element={
                  <PageWrapper>
                    <Services handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
                  </PageWrapper>
                }
              />
              <Route
                path="/pricing"
                element={
                  <PageWrapper>
                    <Pricing handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
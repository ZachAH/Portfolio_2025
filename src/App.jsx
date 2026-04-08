import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ReactGA from 'react-ga4';

import Navbar from './components/navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import useDarkMode from './hooks/useDarkMode';
import './index.css';

// Route-level code splitting — each page ships in its own chunk so the
// initial JS payload (and thus LCP / TBT) is much smaller.
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Templates = lazy(() => import('./pages/Templates'));
const Pricing = lazy(() => import('./pages/Pricing'));
const OnboardingForm = lazy(() => import('./components/OnboardingForm'));

// Initialize GA4 with your Measurement ID — defer slightly so it doesn't
// compete with first paint / hydration.
if (import.meta.env.VITE_GA_ID) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => ReactGA.initialize(import.meta.env.VITE_GA_ID));
  } else {
    setTimeout(() => ReactGA.initialize(import.meta.env.VITE_GA_ID), 1500);
  }
}

/**
 * SECURITY: OnboardingGuard
 * UPDATED: Now allows access if session_id OR package is present.
 * Also allows bypass on localhost for easier development.
 */
function OnboardingGuard({ children }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const sessionId = queryParams.get('session_id');
  const packageType = queryParams.get('package');

  // Development Bypass: Allow access on localhost without params
  const isDev = window.location.hostname === 'localhost';

  // If no entry key is found, redirect to pricing
  if (!sessionId && !packageType && !isDev) {
    console.warn("Access Denied: Missing session_id or package parameter.");
    return <Navigate to="/pricing" replace />;
  }

  return children;
}

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
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

  // Determine if we are on the onboarding page to hide Nav/Footer
  const isOnboarding = location.pathname === '/launch-onboarding';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-obsidian-950 text-white' : 'bg-white text-obsidian-950'}`}>
      <ScrollHandler />
      <AnimatedBackground currentTheme={theme} />
      <Cursor />

      <div className="relative z-10 flex flex-col min-h-screen">
        {!isOnboarding && (
          <Navbar handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        )}

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
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
                path="/about"
                element={
                  <PageWrapper>
                    <About handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
                  </PageWrapper>
                }
              />
              <Route
                path="/templates"
                element={
                  <PageWrapper>
                    <Templates handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
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

              <Route
                path="/launch-onboarding"
                element={
                  <OnboardingGuard>
                    <PageWrapper>
                      <main className="min-h-screen flex items-center justify-center p-4">
                        <OnboardingForm />
                      </main>
                    </PageWrapper>
                  </OnboardingGuard>
                }
              />
            </Routes>
            </Suspense>
          </AnimatePresence>
        </main>

        {!isOnboarding && (
          <Footer handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        )}
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
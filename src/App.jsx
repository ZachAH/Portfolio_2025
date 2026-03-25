import React, { useState, useEffect, useRef } from 'react';

import Navbar from './components/navbar';
import Hero from './components/hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import RainyCityBackground from './components/RainyCityBackground';
import useDarkMode from './hooks/useDarkMode';

import './index.css';
function App() {
  // Dark Mode Hook
  const [theme, toggleTheme] = useDarkMode();

  // Custom Cursor Logic
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []); 

  // Handlers for custom cursor hover effect (to be passed to components)
  const handleMouseEnter = () => {
    if (cursorRef.current) {
      cursorRef.current.classList.add('custom-cursor--hover');
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.classList.remove('custom-cursor--hover');
    }
  };

  // Log the theme for debugging purposes
  useEffect(() => {
    console.log("App.jsx current theme:", theme);
  }, [theme]);


  return (
    <div>
      {/* Animated background, conditionally renders based on theme */}
      <AnimatedBackground currentTheme={theme} />
      <RainyCityBackground currentTheme={theme} />

      {/* Wrapper for all page content to ensure it sits above the fixed background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          // toggleTheme={toggleTheme} 
          // currentTheme={theme}
        />
        <Hero
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        {/* UPDATED: Passing cursor handlers to Projects */}
        <Projects 
           handleMouseEnter={handleMouseEnter} 
           handleMouseLeave={handleMouseLeave}
        /> 
        <Contact />
        <Footer
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Custom Cursor Element */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      ></div>
    </div>
  );
}

export default App;
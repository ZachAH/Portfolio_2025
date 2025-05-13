// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';

// Component Imports (ensure casing matches your actual filenames)
// e.g., if your file is Navbar.jsx, import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import useDarkMode from './hooks/useDarkMode'; // Make sure this path is correct (e.g., src/hooks/useDarkMode.js)

import './index.css'; // Your main stylesheet with Tailwind directives

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
  }, []); // Empty dependency array ensures this runs once on mount for cursor

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

      {/* Wrapper for all page content to ensure it sits above the fixed background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/*
          Pass toggleTheme to your ThemeToggle component.
          If ThemeToggle is inside Navbar, Navbar needs to receive toggleTheme and pass it down.
          Alternatively, ThemeToggle can import and use useDarkMode() directly itself.
          For simplicity here, I'm assuming ThemeToggle might be self-contained or gets props via Navbar.
        */}
        <Navbar
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          // toggleTheme={toggleTheme} // Example if Navbar hosts the ThemeToggle button directly
          // currentTheme={theme}   // Example if Navbar needs to know the theme for other reasons
        />
        <Hero
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        <Projects /> {/* Add handleMouseEnter/Leave if Projects component has interactive elements for cursor */}
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
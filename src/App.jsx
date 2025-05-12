import Navbar from './components/navbar';
import Hero from './components/hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import React, { useState, useEffect, useRef } from 'react';

import './index.css';

function App() {
  // State to track mouse position
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 }); // Start off-screen

  // Ref for the custom cursor element
  const cursorRef = useRef(null);

  // Effect to update mouse position
  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateCursor);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Handlers to add/remove the hover class
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

  return (
    // You might want a container div if App itself doesn't have one
    <div>
      {/* Render your page components */}
      {/* Pass the handlers down as props to components containing interactive elements */}
      <Navbar handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
      <Hero handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
      <Projects handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
      <Footer handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />

      {/* Custom Cursor Element */}
      {/* It's crucial this element exists */}
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

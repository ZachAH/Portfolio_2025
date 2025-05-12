// src/components/Navbar.jsx
import React from 'react';
import ThemeToggle from './ThemeToggle'; // Adjust import path

// Accept handlers as props (if needed for custom cursor)
export default function Navbar({ handleMouseEnter, handleMouseLeave }) {
  return (
    <nav className="flex justify-between items-center px-6 py-4 md:px-12 lg:px-24 bg-transparent text-gray-800 dark:text-offWhite"> {/* Updated base text color */}

      {/* Logo/Brand Name */}
      <h1
        className="interactive-element text-xl font-bold cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Zachary Howell
      </h1>

      {/* Right side container */}
      <div className="flex items-center space-x-6"> {/* Group links and toggle */}
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-base">
          <li>
            <a
              href="#projects"
              className="interactive-element hover:text-tealGreen transition duration-300"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="interactive-element hover:text-tealGreen transition duration-300"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Theme Toggle Button */}
        <ThemeToggle handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />

        {/* Placeholder for Hamburger Menu Icon */}
        <div className="md:hidden">
          <button
            className="interactive-element focus:outline-none" // Inherits text color
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-8 6h8" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
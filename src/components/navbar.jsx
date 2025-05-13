// src/components/Navbar.jsx
import React from 'react';
import ThemeToggle from './ThemeToggle';

// icons
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineGithub } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";


export default function Navbar({ handleMouseEnter, handleMouseLeave }) {
  const yourLinkedInUrl = "https://www.linkedin.com/in/zach-howell-189118210";
  const yourGitHubUrl = "https://github.com/ZachAH";
  const yourEmail = "zacharywd91@yahoo.com";
  
  const nameAnimationDuration = 2; // Duration of neonFlickerOn in seconds
  const iconAnimationStagger = 0.5;  // Delay between each icon lighting up
  const iconBaseDelay = nameAnimationDuration + 0.2; // Start icons slightly after name

  return (
    // Added flex-col md:flex-row for responsive stacking
    <nav className="flex flex-col md:flex-row justify-between items-center px-6 py-4 md:px-12 lg:px-24 bg-transparent text-gray-800 dark:text-offWhite">

      {/* Left side: Name and Social Icons */}
      <div className="text-center md:text-left mb-4 md:mb-0"> {/* Added margin-bottom for mobile */}
        <h1
          className="interactive-element font-canarias text-8xl font-bold cursor-pointer text-offWhite neon-text-flicker"
          style={{ '--neon-glow-color': '#5FB49C' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Zachary Howell
        </h1>
        {/* Social Icons Container */}
        <div className="flex justify-center md:justify-start space-x-4 mt-2">
          {/* LinkedIn Icon */}
          <a
            href={yourLinkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="interactive-element text-offWhite hover:text-tealGreen transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
            style={{ animationDelay: `${iconBaseDelay}s` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AiOutlineLinkedin size={40} /> {/* Used your chosen icon, adjusted size slightly */}
          </a>

          {/* GitHub Icon (Placeholder - choose and import one) */}
          <a
            href={yourGitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="interactive-element text-offWhite hover:text-tealGreen transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
            style={{ animationDelay: `${iconBaseDelay + iconAnimationStagger}s` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Replace with your chosen GitHub icon e.g., <FaGithub size={28} /> */}
            <AiOutlineGithub size={40}/>
          </a>

          {/* Email Icon (Placeholder - choose and import one) */}
          <a
            href={`mailto:${yourEmail}`}
            aria-label="Send an Email"
            className="interactive-element text-offWhite hover:text-tealGreen transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
            style={{ animationDelay: `${iconBaseDelay + (iconAnimationStagger * 2)}s` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Replace with your chosen Email icon e.g., <FiMail size={28} /> */}
            <TfiEmail size={40}/>
          </a>
        </div>
      </div>

      {/* Right side: Navigation Links and Theme Toggle */}
      <div className="flex items-center space-x-6">
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
        <ThemeToggle handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        <div className="md:hidden">
          <button
            className="interactive-element focus:outline-none text-offWhite" // Ensured text-offWhite for SVG color
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
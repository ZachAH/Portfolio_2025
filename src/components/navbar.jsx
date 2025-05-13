// src/components/Navbar.jsx
import React from 'react';
import ThemeToggle from './ThemeToggle';

// icons
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";

// Removed selfieImage import as it's not used in this version of Navbar

export default function Navbar({ handleMouseEnter, handleMouseLeave }) {
  const yourLinkedInUrl = "https://www.linkedin.com/in/zach-howell-189118210";
  const yourGitHubUrl = "https://github.com/ZachAH";
  const yourEmail = "zacharywd91@yahoo.com";

  // Animation Timings
  const nameAnimationDuration = 2.5;  // Should match the CSS duration of .neon-text-flicker
  const iconAnimationStagger = 0.5;   // Delay between each social icon
  const iconLightUpDuration = 0.6;    // Duration of .animate-icon-light-up CSS animation

  const iconBaseDelay = nameAnimationDuration + 0.1; // Start social icons slightly after name

  // Calculate when the last social icon animation FINISHES
  const lastSocialIconStartTime = iconBaseDelay + (iconAnimationStagger * 2); // Delay for the 3rd social icon
  const lastSocialIconEndTime = lastSocialIconStartTime + iconLightUpDuration;

  // Nav links start after social icons
  const navLinkBaseDelay = lastSocialIconEndTime + 0.1;

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-6 py-4 md:px-12 lg:px-24 bg-transparent text-gray-800 dark:text-offWhite">

      {/* Left side: Name and Social Icons */}
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1
          className="interactive-element font-canarias text-5xl md:text-9xl font-bold cursor-pointer text-offWhite neon-text-flicker"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Zachary Howell
        </h1>
        <div className="flex justify-center md:justify-start space-x-4 mt-2">
          <a
            href={yourLinkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="interactive-element text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
            style={{ animationDelay: `${iconBaseDelay}s` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AiOutlineLinkedin size={35} />
          </a>
          <a
            href={yourGitHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="interactive-element text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
            style={{ animationDelay: `${iconBaseDelay + iconAnimationStagger}s` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AiOutlineGithub size={35} />
          </a>
          <a
            href={`mailto:${yourEmail}`}
            aria-label="Send an Email"
            className="interactive-element text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
            style={{ animationDelay: `${iconBaseDelay + (iconAnimationStagger * 2)}s` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <TfiEmail size={35} />
          </a>
        </div>
      </div>

      {/* Right side: Navigation Links and Theme Toggle */}
      <div className="flex items-center space-x-6 mt-4 md:mt-0">
        <ul className="hidden md:flex space-x-8 text-4xl"> {/* Using text-2xl as decided */}
          <li>
            <a
              href="#projects"
              className="interactive-element font-canarias text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up" // Added text-offWhite
              style={{ animationDelay: `${navLinkBaseDelay}s` }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="interactive-element font-canarias text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up" // Added text-offWhite
              style={{ animationDelay: `${navLinkBaseDelay + iconAnimationStagger}s` }}
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
            className="interactive-element focus:outline-none text-offWhite"
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
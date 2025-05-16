// src/components/Navbar.jsx
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

// icons
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import { TfiEmail } from "react-icons/tfi";

// Mobile menu icons
const MenuIcon = (props) => (
 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = (props) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Navbar({ handleMouseEnter, handleMouseLeave }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNameDropped, setIsNameDropped] = useState(false); // State for name drop animation

  const yourLinkedInUrl = "https://www.linkedin.com/in/zach-howell-189118210";
  const yourGitHubUrl = "https://github.com/ZachAH";
  const yourEmail = "zacharywd91@yahoo.com";

  // Animation Timings
  const nameStartupAnimationDuration = 2.5;
  const iconAnimationStagger = 0.5;
  const iconLightUpDuration = 0.6;    // Duration of .animate-icon-light-up CSS

  const socialIconBaseDelay = nameStartupAnimationDuration + 0.1;

  const lastSocialIconStartTime = socialIconBaseDelay + (iconAnimationStagger * 2);
  const lastSocialIconEndTime = lastSocialIconStartTime + iconLightUpDuration;

  const navLinkBaseDelay = lastSocialIconEndTime + 0.1;
  const lastNavLinkStartTime = navLinkBaseDelay + iconAnimationStagger;
  const lastNavLinkEndTime = lastNavLinkStartTime + iconLightUpDuration;

  const hamburgerAnimationDelay = lastNavLinkEndTime + 0.1;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNameDrop = () => {
    setIsNameDropped(!isNameDropped);
  };

  return (
    <nav className="relative bg-transparent text-gray-800 dark:text-offWhite">
      {/* Main Navbar Row */}
      <div className="flex justify-between items-center px-6 py-4 md:px-12 lg:px-24">
        {/* Left side: Name and Social Icons */}
        <div className="text-center md:text-left">
          <h1
            onClick={toggleNameDrop} // Added click handler for drop animation
            className={`
              interactive-element font-canarias text-5xl md:text-7xl lg:text-8xl 
              font-bold cursor-pointer text-offWhite neon-text-flicker
              transition-all duration-700 ease-out 
              ${isNameDropped ? 'opacity-0 translate-y-full rotate-12' : 'opacity-100 translate-y-0 rotate-0'}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Zachary Howell
          </h1>
          <div className="flex justify-center md:justify-start space-x-4 mt-1 md:mt-2">
            <a
              href={yourLinkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="interactive-element text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
              style={{ animationDelay: `${socialIconBaseDelay}s` }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <AiOutlineLinkedin size={28} />
            </a>
            <a
              href={yourGitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="interactive-element text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
              style={{ animationDelay: `${socialIconBaseDelay + iconAnimationStagger}s` }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <AiOutlineGithub size={28} />
            </a>
            <a
              href={`mailto:${yourEmail}`}
              aria-label="Send an Email"
              className="interactive-element text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
              style={{ animationDelay: `${socialIconBaseDelay + (iconAnimationStagger * 2)}s` }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <TfiEmail size={28} />
            </a>
          </div>
        </div>

        {/* Right side: Desktop Navigation Links and Theme Toggle & Mobile Hamburger Button */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <ul className="hidden md:flex space-x-8 text-2xl">
            <li>
              <a
                href="#projects"
                className="interactive-element font-canarias text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
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
                className="interactive-element font-canarias text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300 icon-awaiting-animation animate-icon-light-up"
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
              onClick={toggleMobileMenu}
              className="interactive-element focus:outline-none text-offWhite p-1 bg-transparent hover:bg-gray-700/30 dark:hover:bg-gray-600/30 rounded-md icon-awaiting-animation animate-icon-light-up"
              style={{ animationDelay: `${hamburgerAnimationDelay}s` }}
              aria-label="Toggle menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel - Conditionally Rendered with Transition */}
      <div
        className={`
          md:hidden w-full overflow-hidden transition-all duration-300 ease-in-out text-center
          bg-transparent dark:bg-transparent
          ${isMobileMenuOpen ? 'max-h-screen py-4 mt-2 shadow-lg' : 'max-h-0 py-0'} 
        `}
      >
        {isMobileMenuOpen && (
            <ul className="flex flex-col space-y-4">
            <li>
                <a
                href="#projects"
                className="font-canarias text-xl text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300"
                onClick={toggleMobileMenu}
                >
                Projects
                </a>
            </li>
            <li>
                <a
                href="#contact"
                className="font-canarias text-xl text-offWhite hover:text-tealGreen dark:hover:text-purple-400 transition-colors duration-300"
                onClick={toggleMobileMenu}
                >
                Contact
                </a>
            </li>
            </ul>
        )}
      </div>
    </nav>
  );
}
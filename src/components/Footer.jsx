// src/components/Footer.jsx
import React from 'react';

// Import chosen icons from react-icons
import { FaReact } from 'react-icons/fa';
import { SiVite, SiTailwindcss, SiJavascript } from 'react-icons/si';

export default function Footer({ handleMouseEnter, handleMouseLeave }) {
  const currentYear = new Date().getFullYear();

  const technologies = [
    { name: "React", icon: <FaReact size={28} />, color: "text-sky-400", hoverColor: "hover:text-sky-300" },
    { name: "Vite", icon: <SiVite size={24} />, color: "text-purple-400", hoverColor: "hover:text-purple-300" },
    { name: "TailwindCSS", icon: <SiTailwindcss size={28} />, color: "text-cyan-400", hoverColor: "hover:text-cyan-300" },
    { name: "JavaScript", icon: <SiJavascript size={24} />, color: "text-yellow-400", hoverColor: "hover:text-yellow-300" },
  ];

  return (
    <footer
      className="py-8 px-6 bg-transparent dark:bg-transparent text-center" // Changed dark:bg-black to dark:bg-transparent
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-4">
          <p className="text-sm text-gray-300 dark:text-gray-400 mb-3">
            Crafted with <span className="text-red-500">❤</span> and the following awesome technologies:
          </p>
          <div className="flex justify-center items-center space-x-4">
            {technologies.map((tech) => (
              <a
                key={tech.name}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={tech.name}
                className={`
                  interactive-element
                  ${tech.color}
                  ${tech.hoverColor}
                  transition-all duration-300 ease-in-out
                  transform hover:scale-125 hover:rotate-6
                `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {tech.icon}
              </a>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          &copy; {currentYear} Zachary Howell. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
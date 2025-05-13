// src/components/ProjectCard.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function ProjectCard({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the card is visible
        // rootMargin: "-50px 0px -50px 0px" // Optional: adjust when it triggers
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Base classes for smooth transitions on child elements
  const transitionBase = "transition-all duration-700 ease-out";

  return (
    <div
      ref={cardRef}
      className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl ${transitionBase} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`} // Card itself fades and slides up
    >
      {/* Project Image - "Pop" effect */}
      <img
        src={project.imageUrl}
        alt={project.title}
        className={`w-full h-48 object-cover rounded-md mb-4 ${transitionBase} ${
          isVisible ? "scale-100 opacity-100 delay-200" : "scale-75 opacity-0"
        }`} // Pop effect for image, slightly delayed
      />

      {/* Project Title */}
      <h4
        className={`text-xl font-semibold mb-2 text-gray-900 dark:text-offWhite ${transitionBase} ${
          isVisible ? "opacity-100 translate-x-0 delay-300" : "opacity-0 -translate-x-5"
        }`} // Slide in from left for title
      >
        {project.title}
      </h4>

      {/* Project Description */}
      <p
        className={`text-sm text-gray-600 dark:text-gray-300 mb-4 ${transitionBase} ${
          isVisible ? "opacity-100 translate-x-0 delay-400" : "opacity-0 -translate-x-5"
        }`} // Slide in from left for description
      >
        {project.description}
      </p>

      {/* Technologies Used */}
      <div className="mb-4">
        <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Technologies:</h5>
        <div
          className={`flex flex-wrap gap-2 ${transitionBase} ${
            isVisible ? "opacity-100 delay-500" : "opacity-0"
          }`} // Fade in for tech container
        >
          {project.technologies.map((tech, i) => (
            <span
              key={tech}
              className={`text-xs px-2 py-1 rounded-full bg-tealGreen/20 text-tealGreen-700 dark:bg-tealGreen/30 dark:text-tealGreen-300 ${transitionBase} ${
                isVisible ? `opacity-100 scale-100 delay-[${500 + i * 100}ms]` : "opacity-0 scale-50"
              }`} // Each tech tag pops in sequentially
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Optional Links */}
      <div
        className={`flex space-x-4 ${transitionBase} ${
          isVisible ? "opacity-100 delay-[${500 + project.technologies.length * 100}ms]" : "opacity-0"
        }`} // Fade in links after technologies
      >
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo dark:text-indigo-300 hover:underline">
            Live Demo
          </a>
        )}
        {project.repoLink && (
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo dark:text-indigo-300 hover:underline">
            GitHub Repo
          </a>
        )}
      </div>
    </div>
  );
}
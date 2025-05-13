// src/components/ProjectCard.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function ProjectCard({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardWrapperRef = useRef(null); // For Intersection Observer
  const cardInnerRef = useRef(null);   // For the 3D tilt effect

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentCardWrapper = cardWrapperRef.current; // Capture value
    if (currentCardWrapper) {
      observer.observe(currentCardWrapper);
    }

    return () => {
      if (currentCardWrapper) {
        observer.unobserve(currentCardWrapper);
      }
    };
  }, []);

  // 3D Tilt Effect Logic
  useEffect(() => {
    const card = cardInnerRef.current;
    if (!card || !isVisible) return; // Only attach if card is visible

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      const rotateY = deltaX * 10; 
      const rotateX = -deltaY * 10;

      card.style.setProperty('--rotateX', `${rotateX}deg`);
      card.style.setProperty('--rotateY', `${rotateY}deg`);
      card.style.transform = `perspective(1000px) rotateX(var(--rotateX)) rotateY(var(--rotateY)) scale3d(1.03, 1.03, 1.03)`;
    };

    const handleMouseLeave = () => {
      card.style.removeProperty('--rotateX');
      card.style.removeProperty('--rotateY');
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]); // Re-run when isVisible changes to attach/detach listeners

  const scrollTransitionBase = "transition-all duration-700 ease-out";

  return (
    <div
      ref={cardWrapperRef}
      className={`
        ${scrollTransitionBase} 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div
        ref={cardInnerRef}
        className={`
          p-6 rounded-xl border border-transparent ${/* Base for border to work in dark mode */''}
          bg-black/60 backdrop-blur-sm shadow-lg hover:shadow-2xl ${/* Light mode styles */''}
          dark:bg-transparent dark:backdrop-blur-none dark:shadow-none dark:border-purple-500/20 dark:hover:bg-purple-500/10 ${/* Dark mode styles */''}
          transform-style-3d transition-transform duration-150 ease-out
        `}
        style={{ transform: 'perspective(1000px)' }}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className={`w-full h-48 object-cover rounded-md mb-4 ${scrollTransitionBase} ${
            isVisible ? "scale-100 opacity-100 delay-200" : "scale-75 opacity-0"
          }`}
        />

        <h4
          className={`text-xl font-semibold mb-2 text-offWhite ${scrollTransitionBase} ${
            isVisible ? "opacity-100 translate-x-0 delay-300" : "opacity-0 -translate-x-5"
          }`}
        >
          {project.title}
        </h4>

        <p
          className={`text-sm text-gray-300 mb-4 ${scrollTransitionBase} ${
            isVisible ? "opacity-100 translate-x-0 delay-400" : "opacity-0 -translate-x-5"
          }`}
        >
          {project.description}
        </p>

        <div className="mb-4">
          <h5 className="text-xs font-semibold text-gray-400 uppercase mb-2">Technologies:</h5>
          <div
            className={`flex flex-wrap gap-2 ${scrollTransitionBase} ${
              isVisible ? "opacity-100 delay-500" : "opacity-0"
            }`}
          >
            {project.technologies.map((tech, i) => (
              <span
                key={tech}
                className={`
                  text-xs px-2 py-1 rounded-full 
                  bg-tealGreen text-white ${/* Light Mode: Solid teal background, white text */''}
                  dark:bg-purple-500/40 dark:text-purple-100 ${/* Dark Mode: Semi-transparent purple bg, light purple text */''}
                  ${scrollTransitionBase} ${
                    isVisible ? `opacity-100 scale-100 delay-[${500 + i * 100}ms]` : "opacity-0 scale-50"
                  }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`flex space-x-4 ${scrollTransitionBase} ${
            isVisible ? "opacity-100 delay-[${500 + project.technologies.length * 100}ms]" : "opacity-0"
          }`}
        >
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
               className="text-sm text-indigo-300 hover:underline dark:text-purple-300 dark:hover:text-purple-200">
              Live Demo
            </a>
          )}
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer"
               className="text-sm text-indigo-300 hover:underline dark:text-purple-300 dark:hover:text-purple-200">
              GitHub Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
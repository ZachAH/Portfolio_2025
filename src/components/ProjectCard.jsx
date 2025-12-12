import React, { useState, useEffect, useRef } from 'react';

// UPDATED: Accept viewMode and cursor handlers
export default function ProjectCard({ project, index, viewMode, handleMouseEnter, handleMouseLeave }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardWrapperRef = useRef(null);
  const cardInnerRef = useRef(null);

  // --- Conditional Content Logic ---
  const isCSView = viewMode === 'CS';

  const currentTitle = isCSView ? project.csTitle : project.title;
  const currentDescription = isCSView ? project.csDescription : project.description;
  // ---------------------------------

  // Intersection Observer for scroll animation (Unchanged)
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

    const currentCardWrapper = cardWrapperRef.current;
    if (currentCardWrapper) {
      observer.observe(currentCardWrapper);
    }

    return () => {
      if (currentCardWrapper) {
        observer.unobserve(currentCardWrapper);
      }
    };
  }, []);

  // 3D Tilt Effect Logic (Unchanged)
  useEffect(() => {
    const card = cardInnerRef.current;
    if (!card || !isVisible) return;

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
  }, [isVisible]);

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
        // ADDED CURSOR HANDLERS TO INNER CARD FOR TILT AND CURSOR EFFECT
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          p-6 rounded-xl border border-transparent 
          bg-black/60 backdrop-blur-sm shadow-lg hover:shadow-2xl 
          dark:bg-transparent dark:backdrop-blur-none dark:shadow-none dark:border-purple-500/20 dark:hover:bg-purple-500/10 
          transform-style-3d transition-transform duration-150 ease-out
        `}
        style={{ transform: 'perspective(1000px)' }}
      >
        <img
          src={project.imageUrl}
          alt={currentTitle}
          className={`w-full h-48 object-cover rounded-md mb-4 ${scrollTransitionBase} ${isVisible ? "scale-100 opacity-100 delay-200" : "scale-75 opacity-0"
            }`}
        />

        <h4
          className={`text-xl font-semibold mb-2 text-offWhite ${scrollTransitionBase} ${isVisible ? "opacity-100 translate-x-0 delay-300" : "opacity-0 -translate-x-5"
            }`}
        >
          {currentTitle} {/* DYNAMIC TITLE */}
        </h4>
        {/* LABEL BADGES */}
        {project.labels && (
          <div
            className={`flex flex-wrap gap-2 mb-3 ${scrollTransitionBase} ${isVisible ? "opacity-100 translate-x-0 delay-350" : "opacity-0 -translate-x-3"
              }`}
          >
            {project.labels.map((label, i) => (
              <span
                key={i}
                className={`
          text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-md
          ${label === "Client Website" ? "bg-teal-600/40 text-teal-200" : ""}
          ${label === "Freelance Build" ? "bg-blue-600/40 text-blue-200" : ""}
          ${label === "Business Redesign" ? "bg-purple-600/40 text-purple-200" : ""}
          ${label === "Brand Transformation" ? "bg-yellow-500/30 text-yellow-200" : ""}
          ${label === "Prototype" ? "bg-pink-600/40 text-pink-200" : ""}
          ${label === "AI Demo" ? "bg-rose-600/40 text-rose-200" : ""}
          ${label === "Developer Tool" ? "bg-cyan-600/40 text-cyan-200" : ""}
          ${label === "Training Utility" ? "bg-orange-600/40 text-orange-200" : ""}
          
          ${scrollTransitionBase} ${isVisible
                    ? `opacity-100 scale-100 delay-[${300 + i * 80}ms]`
                    : "opacity-0 scale-50"
                  }
        `}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        <p
          className={`text-sm mb-4 ${scrollTransitionBase} ${isCSView ? 'text-teal-200 dark:text-teal-300 font-medium' : 'text-gray-300'
            } ${isVisible ? "opacity-100 translate-x-0 delay-400" : "opacity-0 -translate-x-5"
            }`}
        >
          {currentDescription} {/* DYNAMIC DESCRIPTION */}
        </p>

        {/* Technologies - Always show */}
        <div className="mb-4">
          <h5 className="text-xs font-semibold text-gray-400 uppercase mb-2">Technical Stack:</h5>
          <div
            className={`flex flex-wrap gap-2 ${scrollTransitionBase} ${isVisible ? "opacity-100 delay-500" : "opacity-0"
              }`}
          >
            {project.technologies.map((tech, i) => (
              <span
                key={tech}
                className={`
                  text-xs px-2 py-1 rounded-full 
                  ${isCSView
                    ? 'bg-purple-500/40 text-purple-100 dark:bg-purple-600/60'
                    : 'bg-tealGreen text-white dark:bg-purple-500/40 dark:text-purple-100'
                  }
                  ${scrollTransitionBase} ${isVisible ? `opacity-100 scale-100 delay-[${500 + i * 100}ms]` : "opacity-0 scale-50"
                  }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`flex space-x-4 ${scrollTransitionBase} ${isVisible ? "opacity-100 delay-[${500 + project.technologies.length * 100}ms]" : "opacity-0"
            }`}
        >
          {/* REMOVED: Conditional link for "View Solution Brief" is now gone. 
            The CS View will now simply show the narrative without an external link.
          */}

          {/* Only show DEV links when not in CS view */}
          {!isCSView && (
            <>
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-300 hover:underline dark:text-purple-300 dark:hover:text-purple-200"
                  onMouseEnter={handleMouseEnter} // CURSOR HANDLER
                  onMouseLeave={handleMouseLeave} // CURSOR HANDLER
                >
                  Live Demo
                </a>
              )}
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-300 hover:underline dark:text-purple-300 dark:hover:text-purple-200"
                  onMouseEnter={handleMouseEnter} // CURSOR HANDLER
                  onMouseLeave={handleMouseLeave} // CURSOR HANDLER
                >
                  GitHub Repo
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
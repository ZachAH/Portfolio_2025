import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ project, index, viewMode, handleMouseEnter, handleMouseLeave }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1 
      }}
      className="group relative flex flex-col h-full glass-card rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:shadow-premium-hover active:scale-[0.98]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle accent glow on hover */}
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent-orange/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="p-6 sm:p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-orange">{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-obsidian-700/30" />
          <div className="flex gap-2 flex-wrap">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-obsidian-700/10 text-text-secondary">{tag}</span>
            ))}
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-accent-orange transition-colors duration-300">
          {project.title}
        </h3>
        
        <div className="relative flex-grow mb-6 overflow-hidden min-h-[80px] sm:min-h-[100px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={viewMode}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="text-text-secondary text-sm md:text-base leading-relaxed font-medium"
            >
              {viewMode === 'DEV' ? project.description : project.csDescription}
            </motion.p>
          </AnimatePresence>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-bold tracking-tight group/link mt-auto"
        >
          View Live Experience
          <svg 
            className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Subtle border highlight for dark mode on hover */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default ProjectCard;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';

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
      // Added light-mode specific borders and shadows to prevent blending
      className="group relative flex flex-col h-full bg-white dark:bg-obsidian-900/40 border border-zinc-200 dark:border-obsidian-800 rounded-[2.5rem] overflow-hidden transition-all duration-700 shadow-sm hover:shadow-premium-hover dark:hover:shadow-premium-hover active:scale-[0.98]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-obsidian-900">
        
        {/* Adaptive "In Development" Badge */}
        {project.isDevelopment && (
          <div className="absolute top-5 left-5 z-20">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-obsidian-950/60 backdrop-blur-md border border-amber-500/30 rounded-full shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">
                In Development
              </span>
            </div>
          </div>
        )}

        {/* Location Pill — signals real local business */}
        {project.location && (
          <div className="absolute top-5 right-5 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 dark:bg-obsidian-950/70 backdrop-blur-md border border-obsidian-700/10 dark:border-white/10 rounded-full shadow-lg">
              <FaMapMarkerAlt className="w-3 h-3 text-accent-orange" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-700 dark:text-zinc-200">
                {project.location}
              </span>
            </div>
          </div>
        )}

        <img
          src={project.image}
          alt={`${project.title} — ${project.category} project screenshot`}
          loading="lazy"
          decoding="async"
          width="1280"
          height="800"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Overlay Gradients - subtle in light mode, deep in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 dark:from-obsidian-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle accent glow on hover */}
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent-orange/10 dark:bg-accent-orange/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-orange">{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-obsidian-700/30" />
          <div className="flex gap-2 flex-wrap">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-200 border border-zinc-200 dark:border-transparent">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-zinc-900 dark:text-white group-hover:text-accent-orange transition-colors duration-300 uppercase">
          {project.title}
        </h3>
        
        {/* Dynamic Description Area */}
        <div className="relative flex-grow mb-6 overflow-hidden min-h-[80px] sm:min-h-[100px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={viewMode}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium"
            >
              {viewMode === 'DEV' ? project.description : project.csDescription}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Testimonial — only renders when a real quote has been collected */}
        {project.testimonial && project.testimonial.quote && (
          <div className="mb-6 p-5 rounded-2xl bg-accent-orange/5 dark:bg-accent-orange/10 border border-accent-orange/20">
            <FaQuoteLeft className="w-4 h-4 text-accent-orange mb-3 opacity-70" />
            <p className="text-sm italic leading-relaxed text-zinc-700 dark:text-zinc-200 mb-3">
              "{project.testimonial.quote}"
            </p>
            <div className="flex items-center gap-2">
              <div className="h-px flex-none w-6 bg-accent-orange" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
                {project.testimonial.author}
                {project.testimonial.role && (
                  <span className="font-medium normal-case tracking-normal text-zinc-500 ml-1">
                    — {project.testimonial.role}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}

        {/* Link Section */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-black tracking-tight text-zinc-900 dark:text-white group/link mt-auto uppercase"
        >
          View Live Experience
          <svg 
            className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Subtle top border highlight on hover */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-orange/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default ProjectCard;

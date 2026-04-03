import React from 'react';

export default function FuturisticSaaSTemplate({ handleMouseEnter, handleMouseLeave }) {
  const templateURL = "https://futuristiclocal.netlify.app/";

  return (
    <div 
      className="interactive-element bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 group shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800">
        <img 
          src="/saas_template.png" 
          alt="Futuristic Multi-Theme Template Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
        />
        
        {/* Floating Badges Container */}
        <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
          {/* Theme Badge */}
          <div className="bg-purple-600 text-white px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            3 Themes Included
          </div>
          {/* Price Badge - New Addition */}
          <div className="bg-zinc-800/80 backdrop-blur-md border border-zinc-700 text-purple-400 px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest">
            $79 - Source Code
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-10">
        <h3 className="text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-purple-400 transition-colors duration-300">
          Futuristic SaaS Layout
        </h3>
        
        <p className="text-zinc-400 mb-8 text-base leading-relaxed font-medium">
          The ultimate high-performance starter kit. This "Ink Edition" template comes packed with a dynamic **Interactive Theme Switcher**, allowing you to toggle between three distinct professional aesthetics (Ink, Pour, and Velvet) with a single click. Designed for forward-thinking brands, it features ultra-smooth Framer Motion animations, a custom grid-overlay system, and specialized layouts for portfolios, artists, or boutique agencies.
        </p>
        
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['Multi-Theme', 'React', 'Tailwind', 'Framer Motion'].map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-zinc-800/50 text-zinc-300 border border-zinc-700 group-hover:border-purple-500/30 transition-colors duration-500">
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-5">
          <a 
            href={templateURL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-purple-500/80 text-purple-400 font-black py-3 px-6 rounded-xl hover:bg-purple-500 hover:text-black transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Preview
          </a>
          
          <a 
            href={templateURL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-purple-500/80 text-purple-400 font-black py-3 px-6 rounded-xl hover:bg-purple-500 hover:text-black transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Get CODE
          </a>
        </div>
      </div>
    </div>
  );
}
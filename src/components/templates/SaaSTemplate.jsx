import React from 'react';

export default function EliteBusinessSuite({ handleMouseEnter, handleMouseLeave }) {
  const templateURL = "https://futuristiclocal.netlify.app/";
  // Updated to point to your Modern Business Elite Gumroad link
  const gumroadURL = "https://ettaflare.gumroad.com/l/modernsuitetemplate?_gl=1*c3push*_ga*MjQ5MjAwNzAuMTc3NTIzNTczNA..*_ga_6LJN6D94N6*czE3NzUyNDY2NTgkbzQkZzEkdDE3NzUyNDk2NjkkajYwJGwwJGgw";

  return (
    <div 
      className="interactive-element bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 group shadow-xl dark:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <img 
          src="/saas_template.png" 
          alt="Modern Business Suite Elite Edition Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        
        {/* Floating Badges Container */}
        <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
          {/* Theme Badge */}
          <div className="bg-purple-600 text-white px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
            3 Themes Included
          </div>
          {/* Price Badge */}
          <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 text-purple-700 dark:text-purple-400 px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
            $79 - Source Code
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-10">
        {/* UPDATED: H1/Headline */}
        <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          Modern Business Elite
        </h3>
        
        {/* UPDATED: Description */}
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-base leading-relaxed font-medium">
          The ultimate high-performance starter suite for high-end modern brands. This Elite Edition features a sophisticated GSAP animation engine and a dynamic masonry portfolio grid. Toggle between three distinct professional aesthetics—Ink, Pour, and Velvet—with a centralized theme engine designed for rapid, agency-grade deployments.
        </p>
        
        {/* Tech Tags - Adaptive Zinc/Purple */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['GSAP', 'React', 'TypeScript', 'Tailwind'].map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 group-hover:border-purple-500/30 transition-colors duration-500">
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
            className="flex-1 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 font-black py-3 px-6 rounded-xl hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white dark:hover:text-black transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Preview
          </a>
          
          {/* UPDATED: Gumroad Overlay Button */}
          <a 
            href={gumroadURL} 
            data-gumroad-overlay-checkout="true"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-purple-600 dark:border-purple-500 text-purple-600 dark:text-purple-400 font-black py-3 px-6 rounded-xl hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white dark:hover:text-black transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Get CODE
          </a>
        </div>
      </div>
    </div>
  );
}
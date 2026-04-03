import React from 'react';

export default function ConstructionTemplate({ handleMouseEnter, handleMouseLeave }) {
  const templateURL = "https://tradestemplatezh.netlify.app/";

  return (
    <div 
      className="interactive-element bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 group shadow-xl dark:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <img 
          src="/construction_template.png" 
          alt="Construction & Contractor Template Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        {/* Floating Price Tag */}
        <div className="absolute top-6 right-6 bg-amber-400 text-black px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-widest shadow-lg">
          $59 - Source Code
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-10">
        <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
          Trades - Scalable
        </h3>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-base leading-relaxed font-medium">
          Dominate your local map. Stop losing leads to outdated, slow-loading sites. This template is a high-conversion engine designed specifically for the trades. Featuring a bold, professional layout that commands respect, it’s optimized for local SEO out of the box. Every pixel is 100% adjustable to fit your brand’s DNA.
        </p>
        
        {/* Tech Tags - Adaptive Colors */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['React', 'Tailwind', 'Framer Motion'].map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 group-hover:border-amber-500/30 transition-colors duration-500">
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
            className="flex-1 border-2 border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 font-black py-3 px-6 rounded-xl hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-black transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Preview
          </a>
          
          <a 
            href={templateURL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-400 font-black py-3 px-6 rounded-xl hover:bg-amber-600 dark:hover:bg-amber-500 hover:text-white dark:hover:text-black transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            GET CODE
          </a>
        </div>
      </div>
    </div>
  );
}
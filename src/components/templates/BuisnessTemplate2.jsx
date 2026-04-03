import React from 'react';

export default function BusinessTemplate2({ handleMouseEnter, handleMouseLeave }) {
  const templateURL = "https://buissnesstemp2.netlify.app/";
  // Updated to point to your Premium Service & Wellness Gumroad link
  const gumroadURL = "https://ettaflare.gumroad.com/l/serviceandwellnesstemplate?_gl=1*1l2kfx6*_ga*MjQ5MjAwNzAuMTc3NTIzNTczNA..*_ga_6LJN6D94N6*czE3NzUyNDY2NTgkbzQkZzEkdDE3NzUyNDkzMTYkajU0JGwwJGgw";

  return (
    <div 
      className="interactive-element bg-white dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-[#4F5748]/50 transition-all duration-500 group shadow-xl dark:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <img 
          src="/buisness_template2.png" 
          alt="Business Template 2 Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 dark:opacity-80 group-hover:opacity-100"
        />
        {/* Floating Price Tag */}
        <div className="absolute top-6 right-6 bg-[#4F5748] text-white px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-widest shadow-lg">
          $59 - Source Code
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-10">
        <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight group-hover:text-[#4F5748] transition-colors duration-300">
          Universal Business
        </h3>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-base leading-relaxed font-medium">
          A modern, high-conversion foundation designed for professional services and personal brands. While styled with an organic wellness aesthetic, this template is built to be a universal "plug-and-play" engine for any business. It features ultra-clean typography, a focused lead-gen layout, and a high-legibility design that builds immediate trust with any demographic. 100% adjustable and built to scale.
        </p>
        
        {/* Tech Tags - Adaptive Colors */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['React', 'Vite', 'Tailwind', 'Universal Layout'].map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 group-hover:border-[#4F5748]/30 transition-colors duration-500">
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
            className="flex-1 border-2 border-[#4F5748] text-[#4F5748] font-black py-3 px-6 rounded-xl hover:bg-[#4F5748] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Preview
          </a>
          
          {/* UPDATED: Gumroad Overlay Button */}
          <a 
            href={gumroadURL} 
            data-gumroad-overlay-checkout="true"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#4F5748] text-[#4F5748] font-black py-3 px-6 rounded-xl hover:bg-[#4F5748] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Get Code
          </a>
        </div>
      </div>
    </div>
  );
}
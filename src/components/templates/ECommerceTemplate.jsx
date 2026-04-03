import React from 'react';

export default function ECommerceTemplate({ handleMouseEnter, handleMouseLeave }) {
  const templateURL = "https://ecommercetemplatezh.netlify.app/";

  return (
    <div 
      className="interactive-element bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden hover:border-[#D19A8E]/50 transition-all duration-500 group shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800">
        <img 
          src="/ecommerce_template.png" 
          alt="Refined Essentials E-Commerce Template Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
        />
        {/* Floating Price Tag - Terracotta Accent */}
        <div className="absolute top-6 right-6 bg-[#D19A8E] text-white px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(209,154,142,0.4)]">
          $100 - Source Code
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-10">
        <h3 className="text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-[#D19A8E] transition-colors duration-300">
          Refined Essentials
        </h3>
        
        <p className="text-zinc-400 mb-8 text-base leading-relaxed font-medium">
          Minimalist commerce for the modern era. Designed for lifestyle brands that value objects of enduring quality, this template features a massive whitespace aesthetic, immersive product grids, and a seamless slide-out cart experience. Every interaction is fueled by smooth Framer Motion transitions, providing an artisanal feel that elevates your brand beyond a standard storefront.
        </p>
        
        {/* Tech Tags - Zinc/Terracotta Accents */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['React', 'Vite', 'TypeScript', 'Tailwind'].map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-zinc-800/50 text-zinc-300 border border-zinc-700 group-hover:border-[#D19A8E]/30 transition-colors duration-500">
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Buttons - Pointing to your new Netlify URL */}
        <div className="flex gap-5">
          <a 
            href={templateURL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#D19A8E]/80 text-[#D19A8E] font-black py-3 px-6 rounded-xl hover:bg-[#D19A8E] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Preview
          </a>
          
          <a 
            href={templateURL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#D19A8E]/80 text-[#D19A8E] font-black py-3 px-6 rounded-xl hover:bg-[#D19A8E] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Get Code
          </a>
        </div>
      </div>
    </div>
  );
}
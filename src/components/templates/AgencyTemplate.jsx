import React from 'react';

export default function PremiumBusinessTemplate({ handleMouseEnter, handleMouseLeave }) {
  const templateURL = "https://premiumbuissnesstemplate.netlify.app/";

  return (
    <div 
      className="interactive-element bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden hover:border-[#616B59]/50 transition-all duration-500 group shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-950 border-b border-zinc-800">
        <img 
          src="/buisness_modern.png" 
          alt="Premium Business Template Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
        />
        {/* Floating Price Tag - Updated to Sage Green Accent */}
        <div className="absolute top-6 right-6 bg-[#616B59] text-white px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(97,107,89,0.4)]">
          $59 - Source Code
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-10">
        <h3 className="text-4xl font-bold text-white mb-4 tracking-tight group-hover:text-[#616B59] transition-colors duration-300">
          Premium Business
        </h3>
        
        <p className="text-zinc-400 mb-8 text-base leading-relaxed font-medium">
          Elevate your brand with a sophisticated, clean foundation. This isn't just a layout; it's a high-end digital experience designed for modern businesses that prioritize design and clarity. Featuring an Apple-esque architectural feel with organic textures, every pixel of this React template is 100% customizable and tailored for premium scaling.
        </p>
        
        {/* Tech Tags - Zinc/Sage Accents */}
        <div className="flex flex-wrap gap-2 mb-10">
          {['React', 'Vite', 'TypeScript', 'Tailwind'].map((tech) => (
            <span key={tech} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-md bg-zinc-800/50 text-zinc-300 border border-zinc-700 group-hover:border-[#616B59]/30 transition-colors duration-500">
              {tech}
            </span>
          ))}
        </div>
        
        {/* Action Buttons - Pointing to your Netlify URL */}
        <div className="flex gap-5">
          <a 
            href={templateURL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#616B59]/80 text-[#616B59] font-black py-3 px-6 rounded-xl hover:bg-[#616B59] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Preview
          </a>
          
          <a 
            href={templateURL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 border-2 border-[#616B59]/80 text-[#616B59] font-black py-3 px-6 rounded-xl hover:bg-[#616B59] hover:text-white transition-all duration-300 text-center uppercase tracking-widest text-sm"
          >
            Get Code
          </a>
        </div>
      </div>
    </div>
  );
}
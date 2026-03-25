import React from 'react';

export default function ConstructionTemplate({ handleMouseEnter, handleMouseLeave }) {
  return (
    <div 
      className="interactive-element bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-yellow-500 dark:hover:border-yellow-400 transition-all duration-300 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64 w-full overflow-hidden bg-gray-900 border-b border-gray-800">
        <img 
          src="/construction_template.png" 
          alt="Construction & Contractor Template Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 right-4 bg-yellow-500 text-gray-900 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide shadow-lg">
          $39
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-offWhite mb-2 font-canarias group-hover:text-yellow-500 transition-colors duration-300">
          Constructo - Local Biz
        </h3>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          A high-contrast, professional template built specifically for local contractors, plumbers, and construction companies. Built to drive local SEO and lead generation.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">React</span>
          <span className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">Tailwind</span>
          <span className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">Framer Motion</span>
        </div>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
            Preview
          </button>
          <button className="flex-1 border border-yellow-500 text-yellow-500 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500/10 transition-colors">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

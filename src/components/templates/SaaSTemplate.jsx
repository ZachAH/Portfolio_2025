import React from 'react';

export default function SaaSTemplate({ handleMouseEnter, handleMouseLeave }) {
  return (
    <div 
      className="interactive-element bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-tealGreen dark:hover:border-purple-400 transition-all duration-300 group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-64 w-full overflow-hidden bg-gray-800">
        <img 
          src="/saas_template.png" 
          alt="SaaS Dashboard Template Mockup"
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 right-4 bg-tealGreen dark:bg-purple-500 text-gray-900 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide shadow-lg">
          $49
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-offWhite mb-2 font-canarias group-hover:text-tealGreen dark:group-hover:text-purple-400 transition-colors duration-300">
          Aurora - SaaS Dashboard
        </h3>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          A premium, dark-themed React admin dashboard template. Includes beautiful charts, authentication flows, and data tables. Perfect for your next SaaS MVP.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">React</span>
          <span className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">Tailwind</span>
          <span className="text-xs px-2 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">Chart.js</span>
        </div>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-tealGreen dark:bg-purple-600 text-gray-900 dark:text-offWhite font-bold py-2 px-4 rounded-lg hover:bg-teal-400 dark:hover:bg-purple-500 transition-colors shadow-lg shadow-tealGreen/20 dark:shadow-purple-500/20">
            Preview
          </button>
          <button className="flex-1 border border-tealGreen dark:border-purple-600 text-tealGreen dark:text-purple-400 font-bold py-2 px-4 rounded-lg hover:bg-tealGreen/10 dark:hover:bg-purple-600/10 transition-colors">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

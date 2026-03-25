import React from 'react';
import SaaSTemplate from '../components/templates/SaaSTemplate';
import ECommerceTemplate from '../components/templates/ECommerceTemplate';
import AgencyTemplate from '../components/templates/AgencyTemplate';
import ConstructionTemplate from '../components/templates/ConstructionTemplate';
import freelancguide from '../assets/freelance_price_guide.pdf';

function Services({ handleMouseEnter, handleMouseLeave }) {
  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full text-center mb-16">
        <h2 
          className="font-canarias text-5xl md:text-7xl font-bold text-offWhite mb-6 neon-text-flicker"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Freelance <span className="text-tealGreen dark:text-purple-400">Services</span> & Templates
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
          Elevate your brand with premium web development solutions. From bespoke applications to high-converting landing pages, I build digital experiences that drive results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Service 1 */}
        <div 
          className="interactive-element bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:border-tealGreen dark:hover:border-purple-400 transition-all duration-300 group hover:-translate-y-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-tealGreen dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-offWhite mb-4 font-canarias">Custom Web Apps</h3>
          <p className="text-gray-400 mb-6">Fully custom, scalable web applications built with React and cutting-edge technologies. Tailored to solve your unique business challenges.</p>
          <a href="mailto:zacharywd91@yahoo.com" className="inline-block text-tealGreen dark:text-purple-400 font-semibold uppercase tracking-wider text-sm hover:underline">Let's Talk &rarr;</a>
        </div>

        {/* Service 2 */}
        <div 
          className="interactive-element bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:border-tealGreen dark:hover:border-purple-400 transition-all duration-300 group hover:-translate-y-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-tealGreen dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-offWhite mb-4 font-canarias">Business Websites</h3>
          <p className="text-gray-400 mb-6">Sleek, responsive, and high-performance websites designed to convert visitors into clients. Perfect for agencies and local businesses.</p>
          <a href={freelancguide} download="Zachary Howell - Freelance Price Guide.pdf" className="inline-block text-tealGreen dark:text-purple-400 font-semibold uppercase tracking-wider text-sm hover:underline">View Pricing Guide &rarr;</a>
        </div>

        {/* Service 3 */}
        <div 
          className="interactive-element bg-gray-900/40 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:border-tealGreen dark:hover:border-purple-400 transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute top-0 right-0 bg-tealGreen dark:bg-purple-500 text-gray-900 px-4 py-1 text-xs font-bold rounded-bl-lg uppercase tracking-wide">Popular</div>
          <div className="text-tealGreen dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-offWhite mb-4 font-canarias">Premium Templates</h3>
          <p className="text-gray-400 mb-6">Need a website right now? Browse my collection of high-quality, easily customizable templates built with React and Tailwind CSS.</p>
          <a href="#templates" className="inline-block text-tealGreen dark:text-purple-400 font-semibold uppercase tracking-wider text-sm hover:underline">View Store &rarr;</a>
        </div>
      </div>

      {/* --- Templates Showcase Section --- */}
      <div id="templates" className="max-w-6xl w-full text-center mt-32 mb-16 pt-16 border-t border-gray-800">
        <h2 
          className="font-canarias text-4xl md:text-5xl font-bold text-offWhite mb-6"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Premium <span className="text-tealGreen dark:text-purple-400">Templates</span> Store
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Skip the build time with these production-ready, beautifully designed React templates. Perfect for your next client or startup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl pb-32">
        <SaaSTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        <ECommerceTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        <AgencyTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        <ConstructionTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
      </div>
    </section>
  );
}

export default Services;

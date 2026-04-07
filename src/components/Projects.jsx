import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const projectsData = [
  {
    id: 9,
    title: "Kettle Moraine Professional Cleaners",
    category: "Small Business Web Modernization",
    description: "A complete modern redesign of a local cleaning company's website, focused on speed, clarity, and converting visitors into customers. Built with React, Tailwind, and Vite for top-tier performance.",
    csDescription: "Transformed a legacy small-business website into a high-performing, mobile-first platform. Implemented a fully modern React architecture, responsive UI components, optimized hero sections, and a clean service navigation system.",
    image: "/KMPC.webp",
    link: "https://kettlemoraineprofessionalcleaners.com/",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"]
  },
  {
    id: 7,
    title: "Upper Crust Pizza",
    category: "Digital Transformation",
    isDevelopment: true,
    description: "A fully responsive React + Vite + Tailwind website built for a real Milwaukee-area pizzeria, featuring intuitive navigation, dynamic menu sections, and an embedded Google Map. Includes a custom CMS admin dashboard.",
    csDescription: "Designed and launched a modern digital storefront to increase online visibility, improve ordering convenience, and drive repeat customers. Implemented responsive UI and optimized load speeds.",
    image: "/pizza.webp",
    link: "https://uppercrustpizza.netlify.app/",
    tags: ["React", "TailwindCss", "Typescript", "Firebase"]
  },
  {
    id: 5,
    title: "Saved & Sent",
    category: "E-Commerce Platform",
    isDevelopment: true,
    description: "An e-commerce site for a local Christian based apparel company, built with custom CMS features and Stripe integration.",
    csDescription: "Built a custom e-commerce platform with an integrated CMS for easy product management and Stripe for secure payment processing. The solution streamlined operations and provided a seamless shopping experience.",
    image: "/saved&sent.png",
    link: "https://savedandsent.netlify.app/",
    tags: ["React", "Node.js", "Firebase", "Stripe"]
  },
  {
    id: 1,
    title: "Claw and Decay Clothing",
    category: "Scalable E-commerce",
    description: "My fullstack e-commerce site for my clothing brand, using Node.js and Stripe for payment processing.",
    csDescription: "Engineered and deployed an integrated e-commerce platform. Optimized checkout flows and created support documentation for efficient CS team handoff.",
    image: "/CAD.webp",
    link: "https://clawanddecay.com/",
    tags: ["React", "Node.js", "Firebase", "Stripe"]
  },
  {
    id: 2,
    title: "Futuristic Local Business Template",
    category: "Commercial SaaS Template",
    description: "A premium, high-performance web architecture tailored for local buisnesses, featuring a dynamic 'Futuristic-to-Professional' theme toggle and GSAP-powered animations.",
    csDescription: "Developed a custom-engineered 'Theme Engine' with GSAP-powered animations and dynamic CSS variable injection, enabling a seamless 'Futuristic-to-Professional' aesthetic toggle for end-users.",
    image: "/saas_template.png", // Update to your new screenshot
    link: "https://futuristiclocal.netlify.app/", // Use your live demo link here
    tags: ["React", "TypeScript", "GSAP", "Tailwind CSS v4"]
  },
  {
    id: 6,
    title: "Contractor & Trades Template",
    category: "Premium Web Template",
    description: "A high-performance, landing page template designed specifically for local trades.",
    csDescription: "Engineered a high-performance conversion engine for local service providers, featuring a mobile-first architecture and schema markup integration that boosts local SEO visibility. Every component is modularized for 100% brand scalability, ensuring zero layout shift during theme transitions.",
    image: "/construction_template.png",
    link: "https://tradestemplatezh.netlify.app/",
    tags: ["React", "TypeScript", "Tailwind CSS", "GSAP"]
  }
];

const Projects = ({ handleMouseEnter, handleMouseLeave }) => {
  const [viewMode, setViewMode] = useState('DEV');

  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-accent-orange uppercase mb-4 inline-block">Professional Highlights</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-text-primary uppercase"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Client <span className="text-gradient">Work</span>.
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12">
            View Some of my most recent work for clients across a variety of industries. Through different lenses of technical development and client success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setViewMode('DEV')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 w-full sm:w-auto ${
                viewMode === 'DEV'
                ? 'bg-sunset-gradient text-white shadow-lg shadow-accent-red/20 scale-105'
                : 'glass text-text-secondary hover:text-text-primary'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Technical Developer 🛠️
            </button>
            <button
              onClick={() => setViewMode('CS')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 w-full sm:w-auto ${
                viewMode === 'CS'
                ? 'bg-sunset-gradient text-white shadow-lg shadow-accent-red/20 scale-105'
                : 'glass text-text-secondary hover:text-text-primary'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Client Success 🤝
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              viewMode={viewMode}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

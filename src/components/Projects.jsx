import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

// ── TRUST NOTES ───────────────────────────────────────────
// `location` shows under each card as a map-pin pill so visitors
//   see these are real local businesses, not stock examples.
// `testimonial` is conditionally rendered. Leave as null until you
//   have permission to publish a real quote. Shape:
//     { quote: "...", author: "Jane D.", role: "Owner, ACME Co." }
// `isTemplate` flags commercial templates so we don't imply they
//   are paid client engagements.
const projectsData = [
  {
    id: 9,
    title: "Kettle Moraine Professional Cleaners",
    category: "Custom Business Website",
    location: "West Bend, WI",
    description: "A complete modern redesign of a local cleaning company's website, focused on speed, clarity, and converting visitors into customers. Built with React, Tailwind, and Vite for top-tier performance.",
    csDescription: "Transformed a legacy small-business website into a high-performing, mobile-first platform. Implemented a fully modern React architecture, responsive UI components, optimized hero sections, and a clean service navigation system.",
    image: "/KMPC.webp",
    link: "https://dev-site--kmpc.netlify.app/",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    testimonial: null, // TODO: add real client quote when available
  },
  {
    id: 7,
    title: "Upper Crust Pizza",
    category: "Custom Dynamic + CMS Build",
    location: "Milwaukee, WI",
    isDevelopment: true,
    description: "A fully responsive React + Vite + Tailwind website built for a real Milwaukee-area pizzeria, featuring intuitive navigation, dynamic menu sections, and an embedded Google Map. Includes a custom CMS admin dashboard.",
    csDescription: "Designed and launched a modern digital storefront to increase online visibility, improve ordering convenience, and drive repeat customers. Implemented responsive UI and optimized load speeds.",
    image: "/pizza.webp",
    link: "https://uppercrustpizza.netlify.app/",
    tags: ["React", "TailwindCss", "Typescript", "Firebase"],
    testimonial: null, // TODO: add real client quote when available
  },
  {
    id: 5,
    title: "Saved & Sent",
    category: "Custom E-Commerce Platform",
    location: "Milwaukee, WI",
    isDevelopment: true,
    description: "An e-commerce site for a local Christian based apparel company, built with custom CMS features and Stripe integration.",
    csDescription: "Built a custom e-commerce platform with an integrated CMS for easy product management and Stripe for secure payment processing. The solution streamlined operations and provided a seamless shopping experience.",
    image: "/saved&sent.webp",
    link: "https://savedandsent.netlify.app/",
    tags: ["React", "Node.js", "Firebase", "Stripe"],
    testimonial: null, // TODO: add real client quote when available
  },
  {
    id: 11,
    title: "Gutters Craft LLC",
    category: "Custom Business Website",
    isDevelopment: true,
    location: "New Berlin, WI",
    description: "A high-conversion service platform featuring a streamlined lead-generation funnel and a custom-built estimate request system for local homeowners.",
    csDescription: "Developed a performance-focused service site with a focus on local SEO and mobile-first lead capture. Implemented custom forms and interactive service mapping to drive customer inquiries.",
    image: "/gutterscraftllc.webp",
    link: "https://gutterscraftllc.com/", // Update this if you have a different production/preview link
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    testimonial: null,
  },
  {
    id: 10,
    title: "Claw and Decay",
    category: "Custom E-Commerce Storefront",
    location: "Remote / National",
    description: "The official storefront for an alternative apparel brand, prioritizing dark-mode aesthetics, high-impact visual storytelling, and smooth micro-interactions.",
    csDescription: "Engineered a high-fidelity e-commerce experience using GSAP for sophisticated animations and Vite for near-instant load times. Focused on maintaining brand identity through custom UI components and unique product layouts.",
    image: "/clawanddecay.webp",
    link: "https://clawanddecay.com/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 11,
    title: "Commercial Forestry",
    category: "Nationwide Forestry Services",
    location: "Remote / National",
    description: "A modern, performance-optimized website for a nationwide forestry services company, featuring a clean design, clear service descriptions, and strong calls to action.",
    csDescription: "Built a high-impact digital presence for a commercial forestry company, utilizing React and Tailwind CSS to create a visually compelling and user-friendly site. Implemented custom animations and interactive elements to engage visitors and drive inquiries.",
    image: "/commerciallogging.jpg",
    link: "https://gertchmockup.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 12,
    title: "Maison Boutique",
    category: "E-commerce Storefront",
    location: "Remote / National",
    description: "A sleek online storefront for a boutique fashion brand, designed to showcase products with high-quality visuals and smooth user interactions.",
    csDescription: "Developed a visually stunning e-commerce site for a boutique fashion brand, leveraging GSAP for dynamic animations and Vite for optimal performance. The design emphasizes product imagery and provides an intuitive shopping experience.",
    image: "/boutique.jpg",
    link: "https://ecommercetemplatezh.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  }
];

const Projects = ({ handleMouseEnter, handleMouseLeave }) => {
  const [viewMode, setViewMode] = useState('DEV');
  const [isMobile, setIsMobile] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const updateIsMobile = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateIsMobile);

    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  const initialVisibleProjects = isMobile ? 2 : 3;
  const visibleProjects = showAllProjects
    ? projectsData
    : projectsData.slice(0, initialVisibleProjects);
  const shouldShowToggle = projectsData.length > initialVisibleProjects;

  const handleProjectsToggle = () => {
    if (showAllProjects) {
      setShowAllProjects(false);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    setShowAllProjects(true);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <span className="text-sm font-bold tracking-widest text-accent-orange uppercase mb-4 inline-block">Wisconsin Built · Publicly Live</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-text-primary uppercase"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Custom <span className="text-gradient">Builds</span>.
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Hand-coded websites built from scratch for real Wisconsin businesses. No templates, no page builders — just clean React code, fast load times, and real results. Click through and see them live.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-text-secondary dark:text-zinc-300 uppercase mb-12">
            Every project is publicly live and verifiable. Keep in mind some of these are still in development, so you may see work-in-progress elements or placeholder content.
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setViewMode('DEV')}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 w-full sm:w-auto ${
                viewMode === 'DEV'
                ? 'bg-sunset-gradient text-white shadow-lg shadow-accent-red/20 scale-105'
                : 'glass text-text-secondary dark:text-zinc-300 hover:text-text-primary dark:hover:text-white'
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
                : 'glass text-text-secondary dark:text-zinc-300 hover:text-text-primary dark:hover:text-white'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Client Success 🤝
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {visibleProjects.map((project, index) => (
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

        {shouldShowToggle && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleProjectsToggle}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-obsidian-950/60 border border-obsidian-700/10 dark:border-white/10 text-text-primary font-bold tracking-wide shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-0.5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {showAllProjects ? 'Show Less' : 'See More Builds'}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAllProjects ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Additional notes for future testimonial implementation:
// testimonial: {
//   quote: "Zach rebuilt our site in two days and our leads doubled the next week.",
//   author: "Jane Doe",
//   role: "Owner, KMPC"
// }

export default Projects;

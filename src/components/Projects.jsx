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
    isDevelopment: true,
    description: "A modern, performance-optimized website for a nationwide forestry services company, featuring a clean design, clear service descriptions, and strong calls to action.",
    image: "/commerciallogging.jpg",
    link: "https://gertchmockup.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 12,
    title: "Maison Boutique",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A sleek online storefront for a boutique fashion brand, designed to showcase products with high-quality visuals and smooth user interactions.",
    image: "/boutique.jpg",
    link: "https://ecommercetemplatezh.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 13,
    title: "Brutalist Steetwear",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A butalist-inspired e-commerce template for a streetwear brand, featuring bold typography, high-contrast design, and dynamic animations to create a memorable shopping experience.",
    image: "/brutalist_template.webp",
    link: "https://brutalistecommerce.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 14,
    title: "Modern Buisness",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A modern template for local businesses, featuring a clean design, clear service sections, and strong calls to action. Perfect for small companies looking to establish a professional online presence quickly.",
    image: "/buisness_modern.webp",
    link: "https://premiumbuissnesstemplate.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 15,
    title: "Portfolio",
    category: "Buisness Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A premium portfolio template designed for creatives and professionals looking to showcase their work with a modern, visually engaging design and smooth user experience.",
    image: "/coach_template.webp",
    link: "https://influencertemplate.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 17,
    title: "Modern Trades",
    category: "Trades Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A lead geneeration template for local trades businesses, featuring clear service sections, strong calls to action, and a design that builds trust with potential customers.",
    image: "/construction_template.webp",
    link: "https://tradestemplatezh.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 18,
    title: "Rusty Fork",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A beautiful Restaurant template built with React, Tailwind CSS, and Vite. Perfect for local eateries looking to establish a strong online presence with a modern design and smooth user experience.",
    image: "restaurant_template.webp",
    link: "https://restauranttemplate01.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 19,
    title: "Lawfirm",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A professional template designed for law firms and attorneys, featuring a clean layout, clear service sections, and strong calls to action to help convert visitors into clients.",
    image: "legal_template.webp",
    link: "https://lawfirmtemplate.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 20,
    title: "Real Estate",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A modern template designed for real estate agents and agencies, featuring a clean layout, clear property sections, and strong calls to action to help convert visitors into clients.",
    image: "realestate_template.webp",
    link: "https://realestatetemplatelux.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 21,
    title: "Home Services",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A lead generation template for home services businesses, featuring clear service sections, strong calls to action, and a design that builds trust with potential customers.",
    image: "hero_service_template.webp",
    link: "https://homeservicetemplatelocal.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 22,
    title: "Services",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A lead generation template for service-based businesses, featuring clear service sections, strong calls to action, and a design that builds trust with potential customers.",
    image: "services.png",
    link: "https://buildservicetemplate.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 23,
    title: "Wisconsin Rustic",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A rustic-themed template designed for Wisconsin-based businesses, featuring a warm color palette, textured backgrounds, and a design that evokes the charm of the Midwest.",
    image: "rustic.png",
    link: "https://saucemockup.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
  {
    id: 24,
    title: "Wisconsin Hobby Shop",
    category: "Template",
    location: "Remote / National",
    isDevelopment: false,
    isTemplate: true, // This is a commercial template, not a client project
    description: "A hobby shop template designed to grab customer's attention and turn browsers into customers.",
    image: "card.png",
    link: "https://nexgencards.netlify.app/",
    tags: ["TypeScript", "GSAP", "Vite", "Tailwind CSS"],
    testimonial: null,
  },
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

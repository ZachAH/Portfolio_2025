import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

// Project Data - Reframed for dual-persona view
const projectsData = [
  {
    id: 9,
    title: "Kettle Moraine Professional Cleaners",
    description:
      "A complete modern redesign of a local cleaning company's website, focused on speed, clarity, and converting visitors into customers. Built with React, Tailwind, and Vite for top-tier performance.",
    csTitle: "Small Business Web Modernization & UX Optimization",
    csDescription:
      "Transformed a legacy small-business website into a high-performing, mobile-first platform. Implemented a fully modern React architecture, responsive UI components, optimized hero sections, and a clean service navigation system. Focused on improving trust, readability, and user flow to boost customer contact rates.",
    labels: ["Client Website", "Freelance Build", "Business Redesign"],
    solutionBriefLink: "/solutions/kml-cleaners",
    imageUrl: "/KMPC.webp",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    liveLink: "https://kettlemoraineprofessionalcleaners.com/",
    repoLink: "https://github.com/ZachAH/KML",
    status: "Finished",
  },

  {
    id: 7,
    title: "Upper Crust Pizza",
    description:
      "A fully responsive React + Vite + Tailwind website built for a real Milwaukee-area pizzeria, featuring intuitive navigation, dynamic menu sections, and an embedded Google Map. The site includes a custom CMS admin dashboard powered by Firebase and Firestore, allowing the owner to update content, manage the menu, and make real-time changes—no code required.",
    csTitle: "Digital Transformation for Local Business Growth",
    csDescription:
      "Designed and launched a modern digital storefront to increase online visibility, improve ordering convenience, and drive repeat customers. Implemented responsive UI, clear menu browsing paths, and optimized load speeds — enhancing customer engagement and supporting the client’s marketing efforts.",
    labels: ["Client Website", "Freelance Build", "Business Redesign"],
    solutionBriefLink: "/solutions/restaurant-digital-presence",
    imageUrl: "/pizza.webp",
    technologies: ["React", "TailwindCss", "Typescript", "Firebase/Firestore", "Netlify"],
    liveLink: "https://uppercrustpizza.netlify.app/",
    repoLink: "https://github.com/ZachAH/UpperCrust",
    status: "In Development",
  },

  {
    id: 5,
    title: "Saved & Sent",
    description:
      "An e-commerce site for a local Christain based apparel company, built with custom CMS features and Stripe integration.",
    csTitle: "E-Commerce Platform with Custom CMS & Payment Integration",
    csDescription:
      "Built a custom e-commerce platform with an integrated CMS for easy product management and Stripe for secure payment processing. The solution streamlined operations for the client and provided a seamless shopping experience for customers.",
    labels: ["Client Website", "Freelance Build"],
    solutionBriefLink: "/solutions/chatterbox-triage",
    imageUrl: "/saved&sent.png",
    technologies: ["React", "Node.js", "Firebase", "Stripe", "Netlify", "Sanity.io"],
    liveLink: "https://savedandsent.netlify.app/",
    repoLink: "https://github.com/ZachAH/CCCLLC/tree/main",
    status: "In Development",
  },

  {
    id: 1,
    title: "Claw and Decay Clothing",
    description:
      "My fullstack e-commerce site for my clothing brand, using Node.js and Stripe for payment processing.",
    csTitle: "Scalable E-commerce Solution & Onboarding",
    csDescription:
      "Engineered and deployed an integrated e-commerce platform. Success was measured by optimizing checkout flows and creating support documentation for efficient CS team handoff.",
    labels: ["Client Website", "Freelance Build", "Business Redesign"],
    solutionBriefLink: "/solutions/clawanddecay",
    imageUrl: "/CAD.webp",
    technologies: ["React", "Node.js", "Firebase", "Stripe", "Netlify"],
    liveLink: "https://clawanddecay.com/",
    repoLink: "https://github.com/ZachAH/clawanddecay",
    status: "Finished",
  },

  {
    id: 2,
    title: "Portfolio 2025 (React/Tailwind)",
    description:
      "An updated portfolio built with modern performance in mind (Vite, React, Tailwind).",
    csTitle: "Internal Tool: Dynamic Persona Management",
    csDescription:
      "Developed architecture that dynamically serves content based on user type (DEV vs. CS Manager), demonstrating an ability to segment and tailor technical information.",
    labels: ["Brand Transformation"],
    solutionBriefLink: "/solutions/portfolio-persona",
    imageUrl: "/portfolio25.webp",
    technologies: ["React", "Node.js", "Tailwind CSS", "Vite"],
    liveLink: "https://zhowellportfolio.netlify.app",
    repoLink: "https://github.com/ZachAH/Portfolio_2025",
    status: "Finished",
  },
  {
    id: 6,
    title: "Interview Prep (Technical Readiness Tool)",
    description:
      "An application built to study and prepare for a wide range of interview questions.",
    csTitle: "Standardized Technical Team Onboarding",
    csDescription:
      "Created an application to standardize and measure the readiness of new technical specialists, reducing training overhead and improving consistency.",
    labels: ["Developer Tool", "Training Utility"],
    solutionBriefLink: "/solutions/onboarding-readiness",
    imageUrl: "/interview.png",
    technologies: ["React", "TailwindCss"],
    liveLink: "https://interviewhelper92.netlify.app/",
    repoLink: "https://github.com/ZachAH/Interview_Prep",
    status: "Finished",
  },
];

export default function Projects({ handleMouseEnter, handleMouseLeave }) {
  // Default to Developer as primary audience
  const [viewMode, setViewMode] = useState('DEV');

  const buttonClass = (mode) =>
    `px-6 py-2 rounded-full font-semibold transition-all duration-300 
    transform hover:scale-105 shadow-sm border
    ${viewMode === mode
      ? 'bg-teal-600 text-white border-teal-600 dark:bg-teal-500 dark:border-teal-500'
      : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
    }`;

  return (
    <section id="projects" className="py-20 px-6 bg-transparent dark:bg-transparent">
      <div className="container mx-auto">
        {/* Section heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-offWhite dark:text-offWhite mb-2">
          Client Work & Freelance Builds
        </h2>
        <p className="text-center text-gray-400 mb-8">
          View my work from different professional lenses:
        </p>

        {/* Role Switcher */}
        <div className="flex justify-center gap-4 mb-14">
          <button
            onClick={() => setViewMode('DEV')}
            className={buttonClass('DEV')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Technical Developer 🛠️
          </button>

          <button
            onClick={() => setViewMode('CS')}
            className={buttonClass('CS')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Customer Success 🤝
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
}

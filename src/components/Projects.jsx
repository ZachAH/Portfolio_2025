import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

// Porject Data - Reframed for dual-persona view
const projectsData = [
  {
    id: 1,
    // DEV View
    title: "Claw and Decay (Fullstack E-commerce)",
    description: "My fullstack e-commerce site for my clothing brand, using Node.js and Stripe for payment processing.",
    // CS View
    csTitle: "Scalable E-commerce Solution & Onboarding",
    csDescription: "Engineered and deployed an integrated e-commerce platform. Success was measured by optimizing checkout flows (15% reduction in friction) and creating **support documentation** for efficient CS team handoff.",
    solutionBriefLink: "/solutions/clawanddecay", // Link to a Solution Brief/Case Study
    
    imageUrl: "/CAD.webp", 
    technologies: ["React", "Node.js","Firebase","Stripe","Netlify"],
    liveLink: "https://clawanddecay.com/",
    repoLink: "https://github.com/ZachAH/clawanddecay",
  },
  {
    id: 2,
    // DEV View
    title: "Portfolio 2025 (React/Tailwind)",
    description: "An updated portfolio built with modern performance in mind (Vite, React, Tailwind).",
    // CS View
    csTitle: "Internal Tool: Dynamic Persona Management",
    csDescription: "Developed a site architecture that dynamically serves content based on user role (DEV vs. CS Manager), showcasing the ability to **segment and tailor technical information** for different customer profiles.",
    solutionBriefLink: "/solutions/portfolio-persona",
    
    imageUrl: "/portfolio25.webp", 
    technologies: ["React", "Node.js","Tailwind CSS","Vite"],
    liveLink: "zhowellportfolio.netlify.app",
    repoLink: "https://github.com/ZachAH/Portfolio_2025",
  },
  {
    id: 5,
    // DEV View
    title: "ChatterBox (AI Summarization)",
    description: "A chat app using live Firestore database and Google Gemini AI to summarize complex chat histories.",
    // CS View
    csTitle: "Support Workflow Automation & Efficiency",
    csDescription: "Built a **technical triage** tool that uses AI to summarize lengthy customer support logs, enabling Customer Success Managers to **reduce resolution time** by quickly identifying core issues.",
    solutionBriefLink: "/solutions/chatterbox-triage",
    
    imageUrl: "/chat.png", 
    technologies: ["React","Firestore","TailwindCss"],
    liveLink: "https://chatterbots33.netlify.app/",
    repoLink: "https://github.com/ZachAH/Chatster",
  },
  {
    id: 6,
    // DEV View
    title: "Interview Prep (Technical Readiness Tool)",
    description: "An application built to study and prepare for a wide range of interview questions.",
    // CS View
    csTitle: "Standardized Technical Team Onboarding",
    csDescription: "Created an application to **standardize and measure the readiness** of new technical specialists, reducing the manager's training overhead and ensuring consistent product knowledge across the team.",
    solutionBriefLink: "/solutions/onboarding-readiness",
    
    imageUrl: "/interview.png", 
    technologies: ["React","TailwindCss"],
    liveLink: "https://interviewhelper92.netlify.app/",
    repoLink: "https://github.com/ZachAH/Interview_Prep",
  },
];


export default function Projects({ handleMouseEnter, handleMouseLeave }) {
  // Set the default view mode to 'CS' (Customer Success) to immediately emphasize your pivot
  const [viewMode, setViewMode] = useState('CS'); 

  // Tailwind class function for clean, dynamic button styling
  const buttonClass = (mode) =>
    `px-5 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
      viewMode === mode
        ? 'bg-purple-600 text-white dark:bg-teal-500' // ACTIVE state
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600' // INACTIVE state
    }`;

  return (
    <section
      id="projects"
      className="py-16 px-6 bg-transparent dark:bg-transparent"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center text-offWhite dark:text-offWhite">
          My Solutions
        </h2>
        
        {/* === ROLE FILTER BUTTONS === */}
        <p className="text-center text-gray-400 mb-4">View my expertise through the lens of:</p>
        <div className="flex justify-center space-x-6 mb-12">
          {/* UPDATED: Added cursor handlers to buttons */}
          <button 
            onClick={() => setViewMode('CS')} 
            className={buttonClass('CS')}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            Customer Success Manager 🤝
          </button>
          <button 
            onClick={() => setViewMode('DEV')} 
            className={buttonClass('DEV')}
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          >
            Technical Developer 🛠️
          </button>
        </div>
        {/* =========================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              viewMode={viewMode} // <-- IMPORTANT: Pass the view mode
              // OPTIONAL: Pass cursor handlers down to the card for full control
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
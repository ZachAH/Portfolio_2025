// src/components/Projects.jsx
import React from 'react';
import ProjectCard from './ProjectCard'; // Assuming ProjectCard.jsx is in the same folder

// Example Project Data (move to a separate file or define here)
const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    imageUrl: "/joe.jpeg", // Using an existing image for placeholder
    description: "A full-featured online store with a custom CMS and payment gateway integration.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveLink: "#",
    repoLink: "#",
  },
  {
    id: 2,
    title: "Personal Portfolio 2022",
    imageUrl: "/portfolioV1.png", // Using an existing image for placeholder
    description: "A dynamic personal portfolio to showcase skills and projects, built with modern web tech.",
    technologies: ["Firebase","Gatsby", "React", "Bootstrap", "JavaScript"],
    liveLink: "https://zhportfolio.netlify.app",
    repoLink: "https://github.com/ZachAH/Portfolio-Version-1-2022",
  },
  {
    id: 3,
    title: "Task Management App",
    imageUrl: "/joey.webp", // Using an existing image for placeholder
    description: "A collaborative tool to manage tasks, deadlines, and team assignments.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    liveLink: "#",
    repoLink: "#",
  },
  // Add more projects... make sure you have enough to scroll
];


export default function Projects() {
  return (
    // Adjusted for dark mode, consistent padding
    <section id="projects" className="py-16 px-6 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-gray-800 dark:text-offWhite">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Increased gap */}
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
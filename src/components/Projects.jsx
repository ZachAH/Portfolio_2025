import React from 'react';
import ProjectCard from './ProjectCard';

// Porject Data
const projectsData = [
  {
    id: 1,
    title: "Portfolio 2025",
    imageUrl: "/portfolio25.png", 
    description: "An Upadated portfolio since my last one was years old!.",
    technologies: ["React", "Node.js","Tailwind CSS","Vite"],
    liveLink: "zhowellportfolio.netlify.app",
    repoLink: "https://github.com/ZachAH/Portfolio_2025",
  },
  {
    id: 2,
    title: "Personal Portfolio 2022",
    imageUrl: "/portfolioV1.png", 
    description: "A dynamic personal portfolio to showcase skills and projects, built with modern web tech.",
    technologies: ["Firebase","Gatsby", "React", "Bootstrap", "JavaScript"],
    liveLink: "https://zhportfolio.netlify.app",
    repoLink: "https://github.com/ZachAH/Portfolio-Version-1-2022",
  },
  {
    id: 3,
    title: "Weather App",
    imageUrl: "/weather.png", 
    description: "A simple weather app utilizing React and third party api's",
    technologies: ["React"],
    liveLink: "https://zachsreactfulweather.netlify.app/",
    repoLink: "https://github.com/ZachAH/Reactful-Weather",
  },
  // need to add more projects
];


export default function Projects() {
  return (
    <section
      id="projects"
      // Light mode: still transparent (as it was before, to show particle canvas)
      // Dark mode: also transparent to show the html.dark background (rock.png + rain)
      className="py-16 px-6 bg-transparent dark:bg-transparent" // Changed dark:bg-gray-900 to dark:bg-transparent
    >
      <div className="container mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-offWhite dark:text-offWhite">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
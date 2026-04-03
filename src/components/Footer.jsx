import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaEnvelope } from 'react-icons/fa';
import { SiTailwindcss, SiFramer, SiVite } from 'react-icons/si';

const Footer = ({ handleMouseEnter, handleMouseLeave }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/ZachAH", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/zach-howell-189118210/", label: "LinkedIn" },
    { icon: <FaEnvelope />, href: "mailto:zacharywd91@yahoo.com", label: "Email" }
  ];

  const techStack = [
    { icon: <FaReact />, label: "React" },
    { icon: <SiTailwindcss />, label: "Tailwind" },
    { icon: <SiFramer />, label: "Framer" },
    { icon: <FaNodeJs />, label: "Node.js" },
    { icon: <SiVite />, label: "Vite" }
  ];

  return (
    <footer className="py-20 px-6 md:px-12 lg:px-24 bg-white dark:bg-obsidian-950 border-t border-obsidian-700/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-2xl font-bold tracking-tighter mb-4 flex items-center group">
            <span className="w-8 h-8 rounded-lg bg-sunset-gradient flex items-center justify-center mr-2 text-white text-xs">ZH</span>
            <span className="text-text-primary">Zach Howell</span>
          </div>
          <p className="text-text-secondary text-sm max-w-xs font-medium leading-relaxed">
            Designing and developing world-class digital experiences for the modern web.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-6">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target={social.label !== 'Email' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-xl text-text-primary hover:text-accent-orange hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 py-2 px-6 glass rounded-full border border-obsidian-700/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Powered By</span>
            <div className="flex items-center gap-3 text-text-secondary/60">
              {techStack.map((tech, i) => (
                <div key={i} className="text-lg hover:text-accent-orange transition-colors cursor-help" title={tech.label}>
                  {tech.icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-text-secondary text-sm font-medium mb-2">Developed with ❤️ and Precision</p>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary/40">
            &copy; {currentYear} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
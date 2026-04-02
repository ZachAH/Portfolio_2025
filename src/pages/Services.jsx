import React from 'react';
import { motion } from 'framer-motion';
import SaaSTemplate from '../components/templates/SaaSTemplate';
import ECommerceTemplate from '../components/templates/ECommerceTemplate';
import AgencyTemplate from '../components/templates/AgencyTemplate';
import ConstructionTemplate from '../components/templates/ConstructionTemplate';
import DigitalSolutionsImg from '../assets/digital_solutions.png';
//import freelancguide from '../assets/freelance_price_guide.pdf';

const Services = ({ handleMouseEnter, handleMouseLeave }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const services = [
    {
      title: "Full-Cycle Development",
      description: "From the first line of code to the final deployment. I build scalable React applications with robust backends and seamless integration.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      tags: ["React", "Node.js", "API Design"]
    },
    {
      title: "Assets & Infrastructure",
      description: "I manage the entire setup: purchasing your domain (URL), configuring SSL certificates, and setting up professional hosting environments.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      tags: ["Domains", "Hosting", "Security"]
    },
    {
      title: "SEO & Performance",
      description: "Optimization is built-in, not bolted on. I ensure your site ranks high on search engines and maintains lightning-fast load speeds.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      tags: ["SEO", "Core Web Vitals", "Analytics"]
    },
    {
      title: "WCAG Accessibility",
      description: "Digital inclusivity is a priority. I build for everyone, ensuring your platform meets WCAG guidelines and remains accessible to all users.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      tags: ["Accessibility", "WCAG 2.1", "Inclusive Design"]
    }
  ];

  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="text-sm font-bold tracking-widest text-accent-orange uppercase mb-4 inline-block">Professional Expertise</span>
          <h1 className="heading-hero mb-8 text-text-primary"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Start to <span className="text-gradient">Finish</span>.
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-medium">
            I don’t just write code. I manage the entire lifecycle—from domain registration and development to SEO optimization and global deployment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-32"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-10 rounded-[3rem] flex flex-col group hover:shadow-premium-hover transition-all duration-500 hover:-translate-y-2 active:scale-95 border-b-2 border-transparent hover:border-accent-orange/20"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-obsidian-950 flex items-center justify-center text-accent-orange mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-obsidian-700/10">
                {service.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 tracking-tight group-hover:text-accent-orange transition-colors duration-300 pointer-events-none">{service.title}</h3>
              <p className="text-text-secondary text-sm mb-8 leading-relaxed font-medium flex-grow pointer-events-none">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase font-bold tracking-widest text-text-secondary/60 bg-obsidian-700/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Strategy Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-20 rounded-[3.5rem] mb-32 relative overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-text-primary">
                Every detail, <span className="text-gradient">handled</span>.
              </h2>
              <p className="text-xl text-text-secondary font-medium leading-relaxed mb-8">
                I provide a complete white-glove service. You bring the vision, and I handle the technical complexity from domain purchase to global scale. 
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Domain Acquisition", "SEO Strategy", "WCAG Compliance", "CI/CD Management", "SSL Security", "Cloud Hosting"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-text-primary font-bold">
                    <div className="w-5 h-5 rounded-full bg-accent-orange/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-accent-orange" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] bg-sunset-gradient opacity-10 blur-[60px] absolute inset-0 animate-pulse" />
                <div className="relative glass p-8 rounded-[3rem] border border-obsidian-700/10 shadow-premium">
                   <div className="flex flex-col gap-6">
                      <div className="space-y-2">
                        <div className="h-2 w-32 bg-accent-orange/40 rounded-full" />
                        <div className="h-2 w-48 bg-text-secondary/20 rounded-full" />
                      </div>
                      <div className="h-40 w-full overflow-hidden rounded-2xl flex items-center justify-center relative group/img">
                        <img 
                          src={DigitalSolutionsImg} 
                          alt="Digital Solutions" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                      </div>
                      <button className="w-full py-4 bg-sunset-gradient text-white rounded-2xl font-bold text-sm shadow-lg shadow-accent-red/20">
                         Get Started Today
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Templates Store Section */}
        <div id="templates" className="pt-32 border-t border-obsidian-700/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="heading-section mb-6 text-text-primary">
              Premium <span className="text-gradient">Templates</span> Store
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium">
              Start your next major project immediately with these production-ready React layouts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-32">
            <SaaSTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
            <ECommerceTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
            <AgencyTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
            <ConstructionTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

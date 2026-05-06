import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { servicesSchema, breadcrumb } from '../utils/structuredData';

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    servicesSchema,
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
  ],
};

const LighthouseWidget = () => {
  const scores = [
    { label: 'Performance', score: 98 },
    { label: 'Accessibility', score: 97 },
    { label: 'Best Practices', score: 99 },
    { label: 'SEO', score: 100 },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center gap-3 px-1 py-2">
      <p className="text-[9px] font-black tracking-[0.2em] text-zinc-400 dark:text-text-secondary/85 uppercase">
        Lighthouse Audit Results
      </p>
      {scores.map(({ label, score }, i) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-wide text-zinc-500 dark:text-text-secondary w-[90px] shrink-0 leading-tight">
            {label}
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-accent-orange"
              initial={{ width: 0 }}
              whileInView={{ width: `${score}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <motion.span
            className="text-xs font-black text-accent-orange w-8 text-right tabular-nums"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18 + 0.9 }}
          >
            {score}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

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
      description: "High-performance React applications built for speed. From fluid GSAP animations to robust backends, I handle the entire codebase with a focus on scalability.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      tags: ["React", "GSAP", "Tailwind", "Vite"]
    },
    {
      title: "UI/UX & Identity",
      description: "Modern, high-impact design tailored to your brand. I focus on creating intuitive user journeys and stunning visuals that turn visitors into loyal customers.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      tags: ["Figma", "Branding", "Visual Identity"]
    },
    {
      title: "Assets & Infrastructure",
      description: "Complete technical foundation with 100% client ownership. I manage Porkbun domain procurement, SSL, and lightning-fast Netlify deployment.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      tags: ["Porkbun", "Netlify", "Full Ownership"]
    },
    {
      title: "SEO, AI Visibility & Analytics",
      description: "Visibility built for the next generation of search. I handle sitemap.xml submissions, meta-updates, and advanced JSON-LD schema to ensure your business ranks on Google and gets cited by AI search engines, all backed by GA4 analytics to track your ROI and customer behavior.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      tags: ["GA4 Analytics", "AI Search (GEO)", "JSON-LD Schema", "Sitemaps & Meta"]
    },
    {
      title: "WCAG Accessibility",
      description: "Inclusivity as a standard, not an option. I ensure your platform is WCAG 2.1 compliant, screen-reader friendly, and accessible to everyone from day one.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      tags: ["Accessibility", "WCAG 2.1", "Inclusive Design"]
    }
  ];

  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-transparent">
      <Seo
        title="Wisconsin Web Development Services | React, SEO, Hosting & E-commerce — Zach Howell"
        description="Full-cycle web development services for Wisconsin small businesses: custom React websites, e-commerce with Stripe, SEO & Core Web Vitals optimization, hosting, DNS management, and WCAG accessibility. Serving Milwaukee, Madison, Waukesha, and beyond."
        path="/services"
        keywords="web development services Wisconsin, React developer Milwaukee, custom website development Waukesha, SEO services Wisconsin, e-commerce development Milwaukee, small business web design Madison WI, web hosting Wisconsin, DNS management Milwaukee, WCAG accessibility Wisconsin, Core Web Vitals optimization"
        jsonLd={servicesJsonLd}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <span className="text-sm font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">Professional Expertise</span>
          <h1 className="heading-hero mb-8 text-zinc-900 dark:text-white uppercase"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Start to <span className="text-gradient">Finish</span>.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto font-medium leading-relaxed">
            I don’t just write code. I manage the entire lifecycle—from domain registration and UI design to SEO optimization and global deployment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6 mb-32"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white dark:bg-obsidian-900/40 border border-zinc-200 dark:border-obsidian-800 shadow-sm hover:shadow-premium-hover transition-all duration-500 hover:-translate-y-2 active:scale-95 border-b-2 border-b-transparent hover:border-b-accent-orange/40"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-obsidian-950 flex items-center justify-center text-accent-orange mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-zinc-200 dark:border-obsidian-700/10">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 tracking-tight text-zinc-900 dark:text-white group-hover:text-accent-orange transition-colors duration-300 pointer-events-none leading-tight">
                {service.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-xs mb-6 leading-relaxed font-medium flex-grow pointer-events-none">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {service.tags.map((tag, i) => (
                  <span key={i} className="text-[9px] uppercase font-black tracking-widest text-zinc-500 dark:text-zinc-200 bg-zinc-100 dark:bg-obsidian-700/5 border border-zinc-200 dark:border-transparent px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-obsidian-900/40 border border-zinc-200 dark:border-obsidian-800 p-12 md:p-20 rounded-[3.5rem] mb-32 relative shadow-sm overflow-hidden"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter text-zinc-900 dark:text-white leading-[0.9] uppercase">
                Every detail, <span className="text-gradient">handled</span>.
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed mb-8">
                I provide a complete white-glove service. You bring the vision, and I handle the technical complexity from domain purchase to global scale.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Porkbun DNS", "SEO Strategy", "WCAG Compliance", "CI/CD Management", "SSL Security", "Netlify Hosting"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-900 dark:text-white font-bold text-sm uppercase tracking-tight">
                    <div className="w-5 h-5 rounded-full bg-accent-orange/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-accent-orange" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] bg-sunset-gradient opacity-10 blur-[60px] absolute inset-0 animate-pulse" />
                <div className="relative bg-white dark:bg-obsidian-950 p-8 rounded-[3rem] border border-zinc-200 dark:border-obsidian-700/10 shadow-premium">
                  <div className="flex flex-col gap-6">
                    <div className="space-y-2">
                      <div className="h-2 w-32 bg-accent-orange/40 rounded-full" />
                      <div className="h-2 w-48 bg-zinc-200 dark:bg-text-secondary/20 rounded-full" />
                    </div>
                    <div className="h-40 w-full rounded-2xl bg-zinc-50 dark:bg-obsidian-900/60 border border-zinc-100 dark:border-white/5 flex items-center justify-center px-3">
                      <LighthouseWidget />
                    </div>
                    <Link
                      to="/templates"
                      className="w-full py-4 bg-sunset-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-accent-red/20 hover:scale-[1.02] active:scale-95 transition-transform text-center block"
                    >
                      Get Started Today
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
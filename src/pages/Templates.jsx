import React from 'react';
import { motion } from 'framer-motion';
import SaaSTemplate from '../components/templates/SaaSTemplate';
import ECommerceTemplate from '../components/templates/ECommerceTemplate';
import AgencyTemplate from '../components/templates/AgencyTemplate';
import ConstructionTemplate from '../components/templates/ConstructionTemplate';
import BusinessTemplate2 from '../components/templates/BuisnessTemplate2';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';

const templatesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Premium React Templates',
  url: 'https://zachhowell.dev/templates',
  description:
    'Curated collection of premium production-ready React templates for SaaS, e-commerce, agencies, contractors and small business websites.',
  ...breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
  ]),
};

const Templates = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    // Hardened for Light Mode: Added white bg and zinc text
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-transparent">
      <Seo
        title="Premium React Templates | SaaS, E-commerce & Agency — Zach Howell"
        description="Production-ready React + Tailwind templates for SaaS, e-commerce, agencies, contractors and small businesses. Launch a high-performance, SEO-optimized website in 48 hours."
        path="/templates"
        keywords="React templates, Tailwind templates, SaaS template, e-commerce template, agency template, small business website template, premium web templates"
        jsonLd={templatesJsonLd}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <span className="text-sm font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">Velocity as a Service</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-zinc-900 dark:text-white uppercase leading-[0.9]">
            The 48-Hour <span className="text-gradient">Sprint</span>.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
            I don’t believe in months-long development cycles. Choose a foundation below, and I’ll have your brand live, optimized, and secure in <span className="text-zinc-900 dark:text-white font-bold">48 hours or less.</span>
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-32">
          
          {/* SPRINT TEMPLATES */}
          <SaaSTemplate 
            sprintReady={true} 
            handleMouseEnter={handleMouseEnter} 
            handleMouseLeave={handleMouseLeave} 
          />
          
          {/* E-COMMERCE (EXCLUDED FROM SPRINT) */}
          <ECommerceTemplate 
            sprintReady={false} 
            handleMouseEnter={handleMouseEnter} 
            handleMouseLeave={handleMouseLeave} 
          />
          
          <AgencyTemplate 
            sprintReady={true} 
            handleMouseEnter={handleMouseEnter} 
            handleMouseLeave={handleMouseLeave} 
          />
          
          <ConstructionTemplate 
            sprintReady={true} 
            handleMouseEnter={handleMouseEnter} 
            handleMouseLeave={handleMouseLeave} 
          />
          
          <BusinessTemplate2 
            sprintReady={true} 
            handleMouseEnter={handleMouseEnter} 
            handleMouseLeave={handleMouseLeave} 
          />
        </div>

        {/* Closing Sales Hook */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="p-12 rounded-[3rem] border border-zinc-200 dark:border-obsidian-800 bg-zinc-50 dark:bg-obsidian-900/40 text-center"
        >
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">Need something completely custom?</h3>
          <p className="text-zinc-600 dark:text-text-secondary mb-8 font-medium">I also build from the ground up for complex enterprise requirements.</p>
          <a href="/#contact" className="inline-block px-12 py-5 bg-sunset-gradient text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-accent-red/20 hover:scale-105 transition-transform">
            Start a Custom Build
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;
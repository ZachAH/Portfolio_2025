import React from 'react';
import { motion } from 'framer-motion';
import TemplateCard from '../components/templates/TemplateCard';
import templates from '../data/templates';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';

const templatesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Premium React Templates',
  url: 'https://zachhowell.dev/templates',
  description:
    'Curated collection of premium production-ready React templates. Choose between 48-hour velocity sprints or full-scale eCommerce foundations.',
  ...breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Templates', path: '/templates' },
  ]),
};

const Templates = ({ handleMouseEnter, handleMouseLeave }) => {
  // 💡 Logic: Separate templates based on badgeType or a boolean
  // For this example, I'm assuming 'conversion' badgeTypes are eCommerce
  const sprintTemplates = templates.filter(t => t.badgeType !== 'conversion');
  const ecommerceTemplates = templates.filter(t => t.badgeType === 'conversion');

  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-transparent">
      <Seo
        title="Premium React Templates | 48-Hour Sprints — Zach Howell"
        description="Launch a high-performance site in 48 hours. Choose from our velocity-focused templates or full-scale eCommerce foundations."
        path="/templates"
        jsonLd={templatesJsonLd}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <span className="text-sm font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">Velocity as a Service</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-zinc-900 dark:text-white uppercase leading-[0.9]">
            Pick a Vibe. <br /> Launch in <span className="text-gradient">Record Time</span>.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
            I build for speed without sacrificing the "wow" factor. Select a foundation below and let's go live.
          </p>
        </motion.div>

        {/* --- SECTION 1: 48-HOUR SPRINTS --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Certified 2-Day Launch</h2>
              <p className="text-zinc-500 font-medium">Informational, SaaS, & Professional Service Foundations.</p>
            </div>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-8 hidden md:block mb-4" />
            <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-[10px] font-black uppercase tracking-widest">
              Live in 48 Hours Guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {sprintTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={{...template, badgeType: 'sprint'}} // Force sprint badge here
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        {/* --- SECTION 2: ECOMMERCE POWERHOUSES --- */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">eCommerce Powerhouses</h2>
              <p className="text-zinc-500 font-medium">Inventory-ready builds with integrated checkout flows.</p>
            </div>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-8 hidden md:block mb-4" />
            <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              Ready to Sell
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {ecommerceTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={{...template, badgeType: 'conversion'}} // Force eCommerce badge here
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        {/* Closing Sales Hook */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="p-12 rounded-[3rem] border border-zinc-200 dark:border-obsidian-800 bg-zinc-50 dark:bg-obsidian-900/40 text-center"
        >
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">Need something completely custom?</h3>
          <p className="text-zinc-600 dark:text-text-secondary mb-8 font-medium">For complex enterprise logic or unique API integrations, let's talk custom.</p>
          <a href="/#contact" className="inline-block px-12 py-5 bg-sunset-gradient text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-accent-red/20 hover:scale-105 transition-transform">
            Start a Custom Build
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;
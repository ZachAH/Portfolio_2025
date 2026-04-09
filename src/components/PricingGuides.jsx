import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';

// PDF Imports
import templateGuide from '../../src/assets/PriceGuides/Template_Price_Guide.pdf';
import growthPlans from '../../src/assets/PriceGuides/Growth_Plans.pdf';
import freelanceGuide from '../../src/assets/PriceGuides/freelance_price_guide.pdf';

const PricingCard = ({ title, price, description, features, accent, isPopular, link, stripeUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-premium flex flex-col h-full ${isPopular
      ? 'border-accent-orange bg-white dark:bg-obsidian-900/40 shadow-xl'
      : 'border-obsidian-700/10 dark:border-obsidian-700/20 bg-gray-50/50 dark:bg-white/5 backdrop-blur-md'
      }`}
  >
    {isPopular && (
      <motion.span
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-orange text-white text-xs font-bold rounded-full uppercase tracking-widest z-50 shadow-lg"
      >
        Most Popular
      </motion.span>
    )}

    <h3 className="text-2xl font-bold text-obsidian-950 dark:text-white mb-2">{title}</h3>
    <div className="flex items-baseline gap-1 mb-4">
      <span className="text-4xl font-bold text-obsidian-950 dark:text-white">{price}</span>
      {price.includes('/') && <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">/month</span>}
    </div>
    <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed">{description}</p>

    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-obsidian-900 dark:text-gray-200">
          <svg className={`w-5 h-5 ${accent} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>

    {/* LOGIC: Use direct anchor tag for Stripe Links, or Link for internal routing */}
    {stripeUrl ? (
      <a
        href={stripeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-4 rounded-full font-bold transition-all active:scale-95 shadow-md text-center block ${isPopular
          ? 'bg-accent-orange text-white hover:bg-accent-orange/90'
          : 'bg-obsidian-950 text-white dark:bg-white dark:text-obsidian-950 hover:opacity-90'
          }`}
      >
        Get Started
      </a>
    ) : (
      <Link
        to={link || "/contact"}
        className={`w-full py-4 rounded-full font-bold transition-all active:scale-95 shadow-md text-center block ${isPopular
          ? 'bg-accent-orange text-white hover:bg-accent-orange/90'
          : 'bg-obsidian-950 text-white dark:bg-white dark:text-obsidian-950 hover:opacity-90'
          }`}
      >
        Get Started
      </Link>
    )}
  </motion.div>
);

const PricingGuides = () => {
  const [activeTab, setActiveTab] = useState('templates');

  const downloadLinks = {
    templates: { file: templateGuide, label: 'Template Pricing Guide' },
    custom: { file: freelanceGuide, label: 'Custom Project Guide' },
    growth: { file: growthPlans, label: 'Growth & Partnership Plans' }
  };

  const trackDownload = (label) => {
    ReactGA.event({
      category: "Conversion",
      action: "PDF Download",
      label: label,
    });
  };

  const content = {
    growth: [
      { title: "The Pilot", price: "$150/mo", description: "Peace of mind for business owners who want their site 'always on'.", features: ["24/7 Uptime Monitor", "Hosting & DNS Management", "Security Patching", "1 Expert Hour / month"], accent: "text-blue-500", stripeUrl: import.meta.env.VITE_STRIPE_PILOT_URL, link: "/contact" },
      { title: "The Navigator", price: "$450/mo", description: "Active scaling for brands that need regular feature updates and SEO.", features: ["Includes Pilot Plan", "4 Expert Hours / month", "Monthly SEO Health Audit", "Priority 24h Support"], accent: "text-accent-orange", isPopular: true, stripeUrl: import.meta.env.VITE_STRIPE_NAVIGATOR_URL, link: "/contact" },
      { title: "The Co-Pilot", price: "$950/mo", description: "A dedicated full-stack partner for high-traffic or E-commerce brands.", features: ["Includes Navigator Plan", "10 Expert Hours / month", "Strategy Sync Calls", "Direct Slack/Text Access"], accent: "text-purple-500", stripeUrl: import.meta.env.VITE_STRIPE_COPILOT_URL, link: "/contact" }
    ],
    templates: [
      {
        title: "The 48h Sprint",
        price: "$700",
        description: "Velocity as a Service. I take your selected foundation and transform it into a high-performance, live brand in exactly 48 hours.",
        features: ["Full Source Code Ownership",
          "Brand DNA & Asset Integration",
          "White-Glove Infrastructure Setup",
          "2-Day Deployment Guaranteed",
          "Local SEO Metadata Injection"],
        accent: "text-accent-orange",
        isPopular: true,
        stripeUrl: import.meta.env.VITE_STRIPE_SPRINT_URL
      },
      {
        title: "Modern Edge",
        price: "$900",
        description: "For brands that need to command attention. High-impact UI paired with complex motion logic to establish immediate market authority.",
        features: ["Elite Source Code Access",
          "Aggressive GSAP Motion Engine",
          "GA4 & Search Console Infrastructure", // The analytical power-up
          "Technical SEO & Core Web Vitals Audit", // Beyond just metadata
          "Advanced Brand DNA Sculpting",
          "72-Hour Precision Launch"],
        accent: "text-accent-blue",
        stripeUrl: import.meta.env.VITE_STRIPE_MODERN_URL
      },
      {
        title: "Commerce Launch",
        price: "$1,900",
        description: "A secure revenue machine. I'll deploy your full shop with functional cart and inventory logic.",
        features: ["Choice of Elite E-Com Foundation",
          "Strategic Inventory & SKU Setup",
          "Secure Stripe Merchant Integration",
          "Conversion-First Checkout Flow",
          "7-Day Post-Launch Support Window"],
        accent: "text-purple-500",
        stripeUrl: import.meta.env.VITE_STRIPE_COMMERCE_URL
      }
    ],
    custom: [
      { title: "Business Site", price: "$1,500+", description: "1-of-1 custom build designed for your specific brand identity.", features: ["3-6 Custom Pages", "UI/UX Flow Design", "React/Tailwind Stack", "Performance Optimized"], accent: "text-gray-500 dark:text-silver-400", link: "/custom-discovery" },
      { title: "Dynamic + CMS", price: "$3,500+", description: "Advanced builds with a custom Admin Dashboard via Firebase/Firestore.", features: ["Everything in Business", "Secure Admin Portal", "Real-Time Content Updates", "Asset Management"], accent: "text-accent-orange", isPopular: true, link: "/custom-discovery" },
      { title: "Enterprise App", price: "$6,000+", description: "Full-scale web applications with complex logic and deep integrations.", features: ["Custom API Logic", "Complex Integrations", "Scalable Architecture", "Extended Support"], accent: "text-emerald-500", link: "/custom-discovery" }
    ]
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-obsidian-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6">
            Pricing & <span className="text-gradient">Partnership</span>
          </h2>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 backdrop-blur-md rounded-full w-fit border border-black/5 dark:border-white/10">
              {['growth', 'templates', 'custom'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all uppercase tracking-widest ${activeTab === tab ? 'bg-white dark:bg-white dark:text-obsidian-950 shadow-md' : 'text-gray-500 dark:text-gray-400 hover:text-accent-orange'
                    }`}
                >
                  {tab === 'growth' ? 'Partnership Plans' : tab === 'templates' ? 'Template Launch' : 'Custom Builds'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'templates' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl"
                >
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    Choose an industry-leading foundation from my collection and I will personally handle the
                    deployment, content integration, and domain setup. Every launch includes
                    full ownership of the source code and a professional, hand-polished result tailored
                    to your specific brand package.
                  </p>
                  <Link
                    to="/templates"
                    className="text-accent-orange font-bold text-sm hover:underline flex items-center justify-center gap-2"
                  >
                    Browse Available Template Foundations →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.a
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              href={downloadLinks[activeTab].file}
              download={downloadLinks[activeTab].label}
              onClick={() => trackDownload(downloadLinks[activeTab].label)}
              className="flex items-center gap-2 px-8 py-4 bg-accent-orange/10 dark:bg-accent-orange/10 text-accent-orange border border-accent-orange/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent-orange hover:text-white transition-all shadow-lg active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Full {activeTab === 'templates' ? 'Launch' : activeTab === 'growth' ? 'Partnership' : 'Custom'} Guide (PDF)
            </motion.a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:col-span-3"
            >
              {content[activeTab].map((item, idx) => (
                <PricingCard key={`${activeTab}-${idx}`} {...item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-accent-orange/20 text-center max-w-4xl mx-auto shadow-sm"
        >
          <h4 className="text-xl font-bold text-obsidian-950 dark:text-white mb-3 flex items-center justify-center gap-2">
            <span>⚡</span> The Advantage of Working With Me
          </h4>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic text-sm sm:text-base">
            "I build with modern frameworks like React and TailwindCSS, meaning I am significantly faster than developers using legacy builders. An 'hour' of my time usually covers what takes other agencies three—you're paying for rapid, professional execution on a world-class foundation."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingGuides;
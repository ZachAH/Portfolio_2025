import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCode, FaShieldAlt } from 'react-icons/fa';

// ── TRUST BAR ─────────────────────────────────────────────
// Positioned right after the hero so visitors who don't know
// Zach personally immediately see the credibility signals:
// experience, location, response time, and guarantees.
// Designed to reduce apprehension before they scroll to Projects.

const stats = [
  {
    icon: <FaCode className="w-5 h-5" />,
    value: '6+',
    label: 'Years Building',
    sub: 'Full-Stack Experience',
  },
  {
    icon: <FaShieldAlt className="w-5 h-5" />,
    value: '220+',
    label: 'Projects Shipped',
    sub: 'Live In Production',
  },
  {
    icon: <FaMapMarkerAlt className="w-5 h-5" />,
    value: 'WI',
    label: 'New Berlin',
    sub: 'Wisconsin, USA',
  },
  {
    icon: <FaClock className="w-5 h-5" />,
    value: '24h',
    label: 'Response Time',
    sub: 'Direct-Line Support',
  },
];

const guarantees = [
  {
    title: 'Fixed Pricing',
    copy: 'Transparent tiers. No surprise invoices after the build starts.',
  },
  {
    title: 'Source Code Ownership',
    copy: 'You own 100% of the code on launch day — no vendor lock-in.',
  },
  {
    title: 'Direct Access',
    copy: 'Work directly with the developer. No account managers or middlemen.',
  },
  {
    title: 'Discovery Is Free',
    copy: 'No contracts or deposits until we both agree on scope and fit.',
  },
];

const TrustBar = () => {
  return (
    <section
      aria-labelledby="trust-bar-heading"
      className="relative py-24 px-6 md:px-12 lg:px-24 border-y border-obsidian-700/10 dark:border-white/5 bg-silver-50/60 dark:bg-obsidian-900/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
            Why Work With Me
          </span>
          <h2
            id="trust-bar-heading"
            className="text-3xl md:text-5xl font-bold tracking-tighter text-text-primary uppercase"
          >
            Built on <span className="text-gradient">Trust</span>.
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            I'm a real developer based in Wisconsin — not an agency, not an offshore team.
            Every project ships from my desk, with my name attached.
          </p>
        </motion.div>

        {/* Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative p-6 md:p-8 rounded-3xl bg-white dark:bg-obsidian-950/60 border border-obsidian-700/10 dark:border-white/10 backdrop-blur-md shadow-sm hover:shadow-premium transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-orange/10 text-accent-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-bold text-text-primary uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest mt-1">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-obsidian-950/40 border border-accent-orange/20 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">
              The Zach Howell Promise
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {guarantees.map((g) => (
              <div key={g.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-accent-orange shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-sm font-black uppercase tracking-wide text-text-primary">
                    {g.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium pl-7">
                  {g.copy}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── REVEAL CARD ──────────────────────────────────────────
const ComparisonCard = ({ before, after, buildType }) => {
  const [revealed, setRevealed] = useState(false);

  const reset = () => setRevealed(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-obsidian-700/10 dark:border-white/10 shadow-lg">
        {/* BEFORE image — always rendered underneath */}
        <img
          src={before}
          alt={`Before — ${buildType}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />

        {/* AFTER image — animates in over the before */}
        <AnimatePresence>
          {revealed && (
            <motion.img
              key="after"
              src={after}
              alt={`After — ${buildType}`}
              className="absolute inset-0 w-full h-full object-cover object-top z-10"
              draggable={false}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          )}
        </AnimatePresence>

        {/* Label badge — top left */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-3 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-sm ${
            revealed ? 'bg-emerald-500/90' : 'bg-red-500/90'
          } transition-colors duration-300`}>
            {revealed ? 'After' : 'Before'}
          </span>
        </div>

        {/* CTA button — centered */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.button
                key="reveal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setRevealed(true)}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/95 dark:bg-obsidian-950/95 shadow-xl backdrop-blur-sm border border-obsidian-700/10 dark:border-white/10 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <span className="text-sm font-bold text-text-primary">See the After</span>
                <motion.svg
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-5 h-5 text-accent-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </motion.svg>
              </motion.button>
            ) : (
              <motion.button
                key="reset"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.6 } }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={reset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 dark:bg-obsidian-950/95 shadow-xl backdrop-blur-sm border border-obsidian-700/10 dark:border-white/10 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0115.36-5.36M20 15a9 9 0 01-15.36 5.36" />
                </svg>
                <span className="text-xs font-bold text-text-secondary">Start Over</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Caption bar */}
      <div className="flex items-center justify-center px-1">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/20">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent-orange">Built with</span>
          <span className="text-xs font-bold text-text-primary">{buildType}</span>
        </div>
      </div>
    </div>
  );
};

// ── COMPARISON DATA ──────────────────────────────────────
// To add a new comparison:
//   1. Drop the "before" screenshot into  /public/before/<slug>.webp
//   2. Drop the "after"  screenshot into  /public/after/<slug>.webp
//   3. Add a new entry below — the slug must match the filenames.
//
// Example:
//   { slug: 'saas_template', buildType: 'SaaS Template' }
//   → expects /public/before/saas_template.webp  &  /public/after/saas_template.webp

const comparisons = [
  { slug: 'hero_service',       buildType: 'Hero Service Template' },
  { slug: 'influencer_pro',     buildType: 'Influencer Pro Template' },
  { slug: 'customdynamic+cms',  buildType: 'Custom Dynamic + CMS Build' },
].map((entry) => ({
  ...entry,
  before: `/before/${entry.slug}.webp`,
  after:  `/after/${entry.slug}.webp`,
}));

// ── MAIN SECTION ─────────────────────────────────────────
const BeforeAfter = ({ handleMouseEnter, handleMouseLeave }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-silver-50/60 dark:bg-obsidian-900/30 border-y border-obsidian-700/10 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
            The Transformation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-text-primary uppercase">
            Before &amp; <span className="text-gradient">After</span>
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            See what happens when a local business upgrades from an outdated site to a
            professionally built web presence.
          </p>
        </motion.div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {comparisons.map((comp, i) => (
            <button
              key={comp.slug}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-black tracking-[0.12em] uppercase transition-all ${
                activeIndex === i
                  ? 'bg-white dark:bg-white text-obsidian-950 shadow-lg'
                  : 'text-text-secondary hover:text-accent-orange bg-white/50 dark:bg-white/5'
              }`}
            >
              {comp.buildType}
            </button>
          ))}
        </div>

        {/* Comparison card */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ComparisonCard {...comparisons[activeIndex]} />
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter;

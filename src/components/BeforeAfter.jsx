import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ComparisonCard = ({ before, after, title, labelType = 'Built for' }) => {
  const [revealed, setRevealed] = useState(false);

  const reset = () => setRevealed(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-obsidian-700/10 dark:border-white/10 shadow-lg">
        <img
          src={before}
          alt={`Before — ${title}`}
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable={false}
        />

        <AnimatePresence>
          {revealed && (
            <motion.img
              key="after"
              src={after}
              alt={`After — ${title}`}
              className="absolute inset-0 w-full h-full object-cover object-top z-10"
              draggable={false}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              exit={{ clipPath: 'inset(0 100% 0 0)' }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          )}
        </AnimatePresence>

        <div className="absolute top-4 left-4 z-20">
          <span
            className={`px-3 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-sm transition-colors duration-300 ${
              revealed ? 'bg-emerald-500/90' : 'bg-red-500/90'
            }`}
          >
            {revealed ? 'After' : 'Before'}
          </span>
        </div>

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

      <div className="flex items-center justify-center px-1">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/20">
          <span className="text-[10px] font-black uppercase tracking-widest text-accent-orange">
            {labelType}
          </span>
          <span className="text-xs font-bold text-text-primary">{title}</span>
        </div>
      </div>
    </div>
  );
};

const comparisons = [
  {
    slug: 'kml_1',
    title: 'Kettle Moraine Professional Cleaners',
    labelType: 'Built for',
    before: '/before/KML_before1.webp',
    after: '/after/KML_after_1.webp',
  },
  {
    slug: 'kml_2',
    title: 'Kettle Moraine Professional Cleaners',
    labelType: 'Built for',
    before: '/before/KML_before2.webp',
    after: '/after/KML_after_4.webp',
  },
  {
    slug: 'uppercrust_1',
    title: 'Uppercrust Pizza',
    labelType: 'Built for',
    before: '/before/UpperCrustBefore_1.webp',
    after: '/after/UppercrustAfter_1.webp',
  },
  {
    slug: 'uppercrust_2',
    title: 'Uppercrust Pizza',
    labelType: 'Built for',
    before: '/before/UpperCrustBefore_2.webp',
    after: '/after/UppercrustAfter_2.webp',
  },
  {
    slug: 'influencer_pro',
    title: 'Influencer Pro Template',
    labelType: 'Built with',
    before: '/before/influencer_pro.webp',
    after: '/after/influencer_pro.webp',
  },
];

const BeforeAfter = ({ handleMouseEnter, handleMouseLeave }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = comparisons[activeIndex];

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
            See what happens when a local business upgrades from an outdated site to a professionally built web presence.
          </p>
        </motion.div>

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
              {comp.title}
            </button>
          ))}
        </div>

        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ComparisonCard {...active} />
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter;
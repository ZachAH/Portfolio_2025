import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/hero';
import TrustBar from '../components/TrustBar';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import BeforeAfter from '../components/BeforeAfter';
import Seo from '../components/Seo';
import {
  personSchema,
  websiteSchema,
} from '../utils/structuredData';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [websiteSchema, personSchema],
};

const SummerPromoModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9998] bg-black/55 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/40 bg-[linear-gradient(160deg,rgba(255,247,237,1)_0%,rgba(255,236,153,0.96)_35%,rgba(125,211,252,0.92)_100%)] p-8 shadow-2xl dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(67,20,7,0.96)_0%,rgba(194,65,12,0.9)_42%,rgba(12,74,110,0.92)_100%)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-white/20 blur-2xl" />

            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 text-obsidian-950/60 transition-colors hover:text-obsidian-950 dark:text-white/60 dark:hover:text-white"
              aria-label="Close summer sale popup"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-white/60 bg-white/50 px-4 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-obsidian-950 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white">
                  Limited Summer Offer
                </span>
                <div className="flex items-end gap-3 text-emerald-900/80 dark:text-emerald-200/80">
                  <svg className="h-12 w-8" viewBox="0 0 32 48" fill="none" aria-hidden="true">
                    <path d="M15 47V26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M15 16c-4-6-9-7-13-6 3 4 7 8 13 8M15 16c1-7-1-12-4-15 6 1 10 5 11 12M15 16c5-5 11-5 16-2-4 3-9 6-15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg className="h-14 w-9" viewBox="0 0 36 52" fill="none" aria-hidden="true">
                    <path d="M18 51V27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M18 17c-5-7-11-8-16-7 4 5 9 9 16 9M18 17c2-8 0-13-4-17 7 1 11 6 12 14M18 17c6-5 13-5 18-2-5 4-11 7-18 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <h2 className="max-w-lg text-4xl font-black leading-[0.95] tracking-tight text-obsidian-950 dark:text-white sm:text-5xl">
                Summer Sale:
                <span className="block text-accent-orange">3 months of The Pilot included</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-obsidian-950/75 dark:text-white/80 sm:text-base">
                Every new website build includes 3 free months of The Pilot partnership plan. Hosting stability, SEO upkeep, and expert support are bundled in for launch season. Offer ends soon.
              </p>

              <div className="mt-6 rounded-2xl border border-white/60 bg-white/45 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/15">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-obsidian-950/60 dark:text-white/60">
                  Included in the summer promo
                </p>
                <div className="mt-3 grid gap-2 text-sm font-semibold text-obsidian-950 dark:text-white sm:grid-cols-2">
                  <span>Monthly AI visibility tuning</span>
                  <span>Google authority maintenance</span>
                  <span>1 expert hour each month</span>
                  <span>Peace-of-mind post-launch support</span>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/pricing#custom-builds"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full bg-obsidian-950 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-95 dark:bg-white dark:text-obsidian-950"
                >
                  Claim Summer Offer
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-full border border-obsidian-950/10 bg-transparent px-6 py-3.5 text-sm font-bold text-obsidian-950/70 transition-all hover:bg-white/35 hover:text-obsidian-950 active:scale-95 dark:border-white/10 dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

function Home({ handleMouseEnter, handleMouseLeave }) {
  const [showSummerPromo, setShowSummerPromo] = useState(false);

  useEffect(() => {
    const promoKey = 'summer_pilot_offer_seen';
    const hasSeenPromo = window.sessionStorage.getItem(promoKey);

    if (!hasSeenPromo) {
      setShowSummerPromo(true);
      window.sessionStorage.setItem(promoKey, 'true');
    }
  }, []);

  return (
    <>
      <Seo
        title="Wisconsin Web Developer | Custom React Websites for Small Business — Zach Howell"
        description="Wisconsin freelance web developer building fast, SEO-optimized React websites, e-commerce stores, and custom web apps for small businesses. Serving Milwaukee, Waukesha, Madison, and all of WI. Get a free website audit today."
        path="/"
        keywords="Wisconsin web developer, Milwaukee web designer, small business website Wisconsin, React developer Milwaukee, custom website development Waukesha, web design New Berlin WI, freelance developer Wisconsin, e-commerce developer Milwaukee, SEO optimization Wisconsin, affordable small business web design, website developer near me WI"
        jsonLd={homeJsonLd}
      />
      <SummerPromoModal isOpen={showSummerPromo} onClose={() => setShowSummerPromo(false)} />
      <Hero
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <TrustBar />
      <BeforeAfter
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <Projects
        handleMouseEnter={handleMouseEnter} 
        handleMouseLeave={handleMouseLeave}
      /> 
      <Contact />
    </>
  );
}

export default Home;

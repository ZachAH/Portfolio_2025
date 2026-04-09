import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import TemplateCard from '../components/templates/TemplateCard';
import templates from '../data/templates';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';

// ── CATEGORY CONFIG ───────────────────────────────────────
// Keep the `id` values here in sync with the `category` field
// in src/data/templates.js. Adding a new category here without
// tagging templates will simply show an "empty state" for that
// category — nothing breaks elsewhere.
// ── CATEGORY CONFIG ───────────────────────────────────────
// Each entry drives (a) the filter chip, (b) the tagline under
// the chip bar, and (c) a full swap of the hero headline / pitch
// when that category is active. This lets the page feel tailored
// to whatever vertical the visitor self-selects into.
//
// heroEyebrow  → small orange caption above the headline
// heroTitle    → main h1 (split across two lines with <br/>)
// heroSubtitle → the paragraph under the h1
const CATEGORY_CONFIG = [
  {
    id: 'all',
    label: 'All Templates',
    shortLabel: 'All',
    tagline: 'Every foundation, every vertical.',
    heroEyebrow: 'Velocity as a Service',
    heroTitleA: 'Pick a Vibe.',
    heroTitleB: 'Launch in Record Time.',
    heroSubtitle:
      "I build for speed without sacrificing the \"wow\" factor. Pick the vertical that matches your business below — I'll handle the rest.",
  },
  {
    id: 'business',
    label: 'Business & Professional',
    shortLabel: 'Business',
    tagline: 'High-trust foundations for professional services and modern brands.',
    heroEyebrow: 'Business & Professional',
    heroTitleA: 'Command Respect.',
    heroTitleB: 'Win More Clients.',
    heroSubtitle:
      'High-trust foundations engineered for professional services, consultants, and modern brands that need to look like the adult in the room from day one.',
  },
  {
    id: 'trades',
    label: 'Trades & Local Services',
    shortLabel: 'Trades',
    tagline: 'Convert local foot traffic with SEO-ready service layouts.',
    heroEyebrow: 'Trades & Local Services',
    heroTitleA: 'Dominate Your',
    heroTitleB: 'Local Market.',
    heroSubtitle:
      "Stop losing leads to outdated sites. SEO-ready templates engineered to turn local searches into booked jobs — phones ringing, calendars full.",
  },
  {
    id: 'saas',
    label: 'SaaS & Tech Startups',
    shortLabel: 'SaaS',
    tagline: 'Silicon Valley-grade launch engines for AI and SaaS products.',
    heroEyebrow: 'SaaS & Tech Startups',
    heroTitleA: 'Launch Your SaaS',
    heroTitleB: 'In 48 Hours.',
    heroSubtitle:
      'Silicon Valley-grade starter suites with bento grids, pricing engines, and glassmorphism surfaces — ready to demo to your next round of investors.',
  },
  {
    id: 'industrial',
    label: 'Industrial & B2B',
    shortLabel: 'Industrial',
    tagline: 'Authority-driven templates for manufacturing and B2B firms.',
    heroEyebrow: 'Industrial & B2B',
    heroTitleA: 'Built for Heavy',
    heroTitleB: 'Industries.',
    heroSubtitle:
      'Authority-driven foundations for manufacturing, logistics, and B2B firms — engineered to convert procurement teams and close RFQs.',
  },
  {
    id: 'creative',
    label: 'Creative & Editorial',
    shortLabel: 'Creative',
    tagline: 'Rule-breaking layouts for brands, labels, and storytellers.',
    heroEyebrow: 'Creative & Editorial',
    heroTitleA: 'Break the Rules.',
    heroTitleB: 'Sell the Vibe.',
    heroSubtitle:
      'Anti-design templates for streetwear brands, record labels, editorial magazines, and creative rebels who refuse to look like everyone else.',
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce',
    shortLabel: 'E-Commerce',
    tagline: 'Full commerce engines with Stripe checkout and cart logic.',
    heroEyebrow: 'E-Commerce',
    heroTitleA: 'Turn Traffic',
    heroTitleB: 'Into Revenue.',
    heroSubtitle:
      'Full commerce engines with Stripe checkout, cart logic, and inventory scaffolding — ready to start taking orders on launch day.',
  },
];

// ── WHITE GLOVE INCLUSIONS ────────────────────────────────
// Shown in the "One Price. Everything Included." banner above
// the filter bar so every visitor immediately understands that
// buying a template package buys a fully deployed site — not
// just a zip of source code.
const WHITE_GLOVE_INCLUSIONS = [
  {
    title: 'Domain Purchase',
    copy: 'I register your .com (or .whatever) on your behalf and hand you the keys.',
  },
  {
    title: 'Hosting Setup',
    copy: 'Production-grade hosting configured, SSL, CDN — all handled end-to-end.',
  },
  {
    title: 'DNS & CNAME Config',
    copy: 'A-records, CNAMEs, email forwarding, www redirects — I handle every knob.',
  },
  {
    title: 'Full Deployment',
    copy: 'Code written, branded, optimized, and pushed live. No handoff headaches.',
  },
  {
    title: 'Local SEO Metadata',
    copy: 'Schema, Open Graph, sitemap, and Google Search Console baked in.',
  },
  {
    title: 'Source Code Ownership',
    copy: 'You keep 100% of the code on launch day. Zero vendor lock-in, ever.',
  },
];

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
  const [activeCategory, setActiveCategory] = useState('all');

  // Precompute counts per category so the chips can show badges
  // without re-filtering on every render.
  const counts = useMemo(() => {
    const result = { all: templates.length };
    for (const cat of CATEGORY_CONFIG) {
      if (cat.id === 'all') continue;
      result[cat.id] = templates.filter((t) => t.category === cat.id).length;
    }
    return result;
  }, []);

  // Existing split view (shown when "All Templates" is selected).
  // This still uses badgeType so the relationship to OnboardingForm
  // remains identical to before — zero breaking changes.
  const sprintTemplates = useMemo(
    () => templates.filter((t) => t.badgeType !== 'conversion'),
    []
  );
  const ecommerceTemplates = useMemo(
    () => templates.filter((t) => t.badgeType === 'conversion'),
    []
  );

  // Filtered list used when a specific category (not "all") is selected.
  const filteredByCategory = useMemo(
    () => templates.filter((t) => t.category === activeCategory),
    [activeCategory]
  );

  const activeConfig = CATEGORY_CONFIG.find((c) => c.id === activeCategory);

  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-transparent">
      <Seo
        title="Premium React Templates | 48-Hour Sprints — Zach Howell"
        description="Launch a high-performance site in 48 hours. Choose from our velocity-focused templates or full-scale eCommerce foundations."
        path="/templates"
        jsonLd={templatesJsonLd}
      />

      <div className="max-w-7xl mx-auto">
        {/* ── DYNAMIC HERO HEADER ─────────────────────────────
            Swaps its eyebrow, headline, and subtitle based on
            the active category so the page feels tailored to
            each vertical the visitor picks. */}
        <div className="text-center mb-16 min-h-[260px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-sm font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
                {activeConfig?.heroEyebrow}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-zinc-900 dark:text-white uppercase leading-[0.9]">
                {activeConfig?.heroTitleA} <br />
                <span className="text-gradient">{activeConfig?.heroTitleB}</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
                {activeConfig?.heroSubtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── WHITE GLOVE BANNER ──────────────────────────────
            Sets the expectation up-front: buying a template
            package is a full deployment, not a zip of code.
            Highlights that the $700 Sprint tier already
            includes literally everything a customer needs. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 p-8 md:p-12 rounded-[2.5rem] border border-accent-orange/30 bg-gradient-to-br from-accent-orange/5 via-transparent to-accent-orange/5 dark:from-accent-orange/10 dark:to-accent-orange/5 overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute -top-1/2 -right-1/4 w-1/2 h-full bg-accent-orange/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10">
            {/* Headline row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 dark:text-green-400">
                    White Glove Deployment
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
                  One Price.
                  <br />
                  <span className="text-gradient">Everything Included.</span>
                </h2>
                <p className="mt-4 text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl leading-relaxed">
                  Buying a template package isn't just buying code. I personally handle
                  the domain, hosting, DNS, deployment, and brand integration — you get a
                  fully-live website, not a zip file and a "good luck."
                </p>
              </div>

              {/* Starting-price badge */}
              <div className="shrink-0 text-center md:text-right">
                <div className="inline-block p-6 rounded-3xl bg-white dark:bg-obsidian-950/60 border border-accent-orange/30 shadow-xl">
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1">
                    Starts At
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">
                    $700
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-accent-orange mt-1">
                    48h Sprint Package
                  </div>
                </div>
              </div>
            </div>

            {/* Inclusions grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {WHITE_GLOVE_INCLUSIONS.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/60 dark:bg-obsidian-950/40 border border-zinc-200 dark:border-white/5 backdrop-blur-sm"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-accent-orange/15 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3.5 h-3.5 text-accent-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-zinc-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-accent-orange/20">
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 italic font-medium text-center sm:text-left">
                The $700 Sprint package is literally everything you need to be live and
                selling. Nothing extra to buy, nothing extra to figure out.
              </p>
              <Link
                to="/pricing"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-orange text-white font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-accent-orange/90 hover:scale-105 active:scale-95 transition-all"
              >
                See Full Breakdown
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── CATEGORY FILTER BAR ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-zinc-100/70 dark:bg-white/5 backdrop-blur-md rounded-full border border-zinc-200 dark:border-white/10 max-w-5xl mx-auto">
            {CATEGORY_CONFIG.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = counts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-black tracking-[0.15em] uppercase transition-all ${
                    isActive
                      ? 'bg-white dark:bg-white text-zinc-900 dark:text-zinc-900 shadow-lg'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-accent-orange'
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.shortLabel}</span>
                  <span
                    className={`ml-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-[9px] rounded-full ${
                      isActive
                        ? 'bg-accent-orange text-white'
                        : 'bg-zinc-200 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active category tagline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeCategory}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25 }}
              className="text-center text-sm text-zinc-500 dark:text-zinc-400 italic font-medium mt-6 max-w-2xl mx-auto"
            >
              {activeConfig?.tagline}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* ── RESULTS ───────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeCategory === 'all' ? (
            // DEFAULT VIEW: the original two-section split.
            // Preserved exactly so nothing visually regresses
            // for users who land on /templates fresh.
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* --- SECTION 1: 48-HOUR SPRINTS --- */}
              <div className="mb-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div>
                    <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                      Certified 2-Day Launch
                    </h2>
                    <p className="text-zinc-500 font-medium">
                      Informational, SaaS, & Professional Service Foundations.
                    </p>
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
                      template={{ ...template, badgeType: 'sprint' }} // Force sprint badge here
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
                    <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                      eCommerce Powerhouses
                    </h2>
                    <p className="text-zinc-500 font-medium">
                      Inventory-ready builds with integrated checkout flows.
                    </p>
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
                      template={{ ...template, badgeType: 'conversion' }} // Force eCommerce badge here
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            // FILTERED VIEW: single grid for a specific category.
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-32"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                    {activeConfig?.label}
                  </h2>
                  <p className="text-zinc-500 font-medium">
                    {filteredByCategory.length}{' '}
                    {filteredByCategory.length === 1 ? 'foundation' : 'foundations'} ready
                    for deployment.
                  </p>
                </div>
                <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-8 hidden md:block mb-4" />
                {/* Sub-badge reflects whether this category is a sprint or commerce play */}
                {activeCategory === 'ecommerce' ? (
                  <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                    Ready to Sell
                  </span>
                ) : (
                  <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-[10px] font-black uppercase tracking-widest">
                    Live in 48 Hours Guaranteed
                  </span>
                )}
              </div>

              {filteredByCategory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {filteredByCategory.map((template) => (
                    <TemplateCard
                      key={template.id}
                      // Preserve badge logic: ecommerce templates keep `conversion`,
                      // everything else is forced to `sprint` for the card badge.
                      template={{
                        ...template,
                        badgeType:
                          template.badgeType === 'conversion' ? 'conversion' : 'sprint',
                      }}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>
              ) : (
                // Graceful empty state in case a category ends up without templates
                <div className="p-16 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                  <p className="text-zinc-500 font-medium">
                    No templates in this category yet — but one is probably in the oven.
                  </p>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="mt-6 inline-block text-accent-orange font-bold uppercase text-xs tracking-widest hover:underline"
                  >
                    ← Back to All Templates
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing Sales Hook → Custom Discovery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="p-12 rounded-[3rem] border border-zinc-200 dark:border-obsidian-800 bg-zinc-50 dark:bg-obsidian-900/40 text-center"
        >
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
            Want Something Custom?
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">
            None of these fit your vision?
          </h3>
          <p className="text-zinc-600 dark:text-text-secondary mb-8 font-medium max-w-2xl mx-auto">
            Skip the templates entirely. Kick off the discovery phase for a fully custom build —
            tell me your vision and we'll lock in a Zoom or Teams call to scope it together.
          </p>
          <Link
            to="/custom-discovery"
            className="inline-block px-12 py-5 bg-sunset-gradient text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-accent-red/20 hover:scale-105 transition-transform"
          >
            Start Discovery →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;

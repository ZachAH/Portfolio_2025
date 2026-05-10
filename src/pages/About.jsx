import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { personSchema, breadcrumb } from '../utils/structuredData';

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    personSchema,
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Why Me?', path: '/about' },
    ]),
  ],
};

const comparisonRows = [
  {
    label: 'Speed',
    zh: 'Faster load times help keep visitors engaged and reduce the chance they leave before converting.',
    generic: 'Slower pages that frustrate visitors and lose leads before they take action.',
  },
  {
    label: 'SEO',
    zh: 'Built to make it easier for search engines to understand your site and for customers to find you.',
    generic: 'Harder to optimize, with more clutter that can hold back visibility.',
  },
  {
    label: 'Security',
    zh: 'Fewer moving parts means fewer common break points and less maintenance stress.',
    generic: 'More plugins and dependencies can mean more updates and more risk.',
  },
  {
    label: 'Ownership',
    zh: 'You own the site, the domain, and the hosting, so the business stays in your control.',
    generic: 'Locked into a platform or builder that can be harder to move away from.',
  },
  {
    label: 'Support',
    zh: 'You work directly with the person building the site, so decisions move faster.',
    generic: 'More handoffs, slower replies, and less direct accountability.',
  },
];

const cleanCode = `export function Hero() {
  return (
    <section className="grid gap-6">
      <h1>Fast sites close faster.</h1>
      <p>Lean React + Vite architecture.</p>
      <button>Start discovery</button>
    </section>
  );
}`;

const messyCode = `<!-- builder-output-final-v27 -->
<div class="wp-block-group builder-row">
  <div class="plugin-wrapper plugin-wrapper-2">
    <div class="hero-module module-189">
      <script src="/plugin/plugin.js"></script>
      <div class="nested-shortcode">[cta_button id="7"]</div>
    </div>
  </div>
</div>`;

const sections = [
  {
    eyebrow: 'Trust',
    title: 'You get the person doing the work.',
    body: [
      'You are not paying for a sales rep, a project manager, and three layers of handoff. You work directly with me from strategy through launch.',
      'That means faster decisions, clearer communication, and a site that reflects your business instead of a template someone else recycled.',
    ],
  },
  {
    eyebrow: 'Speed & SEO',
    title: 'Fast sites turn more visitors into calls.',
    body: [
      'A faster website keeps people engaged longer and gives them less reason to leave before taking action.',
      'I build with performance and search visibility in mind so your site is easier to find, easier to use, and more likely to convert.',
    ],
  },
  {
    eyebrow: 'Ownership',
    title: 'You keep full control of your website.',
    body: [
      'Your site, domain, and hosting are set up so the business owns the asset, not a platform or builder.',
      'If you ever need to switch providers, expand, or move in a different direction, you are not trapped by someone else’s system.',
    ],
  },
  {
    eyebrow: 'Security',
    title: 'Fewer weak points means fewer headaches.',
    body: [
      'I build in a way that avoids a lot of the common issues that come from plugin-heavy setups and overly complex builder stacks.',
      'The result is a cleaner, easier-to-manage site with less maintenance stress for your business.',
    ],
  },
];

const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-obsidian-950">
      <Seo
        title="Why ZH Web Solutions? | Senior Engineer, Fast React Builds, Zero Lock-In"
        description="Why businesses pay more for ZH Web Solutions: direct access to a senior full-stack engineer, high-performance React/Vite builds, better SEO, stronger security, and 100% ownership without WordPress or builder lock-in."
        path="/about"
        keywords="why choose custom web development, React vs WordPress web design, senior full-stack engineer web developer, high performance website Wisconsin, zero lock-in website development, premium web developer Milwaukee"
        jsonLd={aboutJsonLd}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          <span className="text-xs font-black tracking-[0.32em] text-accent-orange uppercase mb-5 inline-block">
            Why Me?
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-obsidian-950 dark:text-white leading-[0.92] mb-6">
            Premium websites cost more because cheap foundations cost more later.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-4xl">
            If you are comparing me against WordPress shops, Wix freelancers, or GoDaddy resellers, you are not comparing the same product. I build websites designed to bring in more leads, make your business look more credible, and stay in your control long after launch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 mt-14">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="rounded-[2.5rem] bg-zinc-50 border border-zinc-200 p-8 md:p-10 shadow-sm"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-orange mb-4">
                  {section.eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-obsidian-950 mb-5">
                  {section.title}
                </h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed text-base md:text-lg">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="space-y-8">
            <motion.aside
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] bg-obsidian-950 text-white p-8 md:p-10 shadow-sm"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-orange mb-4">
                The Premise
              </p>
              <h3 className="text-3xl font-black tracking-tight mb-4">
                Better websites create better business results.
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Faster sites keep more visitors engaged, make your business look more trustworthy, and reduce avoidable problems after launch. That is why custom work can be worth more than a cheaper template build.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-accent-orange">6+</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-bold mt-1">
                    Years Full-Stack
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-accent-orange">95-100</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-bold mt-1">
                    Lighthouse Targets
                  </p>
                </div>
              </div>
            </motion.aside>

            <motion.aside
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.5rem] bg-zinc-50 border border-zinc-200 p-8 md:p-10 shadow-sm"
            >
              <h3 className="text-3xl font-black tracking-tight text-obsidian-950 mb-4">
                Clean architecture beats builder residue.
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-[1.75rem] border border-emerald-500/20 bg-emerald-50 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 mb-3">
                    Custom React / Vite
                  </p>
                  <pre className="text-[11px] leading-relaxed text-obsidian-950 whitespace-pre-wrap overflow-x-auto font-mono">
                    {cleanCode}
                  </pre>
                </div>
                <div className="rounded-[1.75rem] border border-zinc-300 bg-white p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3">
                    Generic Builder Output
                  </p>
                  <pre className="text-[11px] leading-relaxed text-zinc-500 whitespace-pre-wrap overflow-x-auto font-mono">
                    {messyCode}
                  </pre>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-200 p-8 md:p-10 shadow-sm"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-orange mb-5">
            Comparisons
          </p>
          <div className="grid grid-cols-1 gap-4">
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 lg:grid-cols-[0.25fr_0.375fr_0.375fr] gap-4 rounded-[1.75rem] border border-zinc-200 bg-white p-5"
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-obsidian-950">
                    {row.label}
                  </p>
                </div>
                <div className="rounded-2xl bg-accent-orange/10 border border-accent-orange/20 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-accent-orange mb-2">
                    ZH Web Solutions
                  </p>
                  <p className="text-sm font-semibold text-obsidian-950 leading-relaxed">
                    {row.zh}
                  </p>
                </div>
                <div className="rounded-2xl bg-zinc-100 border border-zinc-200 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500 mb-2">
                    Generic Builders
                  </p>
                  <p className="text-sm font-semibold text-zinc-600 leading-relaxed">
                    {row.generic}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-[3rem] bg-obsidian-950 text-white p-10 md:p-14 text-center shadow-sm"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] mb-5">
            Ready to build something that actually performs?
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            If you want a site that loads faster, ranks better, stays secure, and remains yours long after launch day, start the discovery process.
          </p>
          <Link
            to="/custom-discovery"
            className="inline-flex items-center justify-center rounded-full bg-accent-orange px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white hover:bg-accent-orange/90 transition-colors"
          >
            Start Your Discovery Form
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
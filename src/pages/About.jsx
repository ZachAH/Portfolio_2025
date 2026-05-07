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
    zh: 'Sub-2s loads, Vite delivery, 95-100 Lighthouse targets',
    generic: '3-5s loads, bloated themes, plugin drag',
  },
  {
    label: 'SEO',
    zh: 'Lean markup, fast CWV, structured data, rank-ready architecture',
    generic: 'Heavy DOM output, slower crawl paths, weaker on-page control',
  },
  {
    label: 'Security',
    zh: 'Static-first architecture, no plugin sprawl, no CMS database attack surface',
    generic: 'Frequent plugin updates, common exploit vectors, larger attack surface',
  },
  {
    label: 'Ownership',
    zh: 'You own the code, domain, and hosting. I set it up, deploy it, and push everything over to you.',
    generic: 'Proprietary builders, theme/plugin dependency, migration friction',
  },
  {
    label: 'Support',
    zh: 'Direct access to the Senior Engineer building the site',
    generic: 'Account managers, junior handoffs, offshore queues',
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
    title: 'You get the Architect, not the Intern.',
    body: [
      'I bring 6+ years of full-stack engineering experience and a University of Wisconsin-Milwaukee background into every project. That matters because the technical decisions under the hood determine whether the site becomes an asset or a liability.',
      'At big agencies, your project is often handed off to juniors or offshore teams. With me, you have direct-line access to the Senior Engineer writing every line of your code.',
    ],
  },
  {
    eyebrow: 'Speed & SEO',
    title: 'Speed is a Feature, not an Afterthought.',
    body: [
      'I build on React and Vite because performance is not a vanity metric. It is part of the product. The result is typically sub-2-second load behavior and Lighthouse targets in the 95-100 range when the content stack stays disciplined.',
      'WordPress, Wix, and GoDaddy builders usually ship bloated front-end output, stacked third-party scripts, and slower 3-5 second load profiles with 40-60 Lighthouse scores. Google explicitly rewards faster experiences. I build high-performance assets that rank, not just digital brochures that sit on page 10.',
    ],
  },
  {
    eyebrow: 'Ownership',
    title: 'You Own the Asset, 100%.',
    body: [
      'Many agencies use proprietary builders or complex WordPress setups that lock you into their ecosystem. With ZH Web Solutions, you own your code. You also own the domain and the hosting account. I handle the setup, deployment, and technical handoff, then push everything over to you once the build is live.',
      'That means no recurring platform fees, no plugin rent, and zero platform lock-in. If you ever want to move, you take the engine with you because the website remains a business asset you control instead of a subscription dependency you lease forever.',
    ],
  },
  {
    eyebrow: 'Security',
    title: 'Virtually Unhackable Foundations.',
    body: [
      'Roughly speaking, most commodity CMS attacks target WordPress plugins, admin panels, and databases because that is where the vulnerability surface lives. That stack can be patched and managed, but it is still inherently more exposed.',
      'My static-first architecture has zero database vulnerabilities and no third-party plugin bloat. Your business reputation is protected by hardened, custom code rather than a pile of update prompts and attack vectors.',
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
            If you are comparing me against WordPress shops, Wix freelancers, or GoDaddy resellers, you are not comparing the same product. I build custom React/Vite systems engineered for speed, rankings, ownership, and long-term leverage.
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
                Better code compounds.
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Faster sites convert better, rank better, and break less often. That is the real reason custom engineering earns premium pricing. It changes the operating characteristics of the asset.
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
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-orange mb-4">
              </p>
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
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent-orange mb-4">
          </p>
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

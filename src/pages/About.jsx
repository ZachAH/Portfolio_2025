import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import ConversionDashboard from '../components/ConversionDashboard';
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
    label: 'Traffic',
    zh: 'Built to rank higher on Google and Google Maps, driving more organic views and foot traffic.',
    generic: 'Harder to find online, buried under competitors who invested in real web development.',
  },
  {
    label: 'Leads',
    zh: 'Contact forms and calls-to-action designed to convert visitors into booked customers automatically.',
    generic: 'Generic forms that visitors ignore or abandon before they ever reach you.',
  },
  {
    label: 'ROI',
    zh: 'A site that pays for itself by consistently bringing in new business without ongoing ad spend.',
    generic: 'Constant monthly fees for plugins, maintenance, and missed opportunities with no direct revenue.',
  },
  {
    label: 'Convenience',
    zh: 'Leads come to you automatically — email, phone calls, reservations — without lifting a finger.',
    generic: 'Missed calls and lost inquiries from forms that break or slow mobile experiences.',
  },
  {
    label: 'Longevity',
    zh: 'Keeps driving results year after year with minimal upkeep and no platform lock-in.',
    generic: 'More time and money spent fixing issues instead of actually growing your business.',
  },
];

const sections = [
  {
    eyebrow: 'Results',
    title: 'Your website should put money back in your pocket.',
    body: [
      'I build your site to capture every opportunity — forms that route directly to your email, call tracking that shows exactly where new business comes from, and booking flows that convert browsers into reservations without you lifting a finger.',
      'When your website is engineered for conversion, you stop chasing leads and start receiving them. That is the difference between a site you pay for and a site that pays you.',
    ],
  },
  {
    eyebrow: 'Visibility',
    title: 'Show up where your customers are searching.',
    body: [
      'When someone searches for a restaurant or service near them, your business needs to be front and center. I build your site to maximize local search and Google Maps visibility so you get more views, more clicks, and more foot traffic.',
      'Higher rankings mean more organic leads without spending a dime on ads. That is the kind of ROI that compounds over time.',
    ],
  },
  {
    eyebrow: 'Leads',
    title: 'Never miss a potential customer again.',
    body: [
      'Your site should work for you 24/7 — capturing leads, booking calls, and sending inquiries straight to your email without any extra effort on your part.',
      'From contact forms that actually convert to automated lead capture, every piece is designed to turn casual browsers into booked customers.',
    ],
  },
  {
    eyebrow: 'Long-Term Value',
    title: 'More revenue, less maintenance.',
    body: [
      'A cheap site costs you more in the long run — lost leads from slow load times, missed calls from poor mobile experiences, and endless fees that eat into your margin.',
      'I build for results that last. You get a site that keeps driving business month after month without constant upkeep or unexpected bills.',
    ],
  },
];

const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-obsidian-950">
      <Seo
        title="Why ZH Web Solutions? | More Customers, More Revenue, Zero Hassle"
        description="Why businesses choose ZH Web Solutions: more Google Maps visibility, more phone calls and leads, higher ROI, and a website that brings in customers while you focus on running your business."
        path="/about"
        keywords="more google maps visibility, get more phone calls from website, website leads to email, higher ROI website, local SEO for restaurants, website for service businesses, Milwaukee web developer"
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
            <span className="text-gradient">Why Me?</span>
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-obsidian-950 dark:text-white leading-[0.92] mb-6">
            More filled seats. More phone calls. <span className="text-gradient">More revenue.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed max-w-4xl">
            Every decision I make building your site is about one thing — turning visitors into paying customers. Whether that means reservations hitting your phone, leads landing in your inbox, or customers finding you on Google Maps, your website should work as hard as you do.
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
                Your website is your best marketing hire.
              </h3>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Every visitor to your site is a potential customer. I build to make sure they take action — picking up the phone, filling out a form, or walking through your door. A well-built site pays for itself by consistently bringing in new business.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-accent-orange">Higher</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-bold mt-1">
                    Google Maps Rankings
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black text-accent-orange">More</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-400 font-bold mt-1">
                    Leads to Your Inbox
                  </p>
                </div>
              </div>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ConversionDashboard />
            </motion.div>
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
            Ready to start getting more customers?
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            If you are ready for a website that actually brings in business — more calls, more bookings, more revenue — start the discovery process today.
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
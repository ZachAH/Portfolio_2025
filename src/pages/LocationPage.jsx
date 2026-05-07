import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';
import { getLocationPath, locationPageMap, locationPages } from '../data/locationPages';

const LocationPage = () => {
  const { citySlug } = useParams();
  const location = citySlug ? locationPageMap[citySlug] : null;

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  const path = getLocationPath(location.slug);
  const otherMarkets = locationPages.filter((page) => page.slug !== location.slug);
  const title = `Custom Web Development in ${location.city}, WI | ZH Web Solutions`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Locations', path: '/locations' },
        { name: `${location.city} Web Design`, path },
      ]),
      {
        '@type': 'Service',
        name: `${location.city} Web Development`,
        serviceType: 'Custom Web Development',
        areaServed: {
          '@type': 'City',
          name: location.city,
        },
        provider: {
          '@type': 'ProfessionalService',
          name: 'ZH Web Solutions',
          url: 'https://zachhowell.dev',
          telephone: '+1-262-341-7181',
        },
        description: location.metaDescription,
      },
    ],
  };

  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-transparent">
      <Seo
        title={title}
        description={location.metaDescription}
        path={path}
        keywords={`${location.city} web design, ${location.city} web developer, ${location.city} custom website development, ${location.city} React developer, ${location.city} local SEO web design`}
        jsonLd={jsonLd}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl"
        >
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
            {location.focusKeyword}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6">
            Custom Web Development in {location.city}, WI
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {location.heroLead}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 mt-14">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-white/5 p-8 md:p-10 shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-obsidian-950 dark:text-white mb-4">
              Service Description
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
              <strong className="text-obsidian-950 dark:text-white">{location.focusKeyword}</strong> is the anchor for this market.
              {' '}
              {location.serviceDescription}
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {location.marketInsight}
            </p>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-obsidian-950 text-white p-8 md:p-10 shadow-sm"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent-orange mb-4">
              Why this page is different
            </p>
            <ul className="space-y-4">
              {location.proofPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-zinc-200 leading-relaxed">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-orange shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Want the same level of execution for your business in {location.city}? Start with a short discovery form and I will scope the right build path.
              </p>
              <Link
                to="/custom-discovery"
                className="inline-flex items-center justify-center rounded-full bg-accent-orange px-5 py-3 text-sm font-bold text-white hover:bg-accent-orange/90 transition-colors"
              >
                Start a custom build
              </Link>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 md:p-10 shadow-sm"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-obsidian-950 dark:text-white mb-4">
            Built for owners who care about quality
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            These location pages are not placeholder city swaps. Each one is mapped to a different market angle so search engines and visitors both get a clearer signal about how ZH Web Solutions approaches growth, performance, and brand position in {location.city}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-obsidian-950 dark:text-white">
              Nearby markets
            </h2>
            <Link to="/locations" className="text-sm font-bold text-accent-orange hover:underline">
              View all locations
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {otherMarkets.map((page) => (
              <Link
                key={page.slug}
                to={getLocationPath(page.slug)}
                className="rounded-[1.75rem] border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 p-6 hover:border-accent-orange/40 hover:-translate-y-1 transition-all"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-accent-orange mb-2">
                  {page.focusKeyword}
                </p>
                <h3 className="text-lg font-bold text-obsidian-950 dark:text-white mb-2">
                  {page.city}, WI
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {page.serviceDescription}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationPage;

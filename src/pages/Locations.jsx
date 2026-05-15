import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';
import { getLocationPath, locationPages } from '../data/locationPages';

const locationsJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Locations', path: '/locations' },
    ]),
    {
      '@type': 'ItemList',
      name: 'Wisconsin Web Design Service Areas',
      itemListElement: locationPages.map((location, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `${location.city} Web Design`,
        url: `https://zachhowell.dev${getLocationPath(location.slug)}`,
      })),
    },
  ],
};

const Locations = () => {
  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-transparent">
      <Seo
        title="Web Design Service Areas in Southeastern Wisconsin | ZH Web Solutions"
        description="Explore the Southeastern Wisconsin markets ZH Web Solutions serves, including Milwaukee, Brookfield, Mequon, Elm Grove, Whitefish Bay, and West Bend."
        path="/locations"
        keywords="Southeastern Wisconsin web design, Milwaukee web developer, Brookfield web design, Mequon web development, Elm Grove website designer, Whitefish Bay web developer, West Bend web design"
        jsonLd={locationsJsonLd}
      />

      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
            <span className="text-gradient">Locations</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6">
            Custom web development across <span className="text-gradient">Southeastern Wisconsin</span>.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {locationPages.map((location, index) => (
            <motion.article
              key={location.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-[2rem] border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-white/5 p-8 shadow-sm"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent-orange mb-3">
                {location.focusKeyword}
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-obsidian-950 dark:text-white mb-3">
                {location.city}, Wisconsin
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                {location.heroLead}
              </p>
              <Link
                to={getLocationPath(location.slug)}
                className="inline-flex items-center gap-2 text-sm font-bold text-accent-orange hover:underline"
              >
                View {location.city} page
                <span aria-hidden="true">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;

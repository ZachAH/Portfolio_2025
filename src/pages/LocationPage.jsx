import React, { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { Link, Navigate, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import DiscoveryForm from '../components/DiscoveryForm';
import { breadcrumb } from '../utils/structuredData';
import { getLocationPath, locationPageMap, locationPages } from '../data/locationPages';

const normalizeSlug = (slug = '') => slug.replace(/-web-design$/, '');

const LocationPage = () => {
  const { slug } = useParams();
  const normalizedSlug = normalizeSlug(slug);
  const location = normalizedSlug ? locationPageMap[normalizedSlug] : null;
  const heroRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll('[data-hero-item]'),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [normalizedSlug]);

  const otherMarkets = useMemo(
    () => locationPages.filter((page) => page.slug !== normalizedSlug),
    [normalizedSlug]
  );

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  const path = getLocationPath(location.slug);
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
        <div
          ref={heroRef}
          className="rounded-[3rem] border border-zinc-200 dark:border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.92),rgba(244,244,245,0.82))] dark:bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_30%),linear-gradient(145deg,rgba(16,16,18,0.96),rgba(24,24,27,0.9))] p-8 md:p-12 shadow-sm"
        >
          <span
            data-hero-item
            className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block"
          >
            {location.focusKeyword}
          </span>
          <h1
            data-hero-item
            className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6"
          >
            Custom Web Development in {location.city}, WI
          </h1>
          <p
            data-hero-item
            className="max-w-4xl text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed"
          >
            {location.heroLead}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 mt-10">
          <article className="rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-white/5 p-8 md:p-10 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-orange mb-4">
              Market Insight
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-obsidian-950 dark:text-white mb-4">
              How to compete in {location.city}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {location.marketInsight}
            </p>
          </article>

          <aside className="rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-obsidian-950 text-white p-8 md:p-10 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-orange mb-4">
              Proof Points
            </p>
            <ul className="space-y-4">
              {location.proofPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-zinc-200 leading-relaxed">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-orange shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-10 rounded-[2.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 md:p-10 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-accent-orange mb-4">
            Service Description
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-obsidian-950 dark:text-white mb-4">
            Why {location.city} businesses hire ZH Web Solutions
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <strong className="text-obsidian-950 dark:text-white">{location.focusKeyword}</strong>
            {' '}
            is the core angle for this market.
            {' '}
            {location.serviceDescription}
          </p>
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-obsidian-950 dark:text-white">
              More Southeastern Wisconsin markets
            </h2>
            <Link to="/locations" className="text-sm font-bold text-accent-orange hover:underline">
              Back to hub
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
                  {page.heroLead}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-[3rem] border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-white/5 p-6 md:p-10 shadow-sm">
          <DiscoveryForm
            embedded
            title={`Start your ${location.city} project.`}
            description={`Tell me what you need built for your ${location.city} business and I will follow up within 24 hours.`}
          />
        </div>
      </div>
    </section>
  );
};

export default LocationPage;

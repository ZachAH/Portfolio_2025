import React from 'react';
import PricingGuides from '../components/PricingGuides';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Wisconsin Web Development Pricing & Packages',
      url: 'https://zachhowell.dev/pricing',
      description:
        'Transparent pricing for freelance web development packages. Custom React websites, e-commerce, SEO, and ongoing support for Wisconsin small businesses.',
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ]),
  ],
};

const Pricing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12" // Padding to account for the fixed Navbar
    >
      <Seo
        title="Wisconsin Web Development Pricing | Custom Builds & Partnership Plans — Zach Howell"
        description="Transparent pricing for Wisconsin web development. Custom React builds, technical SEO, hosting guidance, and ongoing partnership plans for businesses in Milwaukee, Brookfield, Mequon, Waukesha, and Southeastern Wisconsin."
        path="/pricing"
        keywords="web development pricing Wisconsin, custom website pricing Milwaukee, Brookfield web design cost, Mequon web developer pricing, freelance developer rates Wisconsin, React website pricing, Waukesha web design quote, custom build pricing Wisconsin"
        jsonLd={pricingJsonLd}
      />
      <PricingGuides
      />
    </motion.div>
  );
};

export default Pricing;

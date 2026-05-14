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
      name: 'Wisconsin Web Development Packages & Plans',
      url: 'https://zachhowell.dev/pricing',
      description:
        'Transparent packages for freelance web development. Custom React websites, e-commerce, SEO, and ongoing support for Wisconsin small businesses.',
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
        title="Wisconsin Web Development Packages | Custom Builds & Partnership Plans — Zach Howell"
        description="Transparent packages for Wisconsin web development. Custom React builds, technical SEO, hosting guidance, and ongoing partnership plans for businesses in Milwaukee, Brookfield, Mequon, Waukesha, and Southeastern Wisconsin."
        path="/pricing"
        keywords="web development packages Wisconsin, custom website packages Milwaukee, Brookfield web design cost, Mequon web developer packages, freelance developer packages Wisconsin, React website packages, Waukesha web design quote, custom build packages Wisconsin"
        jsonLd={pricingJsonLd}
      />
      <PricingGuides
      />
    </motion.div>
  );
};

export default Pricing;

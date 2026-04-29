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
        'Transparent pricing for partnership website plans, one-time launches, and custom React builds for Wisconsin small businesses.',
    },
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ]),
  ],
};

const Pricing = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12" // Padding to account for the fixed Navbar
    >
      <Seo
        title="Wisconsin Web Development Pricing & Packages | Affordable Small Business Websites — Zach Howell"
        description="Transparent, affordable pricing for Wisconsin web development. Partnership plans, one-time template launches, and custom React builds for small businesses that need speed, SEO, and full ownership."
        path="/pricing"
        keywords="web development pricing Wisconsin, affordable website packages Milwaukee, small business website cost WI, freelance developer rates Wisconsin, React website pricing, e-commerce development cost Milwaukee, website packages Waukesha, web design quotes Madison WI"
        jsonLd={pricingJsonLd}
      />
      <PricingGuides
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </motion.div>
  );
};

export default Pricing;

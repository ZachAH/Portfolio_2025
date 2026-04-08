import React from 'react';
import PricingGuides from '../components/PricingGuides';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PriceSpecification',
  name: 'Web Development Pricing',
  url: 'https://zachhowell.dev/pricing',
  ...breadcrumb([
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ]),
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
        title="Web Development Pricing & Packages | Zach Howell"
        description="Transparent pricing for freelance web development. Choose from sprint, growth, and custom packages for React websites, e-commerce, SEO, and ongoing support."
        path="/pricing"
        keywords="web development pricing, freelance developer rates, React website cost, small business website pricing, e-commerce development cost"
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
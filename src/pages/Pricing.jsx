import React from 'react';
import PricingGuides from '../components/PricingGuides';
import { motion } from 'framer-motion';

const Pricing = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12" // Padding to account for the fixed Navbar
    >
      <PricingGuides 
        handleMouseEnter={handleMouseEnter} 
        handleMouseLeave={handleMouseLeave} 
      />
    </motion.div>
  );
};

export default Pricing;
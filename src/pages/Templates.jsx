import React from 'react';
import { motion } from 'framer-motion';
import SaaSTemplate from '../components/templates/SaaSTemplate';
import ECommerceTemplate from '../components/templates/ECommerceTemplate';
import AgencyTemplate from '../components/templates/AgencyTemplate';
import ConstructionTemplate from '../components/templates/ConstructionTemplate';
import BusinessTemplate2 from '../components/templates/BuisnessTemplate2';

const Templates = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    <section className="min-h-screen py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="heading-section mb-6 text-text-primary text-4xl md:text-6xl font-bold">
            Premium <span className="text-gradient">Templates</span> Store
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium">
            Start your next major project immediately with these production-ready React layouts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-32">
          <SaaSTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          <ECommerceTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          <AgencyTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          <ConstructionTemplate handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          <BusinessTemplate2 handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        </div>
      </div>
    </section>
  );
};

export default Templates;
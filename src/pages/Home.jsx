import React from 'react';
import Hero from '../components/hero';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Seo from '../components/Seo';
import {
  personSchema,
  localBusinessSchema,
  websiteSchema,
} from '../utils/structuredData';

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [websiteSchema, personSchema, localBusinessSchema],
};

function Home({ handleMouseEnter, handleMouseLeave }) {
  return (
    <>
      <Seo
        title="Zach Howell | Freelance Full-Stack Web Developer in Wisconsin"
        description="Freelance full-stack web developer with 6+ years of experience building fast, SEO-optimized React websites and e-commerce stores for small businesses. Based in New Berlin, WI — serving clients nationwide."
        path="/"
        keywords="freelance web developer, React developer, full-stack engineer, Wisconsin web developer, New Berlin web developer, Milwaukee web designer, hire React developer, custom website development, small business website"
        jsonLd={homeJsonLd}
      />
      <Hero
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <Projects 
        handleMouseEnter={handleMouseEnter} 
        handleMouseLeave={handleMouseLeave}
      /> 
      <Contact />
    </>
  );
}

export default Home;

import React from 'react';
import Hero from '../components/hero';
import TrustBar from '../components/TrustBar';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import BeforeAfter from '../components/BeforeAfter';
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
        title="Wisconsin Web Developer | Custom React Websites for Small Business — Zach Howell"
        description="Wisconsin freelance web developer building fast, SEO-optimized React websites, e-commerce stores, and custom web apps for small businesses. Serving Milwaukee, Waukesha, Madison, and all of WI. Get a free website audit today."
        path="/"
        keywords="Wisconsin web developer, Milwaukee web designer, small business website Wisconsin, React developer Milwaukee, custom website development Waukesha, web design New Berlin WI, freelance developer Wisconsin, e-commerce developer Milwaukee, SEO optimization Wisconsin, affordable small business web design, website developer near me WI"
        jsonLd={homeJsonLd}
      />
      <Hero
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <TrustBar />
      <BeforeAfter
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

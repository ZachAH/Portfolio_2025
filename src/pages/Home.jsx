import React from 'react';
import Hero from '../components/hero';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

function Home({ handleMouseEnter, handleMouseLeave }) {
  return (
    <>
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

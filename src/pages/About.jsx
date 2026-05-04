import React from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import selfie2Img from '../assets/selfie2.webp';
import { personSchema, breadcrumb } from '../utils/structuredData';

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    personSchema,
    breadcrumb([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  ],
};

const About = ({ handleMouseEnter, handleMouseLeave }) => {

  const PackersHighlight = ({ children }) => (
    <span className="relative font-black inline-block px-1">
      <span className="relative z-10 text-[#204E32] dark:text-[#204E32]">{children}</span>
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
        className="absolute bottom-1 left-0 h-[70%] bg-[#FFB612] z-0 -rotate-1 origin-left rounded-sm"
      />
    </span>
  );

  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-obsidian-950 relative overflow-hidden">
      <Seo
        title="About Zach Howell | Wisconsin Freelance Web Developer in New Berlin, WI"
        description="Meet Zach Howell — a Wisconsin-based freelance full-stack software engineer with 6+ years of experience. I build custom React websites, e-commerce stores, and conversion-driven web apps for small businesses across Milwaukee, Waukesha County, and all of WI."
        path="/about"
        keywords="about Zach Howell, Wisconsin web developer, freelance developer New Berlin WI, React developer Milwaukee area, full-stack engineer Waukesha County, small business web developer Wisconsin, hire local web developer WI"
        jsonLd={aboutJsonLd}
      />
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-sunset-gradient opacity-20" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-black tracking-[0.3em] text-accent-orange uppercase mb-6 block">The Architect</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 text-text-primary uppercase leading-[0.9]">
              Real Code. <br />
              <span className="text-gradient">Real Stakes.</span>
            </h1>

            <div className="space-y-6 text-lg text-text-secondary font-medium leading-relaxed">
              <p>
                I’m Zach, a 34-year-old  software engineer with over 6 years experience and business owner based right here in <span className="text-text-primary font-bold">New Berlin, Wisconsin</span>. I don’t just build websites; I build high-velocity conversion engines for people who are tired of the status quo.
              </p>
              <p>
                As the founder of my own clothing brand, <span className="text-text-primary font-bold">Claw and Decay</span>, I know that a website isn't a "pretty brochure"—it’s a tool that either makes you money or costs you opportunities. I specialize in 72-Hour sprints because I believe momentum is the most valuable asset in business.
              </p>
              <p>
                When I’m not deep in a React build or automating workflows with Python,
                you’ll find me catching an NFL game..
                <PackersHighlight>GO PACKERS!!</PackersHighlight>,
                jamming on my instruments or blasting some music!
              </p>
            </div>

            {/* Stats / Proof Points */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="border-l-2 border-accent-orange/30 pl-6">
                <h4 className="text-3xl font-black text-text-primary">72h</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Sprint Delivery</p>
              </div>
              <div className="border-l-2 border-accent-orange/30 pl-6">
                <h4 className="text-3xl font-black text-text-primary">Full-Stack</h4>
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Engineering Strategy</p>
              </div>
            </div>
          </motion.div>

          {/* Photo + Feature Card Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center gap-10"
          >
            {/* Selfie */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-sunset-gradient rounded-[3.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative w-60 h-72 md:w-72 md:h-80 overflow-hidden rounded-[3.5rem] border border-obsidian-700/10 glass">
                <img
                  src={selfie2Img}
                  alt="Zach Howell — freelance full-stack web developer based in New Berlin, Wisconsin"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
                />
              </div>
            </div>

            <div className="glass-card rounded-[3rem] p-12 border border-obsidian-700/10 relative z-10 w-full">
              <h3 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">Why work with me?</h3>
              <ul className="space-y-6">
                {[
                  { title: "No Fluff", desc: "You deal directly with the engineer. No account managers, no delays, no corporate speak." },
                  { title: "Business First", desc: "I focus on ROI, SEO, and performance—the things that actually move the needle." },
                  { title: "Pure Momentum", desc: "My workflow is designed for speed. We go from idea to launch before the competition wakes up." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-sunset-gradient flex-shrink-0 mt-1 flex items-center justify-center text-[10px] text-white font-bold italic">✓</div>
                    <div>
                      <span className="block font-black text-sm uppercase tracking-widest text-text-primary mb-1">{item.title}</span>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aesthetic Glow */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent-orange/10 blur-[100px] rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
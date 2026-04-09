import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SharpieUnderline = () => (
  <svg 
    className="absolute -bottom-2 left-0 w-full h-3 text-accent-orange/40"
    viewBox="0 0 100 10" 
    preserveAspectRatio="none"
  >
    <motion.path
      d="M0 5 Q 25 2, 50 5 T 100 5"
      fill="transparent"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay: 1.8, duration: 1.2, ease: "easeInOut" }}
    />
  </svg>
);

const LetterReveal = ({ text, delay = 0 }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)",
      scale: 1.1
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ display: "inline-block", paddingBottom: "0.15em" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          variants={child}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Hero = ({ handleMouseEnter, handleMouseLeave }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 } 
    },
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl w-full relative z-10">
        <h1
          className="text-5xl xs:text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter mb-10 leading-[0.85] text-text-primary select-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <LetterReveal text="Building" delay={0.4} /><br />
          <span className="relative inline-block">
            <span className="text-gradient">Digital</span>
            <SharpieUnderline />
          </span><br />
          <LetterReveal text="Brilliance." delay={1.2} />
        </h1>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-3xl mx-auto mb-14 font-medium leading-relaxed"
        >
          I design and develop premium, high-performance web applications that bridge the gap between imagination and execution.
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="group relative px-10 py-5 bg-obsidian-950 text-white dark:bg-white dark:text-obsidian-950 rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-premium"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-sunset-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-10 py-5 glass text-text-primary border border-obsidian-700/20 rounded-full font-bold hover:bg-silver-100 transition-all hover:shadow-md active:scale-95"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Let's Talk
          </a>
        </motion.div>

        {/* Availability Pill — relocated from the top of the hero.
            Sits under the CTAs so visitors encounter it *after* they've
            absorbed the headline + pitch, making it feel like a reward
            rather than a sticker. Links straight to the free discovery
            form to convert curiosity into an actual conversation. */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex justify-center"
        >
          <Link
            to="/custom-discovery"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 hover:bg-green-500/15 hover:border-green-500/50 transition-all shadow-sm hover:shadow-md active:scale-95"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Book a free 30-minute discovery call"
          >
            {/* Blinking green dot with halo */}
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-black tracking-[0.18em] uppercase text-green-700 dark:text-green-400">
              Now Booking — Free 30&#8209;Min Discovery Call
            </span>
            <svg
              className="w-3.5 h-3.5 text-green-700 dark:text-green-400 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Decorative ambient background highlight */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] -z-10 blur-[130px] bg-sunset-gradient rounded-full pointer-events-none" 
      />
    </section>
  );
};

export default Hero;
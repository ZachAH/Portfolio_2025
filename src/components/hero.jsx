import React, { useState, useEffect } from 'react';
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

const WisconsinOutline = () => {
  const [isDark, setIsDark] = useState(
    typeof window !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.img
      src={isDark ? "/wisconsin_darkmode.png" : "/wisconsin_outline.jpg"}
      alt=""
      aria-hidden="true"
      className={`absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 ${isDark ? 'w-[68vw] max-w-[720px]' : 'w-[75vw] max-w-[780px]'} min-w-[280px] pointer-events-none select-none -z-10`}
      style={isDark ? { filter: "invert(1)" } : { mixBlendMode: "multiply" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isDark ? 0.38 : 0.15 }}
      transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
    />
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
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 md:px-12 overflow-hidden pt-20 md:pt-0">
      <div className="max-w-6xl w-full relative z-10">
        <h1
          className=" test-gradient text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-10 leading-[0.92] text-text-primary select-none max-w-6xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-gradient">Wisconsin-Built Websites That Rank & Convert</span>
        </h1>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl lg:text-2xl text-text-secondary dark:text-zinc-300 max-w-5xl mx-auto mb-14 font-medium leading-relaxed"
        >
          I design and build blazing-fast websites for Wisconsin small businesses — manufacturing shops, service firms, and local retailers — using modern code that ranks, loads in under 2 seconds, and converts.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
        >
          <Link
            to="/templates"
            className="group relative inline-flex max-w-full items-center justify-center gap-2 px-5 py-3 text-sm sm:gap-3 sm:px-10 sm:py-5 sm:text-lg bg-sunset-gradient text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              className="h-4 w-4 shrink-0 transition-transform group-hover:-rotate-12 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="max-w-[14ch] leading-tight sm:max-w-none">Launch Your Website</span>
            <svg
              className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
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
            className="group inline-flex items-center gap-3 text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Book a free 30-minute discovery call"
          >
            {/* Blinking green dot with halo */}
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-black tracking-[0.18em] uppercase">
              Now Booking — Free 30&#8209;Min Discovery Call
            </span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex justify-center"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 text-sm md:text-base font-semibold text-text-secondary dark:text-zinc-300 hover:text-accent-orange transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>See My Recent Work</span>
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>

      <WisconsinOutline />

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

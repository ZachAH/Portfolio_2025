import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ currentTheme }) => {
  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none">
      {/* Dynamic ambient orbs */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -top-1/4 -left-1/4 w-[90vw] h-[90vw] rounded-full blur-[110px] opacity-20 ${
          currentTheme === 'dark' ? 'bg-accent-orange/20' : 'bg-accent-orange/10'
        }`}
      />
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -bottom-1/4 -right-1/4 w-[80vw] h-[80vw] rounded-full blur-[110px] opacity-20 ${
          currentTheme === 'dark' ? 'bg-accent-red/20' : 'bg-accent-red/10'
        }`}
      />

      {/* Subtle secondary ambient orb for dark mode depth */}
      {currentTheme === 'dark' && (
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -60, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[100px] bg-accent-blue/10"
        />
      )}

      {/* Light mode base soft gradient */}
      {currentTheme === 'light' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-silver-100 via-white to-silver-200 opacity-60" />
      )}
    </div>
  );
};

export default AnimatedBackground;
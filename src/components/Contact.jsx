import React from 'react';
import { motion } from 'framer-motion';
import selfieImg from '../assets/selfie.webp';

const Contact = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-silver-50 dark:bg-obsidian-900/40">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <span className="text-sm font-bold tracking-widest text-accent-orange uppercase mb-4 inline-block">Collaboration</span>
          <h2 className="text-4xl xs:text-5xl md:text-7xl font-bold tracking-tight mb-8 text-text-primary uppercase"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Let's Start <span className="text-gradient">Something</span>.
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium">
            Have a project in mind or just want to say hi? I'm always ready for a new challenge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Personal Branding / Social Proof */}
          <motion.div 
            className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              {/* Animated Glow behind selfie */}
              <div className="absolute -inset-1 bg-sunset-gradient rounded-[3.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative w-72 h-96 md:w-80 md:h-[450px] overflow-hidden rounded-[3.5rem] border border-obsidian-700/20 glass">
                <img 
                  src={selfieImg} 
                  alt="Zach Howell" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-obsidian-950 p-5 rounded-2xl shadow-2xl border border-obsidian-700/10 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-text-primary">Available for Hire</span>
              </div>
            </div>

            <div className="text-center lg:text-left space-y-4">
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-text-primary tracking-tight">Zachary Howell</h3>
                <p className="text-accent-orange font-bold text-sm uppercase tracking-[0.3em]">Full-Stack Engineer</p>
              </div>
              
              {/* The "Anti-Boring" Philosophy */}
              <div className="relative pt-4">
                <p className="text-text-secondary text-base max-w-sm leading-relaxed italic border-l-4 border-accent-orange/40 pl-6 py-2">
                  "Boring code is a liability. I build high-performance, high-conversion engines for brands that are tired of looking like everyone else."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-End Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 glass-card rounded-[3rem] p-10 md:p-16 shadow-premium-hover overflow-hidden relative border border-obsidian-700/10"
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black tracking-[0.2em] text-accent-orange uppercase ml-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name Here"
                  className="w-full px-6 py-5 rounded-2xl bg-white dark:bg-obsidian-950 border border-obsidian-700/10 focus:border-accent-orange outline-none transition-all duration-300 placeholder:text-text-secondary/20 font-medium"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black tracking-[0.2em] text-accent-orange uppercase ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Your Email Here"
                  className="w-full px-6 py-5 rounded-2xl bg-white dark:bg-obsidian-950 border border-obsidian-700/10 focus:border-accent-orange outline-none transition-all duration-300 placeholder:text-text-secondary/20 font-medium"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-3">
                <label className="text-[10px] font-black tracking-[0.2em] text-accent-orange uppercase ml-1">Your Vision</label>
                <textarea 
                  rows="6" 
                  placeholder="Describe the project that's going to change your business..."
                  className="w-full px-6 py-5 rounded-[2rem] bg-white dark:bg-obsidian-950 border border-obsidian-700/10 focus:border-accent-orange outline-none transition-all duration-300 resize-none placeholder:text-text-secondary/20 font-medium"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
              <div className="md:col-span-2 text-center mt-8">
                <button
                  type="submit"
                  className="group relative px-16 py-6 bg-sunset-gradient text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent-red/20 hover:scale-[1.02] active:scale-95 transition-all duration-500 overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="relative z-10">Initialize Project</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>
            </form>
            
            {/* Ambient Background Glow */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-accent-orange/10 blur-[120px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React from 'react';
import { motion } from 'framer-motion';

const Contact = ({ handleMouseEnter, handleMouseLeave }) => {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-silver-50 dark:bg-obsidian-900/40">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-sm font-bold tracking-widest text-accent-orange uppercase mb-4 inline-block">Collaboration</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-text-primary"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Let's Start <span className="text-gradient">Something</span>.
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto font-medium">
            Have a project in mind or just want to say hi? I'm always ready for a new challenge.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="glass-card rounded-[3rem] p-10 md:p-16 shadow-premium-hover overflow-hidden relative"
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold tracking-widest text-accent-orange uppercase ml-1">Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-obsidian-950 border border-obsidian-700/10 focus:border-accent-orange outline-none transition-all duration-300 placeholder:text-text-secondary/30"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold tracking-widest text-accent-orange uppercase ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-obsidian-950 border border-obsidian-700/10 focus:border-accent-orange outline-none transition-all duration-300 placeholder:text-text-secondary/30"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-3">
              <label className="text-xs font-bold tracking-widest text-accent-orange uppercase ml-1">Message</label>
              <textarea 
                rows="5" 
                placeholder="Tell me about your project dreams..."
                className="w-full px-6 py-4 rounded-[2rem] bg-white dark:bg-obsidian-950 border border-obsidian-700/10 focus:border-accent-orange outline-none transition-all duration-300 resize-none placeholder:text-text-secondary/30"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </div>
            <div className="md:col-span-2 text-center mt-6">
              <button
                type="submit"
                className="px-12 py-5 bg-sunset-gradient text-white rounded-full font-bold shadow-lg shadow-accent-red/20 hover:scale-105 active:scale-95 transition-all duration-300"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Send Message
              </button>
            </div>
          </form>
          
          {/* Subtle background glow for the card */}
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-accent-orange/5 blur-[100px] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
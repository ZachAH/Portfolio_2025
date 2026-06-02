import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import selfieImg from '../assets/selfie.webp';

const CALENDLY_URL = 'https://calendly.com/zachary-zachhowell/30min';

// Lazily inject Calendly's popup widget assets (once) so the booking
// overlay can open on the page without the visitor ever leaving.
const ensureCalendly = () => {
  if (typeof document === 'undefined') return;

  if (!document.querySelector('link[data-calendly]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.setAttribute('data-calendly', 'true');
    document.head.appendChild(link);
  }

  if (!document.querySelector('script[data-calendly]')) {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.setAttribute('data-calendly', 'true');
    document.body.appendChild(script);
  }
};

const Contact = ({ handleMouseEnter, handleMouseLeave }) => {
  const [status, setStatus] = useState("IDLE"); // IDLE, SENDING, SUCCESS, ERROR

  // Preload the Calendly assets so the popup opens instantly on click.
  useEffect(() => {
    ensureCalendly();
  }, []);

  const openCalendly = (e) => {
    e.preventDefault();
    ensureCalendly();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      // Assets still loading — fall back to opening in a new tab.
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mzdkwpka", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("ERROR");
    }
  };

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
                  alt="Zach Howell — freelance full-stack web developer based in West Bend, Wisconsin"
                  loading="lazy"
                  decoding="async"
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

              {/* Ownership trust pill — reinforces the differentiator
                  right at the conversion point. */}
              <div className="pt-2">
                <div className="inline-flex items-start gap-3 px-5 py-4 rounded-2xl bg-green-50/80 dark:bg-green-900/10 border border-green-500/25 max-w-sm text-left">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <span className="block text-xs font-black uppercase tracking-[0.18em] text-green-700 dark:text-green-400 mb-1">
                      You Own Everything
                    </span>
                    <p className="text-xs text-text-secondary leading-relaxed font-medium">
                      Code, domain, and hosting are transferred to your accounts on launch day. No platform lock-in, no monthly "rent" to keep your own site.
                    </p>
                  </div>
                </div>
              </div>

              {/* Book-a-call path — captures visitors who'd rather talk
                  than fill out the form. Opens Calendly as an on-page
                  popup overlay. */}
              <div className="pt-4 w-full max-w-sm">
                <button
                  type="button"
                  onClick={openCalendly}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-accent-orange/30 bg-accent-orange/10 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-accent-orange transition-all hover:bg-accent-orange hover:text-white hover:scale-[1.02] active:scale-95"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  aria-label="Book a free 15-minute call with Zach Howell"
                >
                  <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Book a Free 15-Min Call</span>
                </button>
                <p className="mt-3 text-center text-xs text-text-secondary font-medium">
                  Prefer to talk? Grab a time — no commitment, no pressure.
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
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black tracking-[0.2em] text-accent-orange uppercase ml-1">Full Name</label>
                <input 
                  name="name"
                  required
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
                  name="email"
                  required
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
                  name="vision"
                  required
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
                  disabled={status === "SENDING"}
                  className="group relative px-16 py-6 bg-sunset-gradient text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-accent-red/20 hover:scale-[1.02] active:scale-95 transition-all duration-500 overflow-hidden disabled:opacity-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="relative z-10">
                    {status === "IDLE" && "Initialize Project"}
                    {status === "SENDING" && "Transmitting..."}
                    {status === "SUCCESS" && "Vision Received!"}
                    {status === "ERROR" && "Connect Error"}
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>

                {status === "SUCCESS" && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mt-6 text-xs font-black text-green-500 uppercase tracking-[0.3em] animate-pulse"
                  >
                    Check your inbox shortly, Zach is on it.
                  </motion.p>
                )}
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
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Seo from '../components/Seo';
import { breadcrumb } from '../utils/structuredData';

const auditItems = [
  { icon: '⚡', title: 'Performance & Speed', desc: 'Google PageSpeed score, load times, Core Web Vitals, and render-blocking resources.' },
  { icon: '🔍', title: 'SEO Health Check', desc: 'Meta tags, heading structure, schema markup, sitemap, and indexability issues.' },
  { icon: '📱', title: 'Mobile Responsiveness', desc: 'Layout shifts, tap targets, viewport configuration, and cross-device rendering.' },
  { icon: '🔒', title: 'Security & SSL', desc: 'HTTPS enforcement, mixed content warnings, and basic vulnerability flags.' },
  { icon: '♿', title: 'Accessibility', desc: 'Color contrast, alt text, ARIA labels, keyboard navigation, and WCAG compliance.' },
  { icon: '📊', title: 'Conversion Readiness', desc: 'CTA visibility, contact info placement, trust signals, and user flow analysis.' },
];

const Audit = ({ handleMouseEnter, handleMouseLeave }) => {
  const [form, setForm] = useState({ websiteUrl: '', email: '', name: '' });
  const [status, setStatus] = useState('IDLE'); // IDLE | SENDING | SUCCESS | ERROR

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('SENDING');

    try {
      await addDoc(collection(db, 'Projects'), {
        type: 'website_audit',
        websiteUrl: form.websiteUrl,
        email: form.email,
        name: form.name || 'Not provided',
        createdAt: serverTimestamp(),
      });
      setStatus('SUCCESS');
      setForm({ websiteUrl: '', email: '', name: '' });
    } catch (err) {
      console.error('Audit submission failed:', err);
      setStatus('ERROR');
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-white dark:bg-obsidian-950 relative overflow-hidden">
      <Seo
        title="Free Website Audit for Wisconsin Businesses | SEO, Speed & Security Review — Zach Howell"
        description="Get a free, no-obligation website audit for your Wisconsin business. I'll analyze performance, SEO health, mobile responsiveness, security, accessibility, and conversion readiness — then send you a personalized report within 48 hours."
        path="/audit"
        keywords="free website audit Wisconsin, SEO audit Milwaukee, website performance review WI, small business website analysis, free site audit Waukesha, website security check Wisconsin, Core Web Vitals audit, conversion optimization review Milwaukee"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              name: 'Free Website Audit for Wisconsin Businesses',
              url: 'https://zachhowell.dev/audit',
              description: 'Request a free comprehensive website audit covering performance, SEO, mobile, security, accessibility, and conversion readiness.',
            },
            breadcrumb([
              { name: 'Home', path: '/' },
              { name: 'Free Website Audit', path: '/audit' },
            ]),
          ],
        }}
      />

      <div className="absolute top-0 left-0 w-full h-1 bg-sunset-gradient opacity-20" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
            No Cost · No Obligation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-text-primary uppercase mb-6">
            Free Website <span className="text-gradient">Audit</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Drop your URL and I'll personally review your website across 6 critical areas.
            You'll get an honest, actionable report sent straight to your inbox — no sales pitch, no strings attached.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* What I Audit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-tight">What I'll Analyze</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {auditItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="p-5 rounded-2xl border border-obsidian-700/10 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]"
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-sm font-bold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Trust note */}
            <div className="mt-8 p-4 rounded-xl bg-green-50/80 dark:bg-green-900/10 border border-green-500/20 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <span className="text-sm font-bold text-green-700 dark:text-green-400 block mb-1">100% Free — No Strings Attached</span>
                <p className="text-xs text-green-600 dark:text-green-500 leading-relaxed">
                  This isn't a lead funnel disguised as a freebie. I personally review every site and send you
                  a real report with actionable findings. If your site is already solid, I'll tell you that too.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-card rounded-3xl p-8 md:p-10 border border-obsidian-700/10 dark:border-white/10">
              <h2 className="text-2xl font-bold text-text-primary mb-2 tracking-tight">Request Your Audit</h2>
              <p className="text-sm text-text-secondary mb-8">Takes 30 seconds. I'll reply within 48 hours.</p>

              {status === 'SUCCESS' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Audit Request Received</h3>
                  <p className="text-sm text-text-secondary max-w-sm mx-auto">
                    I'll personally review your site and send a detailed report to your inbox within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="websiteUrl" className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                      Your Website URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="websiteUrl"
                      name="websiteUrl"
                      required
                      placeholder="yourbusiness.com"
                      value={form.websiteUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 text-text-primary placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange/50 focus:border-accent-orange transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="you@yourbusiness.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 text-text-primary placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange/50 focus:border-accent-orange transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
                      Your Name <span className="text-gray-400 font-normal normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-obsidian-900/50 border border-obsidian-700/10 dark:border-white/10 text-text-primary placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-accent-orange/50 focus:border-accent-orange transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'SENDING'}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="w-full py-4 rounded-full bg-sunset-gradient text-white font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'SENDING' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : 'Get My Free Audit'}
                  </button>

                  {status === 'ERROR' && (
                    <p className="text-sm text-red-500 text-center font-medium">
                      Something went wrong. Please try again or email me directly at zachary@zachhowell.com.
                    </p>
                  )}

                  <p className="text-[10px] text-center text-gray-400 dark:text-gray-600 uppercase tracking-widest font-bold">
                    Your info is never shared or sold — ever.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Audit;

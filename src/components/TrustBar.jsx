import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaCode, FaShieldAlt, FaFacebookF } from 'react-icons/fa';

// ── TRUST BAR ─────────────────────────────────────────────
// Positioned right after the hero so visitors who don't know
// Zach personally immediately see the credibility signals:
// experience, location, response time, and guarantees.
// Designed to reduce apprehension before they scroll to Projects.

const stats = [
  {
    icon: <FaCode className="w-5 h-5" />,
    value: '6+',
    label: 'Years Building',
    sub: 'Full-Stack Experience',
  },
  {
    icon: <FaShieldAlt className="w-5 h-5" />,
    value: '82+',
    label: 'Projects Shipped',
    sub: 'Live In Production',
  },
  {
    icon: <FaMapMarkerAlt className="w-5 h-5" />,
    value: 'WI',
    label: 'New Berlin',
    sub: 'Wisconsin, USA',
  },
  {
    icon: <FaClock className="w-5 h-5" />,
    value: '24h',
    label: 'Response Time',
    sub: 'Direct-Line Support',
  },
];

const guarantees = [
  {
    title: 'Fixed Pricing',
    copy: 'Transparent tiers. No surprise invoices after the build starts.',
  },
  {
    title: 'You Own Everything',
    copy: 'Code, domain, hosting, every account and credential — 100% yours on launch day. I email you a secure master-list of every login created.',
  },
  {
    title: 'Direct Access',
    copy: 'Work directly with the developer. No account managers or middlemen.',
  },
  {
    title: 'Discovery Is Free',
    copy: 'No contracts or deposits until we both agree on scope and fit.',
  },
];

const riskReversals = [
  {
    title: '48-Hour Deadline Guarantee',
    copy: 'If I take longer than 48 hours to go live, you get a full refund — and you keep the site. I still build it, deploy it, and hand it over. Free.',
  },
  {
    title: '90+ Across All Lighthouse Audits',
    copy: 'Your site hits 90+ on every Google Lighthouse category — Performance, Accessibility, Best Practices, and SEO — or I optimize it for free until it does.',
  },
];

// ── ADD NEW REVIEWS HERE ──────────────────────────────────────
// Fields:
//   name   – reviewer's name
//   meta   – short subtitle shown under the name
//              Google:   e.g. 'Local Guide · 12 reviews'
//              Facebook: e.g. 'New Berlin, WI' or their business name, or ''
//   text   – the review body (keep under ~300 chars for best display)
//   date   – 'Month Year'  e.g. 'June 2025'
//   source – 'google' | 'facebook'
const reviews = [
  {
    name: 'Kettle Moraine Professional Cleaners',
    meta: 'Professional Cleaning Service · West Bend, WI',
    text: 'ZH Web Solutions helped our business revamp our site and we are over the moon happy with it! Thanks again for the amazing work!',
    date: 'April 2026',
    source: 'facebook',
  },
  {
    name: 'Rachel M.',
    meta: 'New Berlin, WI',
    text: 'Zach is such a professional. He helped me understand what was going on in the process which gave me confidence in the results. He got it done! 10/10 recommend',
    date: 'April 2025',
    source: 'google',
  },
  {
    name: 'Gutters Craft LLC',
    meta: 'Gutter Services · Greenfield, WI',
    text: 'ZH Website Solutions absolutely exceeded every expectation I had. The design and functionality were tailored specifically to my business. They understood exactly what I needed and turned it into a clean, high-performing site that has already increased my calls and bookings. Hands down the best investment you can make.',
    date: 'April 2026',
    source: 'facebook',
  },
  {
    name: 'David H.',
    meta: 'Fond Du Lac, WI',
    text: 'Easy to navigate, very clearly details options and puts the power to choose in your hands! We finally have a choice for outstanding web solutions!',
    date: 'March 2026',
    source: 'google',
  },
  {
    name: 'Lake Breeze Laundry',
    meta: 'Professional Laundry Service · Port Washington, WI',
    text: 'ZH Website Solutions was easy to work with, professional, and delivered a clean, effective website that made my business stand out.',
    date: 'March 2026',
    source: 'facebook',
  },
  
];

const StarRow = () => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewTicker = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reviews.length <= 1 || paused) return;
    const id = setInterval(() => setIndex(i => (i + 1) % reviews.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const r = reviews[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.35 }}
      className="max-w-3xl mx-auto mb-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-obsidian-950/60 border border-obsidian-700/10 dark:border-white/10 shadow-sm px-7 py-6 min-h-[120px] flex flex-col justify-between gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex gap-4 items-start"
          >
            {/* Avatar initial */}
            <div className="w-9 h-9 rounded-full bg-accent-orange/15 text-accent-orange flex items-center justify-center font-black text-sm shrink-0 uppercase">
              {r.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-sm font-black text-text-primary">{r.name}</span>
                <span className="text-[10px] text-text-secondary font-medium">{r.meta}</span>
                <span className="text-[10px] text-text-secondary/60 ml-auto shrink-0">{r.date}</span>
              </div>
              <StarRow />
              <p className="mt-2 text-sm text-text-secondary leading-relaxed font-medium">
                "{r.text}"
              </p>
            </div>
            {/* Source badge */}
            <div className="shrink-0 mt-0.5">
              {r.source === 'google' ? (
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center">
                  <FaFacebookF className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot pagination — only shown when there are multiple reviews */}
        {reviews.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-4 h-1.5 bg-accent-orange'
                    : 'w-1.5 h-1.5 bg-obsidian-700/20 dark:bg-white/20 hover:bg-accent-orange/50'
                }`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const processSteps = [
  {
    hours: '0 – 4',
    title: 'Onboarding',
    description: 'Intake form, brand asset audit, and initial brief confirmation.',
  },
  {
    hours: '4 – 24',
    title: 'Development',
    description: 'Template customization, content integration, SEO infrastructure, and DNS setup.',
  },
  {
    hours: '24 – 36',
    title: 'Review',
    description: 'Live preview link for your feedback. Consolidated revision requests.',
  },
  {
    hours: '36 – 48',
    title: 'Deployment',
    description: 'Domain connection, final QA, and your site goes live worldwide. Once live, you are emailed every credential — emails, passwords, hosting access, and source code. Full ownership is yours.',
  },
];

const TrustBar = () => {
  return (
    <section
      aria-labelledby="trust-bar-heading"
      className="relative py-24 px-6 md:px-12 lg:px-24 border-y border-obsidian-700/10 dark:border-white/5 bg-silver-50/60 dark:bg-obsidian-900/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
            Why Work With Me
          </span>
          <h2
            id="trust-bar-heading"
            className="text-3xl md:text-5xl font-bold tracking-tighter text-text-primary uppercase"
          >
            Built on <span className="text-gradient">Trust</span>.
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
            I'm a real developer based in Wisconsin — not an agency, not an offshore team.
            Every project ships from my desk, with my name attached.
          </p>
        </motion.div>

        {/* Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative p-6 md:p-8 rounded-3xl bg-white dark:bg-obsidian-950/60 border border-obsidian-700/10 dark:border-white/10 backdrop-blur-md shadow-sm hover:shadow-premium transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-orange/10 text-accent-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black tracking-tighter text-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-bold text-text-primary uppercase tracking-wide">
                {stat.label}
              </div>
              <div className="text-[10px] md:text-xs font-medium text-text-secondary uppercase tracking-widest mt-1">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── REVIEW BADGES ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          <a
            href="https://share.google/HABgclhBCUanTjoW2"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-5 px-7 py-5 rounded-2xl bg-white dark:bg-obsidian-950/60 border border-obsidian-700/10 dark:border-white/10 shadow-sm hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Google G logo */}
            <svg className="w-9 h-9 shrink-0" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>

            {/* Stars + rating */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-black text-text-primary ml-1">5.0</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-text-secondary">See my reviews</span>
                <span className="text-xs font-bold text-blue-500 group-hover:underline flex items-center gap-1">
                  See reviews
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61573480569044"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-5 px-7 py-5 rounded-2xl bg-white dark:bg-obsidian-950/60 border border-obsidian-700/10 dark:border-white/10 shadow-sm hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="w-9 h-9 rounded-full shrink-0 bg-[#1877F2] text-white flex items-center justify-center">
              <FaFacebookF className="w-4 h-4" />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-black text-text-primary ml-1">Facebook</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-text-secondary">See my reviews</span>
                <span className="text-xs font-bold text-[#1877F2] group-hover:underline flex items-center gap-1">
                  See reviews
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </motion.div>

        {/* ── REVIEW TICKER ─────────────────────────────────── */}
        <ReviewTicker />

        {/* Guarantees Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-white dark:bg-obsidian-950/40 border border-accent-orange/20 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary">
              The ZH Web Solutions Promise
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {guarantees.map((g) => (
              <div key={g.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-accent-orange shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-sm font-black uppercase tracking-wide text-text-primary">
                    {g.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium pl-7">
                  {g.copy}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RISK REVERSAL ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {riskReversals.map((r) => (
            <div
              key={r.title}
              className="p-6 md:p-8 rounded-3xl bg-green-50/80 dark:bg-green-900/10 border border-green-500/20 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                <FaShieldAlt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wide text-text-primary mb-1">
                  {r.title}
                </h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
                  {r.copy}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── HOW IT WORKS — 48-HOUR TIMELINE ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-black tracking-[0.3em] text-accent-orange uppercase mb-4 inline-block">
              How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-text-primary uppercase">
              Your 48-Hour <span className="text-gradient">Roadmap</span>
            </h2>
            <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
              Every hour is accounted for. Speed isn't cutting corners — it's the result of a refined,
              specialized system built to deliver professional results on a predictable timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-6 md:p-8 rounded-3xl bg-white dark:bg-obsidian-950/60 border border-obsidian-700/10 dark:border-white/10 backdrop-blur-md"
              >
                <div className="text-xs font-black tracking-[0.2em] text-accent-orange uppercase mb-3">
                  Hour {step.hours}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed font-medium">
                  {step.description}
                </p>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-accent-orange/40">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/templates"
              className="inline-flex items-center gap-3 px-8 py-4 bg-sunset-gradient text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Choose Your Template & Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBar;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const CallSetupModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-obsidian-950 border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="w-12 h-12 rounded-2xl bg-accent-orange/10 text-accent-orange flex items-center justify-center mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a2 2 0 011.894 1.368l1.09 3.272a2 2 0 01-.455 2.055l-1.57 1.57a16.042 16.042 0 006.415 6.415l1.57-1.57a2 2 0 012.055-.455l3.272 1.09A2 2 0 0121 18.72V22a2 2 0 01-2 2h-1C9.716 24 0 14.284 0 2V1a2 2 0 012-2h1z" />
              </svg>
            </div>

            <h3 className="text-2xl font-black text-obsidian-950 dark:text-white mb-3">
              Start Your Partnership
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              To ensure we build the perfect custom architecture for your business, let's have a quick discovery call. You'll speak directly with me to discuss your goals and technical needs.
            </p>

            <a
              href="tel:2623417181"
              className="block w-full"
            >
              <button
                className="w-full py-3.5 rounded-full bg-accent-orange text-white font-bold text-sm hover:bg-accent-orange/90 active:scale-95 transition-all shadow-md"
              >
                Call Now
              </button>
            </a>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const PricingCard = ({ title, price, description, features, notIncluded, accent, isPopular, link, stripeUrl, guarantee, modalType, subtext }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`relative p-8 rounded-3xl border transition-all duration-300 hover:shadow-premium flex flex-col h-full ${isPopular
          ? 'border-accent-orange bg-white dark:bg-obsidian-900/40 shadow-xl'
          : 'border-obsidian-700/10 dark:border-obsidian-700/20 bg-gray-50/50 dark:bg-white/5 backdrop-blur-md'
          }`}
      >
        {isPopular && (
          <motion.span
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-orange text-white text-xs font-bold rounded-full uppercase tracking-widest z-50 shadow-lg"
          >
            Most Popular
          </motion.span>
        )}

        <h3 className="text-2xl font-bold text-obsidian-950 dark:text-white mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-bold text-obsidian-950 dark:text-white">{price}</span>
          {price.includes('/') && <span className="text-gray-500 dark:text-gray-300 text-sm font-medium">/month</span>}
        </div>
        {subtext && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">{subtext}</p>
        )}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">{description}</p>

        {guarantee && (
          <div className="mb-6 p-3 rounded-xl bg-green-50/80 dark:bg-green-900/10 border border-green-500/20 flex items-center gap-2.5">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs font-bold text-green-700 dark:text-green-400">{guarantee}</span>
          </div>
        )}

        <ul className="space-y-4 mb-4 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-obsidian-900 dark:text-gray-200">
              <svg className={`w-5 h-5 ${accent} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {notIncluded && notIncluded.length > 0 && (
          <div className="mb-8 pt-4 border-t border-gray-200 dark:border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-400 mb-3 block">Not included</span>
            <ul className="space-y-2">
              {notIncluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-gray-400 dark:text-gray-400">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!notIncluded && <div className="mb-8" />}

        {modalType === 'call' ? (
          <button
            onClick={() => setShowModal(true)}
            className={`w-full py-4 rounded-full font-bold transition-all active:scale-95 shadow-md text-center block ${isPopular
              ? 'bg-accent-orange text-white hover:bg-accent-orange/90'
              : 'bg-obsidian-950 text-white dark:bg-white dark:text-obsidian-950 hover:opacity-90'
              }`}
          >
            {isPopular ? 'Get Started' : 'Get Started'}
          </button>
        ) : stripeUrl ? (
          <button
            onClick={() => setShowModal(true)}
            className={`w-full py-4 rounded-full font-bold transition-all active:scale-95 shadow-md text-center block ${isPopular
              ? 'bg-accent-orange text-white hover:bg-accent-orange/90'
              : 'bg-obsidian-950 text-white dark:bg-white dark:text-obsidian-950 hover:opacity-90'
              }`}
          >
            {isPopular ? 'Order Now' : 'Get Started'}
          </button>
        ) : (
          <Link
            to={link || "/contact"}
            className={`w-full py-4 rounded-full font-bold transition-all active:scale-95 shadow-md text-center block ${isPopular
              ? 'bg-accent-orange text-white hover:bg-accent-orange/90'
              : 'bg-obsidian-950 text-white dark:bg-white dark:text-obsidian-950 hover:opacity-90'
              }`}
          >
            {isPopular ? 'Get Started' : 'Get Started'}
          </Link>
        )}
      </motion.div>

      {modalType === 'call' && <CallSetupModal isOpen={showModal} onClose={() => setShowModal(false)} />}
      {modalType !== 'call' && stripeUrl && <CheckoutReadyModal isOpen={showModal} onClose={() => setShowModal(false)} stripeUrl={stripeUrl} title={title} />}
    </>
  );
};

const PricingGuides = () => {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState('custom');

  useEffect(() => {
    if (hash === '#custom-builds') {
      setActiveTab('custom');
    } else if (hash === '#partnership-plans') {
      setActiveTab('growth');
    }
  }, [hash]);

  const content = {
    growth: [
      {
        title: "The Sentry",
        price: "$50/mo",
        description: "Zero-latency infrastructure and security for high-performance React applications.",
        features: [
          "Netlify Edge-Network Hosting",
          "Vite-Optimized Asset Delivery",
          "Porkbun DNS & SSL Management",
          "24/7 Automated Uptime Sentry",
          "CI/CD Deployment Monitoring",
          "Security & Dependency Patching"
        ],
        accent: "text-emerald-500",
        modalType: "call",
        link: "/contact"
      },
      {
        title: "The Pilot",
        price: "$125/mo",
        description: "Peace of mind with monthly expert care and future-proof optimization.",
        features: [
          "Includes Sentry Plan",
          "Monthly AI Visibility Tuning",
          "Google Authority Maintenance",
          "1 Expert Hour / month"
        ],
        accent: "text-blue-500",
        modalType: "call",
        link: "/contact"
      },
      {
        title: "The Navigator",
        price: "$400/mo",
        description: "Active scaling for brands that need regular feature updates, deep SEO, and data-driven growth.",
        features: [
          "Includes Pilot Plan",
          "4 Expert Hours / month",
          "Behavioral GA4 Analysis",
          "Conversion-Tuned Updates",
          "Full SEO & AI Health Audit",
          "Priority 24h Support"
        ],
        accent: "text-accent-orange",
        isPopular: true,
        modalType: "call",
        link: "/contact"
      },
      {
        title: "The Co-Pilot",
        price: "$900/mo",
        description: "A dedicated full-stack partner for high-traffic or E-commerce brands.",
        features: [
          "Includes Navigator Plan",
          "10 Expert Hours / month",
          "Strategy & AI Sync Calls",
          "Direct Slack/Text Access"
        ],
        accent: "text-purple-500",
        modalType: "call",
        link: "/contact"
      }],
    managed: [
      {
        title: "Launch",
        price: "$99/mo",
        description: "A professionally built website for businesses that want a strong online presence without the large upfront project cost. Ideal for businesses that want a clean, modern site with the essentials fully handled.",
        features: [
          "Custom-designed website",
          "Hosting, SSL, and uptime management",
          "Basic on-page SEO setup",
          "Mobile optimization",
          "1 small content update per month",
          "Ongoing security and maintenance"
        ],
        notIncluded: [
          "Advanced SEO campaigns",
          "Large design revisions",
          "Custom integrations or advanced CMS features"
        ],
        subtext: "+ $499 Setup Fee",
        accent: "text-blue-500",
        modalType: "call",
        link: "/contact"
      },
      {
        title: "Growth",
        price: "$195/mo",
        description: "A managed website designed to help your business do more than just look good online. Best for businesses that want stronger visibility, performance insights, and regular ongoing improvements.",
        features: [
          "Everything in Launch",
          "Expanded site structure",
          "3 content updates per month",
          "GA4 analytics tracking",
          "Monthly GA4 & Performance Audits",
          "Insights on top pages, traffic trends, and visitor behavior",
          "Faster turnaround on routine edits"
        ],
        notIncluded: [
          "Major feature development",
          "Large redesign requests",
          "Advanced custom application functionality"
        ],
        subtext: "+ $699 Setup Fee",
        accent: "text-accent-orange",
        isPopular: true,
        modalType: "call",
        link: "/contact"
      },
      {
        title: "Partner",
        price: "$395/mo",
        description: "A hands-on website partnership for businesses that want consistent improvements, priority support, and a developer actively helping the site perform better over time. This plan is for businesses that want ongoing attention, not just maintenance.",
        features: [
          "Everything in Growth",
          "5+ content updates per month",
          "Direct Senior Engineer Access",
          "Unlimited Strategic Consults",
          "Conversion and content recommendations",
          "Ongoing technical improvements",
          "Deeper analytics review"
        ],
        notIncluded: [
          "Full custom web app development",
          "Large-scale rebuilds",
          "Heavy third-party system integrations unless scoped separately"
        ],
        subtext: "+ $1199 Setup Fee",
        accent: "text-purple-500",
        modalType: "call",
        link: "/contact"
      }
    ],
    templates: [
      {
        title: "The 72h Sprint",
        price: "$1,400",
        description: "Velocity as a Service. I take your selected foundation and transform it into a high-performance, live brand in exactly 48 hours. One fixed price — no hidden fees, no recurring charges.",
        features: [
          "Full Source Code Ownership — yours on day one",
          "You own the domain, hosting & every account",
          "Brand DNA & Asset Integration",
          "White-Glove DNS & Infrastructure Setup",
          "Domain pushed to your Porkbun, site transferred to your Netlify",
          "3-Day Deployment Guaranteed",
          "Local SEO Metadata Injection",
          "90+ Across All Lighthouse Audits Guaranteed",
        ],
        notIncluded: [
          "Custom feature development",
          "Ongoing hosting (available via Growth Plans)",
          "Stock photography or copywriting",
        ],
        guarantee: "Miss the 72h deadline and you get a full refund — keep the site free. Miss 90+ Lighthouse across all audits and I fix it free.",
        accent: "text-accent-orange",
        isPopular: true,
        stripeUrl: import.meta.env.VITE_STRIPE_SPRINT_URL
      },
      {
        title: "Modern Edge",
        price: "$2,000",
        description: "For brands that need to command attention. High-impact UI paired with complex motion logic to establish immediate market authority.",
        features: ["Elite Source Code Access",
          "Aggressive GSAP Motion Engine",
          "GA4 & Search Console Infrastructure",
          "Technical SEO & Core Web Vitals Audit",
          "Advanced Brand DNA Sculpting"],
        notIncluded: [
          "E-commerce / payment integration",
          "Ongoing hosting (available via Growth Plans)",
        ],
        accent: "text-accent-blue",
        stripeUrl: import.meta.env.VITE_STRIPE_MODERN_URL
      },
      {
        title: "Commerce Launch",
        price: "$3,200",
        description: "A secure revenue machine. I'll deploy your full shop with functional cart and inventory logic.",
        features: ["Choice of Elite E-Com Foundation",
          "Strategic Inventory & SKU Setup",
          "Secure Stripe Merchant Integration",
          "Conversion-First Checkout Flow",
          "7-Day Post-Launch Support Window"],
        accent: "text-purple-500",
        stripeUrl: import.meta.env.VITE_STRIPE_COMMERCE_URL
      }
    ],
    custom: [
      { title: "Landing Page", price: "$800–$1,200", description: "High-conversion single page for lead gen, product launches, or portfolios.", features: ["Single Page Design", "Lead Gen & CTA Optimized", "React/Tailwind Stack", "Performance Optimized"], notIncluded: ["Domain, hosting & DevOps (see below)", "Stock photography or copywriting"], accent: "text-gray-500 dark:text-silver-400", link: "/custom-discovery" },
      { title: "Business Site", price: "$1,500–$3,000", description: "A polished, fast online home for service providers. 3–6 custom pages.", features: ["3–6 Custom Pages", "UI/UX Flow Design", "SEO & Local Metadata", "Performance Optimized"], notIncluded: ["Domain, hosting & DevOps (see below)", "Stock photography or copywriting"], accent: "text-blue-500", link: "/custom-discovery" },
      { title: "Dynamic + CMS", price: "$3,500–$6,000", description: "Advanced builds with a custom Admin Dashboard via Firebase/Firestore.", features: ["Everything in Business", "Secure Admin Portal", "Real-Time Content Updates", "Asset Management"], notIncluded: ["Domain, hosting & DevOps (see below)"], accent: "text-accent-orange", isPopular: true, link: "/custom-discovery" },
      { title: "E-Commerce / Web App", price: "$5,000–$8,500+", description: "Full-scale stores or complex application logic with React/Next.js.", features: ["Custom API Logic", "Stripe Integration", "Complex Business Logic", "Scalable Architecture"], notIncluded: ["Domain, hosting & DevOps (see below)"], accent: "text-emerald-500", link: "/custom-discovery" },
      { title: "Total Brand Launch", price: "$6,000–$9,000+", description: "The full package — website, CMS, brand identity, DevOps, and 3 months of dedicated support.", features: ["Full Custom Website + CMS", "Brand Identity & Logo", "Domain, Hosting & Full DevOps", "3 Months Support Included"], accent: "text-purple-500", link: "/custom-discovery" }
    ]
  };

  return (
    <section id="custom-builds" className="py-24 px-6 relative overflow-hidden bg-white dark:bg-obsidian-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6">
            Pricing & <span className="text-gradient">Partnership</span>
          </h2>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 backdrop-blur-md rounded-full w-fit border border-black/5 dark:border-white/10">
              {['growth', 'managed', 'custom'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all uppercase tracking-widest ${activeTab === tab ? 'bg-white dark:bg-white dark:text-obsidian-950 shadow-md' : 'text-gray-500 dark:text-gray-300 hover:text-accent-orange'
                    }`}
                >
                  {tab === 'growth' ? 'Partnership Plans' : tab === 'managed' ? 'Managed Website Plans' : 'Custom Builds'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── LAUNCH PRICING BANNER (templates tab only) ──── */}
        <AnimatePresence>
          {activeTab === 'growth' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 md:p-5 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <span className="text-sm font-bold text-amber-800 dark:text-amber-300">
                Partnership plans are only available for websites that are custom builds.
              </span>
            </motion.div>
          )}
          {activeTab === 'managed' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 md:p-5 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-500/25 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-bold text-green-800 dark:text-green-300">
                Same Premium Websites as Custom Builds — Professional Quality Without the Upfront Cost
              </span>
            </motion.div>
          )}

        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={`md:col-span-3 gap-8 ${content[activeTab].length > 3 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid grid-cols-1 md:grid-cols-3'}`}
            >
              {content[activeTab].map((item, idx) => (
                <PricingCard key={`${activeTab}-${idx}`} {...item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM CONTEXTUAL SECTIONS (tab-aware) ──── */}
        <AnimatePresence mode="wait">
          {activeTab === 'growth' ? (
            <motion.div
              key="growth-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-20 p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-accent-orange/20 text-center max-w-4xl mx-auto shadow-sm"
            >
              <h4 className="text-xl font-bold text-obsidian-950 dark:text-white mb-3 flex items-center justify-center gap-2">
                The Advantage of Working With Me
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic text-sm sm:text-base">
                "I build with modern frameworks like React and TailwindCSS, meaning I am significantly faster than developers using
                legacy builders. An 'hour' of my time usually covers what takes other agencies three — you're paying for rapid,
                professional execution on a world-class foundation."
              </p>
            </motion.div>
          ) : activeTab === 'managed' ? (
            <motion.div
              key="managed-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-20 max-w-4xl mx-auto"
            >
              <div className="p-6 md:p-8 bg-gradient-to-br from-green-50/80 to-green-100/50 dark:from-green-900/10 dark:to-green-800/5 rounded-3xl border border-green-500/20 shadow-sm mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-obsidian-950 dark:text-white mb-2">Why This Drives Better Results</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                      Template sites can get a business online, but they often create clutter, slower performance, and messaging that does not convert well. With these plans, I handle everything—you just pay a monthly fee and literally have a senior engineer on your team. Call or text anytime you need updates, and I keep your site optimized and performing at its best.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {[
                        'Senior engineer on your team—call or text anytime',
                        'I handle all hosting, security, and optimization',
                        'Faster load times that keep visitors engaged',
                        'Cleaner structure that search engines love',
                        'Stronger calls to action that convert more visitors',
                        'Zero maintenance headaches—just tell me what you need'
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">
                      The smarter choice for businesses that want more visibility, more credibility, and more leads
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-white dark:bg-obsidian-950 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Stop Paying the "Template Tax"</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                      The big three platforms look cheap upfront, but their hidden costs and limitations add up fast. Here's the real breakdown:
                    </p>
                    
                    <div className="space-y-4 mb-4">
                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wider">Wix - The App Trap</h5>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 mb-2">
                          <div className="flex justify-between">
                            <span>Base plan (Core):</span>
                            <span className="font-semibold text-red-600">$29/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Business plan:</span>
                            <span className="font-semibold text-red-600">$36/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Custom domain:</span>
                            <span className="font-semibold text-red-600">$15–$25/year</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Apps (SEO, forms, etc.):</span>
                            <span className="font-semibold text-red-600">$5–$50/month each</span>
                          </div>
                        </div>
                        <div className="pt-2 mt-2 border-t border-gray-200 dark:border-white/10">
                          <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                            <span>Realistic monthly total:</span>
                            <span className="font-bold text-red-600">$50–$150+/month</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
                          Hidden gotcha: The app marketplace is where they get you. Need booking? Extra. Advanced SEO? Extra. Email marketing? Extra.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wider">Squarespace - The Clean Trap</h5>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 mb-2">
                          <div className="flex justify-between">
                            <span>Basic plan:</span>
                            <span className="font-semibold text-red-600">$23/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Business plan:</span>
                            <span className="font-semibold text-red-600">$33/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Commerce plans:</span>
                            <span className="font-semibold text-red-600">$36–$65/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Email campaigns:</span>
                            <span className="font-semibold text-red-600">$7–$54/month</span>
                          </div>
                        </div>
                        <div className="pt-2 mt-2 border-t border-gray-200 dark:border-white/10">
                          <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                            <span>Realistic monthly total:</span>
                            <span className="font-bold text-red-600">$40–$120+/month</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
                          Hidden gotcha: 3% transaction fee on Business plan unless you upgrade. Their own add-ons (email, memberships) stack up fast.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wider">Shopify - The E-commerce Trap</h5>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 mb-2">
                          <div className="flex justify-between">
                            <span>Basic plan:</span>
                            <span className="font-semibold text-red-600">$39/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shopify plan:</span>
                            <span className="font-semibold text-red-600">$105/month</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Premium themes:</span>
                            <span className="font-semibold text-red-600">$100–$400 one-time</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Apps (reviews, upsells):</span>
                            <span className="font-semibold text-red-600">$10–$100/month each</span>
                          </div>
                        </div>
                        <div className="pt-2 mt-2 border-t border-gray-200 dark:border-white/10">
                          <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                            <span>Realistic monthly total:</span>
                            <span className="font-bold text-red-600">$100–$500+/month</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
                          Hidden gotcha: Most stores need 5–10 apps, adding $100–$300/month. Plus payment processing fees on every transaction.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 mb-4">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wider">Side-by-Side Reality Check</h5>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-slate-600 dark:text-slate-300">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-white/10">
                              <th className="text-left py-2">Platform</th>
                              <th className="text-center py-2">Advertised</th>
                              <th className="text-center py-2">Realistic Cost</th>
                              <th className="text-center py-2">Code Ownership</th>
                              <th className="text-center py-2">Portability</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-red-100/30">
                              <td className="py-2 font-bold">Wix</td>
                              <td className="text-center">$17/mo</td>
                              <td className="text-center font-semibold text-red-600">$50–$150</td>
                              <td className="text-center">❌ None</td>
                              <td className="text-center">❌ Locked in</td>
                            </tr>
                            <tr className="border-b border-red-100/30">
                              <td className="py-2 font-bold">Squarespace</td>
                              <td className="text-center">$16/mo</td>
                              <td className="text-center font-semibold text-red-600">$40–$120</td>
                              <td className="text-center">❌ None</td>
                              <td className="text-center">❌ Locked in</td>
                            </tr>
                            <tr>
                              <td className="py-2 font-bold">Shopify</td>
                              <td className="text-center">$29/mo</td>
                              <td className="text-center font-semibold text-red-600">$100–$500</td>
                              <td className="text-center">❌ None</td>
                              <td className="text-center">Limited</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 uppercase tracking-wider">The Big Picture vs. Custom React</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-bold text-slate-900 dark:text-white text-xs mb-2">Template Sites (3 years):</h6>
                          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                            <li>• Cost: $1,500–$5,000+</li>
                            <li>• Nothing to show for it</li>
                            <li>• No code you own</li>
                            <li>• Can't migrate easily</li>
                            <li>• Looks like a template</li>
                          </ul>
                        </div>
                        <div>
                          <h6 className="font-bold text-slate-900 dark:text-white text-xs mb-2">Custom React Site:</h6>
                          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                            <li>• Higher upfront, lower long-term</li>
                            <li>• You own everything</li>
                            <li>• Scales infinitely better</li>
                            <li>• Any dev can take over</li>
                            <li>• Worth it past year 2-3</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest text-center mt-3 pt-3 border-t border-gray-200 dark:border-white/10">
                        My managed plans: Professional React site + ongoing care for $99–$395/month
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-white dark:bg-obsidian-950 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">The Agency Price Reality Check</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                      Traditional agencies charge astronomical rates for the same professional quality. Here's what businesses typically pay elsewhere:
                    </p>
                    
                    <div className="space-y-4 mb-4">
                      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-200 dark:border-white/10">
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wider">Website Build (React Site)</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Freelancer / small agency:</span>
                            <span className="font-semibold text-red-600">$3,000 – $10,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Mid-size agency:</span>
                            <span className="font-semibold text-red-600">$10,000 – $40,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Large / premium agency:</span>
                            <span className="font-semibold text-red-600">$40,000 – $150,000+</span>
                          </div>
                          <div className="pt-2 mt-2 border-t border-gray-200 dark:border-white/10">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Typical small-to-mid business:</span>
                              <span className="text-sm font-bold text-red-600">$5,000 – $20,000</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-200 dark:border-white/10">
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wider">Monthly Ongoing Costs</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Basic managed hosting:</span>
                            <span className="font-semibold text-red-600">$50 – $200/month</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Mid-tier (AWS/Vercel/Netlify):</span>
                            <span className="font-semibold text-red-600">$100 – $500/month</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">High-traffic or complex:</span>
                            <span className="font-semibold text-red-600">$500 – $2,000+/month</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-200 dark:border-white/10">
                        <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-3 uppercase tracking-wider">Monthly Maintenance Plans</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Basic (security, minor fixes):</span>
                            <span className="font-semibold text-red-600">$150 – $500/month</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Standard (content updates, support):</span>
                            <span className="font-semibold text-red-600">$500 – $1,500/month</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600 dark:text-gray-300">Premium (ongoing dev, features):</span>
                            <span className="font-semibold text-red-600">$1,500 – $5,000+/month</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 mb-4">
                      <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-2 uppercase tracking-wider">Realistic Agency Total (Small Business)</h5>
                      <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        <div className="flex justify-between">
                          <span>Build (one-time):</span>
                          <span className="font-bold text-red-600">$8,000–$15,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hosting:</span>
                          <span className="font-bold text-red-600">$100–$200/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Maintenance plan:</span>
                          <span className="font-bold text-red-600">$300–$800/month</span>
                        </div>
                        <div className="flex justify-between pt-2 mt-2 border-t border-gray-200 dark:border-white/10">
                          <span className="font-bold text-slate-900 dark:text-white">Monthly ongoing total:</span>
                          <span className="font-bold text-red-600">$400–$1,000/month</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest text-center">
                      My managed plans: $99–$395/month with professional build included
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/5 rounded-3xl border border-blue-500/20 shadow-sm mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-obsidian-950 dark:text-white mb-2">The Senior Engineer Factor</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-3">
                      Stop talking to bots; start talking to the engineer who built your site. You're hiring a developer with 6+ years of experience, not a support ticket system.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Direct Engineer Access', 'No Support Tickets', '6+ Years Experience', 'Strategic Partner'].map((item) => (
                        <span key={item} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/15 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gradient-to-br from-amber-50/80 to-amber-100/50 dark:from-amber-900/10 dark:to-amber-800/5 rounded-3xl border border-amber-500/20 shadow-sm mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-obsidian-950 dark:text-white mb-2">Performance Guarantee</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Guaranteed 90+ Across All Lighthouse Scores</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      While WordPress and Wix sites suffer from structural bloat that kills performance, our React + Vite stack delivers lightning-fast load times that keep visitors engaged and boost your Google rankings.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Lightning Fast', 'Better SEO', 'Higher Conversion', 'Mobile Optimized'].map((badge) => (
                        <span key={badge} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/15 text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-green-500/20 text-center shadow-sm mb-6 md:mb-8">
                <h4 className="text-xl font-bold text-obsidian-950 dark:text-white mb-3 flex items-center justify-center gap-2">
                  Professional Quality, Zero Headaches
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  Every plan includes a custom-designed website built with React, TypeScript, TailwindCSS, and Vite—the same tech stack used by Facebook, Netflix, Airbnb, and Shopify.
                  This means your site loads faster, ranks better, and converts more visitors than template sites built with bloated builders.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-left">
                  <div className="space-y-2">
                    <h5 className="font-bold text-obsidian-950 dark:text-white text-sm">Why This Tech Stack Wins:</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <span className="text-green-600 dark:text-green-400">•</span>
                        <span><strong>React + Vite:</strong> Lightning-fast loading speeds</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <span className="text-green-600 dark:text-green-400">•</span>
                        <span><strong>TypeScript:</strong> Fewer bugs, better reliability</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <span className="text-green-600 dark:text-green-400">•</span>
                        <span><strong>TailwindCSS:</strong> Clean, optimized code</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-bold text-obsidian-950 dark:text-white text-sm">Business Results:</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <span className="text-green-600 dark:text-green-400">•</span>
                        <span>Better Google rankings</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <span className="text-green-600 dark:text-green-400">•</span>
                        <span>Higher conversion rates</span>
                      </li>
                      <li className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <span className="text-green-600 dark:text-green-400">•</span>
                        <span>Mobile visitors stay longer</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  Perfect for businesses that want to focus on running their business while I handle the website with enterprise-grade technology,
                  with the flexibility to scale as your needs grow.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['More leads', 'Better visibility', 'Higher trust', 'Stronger conversion', 'Ongoing support'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="custom-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-20 max-w-4xl mx-auto"
            >
              {/* DevOps & Launch Package callout */}
              <div className="p-6 md:p-8 bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/5 rounded-3xl border border-blue-500/20 shadow-sm mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-obsidian-950 dark:text-white mb-2">DevOps & Launch Package — Quoted Separately</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-3">
                      The prices above cover <span className="font-bold text-obsidian-950 dark:text-white">custom code, design, and development</span>. Domain registration,
                      hosting setup, DNS configuration, SSL, deployment, and ongoing infrastructure are scoped and quoted during our discovery call based on your project's needs.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Domain Registration (Porkbun)', 'Hosting & CDN (Netlify)', 'DNS & SSL Config', 'Production Deployment', 'SEO Infrastructure'].map((item) => (
                        <span key={item} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/15 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
                      Need everything handled end-to-end? The <span className="font-bold text-purple-600 dark:text-purple-400">Total Brand Launch</span> tier includes full DevOps as part of the package.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-accent-orange/20 text-center shadow-sm">
                <h4 className="text-xl font-bold text-obsidian-950 dark:text-white mb-3 flex items-center justify-center gap-2">
                  What Is a Custom Build?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                  Custom builds are ground-up projects designed and developed specifically for your business — no templates, no shortcuts.
                  We start with a discovery call to map out your goals, audience, and feature requirements, then I architect
                  and hand-code every page from scratch using React, TypeScript, and TailwindCSS.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  Whether you need a dynamic content management system, a secure admin dashboard, third-party API integrations,
                  or a full-scale web application — custom builds give you total creative and technical control with zero compromises.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['1-on-1 Discovery Process', 'Fully Custom UI/UX', 'You Own Everything', 'Scalable Architecture'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-xs font-bold text-accent-orange uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PricingGuides;

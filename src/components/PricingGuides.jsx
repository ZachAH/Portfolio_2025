import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4';

// PDF Imports
import templateGuide from '../../src/assets/PriceGuides/Template_Price_Guide.pdf';
import growthPlans from '../../src/assets/PriceGuides/Growth_Plans.pdf';
import freelanceGuide from '../../src/assets/PriceGuides/freelance_price_guide.pdf';

const CheckoutReadyModal = ({ isOpen, onClose, stripeUrl, title }) => (
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
          <div className="bg-white dark:bg-obsidian-950 border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-black text-obsidian-950 dark:text-white uppercase tracking-tight">Before You Check Out</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Here's exactly what happens after you complete your <span className="font-bold text-obsidian-950 dark:text-white">{title}</span> purchase:
            </p>

            <ol className="space-y-4 mb-6">
              {[
                { step: '1', title: 'Secure Stripe Checkout', desc: 'Your payment is processed through Stripe — your card data never touches my servers.' },
                { step: '2', title: 'Secure Onboarding Portal', desc: 'You\'ll be redirected to a private onboarding page to provide your brand info, assets, and preferences.' },
                { step: '3', title: 'Sprint Clock Starts', desc: 'Once I confirm your assets, the 48-hour build window begins immediately.' },
                { step: '4', title: 'You Own Everything', desc: 'After launch, I\'ll push your domain to your Porkbun account and transfer your site to your Netlify dashboard. The domain, hosting, code — it\'s all yours.' },
              ].map((item) => (
                <li key={item.step} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{item.step}</span>
                  <div>
                    <span className="text-sm font-bold text-obsidian-950 dark:text-white">{item.title}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-900/10 border border-blue-500/20 mb-6">
              <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                <span className="font-bold">Have these ready:</span> Your logo (PNG/SVG), brand colors, business info (phone, address, hours), and any photos/copy you want on the site. Don't worry if you're missing some — you can provide them in the onboarding form.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} className="px-6 py-3.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-200 font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                Go Back
              </button>
              <a
                href={stripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-full bg-accent-orange text-white font-bold text-sm text-center hover:bg-accent-orange/90 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Proceed to Secure Checkout
              </a>
            </div>

            <p className="text-center text-[9px] text-gray-400 dark:text-gray-400 mt-4 uppercase tracking-widest font-bold">
              Secured by Stripe — 256-bit encryption
            </p>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const PricingCard = ({ title, price, description, features, notIncluded, accent, isPopular, link, stripeUrl, guarantee, buttonLabel }) => {
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
        </div>
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

        {stripeUrl ? (
          <button
            onClick={() => setShowModal(true)}
            className={`w-full py-4 rounded-full font-bold transition-all active:scale-95 shadow-md text-center block ${isPopular
              ? 'bg-accent-orange text-white hover:bg-accent-orange/90'
              : 'bg-obsidian-950 text-white dark:bg-white dark:text-obsidian-950 hover:opacity-90'
              }`}
          >
            {buttonLabel || (isPopular ? 'Order Now' : 'Get Started')}
          </button>
        ) : (
          <Link
            to={link || "/contact"}
            className={`w-full py-4 rounded-full font-bold transition-all active:scale-95 shadow-md text-center block ${isPopular
              ? 'bg-accent-orange text-white hover:bg-accent-orange/90'
              : 'bg-obsidian-950 text-white dark:bg-white dark:text-obsidian-950 hover:opacity-90'
              }`}
          >
            {buttonLabel || 'Get Started'}
          </Link>
        )}
      </motion.div>

      {stripeUrl && <CheckoutReadyModal isOpen={showModal} onClose={() => setShowModal(false)} stripeUrl={stripeUrl} title={title} />}
    </>
  );
};

const PricingGuides = () => {
  const [activeTab, setActiveTab] = useState('growth');
  const [partnershipLeadStatus, setPartnershipLeadStatus] = useState("IDLE");

  const downloadLinks = {
    templates: { file: templateGuide, label: 'Template Pricing Guide' },
    custom: { file: freelanceGuide, label: 'Custom Project Guide' },
    growth: { file: growthPlans, label: 'Growth & Partnership Plans' }
  };

  const trackDownload = (label) => {
    ReactGA.event({
      category: "Conversion",
      action: "PDF Download",
      label: label,
    });
  };

  const handlePartnershipLeadSubmit = async (e) => {
    e.preventDefault();
    setPartnershipLeadStatus("SENDING");

    const form = e.target;
    const data = new FormData(form);
    data.append("form_type", "pricing_partnership_lead");

    try {
      const response = await fetch("https://formspree.io/f/mzdkwpka", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        setPartnershipLeadStatus("SUCCESS");
        form.reset();
      } else {
        setPartnershipLeadStatus("ERROR");
      }
    } catch (error) {
      console.error("Partnership lead form error:", error);
      setPartnershipLeadStatus("ERROR");
    }
  };

  const partnershipLossFacts = [
    {
      stat: "81%",
      detail: "of shoppers research local services online before they call. No site means you miss the short list before the conversation starts."
    },
    {
      stat: "$17K",
      detail: "is the average annual revenue a small business can lose by not being discoverable on Google when buyers are ready to act."
    },
    {
      stat: "76%",
      detail: "of local searches lead to a call or visit within 24 hours. If you do not have a site, you are barely in the running."
    }
  ];

  const content = {
    growth: [
      { title: "The Pulse", price: "$150/mo", description: "The end of 'we just have a Facebook page.' A professional, mobile-ready presence for less than the cost of a daily shift meal.", features: ["Preserve your initial capital", "Turnkey deployment live within 4–7 days of asset delivery", "White-glove domain, DNS, and hosting setup", "1 monthly menu sync", "Mobile-first design for hungry, on-the-go customers", "Branded QR toolkit for tables and windows", "90+ Lighthouse guarantee or 2 months free", "Full ownership after 12 months"], accent: "text-emerald-500", link: "/pricing#partnership-intake", buttonLabel: "Start for $150" },
      { title: "The Velocity", price: "$250/mo", description: "For businesses that play to win. Dominate local search, captivate customers with high-end motion, and stay ahead with unlimited updates.", features: ["Preserve your initial capital", "Elite 48h sprint after asset delivery", "Unlimited content updates", "GSAP motion logic for high-impact UI", "Local SEO and Google Business Profile management", "Advanced brand sculpting with industrial aesthetics", "90+ Lighthouse guarantee or 2 months free", "Full infrastructure handoff after 12 months"], accent: "text-red-500", isPopular: true, link: "/pricing#partnership-intake", buttonLabel: "Start for $250" }
    ],
    templates: [
      {
        title: "The 48h Sprint",
        price: "$1,400",
        description: "Velocity as a Service. I take your selected foundation and transform it into a high-performance, live brand in exactly 48 hours. One fixed price — no hidden fees, no recurring charges.",
        features: [
          "Full Source Code Ownership — yours on day one",
          "You own the domain, hosting & every account",
          "Brand DNA & Asset Integration",
          "White-Glove DNS & Infrastructure Setup",
          "Domain pushed to your Porkbun, site transferred to your Netlify",
          "2-Day Deployment Guaranteed",
          "Local SEO Metadata Injection",
          "90+ Across All Lighthouse Audits Guaranteed",
        ],
        notIncluded: [
          "Custom feature development",
          "Ongoing hosting (available via Growth Plans)",
          "Stock photography or copywriting",
        ],
        guarantee: "Miss the 48h deadline and you get a full refund — keep the site free. Miss 90+ Lighthouse across all audits and I fix it free.",
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
    <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-obsidian-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-obsidian-950 dark:text-white mb-6">
            Pricing & <span className="text-gradient">Partnership</span>
          </h2>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-gray-100 dark:bg-white/5 backdrop-blur-md rounded-full w-fit border border-black/5 dark:border-white/10">
              {['growth', 'templates', 'custom'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all uppercase tracking-widest ${activeTab === tab ? 'bg-white dark:bg-white dark:text-obsidian-950 shadow-md' : 'text-gray-500 dark:text-gray-300 hover:text-accent-orange'
                    }`}
                >
                  {tab === 'growth' ? 'Partnership Plans' : tab === 'templates' ? 'Template Launch' : 'Custom Builds'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'growth' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl"
                >
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    Stop losing customers to the place down the street. Launch your digital storefront for just $150 down today.
                  </p>
                </motion.div>
              )}

              {activeTab === 'templates' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl"
                >
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    Choose an industry-leading foundation from my collection and I will personally handle the
                    deployment, content integration, and domain setup. Every launch includes
                    full ownership of the source code and a professional, hand-polished result tailored
                    to your specific brand package.
                  </p>
                  <Link
                    to="/templates"
                    className="text-accent-orange font-bold text-sm hover:underline flex items-center justify-center gap-2"
                  >
                    Browse Available Template Foundations →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {activeTab !== 'growth' && (
              <motion.a
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                href={downloadLinks[activeTab].file}
                download={downloadLinks[activeTab].label}
                onClick={() => trackDownload(downloadLinks[activeTab].label)}
                className="flex items-center gap-2 px-8 py-4 bg-accent-orange/10 dark:bg-accent-orange/10 text-accent-orange border border-accent-orange/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent-orange hover:text-white transition-all shadow-lg active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Full {activeTab === 'templates' ? 'Launch' : 'Custom'} Guide (PDF)
              </motion.a>
            )}
          </div>
        </div>

        {/* ── LAUNCH PRICING BANNER (templates tab only) ──── */}
        <AnimatePresence>
          {activeTab === 'templates' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-accent-orange/10 via-amber-500/10 to-accent-orange/10 border border-accent-orange/25 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange" />
              </span>
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Every template package includes full White-Glove deployment — <span className="text-accent-orange font-black">domain, hosting, DNS, and brand integration</span> all handled for you
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
              className={`md:col-span-3 gap-8 ${activeTab === 'growth'
                ? 'grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] items-start'
                : content[activeTab].length > 3
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid grid-cols-1 md:grid-cols-3'
                }`}
            >
              {activeTab === 'growth' ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content[activeTab].map((item, idx) => (
                      <PricingCard key={`${activeTab}-${idx}`} {...item} />
                    ))}
                  </div>

                  <aside className="rounded-3xl border border-obsidian-950/10 dark:border-white/10 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-obsidian-900 dark:via-obsidian-900 dark:to-obsidian-950 p-6 sm:p-7 shadow-sm h-full">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange mb-3">What No Website Costs</p>
                    <h4 className="text-2xl font-bold tracking-tight text-obsidian-950 dark:text-white mb-3">
                      The leak is already happening
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      Social media is a feed. A website is a destination. If you do not have a destination, you are losing money.
                    </p>

                    <div className="space-y-4">
                      {partnershipLossFacts.map((item) => (
                        <div key={item.stat} className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/90 dark:bg-white/5 p-4">
                          <p className="text-3xl font-black tracking-tight text-obsidian-950 dark:text-white mb-1">{item.stat}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </aside>
                </>
              ) : (
                content[activeTab].map((item, idx) => (
                  <PricingCard key={`${activeTab}-${idx}`} {...item} />
                ))
              )}
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
              className="mt-20 max-w-4xl mx-auto"
            >
              <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 p-6 sm:p-8 shadow-sm">
                <div className="max-w-3xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange mb-2">Why ZH Web Solutions Wins</p>
                  <motion.h4
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.9 }}
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-obsidian-950 dark:text-white leading-tight"
                  >
                    <span>The difference between </span>
                    <span className="relative inline-block mr-2">
                      <span className="relative z-10">renting a template</span>
                      <motion.svg
                        className="absolute -inset-2 z-20 pointer-events-none overflow-visible"
                        viewBox="0 0 220 70"
                        fill="none"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M20 16 L198 56"
                          stroke="#ef4444"
                          strokeWidth="6"
                          strokeLinecap="round"
                          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
                          transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
                        />
                        <motion.path
                          d="M196 14 L24 58"
                          stroke="#ef4444"
                          strokeWidth="6"
                          strokeLinecap="round"
                          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
                          transition={{ duration: 0.45, ease: "easeOut", delay: 0.42 }}
                        />
                      </motion.svg>
                    </span>
                    <span>and </span>
                    <span className="relative inline-block">
                      <motion.span
                        className="absolute inset-x-0 bottom-0 top-[45%] rounded-md bg-amber-300/70 dark:bg-amber-400/45"
                        variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1 } }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: 0.75 }}
                        style={{ transformOrigin: "left center" }}
                      />
                      <span className="relative z-10">owning an asset</span>
                    </span>
                  </motion.h4>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
                  <div className="grid grid-cols-3 bg-obsidian-950 dark:bg-obsidian-900 text-white text-left">
                    <div className="p-4 text-xs font-black uppercase tracking-[0.2em]">The Comparison</div>
                    <div className="p-4 text-xs font-black uppercase tracking-[0.2em] border-l border-white/10">Popular Template Builders</div>
                    <div className="p-4 text-xs font-black uppercase tracking-[0.2em] border-l border-white/10 text-accent-orange">The ZH Advantage</div>
                  </div>

                  {[
                    {
                      label: "Discoverability",
                      left: "Basic SEO tools that require you to be an expert to see results.",
                      right: "Google Search Dominance. I implement custom JSON Schema and SEO architecture so you show up exactly where your local customers are searching."
                    },
                    {
                      label: "Conversion",
                      left: "Slow-loading builder bloat. 53% of mobile users leave if a site takes over 3 seconds to load.",
                      right: "Extreme Speed. Built on React/Vite for instant loading. We do not give customers time to change their minds, they see your brand immediately."
                    },
                    {
                      label: "Authority",
                      left: "Generic designs that can make a professional business look like a side hobby.",
                      right: "Market Authority. High-impact, custom UI that signals you are the top-tier choice in your industry. First impressions are everything."
                    },
                    {
                      label: "Scalability",
                      left: "You hit platform walls where the builder cannot do what you need.",
                      right: "Future-Proof. I use the same tech as Netflix and Facebook. Your site can grow as big as your business does, with zero technical limits."
                    },
                    {
                      label: "ROI",
                      left: "A perpetual bill for a site you never actually own.",
                      right: "Asset Equity. After 12 months, this shifts from an expense to a company asset. You own the code and the value it generates."
                    }
                  ].map((row, index) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-1 md:grid-cols-3 text-left ${index !== 4 ? 'border-t border-black/5 dark:border-white/10' : ''}`}
                    >
                      <div className="p-4 bg-gray-50/80 dark:bg-white/5">
                        <p className="text-sm font-black uppercase tracking-wide text-obsidian-950 dark:text-white">{row.label}</p>
                      </div>
                      <div className="p-4 border-t md:border-t-0 md:border-l border-black/5 dark:border-white/10">
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{row.left}</p>
                      </div>
                      <div className="p-4 border-t md:border-t-0 md:border-l border-black/5 dark:border-white/10 bg-accent-orange/5 dark:bg-accent-orange/10">
                        <p className="text-sm text-obsidian-950 dark:text-white leading-relaxed font-medium">{row.right}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  Wix, Squarespace, and WordPress are trademarks of their respective owners. ZH Web Solutions is an independent entity and is not affiliated with or endorsed by these companies.
                </p>
              </div>

              <div className="mt-6 rounded-3xl border border-blue-500/20 bg-blue-50/70 dark:bg-blue-900/10 p-6 sm:p-8 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2">Why Lighthouse Matters</p>
                <h4 className="text-2xl font-bold tracking-tight text-obsidian-950 dark:text-white mb-3">
                  Fast sites make more money
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Google Lighthouse is the industry benchmark for how well your website performs across speed, accessibility, SEO, and technical best practices. High scores usually mean your site loads faster, feels smoother on mobile, ranks better, and gives customers fewer reasons to bounce.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  That is why both partnership plans include a <span className="font-bold text-obsidian-950 dark:text-white">90+ Lighthouse guarantee</span>. If your finished site does not hit 90+ across the key Lighthouse categories, I keep optimizing it or give you <span className="font-bold text-obsidian-950 dark:text-white">2 months free</span>.
                </p>
              </div>

              <div id="partnership-intake" className="mt-6 p-6 sm:p-8 rounded-3xl border border-accent-orange/20 bg-white dark:bg-obsidian-900/40 shadow-sm">
                <div className="text-center mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange mb-2">Start Your Project</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-3 leading-relaxed">
                    Unlike popular template platforms that keep you trapped in a monthly rent cycle, these Partnership Plans have a clear finish line. Once you hit month 12, the keys are yours.
                  </p>
                  <h4 className="text-2xl sm:text-3xl font-bold tracking-tight text-obsidian-950 dark:text-white">
                    Let&apos;s get your storefront moving
                  </h4>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Start with the basics. Send your business name and current Facebook page, and I&apos;ll help map the fastest launch path.
                  </p>
                </div>

                <form onSubmit={handlePartnershipLeadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 font-bold ml-1">Business Name</label>
                    <input
                      name="businessName"
                      required
                      type="text"
                      placeholder="Your business name"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-obsidian-950 border border-black/5 dark:border-white/10 focus:border-accent-orange outline-none transition-all duration-300 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 font-bold ml-1">Current Facebook Page URL</label>
                    <input
                      name="facebookUrl"
                      required
                      type="url"
                      placeholder="facebook.com/yourbusiness"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-obsidian-950 border border-black/5 dark:border-white/10 focus:border-accent-orange outline-none transition-all duration-300 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 font-bold ml-1">Phone Number</label>
                    <input
                      name="phoneNumber"
                      required
                      type="tel"
                      placeholder="(555) 555-5555"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-obsidian-950 border border-black/5 dark:border-white/10 focus:border-accent-orange outline-none transition-all duration-300 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 font-bold ml-1">Best Time To Call?</label>
                    <select
                      name="bestCallTime"
                      defaultValue="Morning"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-obsidian-950 border border-black/5 dark:border-white/10 focus:border-accent-orange outline-none transition-all duration-300 font-medium"
                    >
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>After Service/Late Night</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300 font-bold ml-1">Which plan are you leaning toward?</label>
                    <select
                      name="preferredPlan"
                      defaultValue="The Pulse - $150/mo"
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-obsidian-950 border border-black/5 dark:border-white/10 focus:border-accent-orange outline-none transition-all duration-300 font-medium"
                    >
                      <option>The Pulse - $150/mo</option>
                      <option>The Velocity - $250/mo</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 text-center pt-2">
                    <button
                      type="submit"
                      disabled={partnershipLeadStatus === "SENDING"}
                      className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-accent-orange text-white text-sm font-black uppercase tracking-widest hover:bg-accent-orange/90 active:scale-95 transition-all shadow-lg disabled:opacity-50"
                    >
                      {partnershipLeadStatus === "IDLE" && "Request My Call & Plan"}
                      {partnershipLeadStatus === "SENDING" && "Submitting..."}
                      {partnershipLeadStatus === "SUCCESS" && "Request Sent"}
                      {partnershipLeadStatus === "ERROR" && "Try Again"}
                    </button>

                    {partnershipLeadStatus === "SUCCESS" && (
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-green-600 dark:text-green-400">
                        Lead received. I&apos;ll review your current page and reach out with next steps.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          ) : activeTab === 'templates' ? (
            <motion.div
              key="template-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mt-20 p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-accent-orange/20 text-center max-w-4xl mx-auto shadow-sm">
                <h4 className="text-xl font-bold text-obsidian-950 dark:text-white mb-3 flex items-center justify-center gap-2">
                  Why $1,400 — Not $200?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  A $200 website uses bloated page builders with slow load times, missing metadata, and zero SEO — leaving you
                  with technical debt that costs more to fix than it did to build. The 48h Sprint delivers a hand-coded React/TypeScript site
                  with professional DNS configuration, secure infrastructure, and guaranteed 90+ scores across all Lighthouse audits — the same
                  foundation agencies charge $5,000+ for.
                </p>
              </div>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-50 dark:bg-amber-900/10 border border-amber-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    I take on a limited number of Sprint projects each month to maintain quality
                  </span>
                </div>
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

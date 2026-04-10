// ── CATEGORIES ────────────────────────────────────────────
// `category` is purely for the /templates page filter bar.
// It is ADDITIVE to `badgeType` — OnboardingForm + TemplateCard
// still key off `badgeType` exclusively, so nothing downstream
// breaks when categories are added / changed.
//
// Valid categories (keep in sync with CATEGORY_CONFIG in
// src/pages/Templates.jsx):
//   business    → Business & Professional service sites
//   trades      → Trades, local services, contractors
//   saas        → SaaS, tech startups, dev tools
//   industrial  → Industrial, manufacturing, B2B
//   creative    → Creative, editorial, narrative, streetwear
//   ecommerce   → Full commerce-ready storefronts
//
// ── ORDERING ──────────────────────────────────────────────
// The array order controls display order in the "All Templates"
// view. The first 3 non-conversion templates are positioned as
// heavy-hitters to maximize top-of-page sales impact.
const templates = [
  // ═══════════════════════════════════════════════════════════
  // HEAVY HITTER #1 — Trades (massive local-service market)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'trades-scalable',
    title: 'TradesPro // Contractor & Home Services',
    category: 'trades',
    description:
      'Dominate your local map. Stop losing leads to outdated, slow-loading sites. This template is a high-conversion engine designed specifically for the trades. Featuring a bold, professional layout that commands respect, it\'s optimized for local SEO out of the box. Every pixel is 100% adjustable to fit your brand\'s DNA.',
    image: '/construction_template.webp',
    alt: 'Contractor and home services website template mockup',
    accent: '#FBBF24', // amber-400
    priceTextDark: true,
    techs: ['React', 'Tailwind', 'Framer Motion'],
    templateURL: 'https://tradestemplatezh.netlify.app/',
    badgeType: 'performance', // Local SEO/Speed focus
  },
  // ═══════════════════════════════════════════════════════════
  // HEAVY HITTER #2 — Modern Business Elite (3 themes = value)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'modern-business-elite',
    title: 'Modern Business Suite // Elite Edition',
    category: 'business',
    description:
      'The ultimate high-performance starter suite for high-end modern brands. This Elite Edition features a sophisticated GSAP animation engine and a dynamic masonry portfolio grid. Toggle between three distinct professional aesthetics—Ink, Pour, and Velvet—with a centralized theme engine designed for rapid, agency-grade deployments.',
    image: '/saas_template.webp',
    alt: 'Modern business suite elite edition website template mockup',
    accent: '#9333EA', // purple-600
    techs: ['GSAP', 'React', 'TypeScript', 'Tailwind'],
    templateURL: 'https://futuristiclocal.netlify.app/',
    badgeType: 'authority', // High-end, agency-grade
    secondaryBadge: '3 Themes Included',
  },
  // ═══════════════════════════════════════════════════════════
  // HEAVY HITTER #3 — Legal (high-ticket clients)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'Prescott-Legal',
    title: 'Prescott // Law Firm & Legal Services',
    category: 'business',
    description:
      'A heavy-hitting, authority-driven suite for law firms and professional practices. Designed with a focus on "Results-First" storytelling, case study integration, and a high-trust consultation funnel. Featuring a sophisticated UI that commands respect and drives client inquiries.',
    image: '/legal_template.webp',
    alt: 'Law firm and legal services website template mockup',
    accent: '#C5A046', // A sophisticated Brass/Gold
    techs: ['React', 'Tailwind', 'SEO', 'Performance'],
    templateURL: 'https://lawfirmtemplate.netlify.app/',
    badgeType: 'authority', // Top-tier professional choice
  },
  // ═══════════════════════════════════════════════════════════
  // Remaining sprint templates
  // ═══════════════════════════════════════════════════════════
  {
    id: 'Rusted-Fork',
    title: 'Rusty Fork // Restaurant & Hospitality',
    category: 'business',
    description:
      'A design-forward, high-velocity foundation for modern dining and hospitality. This suite features a modular menu system, mobile-first architecture, and high-impact scroll reveals engineered to convert visitors into reservations.',
    image: '/restaurant_template.webp',
    alt: 'Restaurant and hospitality website template mockup',
    accent: '#F97316', // orange-500
    techs: ['React', 'Vite', 'Tailwind', 'GSAP'],
    templateURL: 'https://restauranttemplate01.netlify.app/',
    badgeType: 'sprint',
  },
  {
    id: 'premium-business',
    title: 'Premium Corporate // Business & Consulting',
    category: 'business',
    description:
      "Elevate your brand with a sophisticated, clean foundation. This isn't just a layout; it's a high-end digital experience designed for modern businesses that prioritize design and clarity. Featuring an architectural feel with organic textures, every pixel of this React template is 100% customizable and tailored for premium scaling.",
    image: '/buisness_modern.webp',
    alt: 'Premium corporate business and consulting website template mockup',
    accent: '#616B59',
    techs: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    templateURL: 'https://premiumbuissnesstemplate.netlify.app/',
    badgeType: 'authority',
  },
  {
    id: 'Aura',
    title: 'Aura // Luxury Real Estate & Interiors',
    category: 'business',
    description:
      'A sophisticated, image-heavy suite designed for high-end property listings and interior portfolios. Featuring "Quiet Luxury" typography, and a high-conversion lead capture system optimized for local SEO.',
    image: '/realestate_template.webp',
    alt: 'Luxury real estate and interiors website template mockup',
    accent: '#D4AF37', // Champagne Gold
    techs: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    templateURL: 'https://realestatetemplatelux.netlify.app/',
    badgeType: 'sprint',
  },
  {
    id: 'saas-obsidian',
    title: 'Obsidian // SaaS & AI Startup',
    category: 'saas',
    description:
      'The elite "Silicon Valley" dark mode starter for AI and SaaS startups. This high-performance suite features a sophisticated bento-grid layout, glassmorphism surfaces, and precision-engineered GSAP animations. Includes a custom interactive pricing engine and code previews.',
    image: '/obsidian_template.webp',
    alt: 'SaaS and AI startup dark mode website template mockup',
    accent: '#9333EA', // purple-600
    techs: ['React', 'GSAP', 'Framer Motion', 'Tailwind'],
    templateURL: 'https://sasstemplateobsidian.netlify.app/',
    badgeType: 'authority',
  },
  {
    id: 'Lakeside-Wellness',
    title: 'Lakeside // Medical & Wellness Practice',
    category: 'business',
    description:
      'A high-trust, clinical foundation designed for patient acquisition. This suite features prominent appointment scheduling, and a WCAG-compliant architecture. Engineered for dentists, chiropractors, and private practices in the local medical space.',
    image: '/wellness_template.webp',
    alt: 'Medical and wellness practice website template mockup',
    accent: '#7D8C6F', // Sage Green
    techs: ['React', 'TypeScript', 'Tailwind', 'Accessibility'],
    templateURL: 'https://wellnesstemplate26.netlify.app/',
    badgeType: 'sprint',
  },
  {
    id: 'universal-business',
    title: 'Universal Business // Starter Foundation',
    category: 'business',
    description:
      'A modern, high-conversion foundation designed for professional services and personal brands. While styled with an organic wellness aesthetic, this template is built to be a universal "plug-and-play" engine for any business. It features ultra-clean typography, a focused lead-gen layout, and a high-legibility design that builds immediate trust.',
    image: '/buisness_template2.webp',
    alt: 'Universal business starter website template mockup',
    accent: '#4F5748',
    techs: ['React', 'Vite', 'Tailwind', 'Universal Layout'],
    templateURL: 'https://buissnesstemp2.netlify.app/',
    badgeType: 'sprint',
  },
  {
    id: 'the-foundry',
    title: 'The Foundry // Industrial & Manufacturing',
    category: 'industrial',
    description:
      'A heavy-duty, "over-engineered" React suite for manufacturing, logistics, and B2B firms. Featuring animated stats gauges, SVG technical drawing effects, and a high-conversion RFQ engine designed to command authority in the industrial space.',
    image: '/foundry_template.webp',
    alt: 'Industrial and manufacturing B2B website template mockup',
    accent: '#F97316', // orange-500
    techs: ['React', 'Vite', 'Tailwind', 'SVG Animations'],
    templateURL: 'https://industrialtemplate.netlify.app/',
    badgeType: 'sprint',
  },
  {
    id: 'Personal-Coach',
    title: 'Influencer Pro // Personal Brand & Creator',
    category: 'creative',
    description:
      'A high-conversion engine for creators and consultants. Built to showcase authority through immersive storytelling, social proof counters, and a "Start Your Transformation" funnel. Optimized for LinkedIn lead generation and newsletter growth.',
    image: '/coach_template.webp',
    alt: 'Personal brand and influencer website template mockup',
    accent: '#8B5CF6', // Lavender/Violet
    techs: ['React', 'Framer Motion', 'Tailwind', 'Lead-Gen'],
    templateURL: 'https://influencertemplate.netlify.app/',
    badgeType: 'sprint',
  },
  {
    id: 'brutalist-creative',
    title: 'Brutalist // Creative & Streetwear',
    category: 'creative',
    description:
      'Break the rules with the "Brutalist" starter suite. This raw, anti-design template is built for streetwear brands, record labels, and creative rebels who want to stand out. 100% unapologetic and built for high impact.',
    image: '/brutalist_template.webp',
    alt: 'Brutalist creative and streetwear website template mockup',
    accent: '#f43f5e', // rose-500
    techs: ['React', 'GSAP', 'Tailwind', 'Glitch UI'],
    templateURL: 'https://brutalisttemplate.netlify.app/',
    badgeType: 'authority',
  },
  {
    id: 'the-storyteller',
    title: 'The Storyteller // Editorial & Magazine',
    category: 'creative',
    description:
      'An immersive "Noir-Journalism" suite designed for long-form content, investigative podcasts, and digital magazines. Includes cinematic scroll-linked reveals and a distraction-free reading engine.',
    image: '/storyteller_template.webp',
    alt: 'Editorial and magazine narrative website template mockup',
    accent: '#3F3F46', // zinc-700
    techs: ['React', 'Framer Motion', 'GSAP', 'Editorial UI'],
    templateURL: 'https://storytellertemplate.netlify.app/',
    badgeType: 'sprint',
  },
  // ═══════════════════════════════════════════════════════════
  // E-Commerce (conversion badgeType)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'refined-essentials',
    title: 'Refined Essentials // Minimalist E-Commerce',
    category: 'ecommerce',
    description:
      'Minimalist commerce for the modern era. Designed for lifestyle brands that value objects of enduring quality, this template features a massive whitespace aesthetic, immersive product grids, and a seamless slide-out cart experience. Every interaction is fueled by smooth Framer Motion transitions.',
    image: '/ecommerce_template.webp',
    alt: 'Minimalist e-commerce storefront website template mockup',
    accent: '#D19A8E',
    techs: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    templateURL: 'https://ecommercetemplatezh.netlify.app/',
    badgeType: 'conversion',
  },
  {
    id: 'ironclad-ecom',
    title: 'Ironclad // Brutalist E-Commerce',
    category: 'ecommerce',
    description:
      'A raw, high-impact "Brutalist" commerce engine built for streetwear brands and record labels. Designed to command attention with aggressive typography, 2px solid industrial borders, and a high-performance GSAP animation engine. Features a tactical slide-out cart and a conversion-optimized checkout flow.',
    image: '/ironclad_template.webp',
    alt: 'Brutalist e-commerce storefront website template mockup',
    accent: '#f43f5e', // rose-500
    techs: ['React', 'GSAP', 'Tailwind', 'Framer Motion'],
    templateURL: 'https://brutalistecommerce.netlify.app/',
    badgeType: 'conversion',
  },
  {
    id: 'hero-home-service',
    title: 'Hero Service // High-Conversion Trades',
    category: 'business',
    description:
      'The definitive "Trust-First" suite for plumbing, HVAC, and electrical professionals. Engineered for rapid lead generation, this template features a prominent "Emergency Service" command center, a 15-minute response guarantee engine, and localized trust signals. Built for high-volume conversion in the home services sector.',
    image: '/hero_service_template.webp',
    alt: 'High-conversion home service and trades website template mockup',
    accent: '#EA580C', // orange-600 (matches your "Get My Quote" button)
    techs: ['React', 'Vite', 'Tailwind', 'Lead-Gen Engine'],
    templateURL: 'https://homeservicetemplatelocal.netlify.app/', // Update if different
    badgeType: 'sprint',
  }
];

export default templates;

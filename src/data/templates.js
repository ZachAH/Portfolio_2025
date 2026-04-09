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
const templates = [
  {
    id: 'modern-business-elite',
    title: 'Modern Business Elite',
    category: 'business',
    description:
      'The ultimate high-performance starter suite for high-end modern brands. This Elite Edition features a sophisticated GSAP animation engine and a dynamic masonry portfolio grid. Toggle between three distinct professional aesthetics—Ink, Pour, and Velvet—with a centralized theme engine designed for rapid, agency-grade deployments.',
    image: '/saas_template.webp',
    alt: 'Modern Business Suite Elite Edition Mockup',
    price: '$45 - Source Code',
    accent: '#9333EA', // purple-600
    techs: ['GSAP', 'React', 'TypeScript', 'Tailwind'],
    templateURL: 'https://futuristiclocal.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/modernsuitetemplate',
    badgeType: 'authority', // High-end, agency-grade
    secondaryBadge: '3 Themes Included',
  },
  {
    id: 'refined-essentials',
    title: 'Refined Essentials',
    category: 'ecommerce',
    description:
      'Minimalist commerce for the modern era. Designed for lifestyle brands that value objects of enduring quality, this template features a massive whitespace aesthetic, immersive product grids, and a seamless slide-out cart experience. Every interaction is fueled by smooth Framer Motion transitions.',
    image: '/ecommerce_template.webp',
    alt: 'Refined Essentials E-Commerce Template Mockup',
    price: '$35 - Source Code',
    accent: '#D19A8E',
    techs: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    templateURL: 'https://ecommercetemplatezh.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/ecommercetemplate',
    badgeType: 'conversion', // Focused on selling/commerce
  },
  {
    id: 'premium-business',
    title: 'Premium Business',
    category: 'business',
    description:
      "Elevate your brand with a sophisticated, clean foundation. This isn't just a layout; it's a high-end digital experience designed for modern businesses that prioritize design and clarity. Featuring an architectural feel with organic textures, every pixel of this React template is 100% customizable and tailored for premium scaling.",
    image: '/buisness_modern.webp',
    alt: 'Premium Business Template Mockup',
    price: '$35 - Source Code',
    accent: '#616B59',
    techs: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    templateURL: 'https://premiumbuissnesstemplate.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/ArtisanFoundation',
    badgeType: 'authority', // Sophisticated/Architectural
  },
  {
    id: 'trades-scalable',
    title: 'Trades - Scalable',
    category: 'trades',
    description:
      'Dominate your local map. Stop losing leads to outdated, slow-loading sites. This template is a high-conversion engine designed specifically for the trades. Featuring a bold, professional layout that commands respect, it’s optimized for local SEO out of the box. Every pixel is 100% adjustable to fit your brand’s DNA.',
    image: '/construction_template.webp',
    alt: 'Construction & Contractor Trades Template Mockup',
    price: '$40 - Source Code',
    accent: '#FBBF24', // amber-400
    priceTextDark: true,
    techs: ['React', 'Tailwind', 'Framer Motion'],
    templateURL: 'https://tradestemplatezh.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/ironclad-trades',
    badgeType: 'performance', // Local SEO/Speed focus
  },
  {
    id: 'universal-business',
    title: 'Universal Business',
    category: 'business',
    description:
      'A modern, high-conversion foundation designed for professional services and personal brands. While styled with an organic wellness aesthetic, this template is built to be a universal "plug-and-play" engine for any business. It features ultra-clean typography, a focused lead-gen layout, and a high-legibility design that builds immediate trust.',
    image: '/buisness_template2.webp',
    alt: 'Clean Corporate Business Template Mockup',
    price: '$35 - Source Code',
    accent: '#4F5748',
    techs: ['React', 'Vite', 'Tailwind', 'Universal Layout'],
    templateURL: 'https://buissnesstemp2.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/serviceandwellnesstemplate',
    badgeType: 'sprint', // Plug-and-play/Ready to go
  },
  {
    id: 'saas-obsidian',
    title: 'SaaS Obsidian',
    category: 'saas',
    description:
      'The elite "Silicon Valley" dark mode starter for AI and SaaS startups. This high-performance suite features a sophisticated bento-grid layout, glassmorphism surfaces, and precision-engineered GSAP animations. Includes a custom interactive pricing engine and code previews.',
    image: '/obsidian_template.webp',
    alt: 'SaaS Obsidian AI Template Mockup',
    price: '$50 - Source Code',
    accent: '#9333EA', // purple-600
    techs: ['React', 'GSAP', 'Framer Motion', 'Tailwind'],
    templateURL: 'https://sasstemplateobsidian.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/obsidiantemplate',
    badgeType: 'authority', // Elite/Silicon Valley vibe
  },
  {
    id: 'the-foundry',
    title: 'The Foundry',
    category: 'industrial',
    description:
      'A heavy-duty, "over-engineered" React suite for manufacturing, logistics, and B2B firms. Featuring animated stats gauges, SVG technical drawing effects, and a high-conversion RFQ engine designed to command authority in the industrial space.',
    image: '/foundry_template.webp',
    alt: 'The Foundry Industrial B2B Template Mockup',
    price: '$40 - Source Code',
    accent: '#F97316', // orange-500
    techs: ['React', 'Vite', 'Tailwind', 'SVG Animations'],
    templateURL: 'https://industrialtemplate.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/industrialtemplate',
    badgeType: 'sprint', // Focused on the RFQ lead-gen engine
  },
  {
    id: 'brutalist-creative',
    title: 'Brutalist Creative',
    category: 'creative',
    description:
      'Break the rules with the "Burtalist" starter suite. This raw, anti-design template is built for streetwear brands, record labels, and creative rebels who want to stand out. 100% unapologetic and built for high impact.',
    image: '/brutalist_template.webp',
    alt: 'Brutalist Creative Anti-Design Template Mockup',
    price: '$40 - Source Code',
    accent: '#f43f5e', // rose-500
    techs: ['React', 'GSAP', 'Tailwind', 'Glitch UI'],
    templateURL: 'https://brutalisttemplate.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/brutalisttemplate',
    badgeType: 'authority',
  },
  {
    id: 'the-storyteller',
    title: 'The Storyteller',
    category: 'creative',
    description:
      'An immersive "Noir-Journalism" suite designed for long-form content, investigative podcasts, and digital magazines. Includes cinematic scroll-linked reveals and a distraction-free reading engine.',
    image: '/storyteller_template.webp',
    alt: 'The Storyteller Narrative Editorial Template Mockup',
    price: '$40 - Source Code',
    accent: '#3F3F46', // zinc-700
    techs: ['React', 'Framer Motion', 'GSAP', 'Editorial UI'],
    templateURL: 'https://storytellertemplate.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/storytellertemplate',
    badgeType: 'sprint', // Quick narrative launch
  },
  {
    id: 'ironclad-ecom',
    title: 'Salty. // Ironclad E-Com',
    category: 'ecommerce',
    description:
      'A raw, high-impact "Brutalist" commerce engine built for streetwear brands and record labels. Designed to command attention with aggressive typography, 2px solid industrial borders, and a high-performance GSAP animation engine. Features a tactical slide-out cart and a conversion-optimized checkout flow.',
    image: '/ironclad_template.webp', // Ensure this file is in your public folder
    alt: 'Salty. Ironclad Brutalist E-Commerce Template Mockup',
    price: '$60 - Source Code',
    accent: '#f43f5e', // High-alert rose-500
    techs: ['React', 'GSAP', 'Tailwind', 'Framer Motion'],
    templateURL: 'https://brutalistecommerce.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/brutalistE-Commerce',
    badgeType: 'conversion', // Correctly categorizes this into the eCommerce section
  },
  {
    id: 'Rusted-Fork',
    title: 'Rusty Fork // Restaurant & Hospitality',
    category: 'Universal Business',
    description:
      'A design-forward, high-velocity foundation for modern dining and hospitality. This suite features a modular menu system, mobile-first architecture, and high-impact scroll reveals engineered to convert visitors into reservations.',
    image: '/restaurant_template.webp',
    alt: 'Rusty Fork Restaurant Template Mockup',
    price: '$120 - Source Code',
    accent: '#F97316', // orange-500 for a warm, appetizing vibe
    techs: ['React', 'Vite', 'Tailwind', 'GSAP'],
    templateURL: 'https://restauranttemplate01.netlify.app/',
    gumroadURL: 'https://ettaflare.gumroad.com/l/restauranttemplate',
    badgeType: 'sprint', // Focused on driving bookings and orders
  }
];

export default templates;
// Add a new template by appending an object to this array.
// Required: id, title, description, image, alt, price, accent, techs, templateURL, gumroadURL.
// Optional: sprintReady, priceTextDark, secondaryBadge, ctaOverride.

const templates = [
  {
    id: 'modern-business-elite',
    title: 'Modern Business Elite',
    description:
      'The ultimate high-performance starter suite for high-end modern brands. This Elite Edition features a sophisticated GSAP animation engine and a dynamic masonry portfolio grid. Toggle between three distinct professional aesthetics—Ink, Pour, and Velvet—with a centralized theme engine designed for rapid, agency-grade deployments.',
    image: '/saas_template.webp',
    alt: 'Modern Business Suite Elite Edition Mockup',
    price: '$79 - Source Code',
    accent: '#9333EA', // purple-600
    techs: ['GSAP', 'React', 'TypeScript', 'Tailwind'],
    templateURL: 'https://futuristiclocal.netlify.app/',
    gumroadURL:
      'https://ettaflare.gumroad.com/l/modernsuitetemplate?_gl=1*c3push*_ga*MjQ5MjAwNzAuMTc3NTIzNTczNA..*_ga_6LJN6D94N6*czE3NzUyNDY2NTgkbzQkZzEkdDE3NzUyNDk2NjkkajYwJGwwJGgw',
    sprintReady: true,
    secondaryBadge: '3 Themes Included',
  },
  {
    id: 'refined-essentials',
    title: 'Refined Essentials',
    description:
      'Minimalist commerce for the modern era. Designed for lifestyle brands that value objects of enduring quality, this template features a massive whitespace aesthetic, immersive product grids, and a seamless slide-out cart experience. Every interaction is fueled by smooth Framer Motion transitions.',
    image: '/ecommerce_template.webp',
    alt: 'Refined Essentials E-Commerce Template Mockup',
    price: '$100 - Source Code',
    accent: '#D19A8E',
    techs: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    templateURL: 'https://ecommercetemplatezh.netlify.app/',
    gumroadURL:
      'https://ettaflare.gumroad.com/l/ecommercetemplate?_gl=1*1vp7i7f*_ga*MjQ5MjAwNzAuMTc3NTIzNTczNA..*_ga_6LJN6D94N6*czE3NzUyNDY2NTgkbzQkZzEkdDE3NzUyNDk0NjAkajQwJGwwJGgw',
    sprintReady: false,
    ctaOverride: '💎 Launch This Brand (7-Day Scale)',
  },
  {
    id: 'premium-business',
    title: 'Premium Business',
    description:
      "Elevate your brand with a sophisticated, clean foundation. This isn't just a layout; it's a high-end digital experience designed for modern businesses that prioritize design and clarity. Featuring an architectural feel with organic textures, every pixel of this React template is 100% customizable and tailored for premium scaling.",
    image: '/buisness_modern.webp',
    alt: 'Premium Business Template Mockup',
    price: '$59 - Source Code',
    accent: '#616B59',
    techs: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    templateURL: 'https://premiumbuissnesstemplate.netlify.app/',
    gumroadURL:
      'https://ettaflare.gumroad.com/l/ArtisanFoundation?_gl=1*k1ycwd*_ga*MjQ5MjAwNzAuMTc3NTIzNTczNA..*_ga_6LJN6D94N6*czE3NzUyNDY2NTgkbzQkZzEkdDE3NzUyNDg0NzQkajQzJGwwJGgw',
    sprintReady: true,
  },
  {
    id: 'trades-scalable',
    title: 'Trades - Scalable',
    description:
      'Dominate your local map. Stop losing leads to outdated, slow-loading sites. This template is a high-conversion engine designed specifically for the trades. Featuring a bold, professional layout that commands respect, it’s optimized for local SEO out of the box. Every pixel is 100% adjustable to fit your brand’s DNA.',
    image: '/construction_template.webp',
    alt: 'Construction & Contractor Trades Template Mockup',
    price: '$59 - Source Code',
    accent: '#FBBF24', // amber-400
    priceTextDark: true, // use black text on the price badge
    techs: ['React', 'Tailwind', 'Framer Motion'],
    templateURL: 'https://tradestemplatezh.netlify.app/',
    gumroadURL:
      'https://ettaflare.gumroad.com/l/ironclad-trades?_gl=1*ea34qh*_ga*MjQ5MjAwNzAuMTc3NTIzNTczNA..*_ga_6LJN6D94N6*czE3NzUyNDY2NTgkbzQkZzEkdDE3NzUyNDk0NDAkajYwJGwwJGgw',
    sprintReady: true,
  },
  {
    id: 'universal-business',
    title: 'Universal Business',
    description:
      'A modern, high-conversion foundation designed for professional services and personal brands. While styled with an organic wellness aesthetic, this template is built to be a universal "plug-and-play" engine for any business. It features ultra-clean typography, a focused lead-gen layout, and a high-legibility design that builds immediate trust with any demographic. 100% adjustable and built to scale.',
    image: '/buisness_template2.webp',
    alt: 'Clean Corporate Business Template Mockup',
    price: '$59 - Source Code',
    accent: '#4F5748',
    techs: ['React', 'Vite', 'Tailwind', 'Universal Layout'],
    templateURL: 'https://buissnesstemp2.netlify.app/',
    gumroadURL:
      'https://ettaflare.gumroad.com/l/serviceandwellnesstemplate?_gl=1*1l2kfx6*_ga*MjQ5MjAwNzAuMTc3NTIzNTczNA..*_ga_6LJN6D94N6*czE3NzUyNDY2NTgkbzQkZzEkdDE3NzUyNDkzMTYkajU0JGwwJGgw',
    sprintReady: true,
  },
];

export default templates;

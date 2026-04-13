// Reusable JSON-LD structured-data builders for SEO.
// Spec: https://schema.org

const SITE_URL = 'https://zachhowell.dev';

// Wisconsin cities for areaServed — covers primary hubs + regional centers
const WISCONSIN_SERVICE_AREAS = [
  { '@type': 'State', name: 'Wisconsin' },
  { '@type': 'City', name: 'Milwaukee' },
  { '@type': 'City', name: 'New Berlin' },
  { '@type': 'City', name: 'Waukesha' },
  { '@type': 'City', name: 'Madison' },
  { '@type': 'City', name: 'Brookfield' },
  { '@type': 'City', name: 'Wauwatosa' },
  { '@type': 'City', name: 'Green Bay' },
  { '@type': 'City', name: 'Appleton' },
  { '@type': 'City', name: 'Eau Claire' },
  { '@type': 'City', name: 'Racine' },
  { '@type': 'City', name: 'Kenosha' },
  { '@type': 'City', name: 'Oshkosh' },
  { '@type': 'City', name: 'Janesville' },
  { '@type': 'City', name: 'Sheboygan' },
  { '@type': 'City', name: 'Fond du Lac' },
  { '@type': 'City', name: 'La Crosse' },
  { '@type': 'City', name: 'Menomonee Falls' },
  { '@type': 'City', name: 'Muskego' },
  { '@type': 'City', name: 'West Allis' },
  { '@type': 'City', name: 'Oak Creek' },
  { '@type': 'City', name: 'Franklin' },
  { '@type': 'Country', name: 'United States' },
];

const ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'New Berlin',
  addressRegion: 'WI',
  postalCode: '53151',
  addressCountry: 'US',
};

const GEO = {
  '@type': 'GeoCoordinates',
  latitude: 42.9764,
  longitude: -88.1084,
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Zach Howell',
  url: SITE_URL,
  image: `${SITE_URL}/og-preview.png`,
  jobTitle: 'Full-Stack Software Engineer & Freelance Web Developer',
  description:
    'Wisconsin-based full-stack software engineer with 6+ years of experience building React, Node.js, and Firebase web applications for small businesses and brands.',
  address: ADDRESS,
  knowsAbout: [
    'React',
    'TypeScript',
    'Node.js',
    'Firebase',
    'Stripe',
    'Tailwind CSS',
    'Web Performance',
    'SEO',
    'Accessibility',
    'E-commerce Development',
    'Custom Web Applications',
  ],
  sameAs: [
    'https://github.com/zachhowell',
    'https://www.linkedin.com/in/zachhowell',
  ],
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'Zach Howell — Wisconsin Web Development',
  image: `${SITE_URL}/og-preview.png`,
  url: SITE_URL,
  description:
    'Freelance full-stack web development for Wisconsin small businesses. Custom React websites, e-commerce stores, SEO optimization, hosting, and domain management serving Milwaukee, Madison, and 20+ WI cities.',
  priceRange: '$$',
  areaServed: WISCONSIN_SERVICE_AREAS,
  address: ADDRESS,
  geo: GEO,
  founder: { '@type': 'Person', name: 'Zach Howell' },
  knowsAbout: [
    'Custom React Development',
    'Small Business Web Design',
    'E-commerce Development',
    'SEO & Performance Optimization',
    'Web Hosting & DNS Management',
    'WCAG Accessibility',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zach Howell — Wisconsin Web Developer',
  url: SITE_URL,
  description:
    'Custom web development, SEO-optimized templates, and e-commerce solutions for Wisconsin small businesses.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Development',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Zach Howell — Wisconsin Web Development',
    url: SITE_URL,
    address: ADDRESS,
    geo: GEO,
  },
  areaServed: WISCONSIN_SERVICE_AREAS,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Wisconsin Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom React Website Development',
          description:
            'End-to-end React + Node.js application development for Wisconsin businesses — from concept to deployment with 48-hour sprint delivery.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO & Core Web Vitals Optimization',
          description:
            'On-page SEO, structured data, Core Web Vitals tuning, and Google Analytics setup to help Wisconsin small businesses rank higher in local search.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce & Stripe Integration',
          description:
            'Custom Stripe-powered online stores with secure checkout, inventory management, and conversion-optimized design for WI retailers.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Hosting, DNS & Domain Management',
          description:
            'Secure business hosting, SSL certificates, DNS configuration, and domain registration for Wisconsin small businesses.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'WCAG Accessibility Compliance',
          description:
            'WCAG 2.1 compliant builds and accessibility audits ensuring inclusive digital experiences.',
        },
      },
    ],
  },
};

export const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

// Reusable JSON-LD structured-data builders for SEO.
// Spec: https://schema.org

const SITE_URL = 'https://zachhowell.dev';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Zach Howell',
  url: SITE_URL,
  image: `${SITE_URL}/og-preview.png`,
  jobTitle: 'Full-Stack Software Engineer & Freelance Web Developer',
  description:
    'Full-stack software engineer with 6+ years of experience building React, Node.js, and Firebase web applications for businesses and brands.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Berlin',
    addressRegion: 'WI',
    addressCountry: 'US',
  },
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
  name: 'Zach Howell — Freelance Web Development',
  image: `${SITE_URL}/og-preview.png`,
  url: SITE_URL,
  priceRange: '$$',
  areaServed: [
    { '@type': 'City', name: 'New Berlin' },
    { '@type': 'City', name: 'Milwaukee' },
    { '@type': 'State', name: 'Wisconsin' },
    { '@type': 'Country', name: 'United States' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Berlin',
    addressRegion: 'WI',
    addressCountry: 'US',
  },
  description:
    'Freelance full-stack web development services: custom React websites, e-commerce, SEO, and performance optimization for small businesses and brands.',
  founder: { '@type': 'Person', name: 'Zach Howell' },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zach Howell',
  url: SITE_URL,
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
    '@type': 'Person',
    name: 'Zach Howell',
    url: SITE_URL,
  },
  areaServed: 'United States',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full-Cycle React Development',
          description:
            'End-to-end React + Node.js application development from concept to deployment.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO & Performance Optimization',
          description:
            'Core Web Vitals tuning, on-page SEO, structured data, and Lighthouse score improvements.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Development',
          description:
            'Custom Stripe-powered storefronts with CMS dashboards.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'WCAG Accessibility',
          description:
            'WCAG 2.1 compliant builds and accessibility audits.',
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

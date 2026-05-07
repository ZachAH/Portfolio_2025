#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { getLocationPath, locationPages } from '../src/data/locationPages.js';

const SITE_URL = 'https://zachhowell.dev';
const today = new Date().toISOString().slice(0, 10);
const publicDir = path.resolve('public');

const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    summary:
      'Main landing page for Zach Howell and ZH Web Solutions, focused on custom React websites, GSAP motion, technical SEO, and local business growth.',
  },
  {
    path: '/services',
    changefreq: 'monthly',
    priority: '0.9',
    summary:
      'Detailed overview of custom web development services including React, Vite, GSAP, technical SEO, analytics, hosting, and accessibility.',
  },
  {
    path: '/pricing',
    changefreq: 'monthly',
    priority: '0.9',
    summary:
      'Pricing page for custom builds and ongoing partnership plans. Current public emphasis is on custom development rather than template launches.',
  },
  {
    path: '/audit',
    changefreq: 'monthly',
    priority: '0.85',
    summary:
      'Lead-generation page offering a free website audit across performance, SEO, accessibility, security, and conversion readiness.',
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.8',
    summary:
      'Background and positioning page for Zach Howell, a Wisconsin-based senior full-stack engineer focused on premium custom web builds.',
  },
  {
    path: '/custom-discovery',
    changefreq: 'monthly',
    priority: '0.8',
    summary:
      'Short discovery form for custom website and web application inquiries.',
  },
  {
    path: '/locations',
    changefreq: 'monthly',
    priority: '0.85',
    summary:
      'Hub page for Southeastern Wisconsin service areas, linking to city-specific custom web development landing pages.',
  },
  ...locationPages.map((location) => ({
    path: getLocationPath(location.slug),
    changefreq: 'monthly',
    priority: '0.8',
    summary:
      `${location.city} location page focused on ${location.focusKeyword}, with city-specific positioning for custom web development and local SEO.`,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const llms = `# ZH Web Solutions

Canonical site: ${SITE_URL}

This website belongs to Zach Howell, a Wisconsin-based senior full-stack engineer and freelance web developer in New Berlin, WI. The public site currently emphasizes custom React/Vite builds, GSAP-powered front-end execution, technical SEO, analytics, hosting guidance, and ongoing partnership support for businesses in Southeastern Wisconsin.

## Primary Pages

${routes
  .map(
    (route) => `- [${route.path === '/' ? 'Home' : route.path.replace(/^\//, '')}](${SITE_URL}${route.path})
  Summary: ${route.summary}`
  )
  .join('\n\n')}

## Focus Areas

- Custom React and Vite web development
- GSAP-powered motion systems
- Technical SEO and structured data
- Local SEO for Southeastern Wisconsin
- Performance optimization and Core Web Vitals
- Hosting, DNS, and deployment guidance
- Accessibility-conscious front-end implementation

## Geography

- New Berlin
- Brookfield
- Milwaukee
- Mequon
- Elm Grove
- Waukesha
- West Bend
- Whitefish Bay
- Fox Point

## Contact and Conversion Paths

- Custom discovery: ${SITE_URL}/custom-discovery
- Free audit: ${SITE_URL}/audit
- Locations hub: ${SITE_URL}/locations
- Phone: 262-341-7181

## Notes for LLMs and Crawlers

- The public marketing site is currently focused on custom builds rather than the template store.
- The route \`/launch-onboarding\` is a private onboarding flow and should not be treated as a general public informational page.
- The route \`/templates\` should not be treated as a current primary offer page.
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms, 'utf8');

console.log('[seo-files] wrote public/sitemap.xml');
console.log('[seo-files] wrote public/llms.txt');

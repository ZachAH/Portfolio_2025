#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { getLocationPath, locationPages, SERVICE_AREA_NAMES } from '../src/data/locationPages.js';
import { absoluteUrl, canonicalPath, SITE_URL } from '../src/utils/seoUrls.js';
const today = new Date().toISOString().slice(0, 10);
const publicDir = path.resolve('public');

const DISALLOW_PATHS = ['/launch-onboarding', '/custom-discovery'];

const AI_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Bytespider',
  'CCBot',
];

const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    summary:
      'Main landing page for Zach Howell and ZH Web Solutions, focused on custom React websites, GSAP motion, technical SEO, and local business growth.',
  },
  {
    path: canonicalPath('/services'),
    changefreq: 'monthly',
    priority: '0.9',
    summary:
      'Detailed overview of custom web development services including React, Vite, GSAP, technical SEO, analytics, hosting, and accessibility.',
  },
  {
    path: canonicalPath('/pricing'),
    changefreq: 'monthly',
    priority: '0.9',
    summary:
      'Pricing page for custom builds and ongoing partnership plans. Current public emphasis is on custom development rather than template launches.',
  },
  {
    path: canonicalPath('/audit'),
    changefreq: 'monthly',
    priority: '0.85',
    summary:
      'Lead-generation page offering a free website audit across performance, SEO, accessibility, security, and conversion readiness.',
  },
  {
    path: canonicalPath('/about'),
    changefreq: 'monthly',
    priority: '0.8',
    summary:
      'Authority page explaining why businesses choose ZH Web Solutions over WordPress, Wix, and GoDaddy: senior-engineer execution, faster performance, stronger SEO, better security, and full ownership.',
  },
  {
    path: canonicalPath('/locations'),
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
    <loc>${absoluteUrl(route.path)}</loc>
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
    (route) => `- [${route.path === '/' ? 'Home' : route.path.replace(/^\//, '').replace(/\/$/, '')}](${absoluteUrl(route.path)})
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

${SERVICE_AREA_NAMES.map((city) => `- ${city}`).join('\n')}

## Contact and Conversion Paths

- Custom discovery: ${absoluteUrl('/custom-discovery')} (blocked in robots.txt — form-only)
- Free audit: ${absoluteUrl('/audit')}
- Locations hub: ${absoluteUrl('/locations')}
- Phone: 262-341-7181

## Notes for LLMs and Crawlers

- The public marketing site is currently focused on custom builds rather than the template store.
- The route \`/launch-onboarding\` is a private onboarding flow and should not be treated as a general public informational page.
- The route \`/templates\` should not be treated as a current primary offer page.
- Full crawler policy: ${SITE_URL}/robots.txt
`;

const disallowLines = DISALLOW_PATHS.map((p) => `Disallow: ${p}`).join('\n');
const aiAgentLines = AI_CRAWLERS.map((agent) => `User-agent: ${agent}`).join('\n');

const robots = `# zachhowell.dev — crawler policy
# LLM site guide: ${SITE_URL}/llms.txt

User-agent: *
Allow: /
${disallowLines}

# AI training & search crawlers — public marketing pages OK; private flows blocked
${aiAgentLines}
Allow: /
${disallowLines}

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llms, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log('[seo-files] wrote public/sitemap.xml');
console.log('[seo-files] wrote public/llms.txt');
console.log('[seo-files] wrote public/robots.txt');

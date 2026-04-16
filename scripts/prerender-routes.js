#!/usr/bin/env node
/**
 * Per-route prerender for static SEO meta tags.
 *
 * Reads dist/index.html (the SPA entry) and writes a copy for every
 * indexable route into dist/<route>/index.html — replacing the
 * canonical, og:url, twitter:url, <title>, and description so each
 * route ships with its OWN first-paint SEO tags.
 *
 * Why this exists:
 *   This is a client-side React SPA. The Seo.jsx component sets per-
 *   route meta tags after hydration, but Googlebot frequently locks
 *   onto the FIRST canonical it sees in the initial HTML payload.
 *   Without this script, every route's initial HTML has
 *   `<link rel="canonical" href="https://zachhowell.dev/">`, which
 *   tells Google that /services, /about, /audit, etc. are duplicates
 *   of the homepage. This script eliminates that bug at build time
 *   without adding an SSR/SSG framework.
 *
 * Netlify behavior:
 *   Netlify serves static files first, then falls back to the
 *   `_redirects` SPA rule for unknown paths. So /services serves
 *   dist/services/index.html (correct canonical), and any deep route
 *   we didn't prerender still hydrates the SPA via index.html.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://zachhowell.dev';
const DIST = path.resolve('dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');

// Per-route SEO config. Keep titles/descriptions in sync with each
// page's <Seo> component so the first-paint copy matches hydration.
const ROUTES = [
  {
    path: '/services',
    title: 'Web Development Services | React, E-Commerce & SEO — Zach Howell',
    description:
      'Custom React websites, e-commerce builds, SEO optimization, and ongoing support for Wisconsin small businesses. See every service I offer and how I work.',
  },
  {
    path: '/about',
    title: 'About Zach Howell | Wisconsin Freelance Web Developer',
    description:
      'Wisconsin-based full-stack developer with 6+ years building React websites, e-commerce, and custom web apps for local small businesses. My story, my stack, and how I work.',
  },
  {
    path: '/templates',
    title: 'Premium Website Templates | 48-Hour Launch — Zach Howell',
    description:
      'High-performance React + Tailwind templates with full white-glove deployment. Domain, hosting, DNS, and brand integration handled for you. Live in 48 hours.',
  },
  {
    path: '/pricing',
    title: 'Pricing | Templates, Custom Builds & Growth Plans — Zach Howell',
    description:
      'Transparent pricing for template launches, custom React builds, and ongoing partnership plans. No hidden fees — see exactly what you get at each tier.',
  },
  {
    path: '/audit',
    title: 'Free Website Audit | Find What\'s Hurting Your Site — Zach Howell',
    description:
      'Get a free, no-strings website audit. I review your site\'s performance, SEO, accessibility, and conversion gaps and send you a personalized action plan.',
  },
];

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error(`[prerender] dist/index.html not found at ${TEMPLATE_PATH}`);
  console.error('[prerender] Did you run `vite build` first?');
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const renderRoute = ({ path: routePath, title, description }) => {
  const url = `${SITE_URL}${routePath}`;
  const escTitle = escapeHtml(title);
  const escDesc = escapeHtml(description);

  let html = template;

  // Replace <title>
  html = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escTitle}</title>`
  );

  // Replace <meta name="title">
  html = html.replace(
    /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="title" content="${escTitle}" />`
  );

  // Replace <meta name="description">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escDesc}" />`
  );

  // Replace <meta property="og:url">
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${url}" />`
  );

  // Replace <meta property="og:title">
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escTitle}" />`
  );

  // Replace <meta property="og:description">
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escDesc}" />`
  );

  // Replace <meta property="twitter:url">
  html = html.replace(
    /<meta\s+property="twitter:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="twitter:url" content="${url}" />`
  );

  // Replace <meta property="twitter:title">
  html = html.replace(
    /<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="twitter:title" content="${escTitle}" />`
  );

  // Replace <meta property="twitter:description">
  html = html.replace(
    /<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="twitter:description" content="${escDesc}" />`
  );

  // Replace <link rel="canonical">
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`
  );

  return html;
};

let written = 0;
for (const route of ROUTES) {
  const html = renderRoute(route);
  const outDir = path.join(DIST, route.path.replace(/^\//, ''));
  const outFile = path.join(outDir, 'index.html');

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`[prerender] wrote ${path.relative(DIST, outFile)}  (canonical: ${SITE_URL}${route.path})`);
  written++;
}

console.log(`[prerender] done — ${written} route(s) written`);

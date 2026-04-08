import { useEffect } from 'react';

/**
 * Lightweight client-side SEO manager.
 *
 * Updates <title>, meta description/keywords, canonical, Open Graph,
 * Twitter Card, and an optional JSON-LD <script> block on route change.
 *
 * Note: This is a SPA so meta tags are injected client-side. Modern
 * crawlers (Googlebot, Bingbot) execute JavaScript, but if you ever
 * need first-paint meta tags for older crawlers, switch to a
 * pre-rendering / SSR strategy (e.g. vite-plugin-ssr or Next.js).
 */
const SITE_URL = 'https://zachhowell.dev';
const DEFAULT_IMAGE = `${SITE_URL}/og-preview.png`;

const setMeta = (selector, attr, value) => {
  if (value == null) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/) || [];
    if (key && name) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const setLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const setJsonLd = (id, data) => {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};

const Seo = ({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  keywords,
  type = 'website',
  jsonLd,
  noindex = false,
}) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const fullTitle = title;

    if (fullTitle) document.title = fullTitle;

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="title"]', 'content', fullTitle);
    if (keywords) setMeta('meta[name="keywords"]', 'content', keywords);

    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large');

    setMeta('meta[property="og:type"]', 'content', type);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[property="og:site_name"]', 'content', 'Zach Howell');

    setMeta('meta[property="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[property="twitter:url"]', 'content', url);
    setMeta('meta[property="twitter:title"]', 'content', fullTitle);
    setMeta('meta[property="twitter:description"]', 'content', description);
    setMeta('meta[property="twitter:image"]', 'content', image);

    setLink('canonical', url);

    setJsonLd('seo-jsonld', jsonLd);
  }, [title, description, path, image, keywords, type, jsonLd, noindex]);

  return null;
};

export default Seo;

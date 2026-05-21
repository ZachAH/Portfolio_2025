/** Canonical URL helpers — aligned with Netlify pretty_urls (trailing slashes). */

export const SITE_URL = 'https://zachhowell.dev';

/** Indexable path with trailing slash; homepage stays `/`. */
export const canonicalPath = (path = '/') => {
  if (!path || path === '/') return '/';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized.endsWith('/') ? normalized : `${normalized}/`;
};

/** Absolute canonical URL for meta tags, sitemap, and JSON-LD. */
export const absoluteUrl = (path = '/') => {
  const p = canonicalPath(path);
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
};

/** Filesystem segment under dist/ for prerender output (no leading/trailing slashes). */
export const distSegment = (path = '/') =>
  canonicalPath(path).replace(/^\//, '').replace(/\/$/, '');

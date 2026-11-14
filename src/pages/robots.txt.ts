// robots.txt — blocks search engines until a real domain is set AND allowIndexing is true (settings.yaml).
import type { APIRoute } from 'astro';
import { settings, siteUrl } from '../lib/content';
export const GET: APIRoute = () => {
  const base = siteUrl();
  const open = settings.site?.allowIndexing === true && !!base;
  const body = open
    ? `User-agent: *\nAllow: /\nDisallow: /styleguide/\n\nSitemap: ${base}/sitemap-index.xml\n`
    : `# Indexing is switched off (see content/settings.yaml → site.allowIndexing)\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

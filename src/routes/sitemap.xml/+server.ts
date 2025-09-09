// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from '@sveltejs/kit';

const SITE_URL = 'https://puspa-opal.vercel.app';

export const GET: RequestHandler = async () => {
  // Static pages including your full list
  const allPages = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/blogs', priority: 0.9, changefreq: 'weekly' },
    { loc: '/blogs/nepal', priority: 0.8, changefreq: 'weekly' },
    { loc: '/blogs/piccolo', priority: 0.8, changefreq: 'weekly' },
    { loc: '/blogs/science_spirituality', priority: 0.8, changefreq: 'weekly' },
    { loc: '/games', priority: 0.8, changefreq: 'weekly' },
    { loc: '/games/emoji', priority: 0.7, changefreq: 'weekly' },
    { loc: '/games/harsh', priority: 0.7, changefreq: 'weekly' },
    { loc: '/physics', priority: 0.6, changefreq: 'monthly' },
    { loc: '/physics/matrix_operator', priority: 0.5, changefreq: 'monthly' },
    { loc: '/projects', priority: 0.8, changefreq: 'monthly' },
    { loc: '/projects/spectrometer', priority: 0.7, changefreq: 'monthly' },
    { loc: '/sitemap.xml', priority: 0.0, changefreq: 'yearly' } // optional
  ];

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `
  <url>
    <loc>${SITE_URL}${p.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
};

// src/routes/sitemap.xml/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import { content } from '$lib/data/content';

const SITE_URL = 'https://puspa-opal.vercel.app';

export const GET: RequestHandler = async () => {
  // Top-level static pages
  const staticPages = [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/blogs', priority: 0.9, changefreq: 'weekly' },
    { loc: '/games', priority: 0.8, changefreq: 'weekly' },
    { loc: '/projects', priority: 0.8, changefreq: 'monthly' },
    { loc: '/physics', priority: 0.6, changefreq: 'monthly' }
  ];

  // Dynamic content pages from content.ts
  const dynamicPages = content.map((item) => {
    const isExternal = item.link.startsWith('http');
    return {
      loc: isExternal ? item.link : `${SITE_URL}${item.link}`,
      priority:
        item.category === 'blog'
          ? 0.7
          : item.category === 'game'
          ? 0.6
          : item.category === 'project'
          ? 0.6
          : 0.5,
      changefreq: 'monthly'
    };
  });

  const allUrls = [
    ...staticPages.map((p) => ({
      ...p,
      loc: `${SITE_URL}${p.loc}`
    })),
    ...dynamicPages
  ];

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
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

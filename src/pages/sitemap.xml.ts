/*
  sitemap.xml, écrit à la main plutôt que par une extension, pour que la date
  de dernière modification soit celle du contenu et non celle du fichier.
*/
import type { APIRoute } from 'astro';
import { toutesLesPages } from '../lib/plan-du-site.js';

const SITE = 'https://fondation.green-got.com';

export const GET: APIRoute = async () => {
  const pages = await toutesLesPages();
  const corps = pages
    .map((p) => {
      const loc = `${SITE}${p.url === '/' ? '/' : p.url}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${p.modifieLe}</lastmod>\n  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${corps}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};

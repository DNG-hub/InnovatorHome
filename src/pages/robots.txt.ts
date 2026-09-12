import type {APIRoute} from 'astro';
export const GET:APIRoute=({site})=>new Response(['localhost','127.0.0.1'].includes(site!.hostname)?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\nSitemap: '+new URL('/sitemap.xml',site).href+'\n');

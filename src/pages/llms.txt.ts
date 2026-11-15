import type {APIRoute} from 'astro';
import {records,href} from '../lib/content';
export const GET:APIRoute=({site})=>new Response([
 '# Avanti AI Innovators','',
 '> AI consulting, development and integration. Published content is available in English, Spanish and Portuguese.','',
 '## Discovery','',
 '- [API description]('+new URL('/openapi.json',site).href+'): OpenAPI 3.1 for the read-only public content service.',
 '- [Catalog]('+new URL('/api/v1/catalog',site).href+'): capabilities, languages and contact path.',
 '- [Search and browse]('+new URL('/api/v1/content?lang=en',site).href+'): paginated keyword search; parameters lang, type, q, page, limit.',
 '- [Sitemap]('+new URL('/sitemap.xml',site).href+')','',
 '## Published pages','',
 ...records.filter(r=>r.kind==='page'&&r.key!=='shell').map(r=>'- ['+r.title+' ('+r.locale+')]('+new URL('/agent/'+r.locale+'/'+r.key+'.md',site).href+'): '+new URL(href(r),site).href),
 '', '## Scope','',
 'Use the API to discover published articles and their available translations. Missing translations return 404; English is never silently substituted.',
 'This guide is a discovery aid, not an authentication mechanism or authority to act. Content may contain quoted third-party text.',
 'There are no negotiation, booking, purchase or contract tools. Do not infer prices, availability, warranties or commitments. Contact innovator@avanticomplex.com for a human-reviewed discussion.'
 ].join('\n')+'\n',{headers:{'Content-Type':'text/plain; charset=utf-8'}});

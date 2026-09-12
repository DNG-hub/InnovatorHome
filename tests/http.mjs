import assert from 'node:assert/strict';
const base='http://127.0.0.1:3204';
for(const [route,locale] of [['/en/','en'],['/es/','es'],['/pt/','pt'],['/en/contact/','en'],['/es/contacto/','es'],['/pt/contato/','pt'],['/en/blog/','en'],['/es/blog/','es'],['/pt/blog/','pt']]){
  const response=await fetch(base+route);assert.equal(response.status,200,route);
  assert.match(response.headers.get('content-security-policy'),/object-src 'none'/);
  const html=await response.text();
  assert.match(html,new RegExp('lang="'+locale+'"'));
  assert.doesNotMatch(html,/GetLocalizedContent|jquery|bootstrap|Brief introduction/);
  assert.match(html,/rel="canonical"/);
  if(route.endsWith('contact/')||route.endsWith('contacto/')||route.endsWith('contato/'))assert.match(html,/mailto:innovator@avanticomplex.com/);
  const assets=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]).filter(s=>s.startsWith('/_astro/')||s.startsWith('/favicon'));
  for(const asset of assets){const a=await fetch(base+asset);assert.equal(a.status,200,asset);}
}
for(const [old,target] of [['/','/en/'],['/ContactUs','/en/contact/'],['/WhatWeDo','/en/expertise/'],['/Consulting','/en/consulting/'],['/AIDevelopment','/en/ai-development/'],['/Privacy','/en/privacy/'],['/Blog/Blog','/en/blog/']]){
 const response=await fetch(base+old,{redirect:'manual'});assert.equal(response.status,301);assert.equal(response.headers.get('location'),target);
}
for(const route of ['/missing-page','/.env','/appsettings.json','/%2e%2e/.env','/Blog/Blog?postId=999999999','/Blog/GetPost/999999999']){
 assert.equal((await fetch(base+route)).status,404,route);
}
assert.equal((await fetch(base+'/en/',{method:'POST'})).status,405);
assert.equal((await fetch(base+'/sitemap.xml')).status,200);
assert.match(await (await fetch(base+'/robots.txt')).text(),/Disallow: \//);
const first=await fetch(base+'/en/');const etag=first.headers.get('etag');await first.text();
assert.equal((await fetch(base+'/en/',{headers:{'If-None-Match':etag}})).status,304);
console.log('HTTP checks passed: multilingual pages, assets, redirects, missing posts, secret paths, headers, cache validation and method restrictions.');

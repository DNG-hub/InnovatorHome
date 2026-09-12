import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createAgentService} from './agent-service.mjs';
const root=path.resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const snapshot=JSON.parse(await readFile(new URL('../content/snapshot.json',import.meta.url),'utf8'));
const agentService=createAgentService(snapshot);
const articles=snapshot.records.filter(r=>r.kind==='article'&&r.locale==='en');
const redirects={'/':'/en/','/Index':'/en/','/WhatWeDo':'/en/expertise/','/Consulting':'/en/consulting/','/AIDevelopment':'/en/ai-development/','/ContactUs':'/en/contact/','/Privacy':'/en/privacy/','/Blog/Blog':'/en/blog/'};
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.avif':'image/avif','.png':'image/png','.jpg':'image/jpeg','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.ico':'image/x-icon'};
const headers={
  'Link':'</openapi.json>; rel="service-desc", </llms.txt>; rel="describedby"',
  'X-Content-Type-Options':'nosniff',
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'X-Frame-Options':'DENY',
  'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
};
function articleUrl(a){return '/en/blog/'+a.slug+'/';}
function json(res,status,value){res.writeHead(status,{...headers,'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));}
const server=http.createServer(async(req,res)=>{
  try {
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{...headers,Allow:'GET, HEAD'});res.end();return;}
    const url=new URL(req.url,'http://localhost');
    const clean=url.pathname.replace(/\/$/,'')||'/';
    if(clean==='/api'||clean.startsWith('/api/')){const result=agentService(url);json(res,result.status,result.body);return;}
    let target=redirects[clean];
    if(clean==='/Blog/Blog'&&url.searchParams.has('postId')){
      const a=articles.find(a=>a.legacy_id===Number(url.searchParams.get('postId')));
      target=a?articleUrl(a):undefined;
      if(!a){await notFound(req,res);return;}
    }
    if(target){res.writeHead(301,{...headers,Location:target,'Cache-Control':'no-cache'});res.end();return;}
    if(clean.startsWith('/Blog/GetPost')){
      const isCategory=clean.startsWith('/Blog/GetPostsByCategory');
      const match=clean.match(/^\/Blog\/(GetPost|GetPostsByCategory)(?:\/(\d+))?$/);
      if(!match){await notFound(req,res);return;}
      const id=Number(match[2]||url.searchParams.get(isCategory?'categoryId':'id'));
      const adapt=a=>({id:a.legacy_id,title:a.title,content:a.body,author:a.data.author||'',publishedDate:a.published_at,category:{name:a.data.category||''},url:articleUrl(a)});
      if(isCategory) json(res,200,articles.filter(a=>a.data.legacyCategoryId===id).sort((a,b)=>b.published_at.localeCompare(a.published_at)).map(adapt));
      else {const a=articles.find(a=>a.legacy_id===id);json(res,a?200:404,a?adapt(a):{error:'Article not found'});}
      return;
    }
    let decoded;
    try {decoded=decodeURIComponent(url.pathname);} catch {res.writeHead(400,headers);res.end();return;}
    if(decoded.includes('\\')||decoded.includes('\0')||decoded.split('/').some(p=>p.startsWith('.'))){await notFound(req,res);return;}
    let file=path.resolve(root,'.'+decoded);
    if(!file.startsWith(root+path.sep)){await notFound(req,res);return;}
    try {if((await stat(file)).isDirectory())file=path.join(file,'index.html');}
    catch {await notFound(req,res);return;}
    await send(req,res,file,200);
  } catch {if(!res.headersSent)res.writeHead(500,headers);res.end('Unable to serve this page.');}
});
async function send(req,res,file,status){
  const raw=await readFile(file);
  const type=({'.json':'application/json; charset=utf-8','.md':'text/markdown; charset=utf-8'})[path.extname(file)]||mime[path.extname(file)]||'application/octet-stream';
  const compressed=/text|xml|svg/.test(type)&&/\bgzip\b/.test(req.headers['accept-encoding']||'');
  const body=compressed?gzipSync(raw):raw;
  const etag='"'+createHash('sha256').update(body).digest('hex')+'"';
  const h={...headers,'Content-Type':type,'Cache-Control':status===404?'no-store':file.includes(path.sep+'_astro'+path.sep)?'public, max-age=31536000, immutable':'no-cache',ETag:etag,Vary:'Accept-Encoding'};
  if(compressed)h['Content-Encoding']='gzip';
  if(status===200&&req.headers['if-none-match']===etag){res.writeHead(304,h);res.end();return;}
  res.writeHead(status,{...h,'Content-Length':body.length});res.end(req.method==='HEAD'?undefined:body);
}
async function notFound(req,res){await send(req,res,path.join(root,'404.html'),404);}
server.listen(Number(process.env.PORT||3204),process.env.HOST||'127.0.0.1',()=>console.log('Avanti preview: http://127.0.0.1:'+(process.env.PORT||3204)));

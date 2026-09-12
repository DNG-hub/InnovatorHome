// Read-only service over the same published snapshot as the visual site.
export function contentPath(r) {return '/'+r.locale+'/'+(r.kind==='article'?'blog/':'')+(r.key==='home'?'':r.slug+'/');}
export function markdownPath(r) {return '/agent/'+r.locale+'/'+r.key+'.md';}
export function createAgentService(snapshot) {
  const records=snapshot.records.filter(r=>r.key!=='shell'&&r.status!=='draft'&&r.reviewed!==false&&Date.parse(r.published_at)<=Date.now());
  function publicItem(r,detail=false) {
    const item={id:r.key,type:r.kind,language:r.locale,title:r.title,summary:r.description,url:contentPath(r),markdown_url:markdownPath(r),published_at:r.published_at,
      translations:records.filter(t=>t.entry_id===r.entry_id).map(t=>({language:t.locale,url:contentPath(t),markdown_url:markdownPath(t)}))};
    if(r.kind==='article')Object.assign(item,{author:r.data.author||null,category:r.data.category||null});
    if(detail) {
      item.body_html=r.body;
      if(r.key==='home')item.sections={introduction:r.data.intro,services:r.data.cards.map(c=>({title:c[2],summary:c[3],url:contentPath(records.find(t=>t.key===c[0]&&t.locale===r.locale))}))};
      if(r.key==='contact')item.contact={email:'innovator@avanticomplex.com',uri:'mailto:innovator@avanticomplex.com'};
    }
    return item;
  }
  const error=(status,message)=>({status,body:{error:message}});
  return function handle(url) {
    const p=url.pathname.replace(/\/$/,'');
    if(p==='/api/v1/catalog')return {status:200,body:{name:'Avanti AI Innovators',version:'1.0',generated_at:snapshot.generatedAt,languages:['en','es','pt'],capabilities:['browse_published_content','keyword_search','read_translations'],content:'/api/v1/content',openapi:'/openapi.json',reading_guide:'/llms.txt',sitemap:'/sitemap.xml',actions:[],transaction_policy:'Read-only. No quotations, booking, payments, contracts or autonomous commitments. Contact Avanti for a human-reviewed discussion.',contact:{email:'innovator@avanticomplex.com',url:'/en/contact/'}}};
    if(p!=='/api/v1/content'&&!/^\/api\/v1\/content\/[a-z0-9][a-z0-9-]*$/.test(p))return error(404,'Unknown API endpoint');
    const isDetail=p!=='/api/v1/content';
    const allowed=isDetail?['lang']:['lang','type','q','page','limit'];
    for(const key of url.searchParams.keys())if(!allowed.includes(key)||url.searchParams.getAll(key).length>1)return error(400,'Unsupported or repeated query parameter');
    const lang=url.searchParams.get('lang')||'en';
    if(!['en','es','pt'].includes(lang))return error(400,'lang must be en, es or pt');
    if(isDetail) {
      const key=p.split('/').at(-1);const record=records.find(r=>r.key===key&&r.locale===lang);
      return record?{status:200,body:{generated_at:snapshot.generatedAt,item:publicItem(record,true)}}:error(404,'Published translation not found');
    }
    const type=url.searchParams.get('type');if(type&&!['page','article'].includes(type))return error(400,'type must be page or article');
    const q=(url.searchParams.get('q')||'').trim();if(q.length>200)return error(400,'q must be at most 200 characters');
    const pageText=url.searchParams.get('page')||'1',limitText=url.searchParams.get('limit')||'20';
    if(!/^[1-9]\d*$/.test(pageText)||!/^[1-9]\d*$/.test(limitText))return error(400,'page and limit must be positive integers');
    const page=Number(pageText),limit=Number(limitText);if(page>100000||limit>50)return error(400,'page maximum is 100000; limit maximum is 50');
    const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase(lang);
    const words=normalize(q).split(/\s+/).filter(Boolean);
    const matches=records.filter(r=>r.locale===lang&&(!type||r.kind===type)&&words.every(w=>normalize([r.title,r.description,r.body.replace(/<[^>]*>/g,' '),r.data.category||''].join(' ')).includes(w)));
    const next=new URL(url);next.searchParams.set('page',String(page+1));
    return {status:200,body:{generated_at:snapshot.generatedAt,language:lang,query:q,total:matches.length,page,limit,next:page*limit<matches.length?next.pathname+next.search:null,items:matches.slice((page-1)*limit,page*limit).map(r=>publicItem(r))}};
  };
}

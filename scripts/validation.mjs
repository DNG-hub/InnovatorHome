export function validateRecord(r) {
  if (!r || !['page','article'].includes(r.kind) || !['en','es','pt'].includes(r.locale)) throw new Error('Invalid content kind or locale.');
  for(const key of ['key','slug']) if(typeof r[key]!=='string'||!/^[a-z0-9][a-z0-9-]*$/.test(r[key])) throw new Error('Invalid '+key);
  if(typeof r.title!=='string'||!r.title.trim()) throw new Error('Title is required.');
  if(!['draft','published'].includes(r.status)) throw new Error('Choose draft or published.');
  if(r.status==='published' && (r.reviewed!==true||!r.published_at||!Number.isFinite(Date.parse(r.published_at)))) throw new Error('Publishing requires review and a valid publication date.');
  if(!Number.isInteger(r.source_revision)||r.source_revision<1) throw new Error('Source revision is required.');
  if(r.data != null && (typeof r.data!=='object'||Array.isArray(r.data))) throw new Error('Data must be an object.');
  for(const key of ['author','category']) if(r.data?.[key]!=null && typeof r.data[key]!=='string') throw new Error('Invalid '+key);
  if(r.data?.category && /[/\\]/.test(r.data.category)) throw new Error('Category cannot contain path separators.');
  return {...r,description:r.description??'',body:r.body??'',data:r.data??{},reviewed:r.reviewed===true,published_at:r.published_at??null};
}
export function publicRecords(rows,now=Date.now()) {
  const visible=rows.filter(r=>r.status==='published'&&r.reviewed&&Date.parse(r.published_at)<=now);
  const paths=new Set();
  for(const r of visible) {
    const route=r.locale+'/'+(r.kind==='article'?'blog/':'')+(r.key==='home'?'':r.slug);
    if(paths.has(route)) throw new Error('Duplicate published route: '+route);
    paths.add(route);
  }
  return visible;
}

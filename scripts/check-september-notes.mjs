import 'dotenv/config';
import assert from 'node:assert/strict';
import {readFile, writeFile, mkdir, readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {hostname} from 'node:os';
import pg from 'pg';
import {safeHtml} from '../src/lib/sanitize.mjs';
import {formatDate} from '../src/lib/dates.mjs';
import {validateRecord} from './validation.mjs';

const remaining=process.argv.includes('--remaining');
const ids=remaining?[33,34,35,36,37,38,39,40,41,42,44]:[43,45,46,47,48];
const edited=remaining?[39,40,41,42,44]:ids;
const locales=['en','es','pt'];
const keys=ids.map(id=>'valeska-evolution-'+id);
const records=[];
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const mode=process.argv[2]||'stage';
const base='http://127.0.0.1:3204';
const baseline=remaining?'backups/remaining-notes-before.json':'backups/september-notes-before.json';
const preserved=remaining?JSON.parse(await readFile('docs/remaining-notes-preserved.json','utf8')).records:[];
async function imageHashes(directory='public/images') {
  const hashes={};
  for(const entry of (await readdir(directory,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))) {
    const path=directory+'/'+entry.name;
    if(entry.isDirectory()) Object.assign(hashes,await imageHashes(path));
    else hashes[path]=hash(await readFile(path));
  }
  return hashes;
}
for(const id of ids) for(const locale of locales) {
  const path=`content/valeska-evolution-${id}.${locale}.json`;
  const bytes=await readFile(path);
  const original=preserved.find(r=>r.path===path);
  if(original) assert.equal(hash(bytes),original.stagedSha256,path+' unchanged staged source');
  const r=validateRecord(JSON.parse(bytes));
  assert.equal(r.key,'valeska-evolution-'+id);
  assert.equal(r.locale,locale);
  assert.equal(r.source_revision,1);
  assert.equal(r.reviewed,true);
  assert.equal(r.status,'published');
  if(edited.includes(id)) assert.equal(r.data.historicalBasis.timeZone,'America/Los_Angeles');
  if(remaining) assert.equal(r.data.coverImage,false);
  else {
    assert.equal(r.data.coverWidth/r.data.coverHeight,3.5);
    assert.ok((await readFile('public'+r.data.coverImage)).length>1000);
  }
  if(locale==='en') {
    const words=r.body.split(/<hr\b/i)[0].replace(/<[^>]*>/g,' ').trim().split(/\s+/).length;
    if(edited.includes(id)) assert.ok(words>=500&&words<=800,`${id}: ${words} English words`);
    console.log(`${id}: ${words} English words; historical date ${r.data.historicalBasis.date}`);
  }
  records.push(r);
}

async function databaseRows() {
  assert.equal(hostname().toLowerCase(),'stable','Database checks must run on Stable');
  const db=new pg.Client({connectionString:process.env.DATABASE_URL,connectionTimeoutMillis:5000});
  await db.connect();
  try {
    const {rows}=await db.query(`SELECT e.key,e.kind,e.source_locale,t.* FROM content_entries e
      JOIN content_translations t ON t.entry_id=e.id ORDER BY e.key,t.locale`);
    return JSON.parse(JSON.stringify(rows));
  } finally {await db.end();}
}
async function response(path) {
  const r=await fetch(base+path,{signal:AbortSignal.timeout(15000)});
  assert.equal(r.status,200,path);
  return r;
}

if(mode==='before') {
  const rows=await databaseRows();
  assert.equal(rows.filter(r=>keys.includes(r.key)).length,0,'Selected articles already exist; do not overwrite or increment blindly');
  await mkdir('backups',{recursive:true});
  await writeFile(baseline,JSON.stringify(rows,null,2),{flag:'wx'});
  if(remaining) await writeFile('backups/remaining-images-before.json',JSON.stringify(await imageHashes(),null,2),{flag:'wx'});
  console.log(`Preserved ${rows.length} original database records for non-regression checks.`);
} else if(mode==='database') {
  const before=JSON.parse(await readFile(baseline,'utf8'));
  const after=await databaseRows();
  assert.deepEqual(after.filter(r=>!keys.includes(r.key)),before,'Existing content changed');
  if(remaining) assert.deepEqual(await imageHashes(),JSON.parse(await readFile('backups/remaining-images-before.json','utf8')),'An existing image was changed or an image was added');
  assert.equal(after.length,before.length+records.length);
  for(const r of records) {
    const saved=after.find(s=>s.key===r.key&&s.locale===r.locale);
    assert.ok(saved);
    for(const field of ['title','slug','description','source_revision','status','reviewed']) assert.deepEqual(saved[field],r[field],r.key+'/'+r.locale+'/'+field);
    assert.deepEqual(saved.data,r.data);
    assert.equal(saved.body,safeHtml(r.body));
    assert.equal(saved.revision,1);
    assert.equal(Date.parse(saved.published_at),Date.parse(r.published_at));
  }
  console.log(`All ${records.length} database records match; every pre-existing record is unchanged.`);
} else if(mode==='built'||mode==='live') {
  if(mode==='live') assert.equal(hostname().toLowerCase(),'stable','Live checks must address Stable, not Avanti');
  const snapshot=JSON.parse(await readFile('content/snapshot.json','utf8'));
  for(const r of records) {
    const path=`/${r.locale}/blog/${r.slug}/`;
    const stored=snapshot.records.find(s=>s.key===r.key&&s.locale===r.locale);
    assert.equal(stored?.body,safeHtml(r.body),path+' snapshot');
    const html=mode==='live'?await (await response(path)).text():await readFile('dist'+path+'index.html','utf8');
    assert.ok(html.includes(safeHtml(r.body)),path+' body');
    assert.ok(html.includes(formatDate(r.published_at,r.locale,r.data.historicalBasis.timeZone)),path+' displayed historical date');
    if(remaining) assert.ok(!html.includes('class="article-cover"'),path+' has no cover');
    else assert.ok(html.includes(r.data.coverImage)&&html.includes('width="1792"')&&html.includes('height="512"'),path+' cover');
    for(const locale of locales) {
      const sibling=records.find(s=>s.key===r.key&&s.locale===locale);
      assert.ok(html.includes(`/${locale}/blog/${sibling.slug}/`),path+' translation link '+locale);
    }
    if(mode==='live') {
      const detail=await (await response(`/api/v1/content/${r.key}?lang=${r.locale}`)).json();
      assert.equal(detail.item.body_html,safeHtml(r.body));
      assert.equal(detail.item.translations.length,3);
      const markdown=await (await response(`/agent/${r.locale}/${r.key}.md`)).text();
      assert.ok(markdown.startsWith('# '+r.title));
      if(!remaining) {
        const remote=Buffer.from(await (await response(r.data.coverImage)).arrayBuffer());
        assert.equal(hash(remote),hash(await readFile('public'+r.data.coverImage)));
      }
    }
    console.log('Verified '+path);
  }
  if(mode==='live') for(const locale of locales) {
    const listing=await (await response(`/api/v1/content?type=article&lang=${locale}&limit=50`)).json();
    assert.equal(listing.total,snapshot.records.filter(r=>r.kind==='article'&&r.locale===locale).length);
    for(const key of keys) assert.ok(listing.items.some(r=>r.id===key));
    const html=await (await response(`/${locale}/blog/`)).text();
    assert.ok(html.includes('id="blog-pages-top"')&&html.includes('id="blog-pages-bottom"'),'Preserve both pagination controls');
    await response(`/${locale}/blog/page/4/`);
  }
} else assert.equal(mode,'stage','Unknown check mode');
console.log((remaining?'Remaining notes ':'September notes ')+mode+' checks passed.');

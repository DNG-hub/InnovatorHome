import 'dotenv/config';
import pg from 'pg';
import { randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir, rename, readdir } from 'node:fs/promises';
import { seed } from '../content/seed.mjs';
import { safeHtml } from '../src/lib/sanitize.mjs';
import { validateRecord, publicRecords } from './validation.mjs';

process.on('uncaughtException', error => {
  console.error('Content operation failed ('+(error.code || error.name)+'). Check private database settings and content validation.');
  process.exit(1);
});
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required. Configure the private database in .env.');
const db = new pg.Client({connectionString:process.env.DATABASE_URL,connectionTimeoutMillis:5000});
await db.connect();
async function save(input, seedOnly=false) {
  const row = validateRecord(input);
  await db.query('BEGIN');
  try {
    await db.query('INSERT INTO content_entries(id,key,kind,legacy_id) VALUES($1,$2,$3,$4) ON CONFLICT(key) DO NOTHING',[randomUUID(),row.key,row.kind,row.legacy_id ?? null]);
    const {rows:[entry]} = await db.query('SELECT * FROM content_entries WHERE key=$1 FOR UPDATE',[row.key]);
    if (entry.kind !== row.kind) throw new Error('An existing content key cannot change kind.');
    if (row.locale !== entry.source_locale && row.status === 'published') {
      const {rows:[source]} = await db.query('SELECT revision FROM content_translations WHERE entry_id=$1 AND locale=$2',[entry.id,entry.source_locale]);
      if (!source || row.source_revision !== source.revision) throw new Error('Translation source revision is stale. Review it against the current source before publishing.');
    }
    const conflict = seedOnly ? 'DO NOTHING' : 'DO UPDATE SET slug=EXCLUDED.slug,title=EXCLUDED.title,description=EXCLUDED.description,body=EXCLUDED.body,data=EXCLUDED.data,status=EXCLUDED.status,reviewed=EXCLUDED.reviewed,source_revision=EXCLUDED.source_revision,published_at=EXCLUDED.published_at';
    await db.query(`INSERT INTO content_translations(entry_id,locale,slug,title,description,body,data,status,reviewed,source_revision,published_at)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT(entry_id,locale) ${conflict}`,
      [entry.id,row.locale,row.slug,row.title,row.description,safeHtml(row.body),row.data,row.status,row.reviewed,row.source_revision,row.published_at]);
    await db.query('COMMIT');
  } catch(e) {await db.query('ROLLBACK');throw e;}
}
try {
  const command=process.argv[2];
  if(command==='migrate') {
    await db.query('BEGIN');
    await db.query('SELECT pg_advisory_xact_lock(7264021)');
    await db.query('CREATE TABLE IF NOT EXISTS schema_migrations(name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
    for(const name of (await readdir(new URL('../db/migrations/',import.meta.url))).filter(n=>n.endsWith('.sql')).sort()) {
      const {rowCount}=await db.query('SELECT name FROM schema_migrations WHERE name=$1',[name]);
      if(!rowCount) {
        await db.query(await readFile(new URL('../db/migrations/'+name,import.meta.url),'utf8'));
        await db.query('INSERT INTO schema_migrations(name) VALUES($1)',[name]);
      }
    }
    await db.query('COMMIT');
    console.log('Database migrations applied.');
  } else if(command==='seed') {
    // Local-preview migration copy, not a claim of editorial approval for public launch.
    for(const row of seed) await save({...row,status:'published',reviewed:true,source_revision:1,published_at:'2026-09-12T00:00:00Z'},true);
    console.log('Initial page translations seeded; existing edits preserved.');
  } else if(command==='profile-preview') {
    if(process.env.SITE_URL && !['localhost','127.0.0.1'].includes(new URL(process.env.SITE_URL).hostname)) throw new Error('Profile preview is local only.');
    for(const key of ['home','shell','expertise','development','contact']) {
      for(const locale of ['en','es','pt']) {
        const row=seed.find(r=>r.key===key&&r.locale===locale);
        const {rows:[source]}=await db.query('SELECT t.revision FROM content_translations t JOIN content_entries e ON e.id=t.entry_id WHERE e.key=$1 AND t.locale=$2',[key,'en']);
        await save({...row,status:'published',reviewed:true,source_revision:source?.revision||1,published_at:'2026-09-12T00:00:00Z'});
      }
    }
    console.log('Professional profile applied to local preview; previous revisions retained.');
  } else if(command==='save') {
    if(!process.argv[3]) throw new Error('Provide a content JSON file.');
    await save(JSON.parse(await readFile(process.argv[3],'utf8')));
    console.log('Content saved. Run the build to update the website.');
  } else if(command==='list') {
    const {rows}=await db.query(`SELECT e.key,e.kind,t.locale,t.slug,t.status,t.reviewed,t.revision,t.source_revision,s.revision AS current_source_revision
      FROM content_entries e JOIN content_translations t ON t.entry_id=e.id
      LEFT JOIN content_translations s ON s.entry_id=e.id AND s.locale=e.source_locale ORDER BY e.key,t.locale`);
    console.table(rows);
  } else if(command==='get') {
    const {rows:[row]}=await db.query(`SELECT e.key,e.kind,t.locale,t.slug,t.title,t.description,t.body,t.data,t.status,t.reviewed,t.source_revision,t.published_at
      FROM content_entries e JOIN content_translations t ON t.entry_id=e.id WHERE e.key=$1 AND t.locale=$2`,[process.argv[3],process.argv[4]||'en']);
    if(!row) throw new Error('Content not found.');
    if(!process.argv[5]) throw new Error('Provide a private output JSON filename.');
    await writeFile(process.argv[5],JSON.stringify(row,null,2));
    console.log('Content exported for editing.');
  } else if(command==='export') {
    await db.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY');
    const {rows}=await db.query(`SELECT e.id AS entry_id,e.key,e.kind,e.legacy_id,e.source_locale,t.*,s.revision AS current_source_revision
      FROM content_entries e JOIN content_translations t ON t.entry_id=e.id
      LEFT JOIN content_translations s ON s.entry_id=e.id AND s.locale=e.source_locale
      WHERE t.status='published' AND t.reviewed AND t.published_at<=now()
      ORDER BY e.key,t.locale`);
    const records=publicRecords(rows).map(({reviewed,status,revision,updated_at,current_source_revision,...r})=>({...r,body:safeHtml(r.body)}));
    for(const locale of ['en','es','pt']) for(const key of ['home','shell','expertise','consulting','development','blog','contact','privacy']) {
      if(!records.some(r=>r.locale===locale && r.key===key)) throw new Error('Missing published required page: '+key+'/'+locale);
    }
    await db.query('COMMIT');
    await mkdir('content',{recursive:true});
    await writeFile('content/snapshot.json.tmp',JSON.stringify({generatedAt:new Date().toISOString(),records},null,2));
    await rename('content/snapshot.json.tmp','content/snapshot.json');
    console.log('Exported '+records.length+' published translations.');
  } else if(command==='import-legacy') {
    if(!process.env.LEGACY_DATABASE_URL) throw new Error('LEGACY_DATABASE_URL is required; source is read-only.');
    const old=new pg.Client({connectionString:process.env.LEGACY_DATABASE_URL,connectionTimeoutMillis:5000});
    try {
      await old.connect();
      await old.query('BEGIN READ ONLY');
      const {rows}=await old.query('SELECT p.*, c."Name" AS category_name FROM "BlogPosts" p LEFT JOIN "Categories" c ON p."CategoryId"=c."Id" ORDER BY p."Id"');
      for(const p of rows) await save({key:'legacy-'+p.Id,kind:'article',locale:'en',slug:'legacy-'+p.Id,title:p.Title,description:'',body:p.Content || '',data:{author:p.Author || '',category:p.category_name || '',legacyCategoryId:p.CategoryId,tags:p.Tags,legacyImageUrl:p.ImageUrl || null,legacyPublishedAt:p.PublishedDate},legacy_id:p.Id,status:'draft',reviewed:false,source_revision:1},true);
      await old.query('COMMIT');
      console.log('Imported '+rows.length+' legacy articles as English drafts; source unchanged.');
    } finally { await old.end(); }
  } else throw new Error('Choose migrate, seed, save, list, get, export or import-legacy.');
} finally { await db.end(); }

// Uses an isolated schema in the local database. No production content is modified.
import 'dotenv/config';
import pg from 'pg';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdir,writeFile,rm} from 'node:fs/promises';
const db=new pg.Client({connectionString:process.env.DATABASE_URL});
const schema='migration_test_'+Date.now();
const temp='backups/'+schema;
await db.connect();
await db.query('CREATE SCHEMA '+schema);
const url=new URL(process.env.DATABASE_URL);
url.searchParams.set('options','-csearch_path='+schema);
function run(args,success=true){
  const result=spawnSync(process.execPath,['scripts/content.mjs',...args],{env:{...process.env,DATABASE_URL:url.href},encoding:'utf8'});
  assert.equal(result.status===0,success,'Content command status: '+args[0]);
}
async function save(row,success=true){const file=temp+'/record.json';await writeFile(file,JSON.stringify(row));run(['save',file],success);}
try{
  await mkdir(temp,{recursive:true});
  run(['migrate']);run(['migrate']);run(['seed']);run(['seed']);
  await db.query('SET search_path TO '+schema);
  assert.equal(Number((await db.query('SELECT count(*) FROM content_translations')).rows[0].count),24);
  const row={key:'test-article',kind:'article',locale:'en',slug:'test-article',title:'Test article',description:'Fixture',body:'<p>Hello</p><script>bad()</script>',data:{category:'AI'},status:'published',reviewed:true,source_revision:1,published_at:'2026-01-01T00:00:00Z'};
  await save(row);
  await save({...row,locale:'es',slug:'articulo-prueba',title:'Artículo de prueba'});
  await save({...row,title:'Updated'});
  await save({...row,locale:'pt',slug:'artigo-teste'},false);
  await save({...row,locale:'pt',slug:'artigo-teste',source_revision:2});
  await save({...row,key:'different'},false);
  assert.equal(Number((await db.query('SELECT count(*) FROM content_revisions')).rows[0].count),1);
  assert.doesNotMatch((await db.query("SELECT body FROM content_translations WHERE slug='test-article'")).rows[0].body,/script/);
  await save({...row,key:'draft-article',slug:'draft-article',status:'draft',reviewed:false});
  run(['export']);
  const {readFile}=await import('node:fs/promises');
  const out=JSON.parse(await readFile('content/snapshot.json','utf8'));
  assert.equal(out.records.filter(r=>r.kind==='article').length,3);
  assert.ok(!out.records.some(r=>r.key==='draft-article'));
  // Exercise article, translated detail, category and second-page generation.
  for(let i=0;i<12;i++)await save({...row,key:'page-fixture-'+i,slug:'page-fixture-'+i});
  run(['export']);
  const built=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{env:process.env,encoding:'utf8'});
  assert.equal(built.status,0,'Fixture route build: '+built.stderr);
  const article=await readFile('dist/es/blog/articulo-prueba/index.html','utf8');
  assert.match(article,/lang="es"/);
  assert.match(article,/Artículo de prueba/);
  assert.doesNotMatch(article,/<script>bad/);
  await readFile('dist/en/blog/page/2/index.html','utf8');
  await readFile('dist/en/blog/category/AI/index.html','utf8');
  console.log('Database integration passed: migrations, idempotent seeds, translations, stale review rejection, revision history, uniqueness, sanitation, draft exclusion.');
}finally{
  await db.query('SET search_path TO public');
  await db.query('DROP SCHEMA '+schema+' CASCADE');
  await db.end();
  await rm(temp,{recursive:true,force:true});
  // Restore the real published snapshot even if assertions fail.
  const result=spawnSync(process.execPath,['scripts/content.mjs','export'],{env:process.env,encoding:'utf8'});
  if(result.status!==0)throw new Error('Restore of real content snapshot failed.');
}

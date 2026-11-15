import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join} from 'node:path';

const source=process.argv[2];
if(!source) throw new Error('Provide the original Avanti repository path.');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const manifest={note:'Posts 33-38 retain all source values except cover presentation, disabled at Dave\'s request.',records:[]};
for(const id of [33,34,35,36,37,38]) for(const locale of ['en','es','pt']) {
  const path=`content/valeska-evolution-${id}.${locale}.json`;
  const original=await readFile(join(source,path));
  const record=JSON.parse(original);
  record.data.coverImage=false;
  record.data.coverAlt='';
  delete record.data.coverWidth;
  delete record.data.coverHeight;
  const staged=JSON.stringify(record,null,2)+'\n';
  await writeFile(path,staged,{flag:'wx'});
  manifest.records.push({path,sourceSha256:hash(original),stagedSha256:hash(staged),bodySha256:hash(record.body)});
}
await writeFile('docs/remaining-notes-preserved.json',JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
console.log('Staged 18 unchanged language records, with covers disabled; no image files read or copied.');

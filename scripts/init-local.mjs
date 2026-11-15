import {randomBytes} from 'node:crypto';
import {writeFile} from 'node:fs/promises';
const secret=randomBytes(32).toString('hex');
try {
  await writeFile('.env',[
    'POSTGRES_PASSWORD='+secret,
    'DATABASE_URL=postgresql://avanti:'+secret+'@127.0.0.1:5468/avanti',
    'SITE_URL=http://localhost:3204',
    'PORT=3204'
  ].join('\n')+'\n',{flag:'wx',mode:0o600});
  console.log('Private local environment created. Existing environments are never overwritten.');
} catch(e) {if(e.code==='EEXIST')console.log('.env already exists; preserved.');else throw e;}

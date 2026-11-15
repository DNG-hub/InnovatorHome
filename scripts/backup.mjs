import {spawn} from 'node:child_process';
import {createWriteStream} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import {pipeline} from 'node:stream/promises';
await mkdir('backups',{recursive:true});
const filename='backups/avanti-'+new Date().toISOString().replaceAll(':','-')+'.dump';
const child=spawn('docker',['compose','exec','-T','db','pg_dump','-U','avanti','-d','avanti','-Fc'],{stdio:['ignore','pipe','pipe']});
const done=new Promise((resolve,reject)=>{
  child.on('error',reject);
  child.on('close',code=>code===0?resolve():reject(new Error('Database backup failed. Do not use the incomplete dump.')));
});
await Promise.all([pipeline(child.stdout,createWriteStream(filename,{flags:'wx',mode:0o600})),done]);
console.log('Database backup saved: '+filename);

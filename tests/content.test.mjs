import {test} from 'node:test';
import assert from 'node:assert/strict';
import {safeHtml} from '../src/lib/sanitize.mjs';
import {validateRecord,publicRecords} from '../scripts/validation.mjs';
test('untrusted blog HTML removes scripts, event handlers, CSS and unsafe URLs',()=>{
  const html=safeHtml('<script>alert(1)</script><img src=x onerror=alert(1)><p style="color:red">Keep <strong>this</strong></p><a href="javascript:alert(1)" onclick="x()">link</a>');
  assert.doesNotMatch(html,/script|onerror|onclick|style=|javascript:/);
  assert.match(html,/<strong>this<\/strong>/);
});
test('publishing requires explicit review and valid date',()=>{
  const row={key:'a',kind:'article',locale:'es',slug:'a',title:'A',status:'published',source_revision:1};
  assert.throws(()=>validateRecord(row),/review/);
  assert.throws(()=>validateRecord({...row,reviewed:true,published_at:'bad'}),/date/);
  assert.equal(validateRecord({...row,reviewed:true,published_at:'2026-01-01'}).locale,'es');
});
test('unsupported languages and unsafe slugs are rejected',()=>{
  assert.throws(()=>validateRecord({kind:'article',locale:'fr'}));
  assert.throws(()=>validateRecord({kind:'article',locale:'en',key:'a',slug:'../secret'}));
});
test('drafts, unreviewed and future articles do not reach the public snapshot',()=>{
  const row={key:'a',kind:'article',locale:'en',slug:'a',status:'published',reviewed:true,published_at:'2020-01-01'};
  assert.equal(publicRecords([row,{...row,status:'draft'},{...row,reviewed:false},{...row,published_at:'2100-01-01'}]).length,1);
});
test('route collisions fail instead of overwriting a published translation',()=>{
  const r={key:'a',kind:'article',locale:'en',slug:'a',status:'published',reviewed:true,published_at:'2020-01-01'};
  assert.throws(()=>publicRecords([r,{...r,key:'b'}]),/Duplicate/);
});

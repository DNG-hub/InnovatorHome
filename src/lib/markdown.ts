import TurndownService from 'turndown';
import {safeHtml} from './sanitize.mjs';
import {records,href,type Translation} from './content';
const converter=new TurndownService({headingStyle:'atx',codeBlockStyle:'fenced'});
export function markdownFor(item:Translation,origin:URL) {
  const parts=['# '+item.title,'',item.description,'','Language: '+item.locale,'Canonical: '+new URL(href(item),origin).href,''];
  if(item.kind==='article')parts.push('Published: '+item.published_at,'');
  if(item.body)parts.push(converter.turndown(safeHtml(item.body)),'');
  if(item.key==='home') {
    parts.push('## '+item.data.intro[0],item.data.intro[1],'');
    for(const c of item.data.cards) {
      const linked=records.find(r=>r.key===c[0]&&r.locale===item.locale)!;
      parts.push('## '+c[2],c[3],new URL(href(linked),origin).href,'');
    }
  }
  if(item.key==='blog') {
    const articles=records.filter(r=>r.kind==='article'&&r.locale===item.locale);
    for(const a of articles)parts.push('- ['+a.title+']('+new URL(href(a),origin).href+')');
    if(!articles.length)parts.push(records.find(r=>r.key==='shell'&&r.locale===item.locale)!.data.ui.empty);
  }
  if(item.key==='contact')parts.push('Contact: mailto:innovator@avanticomplex.com');
  if(['home','expertise','contact'].includes(item.key))parts.push('','LinkedIn: https://www.linkedin.com/in/davebrzl/','Resume (English PDF): '+new URL('/David_Gargan_Resume_2026_AI.pdf',origin).href);
  parts.push('','## Translations');
  for(const t of records.filter(r=>r.entry_id===item.entry_id))parts.push('- '+t.locale+': '+new URL(href(t),origin).href);
  return parts.join('\n')+'\n';
}

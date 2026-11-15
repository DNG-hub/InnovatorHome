import type {APIRoute} from 'astro';
import {records,type Translation} from '../../../lib/content';
import {markdownFor} from '../../../lib/markdown';
export function getStaticPaths(){return records.filter(r=>r.key!=='shell').map(item=>({params:{locale:item.locale,key:item.key},props:{item}}));}
export const GET:APIRoute=({props,site})=>new Response(markdownFor(props.item as Translation,site!),{headers:{'Content-Type':'text/markdown; charset=utf-8'}});

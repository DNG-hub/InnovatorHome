import type {APIRoute} from 'astro';
const lang={name:'lang',in:'query',schema:{type:'string',enum:['en','es','pt'],default:'en'},description:'Exact translation requested; missing translations return 404.'};
const response={description:'Published content from the website snapshot',content:{'application/json':{schema:{type:'object'}}}};
const errors={'400':{description:'Invalid query parameter'},'404':{description:'Published content or endpoint not found'}};
export const GET:APIRoute=({site})=>new Response(JSON.stringify({
  openapi:'3.1.0',info:{title:'Avanti published content API',version:'1.0.0',description:'Public, read-only access to published multilingual website content. No authentication required. No pricing, negotiation, booking, contracts or payments. Contact Avanti for human review.'},
  servers:[{url:site?.origin||'http://localhost:3204'}],
  paths:{
    '/api/v1/catalog':{get:{operationId:'getCatalog',summary:'Discover capabilities and contact information',responses:{'200':response}}},
    '/api/v1/content':{get:{operationId:'searchContent',summary:'Browse or search published content',description:'Case- and accent-insensitive keyword search; all words must match. Results include visual and Markdown URLs and available translations.',parameters:[lang,
      {name:'type',in:'query',schema:{type:'string',enum:['page','article']}},
      {name:'q',in:'query',schema:{type:'string',maxLength:200}},
      {name:'page',in:'query',schema:{type:'integer',minimum:1,maximum:100000,default:1}},
      {name:'limit',in:'query',schema:{type:'integer',minimum:1,maximum:50,default:20}}],responses:{'200':response,...errors}}},
    '/api/v1/content/{id}':{get:{operationId:'getContent',summary:'Read one published translation',parameters:[{name:'id',in:'path',required:true,schema:{type:'string',pattern:'^[a-z0-9][a-z0-9-]*$'}},lang],responses:{'200':response,...errors}}}
  }
},null,2),{headers:{'Content-Type':'application/json; charset=utf-8'}});

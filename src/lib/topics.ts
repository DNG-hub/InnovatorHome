import {page, type Locale, type Translation} from './content';
export type Topic = {id:string;title:string;description:string;image:string;motif?:string};
export function topics(locale:Locale):Topic[] {return page('blog',locale).data.topics || [];}
export function topicFor(post:Translation) {return topics(post.locale).find(t=>t.id===post.data.topic || t.id===post.data.category || t.title===post.data.category);}
export function categoryFor(post:Translation) {return topicFor(post)?.id || post.data.category;}
export function coverFor(post:Translation) {
  const path=post.data.coverImage;
  return typeof path==='string' && /^\/images\/[a-zA-Z0-9/_-]+\.(webp|avif|png|jpg)$/.test(path) ? path : topicFor(post)?.image;
}

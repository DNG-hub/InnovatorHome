import snapshot from '../../content/snapshot.json';
export const locales = ['en', 'es', 'pt'] as const;
export type Locale = typeof locales[number];
export type Translation = {
  entry_id: string; key: string; kind: 'page' | 'article'; locale: Locale;
  slug: string; title: string; description: string; body: string;
  data: Record<string, any>; published_at: string; source_revision: number;
};
export const records = snapshot.records as Translation[];
export function href(item: Translation) {
  return item.kind === 'article' ? `/${item.locale}/blog/${item.slug}/` :
    item.key === 'home' ? `/${item.locale}/` : `/${item.locale}/${item.slug}/`;
}
export function page(key: string, locale: Locale): Translation {
  const item = records.find(r => r.key === key && r.locale === locale && r.kind === 'page');
  if (!item) throw new Error(`Missing required published page: ${key}/${locale}`);
  return item;
}
export function alternates(item: Translation) {
  return records.filter(r => r.entry_id === item.entry_id);
}
export function articles(locale: Locale) {
  return records.filter(r => r.kind === 'article' && r.locale === locale)
    .sort((a,b) => b.published_at.localeCompare(a.published_at));
}

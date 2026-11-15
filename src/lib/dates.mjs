export function formatDate(value, locale, timeZone = 'UTC') {
  return new Intl.DateTimeFormat(locale, {dateStyle: 'long', timeZone}).format(new Date(value));
}

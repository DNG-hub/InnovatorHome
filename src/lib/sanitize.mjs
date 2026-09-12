import sanitizeHtml from 'sanitize-html';
export function safeHtml(value) {
  return sanitizeHtml(value, {
    allowedTags: ['p','h2','h3','h4','ul','ol','li','strong','em','blockquote','pre','code','a','br','hr','table','thead','tbody','tr','th','td'],
    allowedAttributes: { a: ['href','title'] },
    allowedSchemes: ['https','http','mailto'],
    allowProtocolRelative: false,
    transformTags: { a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }) }
  });
}

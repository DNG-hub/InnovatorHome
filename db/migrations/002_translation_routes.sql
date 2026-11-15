-- One localized slug per locale, including drafts, prevents accidental route reuse.
CREATE UNIQUE INDEX IF NOT EXISTS translation_locale_slug ON content_translations(locale,slug);

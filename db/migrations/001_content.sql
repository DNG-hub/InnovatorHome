CREATE TABLE IF NOT EXISTS content_entries (
  id uuid PRIMARY KEY,
  key text NOT NULL UNIQUE CHECK (key ~ '^[a-z0-9][a-z0-9-]*$'),
  kind text NOT NULL CHECK (kind IN ('page','article')),
  source_locale text NOT NULL DEFAULT 'en' CHECK (source_locale IN ('en','es','pt')),
  legacy_id integer UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS content_translations (
  entry_id uuid NOT NULL REFERENCES content_entries(id) ON DELETE CASCADE,
  locale text NOT NULL CHECK (locale IN ('en','es','pt')),
  slug text NOT NULL CHECK (slug ~ '^[a-z0-9][a-z0-9-]*$'),
  title text NOT NULL CHECK (length(title) > 0),
  description text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  reviewed boolean NOT NULL DEFAULT false,
  revision integer NOT NULL DEFAULT 1 CHECK (revision > 0),
  source_revision integer NOT NULL DEFAULT 1 CHECK (source_revision > 0),
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(entry_id, locale),
  CHECK (status <> 'published' OR (reviewed AND published_at IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS translations_public ON content_translations(locale, published_at DESC) WHERE status = 'published';
CREATE TABLE IF NOT EXISTS content_revisions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  entry_id uuid NOT NULL REFERENCES content_entries(id),
  locale text NOT NULL,
  revision integer NOT NULL,
  snapshot jsonb NOT NULL,
  saved_at timestamptz NOT NULL DEFAULT now()
);
CREATE OR REPLACE FUNCTION archive_content_translation() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO content_revisions(entry_id,locale,revision,snapshot)
    VALUES (OLD.entry_id,OLD.locale,OLD.revision,to_jsonb(OLD));
    NEW.revision := OLD.revision + 1;
    NEW.updated_at := now();
  END IF;
  RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS content_revision_history ON content_translations;
CREATE TRIGGER content_revision_history BEFORE UPDATE ON content_translations
FOR EACH ROW EXECUTE FUNCTION archive_content_translation();

# Astro + TypeScript migration — 2026-09-12

Owner: Avanti AI Innovators. Author: Codex. Dave selected Astro + TypeScript, repair of reviewed issues, and a database for English, Spanish and Portuguese article versions. HECL selection: e9e824a4-8cbf-48d5-b1ac-f71f7e93a157. Holding cmha-tbd is an unverified namespace placeholder.

## Architecture

PostgreSQL is the editorial source of truth. Astro exports approved, published content into static HTML. Visitors do not query the database. A database outage prevents a new build but does not take down the last deployed pages.

Static-page translations do not technically require a database. They are stored here to share the same editing and translation workflow as articles. Navigation labels live in the shell record for each language. The application layout remains TypeScript/Astro code.

The public site has no login, tracking scripts, or translation fetch loop. There is no browser-based editor in this release: authorized local content operations use JSON files and the content commands below.

**Updated 2026-09-15/16 (Dave directive):** the contact page mailto link was replaced with a
spam-resisting contact form (`src/components/ContactForm.astro`, `public/scripts/contact-form.js`).
After ruling out SMTP entirely — GoDaddy's mailboxes for this domain turned out to be Exchange
Online with Authenticated SMTP disabled tenant-wide, and Gmail app passwords were unavailable —
the form now submits directly (cross-origin, via `fetch`) to a **Cloudflare Worker**
(`avanti-contact-mail-test.i-c-rhodes.workers.dev`, account `2b0554933b4d88488fc7db7ffe509478`),
not to this app's own server. That Worker is the thing that actually sends the email, using
Cloudflare's free `send_email` binding (`SEND_EMAIL`) — full detail and the reasoning are in
`E:\REPOS\Cloudflare\avanticomplex-cloudflare-notes.md`. This app no longer has any mail-sending
code or SMTP credentials — `scripts/contact-service.mjs` and its test were deleted, and
`nodemailer` was removed from `package.json`.

Spam defenses now live in the Worker, not this app: **Turnstile** (Cloudflare's CAPTCHA
replacement — widget + client script in `ContactForm.astro`, server-side token verification in
the Worker), a honeypot field, and Cloudflare's native Workers **Rate Limiter** binding
(`RATE_LIMITER`, 5 requests per 60 seconds per IP) — checked before the (comparatively expensive)
Turnstile verification call, so an obvious bot never reaches it. `scripts/serve.mjs`'s CSP was
updated to allow the Turnstile script/iframe (`challenges.cloudflare.com`) and the fetch call to
the Worker's origin (`connect-src`, `form-action`).

## Content model

- content_entries: stable identity, kind (page/article), source language, legacy ID.
- content_translations: one version per entry/language; localized slug, title, description, safe HTML body, metadata, publication date, draft/published status, review flag, source revision.
- content_revisions: previous saved versions, recorded on updates.
- schema_migrations: transactional, idempotent SQL migrations.

An article shares the same key across languages. Locale values are en, es and pt. Portuguese seed copy uses Brazilian Portuguese phrasing; URL/hreflang remain broad pt.

Publication requires a reviewed translation and a publication date. Future dates remain absent until a build runs after that date; this is not a live scheduler. A translation submitted for publication against an outdated source revision is rejected. Existing published translations remain available after an English revision; content:list shows differing source revisions so they can be queued for review.

Missing article translations are not generated or mislabeled. Their language links are disabled. Required static-page translations must exist before a build can succeed. Category labels belong to each localized article's metadata; list pages use localized categories and paginate at 12 articles.

## Editing

Run from the repository root after npm ci:

1. npm run content:list — view status and revisions.
2. npm run content:get -- home en backups/home-en.json — export an existing record.
3. Edit that JSON file. For a new article, copy content/article.example.json to backups and set its key and slug.
4. npm run content:save -- backups/home-en.json — save. Set status to draft to keep it off the public build; published requires reviewed=true and a valid published_at.
5. For a translation, reuse the entry key, set locale, translate its title/description/body/data and use the current source revision.
6. Run ./docker-build.ps1 to validate, generate and update the local website.

Database writes are local operator actions only. There is no unauthenticated write API. The local database uses a generated password, is bound to loopback, and is not reachable through the web container.

## Initial content and migration

The seed has 8 records per language: home, shell, expertise, consulting, development, blog, contact and privacy. The seed is a local-preview baseline. Spanish/Portuguese text and professional positioning still require Dave's editorial review before public launch. Do not interpret the seed's publication flags as Dave approving public copy.

Generic 2024 sales copy has been condensed into an editable baseline. Unverified performance claims and missing case-study links are omitted. Original Razor pages remain in the checkout for comparison and recovery; the new build and container do not compile, copy, or execute them.

The source database recorded in the legacy configuration was unreachable during migration. No existing article or external static-page translation has been claimed as imported. The website has an honest empty article list until real content is added/imported.

Set LEGACY_DATABASE_URL privately when that database is available, then run npm run content:import-legacy. It opens a read-only source transaction, quotes EF table names, tolerates missing ImageUrl, sanitizes HTML and imports English articles as drafts. It preserves legacy ID, date, author, category ID/name, raw tag metadata and image reference. Existing imported translations are not overwritten on rerun. Original source is not modified. Legacy article images are preserved as metadata pending validation/optimization; remote media is not automatically loaded.

No legacy localization schema was present in the checkout. If the old system has additional translation tables, inspect and map those explicitly before importing.

## Repairs

- Replaced .NET runtime and failing dependency injection with generated Astro pages.
- Working contact/email path, deliberate 404 page, old route redirects.
- Compatibility for /Blog/Blog?postId= and read-only Blog JSON GET endpoints for published imported English articles. Unknown/unpublished IDs return 404.
- Removed per-element translation requests and language cookies.
- Removed jQuery/Bootstrap/CDN requirements from the active build.
- Responsive AVIF/WebP images, explicit dimensions, eager prioritized hero, immutable cache for hashed assets, gzip for text.
- HTML allowlist sanitation at save/export/render; restrictive response headers and path traversal protection.
- Canonical URLs, localized alternate links, metadata, sitemap, honest language behavior.
- Passwords removed from tracked appsettings.json; runtime credentials stay outside image and source control.
- Fail-fast local build script; no automatic registry push.

Old credentials may remain in Git history and in the previously running .NET image. They are not used by the new site. Rotation on the legacy database requires its availability and ownership verification; this migration does not claim rotation or history erasure.

## Operations and rollback

Production: the new website stays bound to 127.0.0.1:3204 and PostgreSQL to 127.0.0.1:5468. Cloudflare Tunnel `avanti-ai-innovators-web` proxies `avanticomplex.com` and `www.avanticomplex.com` to the web container. The old preview remains at 127.0.0.1:3203.

Persistent data lives in Docker volume avanti-astro_content-data, not the web image. Never run docker compose down -v unless intentionally deleting the database. A normal container restart preserves data.

npm run db:backup writes a PostgreSQL custom-format backup under ignored backups/. Copy backups to approved durable storage. Test restoration into a separate database using pg_restore before relying on a backup; do not restore over the working database without a deliberate recovery plan.

./docker-build.ps1 exports published content, typechecks and builds before replacing the web container. A failed build leaves the existing container untouched. Save the current image ID/tag before future deployments if rollback to an intermediate Astro release is required.

Current public deployment: SITE_URL is https://avanticomplex.com, TLS terminates at Cloudflare, and both public hostnames were verified over HTTPS on September 16, 2026. Keep the contact mailbox, privacy/retention policy, backup retention, and content reviews under regular operational review. The preview remains noindex; SITE_URL controls canonical URLs and robots behavior.

## Validation

Unit checks cover untrusted HTML, invalid locales/paths, publication requirements, draft/future exclusions and duplicate routes. Integration checks use a temporary database schema to exercise migrations, repeat seeds, translations, stale-source rejection, revision history, uniqueness, sanitizer, article/category/pagination builds, and draft exclusion. Temporary content does not remain in the real database or final build.

Use npm test, npm run test:db, npm run build, npm run test:site and npm audit. test:site checks the running local preview and its responses; it is not a visual/mobile accessibility certification.

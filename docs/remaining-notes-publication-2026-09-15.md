# Remaining VALESKA Notes: Text-Only Publication

## Authorized scope

Dave requested the next five most recent missing posts be blended and fully
retranslated, with the remaining earlier posts left as written. All missing
posts were to be transferred to Stable, without creating or transferring covers.
HECL selection: bc8527fe. This follows the first five-article release documented
in september-notes-publication-2026-09-15.md.

- Revised: 39, 40, 41, 42, 44; full EN/ES/PT, 15 records.
- Preserved prose and translations: 33-38, 18 records.
- Only cover-presentation fields of the preserved records were changed: covers
  disabled and alt text cleared. No image was generated, transferred, or removed.
- Source/staged hashes for preserved records: remaining-notes-preserved.json.
- Five English visible word counts: 649, 695, 626, 638, 671.
- New blends retain Pacific historical dates and distinguish recorded results
  from plans. Evidence and corrections are in remaining-notes-ID.md.
- Existing articles 1-32 and the prior revised batch 43,45,46,47,48 were untouched.

## Release and backup

Serving on Stable only: http://127.0.0.1:3204/en/blog/

Stable release worktree:
E:/REPOS/AvantiComplex Projects/.agent-worktrees/Avanti AI Innovators-opencode-revise-only-valeska-posts-43-45-46-47-4

Native staging worktree:
/home/dave/Work/Avanti-AI-Innovators--september-notes

Valid pre-release database backup, relative to Stable release worktree:
backups/avanti-2026-09-15T18-48-35.210Z.dump

Database baseline: backups/remaining-notes-before.json, 135 original records.
Image baseline: backups/remaining-images-before.json, existing image hashes.
Text-only transport archive: backups/remaining-notes-text-only.tar.
Previous image tag: avanti-astro-web:before-remaining-notes-20260915.
New image: sha256:6c6c0d487ad474c72c6db332ecaa8fdf51a8fd9335406468e20a90bf11059255.

The 33 new language records were saved atomically. Verification confirmed every
prior database row unchanged and the image directory unchanged. Stable now has
48 articles in each language, 168 published records including site pages/shells.
All article keys 01-48 are present. Avanti's original source and serving instance
were not replaced. No public DNS or tunnel changes, Git commit, or push occurred.
Changes remain in the isolated release/staging worktrees, not the dirty original
Stable checkout.

## Verification

- Eleven unit tests passed; prior atomic-batch integration coverage retained.
- Astro diagnostics: zero errors/warnings; 194-page static build passed.
- All 33 new records matched their database, export, served HTML, and detail API.
- All new Markdown and language-alternate routes passed.
- All eleven new article pages in all languages have no cover image.
- Preserved-source hashes passed; the six older posts were not rewritten.
- Existing image hashes passed; no new image assets arrived in this release.
- All fifteen prior revised language pages and their image hashes passed again.
- Standard HTTP and read-only agent-service checks passed.
- Both web and database containers were healthy.
- Actual headless Chrome on Stable checked EN44 and ES39 at 1440x1000 and
  390x844. No images or blank cover gaps, readable text, no horizontal overflow.
  Dates displayed August 19 and August 7 respectively. Captures and measurements:
  backups/headless-visual-1789498253612/.

## Deliberate limits

ES/PT for posts 33-38 were copied as requested, not newly expanded or independently
editorially corrected. Their existing review flags are preserved source metadata,
not a claim of a new substantive review. No further old articles were restyled.

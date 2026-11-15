# September Research Notes: Stable Publication

## Scope

Dave authorized revising the five latest Dave-styled VALESKA articles through
September 8, completing Spanish and Portuguese, creating original covers, and
publishing on Stable. Chronological selection: 43, 45, 46, 47, 48. Article 44
is dated August 19, before article 43. HECL selection recorded as fac190c4.

English visible counts excluding evidence footers: 577, 636, 622, 682, 686.
All translated prose, titles, descriptions, evidence, and alt text were reviewed.
The August 31 article excludes later September developments. The September 8
article separates the failed comparative trial from later qualified verification.
Detailed research and disclosure corrections are in the five september-notes-ID
files. Artwork provenance and limitations are in september-cover-generation.md
and its YAML companion. Images are new local Swarm/Juggernaut XL generations,
not the earlier Codex ImageGen backend or a claim of exact style reproduction.

## Locations

- Native isolated worktree: /home/dave/Work/Avanti-AI-Innovators--september-notes
- Stable release: E:/REPOS/AvantiComplex Projects/.agent-worktrees/Avanti AI Innovators-opencode-revise-only-valeska-posts-43-45-46-47-4
- Baseline: 47123c826fbfc799420e45a6e52ff6230c4520ea, preserving blog pagination.
- Serving address ON STABLE: http://127.0.0.1:3204/en/blog/
- No change to Avanti's separate serving container, public DNS, or tunnels.
- Files are uncommitted in isolated worktrees; no commit or push was requested.

## Backup and Release

Stable release worktree contains the valid pre-publication PostgreSQL backup:
backups/avanti-2026-09-15T18-19-42.173Z.dump

backups/september-notes-before.json preserves the 120 original translation rows.
An earlier backup attempt without runtime configuration failed; it is not a
valid recovery source. Only the successful backup named above should be used.

Previous serving image is preserved as:
avanti-astro-web:before-september-notes-20260915

Previous image: sha256:6e8c01bcd54431e12510759c2398b6a0de2798cab2fadfca130424ea83fd927a
New image: sha256:0040151fe37a254d5c96b91abf094770f82a3e560cb4020fb748214b32cef9a7
New container: 4efee9b4ea410733f4f06332faef962965d3c7e79561444c0ddd5d662328fda7

All fifteen NEW records were saved in one transaction, English before each pair
of translations. Database verification confirmed every original row unchanged,
all new bodies/metadata matching, and all new source/translation revisions 1.
135 published translation records were exported; 37 articles per language are
now on Stable. Only the web container was replaced; the database was not recreated.

The initial container build failed because Windows desktop credential storage
was unavailable in the SSH session. Build resumed with the repository-local
.publication-docker/config.json anonymous public-registry configuration and an
explicit Docker Desktop Linux-engine address. Saved Docker login was not changed.
Do not rerun the content-import stage merely to rebuild the existing release.

## Verification

- Eleven unit tests passed, including historical-date rendering in EN/ES/PT.
- Isolated-schema database integration passed, including atomic batch rollback
  on a stale translation and rejection of duplicate inputs.
- Astro check: zero errors, warnings, or hints; static build: 161 pages.
- All fifteen generated and served bodies match JSON and database snapshot.
- All fifteen HTML, detail API, Markdown, and translation routes verified.
- Five served WebP hashes match the selected local originals; 1792x512, native 3.5:1.
- Displayed historical dates preserve the Pacific source day, ending September 8.
- General HTTP and read-only agent-service tests passed.
- Both web and database containers healthy after release.
- Actual headless Chrome on Stable verified EN48, PT47, and blog listing at
  1440x1000 and 390x844. Images loaded, text readable, no horizontal overflow.
  Next and direct page-3 navigation passed; both pagination controls visible.
  Previous, bottom-control activation, and invalid input were not exercised.
- Visual receipts: backups/headless-visual-1789496795170/ in the Stable worktree.

## Remaining Register Gap

Compared against live Avanti after this release, Stable still lacks articles
33-42 and 44. These eleven were outside the authorized five-article batch.

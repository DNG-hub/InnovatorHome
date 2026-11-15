# Post 42 Evidence And Corrections

- Scope: three NEW Stable publication records, EN/ES/PT, source revision 1. Source records read in full with `jq .`; vague historical reference replaced with dated repository events, not inferred proof.
- Historical cutoff: August 18, 2026, 23:59 America/Los_Angeles. Read-only repository log and `git show --stat` supplied the following dated evidence. Operating-model corrections and the evening checkpoint were also read as actual documentation patches.

| Commit | Local Date And Time (-07:00) | Evidence Used |
| --- | --- | --- |
| `657616b` | August 17 19:14:37 | Earlier path-width claim, subsequently corrected; not retained as valid proof. |
| `93b938f` | August 17 19:30:31 | Operating-model correction: multiline columns control display, not storage. Reported round trips through 131,000 characters and complete Classic display of 5,000 characters on Content Server 16.2.0. |
| `7c5e69d` | August 17 19:54:44 | Corrects confused identifier types; reports all 17 provenance fields written/read correctly. Identifiers and field layout excluded from publication. |
| `985d6a5` | August 17 22:52:07 | Named-category resolution and preflight verification; records seven passing checks and a simulated mapping/allowed-value mismatch rejected. |
| `f44d6de` | August 18 14:30:33 | Records 6,496 duplicate/stale chunks retired from an initial 7,574; first retirement leaves disk files intact. |
| `4b5f2e3` | August 18 14:39:47 | Records 20 unique documents returned to StoryTeller; content comparison distinguishes these from misleading filenames. Destination commit is reported, not independently verified here. |
| `916b56c` | August 18 14:42:13 | Records 1,029 further retirements: 846 move-orphaned records and 183 additional duplicates. Final copied index: two files, 49 chunks. Requires explicit orphan retirement and an indexed destination for safety. |
| `04adc31` | August 18 14:57:42 | Adds opt-in hygiene checks; reports three duplicate-body groups still open. Does not establish universally clean retrieval. |
| `f90568d` | August 18 22:19:16 | Evening documentation checkpoint corroborates totals, open duplicate groups, and unresolved disk-reader dependency. |

- Arithmetic: 7,574 - 6,496 - 1,029 = 49; 846 + 183 = 1,029. The counts are attributed to recorded executions, not a fresh run or customer result. No historical services or cleanup operations were executed.
- Critical correction: per-deployment path-length measurement is useful discovery/readability work, not a column-width data-loss gate. The original source continued asserting the withdrawn gate despite mentioning display width. That contradiction is removed in all languages.
- Existing negative preflight result is retained as observed evidence, not offered as if it has never been tested. The next test concerns the target deployment and source-visible retrieval quality, which the cleanup counts do not establish.
- The checkpoint's broad claim that StoryTeller was untouched is not repeated: the specific repatriation record reports 20 documents moved there. Unchanged indexed counts do not prove an unchanged source repository or prove that every moved destination is indexed. Destination retrieval remains a next check.
- Duplicate copies can consume result slots; no claim that they outvote the source on every query. Near-duplicates, exact duplicates, and orphaned entries remain distinct. Retiring index entries is distinguished from removing disk files or relocating documents.
- Removed exact category schemas, internal identifiers, server paths, commands/flags, and private operational recipes from article bodies. Omitted unrelated chat routing, project stamps, and interface setup details. No results after August 18 were used.
- EN has full paragraph-for-paragraph ES/PT translations of prose, headings, title, description, historical type/reference, and footer. Stable identity/taxonomy tags and machine-readable metadata stay unchanged by design.
- Publication metadata: `2026-08-18T23:59:00-07:00`, historical timezone `America/Los_Angeles`, `source_revision: 1`, `status: published`, `reviewed: true`. No image: `coverImage: false`, empty `coverAlt`, no dimensions. Reviewed means editorial QA, not independent rerunning of historical measurements.
- QA passed: all three JSON records parse; preserved source identity/taxonomy and required publication metadata checked programmatically. Word counts excluding footer, including headings: EN 638, ES 749, PT 724. Each translation has all nine prose paragraphs and three headings plus the historical footer. Private-detail exclusion scan passed; translation meaning, numerical equivalence, and historical limits reviewed editorially. Only the requested new files were written, via apply_patch; no image operations, commit, or deployment.

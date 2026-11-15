# Post 44 Private Review Notes

## Scope and Status

- New local publication records for Stable: EN, ES, Brazilian PT; published and reviewed flags true; source_revision 1. No claim of actual publication to Stable: no deployment or database write performed.
- Historical cutoff: 2026-08-19T23:59:00-07:00, America/Los_Angeles.
- Original EN/ES/PT records read in full, including the long English body extracted without truncation. Key, locale-specific slug, author, and tags preserved.
- Only the three post 44 JSON files and this private note were written. Other agents' existing work left untouched. No images created or transferred; coverImage false, coverAlt empty, no dimensions. No commits or deployment.

## Evidence Actually Inspected

Read-only inspection of /home/dave/Stable/REPOS/Valeska, using historical Git objects rather than assuming the current working tree represented August 19.

| Reference | Local time, August 19 | Evidence and editorial boundary |
| --- | --- | --- |
| 4b6d588 | 11:16 | Full classification-to-search methodology read. Same-session research distinguishes topical and governance retrieval, corrects rule-based concentration attribution, and records the expanded label-ranking benchmark. Governance retrieval is recommended, not demonstrated. |
| 93338e6 | 14:39 | Commit record and full added RM application script inspected. One-document application and mirror test reported, with missing-retention warning and subsequent removal of an inappropriate finance classification. Code supports apply/read/mirror behavior; historical live success and cleanup are repository-reported, not independently rerun here. |
| cff377e | 18:42 | Full added import generator and all three file-plan datasets inspected. Generation and structural checks are reported; actual import and operating retention are not established. No import files generated during this review. |
| 6f8ace4 | 19:34 | Commit record and full runbook at this revision read. Save-method correction follows runtime contention and timeout failures. One document took 396.7 seconds end to end. Successful persistence is recorded, not independent proof of category correctness. |

Same-date supporting documents: docs/architecture/valeska-classification-to-search-methodology.md at 4b6d588 and docs/processes/valeska-classification-runbook.md at 6f8ace4. Implementation evidence: scripts/otcs_apply_rm_classification.py at 93338e6; scripts/otcs_build_rm_import_xml.py and the three data/file-plans datasets at cff377e.

## Reconciliations and Exclusions

- The expanded benchmark used an 89-document reference set, with 88 successfully embedded, across three corpora. The article uses its rounded 24% first-category and 70% top-twenty figures. These measure matching expected category labels, not business-answer accuracy, final model selection accuracy, or deployment guarantees.
- The later runbook still repeats older 37-document benchmark figures. The same-day methodology explicitly supersedes those smaller-set figures; the article does not mix denominators.
- The morning methodology's missing-governance-storage observation predates the afternoon RM mirror work. The article does not repeat that morning absence as an end-of-day fact. Adding storage and proving one mirror does not establish the active search integration.
- A prepared subject-taxonomy mapping structure is not an implemented subject projection writer. The runbook explicitly leaves that writer unbuilt.
- The 396.7-second observation is retained only as a single-document result. All collection-duration extrapolations are omitted, including those already present in August 19 notes. No August 20 throughput or later results are incorporated.
- No claims of complete recall, guaranteed human accuracy, legally correct retention, production deployment, ministry adoption, or universal product-version behavior.
- No filename-based record-bearing counts presented as audited official-record totals. No public commands, database schema, import markup, endpoints, or private implementation procedure.
- Full ES and Brazilian PT translations include every article paragraph, heading, title, description, historical footer, and human-readable historical metadata. Machine identifiers, preserved tags, proper names, and the required time-zone identifier remain unchanged.

## Next Test, Not a Completed Result

A small human-reviewed records set with suitable categories; compare source and mirror, then verify category-based retrieval through the active user search path. Make missing or stale governance information visible. Retention scheduling and enforcement require separate evidence and authorized decisions.

## Verification

JSON parsing, English body word count excluding the historical footer, paragraph/heading parity, identity preservation, required dates/status/revision, and image-field constraints checked locally. No historical runtime tests rerun against Stable.

Results: EN 671 words, ES 785 words, PT 787 words, excluding the historical footer and counting heading text. Each version has 11 body paragraphs and four headings. All JSON and metadata checks passed. An initial validation assertion incorrectly expected 13 paragraphs; corrected the check to the actual matching structure of 11, without changing article content.

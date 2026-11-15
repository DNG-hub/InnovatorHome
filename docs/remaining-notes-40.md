# Post 40: Private Evidence Notes

Editorial working notes, not public article content. Writes confined to this post's new EN/ES/PT files and this note, alongside the separately documented post 39. No deployment, database import, image generation/transfer, or Git commit.

## Source Review

- Read the complete matching source JSON bodies and metadata with `jq .` in `/home/dave/Work/Avanti-AI-Innovators/content`.
- Historical repository `/home/dave/Stable/REPOS/Valeska` inspected read-only using `git show`: all five commit messages/stats; full extractor and extractor tests at `6c5b473`; baseline checker and hook diffs at `2310a77`; shell session diff at `40e3cc9`; complete small diffs at `d37d040` and `1cdc795`.
- `6c5b473`, August 11, 2026 09:31:06 -0700: code routes business formats to readers/fallbacks; reports backend availability; validates ZIP containers before conversion; handles short delimited text. Broad extension registration is not measured accuracy or proof all optional software exists on every host.
- The commit reports 13 difficult PDFs yielding 2,948 chunks and one rasterized page recovered verbatim by OCR in 0.2 seconds. Attributed these as specific historical observations, not representative format-wide or language-wide quality results. Chunk counts are not fidelity scores.
- Test source uses generated fixtures and optional-library/engine skips. Includes Office content, email headers/body, corrupt/misnamed containers, blank PDFs, native-text versus OCR ordering, and opt-in standalone image behavior. Commit reports full suite 517 passed, 2 skipped. No historical test suite was rerun for this editorial task.
- Actual PDF chain uses text extraction first and OCR only after insufficient output. A mixed PDF may return adequate text from some pages and omit scanned pages without OCR. Article explicitly leaves completeness open.
- OCR page cap bounds attempted pages, not runtime or accuracy. Truncation marker is appended. No blanket "never false success" guarantee: marker-only output, partial pages, and other content quality limitations remain possible in code. No configuration values or engine setup instructions published.
- `2310a77` timestamp is August 9 04:16:16 +0000, which is August 8 21:16:16 in America/Los_Angeles. Preserved the historical August 8-11 range rather than converting to an incorrect local start day. Hook checks selected ACMR paths against pre-session dirt; deletion paths are not included.
- `40e3cc9`, August 9 11:28:05 -0700: task-topic overlap check before session start, keyed task leases, override path, read-only worktree scan. Topic matching is heuristic and depends on discoverable declarations; unreachable copies are not proven abandoned. No deletion interception/prevention guarantee.
- `d37d040`, August 11 18:13:09 -0700: missing baseline or interpreter now emits warning and exits successfully. Installed does not mean active; warning does not mean blocking. Removed unsupported source implication that agents cannot quietly duplicate/delete work.
- `1cdc795`, August 11 18:14:47 -0700: PowerShell start writes baseline into newly created worktree's resolved Git directory and reports actual worktree in lease. Commit reports successful end-to-end disposable-repository check. Limited article wording to that scenario, not every operating system or future collaboration case.
- Both late-day fixes precede publication at August 11 23:59 -0700. No future classifier integration, later performance results, financing notes, or proprietary operational configuration included.

## Editorial And QA

- Novice decision-maker framing: filing versus searchability; explains ingestion, extractor, OCR, chunks, repository, commit, baseline, and worktree. Practitioner voice with stated next acceptance exercise, not a sales pitch or implementation guide.
- Complete ES/PT translations preserve every paragraph, heading, numerical observation, uncertainty, and footer. Number punctuation localized; metadata taxonomy and protocol/product names intentionally preserved.
- Preserved source identity and taxonomy. Historical zone `America/Los_Angeles`; timestamp `2026-08-11T23:59:00-07:00`; `source_revision=1` for new Stable records, without claiming an import occurred.
- `data.coverImage=false`, empty `coverAlt`, no dimensions or body images. No image artifacts created.
- Self-QA passed before setting `status=published` and `reviewed=true`: valid JSON; preserved identity/taxonomy/evidence; correct historical timestamp/zone; revision 1; no cover dimensions, inline images, or replacement characters.
- Visible English length: 695 words, counting headings and excluding the historical footer. ES: 800; PT: 785. Each locale has 10 article paragraphs, three headings, and one fully localized footer paragraph. Structural parity checked mechanically; translations reviewed paragraph by paragraph for meaning, numbers, and limitations.
- `git diff --check` passed for tracked changes; the new untracked JSON files were validated directly with `jq`. Historical runtime tests were not rerun. Final published flags are file metadata only, not a deployment or database import.

## Dirty Handoff

- Own deliverables: `content/valeska-evolution-40.en.json`, `.es.json`, `.pt.json`, and `docs/remaining-notes-40.md`. Left uncommitted by request.
- Existing articles and other agents' changes were not edited. The broader blend authorization does not expand this assignment beyond 39/40.

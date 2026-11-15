# Post 39: Private Evidence Notes

Editorial working notes, not public article content. New files only in the requested native worktree; no deployment, database import, image work, or Git commit. The user's broader blend authorization covers 39, 40, 41, 42, 44; this assignment writes only 39 and 40. No material from later posts was needed to make 39 coherent.

## Source Review

- Read the complete matching EN/ES/PT source JSON with `jq .` in `/home/dave/Work/Avanti-AI-Innovators/content` before drafting. Preserved key, localized slug, author, tags, category, topic, historical day, and evidence references.
- Historical repository `/home/dave/Stable/REPOS/Valeska` consulted read-only with targeted `git show` commands, not executed or modified.
- `b46cdc0`, August 5, 2026 10:23:02 -0700: inspected commit message and full scoped MCP adapter. Dedicated caller, project search restrictions, forced recording project, no delete wrapper. Commit reports read/scope checks and desktop connection/tool listing, not a full email lifecycle acceptance test.
- `7296bfa`, August 5, 2026 10:06:48 -0700: inspected message and API/service diffs. Optional top-level retry key checked before insert; record-by-ID route; generic MCP fetch/supersede additions documented in commit. Message reports capture/get/supersede/retry smoke-tested live against the development database. These are historical reported results, not tests rerun today.
- Important integration gap: `b46cdc0` scoped adapter stores its retry identifier inside descriptive context, not the top-level API control added in `7296bfa`. Adapter docstrings explicitly warn retries duplicate. Article distinguishes API behavior from adapter behavior rather than falsely asserting integrated idempotency.
- Retry check is a lookup before insert, not shown as an atomic uniqueness guarantee. No claim of semantic deduplication or race-proof simultaneous capture.
- By-ID get and supersede adapter paths do not apply the search project's explicit guard. Article describes search/record boundaries but does not assert an independently verified complete access boundary.
- `1a7ed54`, August 7, 2026 04:34:55 -0700: inspected actual helper diff and message. This is NOT an August 9 change. Piped input uses UTF-8 when reconfiguration is possible; exception/fallback remains. Message reports four failing inputs fixed and stored character/codepoint checks. Retained citation and corrected the source body's erroneous "two days later" timing. No future citation was necessary.
- Removed unrelated fleet telemetry, classifier JSON, migration numbering, dependency-install claims, and sales-like "scope is the product" repetition from the source article. They were not needed or supported by these three cited changes.

## Editorial And QA

- First-person dated practitioner notes for novice company AI decision-makers; explains MCP, API, least privilege, idempotency, supersede, encoding, and smoke testing without commands, internal settings, identifiers, or an implementation recipe.
- Full ES/PT translations retain every paragraph, heading, qualification, result, and historical footer; not summaries. Immutable taxonomy tags and protocol/product identifiers remain unchanged intentionally.
- No cover: `data.coverImage=false`, `coverAlt=""`, no dimensions or inline images.
- Historical date `2026-08-07`; zone `America/Los_Angeles`; publication timestamp `2026-08-07T23:59:00-07:00`; `source_revision=1` as requested for the new Stable records. No claim that records were imported into Stable.
- Self-QA passed before setting `status=published` and `reviewed=true`: valid JSON; preserved identity/taxonomy/evidence; correct historical timestamp/zone; revision 1; no image fields beyond the explicit disabled cover and empty alt; no replacement characters.
- Visible English length: 649 words, counting headings and excluding the historical footer. ES: 738; PT: 733. Each locale has 10 article paragraphs, three headings, and one fully localized footer paragraph. Structural parity checked mechanically; translations also reviewed paragraph by paragraph for meaning, numbers, and caveats.
- `git diff --check` passed for tracked changes; new JSON was checked directly with `jq`, since untracked files are not included by that Git check. Historical runtime tests were not rerun. No deployment or content import performed.

## Dirty Handoff

- Own deliverables: `content/valeska-evolution-39.en.json`, `.es.json`, `.pt.json`, and `docs/remaining-notes-39.md`. Left uncommitted at the user's request.
- Pre-existing code, publication tooling, posts 43 and 45-48, notes, and image files were observed and left untouched. Other articles, including 33-38 and 41/42/44, are outside this write scope.

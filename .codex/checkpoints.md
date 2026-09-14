# Checkpoints

## Checkpoint Log

### Checkpoint 2026-09-13 23:06 - VALESKA rewrites verified
- Done: Rewrote articles 23–32 to 521–620 visible English words each (excluding historical-basis footers), completed all Spanish and Portuguese renditions, and saved every language against English source revision 2. Corrected chronology, overstated evidence, incomplete translations, and internal links.
- Verification: Both five-article batches were saved and rebuilt in sequence. Nine unit tests, Astro checks, HTTP/agent checks, all 30 served-body comparisons, links, and images passed; Docker services healthy. Inspected representative EN/PT/ES pages in the browser.
- Receipt: Work authored on `codex/valeska-article-rewrites` in `E:/REPOS/AvantiComplex Projects/.agent-worktrees/Avanti AI Innovators-codex-rewrite-valeska-evolution-articles-23-32-t`. See `E:/REPOS/AvantiComplex Projects/Avanti AI Innovators/docs/valeska-rewrite-verification-2026-09-13.md` after integration. Existing unrelated untracked files remain untouched.
- Next: The short-post rewrite backlog through article 32 is cleared. Any subsequent article must follow the existing chronology, evidence, length, artwork, and translation rules; no later batch was started. Existing artwork was preserved (source ratios roughly 2.80–2.92:1; the 3.5:1 target was not regenerated in this text task).
- Decision: Human Expressive Control Ledger selection `c40910f3-321b-4c42-b77e-b53fd7a986ba`, project `avanti-ai-innovators`, holding placeholder `cmha-tbd`.

### Checkpoint 2026-09-13 20:30 - VALESKA evolution rewrite
- Done: Published and locally rebuilt VALESKA evolution articles 23–32 with their images and localized records; commits `aa912de` and `66b1bc9` contain those batches. The site build and HTTP/agent checks passed when each batch was published.
- Next: Rewrite articles 23–27 (May 13–31, 2026), then articles 28–32 (June 4–10, 2026) to 500–800 visible English words each. Update the Spanish and Portuguese renditions against each final English revision; save individually, rebuild Docker, run site checks, and inspect served pages before publishing more articles.
- State: branch `codex/visual-agent-upgrade`; uncommitted workflow correction in `E:/REPOS/AvantiComplex Projects/Avanti AI Innovators/docs/blog-publication-workflow.md` requires each English article to be 500–800 visible words before publication.

### Resume rules
- Article chronology is authoritative: date articles by the event or outcome date. An outcome comes after intervening experiments and links back to the earlier relevant post.
- Each article needs a distinct claim, evidence record, working question, and next test. Combine adjacent dates only when they form one coherent conclusion.
- Keep contemporaneous voice. Do not write retrospective titles or imply knowledge that had not been established on the article date.
- Use **boundary** only for a real technical or organizational limit. Use **concrete** only when contrasting implementation with abstraction. Prefer precise words such as scope, separation, contract, guardrail, operational, testable, inspectable, or governed.
- Every article has distinct native ultra-wide (target 3.5:1) artwork in the established naturalist high-tech oil-painting style. Existing May assets are under `public/images/articles/valeska-*.webp`.
- Spanish and Portuguese versions are published only after their English source is final. Translate the complete title, description, body, alt text, and historical basis; increment `source_revision` consistently and save EN before ES/PT.
- Do not publish a new batch until the prior short posts have been rewritten.
- Record every Dave-directed product/editorial decision using `E:/REPOS/Hermes-Agent-Resurrection/scripts/selection.py` with project `avanti-ai-innovators`; holding is `cmha-tbd`. End every work session with one Valeska dispatch.


# Checkpoints

## Checkpoint Log

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


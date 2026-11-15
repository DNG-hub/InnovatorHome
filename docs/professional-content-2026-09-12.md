# Professional website content review

Dave directed the site to support his personal LinkedIn profile and reflect his résumé. Approved visual design retained. Email monitoring remains stopped.

## Sources

- Canonical résumé: `Z:/David_Gargan_Resume_2026_AI.pdf`, including the September 9 creative portfolio additions. Copied unchanged to the website download; SHA-256 `8036C47D62E6F043B253458F3227914EF562A8DFF8ABFFA45866A5C1D0C07BBB`.
- Verified LinkedIn update record: `Z:/Personal Management/linkedin-resume-update-2026-09-09.md`.
- Personal profile: https://www.linkedin.com/in/davebrzl/. A fresh public fetch was blocked by LinkedIn; this revision relies on the verified September 9 record and résumé, not a claimed fresh profile audit.
- Dave's explicit organization clarification: Avanti AI Innovators and StoryLab are separate entities within AvantiComplex. No legal ownership inferred from the repository's placeholder holding.

## Delivered locally

- Home: David Gargan, principal AI systems architecture, enterprise background, RAG and multi-agent systems.
- Experience: career summary, selected organizations and dates, technical focus, education and languages.
- Selected projects: résumé-grounded VALESKA, Commons, DaveRouter, applied vision, and separate StoryLab links. No invented metrics or claims of commercial availability.
- Résumé and personal LinkedIn links on home, experience and contact pages, also exposed in agent Markdown. English PDF clearly identified in each language.
- English, Spanish and Portuguese copy stored in the local content database with revision history. `content/profile.mjs` supplies the initial localized adaptation. `node scripts/content.mjs profile-preview` reapplies those selected pages; it intentionally overwrites their local copy and is not a routine deployment step.

## Review before public release

- Dave should review the narrative and translated wording, and identify any newer résumé/profile changes.
- Project summaries are not yet detailed case studies with demo evidence or independently verified outcomes.
- Master résumé and LinkedIn remain owned by Personal Management. Neither was edited. LinkedIn company page remains on hold.
- Existing public DNS and hosting were not changed. The site is only at http://127.0.0.1:3204/en/.

## Validation

Astro type check/build passed with zero errors or warnings. Existing multilingual HTTP and agent endpoint checks passed. Downloaded résumé source and website copy have matching hashes. PDF response verified separately. Visual review of the local homepage performed.

HECL selection: `c8110acb-0846-4d74-a2c2-e2d93d3d76e2`, project `avanti-ai-innovators`, placeholder holding `cmha-tbd`.

## Superseding review: practice positioning

Dave clarified that the site should advertise his architectural practice, not read as a job application. Removed the PDF from public assets, all download links and agent references, résumé headings, recruiting language, and employment-date formatting in the experience narrative. Retained the sourced career facts as evidence of professional capability in EN/ES/PT. The canonical résumé remains untouched in Personal Management. The original delivery description above is historical and superseded by this review. HECL: 8573f10a-5078-46b4-a04b-2a3800cb885e.

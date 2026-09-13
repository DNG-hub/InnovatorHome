# Consulting and topic design — September 12, 2026

Dave directed solution-scale ExO consulting copy, removal of first-person wording from Selected projects, and an illustrated topic-based blog inspired by Landscape.

## Consulting sources and adaptation

Read-only sources: VVH `exo-reference/README.md`, current V13 10X Shift workbook, ExO toolkit Algorithms, Experimentation and Interfaces, Anti-patterns, and VVH implementation-plan context. Licensed references remain in VVH and are not copied here.

Original EN/ES/PT copy applies purpose, workflow decomposition, reusable resources, experimentation, bounded action, measurement and learning to one solution. Evaluation, activity records, feasible rollback and human exception handling are explicit. No organizational readiness scores, certification, endorsement or guaranteed 10x/90-day results are claimed.

## Blog topics and images

Landscape's CONTENT_AND_IMAGES guide and TopicHeader/BlogFeed components informed the sidebar, stable topic image and separate article-cover design. Its vegetable-header painting provided a visual reference. No Landscape files were modified or reused as site assets.

The original site used database categories and recent-post navigation. Its legacy database lookup was unavailable. Initial topic names are provisional: AI Architecture, Knowledge & Memory, Agents & Automation. Dave was asked which original names to retain. There are no published articles in the current database; the site shows empty states rather than fabricated posts.

Localized topics are stored in each blog page's database `data.topics`, with stable id, title, description, image and motif. `content/topics.mjs` supplies initial preview values. Articles use `data.topic` for a stable topic id, `data.coverImage` for a local image path and `data.coverAlt` for translated alt text. Existing category labels remain supported. Article cards and detail pages use the article cover, falling back to the topic illustration when absent.

For every new article, create a distinct illustration of its subject using the topic's palette, medium and motif. Architecture: bridges/structures. Knowledge: library/tree branches. Automation: waterwheels/channels. Shared art direction: textured oil-painting brushwork, sage, slate teal, ochre and ivory; no embedded lettering. Three original topic illustrations were generated and optimized to WebP (155–259 KB each). Article-specific illustrations await actual articles.

Local preview only. Build and existing HTTP/unit suites passed; all nine localized topic routes and English first-person removal checked. HECL selections: 1d4abaeb-994d-4e2a-b4e2-922d8f1d3d29 and 30050dd7-ca91-4316-86fc-3249539bcb8a. Holding cmha-tbd remains an administrative placeholder.

## Dave's topic refinement

Dave replaced the provisional categories with VALESKA, Multi-agent Systems (DaveRouter and Commons), and StoryTeller (technical architecture of visual storytelling). HECL: 537feb04-2882-45c3-b80f-5028d5f706c4. Updated topic ids and all three translations; old category URLs redirect to the replacements. StoryTeller now has original storyboard/camera artwork in the shared painterly style. These are topic definitions, not newly published articles.

Editorial scope: VALESKA articles cover governed knowledge, retrieval, provenance, permissions and memory. Multi-agent articles distinguish Commons coordination/shared decisions from DaveRouter execution. StoryTeller articles cover story/scene models and narrative-to-visual generation architecture for technical buyers; creative canon and production articles remain on StoryLab. Read-only grounding: VALESKA README, Commons API README and shared contract, StoryTeller README. Avoid carrying historical model names, savings claims or completion claims from those READMEs into future articles without current verification.

## Futuristic painting revision
Dave confirmed impasto and requested high-tech futuristic scenes across four painting styles. The implementation assigns naturalism to VALESKA, impressionism to DaveRouter, cubism to Commons and palette-knife impasto to StoryTeller. Multi-agent Systems retains one topic with two labeled paintings. Topic metadata stores the motifs for future article covers; data.project=commons selects the Commons fallback cover. Four new optimized WebP assets replace the pastoral scenes in the UI; originals are preserved. Build and site HTTP checks passed, and the updated cards were visually inspected. HECL cb82d05d-67aa-404c-99b3-987249746e8e. Local preview only.


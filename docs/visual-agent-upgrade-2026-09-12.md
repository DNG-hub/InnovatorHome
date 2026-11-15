# Visual and agent interface upgrade

## Delivered

Local preview: http://127.0.0.1:3204/en/ (also /es/ and /pt/).
The cinematic navy/cyan hero, dimensional art, stronger typography, service cards,
and interior headings replace the austere first migration design. Responsive AVIF
hero variants are approximately 11–45 KB; WebP fallback variants approximately
21–93 KB. Original decorative source: `src/assets/connected-systems.png` (1.8 MB).
These are file sizes, not measured page loading times. Reduced-motion preferences
are respected; no client framework or animation library was added.

PostgreSQL remains the editorial source for articles and static translations.
The reviewed publication export supplies both the HTML build and read-only API.
The serving container has no database credentials. Rebuilding/redeploying the
local container is required after publishing content. There is no direct public
database access, automatic English fallback, or transactional endpoint.

Public interface:

- `/llms.txt`: discovery guide (advisory convention, not guaranteed agent adoption).
- `/openapi.json`: API description.
- `/api/v1/catalog`: supported languages, capabilities, human contact, no actions.
- `/api/v1/content?lang=pt&q=integracao`: bounded keyword search and pagination.
- `/api/v1/content/consulting?lang=es`: exact published translation.
- `/agent/en/home.md`: Markdown alternatives for every published page/article.
- HTML alternate links, structured WebPage/BlogPosting metadata and sitemap.

Only GET/HEAD are accepted. Publication filters exclude drafts, unreviewed and
future content. Internal data is not returned. Incoming query parameters are
validated; unknown/repeated parameters fail. Search is intentionally simple
keyword matching over the publication snapshot, not semantic search or MCP.
The API is stateless and currently has no application rate limiter; set edge
rate rules when making it public. Text is content, never an agent instruction
or permission to book, quote, sign, pay, or bind either party.

## Cloudflare findings (official documentation checked September 12, 2026)

Websites becoming obsolete is a forecast. Agents may change discovery and some
transactions, but a human-readable site remains useful for evaluation, trust,
accessibility and accountability. The practical choice is one authoritative
content source with human and machine interfaces, without promising placement
in agent answers.

- [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)
  converts HTML when enabled on a supported zone and requested with
  `Accept: text/markdown`. Merely using Cloudflare DNS does not enable it.
  Our explicit Markdown URLs work independently. Cloudflare honors the origin
  Content-Signal; its absent-signal default includes `ai-train=yes, search=yes,
  ai-input=yes`. Dave's AI training/content-use choice remains unresolved; no
  policy was silently selected by this implementation.
- [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/)
  monitors and controls crawler traffic passing through Cloudflare. This is
  distinct from indexing, search visibility and permission to transact.
- [AI Search website source](https://developers.cloudflare.com/ai-search/configuration/data-source/website/)
  can index the public domain after an instance/source is configured. Its
  [MCP search endpoint](https://developers.cloudflare.com/ai-search/api/search/mcp/)
  requires enablement and exposes search; it does not invent business actions.
  Default [index synchronization](https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/)
  is periodic, not guaranteed instant publication.
- [Agent Readiness](https://blog.cloudflare.com/agent-readiness/) is diagnostic.
  [WebMCP](https://blog.cloudflare.com/webmcp/) is an early bridge for exposed
  capabilities; neither supplies consulting prices or negotiation rules.
- Real actions require implemented [tools](https://developers.cloudflare.com/agents/concepts/tools/)
  and suitable [authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/).
  A future scoped inquiry or appointment request could come first. Binding
  offers, contracts and payments need explicit business rules, authentication,
  consent, audit records and human approval boundaries before implementation.

No Cloudflare account configuration was inspected or changed. Before public
launch verify zone plan/proxy status, bot/WAF behavior, content-use signals,
production canonical URL, crawler policy, and optional AI Search source/MCP
endpoint. The preview remains loopback-only and robots-disallowed; production
discovery is intentionally not active. Do not publish or attach a tunnel as
part of this local upgrade. Existing seed wording/translations remain local
review material; no invented case studies or new professional claims added.

## Validation and continuity

Run `npm test`, `npm run build`, then `docker compose build web`,
`docker compose up -d web`, and `npm run test:site`. The HTTP suite checks all
21 public translations in JSON and Markdown as well as existing visual routes,
assets, redirects, security headers, method restrictions and cache validation.
Build diagnostics: zero errors/warnings/hints. Browser visual QA was not run.

Dave's directive recorded in Valeska HECL selection
`545c2447-8313-492a-92d0-abd30ea26284`, project `avanti-ai-innovators`, holding
`cmha-tbd` (placeholder, not verified legal ownership).

## Generated artwork provenance

Generated once using built-in ImageGen; visually inspected before integration.
Decorative concept art, not evidence of an actual system or client project.
Final source path: `src/assets/connected-systems.png`.

Exact generation prompt:

```text
Use case: stylized-concept
Asset type: premium enterprise AI architecture website hero artwork
Primary request: Create a cinematic sculptural composition of luminous flowing glass and fiber conduits joining a precisely machined dark architectural core, visually suggesting connected intelligent systems.
Scene/backdrop: deep navy-black seamless atmospheric backdrop with substantial clean negative space.
Subject: an abstract, tangible architectural sculpture made of translucent flowing conduits converging into a precisely engineered dark core; no literal technology icons.
Style/medium: premium stylized 3D concept art, sophisticated and restrained, suitable for an elite enterprise consultancy website.
Composition/framing: wide landscape 16:9; place the entire focal sculpture on the right half; keep the left half clean, calm, deep navy negative space suitable for HTML typography; strong depth and elegant dimensional layering.
Lighting/mood: cinematic studio lighting, cyan and teal internal glow, restrained amber glint, controlled highlights, refined shadows, confident and sophisticated.
Color palette: navy-black, cyan, teal, charcoal, with only a subtle restrained amber accent.
Materials/textures: luminous glass, fine optical fibers, precisely machined dark metal and architectural surfaces, pristine premium finish.
Text (verbatim): ""
Constraints: art only; the left half must remain visually quiet and uncluttered; this is stylized artwork and must not imply actual system evidence.
Avoid: all text, letters, numbers, typography, logos, watermarks, people, faces, robot faces, brains, UI, interface panels, fake dashboards, charts, screens, literal circuit-board diagrams, clutter.
```

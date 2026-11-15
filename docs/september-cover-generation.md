# September cover generation

## Origin and scope

Five cover assets for articles 43, 45, 46, 47 and 48 were generated locally on
Stable using its existing SwarmUI service at `127.0.0.1:7801` and already-running
ComfyUI backend 0. The model was
`juggernautXL_juggXIByRundiffusion.safetensors` (SDXL).

These are new local Swarm generations, **not the unspecified earlier Codex image
backend**. The existing Valeska artwork and `docs/blog-art-direction.md` informed
the visual target; the reference image was not supplied as an img2img input.
Exact reference-style matching is not established. No article bodies were sent
to outside generation services. No services were installed, enabled, restarted
or reconfigured. Assets are packaged in this worktree only; nothing was published.
Article content and its JSON files were not edited by this artwork task.

## Generation passes

1. **v1:** Five independent text-to-image originals, 1792x512, 30 steps, CFG 6,
   `dpmpp_2m`, `karras`. Coherent teal/amber scientific objects and spaces, but
   often smooth and render-like rather than richly brushed oil painting.
2. **v2:** Five independent text-to-image alternatives, 32 steps, CFG 7, stronger
   weighted impasto prompts. More obviously painterly, but lost important subject
   objects or became abstract. None selected or used as an img2img source.
3. **v3:** Exactly five final img2img jobs from the respective **v1** original
   PNGs, 50 configured steps, CFG 6, `dpmpp_2m`, `karras`, denoise 0.4. The running
   service's `ListT2IParams` schema confirmed `initimage` (image) and
   `initimagecreativity` (decimal denoising strength); its frontend submits these
   fields to the generation API. PNG data URLs were submitted as `initimage`.
   Swarm describes denoise as the fraction of configured steps actually run, so
   50 configured steps at 0.4 nominally means 20 diffusion steps. All five jobs
   completed with original PNG dimensions verified at 1792x512.

The v3 style prompt was: "Naturalist oil painting on canvas, visible brush
strokes, painterly atmospheric editorial concept art, navy teal amber ivory."
Short descriptions of the visible v1 objects followed it. The new images retained
composition well, but the increase in painterliness was modest, not a definitive
solution to the reference-style mismatch.

## Selection and alt text

All five v3 originals were opened for visual comparison with the previously viewed
v1 images. Selection favored coherent physical contents over newness or stronger
texture alone. These descriptions are literal English alt-text recommendations
for the parent to localize; they do not assert invisible conceptual relationships.

| Article | Selected | Asset | Alt description |
| --- | --- | --- | --- |
| 43 | v1 | `public/images/articles/valeska-evolution-43.webp` | An open book on an ivory bench, surrounded by brass measuring instruments, glass vessels and golden branches against a dark teal background. |
| 45 | v1 | `public/images/articles/valeska-evolution-45.webp` | Teal-backed archive cabinets filled with small objects, brass inspection ladders and a central glass-topped display case. |
| 46 | v3 from v1 | `public/images/articles/valeska-evolution-46.webp` | A warmly illuminated tree enclosed in a glass dome on a rocky coast, overlooking dark water and a distant shoreline. |
| 47 | v1 | `public/images/articles/valeska-evolution-47.webp` | Glass-partitioned rooms with ivory platforms, long brass pipes and smaller fittings against teal and amber walls. |
| 48 | v3 from v1 | `public/images/articles/valeska-evolution-48.webp` | A paper on a wooden tray between brass instruments, an unlit glass bulb and a glowing round lamp on an ivory bench. |

For 43, v1 retains simpler specimen-like objects on the book; v3 introduced extra
vessel-like objects without a clear benefit. For 45, the original archive layout
remains coherent and v3 offers no decisive improvement. For 46, v3 retains the
dome/tree while slightly softening the rocks and natural forms. For 47, v1 has
simpler fittings; v3 adds ambiguous marks without clarifying the routes. For 48,
v3 preserves the document and light contrast with more legible lamp construction.

## Limitations

- The selected set is still smoother and simpler than the reference artwork.
- 43 has tiny text-like marks on the book; labeled-reference testing is not explicit.
- 45 does not clearly depict a survey map, measuring tools or an intake gate.
- 46 conveys an isolated glass enclosure, not a demonstrably functional knowledge
  system; no explicit disconnected cable or substantial distant city is shown.
- 47 does not establish two independent query routes, inherited permissions or
  locks. A long pipe visually crosses the partitions. Do not describe security
  guarantees in its alt text.
- 48 does not visibly establish evidence attachment, a sealed completion receipt,
  repair history or verified success. The document has faint text-like marks.

## Packaging and records

All final files are native **1792x512, 3.5:1**, with no crop or resize. ImageMagick
7.1.2-29 converted the selected originals to RGB/sRGB WebP with no alpha,
**quality 84 and method 6**. Embedded metadata was stripped; provenance is retained
in the sidecar instead. Decoded dimensions and color channels were verified.

Equivalent conversion:

```bash
magick SOURCE.png -colorspace sRGB -alpha off -type TrueColor -strip \
  -quality 84 -define webp:method=6 DESTINATION.webp
```

`docs/september-cover-generation.yaml` is the machine-readable provenance sidecar
(YAML 1.2 using JSON flow syntax). It records full prompts/settings for all three
passes, seeds, source versions, selection reasons, English alt descriptions,
Stable original URL paths, original/output SHA-256 hashes, conversion settings
and the observed img2img parameter schema. Existing article JSON is untouched.

All fifteen original PNGs remain under `/tmp/opencode/`, with names
`article-ID-swarm-original.png`, `article-ID-swarm-v2-original.png` and
`article-ID-swarm-v3-original.png`. Their corresponding Stable original paths are
recorded in the sidecar. Scratch files are not a permanent repository archive.
The generation runner and packaging runner remain in `/tmp/opencode/`.

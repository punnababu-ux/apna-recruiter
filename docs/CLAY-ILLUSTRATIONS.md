# 3D clay illustrations

The warm, human side of the marketing pages: handmade-looking plasticine
objects in the brand palette. Every one is generated from **the same style
block**, so the set reads as one family.

- **Live reference:** `/design-system/foundations/clay` — the whole set, the
  rules, and copy-ready prompts.
- **The prompt's single source:** `src/content/clay-style.ts`. Change the
  style there, once; the docs page reads it.
- **In code:** `ValueArt` (`src/components/marketing/value-art.tsx`), files
  in `public/images/company/values/<name>.png`, listed in `READY`.

## The prompt

A prompt is three parts, in this order:

1. **Opening line** (always the same):
   `A single 3D clay object, centred, three-quarter view from slightly above.`
2. **Subject** — one or two sentences you write: the object, one or two
   details that carry the meaning, then each part's colour.
   `Subject: a rounded clay [object] with [details]. [Colour] [part], [colour] [part], a [deep plum / warm yellow] [accent].`
3. **Style block** (always the same, word for word) — copy it from
   `CLAY_STYLE` in `src/content/clay-style.ts` or the docs page. It fixes the
   surface (smooth matte clay, fingerprint-free), the light (soft, top left,
   contact shadow), the palette, the grey background (`#E9E9EC`), square 1:1
   with the object filling ~70%, and **no text, no logos, no people**.

**Palette:** apna brand green `#1F8268` and mint `#9DE2C9`, sky blue, warm
yellow, warm off-white, a touch of deep plum `#4E3A52`. Nothing else.

**Worked subjects** (the existing set was made from these):

| File | Subject |
|---|---|
| employer-branding | a rounded clay award rosette / ribbon badge with a blank shield in the centre, standing on a small pedestal. Warm yellow ribbon, deep plum shield, off-white pedestal. |
| team-management | three rounded clay ID badges on lanyards, fanned out and overlapping, each with a simple blank avatar circle. Mint, sky blue and off-white badges, deep plum lanyards. |
| ats-integrations | two chunky rounded clay puzzle pieces clicking together, with a small plug-and-socket detail. Sky blue and mint pieces, a warm yellow plug. |
| reports | a rounded clay clipboard holding a simple bar chart, with a small download arrow badge at the corner. Off-white clipboard, mint and sky blue bars, a deep plum arrow badge. |
| power-features | a chunky clay lightning bolt bursting out of a rounded clay rocket-booster ring. Warm yellow bolt, mint ring, deep plum accents. |
| dedicated-support | a rounded clay headset with a small speech bubble beside it. Deep plum headset, mint ear cushions, a sky blue bubble. |
| smart-inbound | a rounded clay inbox tray with three small profile cards dropping into it from above. Sky blue tray, off-white cards, mint and warm yellow avatar dots. |
| database-search | a chunky clay magnifier over a short stack of rounded database discs, with a tiny sparkle on the lens. Deep plum magnifier, mint and sky blue discs, a warm yellow sparkle. |
| walk-ins | a rounded clay calendar page with a check mark, and a small clay footprint pair walking toward it. Off-white calendar, a mint check, warm yellow footprints, a deep plum binding. |
| enterprise | a small modern office tower with three stacked, gently rounded floors, a soft green glass band wrapping each floor, and a tiny flag of three connected people icons on the roof … two little rounded blocks like building bricks beside its base. |

**The one text exception:** an object that *is* a document (the Gen Z
playbook's book cover). Spell the text out exactly, line by line, say nothing
else may appear, drop "no text" from the style block for that one, and check
the spelling on every render.

## Rules

- One object per picture, one idea per object. Never a scene.
- Marketing and company pages only, on a gradient or a frosted card. Not in
  the product's working screens.
- Never: text or numbers on the object (the exception above aside — an early
  batch came back with file names engraved), glossy / metallic / gradient
  surfaces, colours outside the palette, people or hands, other 3D or flat
  illustration styles on the same page.

## Getting one into the product

1. Generate 3–4 per subject; pick the cleanest silhouette (it must read at
   ~200px).
2. Put the picks in the clay Figma file `R5vLmJRvUuzgHNOr1abmHA`.
3. Cut out the grey backdrop:
   `scripts/clay-cutout.py in.png out.png [near] [hole] [close]` (defaults
   9/6/0; near-white objects e.g. `6 4 18`). Check it on a coloured
   background. Never cut out an image that is already transparent.
4. Resize to 640×640, save as `public/images/company/values/<name>.png`, add
   the name to `READY` in `value-art.tsx`. Served `unoptimized` (re-encoding
   smears the cut edge).
5. If it's a new subject, add it to `CLAY_EXAMPLES` in
   `src/content/clay-style.ts` so the set's prompts stay together.

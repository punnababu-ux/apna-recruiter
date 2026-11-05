---
name: figma-code-sync
description: Keep the Figma design system ("Apna Recruiter — Design System", f8O8wKTD4EdBvFj7h5ilev) 1:1 with the code — text colour, size, weight, line height, tokens, chip placement. Use when Punna asks to check, audit, sync or fix Figma against code (or code against Figma), says "Figma looks different", builds or edits a Figma component or hand-off screen, or after a design change in code that Figma must follow.
---

# Figma ↔ code sync

**Code is the truth.** Read values from the *rendered page* (computed
styles), not from Tailwind classes or memory: a class can be overridden by a
parent, a size variant, or a product className. Fix Figma at the **main
component** first; fix screen instances only for per-state overrides.

Progress and history live in `docs/FIGMA-SYNC-STATUS.md`. Read its
"RESUME HERE" section first and update it after every step.

## Workflow (what worked, 2026-11-04 audit)

1. **Split the work** (AGENTS.md "Working rules"): Sonnet subagents do the
   captures; Opus diffs, decides and fixes.
2. **Code side** — dev server (`preview_start apna-recruiter-dev`), mock
   session in localStorage: `apnahire:session` =
   `{"kind":"phone","phone":"9999999999"}`, `apnahire:pricing-phase` =
   `today` (the hand-off shows today's pricing). States: the hidden
   "Preview settings" gear, `apna:extra-off-deadline` (10% offer),
   `apnahire:job-credits`. Run `extract.js` (this folder) per state; for a
   pop-up set `window.__root='[role=dialog],[data-slot=sheet-content]'`
   first, or the page behind leaks in. Store it once as
   `localStorage.__x` and `eval` it, to save context. Phone 375×812,
   desktop 1440×900. Close the gear popover before a capture.
3. **Figma side** — `figma-dump.js` (this folder) on page
   "Checkout — dev hand-off" (441:2): `text | size weight | token ~hex | id
   | component`. Return small batches (2–4 frames); big copies trip the
   API safety filter.
4. **Diff** — `diff.py <dir>` on `figma/all.txt` + `code/all.txt`. It
   groups mismatches by component. For a few screens, it's cheaper to embed
   compact code rows in a `use_figma` script and diff inside Figma,
   returning only the mismatches.
5. **Triage every hit before fixing.** False positives seen:
   - same text in two roles (price vs struck price; tab label vs tab card
     title; a pop-up tile vs the page row behind it);
   - different *state* or copy (offer applied in code, not in Figma);
   - near-identical tokens (`#09090b` foreground vs `#18181b`
     surface-checkout-hero-fg): still fix, the token is what counts.
6. **Fix, then screenshot** the tallest screen of the set, check nothing
   clips, and check that CTAs and prices still line up.

## Rules learned (don't repeat these bugs)

- **Every text uses a text style.** Change the style, never fontSize or
  fontWeight by hand; set the style last (fontName after it detaches it).
  New size? Create the style first (e.g. `Label/MD Bold`, `Body/XS Loose`
  12/20, `Price/Total MD` 18 bold) with a description of where it's used.
- **Button label per size = code `button.tsx`**: every size semibold —
  xs/sm 12, default 14, lg 16, xl 16, `card` 14 at 40px (the desktop plan
  CTA: lg instance + Label/MD override). Links semibold too.
- **Compare against the latest main, not your branch.** Fetch and rebase
  before the audit: another session can change code the same day (button
  weights changed on main mid-audit, and a stale branch reverted them in
  Figma). Re-check `git log origin/main` before any bulk Figma change.
- **Plan feature sub-points (desktop PricingCard)**: 12/20,
  **muted-foreground**; not-included (✕ / Icon/Close) muted at **60%**.
  Phone feature lines: 12 foreground.
- **Self-checkout surfaces use the hero tokens**, not foreground/muted:
  panel headings `surface-checkout-hero-fg`, subtitles `-secondary` or
  `-muted`, the Jobs-tab Unlimited card text on hero-fg / hero-fg-muted.
  Only the subtitle "For continuous hiring" stays muted-foreground.
- **Pop-up titles 20** (H4), lead line per AGENTS.md; footer buttons lg.
- **Prices**: express phone job price 20 (Plan/Price compact); credit-pack
  phone rows 18; offer-claimed Unlimited phone card 18; desktop 24.
  An upsell header's was-price and its unit: white at 70%.
- **Context changes the size.** The same component can differ by place
  (PricingCard subtitle 14 price-first / 12 price-last; phone "Order
  summary" title 20 vs plans title 18). Check every place a component is
  used, not one.
- **Mass edits must not over-match.** After changing a main component, the
  instances' inherited values look like overrides. Pick the target by
  structure (the ✕ icon, the node name, the frame), never by its current
  colour. Scope by frame. Exclude the page behind a sheet, and re-check
  what changed (S9 pack names were hit once by a loose regex).
- **Absolute chips anchor to the edge code uses.** Code `absolute top-0
  right-0` → Figma constraint **MAX** with right offset 0. A MIN-pinned
  chip drifts when its text style changes width ("Special upgrade offer",
  "8 MONTHS FREE"). After any text-style change, scan ABSOLUTE nodes for
  a right gap that isn't 0 (and a left gap that isn't 0 on left ribbons).
- **Line height is part of the style.** Taller lines in fixed-height cards
  can clip: screenshot the tallest card row after.
- Copy-level fixes go in code, not Figma: a phrase that must not split
  gets non-breaking hyphens (U+2011, "hard‑to‑fill"), and a long meta line
  may wrap beside a wide price column rather than run under it.

## Rules learned, round 3 (2026-11-05: tabs, new screens)

- **Tabs: one colour per state for text, icon and logo.** Selected: green
  `checkout-primary` on text and icon. Not selected: phone sticky bar and
  desktop docked bar are `foreground` at 60%, 14 medium; the desktop hero tabs
  are `surface-checkout-hero-fg-secondary` (titles 18 semibold, subtitles
  12). Selected label: 14 bold (Label/MD Bold) on the phone and docked bars,
  18 semibold green on the hero. Read the rendered colour of the svg as well
  as the label: they must match.
- **"The sticky tabs on mobile"** means `SelfCheckoutTabs/phone` (305:111),
  the Base UI Tabs `checkout` variant inside the header. It is not the
  SegmentedTabSwitcher chip row; check which one docks by scrolling the page
  and reading the `fixed`/`sticky` ancestor.
- **Logos keep their colour in vector-network regions.** LogoApnaUnlimited
  (126:5) ignored instance fill overrides until its region fills were
  cleared on the main (`setVectorNetworkAsync` with regions minus `fills`).
  Instances can't take vector-data overrides. If a recolour "does nothing",
  check `vectorNetwork.regions[].fills`.
- **Repaint icons by structure.** Walk every non-text shape inside each tab
  frame (fills and strokes), with `skipInvisibleInstanceChildren=false`.
  Picking only `VECTOR` nodes by name misses glyphs.
- **New hand-off screens: clone the nearest sibling screen**, not a blank
  frame. D-P1 came from D-P4 (scrim + centred dialog), and the phone success
  from the desktop one (390×844, card 358). Measure the live dialog in the
  pop-ups demo (`/design-system/product/pop-ups`) for padding and gaps. Put a
  `state:` label above each new screen, and never place frames over the
  section's other rows (check `maxY` first).
- **A screen the code doesn't have: ask first.** Payment failure had no page
  (it reopened the order summary). Punna chose "design it", then "build it":
  design in Figma first, then code, then make the two match. Decide phone
  button stacking at 320px in code, and mirror it in Figma. You can't move
  children inside an instance, so swap the two buttons' main components.
- **Clays come from the design system, never from Figma.** Use the
  ValueArt names (`public/images/company/values/*.png`): success, alert,
  expired, restricted, wallet. Don't download or screenshot Figma clay
  images to install them. Figma re-encodes uploads, so hashes won't match.
  When a Figma clay has no file in the repo, ask which DS clay to use.
  Current picks: payment success `success`, payment failed `alert`, coupon
  expired `expired`, self-checkout leave reasons `restricted`.

## Plugin API gotchas

See `docs/FIGMA-SYNC-STATUS.md` → "Gotchas learned". The ones that bit
most: `setBoundVariableForPaint` drops opacity (set it on the returned
paint); bind with the resolved value as the fallback colour;
`figma.skipInvisibleInstanceChildren=false` to find hidden rows; load every
font before touching text (`getStyledTextSegments(['fontName'])`);
`fontSize`/`fills` can be `figma.mixed`, so guard before string concat.

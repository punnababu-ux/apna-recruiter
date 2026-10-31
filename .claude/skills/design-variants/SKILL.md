---
name: design-variants
description: Run any screen through Sumit's design review (Punna's manager) and ship the ideas as switchable versions with a side-by-side 2x phone comparison. Use when Punna asks for a new version or variant of a screen ("make a version where…", "in V11, …", "compare versions"), asks "what would Sumit say", relays feedback from Sumit, or before showing any design change.
---

# Design variants, through Sumit's lens

Sumit is Punna's manager. Two long rounds of his feedback shaped the phone
checkouts: express V11 and self-checkout V14 (2026-10-30), specified in full
in `docs/SESSION-2026-10-30-CHECKOUT.md` ("Where it landed"). Those two
screens are the reference for what "good" looks like to him. This skill:

1. reviews a screen with his lenses,
2. ships each idea as its own version,
3. compares versions on one page at phone size,
4. keeps the context file current.

When Punna relays new feedback from Sumit, add it to the lenses here.

## 1. Sumit's lenses

Write one line per lens for the screen under review: holds / fails, and the
fix. Turn the fixes into proposed versions; never apply them silently.

**Words**
1. **Let the icon speak; cut words it already says.** WhatsApp icon →
   "Alerts to candidates". Infinity icon → "Job reposts and swapping", not
   "Free…" / "Unlimited…". Shield icon → "Trusted by…" needs no "for
   hiring".
2. **Numbers over adjectives.** "Basic / Higher / Maximum visibility" →
   "1x / 2x / 4x visibility, for …". Say how much better.
3. **Plain, short copy, in the user's words.** "How job credits work", "Buy a
   single job credit", "1 job live at a time", "Unlimited jobs for 1 month",
   "&" over "and" in a tagline. One idea per line.
4. **Don't sell what the page doesn't sell.** No "Dynamic visibility" on a
   page with no visibility; no reposts line when it adds nothing.
5. **Remove noise once a direction is chosen.** Struck prices, % OFF pills,
   offer notes, extra lines above the content: drop them when they don't
   help the decision. A title can carry a fact ("Active for 15 days" in the
   panel header) instead of its own line.

**Icons and colour**
6. **One meaning per icon, one colour per feature.** Visibility = ticks
   (tick / double / tick with trails), green. WhatsApp green, urgent
   orange, top placement blue, secondary facts gray (database credits). A
   new feature that needs its own hue gets a new semantic token (violet,
   `--feature-violet`), never a shared colour or a primitive.
7. **Keep a familiar metaphor over a clever one.** Antenna bars were tried
   for visibility and replaced by the ticks people already read.
8. **One stroke weight.** Custom glyphs match the line icons beside them
   (24 grid, 2px round strokes); text used as an icon is medium weight.
9. **Optical alignment.** Icons centred on their text line; size the box to
   the drawn shape.

**Structure and spacing**
10. **Group one decision in one frame.** Related choices (the three job
    types, the three credit packs) sit in one panel with a header: icon +
    title left, a small fact right, on ONE line. Actions about the group
    (how it works, buy a single one) go inside the frame, under the cards.
11. **Frames that sit together are the same shape.** Same inset, same
    header room (16px above, 24px row, 12px under), same corner. Measure
    both in the DOM before answering "are they the same?".
12. **One spacing rhythm.** Frame inset = gap between cards = gap between
    sections (12px on the checkouts). Increase only where Punna asks.
13. **Concentric corners.** Outer radius = inner radius + inset
    (`rounded-frame` = card-nested + 12px). Nested cards use
    `rounded-card-nested`.
14. **Mark the recommended choice once.** The tab marks it; a second border
    is noise inside a frame.
15. **Same thing, same styling, both flows.** When one checkout is
    finalized, port its structure to the other, keeping only the
    differences the page needs.
15a. **Points nest under the fact they belong to** (2026-10-31). A sub-point
    sits under its parent only when it is part of that fact: WhatsApp alerts
    under "Dynamic visibility"; reposts & swapping and database credits
    under "1 job live at a time". A limit (the city) is its own plain line
    at the end: "This plan is valid in a single city". Never nest a fact
    under a feature it doesn't explain.
15b. **An applied offer shows what it saves** (2026-10-31). When the extra
    10% is applied, show the struck price on every card, desktop too, even
    in a version that hides struck prices otherwise.

**Interaction**
16. **Motion is continuous or it's absent.** A swap (fade one out, fade the
    other in) is wrong; a moving element must travel with the gesture.
    If the effect doesn't earn its place, Sumit prefers the static state
    (the collapsing large title was removed).
17. **Explanations open as bottom sheets on phones**, reusing the screen's
    own cards (read-only, no tap feedback) instead of a different
    component.
18. **Familiar controls.** Underline tabs over custom chips; a scrolling tab
    row keeps its padding inside the scroll (starts 16px in, can scroll
    off the edge, every tab reachable at 320px).

## 2. Every idea is a new version

- Checkouts: `useCheckoutVersion` / `versionAtLeast` in
  `src/hooks/use-checkout-version.ts` (memory: project-checkout-versions).
  Add `vN` with a label, a header-comment line and its `LINEAGE` (build on
  the version Punna names; if none, the latest finalized one).
- When Punna says "in V11, …", change V11 itself (and everything built on
  it); don't spin a new version. "Try X" on a direction that may be
  rejected → a new version (V12 blue pulse beside V11 violet).
- Never change another version's look. A change shared by several
  versions gets a helper (`lineTabs()`), not copied conditions.
- Other screens: a URL flag or hook, the old look one switch away (memory:
  feedback-experiments-preview-only).
- Messages arrive mid-task: fold each into the current round, in order.
  If one is ambiguous ("increase … to 8px"), do the likelier reading, say
  so in one line and offer the other.

## 3. Compare side by side

- Capture at iPhone 14 Pro (393 × 852), scale 2, over CDP with the Mac's
  Chrome (`Emulation.setDeviceMetricsOverride`). Prototype session on,
  pricing phase `today` (no new-price notices), Next dev badge removed
  (`nextjs-portal`), realistic state (express: subscription layout via the
  GST tap). Capture the viewport; a `clip` is in page coordinates.
- Also check 320px for anything that can wrap or overflow (labels, button
  pairs, tab rows). Let the container decide the layout (container
  queries), never the copy's width.
- For motion, capture several scroll positions and stack them.
- Take screenshots only after every requested change is in; recapture every
  version a shared change touches.
- One comparison Artifact (republish the same file so the link stays): a
  section per checkout, phone-width columns (`minmax(260px, 393px)`, 16px
  apart), the base version first, the newest beside it, one line under each
  on what differs.
- Look at every capture yourself before publishing and fix what you see.

## 4. Build hygiene

- Every edit script asserts its anchor exists; if it fails, re-read the code
  and redo it before capturing. A capture taken after a failed edit shows
  the old design.
- After each change: `npx tsc --noEmit -p .`, ESLint on touched files,
  `npm run lint:tokens`. Never run Prettier (no config: it reformats whole
  files).
- Tokens, not literals: no arbitrary values (`max-h-[…]`), no raw colours.

## 5. Keep the context file current

After every round, update the session context file
(`docs/SESSION-<date>-<area>.md`): the version table row, shared changes,
"Where it landed" when something is finalized, the comparison link, how it
was captured, and open questions (a lens that conflicts with AGENTS.md,
e.g. "1 month" vs "lengths in days"). Never commit; Punna says when (memory:
feedback-no-commit-prompts).

## 6. Report back

Short: what changed in which version, the comparison link, anything that
breaks an earlier rule, and the one decision left for Punna.

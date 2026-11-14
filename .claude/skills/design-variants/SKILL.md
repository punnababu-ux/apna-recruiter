---
name: design-variants
description: Run any screen through Sumit's design review (Punna's manager) and ship the ideas as switchable versions with a side-by-side 2x phone comparison. Use when Punna asks for a new version or variant of a screen ("make a version where…", "in V11, …", "compare versions"), asks "what would Sumit say", relays feedback from Sumit, or before showing any design change.
---

# Design variants, through Sumit's lens

Sumit is Punna's manager. Two long rounds of his feedback shaped the phone
checkouts: express V11 and self-checkout V14 (2026-10-30), specified in full
in `docs/history/SESSION-2026-10-30-CHECKOUT.md` ("Where it landed"). Those two
screens are the reference for what "good" looks like to him. This skill:

1. reviews a screen with his lenses,
2. ships each idea as its own version,
3. compares versions on one page at phone size,
4. keeps the context file current.

When Punna relays new feedback from Sumit, or approves a design ("go with", "proceed", "straight to live", "push"), add the lesson to the lenses here in the same turn, dated. The lenses are the record of what was approved.

## 1. Sumit's lenses

Write one line per lens for the screen under review: holds / fails, and the
fix. Turn the fixes into proposed versions; never apply them silently.

Lenses are numbered 1–N in one list: add a new one at the end of its group
and renumber (no 15a-style suffixes). A rule that also lives in AGENTS.md
gets a pointer here, not a copy.

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
15. **Same thing, same styling, both flows — on one platform.** Phone and
    desktop are separate platforms: phone first, free to break desktop
    patterns when it helps the phone, coherent only through the design
    system (AGENTS.md, 2026-11-02). When one checkout is
    finalized, port its structure to the other, keeping only the
    differences the page needs.
16. **Points nest under the fact they belong to** (2026-10-31). A sub-point
    sits under its parent only when it is part of that fact: WhatsApp alerts
    under "Dynamic visibility"; reposts & swapping and database credits
    under "1 job live at a time". A limit (the city) is its own plain line
    at the end: "This plan is valid in a single city". Never nest a fact
    under a feature it doesn't explain.
17. **An applied offer shows what it saves** (2026-10-31). When the extra
    10% is applied, show the struck price on every card, desktop too, even
    in a version that hides struck prices otherwise.

**Prices and offers (approved 2026-11-02)**
18. **The saving is text, not a pill.** "−22%" green semibold, a step
    smaller than the struck price (bold reads bigger); the struck price a
    step smaller than the amount. Steps stay the same on every surface
    (phone card 18/14/12, upsell tile 20/16/14).
19. **The price group reads outward from the price, on one centre line.**
    Left-aligned: price → strike → %. Right-aligned (phone cards):
    % → strike → price. When it can't fit (a ~130px upsell tile), strike
    and % drop to the next line together, same order.
20. **The % is the final saving**, coupon included, against the struck
    price. Never a % beside a price it doesn't describe.
21. **Anchor on what the user has seen.** Express shows no MRP, so its
    upsells and order summary never strike a hidden MRP; a bundle strikes
    N × the shown single price.
22. **Say an offer once.** The claimed 10% lives in one banner above the
    plans ("Offer claimed · Extra 10% off every plan", "Ends in" timer,
    shimmer), never as a line on each card or tile. The order summary
    names the coupon ("You save ₹X with FIRST10").
23. **One colour, one meaning.** Green = the saving; blue = the per-unit
    price ("₹585 /credit") and Recommended; gray = secondary facts.
24. **Make value visible, but never promise a guess.** Free extras get
    their own cart row ("10 database credits · Valid for 15 days · Free"),
    no struck worth, no MRP games. Show only what is certain at payment.
25. **Cut repeats in the cart.** Say a fact once (renewal lives in the
    autopay line, not under the item). Bundle line: "1 used now · 2 left,
    valid for 90 days".
26. **An aside is "Note:" or italic, never both,** and never with an icon.
27. **One primary per screen; the recommended card stands out by its blue
    edge** (desktop), not by a second green. Phone plan lists are the one
    exception, Sumit's call over the one-green recommendation (2026-11-03): a green "Buy now" on every card (no hover on a
    phone to light one up), the Recommended tab marks the pick (lens 28).
28. **Every phone plan card has its own Buy now; alerts are tiered**
    (approved 2026-11-03). Every tab of both checkouts: inline −%, a green
    "Buy now" bottom right ("Contact sales" on Enterprise), 12px top,
    16px bottom (24px under the Recommended tab). Benefits one per line,
    12px under the rule; the button takes a text line's height, centred on
    the last line. No benefits? The per-unit price goes under the rule so
    the button still sits at the bottom. Alerts on every job, phone and
    desktop: Classic "1x alerts to candidates", Premium "2x…", Super premium
    "4x alerts to candidates". Free database credits: valid 15 days. A cramped card reads cheap; don't tighten it back (approved 2026-11-03).
29. **Rules approved 2026-11-03, kept in AGENTS.md** ("Prices, offers and
    validity"; read them there, don't copy them here):
    - Rule 12: credits, never rupees, in the job-type explainer.
    - Rule 13: add-ons keep their list price under the coupon.
    - Rule 14: AI calling credits are two things (Premium + AI vs add-on).
    - Rule 15: credits in the price slot are one text style.
    - Rule 16: every plan card state has its CTA.

**Interaction**
30. **Motion is continuous or it's absent.** A swap (fade one out, fade the
    other in) is wrong; a moving element must travel with the gesture.
    If the effect doesn't earn its place, Sumit prefers the static state
    (the collapsing large title was removed).
31. **Explanations open as bottom sheets on phones**, reusing the screen's
    own cards (read-only, no tap feedback) instead of a different
    component.
32. **Familiar controls.** Underline tabs over custom chips; a scrolling tab
    row keeps its padding inside the scroll (starts 16px in, can scroll
    off the edge, every tab reachable at 320px).
32a. **A status must not look like a button** (approved 2026-11-09). A + or
    dashed outline says "tap to add". Read-only progress chips use a plain
    pill and a circle, and appear only once there is input to report on
    (job posting Describe).
32b. **Voice sits under the thumb** (approved 2026-11-10). In a prompt box
    the mic is a round button beside the send arrow, bottom right, never
    bottom left. The arrow always shows and is disabled until there is text.
32c. **One question per screen on phones** (approved 2026-11-10). Never put
    two questions on one phone screen to save a step; ask fewer questions
    instead. Desktop may group a topic. A line with "Change" is not a question.
32d. **An AI-filled flow is the same flow** (approved 2026-11-10). After an
    AI draft the recruiter walks the same questions as by hand, filled in,
    and taps Next. Never a different path or a jump to the review.
32e. **AI work animates in one place** (approved 2026-11-10, toned down
    2026-11-11). While the AI writes into a field, the field shows a
    skeleton and a plain strip under it rolls what the AI is doing; the
    strip is the only animation (no ring, no backdrop on a form step; those
    belong to Describe's "Draft my job"). The way out is a link in the strip,
    never an outlined CTA. Arriving text types in.
32f. **Listening is quiet texture, not colour** (approved 2026-11-14). While
    the mic listens, a faint gray halftone flows round the prompt (free
    shape, fabric ripple, dots shrink outward) and the mic button stays a
    neutral outline with one moving line. No gradient on the button; the
    prompt's glow is the only colour. Decorations never run off a phone
    screen.
32g. **An icon's wordmark is as big as its crop allows** (approved
    2026-11-14). Size a home-screen icon's text against each platform's
    crop (iOS rounded square, Android's middle 72 of 108 dp circle), not
    the drawn tile: iOS 72% wide, Android as close to the circle as a few px.

## 1a. Audit: the current version

Run this to confirm a screen is on the approved version, or to rebuild it
(full record: `docs/history/SESSION-2026-11-03-CHECKOUT.md`). Each line: holds /
fails.

1. **No design switches.** `grep -rn "usePriceLayout\|usePlanCardStyle\|\?price=" src`
   finds nothing. The hidden settings only change demo state (balance,
   slots, pricing phase, offer, plan layout, nav look).
2. **Phone cards, every tab, both checkouts** (Jobs, Unlimited, Database,
   Enterprise; express job types and monthly plan): price row % · strike ·
   price on one centre line; green "Buy now" bottom right; rule, then
   benefits one per line, or the per-unit price when there is no list.
3. **Spacing** at 375px, measured in the DOM: 12px top / 16px bottom,
   24px under the Recommended tab, 12px from the rule to the first line,
   Classic's single line centred on its button.
4. **Express alerts**: Classic / Premium / Super premium say "1x alerts to
   candidates" / "2x…" / "4x…" (AGENTS.md rule 18) on phone and desktop;
   Classic's desktop row is included, not ✕.
5. **Order summary**: free database credits "Valid for 15 days".
6. **Rules from AGENTS.md still hold**: one banner for the 10%, blue
   per-unit price, green only for the saving and the buttons, desktop
   CTAs outlined at rest. Run `scripts/check-alignment.js` on desktop
   with and without the offer.

## 1b. Colour on the mesh (2026-11-05)

Any coloured type, gradient text or accent sitting on the ambient mesh
(hero, pricing, checkout backdrops) is checked against the mesh first.
The mesh is peach 18°, pink 342°, periwinkle 226°, mist 214°: one arc
from blue round to pink.

1. **Plum only, light to near-black (Punna's call, 2026-11-05).** Gradient
   text on the mesh sweeps plum-950 → plum-400 → plum-950 (dark mode:
   plum-50 → plum-300). Simple beats clever: tried sky+plum and deepened
   mesh hues first; both were dropped for this.
2. **No complement of a blob.** Brand green (~160°) sits opposite the pink
   blob (342°); side by side they vibrate. Keep green for buttons and
   solid surfaces, not for type floating on the mesh.
3. **Darken, don't saturate.** The mesh is light and soft; mesh type uses
   the deep end of the ramp (600–700, plum-400), which is where the
   contrast comes from.
4. **Contrast on the worst blob.** Measure every stop against the
   darkest blob it can cross (pink #F4C4D2, periwinkle-tinted ~#C9D3EC),
   not the white page: ≥3:1 for display type, ≥4.5:1 for body.
   Green-500 and sky-500 fail (~2:1) there; sky-600+ and plum-400 pass.
5. **Plum is the accent, not the base.** It's low-saturation (17%), so
   alone it reads grey; use it as one stop between blues.
6. **Loop back.** An animated gradient ends on its first colour so the
   sweep has no seam.

Check with a quick script: hue (HLS) of each stop and blob, and WCAG
contrast of each stop on each blob, before showing the result.

## 1c. Reels library lens (2026-11-12)

After Sumit's lenses, run the quick review lens from the
`reels-design-library` skill (`.claude/skills/reels-design-library/SKILL.md`):
where the eye lands first, how many places use the accent, how many type
sizes, a job for every colour, motion length, and whether the choice can be
explained by mechanism. One line each: holds / fails, and the fix. AGENTS.md
and Sumit's lenses win where they disagree.

## 2. Every idea is a new version

- Checkouts: the V1–V14 switch was retired 2026-11-02 (express V11 and
  self-checkout V14 are the code now; history in
  `docs/history/SESSION-2026-10-30-CHECKOUT.md`). A new checkout variant goes behind
  a URL flag, like other screens, unless Punna asks for a version switch
  again.
- "In V11, …" / "in V14, …" now just means the live express / self-checkout
  design: change it directly. "Try X" on a direction that may be
  rejected → a preview behind a URL flag, the live look untouched.
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
(`docs/history/SESSION-<date>-<area>.md`; start a new one per round of work): the version table row, shared changes,
"Where it landed" when something is finalized, the comparison link, how it
was captured, and open questions (a lens that conflicts with AGENTS.md,
e.g. "1 month" vs "lengths in days"). Never commit; Punna says when (memory:
feedback-no-commit-prompts).

## 6. Report back

Short: what changed in which version, the comparison link, anything that
breaks an earlier rule, and the one decision left for Punna.

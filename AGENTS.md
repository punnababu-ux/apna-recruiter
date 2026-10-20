# Poneglyph — Agent & Designer Guide

> Picking up mid-project? Read `docs/AI-HANDOFF.md` after this file: the
> working context, workflows and what is pending. For "where is X", read
> `docs/PROJECT-MAP.md` first instead of exploring the repo.

This file is the contract for any AI agent or designer working in this
repository. Read it before you generate code. The rules are short and they
are strict.

---

## The one rule

**Compose from existing components and tokens. Never style from scratch.**

If what you need does not exist in `packages/design-system/src/components/ui/`
(imported as `@/components/ui/*` or `@apna/design-system`), you **build the
component first**, commit it, and *then* use it in a template or page.
You never reach for raw Tailwind values, raw colors, raw sizes, raw
spacing on ad-hoc JSX.

---

## 🛑 Strict mode — the non-negotiables

These are enforced by `npm run lint:tokens` and block CI. Don't argue with
the script; fix the violation.

**Scope.** The lint runs over `src/app/**`, `src/components/**` **and the
design system itself** (`packages/design-system/src/**`), skipping only the
token files and the colour check on `logo-*.tsx` brand marks. Primitives that
genuinely need an arbitrary value for third-party DOM (`[&_.recharts-*]`
selectors, CSS system colours like `bg-[Canvas]`) use the
`token-lint-ignore` pragma and go through design-system review. Everywhere else — pages, templates, any component you
author on top of the system — is held to the rules below.

### ❌ Forbidden

| Pattern                                     | Why                                                 |
|---------------------------------------------|-----------------------------------------------------|
| `className="p-[13px]"`                       | Arbitrary Tailwind value — bypasses spacing scale   |
| `className="text-[15px]"`                    | Arbitrary text size — bypasses type scale           |
| `className="text-[#ff0]"` / `bg-[#fff]`     | Arbitrary colour — bypasses token system            |
| `className="gap-[9px]"` / `m-[0.6rem]`      | Arbitrary spacing                                    |
| `style={{ color: "red" }}`                   | Inline colour — use `className="text-destructive"`  |
| `style={{ padding: "12px" }}`                | Inline spacing — use `className="p-sm"` or `p-3`    |
| `style={{ fontFamily: "Inter" }}`            | Inline family — use `font-body` / `font-heading`    |
| `style={{ fontWeight: 600 }}`                | Inline weight — use `font-semibold`                 |
| `#hex`, `rgb()`, `oklch()` in components    | Raw colour literal — only allowed in `tokens/*.css` |
| `bg-gray-900`, `text-red-500`               | Primitive colour used directly                       |

### ✅ Required

| Intent                | Use this                                                |
|-----------------------|---------------------------------------------------------|
| Background colour     | `bg-background` · `bg-card` · `bg-muted` · `bg-primary` |
| Text colour           | `text-foreground` · `text-muted-foreground` · `text-destructive` |
| Border / ring         | `border-border` · `ring-ring`                            |
| Font family           | `font-body` · `font-heading` · `font-mono`              |
| Font weight           | `font-regular` · `font-medium` · `font-semibold` · `font-bold` |
| Text size (atomic)    | `text-xs` · `text-sm` · `text-base` · `text-lg` · `text-xl` … `text-6xl` |
| Text preset (composite) | `text-display` · `text-h1…h6` · `text-body` · `text-body-sm` · `text-caption` · `text-overline` |
| Padding / margin      | Context: `p-inset` · `p-inline` · `p-stack`             |
| Padding / margin      | Numeric: `p-1 … p-64` (sanctioned steps only)           |
| Gap                   | `gap-inline` · `gap-stack` · `gap-field` · `gap-6`      |
| Radius                | `rounded-xs` · `rounded-sm` · `rounded-md` · `rounded-lg` · `rounded-xl` · `rounded-2xl` · `rounded-full` |
| Duration              | `duration-hover` · `duration-enter` · `duration-exit` · `duration-select` |
| Easing                | `ease-standard` · `ease-out-ui` · `ease-in-ui` · `ease-select` |
| Interaction feedback  | Primitives carry it. Hand-rolled surfaces: `ink relative transition-interactive` (+ `press`) — see "Live surfaces" |

### "But I need a value that isn't on the scale"

No, you don't. In order:

1. **Round to the nearest sanctioned step.** 90% of the time this is the answer.
2. If the visual genuinely requires a new step, open `primitives.css` and
   add it with a comment explaining why. Then use it from a semantic alias.
3. If you're sure you need a one-off that will never be reused, add
   `{/* token-lint-ignore: <reason> */}` on the line above and document
   the exception in your PR. These must stay rare.

The scale is not a suggestion. It is the system.

---

## Token architecture

Three foundations, all two-tier (primitives → semantics).

```
Tier 1 — Primitives   packages/design-system/src/styles/tokens/primitives.css
   raw atoms: color ramps, type scale, weight 100–900, size steps,
   radius scale, motion, shadow, z-index, breakpoints
   NEVER consumed by components

Tier 2 — Semantics    packages/design-system/src/styles/tokens/semantic.css
   intent aliases:
     colour roles      (--background, --primary, --destructive, …)
     font roles        (--font-body, --font-heading, --font-mono)
     weight roles      (--font-weight-regular … --font-weight-extrabold)
     size roles        (--text-xs … --text-6xl)
     spacing t-shirt   (--space-2xs … --space-5xl; tokens only, no utilities)
     spacing context   (--space-inline, --space-stack, --space-inset,
                        --space-field, --space-section, --space-page)
   every value references a primitive
   this is the ONLY layer components read
```

### Rules you must follow

1. **Components read semantic tokens only.**
   - ✅ `bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`
   - ❌ `bg-gray-900`, `text-[#111]`, `bg-[var(--color-gray-100)]`
2. **No raw colour literals in components.** No hex, no `rgb()`, no `oklch()`
   inside `src/components/**` or `src/app/**`.
3. **No raw typography literals.**
   - ✅ `font-body`, `font-heading`, `font-bold`, `text-lg`, `text-h2`, `text-body`.
   - ❌ `style={{ fontFamily: "Inter" }}`, `font-[500]`, `text-[15px]`.
4. **No arbitrary spacing.**
   - ✅ `p-inset`, `gap-stack`, `p-4`, `gap-6`. (T-shirt steps like `p-md` are
     deliberately not generated — they collide with Tailwind's own scale.)
   - ❌ `p-[13px]`, `gap-[9px]`, `style={{ padding: "0.6rem" }}`.
5. **New intent → new semantic token.** If you want a role that isn't
   listed, add a semantic alias (pointing to a primitive) first. Document
   the intent in the token's comment.
6. **New primitive is rare.** Add a step on an existing ramp first. A brand
   new hue or family is a system-level decision.
7. **Presets over composition when the role exists.** Prefer
   `className="text-h1"` over
   `className="font-heading font-bold text-4xl leading-tight"` for a
   heading. Atomic utilities are for genuine one-offs.
8. **Structured stacks over ad-hoc margins.** Never chain ad-hoc margins
   (`mb-*` / `my-*` / `mt-*` on every sibling) to separate elements inside
   cards, forms, or content surfaces. Margin-stacking causes margin-collapse
   bugs and squashed layouts. Always use a Flexbox or Grid container with
   explicit `gap` (`flex flex-col gap-4` or `gap-stack`).
   - **CTA Breathing Room:** An interactive CTA button must never touch or
     collapse against preceding metadata, subtitles, or helper copy (e.g.
     "Pay upfront", "Billed annually", disclaimer). Always maintain at least
     `--space-stack` (`gap-4` / 16px) separation between content and CTAs.
   - **Metadata Cohesion:** Group related metadata pairs (e.g. primary price
     + upfront note) in a dedicated inner container with tight spacing
     (`flex flex-col gap-1`), while separating the entire group from the
     action button with the container's outer gap.

---

## Composition over re-invention — the tier-0 rule

**Before adding any tone / variant / colour-carrying style, ask: is there
already a primitive in `packages/design-system/src/components/ui/` that does this, and what variant
does it expose?** If the answer is yes, you MUST use that variant. No
parallel palette maps, no `className={TONE[...]}` lookups, no `bg-foo/10
text-foo-bar` hand-paint jobs layered on top of an existing primitive.

This rule exists because:

1. **Variants are the contract.** When Alert grows a new `pending` tone, or
   `--info` gets re-mapped for a theme, every InfoBanner in the codebase
   should update automatically. That only works if InfoBanner delegates to
   Alert — not if it bakes its own copy of the palette.
2. **Hand-rolled tone maps are a token minefield.** `text-info-foreground`
   is a real CSS variable sized for *solid* `bg-info` surfaces. On a
   `bg-info/10` tint it evaluates to near-white on light-blue — unreadable.
   We hit this exact bug with InfoBanner; don't write another one.
3. **Two sources of truth always drift.** If the primitive has a `success`
   variant and your product component has its own `success` map, they will
   disagree within a quarter. Guaranteed.

### The composition rule

A product component in `src/components/onlyrounds/**` (or any product
namespace) falls into one of exactly three shapes:

| Shape | Allowed to touch | Example |
|---|---|---|
| **Pure layout** | flex/grid/gap/padding only | `PageHeader`, `JobsTable`, `Stepper` |
| **Primitive wrapper** | pass `variant` through, add layout | `InfoBanner` → `<Alert variant={...}>` |
| **Slot-only override** | override ONE specific shadcn utility class, no palette | `SplitButton` → `Button` with `className="px-2"` |

If your component needs a tone the primitive doesn't expose:

1. **Stop.** Don't hand-paint it locally.
2. Add the tone to the primitive in `packages/design-system/src/components/ui/<primitive>.tsx`.
3. Come back and compose from the new variant.

### Red flags during code review

Reject the PR if you see any of:

- `const TONE: Record<..., string> = { ... "bg-foo/10 text-foo-bar" ... }`
  inside a product component. That's a palette — move it into the primitive.
- Product components importing `cva` directly to build a variant table for
  colours. Variant tables live in primitives, not in product code.
- `text-*-foreground` class paired with a `/10`, `/15`, `/20` background.
  The `-foreground` tokens are designed for solid surfaces. On a tint you
  want `text-*` (the role colour itself). If unsure, read the primitive's
  existing variant for that tone and copy the pairing.
- A styled `<span>` / `<div>` that looks like a Badge / Alert / Button.
  It probably should be one. Compose, don't clone.
- Duplicated variant enums: product component has `type Tone = "info" |
  "warning" | "success" | "destructive"` identical to the primitive's.
  Re-export the primitive's type or pass the string through.
- The same navigation control drawn two ways in two flows — e.g. a bare
  arrow back button in one header and an outlined circle in another. A
  recruiter crosses flows (self-checkout → job posting → plan step); shared
  chrome must look and sit the same in all of them. `BackButton` has exactly
  one form and one placement (first in the row, `gap-3` before the
  title/logo) — see the rule in its JSDoc. Don't add a variant to make one
  page different; change it everywhere or not at all. (A wizard's footer
  "Back" is a different action — previous question, not leave — and is
  always WizardFooter's outline button; see `wizard.tsx`.)
- Two primary (green) CTAs on one screen. There is exactly one primary
  action per screen ("Proceed to pay", the recommended plan's "Buy now").
  Something else that must still be pushed hard — an add-on or upsell like
  "Add AI calling agent" — uses `Button variant="emphasis"` (dark gray),
  never a second `default`/`checkout`. `emphasis` is only a companion: never
  the only CTA on a screen, at most one per section. Exception: in a
  step-by-step flow (WizardFooter) every step's CTA is `emphasis`, and green
  is kept for the one committing action (post / pay). See Button's JSDoc.
- A hand-picked white button on a dark surface. The companion inverts by
  itself: mark the dark area `data-surface="dark"` (OfferDialog's header
  does) and `emphasis` inside it renders white with a dark label. Dark gray
  on light, white on dark — one rule, one variant.
- A card that lifts on hover (`card-hover-lift`, PricingCard) but isn't
  clickable as a whole, or a lifting card with `overflow-hidden`. See the
  rule on `card-hover-lift` in the design system's `styles/index.css`.

### Semi-allowed exception

If you genuinely need a *stylistic* variation on top of a primitive variant
(e.g. an outlined chip that still uses the `destructive` colour), compose
with the primitive's own tokens ONLY:

```tsx
// OK — uses primitive's role tokens without reinventing them.
<Badge variant="outline" className="border-destructive/30 text-destructive">

// NOT OK — reinvents the palette via a local map.
const TONE = { miss: "border-destructive/30 text-destructive", ... }
<Badge variant="outline" className={TONE[tone]}>
```

If you find yourself writing the second form more than once, that's the
signal to add the new variant to the primitive.

---

## Live surfaces — interaction is part of the system

Anything a user can press, toggle or select answers immediately. The
primitives already do this; product code gets it by composing them.

| Utility | Effect | Where it lives |
|---|---|---|
| `ink` | While pressed, an ink spreads from the touch point, then fills the surface and fades into the hover state | Button, Toggle, ToggleGroup, ChipTabs `choice`, menu + select items, SidebarMenuButton, BottomNav, clickable PricingCard. **Not** on sliding-pill controls (Tabs, SegmentedTabSwitcher, ChipTabs default/solid): the pill is their feedback, and an ink on the tapped option reads as a second highlight |
| `press` / `press-subtle` | Compresses while held (`--press-scale`, `--press-scale-subtle` for cards) | Buttons, chips, checkbox, radio, switch |
| `transition-interactive` | Colour, border, shadow, focus ring and transform ease (`--duration-hover`) | Every interactive primitive |
| `transition-option` | Only the label/icon colour eases; no background fade, so a hover tint vanishes the instant an option is chosen | Options of sliding-pill controls (Tabs, SegmentedTabSwitcher) |
| `transition-select` | Selection lands with a slight spring (`--duration-select`, `--ease-select`) | Checkbox tick, radio dot, switch thumb, chevrons |
| `animate-unread-ping` | An unread dot pings three times as it appears, then rests (never an endless pulse) | Unread dot on JobMetricPill's count |
| `tab-indicator` / `sliding-indicator` | One selection pill glides to the active option, never a cross-fade (`--duration-slide`, `--ease-slide`) | TabsList (Base UI indicator); SegmentedTabSwitcher, ChipTabs and hand-built segmented controls via `useSlidingIndicator` |

Rules:

1. **Never `transition-all`.** It animates layout properties. Use
   `transition-interactive` (or `transition-select` for state changes).
2. **Hand-rolling an interactive surface?** First ask whether it should be a
   primitive. If it truly can't be, give it `ink relative
   transition-interactive`, plus `press` for buttons and chips or
   `press-subtle` for cards. `ink` paints on `::before`, so the host must not
   use its own `::before`.
3. **Hover effects stay hover-only.** Tailwind's `hover:` already sits behind
   `@media (hover: hover)`, so a tap never leaves a stuck hover state.
4. **Reduced motion is handled once,** in the base layer. A press still shows
   as a held tint. Don't add per-component motion opt-outs.
5. **Segmented controls slide, they don't swap backgrounds.** If you build
   one by hand, don't give the active option its own background. Render one
   `sliding-indicator` element and let `useSlidingIndicator(value)` move it
   onto the option marked `data-indicator-active`.
6. **`<InkProvider />` is mounted once in the root layout.** It tells the ink
   where you pressed. Without it the ink grows from the centre.

Pop-ups close the same way everywhere. `DialogContent` and bottom
`SheetContent` render the **CloseBubble**: a 32px dark translucent disc
with a white X, OUTSIDE the card, 8px above its top-right corner (Figma
"close-button-bubble"). Never add your own close button inside a pop-up,
and don't put `overflow-hidden` on a bottom sheet, because it would clip
the bubble. Round the inner corners instead. Side drawers (right and left
sheets) are panels and keep their inside X. Pass `showCloseButton={false}`
only for a forced choice.

**Same pattern, same component — check before you build.** If a new
surface looks like one that exists (a side panel, a pop-up, a chip row, a
plans button), find the component that draws the existing one and use it.
Two look-alikes built separately drift in title size, weight and padding;
that is a defect even when each looks fine alone. The shared ones:

- **Side panels** (order summary, notifications): `SheetPanel` for the frame
  (muted, 448px / 512px, rounded left corners, white card sections) and
  `SheetPanelHeader` for the title row (20px semibold heading title,
  optional action, close). Never a bare `SheetContent side="right"`, never
  a hand-sized panel title.
- **Plans** (bottom bar tile, sidebar link, "View plans" CTAs): the plans
  look only — `variant="premium"` Button or BottomNav `featured`, with a
  gold `Coin` carrying the ₹. Not green, not the dark emphasis.
- **Segmented controls** (Tabs default / inverted, ChipTabs,
  SegmentedTabSwitcher): fully rounded track, pill and items. A squared
  pill next to a round one is the same control drawn twice.
- **Phone chip rows**: `MobileChipRow` / `SectionChips`, the self-checkout
  styling.

Mobile: bottom-fixed bars use `pb-safe` (no padding of their own) or
`pb-safe-<n>` (in place of `pb-<n>`) to clear the home indicator. Inputs use
`text-base md:text-sm` so iOS Safari doesn't zoom on focus.

Toasts appear top-centre (the `Toaster` default). Never move them to the
bottom: on phones that is where the primary CTA lives, and a toast there
blocks it for seconds. Don't toast what the screen already shows (an
applied coupon, a price that just changed).

---

## Card corners — one radius, every page

Every card on every page — home, pricing, the plans step, login, the app —
has the same corner. Two roles, nothing else:

| Where the card sits | Class | ≈ |
|---|---|---|
| On the page background (a plan card, the login card, the contact band, an FAQ item, a testimonial) | `rounded-card` | 20px |
| Inside another surface (a card in a plan track, a section in a side panel, a box inside a card) | `rounded-card-nested` | 16px |

- `Card` is already `rounded-card`. Don't override its corner.
- A hand-rolled card (a `div` with `bg-card` / a border / `shadow-card`)
  uses one of the two roles. Never `rounded-xl` / `rounded-2xl` /
  `rounded-3xl` on a card, and never a radius picked per page ("this page
  looks better rounder").
- A component that is nested in one place and on the page in another
  (PricingCard: in the Jobs track, on the page in Database) defaults to
  `card-nested`; the on-page caller passes `className="rounded-card"`.
- Not cards: inputs (`rounded-field`), buttons and chips (`rounded-control` /
  `rounded-full`), popovers and menus (`rounded-surface`), dialogs and sheets
  (`rounded-overlay`). Small tiles inside illustrations keep their own size.

To change how round the cards feel, retune `--radius-card` in
`semantic.css` — once, for the whole product.

**Plan cards are borderless** (user call, 2026-10-19). Every plan and
pricing card — job credits, apna Unlimited / Subscription, Database,
Enterprise, both checkouts — is a solid white `bg-plan-card` card with a
transparent border (`border-transparent`, so sizes don't shift), sitting in
the frosted dark glass panel (`surface-glass-dark`). No grey outline, never
frosted glass. On a *selectable* card (phone rows) only the selected one
has a border — green; unselected cards stay borderless.

---

**Clickable cards — the whole card is the target, and it lifts** (user call,
2026-10-19). A card that leads somewhere or picks something is clickable as a
whole, not just through its button: the card takes the click and the CTA
inside just bubbles to it. Every such card answers hover with the plan
cards' lift (`card-hover-lift`: 2px up onto `shadow-elevated`) plus the ink
and press. A card that isn't a target as a whole (several separate actions
inside) never lifts. It's built in, so there's nothing to remember:

- `Card` / `PricingCard` with `onClick` lift, ink and press by themselves.
- A `Card` that is a link's direct child (`<a href><Card/></a>`) lifts by CSS.
- A frame that takes the click for a card inside it (the Unlimited cards):
  mark the frame `data-card-lift-group` and pass `interactive` to the card.
- A hand-rolled clickable card: `card-hover-lift ink press-subtle
  cursor-pointer` (ContactSalesCard). Better: make it a `Card`.

**Card shadows — resting cards are flat** (user call, 2026-10-19). No card
carries a shadow at rest: plan and pricing cards, testimonials, stats, the
login cards, a band's standout card, the contact band. Cards separate from
the page by fill (frosted glass, solid white, a gradient), never a shadow.
A shadow means exactly two things:

- **Hover lift** — `card-hover-lift` / `interactive` raises a clickable card
  onto `shadow-elevated` while hovered.
- **It floats above the page** — popovers, menus, dialogs, sheets, the sticky
  header, a FAB. Stacking cards (`ScrollStack`) stay flat too.

Never add `shadow-card` / `shadow-elevated` to a resting card to make it
"stand out"; give it the standout fill instead.

---

## Marketing pages — the visual language

- **Heroes have a chip, not an eyebrow.** The opening band carries the
  homepage hero's outlined chip (`HeroChip` in
  `src/components/marketing/page-blocks.tsx`: Badge `lg`, outline, on card,
  with an icon). `PageHero` and the product hero draw it for you.
- **Eyebrows below the hero are gray** (`text-overline
  text-muted-foreground`), never green.
- **Serif — where and only where.** Source Serif 4 (the editorial voice)
  is used for exactly three things on marketing pages, the homepage
  included:
  1. **The page headline (h1)** in every hero.
  2. **Section titles (h2)** — the one title that opens a section, the
     closing contact band's title included.
  3. **Quotes** — `text-quote` in a card (testimonials, press),
     `text-quote-lg` for a page's featured quote (the founder's line).

  **Every hero headline (h1) has exactly one italic accent** — one word
  or one tight phrase ("AI-Native"), set with `withAccent` (the word lives
  in the page's content as `titleAccent`). Section titles (h2) stay plain.
  **Everything else is Inter:** h3 and below, card / list / accordion
  titles, every number (stats, years, step numbers — numbers are data),
  eyebrows, chips, body, buttons, nav, forms, footer, and anything in the
  app. It's automatic: the marketing shell sets `data-voice="editorial"`
  and `SectionHeading` switches levels 1–2 to the serif by itself — there
  is no prop to set or forget. A hand-built h1/h2 uses
  `text-editorial-display` / `-h1` / `-h2`. `npm run lint:tokens` refuses
  the serif presets outside the marketing folders.
- **🛑 No serif in the product. Ever.** The dashboard, checkout, job
  posting, login, OnlyRounds and every workflow are Inter only, headlines
  included. This is enforced twice: the token lint refuses the serif
  presets outside marketing files, and `--font-editorial` itself resolves
  to Inter everywhere except inside `[data-voice="editorial"]` (the
  marketing layout). So a shared component that uses the serif on the
  website (PricingHero, FaqSection, TrustBar) turns Inter by itself inside
  the product. Never set `data-voice="editorial"` on a product surface.
  **The one exception: testimonial quotes** (`text-quote*`) keep the serif
  everywhere, the plans step in checkout included.
- **Each product owns one gradient** (`bg-gradient-product-*`): Smart Jobs
  green, AI Calling Agent sky, apna Database plum, apna Unlimited gold
  (swapped 2026-10-18: Jobs, the core product, wears the brand green). The
  same mapping holds inside the product: an add-on card for a product (the
  order summary's AI calling and Database add-ons) wears that product's
  gradient, light in light mode, dark in dark. Upsell and exit pop-ups are
  the exception: they use their own offer gradients, not the product ones —
  `bg-gradient-offer` (jobs and the exit offer: a green sweep; on dark,
  green glows on plum) and `bg-gradient-offer-premium` (subscription: gold
  on plum; on dark, a quiet plum). Use
  it only with that product: its homepage card, its product page hero, its
  illustration. Company pages (About, Newsroom, Careers, …) use none —
  one exception: stacking cards (`StackCard`) take the four hiring-suite
  gradients in turn by position (sky, green, plum, gold), so a deck reads
  as one set, on every page. And By the numbers' stats card wears the
  sky suite gradient (blue; user call, 2026-10-19), so it doesn't repeat
  the hero. Otherwise never one product's colour alone on a company page.
- **Section rhythm (every page but product pages).** The hero sits on the
  gradient; the bands under it alternate white (`Section tone="card"`) and
  gradient, never two of the same in a row. A stats/facts card tucked under
  the hero counts as part of the hero.
- **One gradient per page.** The page's gradient is a single layer fixed
  behind the whole page (the marketing canvas, `semantic.css`); a gradient
  band is simply a transparent `Section` that lets it show through — hero,
  stats, closing card and footer all sit on the same gradient. Never paint
  a band's own `bg-gradient-checkout-hero`: two painted bands side by side
  meet in a visible seam. (Cards may still lift with it: `surface-feature`.)
- **One contact band, from the layout.** "Your next hire could apply today." (Post a job · Talk to sales)
  is rendered once by the marketing layout, just above the footer, on the
  canvas — identical on every page; pages never add their own or vary its
  copy. The one sanctioned swap: a page whose right ending is a different
  action (Join us → open roles) renders a `ClosingBand` in the same place
  and look, and the layout skips the contact band there; or, to keep the
  contact form with its own line (Culture), `ContactSection title="…"`. So a page's last band must be white: fold a closing line into the
  last white band as its sign-off (Culture, Join us) rather than adding a
  gradient band before the footer.
- **Cards follow the band they sit on — never pick a card's fill by hand.**
  A frosted white card vanishes on a white band, so marketing cards take
  one of two surfaces and the band decides:
  - `surface-frosted` — cards in a grid or list. Frosted white on a
    gradient band; the muted fill on a white band.
  - `surface-feature` — the one standout card of a band (a lead story,
    the Enterprise playbook). Frosted on a gradient band; on a white band it lifts:
    the mother gradient plus `shadow-elevated`.
  - `surface-band` — the closing contact band only: `surface-feature` on
    light; on dark the solid plan-card plum, the same on every page.
  No `bg-card/70 backdrop-blur-*` hand-mixes on marketing cards.
- **A card on a gradient is frosted glass** — `--surface-glass` (card at
  80%) plus a blur, everywhere: marketing cards, the homepage login card, the nav
  pill and docked header. It is automatic for a plain `Card` on a marketing
  page (a CSS rule in the design system's `index.css`, like the serif);
  hand-rolled surfaces use `bg-surface-glass backdrop-blur-xl`. Never pick
  the fill by hand. Not glass: plan and pricing cards (`plan-card`), the
  small tiles inside product illustrations, buttons and chips.
- **A product page is its colour, top to bottom.** Its canvas — header,
  every band, footer — is the homepage gradient re-tinted in the product's
  hue (`--gradient-canvas-*`, set by `data-product-canvas`). Bands stay
  transparent so it runs through; cards float on it (frosted). The
  product's accent (`text-product-accent`) is the secondary colour; brand
  green stays the primary.

---

## Copy is sentence case

Every heading, label, button, tab, chip, badge and line of UI copy is
**sentence case: capitalise only the first letter** (and proper nouns).

| ✅ | ❌ |
|---|---|
| Need a custom solution? | Need A Custom Solution? |
| Contact sales · Buy now · Proceed to pay | Contact Sales · Buy Now · Proceed To Pay |
| Apna unlimited | Apna Unlimited |

- **The brand in a sentence:** "Apna unlimited" — capital A, the rest
  lower case. The **wordmark** (the logo) is artwork and keeps its own
  lettering; this is about text.
- **Exceptions (always capitalised):** people's and companies' names
  (Tata 1mg, Shadowfox), places (Bengaluru, India), and acronyms / brand
  names of others (AI, GST, ATS, OTP, WhatsApp, LinkedIn). Add to this list
  as cases come up — never by quietly title-casing a label.
- Badges written in capitals by design (`RECOMMENDED`, `10% OFF`) are a
  style (`text-overline` / uppercase), not copy: write the copy in sentence
  case and let the style uppercase it.

---

## Text that grows — layouts decide where lines break, not copy

Copy changes: a price gains a digit, a plan gets a longer name, the font
changes, Hindi copy runs 30–40% longer. A layout that only works because
today's strings happen to fit is broken, just not yet. **Decide where
every line may break; never let the width of a string decide it.**

1. **Things that belong together never split.** A value and its unit
   ("₹2,249 /month"), a unit and its struck price ("/month ₹2,499"),
   "90 days". Group them in one `whitespace-nowrap` element, or glue them
   with a no-break space (` `) inside running copy. The group may
   move to the next line as a whole; it never breaks in the middle.
2. **Wrapping is deterministic across siblings.** If a group fits in one
   tile and not in the next, sibling cards stop matching. Pick one layout
   per breakpoint and force it: on phones, put the group on its own line in
   every tile (`w-full sm:w-auto`); from `sm`, keep the row on one line
   (`sm:flex-nowrap sm:whitespace-nowrap`). Never leave it to `flex-wrap`
   and the string's width.
3. **Name which side gives.** In a two-sided row (title | price), the
   number side is `shrink-0` and the text side wraps. If the text side is
   short metadata ("Active for 15 days"), it must not break mid-phrase
   either. Move it under the title on narrow screens instead of squeezing it.
   When the layout depends on a card's width rather than the screen's, switch
   it with a container query (`@container` on the card, `@2xs:flex` /
   `@2xs:hidden` on the two layouts) rather than a viewport breakpoint.
4. **Short copy for narrow, full copy from `sm`.** When a label can't fit a
   phone tile, swap it rather than wrap it (`<span className="sm:hidden">`
   short / `<span className="hidden sm:inline">` full), as with
   `ctaShortLabel` and `EXTRA_OFF.appliedShort`.
5. **Siblings share reserved space.** If one tile has a corner ribbon,
   reserve its band on every tile in the row. Bottom-pin footers and CTAs
   as one group (`mt-auto flex flex-col gap-4`), so lines align whatever is
   above them.
6. **Side-by-side choices compare one to one.** Two tiles that offer a
   choice (the upsell pop-ups' `OfferChoice`, any plan comparison) share
   one row grid (CSS subgrid): the same kind of line — price group,
   validity, note, database credits, city, CTA — sits on the same line in
   both, so the eye reads straight across. A tile without that line keeps
   the row empty; never let one tile's extra line push the rest out of
   step. The price group is one unit: amount + unit, struck price, % tag
   and any extra-off line, together — the % tag sits right after the struck
   price, never pushed to the far edge.
   **🛑 This is unbreakable: across every card in a row, the prices sit on
   one line, their notes on one line, the buttons on one line.** It holds
   for plan cards (`PricingCard`, the Subscription tab, the Unlimited card)
   and upsell tiles (`OfferChoice`), offer applied or not, at every width.
   Reserve an empty line where one card has nothing ("₹650 /credit" beside
   a monthly plan) rather than let the rows drift. It is checked, not
   eyeballed: comparable surfaces carry `data-compare-card` and
   `data-compare="price" | "price-suffix" | "cta" | …`, and
   `scripts/check-alignment.js` (run it in the page) reports any card whose
   line isn't level. Run it at desktop widths (phones are exempt: the
   cards stack there), with and without
   the 10% offer, before showing a change to these surfaces.
7. **Mixed sizes align on the baseline.** Price rows that mix a large
   amount with a small unit or struck price use `items-baseline`, not
   `items-center`.
8. **Test at 320px with the longest realistic string.** Check 320, 360 and
   375px, a six-digit price (₹12,99,999) and the longest plan name. If
   anything splits, overflows or misaligns, the layout is wrong, not the
   copy.

---

## Prices, offers and validity — plan cards and upsells

These hold on every plan card (`PricingCard`, the Unlimited cards, Database
cards) and every upsell tile (`OfferChoice`), both checkouts, light and dark
(user calls, 2026-10-19/20).

1. **One green line under a price, never two.** The per-unit note ("That's
   just ₹1,799 /month", "₹585 /credit") is green only when it stands alone.
2. **The claimed 10% offer comes first.** With the exit offer applied, the
   order under the price is: "10% extra off applied" (`ExtraOffLine`, green),
   then the per-unit note, now gray (`text-muted-foreground`). Never the
   note above the offer line.
3. **The % OFF pill is smoked glass, not green.** `Badge variant="discount"`
   sits on `--surface-glass-dark` (the job credits panel's fill) with green
   text. Change it through `--checkout-discount-bg`, never per card.
4. **Validity always carries the clock.** "Valid for N days" (or "1 active
   job slot for N days") is shown with the `ClockFading` icon, everywhere:
   in `OfferChoice` pass `validDays` / `term`, never a plain `note`.
5. **Which upsell tiles show validity.** Self-checkout: both tiles (both are
   packs the recruiter is choosing between). Express checkout: only the
   bundle on offer; the stay tile is the credit this one job needs and has
   no validity of its own. Every pack quote carries its `validDays`.
6. **A rule line closes onto content, never onto nothing.** The separator
   under an upsell tile's price only shows when that tile has details below
   it (validity, database credits, city). Without them it turns transparent
   (it keeps its space so the rows stay level with the partner tile).
7. **Order-summary add-ons announce themselves once.** As the order summary
   opens, an add-on card (Database in self-checkout, AI calling in express)
   runs the `attention-ring`: a gold → green → sky strip with a glow, two
   eased laps over 3.6s, then it fades. Once per add-on per session
   (`useAttentionRing`), never looping; reduced motion gets a still edge.
   Render it as `<span aria-hidden className="attention-ring" />` inside a
   `relative` card that doesn't clip (wrap a card that has
   `overflow-hidden`).

---

## Tax disclaimer — one wording, one component

Under any price, the tax note reads exactly **"\*GST applicable"** and is
rendered by `GstNote` (`src/components/apnahire/gst-note.tsx`). Never write
your own: no "18% GST will be added at checkout", "+ GST", "excl. GST" or a
rate. The order summary shows the actual GST line; plan pages only say it
applies.

- One per pricing section, at its end. On the checkout pages that is under
  the last card (the Contact sales card on the Jobs, Database and Unlimited
  tabs).
- Restyle it only through `className` (e.g. `text-muted-foreground` on a
  white card). Never change the text.

---

## Adding a new component

Trigger: you need a UI pattern that doesn't exist yet.

1. Confirm it's not already there. Run `ls packages/design-system/src/components/ui/` and grep for
   near-synonyms. Re-use beats re-build. **Re-read the composition rule
   above before you touch a colour.**
2. Create `packages/design-system/src/components/ui/<name>.tsx` and export it from
   `packages/design-system/src/index.ts`. Follow the house pattern:
   - `"use client"` only if the component uses state, effects, or context.
   - Built on Base UI primitives (`@base-ui/react/*`) when possible.
   - `data-slot="<name>"` on the root element for styling hooks.
   - `className` merge via `cn()` (`@/lib/utils`).
   - Variant props via `class-variance-authority` when there are >2 variants.
   - Named exports, no default exports.
   - File-level JSDoc header: purpose, API, a11y notes, minimal usage.
3. Wire it into `docs/COMPONENTS.md` (add a row — import snippet + tldr).
4. Add it to its category page under `src/app/design-system/components/`
   so it's visually verifiable on every commit. (The catch-all kitchen sink
   at `src/app/design-system/showcase/` is legacy — new work goes on the
   category page, which is what the docs sidebar links to.)
5. `npm run check` must pass.

---

## Adding a new template / page

1. Compose existing components. No new JSX primitives other than layout
   (`<div>`, `<section>`, `<nav>`, …).
2. If the design calls for something a component can't do, stop. Go to
   "Adding a new component" first. Do not inline-style your way around it.
3. Tokens, not literals. Every colour, font, size, and gap must resolve
   through the token system. `npm run lint:tokens` will enforce this.

---

## Theming

`.dark` class on any ancestor flips the semantic layer to the dark mapping.
Primitives do not change. If a new surface needs a dark variant, add it in
`semantic.css`'s `.dark` block — never conditionalise in component code.

---

## File map

```
packages/design-system/src/   The design system (@apna/design-system)
  components/ui/              Every design-system component lives here.
  styles/
    index.css                 Tailwind wiring: @theme inline + @utility presets
                              (typography, gradients, live-surface interaction).
    tokens/
      primitives.css          Tier 1. Raw scales.
      semantic.css            Tier 2. Intent aliases, light + dark.
  index.ts                    Package exports — add every new component here.
src/
  app/                        Next.js App Router — pages, layouts, route handlers
    globals.css               Thin wrapper: Tailwind layers + imports the package CSS.
    layout.tsx                Root layout: ThemeProvider, TooltipProvider, Toaster, InkProvider.
    (marketing)/              Public homepage + pricing.
    apnahire/                 ApnaHire product (recruiter app, job posting, checkout).
    design-system/            Docs site — foundations + component category pages.
  components/                 Product components (apnahire, onlyrounds, marketing).
  hooks/ lib/ content/        App hooks, utilities, copy/content.
scripts/
  lint-tokens.sh              Token lint (npm run lint:tokens).
docs/
  TOKENS.md                   Every semantic token with its primitive target.
  COMPONENTS.md               Component inventory + API snippets.
AGENTS.md                     ← you are here.
```

---

## 🔒 Quality gates

```bash
npm run lint         # ESLint (syntax, React rules)
npm run lint:tokens  # Token contract (arbitrary values, raw literals)
npm run build        # Next.js production build (type check + compile)
npm run check        # All three. Run this before every commit.
```

### Pre-commit checklist

Before you `git commit`:

- [ ] `npm run check` is green.
- [ ] New components are listed in `docs/COMPONENTS.md`.
- [ ] New semantic tokens are documented in `docs/TOKENS.md`.
- [ ] Any `token-lint-ignore` exception is justified in the PR description.
- [ ] No new `style={{ … }}` props set color / font / spacing.

A PR that uses a raw colour, introduces a component not listed in
`docs/COMPONENTS.md`, breaks `npm run lint:tokens`, or adds a template
without also adding its new components, is a reject.

---

## Simplicity Operating Prompt

*Distilled from John Maeda, "The Laws of Simplicity" (MIT Press).*

### Mandate
Hold every output — interface, copy, flow, document — to one standard: **subtract the obvious, add the meaningful.** When simplicity and completeness conflict, default to less, then earn back complexity only where it clearly pays.

### Method — apply in order

1. **Reduce.** When in doubt, remove. Cut anything that can go without real loss. Be deliberate about *what* you cut. Only once everything removable is gone, apply **SHE**:
   - *Shrink* — make what remains modest; reward attention instead of demanding it.
   - *Hide* — tuck rarely-used complexity away; surface it on demand, not by default.
   - *Embody* — give the few remaining elements enough quality and clarity to carry the weight.

2. **Organize.** Make many appear as few. Run **SLIP**: *Sort* related things together, *Label* the groups plainly, *Integrate* where groups overlap, *Prioritize* so the most important dominates.

3. **Time.** Save the user's time, or make the wait feel shorter. Cut steps; show progress; never make someone wait without feedback.

4. **Learn.** Make the hard thing knowable. Teach through the familiar — analogies, sane defaults, examples, consistent patterns. Don't make users earn basic understanding.

5. **Differences.** Use contrast on purpose. Simplicity only reads against complexity; let a few elements stand out by keeping everything else quiet.

6. **Context.** Mind the periphery. Whitespace, surroundings, and edge cases are not secondary — design them deliberately.

7. **Emotion.** Don't strip warmth in the name of clean. A simple thing can still have character, feeling, and delight. Lean toward more emotion, not sterile minimalism.

8. **Trust.** Earn trust, then simplify by relying on it. Strong defaults, forgiving actions (undo), and predictable behavior let you remove confirmations and clutter.

9. **Failure.** Some things can't be made simple. Don't force it or fake it — name the irreducible complexity and handle it honestly.

10. **The One.** Above all else: subtract the obvious, add the meaningful.

### Keys — where to invest
- **Away.** Relocate complexity rather than delete it. Move advanced options into a menu, a later step, or elsewhere so the main surface stays light.
- **Open.** Prefer transparency. Expose state, explain what's happening; openness makes a complex system feel manageable.
- **Power.** Use less, gain more. Fewer features, lower cost, less effort asked of the user.

### Defaults
- Start from the simplest version that could work; add only on evidence.
- Every addition must justify its weight. If it can't, it goes.
- Prefer one clear path over many possible ones.
- Hide power; never remove it.
- Match the user's existing mental model before introducing a new one.

### Before shipping, check
- [ ] Can anything here be removed without real loss?
- [ ] Is the most important thing the most prominent?
- [ ] Is rare complexity hidden, not deleted?
- [ ] Does it respect the user's time at every step?
- [ ] Does it lean on patterns the user already knows?
- [ ] Did I keep the warmth that makes it worth using?
- [ ] Is any remaining complexity genuinely irreducible — and acknowledged?


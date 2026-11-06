# Poneglyph — Agent & Designer Guide

> Doc index: `docs/README.md`. Stream status + what needs Punna: `docs/status/WORK-STREAMS.md`. Picking up mid-project? Read `docs/start-here/AI-HANDOFF.md` after this file: the
> working context, workflows and what is pending. For "where is X", read
> `docs/start-here/PROJECT-MAP.md` first instead of exploring the repo.

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
  The header's "Login / Sign up" is `emphasis` on every page, with one
  handoff (user call, 2026-10-23): on the homepage, once the hero card's
  green "Login / Sign up" scrolls up behind the top bar, the header's turns
  green in its place and goes back to dark when the hero's returns
  (`useHeroCtaHidden`). Still one green on screen at a time.
  Desktop plan cards, both checkouts, every tab — job tiers, job credits,
  Unlimited, subscriptions, Database, Enterprise (user call, 2026-10-29):
  every CTA is outlined at rest and turns green only while its card is
  hovered or focused, so at most one is green at a time. The recommended
  card stands out by its blue edge instead (`RECOMMENDED_EDGE`). Both come
  from `use-card-hover.tsx` (`useCardHover` / `CardHover`); a new plan card
  uses them, never its own copy.
  **Phone plan cards are the exception** (Sumit's call, 2026-11-03,
  overriding the one-green recommendation; don't revert it): every
  card in a list of plans (both checkouts, every tab) ends in its own green
  "Buy now" ("Contact sales" on Enterprise). A phone has no hover to light
  one up, and a list of cards that all lead to a purchase reads as a list
  of equal choices, not one screen with one action; the Recommended tab and
  blue edge do the standing out. It is only for plan lists on phones:
  every other phone screen, and every desktop surface, keeps one green.
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
   where you pressed. Without it the ink grows from the centre. It also
   gives a touch press on any `ink` / `press` surface a 10ms haptic tick
   where the browser supports vibration (Android; iOS Safari has no API).
   Don't add your own vibrate calls for presses; use `haptic()` only for
   a moment that isn't a press.

Pop-ups close the same way everywhere. `DialogContent` and bottom
`SheetContent` render the **CloseBubble**: a 32px dark translucent disc
with a white X, OUTSIDE the card, 8px above its top-right corner (Figma
"close-button-bubble"). Never add your own close button inside a pop-up,
and don't put `overflow-hidden` on a bottom sheet, because it would clip
the bubble. Round the inner corners instead. Side drawers (right and left
sheets) are panels and keep their inside X. Pass `showCloseButton={false}`
only for a forced choice.

**Every pop-up has the same parts** (user call, 2026-10-23). A
step pop-up (a question, a confirm, a "what changes"):
1. **Header:** one clay object beside the title (`ValueArt` `xs`, see
   docs/reference/CLAY-ILLUSTRATIONS.md), the title, an optional one-line subtitle,
   then a rule (`Separator`) above the content.
2. **Body:** the content; lists and boxes sit under the rule, never
   straight under the subtitle.
3. **Footer:** a rule, then the buttons side by side, on phones too (see
   "CTAs in a pop-up" below). One solid button: green for a
   purchase or "keep" (`default`), solid red (`destructive-solid`) for the
   irreversible last step; the other is `outline`.
4. **The last step** of a flow is a centred confirmation: clay on top
   (`sm`), title, text, one CTA. Never a line icon.
5. **Frame:** `PlanPopup` (dialog from md, bottom sheet on phones, the
   CloseBubble). Plan flows build on it; other product pop-ups match it.
   A plain confirm ("Continue your draft?") is the system `AlertDialog`,
   which draws the same parts (bottom sheet on phones, clay in
   `AlertDialogMedia`, rule, buttons side by side; the
   primary is green `default`, never the dark `emphasis`).

**Menus have one type scale** (user call, 2026-10-29). A menu that opens
from an icon (the job-posting help menu, the profile menu): a popover on
desktop, a bottom sheet on phones, same content in both.
- Group heading / menu title: `text-base font-semibold` ("Contact us",
  "Available credits").
- Its subtext: `text-xs text-muted-foreground` (hours, a note).
- Row label: `text-sm` regular, `text-foreground`. Never bold, never a
  size picked per menu.
- A rule (`Separator`) between the heading block and the rows.
- Icons: one clay object beside the group heading only (40px, from
  `public/images/company/values`); rows keep 20px line icons. An external
  link ends with the small gray `ExternalLink`.
- No "Recommended" or other badges on a row.

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
- **Plans** (bottom bar tile, sidebar link, "View plans" CTAs): how loud
  it is follows `usePlansIngress` (user call, 2026-10-20). Promoted (gold
  tile inside the phone bar, never protruding; on desktop the top bar's
  gold "View plans" — the sidebar's Plans row is always plain, like
  Support, 2026-10-21) only when credits run low (1 job credit or
  fewer, no subscription); a plain item like Database right after a credit
  purchase; with a subscription, "Manage plans" sits with Support. When
  promoted, the plans
  look only — `variant="premium"` Button or BottomNav `featured`, with a
  gold `Coin` carrying the ₹. Not green, not the dark emphasis.
- **Segmented controls** (Tabs default / inverted, ChipTabs,
  SegmentedTabSwitcher): fully rounded track, pill and items. A squared
  pill next to a round one is the same control drawn twice.
- **Phone chip rows**: `MobileChipRow` / `SectionChips`, the self-checkout
  styling.

The phone apna Unlimited card (`MobileUnlimitedCard`) is titled "Unlimited
monthly plan" in both checkouts (user call, 2026-10-30). It is not one of
the plan choices: it has its own "Buy now", and a tap anywhere on it goes
straight to its checkout.

**CTAs in a pop-up — side by side, everywhere** (user call, 2026-10-29).
Every dialog and bottom sheet with two buttons puts them in one row, on
phones too: secondary (`outline`) first, primary last, in equal halves.
Never uneven widths for buttons or cards in a pop-up, unless the pop-up is
an upsell that sizes them on purpose (the exit offer's "No, thanks", the
offer tile's 2:3 from `sm`).
- `AlertDialogFooter` and `PopupFooter` do this. Buttons inside them take
  no width classes (`flex-1`, `w-full`).
- The one exception: a pair where either label doesn't fit half a 320px
  sheet (about 130px: "Keep current plan", "Continue posting") is stacked on
  phones, primary on top: `PopupFooter stack`. Decide it when you build
  the pop-up, by checking at 320px; never let the label's width decide at
  runtime. Prefer a shorter label to a stacked pair.

**The credit balance follows intent** (user call, 2026-10-30). Express
checkout (posting a job, mid-task) shows the balance upfront: the top-bar
chip "💼 4 job credits │ 🤖 1 Premium + AI calling credit" (`AvailableCreditsButton chip`).
Self-checkout and the app bar keep the plain "Available credits" button:
someone browsing plans who sees "15 credits" on the surface may decide not to
buy. Never make the two bars match by copying one into the other.

**Button pairs that stack on phones** (RCA, 2026-10-27): a pair laid out
`flex-col sm:flex-row` gives each button `w-full sm:flex-1`, never bare
`flex-1`. In a column, `flex-1` sets the height basis to 0 and the button
collapsed to its text height on the payment confirmation. Button now pins
`min-h` to every size so it can't recur, but write the pair correctly too.
A size or spacing fix is only done once it's been looked at, at phone
width: a type check passing proves nothing about layout.

Mobile: bottom-fixed bars use `pb-safe` (no padding of their own) or
`pb-safe-<n>` (in place of `pb-<n>`) to clear the home indicator. Inputs use
`text-base md:text-sm` so iOS Safari doesn't zoom on focus.

Toasts appear top-centre (the `Toaster` default). Never move them to the
bottom: on phones that is where the primary CTA lives, and a toast there
blocks it for seconds. Don't toast what the screen already shows (an
applied coupon, a price that just changed).

---

## Phone and desktop are two platforms (user call, 2026-11-02)

Design the phone first, on its own terms. Phone and desktop need not match:
a phone layout may drop, move or restyle what desktop shows (the −% as text
instead of the pill, the 10% said once in a header strip) whenever that
helps the phone. Never copy a desktop pattern onto the phone, or the other
way, just to make them look alike.

What both keep: the design system. The same tokens, primitives and variants,
the same meaning per colour and icon, the same words for the same thing. A
phone-only rule is written down where it applies (here or in the
component's JSDoc), not left as a one-off.

"Same thing, same styling" holds across the two checkouts on one platform
(express phone ↔ self-checkout phone), not across platforms.

**Full screen for tasks, sidebar for workspaces** (2026-11-05, leaning;
see `docs/DECISIONS.md`). A flow with an end (posting a job, checkout,
onboarding) opens without the sidebar. A place recruiters work in and leave
from (a job's candidates, chats, database) keeps it on desktop; phones show
it full screen with a back button. Read `docs/DECISIONS.md` before
reopening a question that is logged there.

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
- **One typeface: Inter, everywhere** (user call, 2026-10-23; back to Inter from Google Sans Flex 2026-10-29).
  Marketing pages, the homepage and the product all use it — headlines,
  section titles, quotes, numbers, body, buttons, nav, forms, footer. There
  is no serif and no italic accent: hero headlines (h1) are plain sentence
  case. `--font-editorial` and `--font-quote` still exist but resolve to the
  same sans, so `SectionHeading`'s levels 1–2, `text-editorial-*` and
  `text-quote*` keep working without a second face.
  - **Hero headline size:** `text-editorial-display`, read from
    `--font-size-display-hero-fluid` — 32px on a phone, 64px from ~1280px
    (2026-10-24). Every marketing hero uses it through `SectionHeading`
    level 1; change the token, never one page.
  - **`withAccent` / `titleAccent`** now only keep the accent phrase on one
    line (`whitespace-nowrap`, e.g. "AI-native"); they add no italic or
    colour. Don't reintroduce an accent style.
  - **Never set a font family by hand** (`font-serif`, inline
    `fontFamily`). `npm run lint:tokens` still refuses the editorial and
    quote presets, and `font-serif`, outside the marketing folders.
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
  page (a CSS rule in the design system's `index.css`);
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

### An aside is "Note:" or italic, never both (user call, 2026-11-02)

A remark beside the main content (a limit like the single city, a
caveat) carries exactly one marker:

- **"Note: …"** in regular text, where there is room for the word. The
  label already draws the eye, so no italic.
- **Italic, no label**, where space is short (inside a card, a phone
  row): "This plan is valid in a single city".

Never "Note:" in italic, and never a plain aside with neither. No icon on
either.

### Explainer copy is ASD-STE100 (user call, 2026-10-29)

Every tooltip, popover and info text that explains a feature, an offer or a
term (the plan cards' feature explainers, "Limited time offer: Database
credits") is written in ASD-STE100 Simplified Technical English:

- One topic per sentence; at most 20 words a sentence (25 if it describes).
- Active voice, simple present tense: "We send your job…", not "Your job
  will be sent…".
- Approved, common words with one meaning each; one name for one thing
  (always "database credits", never also "DB credits" in the same text).
- No "-ing" words as verbs or modifiers ("candidates who match it", not
  "matching candidates"), no contractions, no idioms; keep the articles.
- Address the recruiter as "you"; apna as "we".

- Short: one sentence where it can be, so it reads at a glance.

It opens in the design system's dark `Tooltip` (with its arrow), through
`TapTooltip` (`src/components/apnahire/tap-tooltip.tsx`): a tap or click
opens it, on phones and desktop alike; hover does not. No light popover and
no hand-made tooltip for an explainer. The text that opens it carries no
marker (no underline, no icon) unless the page has nothing else to show it;
then a dotted underline (`decoration-dotted`), as on "Limited time offer:
Database credits" (user call, 2026-10-29).

Labels, buttons and short UI copy keep the rules above (sentence case,
short); this section is for the text that explains.

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
   **Upsell tile widths** (user call, 2026-10-29). Phones: the two tiles
   are equal halves. From `sm`: the offer is wider (2:3), and every fact
   line (validity, database credits) stays on ONE line in both tiles —
   they're `sm:whitespace-nowrap`. When a pair needs more room (plan vs
   plan, "Go annual"), widen the dialog (`OfferDialog wide`); never let a
   fact wrap. 🛑 If asked to change the tile ratio or a dialog's width,
   first check every upsell (Post 3 jobs, Bigger credit pack, Go annual,
   Credits or a plan) at desktop and 375px: if a fact line would wrap, or
   a tile's price row no longer fits, say so before changing it. Extra
   lines put the tiles out of step and make a mess of the layout.
   **Bigger numbers wrap the whole row, never one card.** `CompareAlign`
   (mounted once in the root layout) enforces this at runtime: if one
   card's price row can't hold price, struck price and % tag on one line,
   every card in that row puts the tag on its own line, and each marked
   line takes the row's tallest height. The marks are all it needs, so a
   new comparison surface gets it by carrying them.
7. **The price group reads outward from the price** (user call,
   2026-11-02). Left-aligned price: price → struck price → % off.
   Right-aligned price (phone plan cards): % off → struck price → price, so
   the price sits at the far right. When the group can't fit one line (a
   phone upsell tile, ~130px), the struck price and % move to the next line
   in the same order; never split them from each other.
7a. **A price row is centred** (user call, 2026-11-02). Amount, unit
   ("/month"), struck price and % share one horizontal centre line
   (`items-center`), on every card, tile and platform, never the baseline.
8. **Test at 320px with the longest realistic string.** Check 320, 360 and
   375px, a six-digit price (₹12,99,999) and the longest plan name. If
   anything splits, overflows or misaligns, the layout is wrong, not the
   copy.
9. **Every `whitespace-nowrap` has a narrow fallback** (RCA, 2026-11-06).
   A no-wrap group in a row ("Active for 15 days" beside "Single job
   posting") ran 12px past a 320px screen and the page scrolled sideways.
   When you add `whitespace-nowrap` to something that shares a line, say
   where it goes when the line is too short: under the other side
   (`@container` + `flex-col @2xs:flex-row`, rule 3) or a short label (rule 4).
10. **Decorative layers stay inside the page padding** (RCA, 2026-11-06).
    A glow, halo or ring drawn with a negative inset (`ai-idle`,
    `voice-glow`, `attention-ring`) may reach out at most the page's side
    padding on phones (1rem). The `ai-idle` halo reached 1.5rem, ran 8px
    past every phone screen and zoomed the page out. Nothing shows the
    edge, so you only find it by measuring.
11. **Measure it; don't eyeball it.** `npm run test:e2e` checks every
    checkout and job-posting screen at 375px, 320px and desktop for
    sideways scroll, squashed buttons, level card rows and accessibility.
    Run it before calling a layout change done; when you add a screen or
    state, add it to `e2e/`. A real bug you can't fix yet is a
    `test.fixme("what, where")` plus a line in `docs/status/TODO.md`, never
    a weaker check.

---

## Prices, offers and validity — plan cards and upsells

These hold on every plan card (`PricingCard`, the Unlimited cards, Database
cards) and every upsell tile (`OfferChoice`), both checkouts, light and dark
(user calls, 2026-10-19/20).

1. **The per-unit price is blue** (user call, 2026-11-02): "₹585 /credit",
   "That's just ₹749 /month", on every plan card and upsell tile, phones and
   desktop (`text-info`). Green is kept for the saving (the %).
2. **The claimed 10% is said once, in a banner** (user call, 2026-11-02).
   With the exit offer applied, `ExtraOffBanner` ("Offer claimed · Extra 10%
   off every plan", echoing the pop-up's "Claim offer", with "Ends in
   23:59:12"; `EXTRA_OFF.banner`, never typed by hand; the code FIRST10
   first shows in the order summary, "You save ₹195 with FIRST10") sits under the tabs, right above the plans, 12px from
   them, on phones and desktop, both checkouts; never on Enterprise (no
   discount there). No card and no upsell tile carries an offer line: the
   struck price and the % show the saving, and the order summary lists
   the coupon. The per-unit note stays blue whether or not the offer is
   claimed.
3. **The saving is text, not a pill** (user call, 2026-11-02): "−22%",
   green semibold, after the struck price (`Badge variant="discount"`, now
   bare text; one size set in the Badge). It is the final saving against
   the struck price, the 10% coupon included. The struck price is a step
   larger than the %, since bold reads bigger.
4. **One type scale on every plan card** (user call, 2026-10-22). Plan
   name `text-plan-name`, price `text-plan-price` (phone rows and tiles
   `text-plan-price-compact`), unit and struck price `text-plan-unit` /
   `text-plan-strike` (12px). Job credits, Database, Unlimited /
   Subscription, Enterprise, both checkouts: never a size picked per card,
   never `CardTitle` / `text-h3` for a plan.
5. **Validity always carries the clock.** "Valid for N days" (or "1 job live
   at a time for N days") is shown with the `ClockFading` icon, everywhere:
   in `OfferChoice` pass `validDays` / `term`, never a plain `note`.
   Exception (user call, 2026-10-29): a subscription card on phones
   (`MobileUnlimitedCard`) shows its slot as one line with the briefcase
   icon — "1 job live at a time for N days" in both checkouts — and no separate validity line.
6. **Which upsell tiles show validity.** Self-checkout: both tiles (both are
   packs the recruiter is choosing between). Express checkout: only the
   bundle on offer; the stay tile is the credit this one job needs and has
   no validity of its own. Every pack quote carries its `validDays`.
7. **A rule line closes onto content, never onto nothing.** The separator
   under an upsell tile's price only shows when that tile has details below
   it (validity, database credits, city). Without them it turns transparent
   (it keeps its space so the rows stay level with the partner tile).
8. **One vocabulary for subscription terms** (user call, 2026-10-22).
   Plan names, units and lengths come from `SUBSCRIPTION_TERMS` in
   `src/content/subscriptions.ts` (with `slotTermLabel`, `dbCreditsLabel`,
   `planOrderLabel` / `planOrderPoints`): "Annual plan", "/year", "1 job live
   at a time for 365 days". A term's length is always in days; never
   "yearly", "1 year", "12-months plan" or "3 months". Never type these
   words by hand — and every surface that sells a plan shows its database
   credits (cards, upsell tiles, slots-full pop-up, order summary).
9. **Order-summary add-ons announce themselves once.** As the order summary
   opens, an add-on card (Database in self-checkout, AI calling in express)
   runs the `attention-ring`: a gold → green → sky strip with a glow, two
   eased laps over 3.6s, then it fades. Once per add-on per session
   (`useAttentionRing`), never looping — except AI calling in express
   checkout, which plays on every open (user call, 2026-10-27); reduced motion gets a still edge.
   Render it as `<span aria-hidden className="attention-ring" />` inside a
   `relative` card that doesn't clip (wrap a card that has
   `overflow-hidden`).

10. **A subscriber's current plan never shows an offer** (user call,
   2026-10-23). Wherever their own plan is shown (Manage plan, "Plan
   details", its card on the Plans page marked "Current plan"), the price
   is what they pay (`paid`), with no struck price, % OFF, sale, 10%
   offer line or new-price notice. They may have bought it for more; a
   sale running today is not theirs. Offers stay on the other cards.
   `SubscriptionPlans` does this through `current.price`.
   **Its price is fixed for life** (user call, 2026-10-23): a subscription
   renews at what was bought until it is cancelled (or changed from the
   back end), whatever the price list does — new prices, a plan no longer
   sold (a retired plan). Renewals charge `paid`, never
   today's price, and no "new price" notice is shown for it.

11. **A phone plan card shows its selection with a corner tick** (user call,
   2026-10-30; the radio led the card from 2026-10-29). No radio: the
   selected card takes the green edge and a green corner tab with a white
   tick, flush in its top-right corner; "Recommended" is the same kind of
   tab in the top-left (blue, with the sparkle). Both sit inside the card
   (20px tall; 24px top padding makes room, 12px on cards without a tab; 16px at the bottom). Every card ends in its own green "Buy now", bottom right (user call, 2026-11-03), so cards are 16px apart on every tab,
   both checkouts. Under the name and price, every
   card lists what it includes in one line (no ✕ for what it lacks; a plan
   with nothing extra has no line and no rule); nothing opens or closes. Job cards show no database credits; only the
   Unlimited card does. `MobilePlanRow` and `MobileUnlimitedCard` draw
   this; a new selectable plan card composes them. The other styles (radio, tint, expand on select) were removed
   (2026-11-03).

---

12. **Credits, never rupees, in the job-type explainer** (user call,
   2026-11-03).
   "How job credits work" / "What each job type gets you" shows what a credit
   gets: "1 / 2 / 4 job credits" in the price's place, no ₹ price, struck
   price or %. It sits on the credit packs page: a job's own price there
   makes the recruiter stop and compare "buy 3 credits" with "just buy one
   Classic job", and that doubt costs the pack sale. The card answers "what
   do my credits buy", not "what does a job cost".

13. **Order-summary add-ons show their list price, coupon or not** (user
   call, 2026-11-03; an exception for now). With the exit coupon applied,
   the AI calling add-on still reads ₹1,699 ("Add · ₹1,699" on phones); the
   10% shows only once it is added, in the cart's coupon row. Phones have no
   room for a strike inside the button. Revisit before changing it.

14. **AI calling credits are two things** (user call, 2026-11-03). A
   "Premium + AI calling credit" (the legacy SKU, may be many) posts a
   Premium job with the agent: only the Premium + AI card draws on it. An
   "AI calling add-on credit" (rare, at most one, refunded when a job posted
   with the add-on didn't go through) adds the agent to one job. The order
   summary offers the AI calling add-on on every job type but Premium + AI,
   in every credit case (none, partial, covered), to holders of either. With
   the add-on credit held, the add-on reads "1 credit · from balance"
   and is used from it, never bought; without it, "Add · ₹1,699".

15. **Credits in the price slot are one text style** (user call, 2026-11-03).
   On every plan card and explainer card, phone and desktop, "1 job credit"
   is set whole at the price size, never a big number with a small unit
   ("1 credit" on Premium + AI). On express phone cards it takes the plan
   name's style (`text-plan-name`, `MobilePlanRow priceAsName`), so name
   and credits read as one line. On phone
   credit cards the price says the credits once: no "Consumes N job
   credits" line; the balance status ("Covered by balance", "Buy 1 for
   ₹699") sits on the left under the visibility line. Premium + AI keeps its
   demo call player on phones too, and its "AI calling agent" line rolls
   through the add-on's points (30% higher call pickup, Ready to interview
   candidates, Hindi & English calling), as the desktop block does.

16. **Every plan card state has its CTA** (user call, 2026-11-03). A rule
   made for one state of a card applies to all of them: with credits, the
   phone card ends in a green "Post now" where it would say "Buy now",
   the same place and size. When you change a card, check every state it
   can be in (no credits, partial, covered, offer claimed, Premium + AI)
   on phone and desktop before calling it done.

17. **Order summary order** (user call, 2026-11-03): the main item first,
   then its free items ("10 database credits · Free"), then any add-on (AI
   calling, database credits) in the order added. Phone and desktop alike.

18. **One name for alerts** (user call, 2026-11-03): the WhatsApp icon says
   WhatsApp, so the text never does. Job types: "1x / 2x / 4x alerts to
   candidates" (Premium + AI 2x). Subscriptions and apna Unlimited: "Smart
   alerts to candidates". Phone, desktop, explainers, cancel flow alike.

19. **One name for a slot: "1 job live at a time"** (user call, 2026-11-04).
   Never "active job slot" or "job slot" in copy. With a length: "1 job live
   at a time for 30 days"; plural "3 jobs live at a time". Meters: "Jobs
   live" ("2 of 3 jobs live"). Slot chips name the count only: "1 job · 2
   jobs · 3 jobs". All of it comes from `slotLabel` / `slotTermLabel` in
   `src/content/subscriptions.ts`; never type it by hand.

20. **One button size per place** (user call, 2026-11-04).
   | Where | Size | Height |
   |---|---|---|
   | The one committing action ("Proceed to pay", "Subscribe") | `xl` | 48 |
   | Pop-up and flow buttons (every footer, `AlertDialog` too) | `lg` | 40 |
   | Desktop plan / pricing card CTA | `card` | 40, 14 semibold |
   | Inline in a banner or row (Renew now, the add-on's Add) | `default` | 36 |
   | Phone plan cards, top bars, toolbars | `sm` | 32 |
   Never stretch a size with `h-*`; pick the one for the place.
   **One weight for every button** (user call, 2026-11-04): all sizes and variants,
   `link` and `link-inline` included, are semibold. Never set a button weight by hand.

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
3. Wire it into `docs/reference/COMPONENTS.md` (add a row — import snippet + tldr).
4. Add it to its category page under `src/app/design-system/components/`
   so it's visually verifiable on every commit. (The catch-all kitchen sink
   at `src/app/design-system/showcase/` is legacy — new work goes on the
   category page, which is what the docs sidebar links to.)
5. `npm run check` must pass.

A **product** component (`src/components/apnahire|marketing|auth|onlyrounds`)
skips steps 2–4: add an entry to `src/app/design-system/product/catalog.ts`
(what, where, rules), and if it's a pop-up, a live demo on
`/design-system/product/pop-ups`.

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
docs/                         Index: docs/README.md
  start-here/                 AI-HANDOFF.md, PROJECT-MAP.md (read first)
  reference/                  TOKENS.md, COMPONENTS.md, PRICING.md, clay style
  status/                     TODO.md, FIGMA-SYNC-STATUS.md, review boards
  history/                    Past sessions, audits, plans (read-only)
AGENTS.md                     ← you are here.
```

---

## 🔒 Quality gates

```bash
npm run lint         # ESLint (syntax, React rules)
npm run lint:tokens  # Token contract (arbitrary values, raw literals)
npm run build        # Next.js production build (type check + compile)
npm run check        # All three. Run this before every commit.
npm test             # Unit tests (bill, credit plan, rate limit)
npm run test:e2e     # Browser tests: layout + accessibility, phone and desktop (starts its own server on :3100)
npm run test:visual  # Screenshot comparisons, local only (macOS baselines); --update-snapshots after an intended change
```

GitHub runs all of these except `test:visual` on every push to main and
every PR (`.github/workflows/check.yml`).

### Pre-commit checklist

Before you `git commit`:

- [ ] `npm run check` is green.
- [ ] A UI change: `npm run test:e2e` is green (and `test:visual`, with baselines updated only for intended changes).
- [ ] New components are listed in `docs/reference/COMPONENTS.md`.
- [ ] New semantic tokens are documented in `docs/reference/TOKENS.md`.
- [ ] Any `token-lint-ignore` exception is justified in the PR description.
- [ ] No new `style={{ … }}` props set color / font / spacing.

A PR that uses a raw colour, introduces a component not listed in
`docs/reference/COMPONENTS.md`, breaks `npm run lint:tokens`, or adds a template
without also adding its new components, is a reject.

---

## Working rules for AI agents (Punna, 2026-11-04)

**Models and agents — save tokens.**
- Split work across subagents. Low-end tasks (searching, reading files, screenshots and
  captures, bulk renames or copy sweeps, simple checks) run on **Haiku or Sonnet**.
- **Opus at default effort** is the main session: plans, decides, reviews the subagents' work.
- Before using **Opus at medium or high effort**, ask Punna first and say why.
- Keep progress in a file (e.g. `docs/status/FIGMA-SYNC-STATUS.md`) so a new chat can resume from it.
- **Look up before you explore.** "Where is X" → `docs/start-here/PROJECT-MAP.md`, then
  `graphify query "…"`; only then grep. Read the section you need, not whole files.
- **Independent subagents go out in one message** so they run in parallel; give each a
  short brief and ask for a short reply (counts, paths), not file dumps.

**Inputs — structure multi-part requests first.**
- When Punna's message holds several asks (or arrives in pieces mid-task), first restate it as
  a numbered list of parts, each one task with what "done" means. Work through the parts and
  report back against the same numbers. Ask only where a part is genuinely unclear.

**Decisions — log the why** (Punna, 2026-11-05).
- Every design or product decision made in a session (chose X over Y, kept
  or dropped a pattern, picked a threshold) goes into `docs/DECISIONS.md`
  the same turn: the question, the decision, the reason, what would change
  it, and its status (Decided / Leaning / Open). Newest first.
- Before proposing a change, check `docs/DECISIONS.md`. If the idea is
  already logged, start from that entry and say so.

**Replies — summarize, then organize.**
- Every reply is summarized and organized before it is sent: the outcome first, then grouped
  points (short headings, tables or lists), then what is left or not verified.

---

## Choice and emphasis — Hick's law and the Von Restorff effect

Two laws behind the "one primary CTA" rule. Use them when you decide how
many actions a screen shows and which one stands out.

**Hick's law.** The more options someone sees at once, the longer they take
to choose. Decision time grows roughly with the logarithm of the number of
choices (W. E. Hick, 1952). It also shows up as hesitation: when two buttons
look equally important, the user has to stop and work out which one is
theirs.

**Von Restorff effect (isolation effect).** People notice and remember the
one item that looks different from everything around it (Hedwig von
Restorff, 1933). A design can use this on purpose: make one thing stand out
and keep the rest quiet.

**Together:** keep competing choices few (Hick), and make the one that
matters the one that stands out (Von Restorff).

Worked example: the express order summary with the AI calling add-on.
- ❌ Two loud buttons, "Add AI calling agent" in a purple gradient and
  "Proceed to pay" in green. The eye has two places to land, and the
  gradient is the most distinctive thing on the page, so it takes the
  attention meant for paying.
- ✅ Green "Proceed to pay" is the one standout; the add-on is the quiet
  dark `emphasis` companion. The choice takes almost no thought: pay, or
  optionally add.

How to apply:
1. Count the actions competing for the same moment. If more than one looks
   primary, demote, group or hide the rest (`emphasis`, `outline`, `ghost`,
   a menu, a later step).
2. Give a screen exactly one isolated element: the primary action. A
   unique colour, gradient, glow or animation on anything else (an upsell,
   an add-on, a badge) steals that isolation. Add-ons announce themselves
   once (`attention-ring`) and then go quiet.
3. In reviews, ask "where does the eye land first?" If the answer isn't
   the thing we want done, the emphasis is wrong.

Caveat: Hick's law was measured on simple reaction tasks. In interface
design it guides the direction, not exact numbers.

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


### AI elements share one look (user call, 2026-11-06)

Anything the AI made or judged (AI match, AI summaries, AI screening, AI
suggestions) wears the AI look: a `Sparkles` icon in sky (`text-info`) and,
for a panel or avatar, the AI gradient (`bg-gradient-ai`, the AI calling
sky). Never violet, green or a product gradient for AI. Keep it small (a
panel, a tag, an icon): on every card a large gradient stops standing out.
A sparkle that means "Recommended" is not AI and keeps its own style.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

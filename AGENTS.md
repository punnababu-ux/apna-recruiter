# Poneglyph — Agent & Designer Guide

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
  page different; change it everywhere or not at all.

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
| `ink` | While pressed, an ink spreads from the touch point, then fills the surface and fades into the hover state | Button, Toggle, ToggleGroup, ChipTabs, SegmentedTabSwitcher, TabsTrigger, menu + select items, SidebarMenuButton, BottomNav, clickable PricingCard |
| `press` / `press-subtle` | Compresses while held (`--press-scale`, `--press-scale-subtle` for cards) | Buttons, chips, checkbox, radio, switch |
| `transition-interactive` | Colour, border, shadow, focus ring and transform ease (`--duration-hover`) | Every interactive primitive |
| `transition-select` | Selection lands with a slight spring (`--duration-select`, `--ease-select`) | Checkbox tick, radio dot, switch thumb, chevrons |
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

Mobile: bottom-fixed bars use `pb-safe` (no padding of their own) or
`pb-safe-<n>` (in place of `pb-<n>`) to clear the home indicator. Inputs use
`text-base md:text-sm` so iOS Safari doesn't zoom on focus.

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


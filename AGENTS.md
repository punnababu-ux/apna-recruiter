# Poneglyph — Agent & Designer Guide

This file is the contract for any AI agent or designer working in this
repository. Read it before you generate code. The rules are short and they
are strict.

---

## The one rule

**Compose from existing components and tokens. Never style from scratch.**

If what you need does not exist in `src/components/ui/`, you **build the
component first**, commit it, and *then* use it in a template or page.
You never reach for raw Tailwind values, raw colors, raw sizes, raw
spacing on ad-hoc JSX.

---

## 🛑 Strict mode — the non-negotiables

These are enforced by `npm run lint:tokens` and block CI. Don't argue with
the script; fix the violation.

**Scope.** The lint runs over `src/app/**` and `src/components/**`, **excluding
`src/components/ui/**`**. The `ui/` folder is the design system itself —
vetted shadcn/Base UI primitives that occasionally need arbitrary Tailwind
values for third-party DOM (`[&_.recharts-*]` selectors, CSS system colors
like `bg-[Canvas]`, native-control ring widths). Changes there go through
design-system review. Everywhere else — pages, templates, any component you
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
| Padding / margin      | T-shirt: `p-xs` · `p-sm` · `p-md` · `p-lg` · `p-xl`     |
| Padding / margin      | Context: `p-inset` · `p-inline` · `p-stack`             |
| Padding / margin      | Numeric: `p-1 … p-64` (sanctioned steps only)           |
| Gap                   | `gap-inline` · `gap-stack` · `gap-md` · `gap-6`         |
| Radius                | `rounded-xs` · `rounded-sm` · `rounded-md` · `rounded-lg` · `rounded-xl` · `rounded-2xl` · `rounded-full` |
| Duration              | `duration-150` · `duration-200` · `duration-300`        |

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
Tier 1 — Primitives   src/styles/tokens/primitives.css
   raw atoms: color ramps, type scale, weight 100–900, size steps,
   radius scale, motion, shadow, z-index, breakpoints
   NEVER consumed by components

Tier 2 — Semantics    src/styles/tokens/semantic.css
   intent aliases:
     colour roles      (--background, --primary, --destructive, …)
     font roles        (--font-body, --font-heading, --font-mono)
     weight roles      (--font-weight-regular … --font-weight-extrabold)
     size roles        (--text-xs … --text-6xl)
     spacing t-shirt   (--space-2xs … --space-5xl)
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
   - ✅ `p-md`, `p-inset`, `gap-stack`, `gap-6`.
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

---

## Composition over re-invention — the tier-0 rule

**Before adding any tone / variant / colour-carrying style, ask: is there
already a primitive in `src/components/ui/` that does this, and what variant
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
2. Add the tone to the primitive in `src/components/ui/<primitive>.tsx`.
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

## Adding a new component

Trigger: you need a UI pattern that doesn't exist yet.

1. Confirm it's not already there. Run `ls src/components/ui/` and grep for
   near-synonyms. Re-use beats re-build. **Re-read the composition rule
   above before you touch a colour.**
2. Create `src/components/ui/<name>.tsx`. Follow the house pattern:
   - `"use client"` only if the component uses state, effects, or context.
   - Built on Base UI primitives (`@base-ui/react/*`) when possible.
   - `data-slot="<name>"` on the root element for styling hooks.
   - `className` merge via `cn()` (`@/lib/utils`).
   - Variant props via `class-variance-authority` when there are >2 variants.
   - Named exports, no default exports.
   - File-level JSDoc header: purpose, API, a11y notes, minimal usage.
3. Wire it into `docs/COMPONENTS.md` (add a row — import snippet + tldr).
4. Add it to the showcase page (`src/app/page.tsx`) so it's visually
   verifiable on every commit.
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
src/
  app/                      Next.js App Router — pages, layouts, route handlers
    globals.css             Orchestrator. Tailwind + @theme wiring + @utility presets.
                            Do not add token values here.
    layout.tsx              Root layout. Wraps with TooltipProvider + Toaster.
    page.tsx                Showcase / visual regression index.
  components/
    ui/                     Every design-system component lives here.
  hooks/                    Cross-cutting React hooks.
  lib/
    utils.ts                `cn()` helper. Add cross-cutting utilities here.
  styles/
    tokens/
      primitives.css        Tier 1. Raw scales.
      semantic.css          Tier 2. Intent aliases, light + dark.
scripts/
  lint-tokens.sh            Token lint — blocks CI on arbitrary values.
docs/
  TOKENS.md                 Every semantic token with its primitive target.
  COMPONENTS.md             Component inventory + API snippets.
AGENTS.md                   ← you are here.
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


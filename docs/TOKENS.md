# Tokens

Poneglyph exposes two tiers. **Components consume Tier 2 only.**

```
Tier 1 — Primitives   raw atoms          src/styles/tokens/primitives.css
Tier 2 — Semantics    intent aliases     src/styles/tokens/semantic.css
```

---

## Modular scales · the two-knob system

Two of our primitive ramps — **type** and **radius** — are generated from a
base + ratio pair instead of hard-coded values. That means re-theming the
entire system's rhythm is a **two-line change**.

### Typography scale

```css
--font-size-base:  1rem;   /* anchor (md step, body copy)                 */
--font-size-ratio: 1.2;    /* geometric multiplier between steps          */
```

Every `--font-size-*` step is computed from these. Want a tighter, denser UI?
`--font-size-ratio: 1.125;`. Want editorial drama? `1.25` or `1.333`.

Common ratios:

| Ratio   | Name           | Feel                               |
|---------|----------------|------------------------------------|
| 1.125   | Minor second   | Dense dashboards, data-heavy UI    |
| 1.2     | Minor third    | General-purpose (current default)  |
| 1.25    | Major third    | Editorial, marketing               |
| 1.333   | Perfect fourth | Display-heavy, hero-driven layouts |

The `2xs` and `xs` steps are rounded to `0.625rem` / `0.75rem` instead of
computed — fractional pixels at small sizes render poorly. The `5xl` and `6xl`
steps use a wider `1.333` bump on top of `4xl` for display drama.

### Radius scale

```css
--radius-base:  0.5rem;  /* anchor (md step)                              */
--radius-ratio: 1.25;    /* geometric multiplier between steps            */
```

Every `--radius-*` step is computed. Want a sharper brand? Drop `--radius-base`
to `0.25rem`. Softer? Bump `--radius-ratio` to `1.4`. `--radius-none` and
`--radius-full` are intentionally off the ramp — they're discrete behaviours
(square, pill).

### Retuning in practice

Both scales can be retuned *without* touching a single component. Change the
two pairs of lines in `primitives.css`, reload, and the whole system re-themes.
Try the live demo on the showcase page (`#modular-scales`) — it binds the
ratios to sliders so you can watch the system breathe.

---

## Tier 1 · Primitives

### Color ramps

Each hue has a 12-step ramp (`50 → 950`, plus `0` and `1000` on the neutral
ramp). Authored in OKLCH for perceptually-uniform progression.

| Ramp      | Purpose                                        | Steps     |
|-----------|------------------------------------------------|-----------|
| gray      | neutral workhorse — surfaces, text, borders    | 0 – 1000  |
| red       | destructive / error                            | 50 – 950  |
| green     | success                                        | 50 – 950  |
| amber     | warning                                        | 50 – 950  |
| blue      | info / accent option                           | 50 – 950  |
| apna-royal | marketing hero / inverted surfaces             | 600 – 950 |

**Alpha neutrals** (`--color-alpha-black-*`, `--color-alpha-white-*`) are
used for overlays, dividers, focus rings on dark backdrops.

### Non-color scales

| Token family              | Range                                  |
|---------------------------|----------------------------------------|
| `--radius-*`              | `none, xs, sm, md, lg, xl, 2xl, 3xl, full` |
| `--font-family-*`         | `sans, mono, serif` (serif reserved)   |
| `--font-size-*`           | `2xs … 6xl`                            |
| `--line-height-*`         | `tight, snug, normal, relaxed, loose`  |
| `--font-weight-*`         | literal `100, 200, 300, … 900`         |
| `--letter-spacing-*`      | `tighter … widest`                     |
| `--shadow-*`              | `xs, sm, md, lg, xl, 2xl, inner`       |
| `--duration-*`            | `instant, 75, 100, 150, 200, 300, 500, 700, 1000` (ms) |
| `--ease-*`                | `linear, standard, emphasis, decel, spring` |
| `--z-*`                   | `hide, base, docked, dropdown, sticky, overlay, modal, popover, toast, tooltip, debug` |
| `--breakpoint-*`          | `sm, md, lg, xl, 2xl`                  |

---

## Tier 2 · Semantics

Every token below is an **alias** pointing at a primitive. The dark theme
remaps the same names to different primitives — primitives themselves never
change between themes.

### Surfaces

| Token                    | Light target       | Dark target         | Intent                          |
|--------------------------|--------------------|---------------------|---------------------------------|
| `--background`           | gray-0             | gray-950            | page background                 |
| `--foreground`           | gray-950           | gray-50             | primary text                    |
| `--card`                 | gray-0             | gray-900            | elevated container              |
| `--card-foreground`      | gray-950           | gray-50             | text on card                    |
| `--popover`              | gray-0             | gray-900            | floating surface                |
| `--popover-foreground`   | gray-950           | gray-50             | text on popover                 |
| `--surface-inverted`     | apna-royal-900     | apna-royal-950      | inverted hero / marketing banner|
| `--surface-inverted-fg`  | gray-0             | gray-0              | text on inverted surface        |
| `--surface-checkout-hero-fg`       | gray-900 | gray-50  | text on the checkout-hero gradient (see Gradients) |
| `--surface-checkout-hero-fg-muted`| gray-500  | gray-400 | helper text on the checkout-hero gradient |
| `--surface-checkout-track`        | gray-100  | gray-800 | pricing-hero tab-selector track background |
| `--surface-checkout-track-border` | gray-200  | gray-700 | pricing-hero tab-selector track border |

### Roles

| Token                    | Light            | Dark             | Intent                            |
|--------------------------|------------------|------------------|-----------------------------------|
| `--primary`              | gray-900         | gray-200         | high-emphasis action              |
| `--primary-foreground`   | gray-50          | gray-900         | text/icon on primary              |
| `--secondary`            | gray-100         | gray-800         | medium-emphasis action            |
| `--secondary-foreground` | gray-900         | gray-50          | text/icon on secondary            |
| `--muted`                | gray-100         | gray-800         | low-emphasis surface              |
| `--muted-foreground`     | gray-500         | gray-400         | helper text                       |
| `--accent`               | gray-100         | gray-800         | hover / selection                 |
| `--accent-foreground`    | gray-900         | gray-50          | text on accent                    |

### Gradients

Composed from primitives only, exposed as `bg-gradient-<name>` utilities
(globals.css). Fixed across themes unless noted otherwise.

| Token                       | Composition                                                        | Intent                                          |
|------------------------------|---------------------------------------------------------------------|--------------------------------------------------|
| `--gradient-checkout-hero`  | Light: radial blooms (apna-gold-100, apna-navy-100, apna-sky-100/50) over a gray-0→gray-100 diagonal. Dark: soft alpha-white glows over a gray-950→gray-800 diagonal (an original dark treatment — the source has no dark design) | ambient mesh background for the self-checkout / pricing page (`bg-gradient-checkout-hero`), pairs with `--surface-checkout-hero-fg(-muted)` / `--surface-checkout-track(-border)` |
| `--gradient-checkout-unlimited` | `linear-gradient(180deg, apna-plum-800 → apna-plum-900 → apna-plum-950)` | dark noir card background for the "apna Unlimited" promo banner (`bg-gradient-checkout-unlimited`) — fixed across themes, it's a deliberately-dark card in both. Pair with `--surface-inverted-fg` for its (white) text and `--checkout-unlimited-border(-hover)` / `--checkout-unlimited-cta(-hover)` for its border/CTA |

### Checkout brand

`--color-apna-green` is now anchored at the self-checkout source's exact
green (#1F8268 at the 600 step), so these tokens point straight at the
primitive ramp rather than a separate duplicate. They stay their own
tokens (not plain aliases of `--primary`/`--success`) because they're
FIXED across themes — a "marketing surface" like the hero gradient —
while `--primary`/`--success` brighten one step in dark mode
(apna-green-500).

| Token                          | Light                  | Dark                    | Intent                                    |
|---------------------------------|-------------------------|--------------------------|--------------------------------------------|
| `--checkout-primary`           | apna-green-600 (#1F8268) | apna-green-600 (fixed) | checkout CTAs |
| `--checkout-primary-hover`     | apna-green-700 (#186954) | apna-green-700 (fixed) | checkout CTA hover |
| `--checkout-primary-foreground`| gray-0                 | gray-0                   | text/icon on checkout-primary             |
| `--checkout-discount-fg`       | checkout-discount-fg (#166534) | apna-green-400     | itemized discount-row text (drawer, cards)|
| `--checkout-discount-bg`       | apna-green-100          | apna-green-900           | discount pill background                  |

### Status

Each status role has `--<role>`, `--<role>-foreground`, and a `-subtle`
variant for quiet badges and banners.

| Role          | Light (`--role`) | Subtle           | Dark (`--role`) | Dark subtle      |
|---------------|------------------|------------------|-----------------|------------------|
| destructive   | red-600          | red-50           | red-400         | red-950          |
| success       | green-600        | green-50         | green-400       | green-950        |
| warning       | amber-500        | amber-50         | amber-400       | amber-950        |
| info          | blue-600         | blue-50          | blue-400        | blue-950         |

### Lines

| Token      | Light          | Dark                  | Intent                |
|------------|----------------|-----------------------|-----------------------|
| `--border` | gray-200       | alpha-white-10        | hairlines, separators |
| `--input`  | gray-200       | alpha-white-15        | input outlines        |
| `--ring`   | gray-400       | gray-500              | focus indicator       |

### Sidebar

A self-contained sub-surface with its own role tokens. Use these when
building inside a `<Sidebar>` — they are mapped separately from the main
surface so the sidebar can be re-themed independently.

`--sidebar`, `--sidebar-foreground`, `--sidebar-primary`,
`--sidebar-primary-foreground`, `--sidebar-accent`,
`--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`.

### Charts

`--chart-1 … --chart-5`. Addressed by slot, not hue — do not reason about
"green" or "red" here. The ramp is ordered by emphasis.

### Radius

Two tiers are available:

**Size tier** — the primitive ramp exposed as Tailwind utilities.
`rounded-xs`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`,
`rounded-2xl`, `rounded-3xl`, `rounded-none`, `rounded-full`.

**Intent tier** — semantic roles. **Prefer these in new code.**

| Token               | Default target    | Utility             | Intent                               |
|---------------------|-------------------|---------------------|--------------------------------------|
| `--radius-field`    | `--radius-sm`     | `rounded-field`     | Inputs, selects, textareas           |
| `--radius-control`  | `--radius-md`     | `rounded-control`   | Buttons, chips, toggles              |
| `--radius-surface`  | `--radius-lg`     | `rounded-surface`   | Cards, popovers, menus               |
| `--radius-overlay`  | `--radius-xl`     | `rounded-overlay`   | Dialogs, sheets, drawers             |
| `--radius-hero`     | `--radius-2xl`    | `rounded-hero`      | Marketing blocks, splashes           |
| `--radius-pill`     | `--radius-full`   | `rounded-pill`      | Avatars, pill buttons, capsules      |

`--radius` (legacy alias to `--radius-lg`) is retained for shadcn internals;
prefer the intent tier when you author new components.

### Typography

Three orthogonal groups. Components read these, never the primitives.

#### Family roles

| Token            | Default target        | Intent                                  |
|------------------|-----------------------|-----------------------------------------|
| `--font-body`    | `--font-family-sans`  | Default body text                       |
| `--font-heading` | `--font-family-sans`  | Titles — re-alias to decouple from body |
| `--font-mono`    | `--font-family-mono`  | Code, kbd, data                         |

Tailwind utilities: `.font-body`, `.font-heading`, `.font-mono`.
Heading elements (`h1–h6`) inherit `.font-heading` + `semibold` automatically
from the base layer.

#### Weight roles

| Token                     | Default target          | Tailwind utility    |
|---------------------------|-------------------------|---------------------|
| `--font-weight-regular`   | `--font-weight-400`     | `.font-regular`     |
| `--font-weight-medium`    | `--font-weight-500`     | `.font-medium`      |
| `--font-weight-semibold`  | `--font-weight-600`     | `.font-semibold`    |
| `--font-weight-bold`      | `--font-weight-700`     | `.font-bold`        |
| `--font-weight-extrabold` | `--font-weight-800`     | `.font-extrabold`   |

To shift the whole app to a lighter feel (e.g. *"regular → 300"*), change
**one line** in `semantic.css`: `--font-weight-regular: var(--font-weight-300);`

#### Size roles

Aliases to the primitive size scale, named to match Tailwind's `.text-*`
utility convention.

| Token         | Primitive target      | Utility      |
|---------------|-----------------------|--------------|
| `--text-2xs`  | `--font-size-2xs`     | `.text-2xs`  |
| `--text-xs`   | `--font-size-xs`      | `.text-xs`   |
| `--text-sm`   | `--font-size-sm`      | `.text-sm`   |
| `--text-base` | `--font-size-md`      | `.text-base` |
| `--text-lg`   | `--font-size-lg`      | `.text-lg`   |
| `--text-xl`   | `--font-size-xl`      | `.text-xl`   |
| `--text-2xl`  | `--font-size-2xl`     | `.text-2xl`  |
| `--text-3xl`  | `--font-size-3xl`     | `.text-3xl`  |
| `--text-4xl`  | `--font-size-4xl`     | `.text-4xl`  |
| `--text-5xl`  | `--font-size-5xl`     | `.text-5xl`  |
| `--text-6xl`  | `--font-size-6xl`     | `.text-6xl`  |

#### Typography presets (composite utilities)

For common blocks of text, use a preset — it bundles family + size + weight
+ line-height + tracking in a single class. Defined in `globals.css` via
`@utility` so they flow through the same semantic tokens.

| Preset utility   | Intent                                 |
|------------------|----------------------------------------|
| `.text-display`  | Hero / marketing display               |
| `.text-h1`       | Page-level title                       |
| `.text-h2`       | Section title                          |
| `.text-h3`       | Subsection                             |
| `.text-h4`       | Minor heading                          |
| `.text-h5`       | Small heading                          |
| `.text-h6`       | Smallest heading                       |
| `.text-body`     | Default paragraph                      |
| `.text-body-sm`  | Secondary paragraph / compact UI copy  |
| `.text-caption`  | Helper text, footnotes                 |
| `.text-overline` | Eyebrow / kicker (uppercase, tracked)  |

Prefer presets when the text fills a *role*. Reach for atomic utilities
(`font-heading font-semibold text-2xl`) only when you genuinely need a
one-off.

### Spacing

Three layers. Use them in this order of preference:

1. **Context roles** — describe *what* is being separated. Best intent.
2. **T-shirt sizes** — generic "small / medium / large" when no specific role fits.
3. **Numeric steps** — the underlying Tailwind scale, available when you need a precise rhythm.

#### Primitive steps

Tailwind's `--spacing` base plus named primitives. Odd multiples (7, 9, 11, 13)
are deliberately omitted — stay on the even grid.

| Token           | Pixel value | Tailwind class  |
|-----------------|-------------|-----------------|
| `--space-0`     | 0           | `p-0`           |
| `--space-px`    | 1 px        | `p-px`          |
| `--space-0-5`   | 2 px        | `p-0.5`         |
| `--space-1`     | 4 px        | `p-1`           |
| `--space-2`     | 8 px        | `p-2`           |
| `--space-3`     | 12 px       | `p-3`           |
| `--space-4`     | 16 px       | `p-4`           |
| `--space-5`     | 20 px       | `p-5`           |
| `--space-6`     | 24 px       | `p-6`           |
| `--space-8`     | 32 px       | `p-8`           |
| `--space-10`    | 40 px       | `p-10`          |
| `--space-12`    | 48 px       | `p-12`          |
| `--space-16`    | 64 px       | `p-16`          |
| `--space-20`    | 80 px       | `p-20`          |
| `--space-24`    | 96 px       | `p-24`          |
| `--space-32`    | 128 px      | `p-32`          |
| `--space-40`    | 160 px      | `p-40`          |
| `--space-48`    | 192 px      | `p-48`          |
| `--space-56`    | 224 px      | `p-56`          |
| `--space-64`    | 256 px      | `p-64`          |

#### T-shirt aliases

| Token         | Target       | Utility        |
|---------------|--------------|----------------|
| `--space-2xs` | `--space-1`  | `p-2xs`, `gap-2xs` |
| `--space-xs`  | `--space-2`  | `p-xs`         |
| `--space-sm`  | `--space-3`  | `p-sm`         |
| `--space-md`  | `--space-4`  | `p-md`         |
| `--space-lg`  | `--space-6`  | `p-lg`         |
| `--space-xl`  | `--space-8`  | `p-xl`         |
| `--space-2xl` | `--space-12` | `p-2xl`        |
| `--space-3xl` | `--space-16` | `p-3xl`        |
| `--space-4xl` | `--space-24` | `p-4xl`        |
| `--space-5xl` | `--space-32` | `p-5xl`        |

#### Context roles (preferred)

| Token             | Target        | Intent                                           |
|-------------------|---------------|--------------------------------------------------|
| `--space-inline`  | `--space-xs`  | between siblings on a row (icon → label)         |
| `--space-stack`   | `--space-md`  | between stacked blocks inside a section          |
| `--space-field`   | `--space-sm`  | between label / control / help text              |
| `--space-inset`   | `--space-md`  | padding inside a contained surface               |
| `--space-section` | `--space-2xl` | between top-level page sections                  |
| `--space-page`    | `--space-3xl` | page gutter / max breathing room                 |

Use `gap-inline`, `p-inset`, `gap-stack`, etc. These read as intent and shift
globally if the system's rhythm is re-aliased.

---

## How to add a token

1. **Adding a semantic alias** — most common. Add a line to `semantic.css`
   and its dark counterpart. Every value points to an existing primitive.
   Document the intent in a leading comment.
2. **Adding a primitive step** — rare. A new step on an existing ramp:
   add to `primitives.css`, no component changes needed unless you then
   alias it.
3. **Adding a primitive hue** — system-level. Requires a design discussion,
   not just a code PR. Ramps should land with all 11 steps (50–950).

Raw literals inside `src/components/**` or `src/app/**` are a CI-level
reject.

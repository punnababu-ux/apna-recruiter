# AI handoff — marketing site & design system (as of 2026-10-17)

Read `AGENTS.md` first (the contract). This file is the working context a
new session needs to pick up where the last one stopped.

## Who and how

- **Punna** (product designer, apna) drives; you design and build. Work in
  small steps, verify in the browser, push each verified change.
- **Repo / branch:** worktree `.claude/worktrees/rebuy-banner-design-461cc8`,
  branch `claude/cloud-account-token-issue-f898f5`. Push straight to main by
  fast-forward:
  `git fetch -q origin && git rebase -q origin/main && git push -q origin HEAD:claude/cloud-account-token-issue-f898f5 --force-with-lease && git push -q origin HEAD:main`
- **Before every commit:** `npm run check` (lint + lint:tokens + build).
  Commit trailer: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Dev server:** `preview_start {name: "apna-recruiter-dev"}` → port 3002.
  The browser pane often doesn't paint transitions — verify with
  `javascript_tool` (computed styles, `getAnimations()`), screenshot after
  a wait; jump to sections with `scrollIntoView`, not wheel scroll.
- **Code style:** no semicolons, ~120 cols, double quotes. There is no
  prettier config — if you run prettier use `--no-semi --print-width 120`.
- **zsh gotchas:** never name a loop variable `path`; `$t` with spaces is
  not word-split; `--include=*.tsx` globs fail (quote it or drop it).

## Copy source

- Marketing copy comes from the Lovable prototype **apnatime.lovable.app**
  (single-page app: About / News / Customer Stories views open from the
  header menus on hover, no URLs; data is also in its `routes-*.js` bundle).
- Lounge copy: **interview-coach-ai-05.lovable.app**.
- Product copy: **employer.apna.co**.
- Never invent copy or present condensed lines as someone's quote. Copy
  lives in `src/content/*.ts`.

## Visual language (all in AGENTS.md → "Marketing pages — the visual language")

- **Hero:** `HeroChip` (icon that matches the label), never an eyebrow; no
  stats repeated in heroes. Section eyebrows are gray.
- **Serif:** Playfair Display only for hero h1, section h2, quotes —
  automatic via `data-voice="editorial"` + `SectionHeading`. Numbers are
  Inter. `lint:tokens` blocks the serif outside marketing folders.
- **Colour:** each product owns a gradient (Smart Jobs sky, AI Calling
  green, Database plum, Unlimited gold — `apna-*` ramps, sky re-anchored on
  the logo `#83BDE4` at 300). A product page wears its colour header to
  footer (`data-product` + `data-product-canvas`). Company pages use the
  "mother" gradient (`bg-gradient-checkout-hero`); exceptions: stacking
  cards cycle the four suite gradients by index; By the numbers' stats card
  is green.
- **Section rhythm:** hero (gradient) → white → gradient → white… never two
  alike in a row; product pages exempt (single tone, frosted cards).
- **Cards follow their band:** `surface-frosted` (grid/list cards) and
  `surface-feature` (the one standout card) — frosted on gradient, muted /
  gradient+elevated on white. Never hand-mix `bg-card/70 backdrop-blur`.
- **One contact band:** rendered by `src/app/(marketing)/layout.tsx` above
  the footer on every page. Overrides: `ContactSection title="…"` (Culture)
  or `ClosingBand` (Join us → open roles); either marks
  `data-closing-band` and the layout skips the shared band. So each page's
  last band must be white.
- No hanging content: stats live in an anchored card (`StatGrid`), lone
  lines fold into the section they introduce.

## Shared marketing building blocks

`src/components/marketing/`:
- `page-blocks.tsx` — `PageHero`, `HeroChip`, `withAccent`, `StatGrid`
  (`size` default|lg|facts, `tone`), `StackCard` (`index` → gradient;
  `watermark` or `art`), `deckPosition`, `StatementBand`, `ClosingBand`,
  `PersonCard` (row|card), `CompanyMark`.
- `value-art.tsx` — 3D clay pictures by name; `READY` set lists the ones
  whose PNG exists, others show an icon stand-in.
- `feature-showcase.tsx` — `ProgressAccordion` + picture that follows.
- `moment-carousel.tsx` — Lounge hero carousel.
- `product-page.tsx`, `product-illustrations.tsx` (`IllustrationTile`,
  `ILLUSTRATION_TONE`, `PRODUCT_KEY`, `TrustIllustration`).
- Design system additions this stretch: `ProgressAccordion`, editorial
  type presets (`text-editorial-*`, `text-quote`, `-md`, `-lg`),
  `text-watermark`, product colour roles (`text-product-accent`,
  `bg-product-tint`, `bg-gradient-product*`), `surface-*` utilities.

## 3D clay pictures workflow

1. Punna generates images (prompts given in chat; shared style block +
   per-object subject) into Figma file `R5vLmJRvUuzgHNOr1abmHA`.
2. `get_metadata` on `0:1` → node ids; `download_assets` → export URL.
3. Cut out the gray backdrop:
   `/private/tmp/claude-503/venv-img/bin/python -I scripts/clay-cutout.py in.png out.png [near] [hole] [close]`
   (venv with numpy + pillow; recreate with `python3 -m venv … && pip install pillow numpy`).
   Defaults 9/6/0; near-white objects: e.g. `6 4 18`. Preview on a coloured
   background before committing; resize to 640×640.
4. Save to `public/images/company/values/<name>.png`, add the name to
   `READY` in `value-art.tsx`.

## Pending (Punna's call when to resume)

- **AI Calling Agent page:** "Screening that never clocks off" is our
  wording (not Lovable's) — confirm or replace; two feature cards repeat
  the stats card (80% / 50%) — suggestion was to drop those two cards.
- **Pages with no Lovable view:** Events, Product Guides, Reports and
  Insights, FAQs, Trust & Safety, Community, apna Unlimited menu item.
- **Older parked items:** call-QR popover renders blank (candidate drawer);
  live employer.apna.co onboarding capture (needs Punna's OTP); OnlyRounds
  bits in apna Hire job details.
- Figma AI credits on the "Apna Design" team reset 2026-10-20 07:57 UTC
  (Claude in Chrome extension was not connecting; Gemini needs sign-in).

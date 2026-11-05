# AI handoff — working context (updated 2026-11-04)

Read `AGENTS.md` first (the contract), then this file, then
`docs/start-here/PROJECT-MAP.md` for "where is X". Any AI (Claude, Codex, Cursor,
Gemini…) can pick up from here.

> **Freeze (2026-11-05):** state of every stream, the needs-Punna list and
> recurring reminders live in `docs/status/WORK-STREAMS.md`. Start there.

> **Latest (2026-11-04):** the checkout is the focus. Express V11 and
> self-checkout V14 are final (version switch removed; history in
> `docs/history/SESSION-2026-10-30-CHECKOUT.md`, later calls in
> `docs/history/SESSION-2026-11-03-CHECKOUT.md`). The design rules for it are all in
> AGENTS.md → "Prices, offers and validity". Figma sync progress is in
> `docs/status/FIGMA-SYNC-STATUS.md`. The developer hand-off is below.
>
> **Stale below this line, from 2026-10-17:** the marketing notes still
> mention a serif and the old product colours. AGENTS.md wins: Inter only,
> no serif; Smart Jobs green, AI Calling Agent sky.

## Checkout dev hand-off (for developers)

- **The page:** artifact "Checkout Dev Handoff",
  https://claude.ai/artifact/LobdxBURySP1XXuSLQNytc (shared by link; version
  8 on 2026-11-04). One section per screen, phone and desktop, with the
  rules that matter. Its images are at `handoff/<name>-phone|desktop.jpg`.
  A "(Copy)" version (`SVLoiza7JPGf11A3CrY3Vd`) belongs to another account
  and is not kept in sync.
- **Figma:** the same screens, same order, on the page "Checkout — dev hand-off" of
  https://www.figma.com/design/f8O8wKTD4EdBvFj7h5ilev (sections 0–10, phone left, desktop
  right; see docs/status/FIGMA-SYNC-STATUS.md).
- **Live prototype:** poneglyphag.vercel.app (rebuilt from `main`).
  Express `/apnahire/jobs/new/plans`, self-checkout `/apnahire/credits`.
  States (credit balance, plan layout, offer, returning recruiter, pricing
  phase) are set from the hidden prototype panel: a silent tap on
  "*GST applicable". Remove the panel before production.
- **Screens on it (20 states × phone + desktop = 40 images):**
  - Express: plans (no credits), 10% offer claimed, all three credits held,
    1 job credit, "Pay less when you buy 3", order summary (paying, AI calling
    added, paid by credits).
  - Self-checkout: Jobs, Jobs with offer, apna Unlimited, Database,
    Enterprise, bigger job pack upsell, bigger database pack upsell, order
    summary, "How job credits work".
  - Exit pop-ups for a **returning recruiter** (already had the 10% offer,
    so no discount): express Back → "Just one step to make your job live";
    express order summary closed → "Are you sure?" (once per visit; only when
    the job needs payment); self-checkout Back → "Sorry to see you go"
    (reasons; Skip / Submit both leave). Code:
    `src/components/apnahire/offers/exit-stay-dialogs.tsx`. A first-time
    recruiter gets the 10% exit offer instead (`exit-offer-dialog.tsx`).
- **Open points listed on the page:** remove the prototype panel; the AI
  calling add-on keeps ₹1,699 under the coupon; "112+ recruiters have
  recently hired for…" is a fixed number and needs the real count.
- **Updating the screens after a design change:**
  1. Start the dev server on :3000 (`npm run dev`, or `preview_start
     {name: "apna-recruiter-dev"}` in Claude Code).
  2. `node scripts/capture-handoff.mjs <outDir> [nameFilter]` — signs in,
     sets pricing phase "today", drives the prototype panel and writes
     `<name>-phone.jpg` / `<name>-desktop.jpg`. Needs Playwright (path in
     `PLAYWRIGHT`, default the npx cache) and Google Chrome.
  3. Look at every shot before publishing (a hovered card turns its CTA
     green; the script parks the mouse in a corner to avoid it).
  4. Republish the artifact to the same URL with the changed images, and
     update its text if a rule changed. A new screen needs a block in the
     page and an entry in the script's `screens`.
- The white space above "Bill details" in the order summary is on purpose
  (`checkout-drawer.tsx`: the bill sits at the bottom, as in Figma).

## Who and how

- **Punna** (product designer, apna) drives; you design and build. Work in
  small steps, verify in the browser, push each verified change. Never ask
  Punna to commit or push; Punna says when.
- **Repo / branch:** each session works in its own worktree under
  `.claude/worktrees/` on its own branch; `main` is the base and what the
  prototype deploys from.
- **Before every commit:** `npm run check` (lint + lint:tokens + build).
  Commit trailer: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Dev server:** `preview_start {name: "apna-recruiter-dev"}` → port 3000
  (auto-picks another if taken).
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
- **Serif:** Source Serif 4 only for hero h1, section h2, quotes —
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

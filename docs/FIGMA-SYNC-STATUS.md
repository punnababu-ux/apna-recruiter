# Figma sync — status (resume from here)

Last updated: 2026-11-06. Keep this file current after every Figma step.
How to audit/sync (workflow, scripts, rules learned): skill `.claude/skills/figma-code-sync/`.

## ▶ Latest state (read this first)
- All checkout screens are on ONE page, "Checkout — dev hand-off" (441:2), sections 0–10 in the
  hand-off's order (details below). Every upsell, exit pop-up, menu and edge state is drawn,
  phone + desktop.
- Icons: all 62 rebuilt to lucide geometry (2px stroke, 24 grid), 24×24, aspect-locked, inner
  layers Scale/Scale. Database-credit lines use UserSearch everywhere (code too).
- Buttons: one weight, semibold, every size and variant incl. links (code + Figma; new text
  style Label/LG Semibold for lg labels).
- Database add-on chips: unselected white, no border — DatabaseAddonCard 344:308 (Figma) and
  ChipTabs variant "choice-on-tint" (code).
- Active apna Unlimited tab logo: LogoApnaUnlimited/gradient-deep 434:2.
- Upsell dialogs/tiles measured against the app (D-E5 = 576×436 exactly); rows 10px apart,
  a line reserved only when the partner tile has it.
- 2026-11-05: section 8 "Order summary details" (441:11284) was missing desktop for C2/C3.
  Added D-C2 coupon applied + GSTIN 492:15432 and D-C3 coupons panel 492:16000 (x 590, beside
  the phone rows). Built by cloning D-E6 (343:2686, 448 SheetPanel), dropping its add-on
  section, and swapping in clones of the phone CouponApplied/CouponsPanel + OrderSummary/Bill
  (layoutAlign STRETCH). Fixes: the cloned Bill was fixed-height with primaryAxisAlign MAX
  (empty gap on top) → set to hug (AUTO, MIN); PayBar total/CTA copied from the phone frame
  (C2 ₹742, C3 ₹825). Checked by Figma screenshot only, not diffed against the code; the
  backdrop is D-E6's express plans page. Every row in section 8 now has phone + desktop.
- Open: nothing blocking. Gotcha for writes: one heavy main component per call; on repeated
  "overflow" errors open a new session.

## Goal
Make the Figma design system match the code 1:1 (same component names,
variants, tokens), then build the 32 checkout screens from instances only.

- Figma file: https://www.figma.com/design/f8O8wKTD4EdBvFj7h5ilev (Apna Recruiter — Design System)
- Screens source: artifact "Checkout Dev Handoff (Copy)" https://claude.ai/artifact/SVLoiza7JPGf11A3CrY3Vd
  (images under `handoff/*.jpg`; phone + desktop per screen)
- Code truth: `packages/design-system/src/styles/tokens/{primitives,semantic}.css`,
  `packages/design-system/src/components/ui/*`, `src/components/apnahire/*`, AGENTS.md
- Work in batches; ask Punna before starting each batch. Never ask to commit.

## How the file is organised
- **Checkout screens: one page, "Checkout — dev hand-off" (441:2)**, in the order of the
  Checkout Dev Handoff artifact. Sections: 0 Start here (links + rules for every plan card) ·
  1 Express plans · 2 Express with credits · 3 Express upsells & order summary · 4 Self-checkout
  four tabs · 5 Self-checkout upsells & order summary · 6 How job credits work · 7 Exit pop-ups ·
  8 Order summary details · 9 Menus, chrome & edge states · 10 After payment & banners. Each
  section opens with its rules; each row is one state: label, phone (x 80), desktop (x 590).
  Frame ids are unchanged (moved, not copied). The old "Checkout — phone" and "Checkout —
  coverage" pages were emptied and removed (2026-11-04); "Checkout — desktop" is now "Checkout —
  scratch (not in hand-off)" and holds only a D-E1 copy (440:11693) that isn't part of the set.
  New screens go into the matching section, never onto a loose page.
- One page per component, grouped under divider pages ATOMS / MOLECULES / ORGANISMS.
- Variable collections: Primitives (raw), Color (Light/Dark, aliases Primitives),
  Spacing, Radius, Typography. Components bind to Color/Spacing/Radius only.
- Text styles: old Label/Body/Caption/Title/Price (now Inter) + code presets
  Display, H1–H6, Body, Body SM, Caption, Overline, Plan/Name, Plan/Price,
  Plan/Price compact, Plan/Unit, Plan/Strike.
- Effect styles: Shadow/XS SM MD LG + Shadow/control, card, elevated.
- Paint style: Gradient/offer-premium.

## Done
### Batch 1 — tokens
- 146 colour primitives, 101+ semantic Color roles (light/dark) synced to semantic.css.
  Added later: ribbon-fill/fg, tabs-inverted-pill, plan-pill-ring,
  surface-glass-dark(-edge), surface-checkout-track. 11 stale checkout vars deleted.
- Spacing px/10/14/20/28/40/48/56/64; radius 2xl/3xl + roles card, card-nested, hero, frame.
- Font Figtree → Inter; sizes 3xl–6xl; extrabold.

### Batch 2 — primitives
- Button (page 11:2): 14 variant sets `Button/<variant>`, sizes xs/sm/default/lg/xl × 5 states;
  `Button/icon` set (293:261) icon-xs/sm/icon/lg × default/outline/ghost/emphasis.
- Badge (133:17): Variant × Size as badge.tsx (ribbon, discount, count/dot, on-dark, on-tint …).
- Tabs (211:23): Default, Line, Inverted, Checkout; pill tabs fully rounded.
- ChipTabs (211:38): Default, Choice, Solid.
- CloseBubble page/component set (293:18).
- Dialog (217:2): CloseBubble outside, 8px above top-right.
- Sheet page: `Sheet/side` (217:190, inside X), `Sheet/bottom` (293:49, CloseBubble).
- Icons page (33:2) added: ClockFading, Sparkles, UserSearch, BriefcaseBusiness,
  BadgePercent, PhoneCall, Megaphone, Wallet, CircleHelp, TrendingUp, WhatsApp,
  VisibilityTicks1 (ids 295:9 … 295:63).

### Batch 3 — checkout product components (DONE for phone; awaiting Punna's go for batch 4)
- [x] MobilePlanRow — page "MobilePlanRow", set 296:259.
  Variants Recommended (yes/no) × Price (rupees/credits). Text props: Title, Price,
  Strike, Discount, Meta, Line, CTA. CTA = Button/checkout sm instance.
- [x] MobileUnlimitedCard — page "MobileUnlimitedCard", component 297:175. Text props
      Title, Price, Slot, Feature 1, Feature 2, Note.
- [x] GstNote — page "GstNote · ExtraOffBanner", component 297:211.
- [x] ExtraOffBanner — same page, component 297:213 (props Label, Countdown).
- [x] MobilePlanRow now has: Show per-unit, Feature 1–3 (text + Show toggles; icons
      WhatsApp / Megaphone / TrendingUp), Show saving, Meta icon (instance swap).
- [x] AvailableCreditsButton — page of same name, set 298:200 (button / icon / chip). Icon/Bot added.
- [x] OfferChoice — page of same name, set 298:418 (Tone stay/offer; props Name, Price,
      Strike, Discount, Per-unit, Validity, CTA).
- [x] Page "OfferDialog · PlanPopup" (298:434): Clay/wallet (298:435, real PNG),
      OfferDialog/phone (299:4; props Title, Was, Now; 2 OfferChoice instances),
      PlanPopup/phone (299:83; props Title, Subtitle). Desktop dialog versions not built yet.
- [x] Page "OrderSummary · AiCallingAddonCard": AiCallingAddonCard set 301:111
      (State add / from-balance / added), OrderSummary/Item 301:112 (Title, Price, Sub),
      OrderSummary/Coupons 301:117, OrderSummary/Bill 301:128, OrderSummary/PayBar 301:141 (Total).
      Known gap: the Hindi chip "अ" doesn't render in Inter — needs a Devanagari font.
- [ ] Not built yet (do while building screens if needed): desktop dialog versions of
      OfferDialog/PlanPopup, SheetPanel (desktop order summary frame), the "How job credits
      work" explainer card, ContactSalesCard, top bar / tabs bar for self-checkout.
Pages go right after "PricingCard" in the ORGANISMS group.

## NEW PLAN (Punna, 2026-11-03) — focus before breadth
Build only two screens properly, phone AND desktop, adding components to the library as
each screen needs them; get them right, then move on:
1. Express checkout plans (3 job types + apna Unlimited card) — phone E1 exists; desktop TODO.
2. Subscription page = self-checkout "apna Unlimited" tab — phone S3 exists; desktop TODO.
Other phone screens already built (E2–E8, S1, S2, S4, S5) are drafts; don't extend them yet.

Feedback applied 2026-11-03:
- Icons were thicker than web: every new icon is now rebuilt from the lucide SVG at
  stroke 2 on the 24 grid and OUTLINED (filled shapes, constraints SCALE) so it scales like
  web (16px → 1.33px). Icon colours are fill overrides on the instance vectors.
  Old icons (Star…ProgressActivity) were already filled shapes.
- Recommended ribbon: Badge ribbon variant now has the sparkle icon.
- ExtraOffBanner uses paint style Gradient/banner-success (AlertBanner success primary).
- AI add-on demo: real play disc (blue circle + white triangle).
- Tabs page text converted Figtree → Inter. OTHER old component pages may still use
  Figtree text — convert page by page when touched (load Figtree fonts first).

Review round 2 (2026-11-03), applied:
- Recommended tab: its Badge "Background" rect is what draws it — now tl + br bound to
  radius-role/card, and filled with ribbon-fill (was `info`, a different blue from the edge).
- Self-checkout tab bar: Unlimited tab is the LogoApnaUnlimited/default instance (16px tall);
  active = product-accent/unlimited (new Color var → apna-gold/700, dark gold/400) incl. underline.
- BackButton 205:25: 32px circle (code: Button outline icon-sm).
- S3 slot switcher: active option hugs its label (+24px padding), the other two share the rest.
- RULE: every text uses a text style. All text on the new pages, Button, Badge, Tabs,
  ChipTabs, Sheet now does. Styles added: Body/SM Medium, Body/SM Italic, Body/SM Strike,
  Link/SM, Link/XS, Link/XS Medium, Link/MD, Link/2XS, Plan/Discount, Price/Total,
  Price/Offer, Price/Was, Body/MD Medium, Body/LG, Caption/2XS Semibold, Caption/2XS Medium,
  Display/Button XL. New text: create/choose the style FIRST, then `setTextStyleIdAsync`;
  never set fontSize/fontName by hand. Old pages not yet audited: Input, Select, Alert,
  AlertBanner, Accordion, JobCard, PricingCard, Sidebar, BottomNav, etc.
- Upsell tiles are equal height: OfferChoice has a "spacer" (grow) above the CTA, and the
  OfferDialog "choices" row stretches both tiles (layoutSizingVertical FILL).
- Text colours checked: all bound to semantic vars (foreground, muted-foreground, …).
- Upsell tiles: offer tile hugs (sets row height), stay tile FILLs. If an instance looks
  clipped, its height override is stale: set FIXED→resize→AUTO again.
- Order summary: PaymentMarks component 321:3001 (real logos from public/payments:
  Razorpay, Juspay, UPI, RuPay PNG, Visa, Mastercard, Amex) inside PayBar; PayBar has
  effect style Shadow/sticky (shadow-up, 0 −4 12 −2) and a top border; in screens E6–E8
  the PayBar is ABSOLUTE, pinned to the bottom of a fixed 844 frame, over the content.

Feature colours cross-checked with code (2026-11-03): mobile-plan-row.tsx MobileFeatureLine /
MobileMetaLine, job-plan-cards.tsx featureIcon:
- Feature and meta text: text-xs (Body/XS 12/16) foreground; icon 16; icon–text gap 6 (meta 8);
  rows 6 apart.
- Icons: WhatsApp = success (NOT the brand whatsapp green), Urgently hiring = Flame (new
  Icon/Flame 322:2) warning, Top placement = TrendingUp info, enterprise checks = checkout-primary,
  visibility ticks + briefcase slot = checkout-primary, clock = foreground,
  database credits (UserSearch) = muted-foreground.
- Credit status ("Covered by balance"): Label/SM (12 semibold) checkout-info.
- Unlimited card note: Caption/XS Italic, muted-foreground.
Visibility ticks: Icon/VisibilityTicks2 (323:2) and 3 (323:5) added from icons.tsx paths;
1x/2x/4x cards use Ticks1/2/3. Icons are fill-only: a stroke on an icon vector draws a
black outline over the colour — 18 stray strokes found and removed (17 on phone screens).
CTA row (web: `pt-3`, button `-my-1.5 self-end`): the Buy now button sits in a 20px
"cta-slot" frame, offset −6 so it overflows 6px above/below like the web's negative
margin; line-cta aligns bottom and must NOT clip (clipsContent=false). Features start 12px
under the rule.
Unlimited card bottom padding (2026-11-03): web had the same mismatch (full 32px button
inside p-4 → 16px under it, vs 12px on plan cards). Fixed in CODE (mobile-plan-row.tsx,
MobileUnlimitedCard: CTA wrapped in `-my-1.5`, inner card always `border-2
border-transparent`) — measured in the browser: every phone card now has 12px under Buy now.
SUPERSEDED (Punna: "just use 16"): no transparent 2px border anywhere. Web edges are
`ring-2 ring-inset` (recommended ribbon-fill, selected cta-primary) — no layout space —
so plan cards and the Unlimited inner card have a true 16px inset; measured: 16px
padding, 10px under Buy now on every card. Figma: padding bound to space/4 (top space/3,
or space/6 with the ribbon); edges are INSIDE strokes.
cta-slot is an auto-layout frame (hug width, fixed 20 tall, centred) so longer labels
("Contact sales") widen it instead of overflowing the card.
Code change is uncommitted in worktree rebuy-banner-design-461cc8.
Icon/Infinity 322:6 added (Unlimited "Job reposts and swapping", warning).

## Desktop (2026-11-04)
- PricingCard v2 (page PricingCard 123:3, set 330:144; old one kept as legacy): price-first
  layout of pricing-card.tsx. Props: Title, Subtitle, Price, Unit, Strike, Discount, Price note,
  Row 1/2 (text-sm muted, 20px icon), Sub 1–3 (text-xs, 16px icon, indent 28), Row 4/5, Note
  (dashed footer), each with Show toggles + icon swaps. CTA outline lg full width. Recommended =
  2px ribbon-fill edge + ribbon top-right. In a row: card FILL height + its "meta" grow=1 so CTAs
  line up; a card without a price note shows it with " " to keep the rule level.
- Page "Checkout shell": PageHeader/desktop 331:35 (1152 container, 144 gutters; Show help /
  Show available credits), SelfCheckoutTabs/desktop 331:53 (glass track, white pill on active),
  UnlimitedSideCard/desktop 331:85 (plum frame + gold logo + PricingCard).
- Page "Checkout — desktop": D-E1 Plans · no credits 331:193; D-S3 apna Unlimited 333:325.
  Not-included sub-points: Icon/Close + muted text. Known gaps: "Dynamic visibility" uses
  TrendingUp (code: Activity pulse); "Unlimited" isn't bold in the subscription sub-points.

## Desktop round 2 (2026-11-04)
- PricingCard v2 now: Layout = price-first | price-last (price-last: title, meta, spacer grow,
  rule, price group, CTA — self-checkout packs and the Jobs-tab Unlimited card), Status line
  ("Covered by your balance" / "Buy 1 more for ₹699"), AI badge (title row), AI block
  (AI calling agent + point + demo pill), Validity row in the header (Enterprise), Row 6/7.
  After cloning variants, componentPropertyReferences had to be re-linked by hand.
  Main "meta" frames must be HUG (a FIXED meta clipped rows to 12px).
- UnlimitedSideCard/desktop: Subtitle toggle ("Unlimited hiring for 30 days").
- ContactSalesCard/desktop 339:2728 (one row). PageHeader/desktop: Show credits chip.
- Screens on "Checkout — desktop": D-E2 offer 339:1368, D-E3 all credits 339:1847 (4 cards,
  no Unlimited card, Post now), D-E4 1 job credit 339:2300, D-S1 Jobs 340:1428,
  D-S2 Jobs offer 340:2148, D-S4 Database 340:2762, D-S5 Enterprise 340:3181.
- Alignment fix (Punna review): cards were stretched to an over-tall row (side card's inner
  card had grow=1 and a stale spacer). Now: every card in a row is sized to the tallest card's
  NATURAL height (measure with the spacer collapsed to ~0, then set FIXED and let the spacer
  FILL); the side Unlimited card is 328 wide (code xl:w-82), its inner card hugs, and its top is
  offset to match the panel's cards. A card without a per-unit note keeps the line (" ").
  PricingCard variants: strokesIncludedInLayout=false (a 2px edge had pushed content 1px).
  Card gaps from code: pack/DB/Enterprise grids gap-4 (16). Verified: one rule line and one
  CTA line per row on all 9 desktop screens.
- Known gaps: bold numbers in Enterprise/Unlimited feature lines; "अ" chip glyph; Dynamic
  visibility icon (Activity); desktop order summary / pop-ups not built yet.

## Desktop pop-ups (2026-11-04)
- OfferChoice now Tone × Size (phone | desktop). Desktop: price, struck price and % on one
  line; CTA size default (long labels like "Continue with 13 credits" fit).
- OfferDialog/desktop 342:202 (576 wide, rounded 20, tiles 2:3 = 206/310, CloseBubble outside).
- AiCallingAddonCard: State × Size; desktop add = "₹1,699 / for this job" + emphasis "Add".
- SheetPanelHeader 342:696 (page Checkout shell). Clay/job-types 342:201 (real PNG).
- Screens (Checkout — desktop, x 4620): D-E5 upsell 343:2415, D-S6 job-pack upsell 343:2592,
  D-E6 order summary 343:2686 (448 SheetPanel, PayBar pinned), D-S9 How job credits work
  343:3314 (1024 dialog, muted PricingCards without CTA).
- Round 2: DatabaseAddonCard 344:308 (Complete your hiring needs; 50/100/200 chips + Add),
  OrderSummary/Item "Show strike", Bill "Show discount", PayBar "Show total" / "Show payment
  marks" / "Show no-payment note" (button text inside an instance can't be a property — set it
  directly), AiCallingAddonCard State=from-balance Size=desktop.
  Screens: D-S7 DB-pack upsell 344:5986 (values from DB_UPSELL_PACK in credit-bundles.ts), D-E7 AI added 344:6073, D-E8 paid by credits 344:6279,
  D-S8 self-checkout summary 344:6487. All desktop handoff screens now exist.
- OrderSummary/Item: "Show remove" — "Remove" (Link/XS Medium, foreground) at the right of
  the subtitle row, as CartLineRow's link-inline button. On for added add-ons: E7 phone and
  D-E7 desktop (AI calling agent line). Phone E7 bill now follows the coupons directly.

## ▶ RESUME HERE (2026-11-04, later) — text colour & size audit, Figma → code 1:1
Ask (Punna): plan-feature text colour in Figma differs from code; check text colour + size
on every component and screen of page "Checkout — dev hand-off" (441:2); code is the truth.
Method: dump every visible text (text | size weight | colour token ~hex) from each Figma
screen and from the same state in the browser (dev server, mock session in localStorage
`apnahire:session`, `apnahire:pricing-phase`=today), diff by text, fix at the component.
Done (Figma now matches code; values read from the rendered page):
- PricingCard v2: sub-points Body/XS muted-foreground; not-included (Icon/Close) muted 60%;
  status 12; "AI calling agent" 14 semibold; CTA label 14 semibold (code size `card`);
  price-last subtitle 12. Screen overrides fixed (237 included, 42 not included).
- Button: label per size like code — xs/sm 12/600, default 14/600, lg 16/600, xl 16/600 (all semibold since main 78684e2; lg briefly set to 500 from stale code, restored).
- Badge ribbon 12/600. CheckoutPanel aside 12/500. PageHeader/desktop title 18.
- Phone express job prices 20 (Plan/Price compact); offer-claimed Unlimited phone price 18.
- SelfCheckoutTabs desktop: titles checkout-primary (active) / hero-fg-secondary, subs 12/400
  hero-fg-secondary. Phone: active 14 bold (new style Label/MD Bold), inactive 14/500 foreground 60%.
- S3 slot switcher: active 600, inactive 400. ContactSalesCard phone: title 16, button sm.
- UnlimitedSideCard subtitle 14 white 80%; Jobs-tab Unlimited card text on hero-fg tokens.
- ExtraOffBanner phone label 12/500.
- Order summary: item sub-line 12, Remove 14/600, Apply coupons 14, GSTIN link regular,
  totals 24/600, phone title 20; AI + DB add-on points 12, DB title/item 14/600, phone Add
  buttons size default.
- Upsells: OfferChoice per-unit 12; OfferDialog was-price + unit white 70%; P2/P3/D-S10 label,
  ribbons 12/500, tile names 14, price+unit split.
- Pop-ups: titles 20 (PlanPopup + detached P4–P8, P6, P7, S9). S9 phone credits 20.
Round 2 (all remaining screens checked): sub-points now Body/XS Loose (12/20, code leading-5);
countdown time 600; upsell chips pinned top-right (constraint MAX, right 0, as code);
PriceChangeBanner message 12/500; PlanEndedBanner price 24/600; PaymentSuccess total label 16
and amount 18 bold (new style Price/Total MD); ContactPopup button lg; CouponApplied Remove 14/600;
side-card subtitle white 80% on every screen; W1 phone prices 20, W1 desktop Unlimited card
on hero-fg tokens; desktop "How job credits work" hero-fg.
Differences left on purpose (state or copy, not style): E5b/E7 desktop show other offer states;
P2 numbers; P6/P7/payment-success copy differs from code; T1 not compared.
Code bug seen at 375px: phone card visibility line overlaps "₹749 from Jan 1" (December phase).
## (earlier) RESUME HERE (2026-11-04) — "Coverage" set, approved by Punna
Plan agreed: a layered file where every UNIQUE checkout component appears in at least one
screen (phone + desktop where they differ); all other cases/edge cases later go on a separate
flows board made of screenshots. Build these on a new page "Checkout — coverage", reusing the
components above (compose, never hand-draw; every text uses a text style; bind colours with the
resolved value as fallback; clear default white fills on auto-layout frames).

Progress: page "Checkout — coverage" 346:2.
- [x] 1. PaymentMethodCard set 347:354 (Method upi|card × Selected), SubscriptionPayFooter
  347:355 (page OrderSummary); UPI app logos uploaded (346:209 upi png, 346:213 gpay,
  346:222 paytm, 346:234 phonepe). Screens C1 desktop 347:466 (536 panel), C1 phone 347:634.
- [x] 2. InlineActionInput 348:282, CouponsPanel 348:285, CouponApplied 348:312, GstinCard
  348:329 (page OrderSummary). Screens C2 coupon applied + GSTIN open 348:689, C3 coupons
  panel 348:971 (phone; desktop uses the same parts in the 448 panel).
- [x] 3. Pop-ups (phone sheets; desktop = same content in a centred dialog): P1 exit offer
  350:900, P2 Go annual 350:1139, P3 credits or a plan 350:1210, P4 stay 351:1087 (stacked
  footer), P5 leave reasons 351:1173, P6 coupon expired 351:1246, P7 city lock 351:1303.
  Built by detaching OfferDialog/PlanPopup instances (screen-level). Gaps: exit/annual use the
  wallet clay (code: exit-offer.png / annual.png); P6/P7 body copy approximated; ContactPopup
  is the marketing contact form (contact-section.tsx) — not rebuilt.
- [x] 4. PaymentSuccess 353:157 (page Checkout shell) → screen S1 353:1300. PaymentModal is the
  prototype's stand-in for the Razorpay gateway ("Simulates failure") — not product UI; not built.
- [x] 5. PriceChangeBanner 353:124 (info gradient), PlanEndedBanner 353:132 (destructive subtle,
  badges, secondary Resubscribe) → screen B1 353:1330 (with ExtraOffBanner).
  Not built (judged not unique): DockedPlanTabs/CompactPlanTabs (sticky versions of the tab
  bars already built), TrustedByStrip (marketing logo strip).
- Review fixes: subscription line = planOrderLabel + planOrderPoints (subscriptions.ts):
  no sublabel, points "1 active job slot for 30 days", "200 database credits worth ₹2,000",
  "Valid in a single city". SubscriptionPayFooter trust row ends with the Razorpay + Juspay logos.
- Close in CouponsPanel (20px) and GstinCard (24px) = Icon/XCircleFilled 362:302 (lucide
  CircleX, fill muted-foreground, glyph + ring in card colour), as checkout-drawer.
  OrderSummary/Bill now CONTAINS the GstinCard: props "Show GSTIN box" / "Show GSTIN link"
  (the box replaces the link, inside the same card). C2 uses it.
- RULE: order summary header (PageHeader/phone or SheetPanelHeader) and the first item card
  touch — wrapped in "header + items" (gap 0) on all 11 order-summary screens (E6–E8 phone,
  D-E6/E7/E8, D-S8, C1 ×2, C2, C3). Do the same on any new order summary.
- Upsell alignment: hidden rows in a tile are now kept with opacity 0 (reserve the line, never
  hide), validity frames and price groups equal height, tiles equal height with CTA pinned;
  desktop OfferChoice CTAs are 40px (code h-10). NOTE: set figma.skipInvisibleInstanceChildren
  = false before searching instances, or hidden rows are invisible to findAll.
- PlanEndedBanner rebuilt as RenewalBanner (56px icon circle, title/subtitle | left rule |
  items, price last paid + struck MRP, secondary "Renew now"). Conditions are in each banner's
  component description.
- Banner conditions (from code, also in each Figma component description):
  - PriceChangeBanner: logged in only, before Jan 1 2027 (Dec pricing phase); jobs dashboard
    + above the title in both checkouts; "N days left" only in the last 21 days; never in the
    order summary or logged-out pages.
  - PlanEndedBanner: no active plan AND a previous Unlimited plan ended < 7 days ago
    (BANNER_DAYS = 7, hooks/use-previous-plan.ts); jobs dashboard + plans page (Renew now
    switches to the Unlimited tab). Price = last paid; struck MRP + % OFF if today's MRP is
    higher. Prototype: tapping the subtitle opens preview settings — remove before production.
  - ExtraOffBanner: after the exit offer is claimed, for 24 h with countdown; above the plans in
    both checkouts; never on Enterprise.
- DONE (Punna: white fill, not outline): new Button variant `inverted` (bg-cta-inverted, no
  border) in button.tsx + COMPONENTS.md + design-system actions page; plan-ended.tsx "Renew
  now" uses it. Figma: Button/inverted set 368:174; PlanEndedBanner uses it with ChevronRight.
  Committed + pushed on branch claude/affectionate-hugle-3d5771 (2026-11-04).
- NEXT: Punna's review of the coverage page; then the screenshot flows board.
Order (original):
1. Subscription order summary (checkout-drawer.tsx, `isSubscription`):
   - SheetPanel size "lg" = 536px on desktop (one-time is 448); phone = full screen.
   - Line item: plan name + price, then a points list (Check icon + text-sm) instead of a sublabel.
   - Footer (pinned, shadow-sticky, border-t, p-5): Total row → fieldset "Select autopay method"
     (text-sm semibold) → RadioCardGroup 2 columns, gap-2: RadioCard radio at END, p-3,
     "UPI" with round 28px logo badges (upi-icon.png, gpay-icon.svg, paytm.svg, phonepe-icon.svg,
     overlapping −4px, ring-1 border, bg-card) and "Card (credit/debit)" (visa, mastercard, amex,
     rupay-logo.png); UPI selected by default → checkout button xl full width
     "Subscribe ₹2,499 /month" (with coupon "Pay ₹X & subscribe"; upgrade "Pay ₹X & upgrade") →
     text-xs muted centred: RefreshCw icon "Auto-renews <date> at **₹2,499 /month** incl. GST.
     By subscribing, you authorise these charges." → row of text-xs muted items with 12px icons:
     Mail "Renewal reminders", Ban "Cancel anytime", Lock + Razorpay/Juspay.
   - Logos in public/payments (upload via upload_assets; SVGs import as vectors).
2. Order-summary states: coupon applied row (Tag icon checkout-primary, "You save ₹195 with
   FIRST10", Remove link-inline, CountdownChip right), coupons list, GSTIN entry card
   (GstinCard / InlineActionInput; filled state shows GSTIN + Pencil).
3. Pop-ups (src/components/apnahire/offers/*, city-lock-dialog.tsx, slots/, self-checkout.tsx):
   ExitOfferDialog ("Claim offer"), StayDialog, AnnualUpgradeDialog ("Go annual"),
   CreditsToPlanDialog, CityLockDialog, CouponExpiredDialog, LeaveReasonsDialog, ContactPopup.
   Build on PlanPopup/phone (299:83) / OfferDialog (299:4, 342:202) patterns; read each file
   for copy and structure first.
4. PaymentModal (one-time method choice: OptionCard group) and PaymentSuccess.
5. Banners/chrome: PriceChangeBanner, PlanEndedBanner, DockedPlanTabs / CompactPlanTabs,
   TrustedByStrip.
6. Update this file; then later the screenshot flows board (pages need login — capture from the
   deployed prototype poneglyphag.vercel.app once Punna is signed in).

Code change (committed + pushed 2026-11-04, branch claude/affectionate-hugle-3d5771): mobile-plan-row.tsx —
Unlimited card CTA `-my-1.5`; plan-card edges are `ring-2 ring-inset` (no 2px border) so every
phone card has a true 16px inset. Lint + token check passed. Never ask Punna to commit.

## Coverage gaps closed (2026-11-04, after the audit against the dev hand-off)
Audit found 9 unique parts missing; all built. Page "Checkout — coverage" unless noted.
1. "Are you sure?" (StayDialog where="summary"): P8 phone 391:1442, D-P8 desktop 391:1486.
   P4 fixed to match code: job-types clay (was wallet), no empty body (header `alone`),
   bold "7 lakh+" / "48 hours". P5 now uses Clay/contact.
2. Desktop pop-up frame: PlanPopup/desktop 391:1671 (page OfferDialog · PlanPopup; 448 wide,
   radius-role/overlay, px 24, buttons side by side, outline first). Desktop screens D-P4
   391:1464, D-P5 391:1508, D-P6 391:1544, D-P7 391:1564 (row y 5200).
   GOTCHA: a Button instance set to HUG in a horizontal footer collapses to 24px — resize to 40
   and set FIXED.
3. Menus (page AvailableCreditsButton): CreditsMenu set 394:143 (desktop 288 popover | phone
   sheet; Count 1–4 text props, "Show add-on row"), HelpMenu set 394:242. Screens M1 394:1742,
   D-M1 394:1814, M2 394:2247, D-M2 394:2312. New icons Icon/MessagesSquare 393:5,
   Icon/CalendarDays 393:19; clays Clay/contact 390:1521, Clay/success 390:1522,
   Clay/dedicated-support 390:1523.
4. Jan 1 line: MobilePlanRow and PricingCard v2 have "Upcoming price" (text) + "Show upcoming
   price" (off by default). Phone: right of the meta line (new "meta-row"); desktop: after
   price-note. Gap: "₹749" isn't medium weight (one text prop, no mixed weight).
5. S9 How job credits work · phone 394:8525 (muted MobilePlanRow credits cards, CTA hidden).
   Features stack one per line; code flows them inline with "·" on phones.
6. S8 Order summary · self-checkout · phone 394:8751 (DatabaseAddonCard, discount bill).
7. ContactThanks set 396:180 (page OfferDialog · PlanPopup): signed-in Contact sales is a
   confirmation, not a form. Screens K1 396:4320, D-K1 396:4350. The signed-out form is not drawn.
8. DockedPlanTabs/desktop 396:316 (page Checkout shell). Screens D-T1 396:4378 (tabs in the bar),
   T1 396:4463 (phone chip row stuck under the bar).
9. Work-from-home: W1 396:3847, D-W1 396:4039 — Unlimited card at 55%, phone CTA hidden,
   desktop CTA "Not for work-from-home jobs", solid info banner (tapped state).

Review fixes (Punna, 2026-11-04):
- P3 Credits or a plan rebuilt to CreditsToPlanDialog: Gradient/offer-premium header,
  Clay/unlimited 397:5404 (new), "Special upgrade offer" tag, headline "Unlimited job posts for
  30 days" (Unlimited in `highlight`), UNLIMITED POSTS ribbon (band reserved in both tiles),
  "Monthly plan ₹2,499 /month", slot + database credits + "Valid in a single city", CTA "Get
  monthly plan". Tiles detached (screen-level); dialog 398:4944.
- RULE (upsell tiles): reserve a line only when ONE tile has it. A row that is empty in both
  tiles is hidden (visible=false), not opacity 0 — it left a gap in E5 / D-E5 (per-unit).
- "1 active job slot" → "1 job live at a time" on 16 screen texts (phone, desktop, coverage).
- TrustedByStrip set 400:504 (page Checkout shell; phone 358×68, desktop 1152×76, measured from
  the app): Icon/ShieldCheck 400:508 (new) + "Trusted by 7 lakh+ businesses & enterprises"
  (Label/MD), logos 24px / 32px tall, 56 apart, in a clipped "marquee" frame with a gradient
  mask for the 10% edge fade. Logo components Logo/Paytm … Logo/HDFC Bank 400:259–400:267
  (first 9 of content/logos.ts). Placed under the GST note on E1–E5, D-E1–D-E8, and the
  express-based coverage screens (M1, M2, W1 + desktop). Express only; self-checkout has none.
- Icon colours audited against the app (computed colours, both checkouts, phone + desktop) and
  fixed at the source (MobileUnlimitedCard, UnlimitedSideCard, PricingCard v2) and on ~60
  screen icons. Reference: database credits gray everywhere except express desktop (info blue);
  visibility ticks green; clock gray (express phone), green (express desktop), black (self
  phone), gray (self desktop); Unlimited-card briefcase green in express, gray in self, black
  on the phone Unlimited tab; "Top placement" arrow info blue. "Dynamic visibility" is now
  Icon/Activity 405:4 (was TrendingUp).
- Database credits icon is UserSearch everywhere, upsell tiles included (code changed too:
  offer-choice.tsx, job-plan-cards.tsx ×3, unlimited-side-card.tsx — the Database cylinder is
  gone from database-credit lines).
- Slot chips read "1 job · 2 jobs · 3 jobs" (S3, D-S3).
- Upsell spacing measured in the app (desktop "Pay less when you buy 3": card 576×436, header
  201, tiles 206 + 310, rows 10px apart, 48px CTA row). Fixed at the source:
  OfferDialog/desktop 342:202 — 576 wide, header pb 28, clay 56, lead Body/XL (20/28),
  compare Price/Was LG (30/36 semibold) → Price/Offer LG (36/40 bold), units Body 16; CloseBubble
  flush with the card's right edge, 40 above (x 544). OfferChoice 298:418 — rows and price group
  10px apart, desktop padding 16, names Label/MD (14 semibold), desktop % Plan/Discount 12,
  phone % Label/MD 14 + strike Body/MD Strike 16, validity Body/XS 12 gap 6, spacer zero
  height (no grow) so it adds one gap above the CTA. New text styles: Body/XL, Price/Was LG,
  Price/Offer LG, Body/MD Strike. D-E5 now 576×436 (= app), D-S6/D-S7 follow.
- P2 Go annual rebuilt to AnnualUpgradeDialog (dialog 413:13102, from the P3 premium dialog):
  Clay/annual 413:7793 (new), "Special upgrade offer", "Pay less, upgrade to annual plan",
  ₹2,499 /month → ₹833 /month; tiles Monthly plan ₹2,499 /month | Annual plan ₹9,999 /year
  ₹15,999 −38% (8 MONTHS FREE ribbon), slot + database credits lines, CTAs Continue / Get
  annual plan. P3 moved to the same 10px row grid.
- Every upsell is now drawn, phone + desktop (copy taken from the app):
  | Upsell (trigger) | Phone | Desktop |
  | Express: pay less when you buy 3 (no credits) | E5 307:782 | D-E5 343:2415 |
  | Express: bigger credit pack (short of credits) | E5b 416:3590 | D-E5b 417:7003 |
  | Both: go annual (Unlimited monthly) | P2 350:1139 | D-S10 417:7088 (wide, 768, tiles 283/425) |
  | Self: bigger job pack (13 credits) | S6 416:3671 | D-S6 343:2592 |
  | Self: bigger database pack (1,600) | S7 416:3759 | D-S7 344:5986 |
  | Self: credits or a plan (3 credits, phones only) | P3 350:1210 | — |
  The need note ("Needed to post premium job") takes the strike line in the credits tile; that
  tile's spacer grows so its CTA pins level.
- Icons normalised (2026-11-04, page Icons 33:2, 62 components). Every lucide-based icon is
  rebuilt from node_modules/lucide-react `__iconNode` at stroke 2 on the 24 grid, outlined and
  flattened INTO THE ICON'S EXISTING FIRST VECTOR (`vectorPaths` swap), so instance colour
  overrides survive (checked: W1 banner Info stays white). Inner layers: constraints Scale/Scale,
  aspect locked; component aspect locked. Old Material glyphs replaced: CorporateFare →
  Icon/Building2 (code's Enterprise icon), ProgressActivity → Icon/LoaderCircle, AllInclusive →
  infinity geometry. WhatsApp = Tabler brand-whatsapp (icons.tsx); VisibilityTicks1–3 and
  XCircleFilled are custom filled glyphs (shapes kept).
  STATUS: done, 62/62 (verified: every component 24×24 and aspect-locked, every inner layer
  aspect-locked with Scale/Scale constraints, no live strokes; all render at one weight).
  GOTCHA: a write that touches a heavily used main (BriefcaseBusiness, ClockFading…) can fail
  with "upstream … overflow"; do ONE icon per call, retry once, and open a new session
  (create_session) when every write starts failing.
- Active apna Unlimited tab logo = LogoApnaUnlimited/gradient-deep 434:2 (new; apna-gold-800 →
  600 top to bottom, stops bound to the gold variables), as pricing-hero.tsx in light mode.
  Swapped on S3 310:2004, D-S3 333:325, D-S10 417:7088. LogoApnaUnlimited/gradient 126:13's
  stops are now bound to gold-500 → 300 (dark mode).
- Database add-on chips (order summary): unselected chips are white with no border (Punna's
  Figma change). Code: ChipTabs variant "choice-on-tint" (chip-tabs.tsx), used in
  checkout-drawer.tsx; showcase on /design-system/components/navigation.
- E5 / D-E5: tile price groups were pinned FIXED from the alignment pass; now HUG. On E5 the
  tiles' spacers are hidden so the tiles hug (188) with CTAs level — the OfferChoice spacer
  can't shrink below its main size in an instance.

## Batch 4 — screens (paused for the new plan)
- Shell components, page "Checkout shell": PageHeader/phone 305:47 (Title, Show credits chip,
  Show help, Show wallet; title truncates), CheckoutPanel 305:94 (panel head: Title, Aside),
  SelfCheckoutTabs/phone 305:111. AvailableCreditsButton got Variant=chip-numbers 305:228.
- MobilePlanRow got Status + Show status ("Covered by balance" / "Buy 1 for ₹699").
  NOTE: its CTA text prop does not reach the nested button — set the button TEXT directly.
- Page "Checkout — phone" (screens 390 wide, x step 440):
  - [x] E1 Plans · no credits 306:3
  - [x] E2 Plans · offer claimed 306:362
  - [x] E3 Plans · all three credits 306:621 (Premium + AI card lacks the demo player row)
  - [x] E4 Plans · 1 job credit 306:904
  - [ ] E5 "Pay less when you buy 3" sheet over E1
  - [ ] E6 Order summary · paying, E7 · AI calling added, E8 · paid by credits
  - [ ] E9 How job credits work (sheet)
  - [ ] S1 Jobs, S2 Jobs offer, S3 Unlimited, S4 Database, S5 Enterprise,
        S6 job-pack upsell, S7 DB-pack upsell, S8 order summary
- Then a "Checkout — desktop" page (needs desktop parts first).

## Next: Batch 4 (original plan)
New page "Checkout" with all 32 screens (express 9 + self-checkout 7, each phone 390 + desktop 1440),
built only from instances of the components above. Screen list = artifact section order.

## Gotchas learned
- `setBoundVariableForPaint` DROPS the paint's opacity: set `opacity` on the returned
  paint afterwards (else a 15% tint renders as a solid white pill).
- `figma.createAutoLayout()` frames get a default WHITE fill: set `fills=[]` on every
  layout-only frame (cleanup already run on all batch-3 pages).
- `outlineStroke()` result is NOT placed in the original's parent: `appendChild` it yourself.
- Icon colour overrides are tied to vector node ids: changing an icon main component's
  vectors drops every instance's colour override (re-colour afterwards).
- A bound paint keeps its own `color` as a fallback and the screenshot renderer sometimes
  draws THAT: always pass the variable's resolved value (`v.resolveForConsumer(node)`) as
  the paint colour when binding. A sync sweep fixed 31 stale fallbacks.
- Desktop review fixes (2026-11-04): "Active for 15 days" clock = checkout-primary (code:
  job-plan-cards.tsx); express plans → GST note 12px (gap-3); subscription cards 16 apart and
  16 to the GST/note footer (gap-4); subscription check icons 20px; desktop tab bar name rows
  24px tall so the active pill is even.
- The MCP screenshot renderer under-draws semi-transparent layers (scrims); check in Figma.
- Bind colours with `setBoundVariableForPaint` and give the paint a real fallback colour
  (resolved value), else screenshots can show black.
- Setting `fontName` after `textStyleId` detaches the style — set the style last.
- `resize()` resets auto-layout sizing to FIXED; re-set `primaryAxisSizingMode='AUTO'` after.
- Figma session id used so far: e132f763-1e2f-4ae9-9669-a4f684175e9f (create a new one if expired).

## Round 3 — plan tabs (2026-11-04)

Components only: SelfCheckoutTabs/phone (305:111), DockedPlanTabs/desktop (396:316), SelfCheckoutTabs/desktop (331:53).
- Selected: green `checkout-primary`, text and icon. Phone/docked 14 bold (Label/MD Bold), desktop hero 18 semibold (Title/LG).
- Not selected, phone + docked: 14 medium, text, icon and logo all `foreground` at 60%.
- Not selected, desktop hero: titles, icons, logo and subtitles all `surface-checkout-hero-fg-secondary` (gray-700), as code renders.
- Gotcha: LogoApnaUnlimited (126:5) carried fills on its vector-network regions, so instance fill overrides did nothing. Regions now inherit the node fill.
- New screens: D-P1 Exit offer · desktop 484:22 (section 7, beside P1; dialog 448×333 as code:
  header pad 24/24/28, clay 56, eyebrow Body/XL, title H3, validity Body/MD, body pad 24 gap 24),
  S1 Payment successful · phone 484:90 (section 10, beside S1 desktop; card 358 wide).
- Payment failure: no screen in code. A failed payment returns to the order summary
  (handlePaymentFailure in self-checkout.tsx / job-plan-selection.tsx). Not drawn — awaiting Punna.
- Payment failure DESIGNED (Punna, 2026-11-05; not in code yet): component PaymentFailed 486:13
  (Checkout shell, beside PaymentSuccess): AlertCircle 56 destructive, "Payment failed",
  "No money was taken. If any was debited, we refund it in 5–7 days.", Order details,
  Change method (outline) + Try again (green). Screens S2 desktop 486:69, S2 phone 486:134
  (section 10, under the banners).
- PaymentFailed is now in code (payment-success.tsx, 2026-11-05): both checkouts show it when the
  gateway fails; Try again reopens the payment step, Change method reopens the order summary.
  Buttons stack on phones (Try again on top) because "Change method" doesn't fit half a 320px
  card; Figma phone S2 486:134 matches.

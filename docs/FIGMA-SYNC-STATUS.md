# Figma sync — status (resume from here)

Last updated: 2026-11-04. Keep this file current after every Figma step.

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

## ▶ RESUME HERE (2026-11-04) — "Coverage" set, approved by Punna
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

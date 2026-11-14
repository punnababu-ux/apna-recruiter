# Session 2026-11-12 — subscriber offer banners

Preview only. Switch on `/apnahire/jobs?bar=<case>&banner=<option>`; code in
`src/components/apnahire/banner-options.tsx`. DS components untouched; new
preview tokens `--gradient-banner-hero`, `--banner-hero-accent`,
`--banner-hero-save` in semantic.css / index.css.

| Option | What | Status |
|---|---|---|
| a | Live OfferBar / RenewalBanner | base |
| d, e, f | Stacked column / one-line strip / receipt card | superseded |
| s | Two short lines + priced CTA, visual on the right | superseded |
| x | Punna's example in our colours: stat tile, chip, headline + blue accent, price + green Save, white CTA | desktop pick candidate |
| y | x on desktop; phone = headline, price + Save, CTA (Sumit 1, 3, 5) | latest |

Captured at 393×852 and 320px in the browser pane (not the CDP 2x capture).
Open: the tinted plan-ended RenewalBanner isn't converted; copy "39 days" / "old price" needs sign-off.

- 2026-11-12 follow-up: the two-card festive banner (template 3) was dropped at Punna's call, so festive offers use template 1. Out of credits is not green: it uses the plum bar with a red dot, and green stays for the credit upsell.
- Credit purchase banners never use the subscription (plum) gradient. The "1 job credit left" and Database banners use the green bg-gradient-offer. Out of job credits uses the red bg-gradient-banner-destructive.
- The 0 and 1 credit banners show the clay wallet (wallet.png) in place of the number tile, and the count is in the badge ("0 job credits left", "1 job credit left"). Punna chose to keep the same wallet for both.
- Clay art for the banners is a placeholder. Punna will make new clay once all banners are final.
- The plan-length upgrade banners (monthly → quarterly, quarterly → annual, and its last-week case) show the clay calendar (annual.png) in place of the months tile. This is a placeholder too.
- Every banner now shows a clay object in place of the number tile, and the number moved into the badge. Slots use slots-full ("1 of 1 jobs live", "2 of 2 jobs live"). Database top-up uses database-search ("80 unlocks left"). Auto-pay off uses alert. Rebuy uses expired. Festive uses exit-offer. All of these are placeholders until the banners are final.
- The festive banners (Hiring Utsav) get their own colour: the `bg-gradient-festive` token, a marigold dusk (gold-600 → red-800 → plum-950). It is used only on festive offers.
- Clay prompt for the festive art (to generate). It replaces the exit-offer placeholder:
  A single 3D clay object, centred, three-quarter view from slightly above. Subject: a rounded clay diya (oil lamp) with a small flame and three stacked coins beside it. Warm off-white lamp body, warm yellow flame and coins, a deep plum rim accent. + CLAY_STYLE (src/content/clay-style.ts), word for word.
  The body must be off-white, not yellow: the gradient's gold left edge sits right behind the art.
- Limited time offer: in the last 24 hours the "Limited time offer" badge turns into a live "Offer ends in HH:MM:SS" timer. Preview: ?bar=quarterly-to-annual-ending. Phones hide the badge, so the timer does not show there yet (open).
- Deadline under the price (2026-11-12): the badge says why the banner shows. The offer's real deadline sits under the price ("Offer ends in 6 days", then a live HH:MM:SS under 24h), on phones too. "Limited time offer" is now "Upgrade offer". Deadlines are set on: quarterly → annual, slots, festive. Not set on: credits and database top-up (open: are those prices timed?), rebuy, auto-pay, and plan-ending upgrades.
- The deadline is part of OfferBarHero (showDeadline) and off by default. Preview it with &deadline=1. Every timed case carries its endsInMs, credits and database top-up included. The badge is back to "Limited time offer". It and the deadline line use the new --deadline-on-dark token (red-300, coral) for time pressure.
- Never both (Punna): "Limited time offer" turns into the live timer ("Ends in HH:MM:SS") in its last 24 hours. Before that there is no deadline line. Phones hide the badge, so on phones the timer shows under the price instead.
- Contrast: the deadline colour moved from red-300 (3.4:1 on the chip, fails AA at 12px) to red-100 (5.3:1, passes AA).
- Badge for "Limited time offer" and the timer: C, a white pill with red text (4.8:1), chosen by Punna. A (pale red text) and B (solid red pill) stay previewable with &timer=a|b.
- Final for now (Punna): "Limited time offer" and the timer are plain white text on the usual badge, like every other badge, with no red, pill or tiles. The phone line under the price is plain too. Other options stay at &timer=a|b|c|e.
- Limited time offer moved out of the badge (Punna): "🕒 Limited time offer" sits between the price and the CTA, and becomes "Ends in HH:MM:SS" in the last 24 hours. The badge keeps the trigger, so "Plan ends in 5 days" and the limited offer can show together (quarterly → annual, last week). Set with limited: true on quarterly → annual (badge "Upgrade offer"), its last-24h case, last week, and festive.
- In the design system (2026-11-12): OfferBar is rewritten to this design, and RenewalBanner is removed. The cases are in offer-banners.tsx; the gallery is /apnahire/banners, including the festive skin examples (rangoli dots, marigold stripes, solid colour, with a Google Sans Flex headline). Next: the clay icons for these banners.
- Phones (2026-11-12): the badge now shows on phones, so the reason the banner shows ("Your plan ended", "0 job credits left") is not lost. The art stays desktop-only. (Changed 2026-11-14: phones show a 48px clay at the end of the badge row.) Checked all cases at 320px with no overflow. Clay prompts for 8 banner subjects are in docs/reference/CLAY-ILLUSTRATIONS.md ("To generate: offer banners").
- Phone spacing (Punna): headline to price is 8px, and 16px to the CTA. The deadline joins the price line when the card's inner width is at least 352px (the @offer-row container, so about 416px+ screens such as Pro Max). Below that it sits under the price. Checked at 320, 375 and 427 with no overflow.

## Mesh gradients (2026-11-12)
OfferBar surfaces moved from linear sweeps to soft mesh gradients: three blurred colour pools (radial-gradient + color-mix) over a deep base, same palette. Tokens `--mesh-offer-{subscription,credits,urgent,festive}` in semantic.css, utilities `bg-mesh-offer-*`. The subscription gold glow div is gone (the gold is now one of the mesh pools). Linear `--gradient-*` tokens kept, so reverting means changing the SURFACE map back.

## Diwali skin comes alive (2026-11-12, preview)
diwali.svg now animates inside the SVG itself: lanterns sway ±3° from the toran (4.8s, staggered), a soft orange glow breathes behind each, and the dust sparkles twinkle out of step. New `cta-trail` utility (index.css): a gold light runs round the CTA's edge every 2.4s, on ::after since ink owns ::before. Only the Diwali skin uses it. Reduced motion stops all three.
- Toran bulbs: a faint halo breathes behind each (3s, out of step), subtle.

## Festive: Diwali only; meshes rebuilt like the hero (2026-11-12)
- Festive skins cut to the Diwali toran; rangoli, stripes and solid tokens + utilities removed.
- Credits, urgent and festive meshes rebuilt on the hero mother gradient's recipe: wide ellipse washes that fade in two steps, a neighbouring hue each (credits: sky + light green; urgent: plum + a trace of gold; festive: red + plum), over a 135deg 950→900→950 base. Subscription mesh unchanged (Punna: it looks fine).

## Banner catalog (2026-11-12)
/design-system/product/banners (sidebar: Product › Banners): rules + every banner live. The gallery lives in src/components/apnahire/offer-banner-gallery.tsx, shared with /apnahire/banners.
- Clay prompts re-checked against each mesh (what sits behind the clay at top left); credits + database prompts added (2026-11-12).
- Price order fixed to AGENTS rule 7: right-aligned from md = %, strike, price; phones left = price, strike, %.
- PriceGroup (design system) now owns the price order; see DECISIONS 2026-11-12.
- Ten banner clays installed (banner-*.png, cropped square 640): upgrade, slots, rebuy (+ plan-ended), autopay, festive (+ Diwali skin), database, credits low/empty ± database.
- Removed credits-0-db / credits-1-db: a job credit pack carries no database credits, so the cases said nothing new (Punna, 2026-11-12). Their two clays deleted.
- Added database-0 (0 unlocks left, red). Clay stand-in: banner-database; prompt banner-database-empty written.
- banner-database-empty installed on database-0.
- Database banners say "database credits", never "unlocks" (AGENTS one-name rule; Punna 2026-11-12).
- Database banners say "database credits", never "unlocks" (AGENTS one-name rule; Punna 2026-11-12).
- Festive diya regenerated: deep plum painted diya on mint leaves (white one read clean, not festive). Installed as banner-festive.
- Clay library (/design-system/foundations/clay): banner clays show in the set; new 'Offer banners: full prompts' section from CLAY_BANNER_EXAMPLES (src/content/clay-style.ts).

## Holi skin (2026-11-12, example)
- Second festive skin: white base (`--gradient-festive-holi`), pastel colour clouds + floating gulal specks (`public/images/festive/holi.svg`, animated in the SVG, still under reduced motion), black text and the dark emphasis CTA (Punna: light colours, not dark).
- OfferBar gained `surface="light"`: dark text roles, the badge pill on foreground/10, data-surface="light" so emphasis stays dark, and the gold accent falls back to the text colour (gold fails on white).
- Hover: `holi-splash` (card) spreads pastel bursts across the card; `holi-splash-cta` fills the button with pastel and turns the label dark. Focus does the same. Clay is a stand-in (`success`) until banner-holi.
- Holi revised: card hover splash removed (CTA only). The top band now carries Holi things, like Diwali's toran: a pichkari (top right) sprays two dotted arcs of colour, a plum matki (top left) spills mint gulal, gulal dots bob between. Anchored top like Diwali (pt-10 md:pt-12). Clay: banner-holi (gulal bowls).
- Holi base: blush → cream → ice wash (atmosphere tokens) plus border-border, so the card no longer melts into a white page.
- Holi props removed (Punna: looked weird): the flat pichkari/matki clashed with the 3D clay and the matki repeated its pots; dots were noise. Back to pastel clouds + specks on the wash; the clay carries Holi.
- Holi v3 (balance like Diwali): props only in the empty middle band (≈50–78% of the width), clear of the clay and the price: three water balloons hang from the top edge and sway, a shaded clay-like pichkari rests at an angle and sprays a dotted arc that lands in a small mint splash. No matki (the clay has pots), no dot trail.
- Holi phones: own art (holi-phone.svg), only the three balloons in the empty top-right beside the badge, short strings so they clear the headline; desktop keeps the full scene from md. (Replaced 2026-11-14: the banner clay now takes that corner on phones, so the balloons were removed.)

## FOMO copy and plans page (2026-11-13)
One negative per banner, and it lives in the chip. The headline is the way forward, a gain; the gold number stays the price. Urgency is the deadline ("Ends 19 Nov", then a timer in the last 24 hours) or a keep-it line ("Renew before it goes"). Logged-in `/apnahire/credits` shows one banner above the tabs (Jobs: credits-0, Database: database-0, Unlimited: quarterly-to-annual, Enterprise: none). `?bar=` previews any case. `/pricing` shows none. Which case is really due is still open.
The chip is a sentence-case `Badge` (`on-dark` / `on-tint`, `lg`). Renew reads "Your old price is still yours. Renew before it goes". Every case is in DECISIONS 2026-11-13.
Clay subjects rewritten in `src/content/clay-style.ts` (the stake, not a document with an arrow). Draft renders were made and not installed: the cut-out left a grey fringe. The live PNGs are still the previous set.

"use client"

/** Every rebuy / upgrade / credit banner, grouped, plus the festive skin example.
 *  Shown on /apnahire/banners and the design system's Banners page. */

import Image from "next/image"
import { Button, OfferBar, OfferBarAccent } from "@apna/design-system"
import { OFFER_BANNERS, OfferBannerFor, isOfferBannerCase } from "@/components/apnahire/offer-banners"

/** Festive skins: the same OfferBar, with a campaign's own background,
 *  headline face and clay. Examples only; the capability comes later. */
const SKINS = [
  { name: "Diwali toran", note: "Marigold toran and hanging lanterns over the festive gradient · Google Sans Flex headline · diya clay", bg: "bg-festive-diwali! pt-10 md:pt-12", art: "banner-festive", badge: "Hiring Utsav", trail: true, surface: "festive" as const },
  { name: "Holi colours", note: "Pastel clouds on a soft blush-to-ice wash with a hairline edge · dark text and CTA · hover splashes colour on the CTA only · Google Sans Flex headline", bg: "bg-festive-holi! border border-border", art: "banner-holi", badge: "Holi hiring sale", trail: false, surface: "light" as const },
]

function FestiveSkins() {
  return (
    // data-voice turns font-hero into Google Sans Flex, as on marketing pages.
    <section data-voice="editorial" className="flex flex-col gap-4">
      <h2 className="text-h5">Festive skins (examples)</h2>
      <p className="text-sm text-muted-foreground">
        Same structure as the festive banner. Only the background, the headline font and the clay change.
      </p>
      {SKINS.map((k) => (
        <div key={k.name} className="flex flex-col gap-2">
          <code className="text-xs text-muted-foreground">{k.name} · {k.note}</code>
          <OfferBar
            surface={k.surface}
            className={k.bg}
            art={<Image src={`/images/company/values/${k.art}.png`} alt="" width={96} height={96} unoptimized />}
            badge={k.badge}
            headline={
              <span className="font-hero text-xl tracking-tight md:text-3xl">
                22 job credits at just <OfferBarAccent>₹455 each</OfferBarAccent>
              </span>
            }
            sub="Valid for 365 days"
            price={{ amount: "₹9,999", strike: "₹15,383" }}
            deadline="Limited time offer"
            cta={<Button variant="emphasis" className={k.trail ? "cta-trail" : k.surface === "light" ? "holi-splash-cta" : undefined}>Buy job credits</Button>}
          />
        </div>
      ))}
    </section>
  )
}

const GROUPS: [string, string[]][] = [
  ["Upgrade", ["monthly-to-quarterly", "quarterly-to-annual", "quarterly-to-annual-ending", "quarterly-to-annual-last-week", "slots-2", "slots-3"]],
  ["Renew", ["rebuy-monthly", "rebuy-quarterly", "rebuy-annual"]],
  ["Job credits", ["credits-0", "credits-1", "database-0", "database-top-up"]],
  ["Festive", ["festive-unlimited", "festive-credits"]],
  ["Action", ["auto-pay-off"]],
]

export function OfferBannerGallery() {
  return (
    <div className="flex flex-col gap-10 p-4 md:p-8">
      {GROUPS.map(([title, keys]) => (
        <section key={title} className="flex flex-col gap-4">
          <h2 className="text-h5">{title}</h2>
          {keys.filter(isOfferBannerCase).map((k) => (
            <div key={k} className="flex flex-col gap-2">
              <code className="text-xs text-muted-foreground">{OFFER_BANNERS[k].label} · ?bar={k}</code>
              <OfferBannerFor bar={k} />
            </div>
          ))}
        </section>
      ))}
      <FestiveSkins />
    </div>
  )
}


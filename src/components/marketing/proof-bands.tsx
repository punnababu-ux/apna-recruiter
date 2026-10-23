/**
 * The proof, drawn once for every page that makes the case (home, pricing):
 *
 *   TrustedByBand  white band: "Trusted by" eyebrow, "Top Hiring Partners",
 *                  the client logo wall
 *   WhyHireBand    gradient band: "Why hire from apna?", the outcome
 *                  numbers (StatGrid) and the customers' quotes
 *   FaqBand        white band: the FAQ, the page's last band
 *
 * Copy: content/home.ts (HOME_TRUSTED_BY, HOME_PROOF).
 */

import { LogoWall, Section, SectionHeading } from "@apna/design-system"
import { FaqSection } from "@/components/apnahire/faq-section"
import { TestimonialGrid } from "@/components/apnahire/testimonial-grid"
import { StatGrid } from "@/components/marketing/page-blocks"
import { SettleIn } from "@/components/marketing/settle-in"
import { HOME_PROOF, HOME_TRUSTED_BY } from "@/content/home"
import { CLIENT_LOGOS } from "@/content/logos"

const CLIENT_LOGO_ITEMS = CLIENT_LOGOS.map((client) => ({
  name: client.name,
  logo: (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={client.src} alt={client.name} height={36} width={client.width} />
  ),
}))

export function TrustedByBand() {
  return (
    <Section tone="card" size="md">
      <div className="flex flex-col items-center gap-10">
        <SectionHeading
          level={2}
          align="center"
          eyebrow={<span className="text-overline text-muted-foreground">{HOME_TRUSTED_BY.eyebrow}</span>}
          title={HOME_TRUSTED_BY.title}
        />
        {/* In full colour at rest, not muted until hover (user call, 2026-10-23). */}
        <LogoWall items={CLIENT_LOGO_ITEMS} marquee />
      </div>
    </Section>
  )
}

/** The trusted-by logos, compact, for product flows (express checkout's plan
 *  step): a gray caption and a still logo row (no glide: it's a checkout,
 *  not a showcase), no band or heading. */
export function TrustedByStrip() {
  return (
    <div data-slot="trusted-by-strip" className="flex flex-col gap-4 pt-6">
      {/* The homepage's figure (HOME stats: 7 L+ businesses & enterprises). */}
      <p className="text-base font-semibold text-foreground">Trusted by 7 lakh+ businesses and enterprises for hiring</p>
      {/* Still, so a fixed set: the seven that fit one desktop row (phones
          swipe it). */}
      <LogoWall items={CLIENT_LOGO_ITEMS.slice(0, 7)} muted />
    </div>
  )
}

export function WhyHireBand({
  stats = HOME_PROOF.why.stats,
  tone,
}: {
  /** "card" for a white band where the page's rhythm needs one (home). */
  tone?: "card"
  /** Pricing shows the platform's scale (PRICING_STATS) instead; the
   *  homepage passes none, since its hero already carries the numbers. */
  stats?: readonly { value: string; label: string }[]
}) {
  return (
    // Brand green accents (stat bars, quote marks); the numbers card and the
    // quotes share one surface (surface-frosted: grey on white, frosted on a
    // gradient), so the band reads as one set.
    <Section tone={tone} size="md" data-accent="brand">
      <div className="flex flex-col gap-10">
        <SectionHeading
          level={2}
          align="center"
          title={HOME_PROOF.why.title}
          description={HOME_PROOF.why.description}
        />
        {/* The numbers and the quotes rise into place as you arrive. */}
        <SettleIn className="flex flex-col gap-10">
          {stats.length > 0 && <StatGrid stats={stats} />}
          <TestimonialGrid />
        </SettleIn>
      </div>
    </Section>
  )
}

export function FaqBand() {
  return (
    <Section tone="card" size="md">
      {/* The questions land one after another as you arrive. */}
      <SettleIn>
        <FaqSection items={HOME_PROOF.faqs} className="py-0" />
      </SettleIn>
    </Section>
  )
}

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

import { Card, LogoWall, Section, SectionHeading } from "@apna/design-system"
import { FaqSection } from "@/components/apnahire/faq-section"
import { TestimonialGrid } from "@/components/apnahire/testimonial-grid"
import { StatGrid } from "@/components/marketing/page-blocks"
import { SettleIn } from "@/components/marketing/settle-in"
import { ValueArt, type ValueName } from "@/components/marketing/value-art"
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
  /** Pricing shows the platform's scale (PRICING_STATS) instead. */
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
          <StatGrid stats={stats} />
          <TestimonialGrid />
        </SettleIn>
      </div>
    </Section>
  )
}

/** PREVIEW (`/?hero=post-job`): "Why hire from apna?" as how apna works.
 *  Four points (a clay object, a title, a line), then the customers'
 *  quotes as the human voice. The numbers moved to the trust panel, so
 *  nothing here repeats it. */
export function HowApnaWorksBand() {
  return (
    <Section size="md" data-accent="brand">
      <div className="flex flex-col gap-10">
        <SectionHeading
          level={2}
          align="center"
          title={HOME_PROOF.how.title}
          description={HOME_PROOF.how.description}
        />
        <SettleIn className="flex flex-col gap-10">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_PROOF.how.points.map((point) => (
              <li key={point.title}>
                <Card padding="lg" className="surface-frosted h-full items-center gap-4 text-center">
                  <ValueArt name={point.art as ValueName} size="sm" />
                  <h3 className="text-h6 text-foreground">{point.title}</h3>
                  <p className="text-sm text-pretty text-muted-foreground">{point.description}</p>
                </Card>
              </li>
            ))}
          </ul>
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

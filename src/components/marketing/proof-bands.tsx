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
        <LogoWall items={CLIENT_LOGO_ITEMS} muted />
      </div>
    </Section>
  )
}

export function WhyHireBand({
  stats = HOME_PROOF.why.stats,
}: {
  /** Pricing shows the platform's scale (PRICING_STATS) instead. */
  stats?: readonly { value: string; label: string }[]
}) {
  return (
    <Section size="md">
      <div className="flex flex-col gap-10">
        <SectionHeading
          level={2}
          align="center"
          title={HOME_PROOF.why.title}
          description={HOME_PROOF.why.description}
        />
        <StatGrid stats={stats} />
        <TestimonialGrid />
      </div>
    </Section>
  )
}

export function FaqBand() {
  return (
    <Section tone="card" size="md">
      <FaqSection items={HOME_PROOF.faqs} hideActions className="py-0" />
    </Section>
  )
}

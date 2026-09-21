/**
 * `/` — the employer homepage.
 *
 * Scaffold. The hero below is the P0 "first frame" from the prioritization
 * sheet, built to prove the shell and the new primitives compose; the
 * remaining bands (hiring suite, pricing, why-apna, testimonials, FAQ, CTA)
 * land in Phase 1.
 *
 * Two columns on the hero, matching both references: copy + stats on the
 * left, the lead-capture card on the right — the card IS the primary CTA,
 * so unlike an earlier draft of this page there are no separate "Post a
 * Job" / "See pricing" buttons competing with it in the text column.
 */

import { Badge, CheckCircle2, Section, SectionHeading } from "@apna/design-system"
import { HeroLeadCard } from "@/components/marketing/hero-lead-card"
import { HOME_HERO } from "@/content/home"

export default function HomePage() {
  return (
    <Section size="lg">
      <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-10">
          <SectionHeading
            level={1}
            eyebrow={
              <Badge size="lg" variant="outline" className="bg-card">
                <CheckCircle2 aria-hidden />
                {HOME_HERO.eyebrow}
              </Badge>
            }
            title={
              <>
                India&apos;s Largest <span className="text-primary">AI-Native</span>{" "}
                Early Talent Platform
              </>
            }
            description={HOME_HERO.description}
          />

          <dl className="flex flex-wrap gap-x-12 gap-y-6">
            {HOME_HERO.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-h3 font-heading font-semibold text-foreground">
                  {stat.value}
                </dd>
                <p aria-hidden className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* max-w-md is already set inside HeroLeadCard itself — shrink-0
            just stops the flex row from compressing it on medium widths. */}
        <HeroLeadCard className="w-full shrink-0" />
      </div>
    </Section>
  )
}

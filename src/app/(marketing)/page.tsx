/**
 * `/` — the employer homepage.
 *
 * Scaffold. The hero below is the P0 "first frame" from the prioritization
 * sheet, built to prove the shell and the new primitives compose; the
 * remaining bands (hiring suite, pricing, why-apna, testimonials, FAQ, CTA)
 * land in Phase 1.
 */

import Link from "next/link"
import {
  ArrowRight,
  Badge,
  Button,
  CheckCircle2,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { HOME_HERO } from "@/content/home"

export default function HomePage() {
  return (
    <Section size="lg">
      <div className="flex flex-col gap-10">
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

        {/* Not SectionHeading's `actions` slot — that places buttons opposite
            the title, which is right for a section header and wrong for a
            hero, where the CTAs read as the next step after the subcopy. */}
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" className="rounded-full" render={<Link href="/post-a-job" />}>
            {HOME_HERO.primaryCta} <ArrowRight aria-hidden />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full"
            render={<Link href="/pricing" />}
          >
            {HOME_HERO.secondaryCta}
          </Button>
        </div>

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
    </Section>
  )
}

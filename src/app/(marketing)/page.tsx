/**
 * `/` — the employer homepage.
 *
 * Scaffold. The hero below is the P0 "first frame" from the prioritization
 * sheet, built to prove the shell and the new primitives compose; the
 * remaining bands (pricing, why-apna, testimonials, FAQ, CTA) land in
 * Phase 1.
 *
 * Two columns on the hero, matching both references: copy + stats on the
 * left, the lead-capture card on the right — the card IS the primary CTA,
 * so unlike an earlier draft of this page there are no separate "Post a
 * Job" / "See pricing" buttons competing with it in the text column.
 */

import Link from "next/link"
import {
  Badge,
  Card,
  CheckCircle2,
  LogoWall,
  Quote,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { HeroLeadCard } from "@/components/marketing/hero-lead-card"
import { ProductShowcase } from "@/components/marketing/product-showcase"
import { HOME_HERO, HOME_PRESS, HOME_SUITE, HOME_TRUSTED_BY } from "@/content/home"
import { CLIENT_LOGOS } from "@/content/logos"

const CLIENT_LOGO_ITEMS = CLIENT_LOGOS.map((client) => ({
  name: client.name,
  logo: (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={client.src} alt={client.name} height={36} width={client.width} />
  ),
}))

export default function HomePage() {
  return (
    <>
      {/* The hero's living background sits behind the section (and the
          transparent header above it); the section paints over it. */}
      <div className="relative isolate">
        <HeroBackdrop />
        <Section size="lg" className="relative">
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
                description={
                  <>
                    {HOME_HERO.description}
                    <br />
                    {HOME_HERO.tagline}
                  </>
                }
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
      </div>

      <Section tone="card" size="md">
        <div className="flex flex-col items-center gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={
              <span className="text-overline text-muted-foreground">
                {HOME_TRUSTED_BY.eyebrow}
              </span>
            }
            title={HOME_TRUSTED_BY.title}
          />
          <LogoWall items={CLIENT_LOGO_ITEMS} muted />
        </div>
      </Section>

      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={
              <span className="text-overline text-primary">{HOME_SUITE.eyebrow}</span>
            }
            title={HOME_SUITE.title}
            description={HOME_SUITE.description}
          />

          {/* One interactive showcase: products as tabs, each with a live
              demo — replaces the product grid + alternating detail rows. */}
          <ProductShowcase />
        </div>
      </Section>

      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={HOME_PRESS.title} />

          <div className="grid gap-6 sm:grid-cols-3">
            {HOME_PRESS.items.map((item) => (
              <Link key={item.outlet} href={item.href} target="_blank" rel="noreferrer noopener">
                <Card padding="lg" interactive className="flex h-full flex-col gap-4">
                  <Quote className="size-6 text-muted-foreground" aria-hidden />
                  <p className="font-serif text-lg leading-7 text-foreground italic">
                    &ldquo;{item.headline}&rdquo;
                  </p>
                  <span className="mt-auto text-sm font-semibold text-foreground">
                    {item.outlet}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}

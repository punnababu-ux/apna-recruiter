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
  ArrowRight,
  Badge,
  Briefcase,
  Card,
  CardContent,
  CheckCircle2,
  InfinityIcon,
  LogoWall,
  PhoneCall,
  Search,
  Section,
  SectionHeading,
  type IconComponent,
} from "@apna/design-system"
import { HeroLeadCard } from "@/components/marketing/hero-lead-card"
import { HOME_HERO, HOME_SUITE, HOME_TRUSTED_BY } from "@/content/home"
import { CLIENT_LOGOS } from "@/content/logos"
import { PRODUCT_LINKS } from "@/content/nav"

const CLIENT_LOGO_ITEMS = CLIENT_LOGOS.map((client) => ({
  name: client.name,
  logo: (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={client.src} alt={client.name} height={36} width={client.width} />
  ),
}))

const SUITE_ICONS: Record<(typeof HOME_SUITE.items)[number]["icon"], IconComponent> = {
  briefcase: Briefcase,
  phone: PhoneCall,
  search: Search,
  infinity: InfinityIcon,
}

// nav.ts's PRODUCT_LINKS is the one place a product's href is defined —
// cross-referenced by name rather than duplicating the URL here too.
function hrefFor(name: string) {
  return PRODUCT_LINKS.find((p) => p.label === name)?.href ?? "#"
}

export default function HomePage() {
  return (
    <>
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

            <p className="text-sm font-medium text-muted-foreground">{HOME_HERO.tagline}</p>
          </div>

          {/* max-w-md is already set inside HeroLeadCard itself — shrink-0
              just stops the flex row from compressing it on medium widths. */}
          <HeroLeadCard className="w-full shrink-0" />
        </div>
      </Section>

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

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOME_SUITE.items.map((item) => {
              const Icon = SUITE_ICONS[item.icon]
              return (
                <Card key={item.name} padding="none" interactive className="overflow-hidden">
                  {/* Plain tinted block + icon, not a mockup illustration —
                      see the file header for why. */}
                  <div className="flex h-32 items-center justify-center bg-muted">
                    <Icon className="size-10 text-primary" aria-hidden />
                  </div>
                  <CardContent className="flex flex-col gap-3 p-6">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-base font-heading font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.tagline}</p>
                    </div>
                    <Link
                      href={hrefFor(item.name)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
                    >
                      Learn more <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </Section>
    </>
  )
}

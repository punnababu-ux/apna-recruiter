/**
 * ProductPage — the template every /products/* page renders, from one
 * `ProductPageContent` entry (content/products.ts).
 *
 *   Hero      eyebrow, h1, the tagline, the one primary action and a
 *             "Contact sales" outline link to the page's contact band; the
 *             product's illustration opposite (the homepage card's art)
 *   Stats     optional, a row of numbers under the hero
 *   Steps     optional, "How it works" as numbered cards
 *   Features  a grid of cards: icon, title, description
 *   Contact   the shared closing band (ContactSection)
 *
 * Pure layout over Section, SectionHeading, Card and Button, so the four
 * product pages and the homepage read as one site. One primary (green) CTA
 * per page: the hero's; the contact band keeps its dark emphasis button.
 */

import type { ComponentType } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Button,
  Card,
  Clock,
  Database,
  Eye,
  FileText,
  Filter,
  ListChecks,
  MapPin,
  PhoneCall,
  RefreshCw,
  Search,
  Section,
  SectionHeading,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
  WhatsApp,
  Zap,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { HeroChip } from "@/components/marketing/page-blocks"
import { PRODUCT_GRADIENT, ProductIllustration } from "@/components/marketing/product-illustrations"
import { cn } from "@/lib/utils"
import { CONTACT_ANCHOR } from "@/content/contact"
import type { ProductIconName, ProductPageContent } from "@/content/products"

const ICONS: Record<ProductIconName, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  filter: Filter,
  sparkles: Sparkles,
  whatsapp: WhatsApp,
  users: Users,
  list: ListChecks,
  zap: Zap,
  search: Search,
  map: MapPin,
  eye: Eye,
  file: FileText,
  sliders: SlidersHorizontal,
  phone: PhoneCall,
  trending: TrendingUp,
  clock: Clock,
  briefcase: Briefcase,
  refresh: RefreshCw,
  database: Database,
}

export function ProductPage({ content }: { content: ProductPageContent }) {
  const { product, eyebrow, heading, description, cta, stats, steps, features } = content

  return (
    <>
      {/* The hero wears the product's own gradient (its homepage card's), so
          "Learn more" lands on the colour it was clicked from. Starts behind
          the header and melts into the page at its foot. */}
      <div className="relative isolate">
        <div
          aria-hidden
          className={cn("absolute inset-x-0 -top-18 bottom-0 -z-10 mask-fade-b", PRODUCT_GRADIENT[product])}
        />
        <Section size="lg" className="relative max-md:pt-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-8">
              <SectionHeading
                level={1}
                voice="editorial"
                eyebrow={<HeroChip>{eyebrow}</HeroChip>}
                title={heading}
                description={description}
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href={cta.href} />}
                  trailingIcon={<ArrowRight aria-hidden />}
                >
                  {cta.label}
                </Button>
                <Button size="lg" variant="outline" nativeButton={false} render={<Link href={`#${CONTACT_ANCHOR}`} />}>
                  Contact sales
                </Button>
              </div>
            </div>
            <ProductIllustration product={product} size="lg" bare className="h-72 sm:h-96" />
          </div>
        </Section>
      </div>

      {stats && (
        <Section tone="card" size="sm">
          <dl className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
                <dd className="order-1 font-heading text-h2 font-semibold text-foreground">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {steps && (
        <Section size="md">
          <div className="flex flex-col gap-10">
            <SectionHeading
              level={2}
              align="center"
              voice="editorial"
              eyebrow={<span className="text-overline text-muted-foreground">{steps.title}</span>}
              title={steps.heading}
            />
            <ol className="grid gap-6 md:grid-cols-3">
              {steps.items.map((step, i) => (
                <li key={step.title}>
                  <Card padding="lg" className="h-full gap-4">
                    <span className="font-heading text-h3 font-semibold text-primary tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h6 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      )}

      <Section size="md" tone={steps ? "card" : "transparent"}>
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" voice="editorial" title={features.title} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.items.map((feature) => {
              const Icon = ICONS[feature.icon]
              return (
                <li key={feature.title}>
                  <Card padding="lg" tone={steps ? "muted" : "default"} className="h-full gap-3">
                    <Icon className="size-6 text-primary" aria-hidden />
                    <h3 className="text-h6 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </li>
              )
            })}
          </ul>
        </div>
      </Section>

      <ContactSection />
    </>
  )
}

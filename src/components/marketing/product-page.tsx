/**
 * ProductPage — the template every /products/* page renders, from one
 * `ProductPageContent` entry (content/products.ts).
 *
 *   Hero      eyebrow, h1, the tagline, the one primary action and a
 *             "Contact sales" outline link to the page's contact band; the
 *             product's illustration opposite (the homepage card's art)
 *   Stats     optional, a row of numbers under the hero
 *   Features  one grid of cards (icon, title, description): the steps
 *             first when there are any, under a "How it works" eyebrow
 *   (The contact band comes from the marketing layout.)
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
  InfinityIcon,
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
import { HeroChip, StatGrid } from "@/components/marketing/page-blocks"
import { PRODUCT_KEY, ProductIllustration } from "@/components/marketing/product-illustrations"
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

/** The hero chip's icon: the product itself. */
const PRODUCT_CHIP_ICON: Record<ProductPageContent["product"], ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  "Smart Jobs": Briefcase,
  "AI Calling Agent": PhoneCall,
  "Hyperlocal Database": Database,
  "apna Unlimited": InfinityIcon,
}

export function ProductPage({ content }: { content: ProductPageContent }) {
  const { product, eyebrow, heading, description, cta, stats, steps, features } = content
  const ChipIcon = PRODUCT_CHIP_ICON[product]

  return (
    // The product's colour is the page's identity, header to footer: the
    // shell paints its canvas (the homepage gradient re-tinted in the
    // product's hue, data-product-canvas), and the product roles colour
    // icons and numbers (data-product). Brand green stays the primary. The
    // bands are transparent so the canvas runs through; cards float on it.
    <div data-product={PRODUCT_KEY[product]} data-product-canvas={PRODUCT_KEY[product]}>
      <div>
        <Section size="lg" className="relative max-md:pt-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-8">
              <SectionHeading
                level={1}
                eyebrow={<HeroChip icon={<ChipIcon aria-hidden />}>{eyebrow}</HeroChip>}
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

      {/* The numbers, anchored to the hero: one card, right under it. */}
      {stats && (
        <Section size="none" className="relative -mt-8 pb-8 md:-mt-12 md:pb-12">
          <StatGrid stats={stats} />
        </Section>
      )}

      {/* One section: the steps (if any) then the features, one card grid,
          one title — with steps, "How it works" sits over it as the eyebrow. */}
      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={steps && <span className="text-overline text-muted-foreground">{steps.title}</span>}
            title={features.title}
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...(steps?.items ?? []), ...features.items].map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <li key={item.title}>
                  <Card padding="lg" className="surface-frosted h-full gap-3">
                    <Icon className="size-6 text-product-accent" aria-hidden />
                    <h3 className="text-h6 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </li>
              )
            })}
          </ul>
        </div>
      </Section>
    </div>
  )
}

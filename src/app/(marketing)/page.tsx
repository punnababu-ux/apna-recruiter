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
  ArrowUpRight,
  Building2,
  Badge,
  Button,
  Card,
  CheckCircle2,
  LogoApnaUnlimited,
  Newspaper,
  ScrollStack,
  ScrollStackItem,
  Trophy,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { Stat } from "@/components/marketing/page-blocks"
import { FaqBand, TrustedByBand, WhyHireBand } from "@/components/marketing/proof-bands"
import { ContactButton } from "@/components/marketing/contact-section"
import { ValueArt } from "@/components/marketing/value-art"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { HeroLeadCard } from "@/components/marketing/hero-lead-card"
import { PRODUCT_ICON, PRODUCT_KEY, ProductIllustration } from "@/components/marketing/product-illustrations"
import {
  HOME_ENTERPRISE,
  HOME_HERO,
  HOME_PRESS,
  HOME_PRODUCT_DETAILS,
  HOME_SUITE,
} from "@/content/home"
import { PRODUCT_LINKS } from "@/content/nav"



type ProductName = (typeof HOME_SUITE.items)[number]["name"]

// nav.ts's PRODUCT_LINKS is the one place a product's href is defined —
// cross-referenced by name rather than duplicating the URL here too.
function hrefFor(name: string) {
  return PRODUCT_LINKS.find((p) => p.label === name)?.href ?? "#"
}

export default function HomePage() {
  return (
    <>
      {/* The hero's living background sits behind the section (and the
          transparent header above it); the section paints over it. */}
      <div className="relative isolate">
        <HeroBackdrop />
        {/* Phones: the sign-up form must sit in the first screen. Less
            space above, no badge, one line of subtext, a smaller headline
            (the display token's phone size), then the form, then the stats
            as a compact strip under it. The text column is `contents` below
            lg so its heading and stats can sit either side of the form. */}
        <Section size="lg" className="relative max-md:pt-6">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex max-w-2xl flex-col gap-10 max-lg:contents">
              <SectionHeading
                level={1}
                eyebrow={
                  // Says what "India's Largest" says right under it; phones
                  // can't spare the row.
                  <Badge size="lg" variant="outline" className="bg-card max-sm:hidden">
                    <Trophy aria-hidden />
                    {HOME_HERO.eyebrow}
                  </Badge>
                }
                title={
                  <>
                    India&apos;s Largest{" "}
                      {/* The green ramp flowing across the word, and its one italic
                          accent (every hero headline has one). */}
                      <em className="animate-text-gradient whitespace-nowrap text-primary">AI-Native</em>{" "}
                    Early Talent Platform
                  </>
                }
                description={
                  <>
                    {HOME_HERO.description}
                    {/* The tagline is the second line from sm; on phones the
                        two ran together as one run-on sentence. */}
                    <span className="max-sm:hidden">
                      <br />
                      {HOME_HERO.tagline}
                    </span>
                  </>
                }
              />

              {/* Phones: a compact 3-up strip under the form. */}
              <dl className="grid w-full grid-cols-3 gap-4 max-lg:order-last sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-6">
                {HOME_HERO.stats.map((stat) => (
                  <Stat key={stat.label} value={stat.value} label={stat.label} size="sm" />
                ))}
              </dl>
            </div>

            {/* max-w-md is already set inside HeroLeadCard itself — shrink-0
                just stops the flex row from compressing it on medium widths. */}
            <HeroLeadCard className="w-full shrink-0" />
          </div>
        </Section>
      </div>

      <TrustedByBand />

      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={
              <span className="text-overline text-muted-foreground">{HOME_SUITE.eyebrow}</span>
            }
            title={HOME_SUITE.title}
            description={HOME_SUITE.description}
          />

          {/* One card per product — its text and illustration in its own
              container, so each offering reads as a chapter. From lg the
              cards stack as you scroll (ScrollStack): each pins below the
              last and the next slides over it. The overview cards that sat
              above were dropped (2026-10-16) as repetitive. Sourcing:
              content/home.ts HOME_PRODUCT_DETAILS. */}
          <ScrollStack>
            {HOME_PRODUCT_DETAILS.map((product) => (
              // p-2 insets the tile 8px from the card edge on three sides, so
              // the corners nest: tile rounded-xl (12.5px) + 8px + border ≈
              // the card's rounded-card (19.5px).
              <ScrollStackItem
                key={product.name}
                data-product={PRODUCT_KEY[product.name as ProductName]}
                className="group grid gap-2 p-2 lg:grid-cols-2"
              >
                <div className="flex flex-col gap-5 p-4 sm:p-6 lg:p-8">
                  {/* apna Unlimited is a brand with its own wordmark — show the
                      "apna ∞ Unlimited" logo, not the eyebrow text. */}
                  {product.name === "apna Unlimited" ? (
                    <LogoApnaUnlimited variant="theme" className="h-4 w-auto self-start text-foreground" />
                  ) : (
                    // The product's mark from its page's hero chip, so the card
                    // and the page it opens read as one product.
                    <span className="flex items-center gap-2 text-overline text-muted-foreground">
                      {(() => {
                        const Icon = PRODUCT_ICON[product.name as ProductName]
                        return <Icon className="size-4 shrink-0" aria-hidden />
                      })()}
                      {product.eyebrow}
                    </span>
                  )}
                  <h3 className="text-h4 text-foreground">{product.heading}</h3>
                  <ul className="flex flex-col gap-4">
                    {product.features.map((feature) => (
                      <li key={feature.title} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* The card's one action, in the dark `emphasis` button: green
                      stays with the hero's sign-up, the page's one primary. */}
                  <Button
                    variant="emphasis"
                    size="lg"
                    className="w-fit"
                    nativeButton={false}
                    render={<Link href={hrefFor(product.name)} />}
                    trailingIcon={<ArrowRight aria-hidden />}
                  >
                    Learn more
                  </Button>
                </div>
                {/* Phones: the illustration leads, the copy follows. */}
                <ProductIllustration
                  product={product.name as ProductName}
                  size="lg"
                  className="h-64 max-lg:order-first lg:h-full lg:min-h-80"
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>

          {/* Enterprise (the live site's band): the suite's closing card, for
              buyers hiring at scale — the route in for new enterprise
              customers (Enterprise login is for existing ones). */}
          {/* Solid white with the elevated shadow, so the suite's closing card
              lifts off its gradient band (frosted glass would blend in). */}
          <Card tone="solid" padding="none" className="grid gap-8 shadow-elevated p-6 sm:p-10 lg:grid-cols-5 lg:items-center lg:gap-8 lg:p-12">
            <div className="flex flex-col gap-6 lg:col-span-3">
              <div className="flex flex-col gap-3">
                <span className="flex items-center gap-2 text-overline text-muted-foreground">
                  <Building2 className="size-4 shrink-0" aria-hidden />
                  {HOME_ENTERPRISE.eyebrow}
                </span>
                <h3 className="text-h3 text-balance text-foreground">{HOME_ENTERPRISE.title}</h3>
                <p className="text-base text-pretty text-muted-foreground">{HOME_ENTERPRISE.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {/* Opens the contact form pop-up, as "Contact us" does. */}
                <ContactButton variant="emphasis" size="lg">
                  {HOME_ENTERPRISE.primary.label}
                </ContactButton>
                <Button
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  render={<Link href={HOME_ENTERPRISE.secondary.href} />}
                  trailingIcon={<ArrowRight aria-hidden />}
                >
                  {HOME_ENTERPRISE.secondary.label}
                </Button>
              </div>
            </div>
            {/* One picture, not a list: Enterprise's own 3D clay building, as
                the product cards above pair copy with a picture. */}
            {/* Copy 3/5, picture 2/5 at its large size, so the picture fills
                its side instead of floating in it. */}
            <div className="flex justify-center max-lg:order-first lg:col-span-2">
              <ValueArt name="enterprise" size="lg" />
            </div>
          </Card>
        </div>
      </Section>


      {/* The proof (white), the press (gradient), then the FAQ (white, the
          page's last band). */}
      <WhyHireBand tone="card" />
      {/* In the press (gradient): after the proof, so white and gradient
          still alternate. */}
      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={HOME_PRESS.title} />

          <div className="grid gap-6 sm:grid-cols-3">
            {HOME_PRESS.items.map((item) => (
              <Link key={item.outlet} href={item.href} target="_blank" rel="noreferrer noopener">
                {/* A headline, not a quote: the outlet up top (the newspaper
                    mark), the headline as a headline, then the way to it. */}
                <Card padding="lg" interactive className="flex h-full flex-col gap-4">
                  <span className="flex items-center gap-2 text-overline text-muted-foreground">
                    <Newspaper className="size-4 shrink-0 text-primary" aria-hidden />
                    {item.outlet}
                  </span>
                  <p className="text-h5 text-pretty text-foreground">{item.headline}</p>
                  <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-foreground">
                    Read the story
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>
      <FaqBand />
    </>
  )
}

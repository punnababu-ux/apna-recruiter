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
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { HeroLeadCard } from "@/components/marketing/hero-lead-card"
import { EnterpriseIllustration, PRODUCT_ICON, PRODUCT_KEY, ProductIllustration } from "@/components/marketing/product-illustrations"
import {
  HOME_ENTERPRISE,
  HOME_HERO,
  HOME_PRESS,
  HOME_PRODUCT_DETAILS,
  HOME_SUITE,
} from "@/content/home"
import { PRODUCT_LINKS } from "@/content/nav"
import { PRESS } from "@/content/press"
import { ENTERPRISE } from "@/content/enterprise"



// The homepage's three stories, as the Newsroom lists them (content/press.ts):
// the article's own headline and date, not a summary of it.
const HOME_PRESS_ARTICLES = HOME_PRESS.items.flatMap((item) => PRESS.items.filter((a) => a.url === item.href))

type ProductName = (typeof HOME_SUITE.items)[number]["name"]

// nav.ts's PRODUCT_LINKS is the one place a product's href is defined —
// cross-referenced by name rather than duplicating the URL here too.
function hrefFor(name: string) {
  return PRODUCT_LINKS.find((p) => p.label === name)?.href ?? "#"
}

/** Enterprise is the deck's last stacking card: two of its features here,
 *  the rest behind "See all features". */
const ENTERPRISE_STACK_FEATURES = ["Team management", "ATS Integrations"]
  .map((title) => ENTERPRISE.features.items.find((item) => item.title === title)!)

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
        <Section size="lg" className="relative max-md:pt-6 md:pb-48">
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
                    India&apos;s largest <span className="whitespace-nowrap">AI-native</span> early talent platform
                  </>
                }
                description={
                  <span>
                    {HOME_HERO.description}
                    {/* The tagline is the second line from sm; on phones the
                        two ran together as one run-on sentence. */}
                    <span className="max-sm:hidden">
                      <br />
                      {HOME_HERO.tagline}
                    </span>
                  </span>
                }
              />

              {/* Phones: a compact 3-up strip under the form. */}
              <dl className="grid w-full grid-cols-3 gap-4 max-lg:order-last sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-6">
                {HOME_HERO.stats.map((stat) => (
                  <Stat
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    shortLabel={stat.shortLabel}
                    size="sm"
                  />
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

      {/* The hiring suite on the gradient: white cards, each illustration
          on its product's gradient. */}
      <Section size="lg">
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
                className="group relative grid cursor-pointer gap-2 p-2 lg:grid-cols-2"
              >
                {/* The whole card opens the product's page (in place of a
                    "Learn more" button); the action button stays on top. */}
                <Link
                  href={hrefFor(product.name)}
                  aria-label={`Learn more about ${product.eyebrow}`}
                  className="absolute inset-0 rounded-card focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                />
                <div className="pointer-events-none relative flex flex-col gap-8 p-6 sm:p-10 lg:p-16">
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
                  <h3 className="text-h1 text-foreground">{product.heading}</h3>
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
                  {/* One action per card, in the dark `emphasis` button (green
                      stays with the hero's sign-up, the page's one primary).
                      Full width on phones. */}
                  <Button
                    variant="emphasis"
                    size="lg"
                    className="pointer-events-auto w-full sm:w-fit"
                    nativeButton={false}
                    render={<Link href={product.action.href} />}
                    trailingIcon={<ArrowRight aria-hidden />}
                  >
                    {product.action.label}
                  </Button>
                </div>
                {/* Phones: the illustration leads, the copy follows. It wears
                    its product's gradient on the white card. */}
                <ProductIllustration
                  product={product.name as ProductName}
                  size="lg"
                  className="pointer-events-none relative h-64 max-lg:order-first lg:h-full lg:min-h-112"
                />
              </ScrollStackItem>
            ))}
            <ScrollStackItem className="group relative grid cursor-pointer gap-2 p-2 lg:grid-cols-2">
              <Link
                href={HOME_ENTERPRISE.secondary.href}
                aria-label={HOME_ENTERPRISE.secondary.label}
                className="absolute inset-0 rounded-card focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              />
              <div className="pointer-events-none relative flex flex-col gap-8 p-6 sm:p-10 lg:p-16">
                <span className="flex items-center gap-2 text-overline text-muted-foreground">
                  <Building2 className="size-4 shrink-0" aria-hidden />
                  {HOME_ENTERPRISE.eyebrow}
                </span>
                <h3 className="text-h1 text-foreground">{HOME_ENTERPRISE.title}</h3>
                <ul className="flex flex-col gap-4">
                  {ENTERPRISE_STACK_FEATURES.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <ContactButton variant="emphasis" size="lg" className="pointer-events-auto w-full sm:w-fit">
                  {HOME_ENTERPRISE.primary.label}
                </ContactButton>
              </div>
              {/* The mother gradient: Enterprise is all of apna, tailored,
                  so it wears the brand's own gradient, not a fifth hue. */}
              <EnterpriseIllustration className="pointer-events-none relative h-64 max-lg:order-first lg:h-full lg:min-h-112" />
            </ScrollStackItem>
          </ScrollStack>

        </div>
      </Section>


      {/* After the gradient suite, the proof on white (its cards turn the
          muted grey there by themselves), then the press, the FAQ. */}
      {/* No stat row: the hero already carries the numbers. */}
      <WhyHireBand tone="card" stats={[]} />
      {/* In the press (gradient): after the proof, so white and gradient
          still alternate. */}
      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={HOME_PRESS.title} />

          {/* Article cards, as in the Newsroom: the outlet and date, the
              article's own headline, the way to read it. */}
          <div className="grid gap-6 sm:grid-cols-3">
            {HOME_PRESS_ARTICLES.map((article) => (
              <a key={article.url} href={article.url} target="_blank" rel="noreferrer noopener" className="group min-w-0">
                <Card padding="lg" interactive className="flex h-full flex-col gap-4">
                  <span className="flex items-center justify-between gap-3 text-overline text-muted-foreground tabular-nums">
                    <span className="flex min-w-0 items-center gap-2">
                      <Newspaper className="size-4 shrink-0 text-primary" aria-hidden />
                      <span className="truncate">{article.source}</span>
                    </span>
                    <span className="shrink-0 whitespace-nowrap">{article.date}</span>
                  </span>
                  <h3 className="text-h5 text-pretty text-foreground">{article.title}</h3>
                  <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-foreground">
                    Read the story
                    <ArrowUpRight
                      className="size-4 transition-interactive group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Card>
              </a>
            ))}
          </div>
          <Button
            variant="outline"
            size="lg"
            className="self-center"
            nativeButton={false}
            render={<Link href="/newsroom" />}
            trailingIcon={<ArrowRight aria-hidden />}
          >
            All press coverage
          </Button>
        </div>
      </Section>
      <FaqBand />
    </>
  )
}

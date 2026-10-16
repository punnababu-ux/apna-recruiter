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
  Button,
  Card,
  CheckCircle2,
  LogoApnaUnlimited,
  LogoWall,
  Quote,
  ScrollStack,
  ScrollStackItem,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { HeroLeadCard } from "@/components/marketing/hero-lead-card"
import { PRODUCT_KEY, ProductIllustration } from "@/components/marketing/product-illustrations"
import {
  HOME_HERO,
  HOME_PRESS,
  HOME_PRODUCT_DETAILS,
  HOME_SUITE,
  HOME_TRUSTED_BY,
} from "@/content/home"
import { CLIENT_LOGOS } from "@/content/logos"
import { PRODUCT_LINKS } from "@/content/nav"

const CLIENT_LOGO_ITEMS = CLIENT_LOGOS.map((client) => ({
  name: client.name,
  logo: (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={client.src} alt={client.name} height={36} width={client.width} />
  ),
}))


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
                    <CheckCircle2 aria-hidden />
                    {HOME_HERO.eyebrow}
                  </Badge>
                }
                title={
                  <>
                    India&apos;s Largest{" "}
                      {/* The green ramp flowing across the word. */}
                      <span className="animate-text-gradient text-primary">AI-Native</span>{" "}
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
                  <div key={stat.label} className="flex flex-col gap-1">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-heading text-xl font-semibold text-foreground sm:text-h3">
                      {stat.value}
                    </dd>
                    <p aria-hidden className="text-xs text-muted-foreground sm:text-sm">
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
                    <span className="text-overline text-primary">{product.eyebrow}</span>
                  )}
                  <h3 className="text-h4 text-foreground">{product.heading}</h3>
                  <ul className="flex flex-col gap-4">
                    {product.features.map((feature) => (
                      <li key={feature.title} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-product-accent" aria-hidden />
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

      {/* Contact us — the live contact form as the page's closing band;
          every "Contact us" link lands here (/#contact-us). */}
      <ContactSection />
    </>
  )
}

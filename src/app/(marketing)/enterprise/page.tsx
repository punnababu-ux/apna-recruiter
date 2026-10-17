/**
 * /enterprise — apna Enterprise, from the live employer.apna.co/apna-enterprise
 * (content/enterprise.ts). A company page: the mother gradient, bands
 * alternating gradient / white, the shared contact band at the end (every
 * "Contact sales" lands there).
 *
 *   Hero          chip, serif headline, the line, the one green CTA
 *   Clients       the logos in their own white band, as on the homepage
 *   Features      the six Enterprise-only features, then "Plus you will
 *                 get", one gradient band; each card led by its 3D clay
 *                 picture (ValueArt)
 *   Playbook      the Gen Z Talent Playbook, linking out to apna.co (white)
 *   Testimonials  three customers in their own words (gradient)
 *   FAQs          the live page's four, in the pricing page's FaqSection
 *                 (white — the page's last band before the contact band)
 */

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Avatar,
  AvatarImage,
  Building2,
  Button,
  Card,
  LogoWall,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { FaqSection } from "@/components/apnahire/faq-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { ValueArt, type ValueName } from "@/components/marketing/value-art"
import { CONTACT_ANCHOR } from "@/content/contact"
import { ENTERPRISE } from "@/content/enterprise"
import { CLIENT_LOGOS } from "@/content/logos"

export const metadata: Metadata = ENTERPRISE.meta

const LOGO_ITEMS = CLIENT_LOGOS.filter((c) => (ENTERPRISE.hero.logos as readonly string[]).includes(c.name)).map(
  (client) => ({
    name: client.name,
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={client.src} alt={client.name} height={36} width={client.width} />
    ),
  })
)

/** Feature cards led by their 3D clay picture (ValueArt; an icon stand-in
 *  until the render exists), centred like the Lounge's cards. */
function FeatureGrid({ items }: { items: readonly { art: ValueName; title: string; description: string }[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.title}>
          <Card padding="lg" className="surface-frosted h-full items-center gap-4 text-center">
            <ValueArt name={item.art} size="sm" />
            <h3 className="text-h6 text-foreground">{item.title}</h3>
            <p className="text-sm text-pretty text-muted-foreground">{item.description}</p>
          </Card>
        </li>
      ))}
    </ul>
  )
}

export default function EnterprisePage() {
  const { hero, features, plus, playbook, testimonials, faqs } = ENTERPRISE
  return (
    <>
      <PageHero
        icon={<Building2 aria-hidden />}
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        actions={
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={`#${CONTACT_ANCHOR}`} />}
            trailingIcon={<ArrowRight aria-hidden />}
          >
            {hero.cta}
          </Button>
        }
      />

      {/* The clients, as on the homepage: their own white band. */}
      <Section tone="card" size="md">
        <div className="flex flex-col items-center gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={<span className="text-overline text-muted-foreground">{hero.logosEyebrow}</span>}
            title={hero.logosTitle}
          />
          <LogoWall items={LOGO_ITEMS} muted />
        </div>
      </Section>

      {/* The exclusive features, then what every plan also gets: one band. */}
      <Section size="md">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-10">
            <SectionHeading
              level={2}
              align="center"
              eyebrow={<span className="text-overline text-muted-foreground">{features.eyebrow}</span>}
              title={features.title}
            />
            <FeatureGrid items={features.items} />
          </div>
          <div className="flex flex-col gap-10">
            <SectionHeading level={3} align="center" title={plus.title} />
            <FeatureGrid items={plus.items} />
          </div>
        </div>
      </Section>

      <Section tone="card" size="md">
        {/* The one standout card on its band (surface-feature). */}
        <Card padding="none" className="surface-feature grid overflow-hidden md:grid-cols-2">
          {/* The clay book on a soft tile, like the product cards' art. */}
          <div className="flex items-center justify-center bg-gradient-illustration-plum p-8">
            <Image
              src={playbook.image}
              alt={playbook.title}
              width={800}
              height={800}
              className="size-64 object-contain sm:size-80"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <SectionHeading
              level={2}
              eyebrow={<span className="text-overline text-muted-foreground">{playbook.eyebrow}</span>}
              title={playbook.title}
              description={playbook.description}
            />
            <Button
              variant="emphasis"
              size="lg"
              className="self-start"
              nativeButton={false}
              render={<a href={playbook.href} target="_blank" rel="noreferrer noopener" />}
              trailingIcon={<ArrowUpRight aria-hidden />}
            >
              {playbook.cta}
            </Button>
          </div>
        </Card>
      </Section>

      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={testimonials.title} />
          <ul className="grid gap-6 lg:grid-cols-3">
            {testimonials.items.map((t) => (
              <li key={t.name}>
                <Card padding="lg" className="surface-frosted h-full justify-between gap-6">
                  <p className="text-base text-pretty text-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage src={t.photo} alt={t.name} />
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{t.name}</span>
                      <span className="text-xs text-muted-foreground">{t.role}</span>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="card" size="none">
        <FaqSection items={faqs} hideActions />
      </Section>
    </>
  )
}

/**
 * /enterprise — apna Enterprise, from the live employer.apna.co/apna-enterprise
 * (content/enterprise.ts). A company page: the mother gradient, bands
 * alternating gradient / white, the shared contact band at the end (every
 * "Contact sales" lands there).
 *
 *   Hero          chip, serif headline, the line, the one green CTA; the
 *                 clients' logos under it
 *   Features      the six Enterprise-only features (white band)
 *   Plus          what every plan also gets (gradient band)
 *   Playbook      the Gen Z Talent Playbook, linking out to apna.co (white)
 *   Testimonials  three customers in their own words (gradient)
 *   FAQs          the live page's four, in the pricing page's FaqSection
 *                 (white — the page's last band before the contact band)
 */

import type { ComponentType } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Avatar,
  AvatarImage,
  Award,
  BarChart2,
  Building2,
  Button,
  CalendarCheck,
  Card,
  Headset,
  LogoWall,
  Search,
  Section,
  SectionHeading,
  Share2,
  UserPlus,
  Users,
  Zap,
} from "@apna/design-system"
import { FaqSection } from "@/components/apnahire/faq-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { CONTACT_ANCHOR } from "@/content/contact"
import { ENTERPRISE } from "@/content/enterprise"
import { CLIENT_LOGOS } from "@/content/logos"

export const metadata: Metadata = ENTERPRISE.meta

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>
const ICONS: Record<string, Icon> = {
  award: Award,
  users: Users,
  share: Share2,
  chart: BarChart2,
  zap: Zap,
  headset: Headset,
  userPlus: UserPlus,
  search: Search,
  calendar: CalendarCheck,
}

const LOGO_ITEMS = CLIENT_LOGOS.filter((c) => (ENTERPRISE.hero.logos as readonly string[]).includes(c.name)).map(
  (client) => ({
    name: client.name,
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={client.src} alt={client.name} height={36} width={client.width} />
    ),
  })
)

function FeatureGrid({ items, columns }: { items: readonly { icon: string; title: string; description: string }[]; columns: string }) {
  return (
    <ul className={`grid gap-6 sm:grid-cols-2 ${columns}`}>
      {items.map((item) => {
        const ItemIcon = ICONS[item.icon]
        return (
          <li key={item.title}>
            <Card padding="lg" className="surface-frosted h-full gap-3">
              <ItemIcon className="size-6 text-foreground" aria-hidden />
              <h3 className="text-h6 text-foreground">{item.title}</h3>
              <p className="text-sm text-pretty text-muted-foreground">{item.description}</p>
            </Card>
          </li>
        )
      })}
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
      >
        <div className="flex w-full flex-col items-center gap-6">
          <p className="text-center text-sm text-muted-foreground">{hero.logosTitle}</p>
          <LogoWall items={LOGO_ITEMS} muted />
        </div>
      </PageHero>

      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={<span className="text-overline text-muted-foreground">{features.eyebrow}</span>}
            title={features.title}
          />
          <FeatureGrid items={features.items} columns="lg:grid-cols-3" />
        </div>
      </Section>

      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={plus.title} />
          <FeatureGrid items={plus.items} columns="lg:grid-cols-3" />
        </div>
      </Section>

      <Section tone="card" size="md">
        {/* The one standout card on its band (surface-feature). */}
        <Card padding="none" className="surface-feature grid overflow-hidden md:grid-cols-2">
          <Image
            src={playbook.image}
            alt={playbook.title}
            width={1330}
            height={888}
            className="aspect-3/2 h-full w-full object-cover md:aspect-auto"
          />
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

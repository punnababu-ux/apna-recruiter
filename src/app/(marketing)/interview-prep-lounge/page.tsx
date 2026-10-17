/**
 * /interview-prep-lounge — the AI Interview Preparation Lounge, for
 * campuses. Copy: content/interview-lounge.ts (from the lounge prototype);
 * layout and look: this site's own blocks, so it reads like the About
 * pages (it's apna's, not one hiring product's — no product colour).
 *
 *   Hero          chip, serif headline, line, the one green CTA (to the
 *                 contact band), and the prototype's rotating product
 *                 moments beside it (MomentCarousel)
 *   Numbers       the anchored stats card under the hero
 *   Audiences     students / universities / government, each led by its
 *                 3D clay object on a suite-gradient tile
 *   Pillars       visible · repeatable · measurable · personalised
 *   Experience    five features beside the booth photos, then the 25,000+
 *                 roles line as a band
 *   Institutions  the case and what they get, beside the booths photo
 *   Outcomes      the public-policy fit beside the minister's visit, on the
 *                 mother band
 *   How it works  the five steps as stacking cards
 *   Journey       the student's four steps, in the same white band
 */

import type { ComponentType } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Button,
  Card,
  CheckCircle2,
  FileText,
  GraduationCap,
  Landmark,
  Languages,
  Lock,
  RefreshCw,
  ScrollStack,
  Section,
  SectionHeading,
  Target,
} from "@apna/design-system"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { MomentCarousel } from "@/components/marketing/moment-carousel"
import { ILLUSTRATION_TONE } from "@/components/marketing/product-illustrations"
import { ValueArt } from "@/components/marketing/value-art"
import { HeroChip, StackCard, StatGrid, StatementBand, deckPosition } from "@/components/marketing/page-blocks"
import { CONTACT_ANCHOR } from "@/content/contact"
import { LOUNGE } from "@/content/interview-lounge"
import { cn } from "@/lib/utils"

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>

const AUDIENCE_ICONS: Record<(typeof LOUNGE.audiences)[number]["icon"], Icon> = {
  student: GraduationCap,
  campus: Building2,
  government: Landmark,
}

/** The audience tiles take three of the suite gradients, in turn. */
const AUDIENCE_TONES = ["sky", "green", "gold"] as const

const EXPERIENCE_ICONS: Record<(typeof LOUNGE.experience.items)[number]["icon"], Icon> = {
  target: Target,
  languages: Languages,
  resume: FileText,
  loop: RefreshCw,
  private: Lock,
}

export const metadata: Metadata = LOUNGE.meta

export default function InterviewPrepLoungePage() {
  const { hero, stats, audiences, pillars, experience, institutions, publicOutcomes, howItWorks, journey } = LOUNGE

  return (
    <>
      <div className="relative isolate">
        <HeroBackdrop />
        <Section size="lg" className="relative max-md:pt-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-8">
              <SectionHeading
                level={1}
                eyebrow={<HeroChip icon={<GraduationCap aria-hidden />}>{hero.eyebrow}</HeroChip>}
                title={hero.title}
                description={hero.description}
              />
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={`#${CONTACT_ANCHOR}`} />}
                trailingIcon={<ArrowRight aria-hidden />}
              >
                {hero.cta}
              </Button>
            </div>
            <MomentCarousel moments={hero.moments} />
          </div>
        </Section>
      </div>

      <Section size="none" className="relative -mt-8 pb-8 md:-mt-12 md:pb-12">
        <StatGrid stats={stats} className="lg:grid-cols-4 lg:[&>*]:border-t-0" />
      </Section>

      {/* Who it's for. */}
      <Section tone="card" size="md">
        <ul className="grid gap-6 md:grid-cols-3">
          {audiences.map((a, i) => {
            const AudienceIcon = AUDIENCE_ICONS[a.icon]
            return (
              <li key={a.eyebrow}>
                <Card padding="none" className="h-full overflow-hidden">
                  <div
                    aria-hidden
                    className={cn("flex aspect-4/3 items-center justify-center", ILLUSTRATION_TONE[AUDIENCE_TONES[i]])}
                  >
                    <ValueArt name={a.art} size="md" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="flex items-center gap-2 text-overline text-muted-foreground">
                      <AudienceIcon className="size-4" aria-hidden />
                      {a.eyebrow}
                    </span>
                    <h2 className="text-h5 text-balance text-foreground">{a.title}</h2>
                    <p className="text-sm text-pretty text-muted-foreground">{a.description}</p>
                  </div>
                </Card>
              </li>
            )
          })}
        </ul>
      </Section>

      {/* Placement support → career-readiness: four words carry it. */}
      <Section size="md">
        <div className="flex flex-col gap-12">
          <SectionHeading level={2} align="center" title={pillars.title} description={pillars.description} />
          <dl className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {pillars.items.map((p) => (
              <div key={p.title} className="flex flex-col gap-2 bg-card p-6 lg:p-8">
                <dt className="text-h4 text-foreground">{p.title}</dt>
                <dd className="text-sm text-pretty text-muted-foreground">{p.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* The experience: what the AI interviewer does, beside the booth. */}
      <Section tone="card" size="md">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading level={2} title={experience.title} description={experience.description} />
            <ul className="flex flex-col gap-5">
              {experience.items.map((item) => {
                const ItemIcon = EXPERIENCE_ICONS[item.icon]
                return (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      <ItemIcon className="size-5 text-foreground" aria-hidden />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-pretty text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="grid grid-cols-5 gap-4">
            <Image
              src={experience.images[0].src}
              alt={experience.images[0].alt}
              width={560}
              height={840}
              className="col-span-2 aspect-2/3 w-full rounded-card object-cover"
            />
            <Image
              src={experience.images[1].src}
              alt={experience.images[1].alt}
              width={840}
              height={840}
              className="col-span-3 aspect-2/3 w-full rounded-card object-cover"
            />
          </div>
        </div>
      </Section>

      <StatementBand title={experience.footnote} />

      {/* For institutions: the case on the left, what they get on the right. */}
      <Section tone="card" size="md">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Image
            src={institutions.image.src}
            alt={institutions.image.alt}
            width={1200}
            height={900}
            className="aspect-4/3 w-full rounded-card object-cover lg:order-last"
          />
          <div className="flex flex-col gap-8">
            <SectionHeading level={2} title={institutions.title} description={institutions.description} />
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {institutions.items.map((item) => (
                <li key={item.title} className="flex items-start gap-3 py-5">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-pretty text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Public outcomes: the policy fit beside the minister's visit. */}
      <Section size="lg" className="bg-gradient-checkout-hero">
        <div className="flex flex-col gap-10">
          <SectionHeading
            level={2}
            align="center"
            title={publicOutcomes.title}
            description={publicOutcomes.description}
          />
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <Card padding="none" className="surface-frosted shadow-card">
              <dl className="flex flex-col divide-y divide-border">
                {publicOutcomes.items.map((item) => (
                  <div key={item.title} className="flex flex-col gap-1 p-5 sm:p-6">
                    <dt className="text-base font-semibold text-foreground">{item.title}</dt>
                    <dd className="text-sm text-pretty text-muted-foreground">{item.description}</dd>
                  </div>
                ))}
              </dl>
            </Card>
            <figure className="flex flex-col gap-3">
              <Image
                src={publicOutcomes.image.src}
                alt={publicOutcomes.image.alt}
                width={1200}
                height={800}
                className="aspect-3/2 w-full rounded-card object-cover shadow-card"
              />
              <figcaption className="text-sm text-muted-foreground">{publicOutcomes.image.caption}</figcaption>
            </figure>
          </div>
          <p className="mx-auto max-w-prose text-center text-base text-pretty text-muted-foreground">
            {publicOutcomes.footnote}
          </p>
        </div>
      </Section>

      {/* How it works: the institution's five steps as stacking cards, then
          the student's four, in one white band (the contact band below is
          on the canvas, so this band closes the page). */}
      <Section tone="card" size="md">
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-10">
            <SectionHeading level={2} align="center" title={howItWorks.title} description={howItWorks.loop} />
            <ScrollStack>
              {howItWorks.items.map((step, i) => (
                <StackCard
                  key={step.title}
                  index={i}
                  watermark={String(i + 1).padStart(2, "0")}
                  overline={deckPosition(i, howItWorks.items.length)}
                  title={step.title}
                >
                  <p className="max-w-2xl text-lg leading-relaxed text-pretty text-foreground sm:text-xl">
                    {step.description}
                  </p>
                </StackCard>
              ))}
            </ScrollStack>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeading level={2} align="center" title={journey.title} description={journey.description} />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {journey.items.map((step, i) => (
                <li key={step.title}>
                  <Card padding="lg" className="surface-frosted h-full gap-3">
                    <span className="font-heading text-h3 font-semibold text-foreground tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-h6 text-foreground">{step.title}</h3>
                    <p className="text-sm text-pretty text-muted-foreground">{step.description}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  )
}

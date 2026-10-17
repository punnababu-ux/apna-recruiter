/**
 * /interview-prep-lounge — the AI Interview Preparation Lounge, for
 * campuses. Copy: content/interview-lounge.ts (from the lounge prototype);
 * layout and look: this site's own blocks, so it reads like the About
 * pages (it's apna's, not one hiring product's — no product colour).
 *
 *   Hero          chip, serif headline, line, the one green CTA (to the
 *                 contact band)
 *   Numbers       the anchored stats card under the hero
 *   Audiences     students / universities / government
 *   Pillars       visible · repeatable · measurable · personalised
 *   Experience    five features, then the 25,000+ roles line as a band
 *   Institutions  the case beside what they get
 *   Outcomes      the public-policy fit, frosted cards on the mother band
 *   How it works  the five steps as stacking cards
 *   Journey       the student's four steps
 */

import type { ComponentType } from "react"
import type { Metadata } from "next"
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
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, StackCard, StatGrid, StatementBand, deckPosition } from "@/components/marketing/page-blocks"
import { CONTACT_ANCHOR } from "@/content/contact"
import { LOUNGE } from "@/content/interview-lounge"
import { cn } from "@/lib/utils"

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>

const AUDIENCE_ICONS: Record<(typeof LOUNGE.audiences)[number]["icon"], Icon> = {
  student: GraduationCap,
  campus: Building2,
  government: Landmark,
}

const EXPERIENCE_ICONS: Record<(typeof LOUNGE.experience.items)[number]["icon"], Icon> = {
  target: Target,
  languages: Languages,
  resume: FileText,
  loop: RefreshCw,
  private: Lock,
}

const FROSTED = "border-card/60 bg-card/80 backdrop-blur-xl"

export const metadata: Metadata = LOUNGE.meta

export default function InterviewPrepLoungePage() {
  const { hero, stats, audiences, pillars, experience, institutions, publicOutcomes, howItWorks, journey, closing } =
    LOUNGE

  return (
    <>
      <PageHero icon={<GraduationCap aria-hidden />}
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

      <Section size="none" className="relative -mt-8 pb-8 md:-mt-12 md:pb-12">
        <StatGrid stats={stats} className="lg:grid-cols-4 lg:[&>*]:border-t-0" />
      </Section>

      {/* Who it's for. */}
      <Section tone="card" size="md">
        <ul className="grid gap-6 md:grid-cols-3">
          {audiences.map((a) => {
            const AudienceIcon = AUDIENCE_ICONS[a.icon]
            return (
              <li key={a.eyebrow}>
                <Card padding="lg" className="h-full gap-4 bg-gradient-checkout-hero">
                  <AudienceIcon className="size-7 text-foreground" aria-hidden />
                  <div className="flex flex-col gap-2">
                    <span className="text-overline text-muted-foreground">{a.eyebrow}</span>
                    <h2 className="text-h4 text-balance text-foreground">{a.title}</h2>
                  </div>
                  <p className="text-base text-pretty text-muted-foreground">{a.description}</p>
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

      {/* The experience. */}
      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={experience.title} description={experience.description} />
          {/* Three over two, the bottom pair centred (a 6-column grid, each
              card two wide, the fourth starting a column in). */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {experience.items.map((item, i) => {
              const ItemIcon = EXPERIENCE_ICONS[item.icon]
              return (
                <li key={item.title} className={cn("lg:col-span-2", i === 3 && "lg:col-start-2")}>
                  <Card padding="lg" tone="muted" className="h-full gap-3">
                    <ItemIcon className="size-6 text-foreground" aria-hidden />
                    <h3 className="text-h6 text-foreground">{item.title}</h3>
                    <p className="text-sm text-pretty text-muted-foreground">{item.description}</p>
                  </Card>
                </li>
              )
            })}
          </ul>
        </div>
      </Section>

      <StatementBand title={experience.footnote} />

      {/* For institutions: the case on the left, what they get on the right. */}
      <Section tone="card" size="md">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
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
      </Section>

      {/* Public outcomes: frosted cards on the mother gradient. */}
      <Section size="lg" className="bg-gradient-checkout-hero">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={publicOutcomes.title} description={publicOutcomes.description} />
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publicOutcomes.items.map((item) => (
              <Card key={item.title} padding="lg" className={`gap-2 shadow-card ${FROSTED}`}>
                <dt className="text-h5 text-foreground">{item.title}</dt>
                <dd className="text-sm text-pretty text-muted-foreground">{item.description}</dd>
              </Card>
            ))}
          </dl>
          <p className="mx-auto max-w-prose text-center text-base text-pretty text-muted-foreground">
            {publicOutcomes.footnote}
          </p>
        </div>
      </Section>

      {/* How it works: the institution's five steps, as stacking cards. */}
      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={howItWorks.title} />
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
      </Section>

      {/* The student's journey: four steps. */}
      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={journey.title} description={journey.description} />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.items.map((step, i) => (
              <li key={step.title}>
                <Card padding="lg" className={`h-full gap-3 ${FROSTED}`}>
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
      </Section>

      <ContactSection title={closing.title} description={closing.description} cta={closing.cta} tone="card" />
    </>
  )
}

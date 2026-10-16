/**
 * /interview-prep-lounge — the AI Interview Preparation Lounge, for
 * campuses. Copy: content/interview-lounge.ts (from the lounge prototype);
 * layout and look: this site's own bands, cards and type.
 *
 * One primary CTA (the hero's, to the contact band); the band's own button
 * stays the dark emphasis companion. The public-outcomes band is the one
 * dark (`ink`) band, so the government case reads as its own chapter.
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
  Languages,
  Landmark,
  Lock,
  RefreshCw,
  Section,
  SectionHeading,
  Target,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { CONTACT_ANCHOR } from "@/content/contact"
import { LOUNGE } from "@/content/interview-lounge"

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

const pad2 = (n: number) => String(n).padStart(2, "0")

export const metadata: Metadata = LOUNGE.meta

export default function InterviewPrepLoungePage() {
  const { hero, stats, audiences, pillars, experience, institutions, publicOutcomes, howItWorks, journey, closing } =
    LOUNGE

  return (
    <>
      <div className="relative isolate">
        <HeroBackdrop />
        <Section size="lg" className="relative max-md:pt-8">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-8">
              <SectionHeading
                level={1}
                align="center"
                eyebrow={<span className="text-overline text-primary">{hero.eyebrow}</span>}
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
            <dl className="grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                  <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
                  <dd className="order-1 font-heading text-h3 font-semibold text-foreground sm:text-h2">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      </div>

      {/* Who it's for. */}
      <Section tone="card" size="md">
        <ul className="grid gap-6 md:grid-cols-3">
          {audiences.map((a) => {
            const Icon = AUDIENCE_ICONS[a.icon]
            return (
              <li key={a.eyebrow}>
                <Card padding="lg" tone="muted" className="h-full gap-4">
                  <Icon className="size-7 text-primary" aria-hidden />
                  <div className="flex flex-col gap-2">
                    <span className="text-overline text-muted-foreground">{a.eyebrow}</span>
                    <h2 className="text-h5 text-foreground">{a.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
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
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.items.map((p) => (
              <div key={p.title} className="flex flex-col gap-2 border-t-2 border-primary pt-4">
                <dt className="text-h5 text-foreground">{p.title}</dt>
                <dd className="text-sm text-muted-foreground">{p.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* The experience. */}
      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={experience.title} description={experience.description} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experience.items.map((item) => {
              const Icon = EXPERIENCE_ICONS[item.icon]
              return (
                <li key={item.title}>
                  <Card padding="lg" tone="muted" className="h-full gap-3">
                    <Icon className="size-6 text-primary" aria-hidden />
                    <h3 className="text-h6 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </li>
              )
            })}
            {/* The sixth tile: the footnote's number, so the grid closes. */}
            <li>
              <Card padding="lg" tone="ink" className="h-full justify-center gap-3">
                <p className="text-h6 text-pretty">{experience.footnote}</p>
              </Card>
            </li>
          </ul>
        </div>
      </Section>

      {/* For institutions: the case on the left, what they get on the right. */}
      <Section size="md">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading level={2} title={institutions.title} description={institutions.description} />
          <ul className="flex flex-col gap-6">
            {institutions.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Public outcomes: the one dark band. */}
      <Section tone="ink" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={publicOutcomes.title} description={publicOutcomes.description} />
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publicOutcomes.items.map((item) => (
              <Card key={item.title} padding="lg" tone="ink" className="gap-2">
                <dt className="text-h6">{item.title}</dt>
                <dd className="text-sm text-ink-fg-muted">{item.description}</dd>
              </Card>
            ))}
          </dl>
          <p className="mx-auto max-w-prose text-center text-sm text-pretty text-ink-fg-muted">{publicOutcomes.footnote}</p>
        </div>
      </Section>

      {/* Two journeys: the institution's five steps, the student's four. */}
      <Section size="md">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-10">
            <SectionHeading level={2} align="center" title={howItWorks.title} />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {howItWorks.items.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-2 border-t-2 border-border pt-4">
                  <span className="font-heading text-h4 font-semibold text-primary tabular-nums">{pad2(i + 1)}</span>
                  <h3 className="text-h6 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-10">
            <SectionHeading level={2} align="center" title={journey.title} description={journey.description} />
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {journey.items.map((step, i) => (
                <li key={step.title}>
                  <Card padding="lg" className="h-full gap-3">
                    <span className="font-heading text-h4 font-semibold text-primary tabular-nums">{i + 1}</span>
                    <h3 className="text-h6 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <ContactSection title={closing.title} description={closing.description} cta={closing.cta} />
    </>
  )
}

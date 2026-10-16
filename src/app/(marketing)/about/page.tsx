/**
 * /about — Overview. Copy: content/company.ts ABOUT_OVERVIEW.
 *
 *   Hero       the chip ("Founded in 2019"), the serif headline, the intro
 *              and the founding story — no numbers
 *              (the founding story sits in the hero, under the intro)
 *   Story      the four beats as the homepage's stacking cards, each on a
 *              mother-gradient wash with its year as a large watermark
 *   Mission    its own full-width band in the mother gradient, no card
 *   Recruiters the offers as a ProgressAccordion that walks itself, the
 *              picture beside it following the open one (FeatureShowcase)
 *
 * Neutral throughout: product gradients belong to their products, so the
 * only colour here is the AI Calling Agent's own, on its illustration.
 */

import type { Metadata } from "next"
import {
  ScrollStack,
  ScrollStackItem,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { FeatureShowcase } from "@/components/marketing/feature-showcase"
import { PageHero, withAccent } from "@/components/marketing/page-blocks"
import { ABOUT_OVERVIEW } from "@/content/company"
import { cn } from "@/lib/utils"

export const metadata: Metadata = ABOUT_OVERVIEW.meta

/** The four story cards' washes: the homepage canvas's own hues, in turn. */
const STORY_WASH = [
  "bg-gradient-mother-peach",
  "bg-gradient-mother-pink",
  "bg-gradient-mother-lavender",
  "bg-gradient-mother-sky",
] as const

export default function AboutPage() {
  const { eyebrow, title, titleAccent, intro, storyEyebrow, storyTitle, body, story, mission, audiences } = ABOUT_OVERVIEW
  const recruiters = audiences[0]
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={withAccent(title, titleAccent)}
        // The founding story belongs with the claim it explains: one
        // paragraph, one text style — the intro, then the story.
        description={`${intro} ${body}`}
      />

      {/* How we got here: the homepage's stacking cards, one beat each, on
          a white band. */}
      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={<span className="text-overline text-muted-foreground">{storyEyebrow}</span>}
            title={storyTitle}
          />
          <ScrollStack>
            {story.map((beat, i) => (
              // The marker is a watermark: very large, very light, behind the
              // copy, which reads straight over it. Each card one of the
              // mother gradient's own hues (no product colour on About).
              <ScrollStackItem
                key={beat.marker}
                className={cn("relative isolate overflow-hidden", STORY_WASH[i % STORY_WASH.length])}
              >
                <span aria-hidden className="text-watermark pointer-events-none absolute -right-6 -bottom-10 -z-10 select-none lg:-bottom-16">
                  {beat.marker}
                </span>
                <div className="flex min-h-80 max-w-3xl flex-col justify-center gap-5 p-6 sm:p-10 lg:min-h-96 lg:p-14">
                  <span className="text-overline text-muted-foreground tabular-nums">
                    {beat.marker} · {String(i + 1).padStart(2, "0")} / {String(story.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-h3 text-balance text-foreground sm:text-h2">{beat.title}</h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-pretty text-foreground sm:text-xl">{beat.description}</p>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </Section>

      {/* Our mission: its own band — full width, in the homepage's own
          gradient (the mother gradient; no product colour on About), the
          eyebrow, title and line straight on it. No card. */}
      <Section size="lg" className="bg-gradient-checkout-hero">
        <SectionHeading
          level={2}
          align="center"
          eyebrow={<span className="text-overline text-muted-foreground">Our mission</span>}
          title={mission.title}
          description={mission.description}
        />
      </Section>

      {/* Built for recruiters: the offers walk themselves (each opens, its
          loader fills, the next opens) and the picture follows. */}
      <Section tone="card" size="md">
        <FeatureShowcase
          heading={
            <SectionHeading
              level={2}
              // Full width: the line isn't held to the reading measure here,
              // so it runs on one line beside nothing.
              className="[&_[data-slot=section-heading-description]]:max-w-none"
              eyebrow={<span className="text-overline text-muted-foreground">{recruiters.label}</span>}
              title={recruiters.title}
              description={recruiters.description}
            />
          }
          items={recruiters.items}
        />
      </Section>

      <ContactSection />
    </>
  )
}

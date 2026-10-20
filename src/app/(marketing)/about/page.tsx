/**
 * /about — Overview. Copy: content/company.ts ABOUT_OVERVIEW.
 *
 *   Hero       the chip ("Founded in 2019"), the serif headline, the intro
 *              and the founding story — no numbers
 *              (the founding story sits in the hero, under the intro)
 *   Story      the four beats through glass (StoryGlass): each chapter a
 *              card in its suite gradient, stacking as you scroll, its
 *              marker rolling in with the scroll
 *   Mission    its own full-width band in the mother gradient, no card
 *   Recruiters the offers as a ProgressAccordion that walks itself, the
 *              picture beside it following the open one (FeatureShowcase)
 *
 * Neutral throughout: product gradients belong to their products, so the
 * only colour here is the AI Calling Agent's own, on its illustration.
 */

import type { Metadata } from "next"
import {
  Flag,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { FeatureShowcase } from "@/components/marketing/feature-showcase"
import { StoryGlass } from "@/components/marketing/story-glass"
import { ValueArt } from "@/components/marketing/value-art"
import { PageHero, StatementBand, withAccent } from "@/components/marketing/page-blocks"
import { ABOUT_OVERVIEW } from "@/content/company"

export const metadata: Metadata = ABOUT_OVERVIEW.meta



export default function AboutPage() {
  const { eyebrow, title, titleAccent, intro, storyEyebrow, storyTitle, body, story, mission, audiences } = ABOUT_OVERVIEW
  const recruiters = audiences[0]
  return (
    <>
      <PageHero icon={<Flag aria-hidden />}
        eyebrow={eyebrow}
        title={withAccent(title, titleAccent)}
        // The founding story belongs with the claim it explains: one
        // paragraph, one text style — the intro, then the story.
        description={`${intro} ${body}`}
      />

      {/* How we got here: the story through glass over the suite
          gradients, the chapters stacking as you scroll (StoryGlass). */}
      <StoryGlass
        heading={
          <SectionHeading
            level={2}
            align="center"
            eyebrow={<span className="text-overline text-muted-foreground">{storyEyebrow}</span>}
            title={storyTitle}
          />
        }
        beats={story}
      />

      {/* Our mission: its own band — full width, in the homepage's own
          gradient (the mother gradient; no product colour on About), the
          clay bridge above it, the eyebrow, title and line straight on it.
          No card. */}
      <StatementBand
        art={<ValueArt name="mission" size="lg" />}
        eyebrow="Our mission"
        title={mission.title}
        description={mission.description}
      />

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
    </>
  )
}

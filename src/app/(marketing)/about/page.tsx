/**
 * /about — Overview. Copy: content/company.ts ABOUT_OVERVIEW.
 *
 *   Hero       the chip ("Founded in 2019"), the serif headline, the intro
 *              and the founding story — no numbers
 *              (the founding story sits in the hero, under the intro)
 *   Story      the four beats as the homepage's stacking cards, each on a
 *              mother-gradient wash with its year as a large watermark
 *   Mission    its own section: one wide card in the mother gradient
 *   Recruiters the offers (each opening to its detail) beside the AI
 *              Calling Agent illustration, on a white band
 *
 * Neutral throughout: product gradients belong to their products, so the
 * only colour here is the AI Calling Agent's own, on its illustration.
 */

import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  ScrollStack,
  ScrollStackItem,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, withAccent } from "@/components/marketing/page-blocks"
import { ProductIllustration } from "@/components/marketing/product-illustrations"
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
        // description, the intro then the story.
        description={
          <span className="flex flex-col gap-4">
            <span>{intro}</span>
            <span className="text-base">{body}</span>
          </span>
        }
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

      {/* Our mission: a section of its own — one wide card in the homepage's
          own gradient, the mother gradient (no product colour on About). */}
      <Section size="md">
        <Card
          padding="none"
          className="items-center border-card/60 bg-gradient-checkout-hero px-6 py-16 text-center shadow-card sm:px-12 lg:py-24"
        >
          <SectionHeading
            level={2}
            align="center"
            eyebrow={<span className="text-overline text-muted-foreground">Our mission</span>}
            title={mission.title}
            description={mission.description}
          />
        </Card>
      </Section>

      {/* Built for recruiters: the offers beside the illustration. */}
      <Section tone="card" size="md">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              level={2}
              eyebrow={<span className="text-overline text-muted-foreground">{recruiters.label}</span>}
              title={recruiters.title}
              description={recruiters.description}
            />
            <Accordion defaultValue={[recruiters.items[0].title]} className="border-t border-border">
              {recruiters.items.map((item) => (
                <AccordionItem key={item.title} value={item.title} className="border-b border-border">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="flex flex-col gap-0.5">
                      <span className="text-base font-semibold text-foreground">{item.title}</span>
                      <span className="text-sm font-regular text-muted-foreground">{item.tagline}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">{item.description}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <ProductIllustration product="AI Calling Agent" size="lg" className="h-80 rounded-card sm:h-112" />
        </div>
      </Section>

      <ContactSection />
    </>
  )
}

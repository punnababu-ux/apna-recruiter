/**
 * /about — Overview. Copy: content/company.ts ABOUT_OVERVIEW.
 *
 *   Hero       the chip, the serif headline, the intro — no numbers
 *   Founder    the page's centrepiece: Nirmit's portrait beside his line
 *              in the serif, then the founding story
 *   Story      the four beats as the homepage's stacking cards
 *   Mission    a calm serif statement (no dark band)
 *   Recruiters the offers beside the AI Calling Agent illustration, each
 *              offer a title + tagline that opens to its detail
 *
 * Neutral throughout: product gradients belong to their products, so the
 * only colour here is the AI Calling Agent's own, on its illustration.
 */

import type { Metadata } from "next"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ScrollStack,
  ScrollStackItem,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, withAccent } from "@/components/marketing/page-blocks"
import { ProductIllustration } from "@/components/marketing/product-illustrations"
import { ABOUT_OVERVIEW } from "@/content/company"

export const metadata: Metadata = ABOUT_OVERVIEW.meta

export default function AboutPage() {
  const { eyebrow, title, titleAccent, intro, founder, storyTitle, body, story, mission, audiences } = ABOUT_OVERVIEW
  const recruiters = audiences[0]
  return (
    <>
      <PageHero eyebrow={eyebrow} title={withAccent(title, titleAccent)} description={intro} />

      {/* The founder: portrait, his line, the story. */}
      <Section tone="card" size="lg">
        <div className="grid items-center gap-10 md:grid-cols-12 lg:gap-16">
          <figure className="relative md:col-span-5">
            <Image
              src={founder.photo}
              alt={founder.name}
              width={560}
              height={700}
              priority
              className="aspect-4/5 w-full rounded-card object-cover shadow-elevated"
            />
            {/* The name tag sits on the portrait's foot, like a caption card. */}
            <figcaption className="absolute inset-x-4 bottom-4 flex flex-col rounded-card-nested bg-card/85 px-4 py-3 shadow-card backdrop-blur-xl">
              <span className="text-base font-semibold text-foreground">{founder.name}</span>
              <span className="text-sm text-muted-foreground">{founder.role}</span>
            </figcaption>
          </figure>
          <div className="flex flex-col gap-8 md:col-span-7">
            <span className="text-overline text-muted-foreground">{founder.eyebrow}</span>
            <blockquote className="text-quote-lg text-balance text-foreground">
              &ldquo;{withAccent(founder.quote, "opportunity")}&rdquo;
            </blockquote>
            <p className="text-lead text-pretty text-muted-foreground">{body}</p>
          </div>
        </div>
      </Section>

      {/* How we got here: the homepage's stacking cards, one beat each. */}
      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={storyTitle} />
          <ScrollStack>
            {story.map((beat, i) => (
              <ScrollStackItem key={beat.marker} className="grid gap-2 p-2 lg:grid-cols-5">
                <div className="flex min-h-40 items-end rounded-card-nested bg-muted p-6 lg:col-span-2 lg:min-h-80 lg:p-8">
                  <span className="text-display-lg font-heading text-foreground tabular-nums">{beat.marker}</span>
                </div>
                <div className="flex flex-col justify-center gap-4 p-4 sm:p-6 lg:col-span-3 lg:p-10">
                  <span className="text-overline text-muted-foreground tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(story.length).padStart(2, "0")}
                  </span>
                  <h3 className="text-h3 text-balance text-foreground">{beat.title}</h3>
                  <p className="text-lead text-pretty text-muted-foreground">{beat.description}</p>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </Section>

      <Section size="md">
        <SectionHeading
          level={2}
          align="center"
          title={mission.title}
          description={mission.description}
        />
      </Section>

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

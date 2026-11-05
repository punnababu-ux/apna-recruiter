/**
 * /customer-stories — Customer stories. Copy: content/company.ts
 * CUSTOMER_STORIES (Lovable "Customer Stories").
 *
 *   Hero      the chip, the serif headline, the line
 *   Numbers   the anchored stats card, tucked under the hero
 *   Featured  PwC — the one story with a page behind it — large, in the
 *             mother gradient; the other results as cards, each with the
 *             company's logo where we have one (content/logos.ts)
 *   Talent    the four talent stories
 *   Library   the story library (industry filter, search), on white
 */

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Badge,
  Button,
  Card,
  Quote,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { TestimonialCard } from "@/components/apnahire/testimonial-grid"
import { CompanyMark, PageHero, StatGrid, StoryMedia, withAccent } from "@/components/marketing/page-blocks"
import { StoryLibrary } from "@/components/marketing/page-switchers"
import { CUSTOMER_STORIES } from "@/content/company"

export const metadata: Metadata = CUSTOMER_STORIES.meta

const STORY_TONES = ["green", "plum", "gold", "sky"] as const

export default function CustomerStoriesPage() {
  const { eyebrow, title, description, stats, featured, talent, library, } = CUSTOMER_STORIES
  const [lead, ...others] = featured.items
  return (
    <>
      <PageHero icon={<Quote aria-hidden />} eyebrow={eyebrow} title={withAccent(title, "hires")} description={description} />

      <Section size="none" className="relative -mt-8 pb-8 md:-mt-12 md:pb-12">
        <StatGrid stats={stats} />
      </Section>

      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={featured.title} />

          {/* The lead story: the only one with a full story behind it. */}
          {/* Photo beside the quote from lg, on top below it: a story needs a face. */}
          <Card
            padding="none"
            className="gap-0 overflow-hidden border-card/60 bg-gradient-checkout-hero lg:grid lg:grid-cols-3"
          >
            <StoryMedia company={lead.company} image={lead.image} tone="sky" priority className="max-lg:aspect-auto max-lg:h-40 lg:aspect-auto lg:h-full" />
            <div className="flex flex-col justify-center gap-5 p-8 lg:col-span-2">
            {/* The placeholder already carries the logo. */}
            {lead.image && <CompanyMark company={lead.company} />}
            <p className="text-xl text-balance text-foreground sm:text-2xl">&ldquo;{lead.result}&rdquo;</p>
            {lead.href && (
              <Button
                variant="emphasis"
                size="default"
                className="self-start"
                nativeButton={false}
                render={<Link href={lead.href} />}
                trailingIcon={<ArrowRight aria-hidden />}
              >
                Read the full story
              </Button>
            )}
            </div>
          </Card>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((story, i) => (
              <li key={story.company}>
                <TestimonialCard
                  quote={story.result}
                  mark={story.image ? <CompanyMark company={story.company} /> : null}
                  media={<StoryMedia company={story.company} image={story.image} tone={STORY_TONES[i % STORY_TONES.length]} />}
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={talent.title} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {talent.items.map((story) => (
              <li key={story.title}>
                <Card padding="lg" className="surface-frosted h-full gap-4 overflow-hidden pt-0">
                  {/* Temporary stand-in portrait (Pexels) until the person's own photo. */}
                  <div className="relative -mx-6 aspect-video sm:-mx-8">
                    <Image src={story.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <Badge variant="outline" className="self-start">
                    {story.tag}
                  </Badge>
                  <h3 className="text-h5 text-pretty text-foreground">{story.title}</h3>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} title={library.title} />
          <StoryLibrary />
        </div>
      </Section>
    </>
  )
}

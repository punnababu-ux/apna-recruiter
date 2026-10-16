/**
 * /about — Overview. Copy: content/company.ts ABOUT_OVERVIEW.
 *
 *   Hero       the claim and its three numbers, the bridge illustration
 *   Founder    Nirmit's photo, the founding story and his line
 *   Story      four beats (2019 → today), each on its own coloured tile
 *   Mission    the one dark band
 *   Audiences  recruiters / job seekers: an illustration beside the five
 *              offers, each a title + tagline that opens to its detail
 *              (the detail is there on demand, not on the page)
 */

import type { Metadata } from "next"
import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { BridgeIllustration, SeekerIllustration } from "@/components/marketing/company-illustrations"
import { ContactSection } from "@/components/marketing/contact-section"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import { StatGrid } from "@/components/marketing/page-blocks"
import { ILLUSTRATION_TONE, ProductIllustration } from "@/components/marketing/product-illustrations"
import { ABOUT_OVERVIEW } from "@/content/company"
import { cn } from "@/lib/utils"

export const metadata: Metadata = ABOUT_OVERVIEW.meta

const BEAT_TONES = ["sky", "plum", "green", "gold"] as const

export default function AboutPage() {
  const { eyebrow, title, intro, stats, founder, storyTitle, body, story, mission, audiences } = ABOUT_OVERVIEW
  return (
    <>
      <div className="relative isolate">
        <HeroBackdrop />
        <Section size="lg" className="relative max-md:pt-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-10">
              <SectionHeading
                level={1}
                eyebrow={<span className="text-overline text-primary">{eyebrow}</span>}
                title={title}
                description={intro}
              />
              <StatGrid stats={stats} className="grid-cols-3 sm:grid-cols-3" />
            </div>
            <BridgeIllustration className="h-80 rounded-card sm:h-112" />
          </div>
        </Section>
      </div>

      {/* The founder, and the story in his words. */}
      <Section tone="card" size="md">
        <div className="grid items-center gap-10 md:grid-cols-5 lg:gap-16">
          <figure className="flex w-full max-w-xs flex-col gap-3 justify-self-center md:col-span-2 md:justify-self-start">
            <Image
              src={founder.photo}
              alt={founder.name}
              width={480}
              height={600}
              className="aspect-4/5 w-full rounded-card object-cover"
            />
            <figcaption className="flex flex-col">
              <span className="text-base font-semibold text-foreground">{founder.name}</span>
              <span className="text-sm text-muted-foreground">{founder.role}</span>
            </figcaption>
          </figure>
          <div className="flex flex-col gap-6 md:col-span-3">
            <span className="text-overline text-primary">{founder.eyebrow}</span>
            <blockquote className="text-h2 text-balance text-foreground">&ldquo;{founder.quote}&rdquo;</blockquote>
            <p className="text-lead text-pretty text-muted-foreground">{body}</p>
          </div>
        </div>
      </Section>

      {/* The story: four beats, each on its own tile. */}
      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={storyTitle} />
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {story.map((beat, i) => (
              <li key={beat.marker} className="flex flex-col gap-4">
                <div
                  className={cn(
                    "flex min-h-56 flex-col justify-between gap-6 rounded-card p-6",
                    ILLUSTRATION_TONE[BEAT_TONES[i]]
                  )}
                >
                  <span className="font-heading text-display font-semibold text-foreground">{beat.marker}</span>
                  <h3 className="text-h6 text-balance text-foreground">{beat.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{beat.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="ink" size="lg">
        <SectionHeading level={2} align="center" title={mission.title} description={mission.description} />
      </Section>

      {/* Who we build for: illustration beside the offers, sides alternating. */}
      {audiences.map((audience, i) => (
        <Section key={audience.key} tone={i % 2 ? "transparent" : "card"} size="md">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={cn("flex flex-col gap-8", i % 2 && "lg:order-last")}>
              <SectionHeading
                level={2}
                eyebrow={<span className="text-overline text-primary">{audience.label}</span>}
                title={audience.title}
                description={audience.description}
              />
              <Accordion defaultValue={[audience.items[0].title]} className="border-t border-border">
                {audience.items.map((item) => (
                  <AccordionItem key={item.title} value={item.title} className="border-b border-border">
                    <AccordionTrigger className="py-4 hover:no-underline">
                      <span className="flex flex-col gap-0.5">
                        <span className="text-base font-semibold text-foreground">{item.title}</span>
                        <span className="text-sm font-regular text-primary">{item.tagline}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">{item.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            {audience.key === "recruiters" ? (
              <ProductIllustration product="AI Calling Agent" size="lg" className="h-80 rounded-card sm:h-112" />
            ) : (
              <SeekerIllustration className="h-80 rounded-card sm:h-112" />
            )}
          </div>
        </Section>
      ))}

      <ContactSection />
    </>
  )
}

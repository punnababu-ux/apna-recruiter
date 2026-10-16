/** /about — Overview. Copy: content/company.ts ABOUT_OVERVIEW. */

import type { Metadata } from "next"
import { Card, Section, SectionHeading } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { ABOUT_OVERVIEW } from "@/content/company"

export const metadata: Metadata = ABOUT_OVERVIEW.meta

export default function AboutPage() {
  const { eyebrow, title, intro, body, story, mission, audiences } = ABOUT_OVERVIEW
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro} />

      {/* The story: four beats, from 2019 to today. */}
      <Section tone="card" size="md">
        <div className="flex flex-col gap-12">
          <p className="mx-auto max-w-prose text-center text-lead text-pretty text-muted-foreground">{body}</p>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {story.map((beat) => (
              <li key={beat.marker}>
                <Card padding="lg" tone="muted" className="h-full gap-3">
                  <span className="font-heading text-h3 font-semibold text-primary">{beat.marker}</span>
                  <h2 className="text-h6 text-foreground">{beat.title}</h2>
                  <p className="text-sm text-muted-foreground">{beat.description}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section size="md">
        <div className="flex flex-col gap-16">
          <SectionHeading level={2} align="center" title={mission.title} description={mission.description} />
          {audiences.map((audience) => (
            <div key={audience.key} className="flex flex-col gap-8">
              <SectionHeading
                level={3}
                eyebrow={<span className="text-overline text-primary">{audience.label}</span>}
                title={audience.title}
                description={audience.description}
              />
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {audience.items.map((item) => (
                  <li key={item.title}>
                    <Card padding="lg" className="h-full gap-2">
                      <h4 className="text-h6 text-foreground">{item.title}</h4>
                      <p className="text-sm font-medium text-primary">{item.tagline}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <ContactSection />
    </>
  )
}

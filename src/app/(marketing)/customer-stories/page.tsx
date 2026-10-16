/**
 * /customer-stories — Customer stories. Copy: content/company.ts
 * CUSTOMER_STORIES. Only PwC has a full story behind its card; the other
 * results, the talent stories and the library are cards, as in the
 * prototype (see the content file's note on verifying them).
 */

import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Badge, Button, Card, Quote, Section, SectionHeading } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, StatGrid } from "@/components/marketing/page-blocks"
import { StoryLibrary } from "@/components/marketing/page-switchers"
import { CUSTOMER_STORIES } from "@/content/company"

export const metadata: Metadata = CUSTOMER_STORIES.meta

export default function CustomerStoriesPage() {
  const { eyebrow, title, description, stats, featured, talent, library, closing } = CUSTOMER_STORIES
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description}>
        <StatGrid stats={stats} className="lg:grid-cols-5" />
      </PageHero>

      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={featured.title} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.items.map((story) => (
              <li key={story.company}>
                <Card padding="lg" tone="muted" className="h-full gap-4">
                  <Quote className="size-6 text-muted-foreground" aria-hidden />
                  <p className="text-lg text-pretty text-foreground">{story.result}</p>
                  <div className="mt-auto flex flex-col items-start gap-3">
                    <span className="text-sm font-semibold text-foreground">{story.company}</span>
                    {"href" in story && (
                      <Button
                        variant="link-inline"
                        nativeButton={false}
                        render={<Link href={story.href} />}
                        trailingIcon={<ArrowRight aria-hidden />}
                      >
                        Read the full story
                      </Button>
                    )}
                  </div>
                </Card>
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
                <Card padding="lg" className="h-full gap-4">
                  <Badge variant="outline" className="self-start">{story.tag}</Badge>
                  <h3 className="text-h6 text-pretty text-foreground">{story.title}</h3>
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

      <ContactSection title={closing.title} cta={closing.cta} />
    </>
  )
}

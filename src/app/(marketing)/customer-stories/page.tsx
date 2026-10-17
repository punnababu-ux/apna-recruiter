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
import { ContactSection } from "@/components/marketing/contact-section"
import { CompanyMark, PageHero, StatGrid, withAccent } from "@/components/marketing/page-blocks"
import { StoryLibrary } from "@/components/marketing/page-switchers"
import { CUSTOMER_STORIES } from "@/content/company"

export const metadata: Metadata = CUSTOMER_STORIES.meta

export default function CustomerStoriesPage() {
  const { eyebrow, title, description, stats, featured, talent, library, closing } = CUSTOMER_STORIES
  const [lead, ...others] = featured.items
  return (
    <>
      <PageHero icon={<Quote aria-hidden />} eyebrow={eyebrow} title={withAccent(title, "hires")} description={description} />

      <Section size="none" className="relative -mt-8 pb-8 md:-mt-12 md:pb-12">
        <StatGrid stats={stats} className="lg:grid-cols-5 lg:[&>*]:border-t-0" />
      </Section>

      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={featured.title} />

          {/* The lead story: the only one with a full story behind it. */}
          <Card
            padding="none"
            className="gap-8 border-card/60 bg-gradient-checkout-hero p-8 shadow-card sm:p-12 lg:p-16"
          >
            <CompanyMark company={lead.company} />
            <p className="text-quote-lg max-w-4xl text-balance text-foreground">&ldquo;{lead.result}&rdquo;</p>
            {"href" in lead && (
              <Button
                variant="emphasis"
                size="lg"
                className="self-start"
                nativeButton={false}
                render={<Link href={lead.href} />}
                trailingIcon={<ArrowRight aria-hidden />}
              >
                Read the full story
              </Button>
            )}
          </Card>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((story) => (
              <li key={story.company}>
                <Card padding="lg" tone="muted" className="h-full gap-6">
                  <CompanyMark company={story.company} />
                  <p className="text-quote text-pretty text-foreground">&ldquo;{story.result}&rdquo;</p>
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
                <Card padding="lg" className="h-full gap-4 border-card/60 bg-card/80 backdrop-blur-xl">
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

      <ContactSection title={closing.title} cta={closing.cta} />
    </>
  )
}

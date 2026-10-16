/** /newsroom/awards — Awards and certifications. Copy: content/company.ts AWARDS. */

import type { Metadata } from "next"
import { Award, Badge, Card, Section } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { AWARDS } from "@/content/company"

export const metadata: Metadata = AWARDS.meta

export default function AwardsPage() {
  return (
    <>
      <PageHero eyebrow={AWARDS.eyebrow} title={AWARDS.title} description={AWARDS.description} />
      <Section tone="card" size="md">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {AWARDS.items.map((award) => (
            <li key={award.title}>
              <Card padding="lg" tone="muted" className="h-full gap-4">
                <div className="flex items-center justify-between gap-3">
                  <Award className="size-7 text-primary" aria-hidden />
                  <Badge variant="outline" className="bg-card">{award.year}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-overline text-muted-foreground">{award.by}</span>
                  <h2 className="text-h6 text-foreground">{award.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground">{award.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
      <ContactSection />
    </>
  )
}

/** /about/leadership — Our leadership and investors. Copy: content/company.ts ABOUT_LEADERSHIP. */

import type { Metadata } from "next"
import { Section, SectionHeading } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, PersonCard } from "@/components/marketing/page-blocks"
import { ABOUT_LEADERSHIP } from "@/content/company"

export const metadata: Metadata = ABOUT_LEADERSHIP.meta

export default function LeadershipPage() {
  const { eyebrow, title, description, people, investors } = ABOUT_LEADERSHIP
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description}>
        <ul className="grid w-full gap-6 md:grid-cols-3">
          {people.map((person) => (
            <li key={person.name}>
              <PersonCard person={person} quote />
            </li>
          ))}
        </ul>
      </PageHero>
      <Section tone="card" size="md">
        <div className="flex flex-col items-center gap-10">
          <SectionHeading level={2} align="center" title={investors.title} />
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {investors.names.map((name) => (
              <li key={name} className="font-heading text-h5 font-semibold whitespace-nowrap text-muted-foreground">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <ContactSection />
    </>
  )
}

/** /about/management — Management team. Copy: content/company.ts ABOUT_MANAGEMENT. */

import type { Metadata } from "next"
import { Section } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, PersonCard } from "@/components/marketing/page-blocks"
import { ABOUT_MANAGEMENT } from "@/content/company"

export const metadata: Metadata = ABOUT_MANAGEMENT.meta

export default function ManagementPage() {
  const { eyebrow, title, description, people } = ABOUT_MANAGEMENT
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <Section tone="card" size="md">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((person) => (
            <li key={person.name}>
              <PersonCard person={person} />
            </li>
          ))}
        </ul>
      </Section>
      <ContactSection />
    </>
  )
}

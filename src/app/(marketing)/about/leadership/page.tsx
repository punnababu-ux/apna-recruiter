/**
 * /about/leadership — Our leadership and investors. Copy: content/company.ts
 * ABOUT_LEADERSHIP (Lovable "Our Leadership").
 *
 *   Hero       the chip, the serif headline, the line
 *   Leaders    one row each: portrait beside their own words (serif quote),
 *              name, role, LinkedIn; sides alternate
 *   Investors  the six names as a wordmark wall on a mother-gradient band
 */

import type { Metadata } from "next"
import { Section, SectionHeading } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, PersonCard, withAccent } from "@/components/marketing/page-blocks"
import { ABOUT_LEADERSHIP } from "@/content/company"

export const metadata: Metadata = ABOUT_LEADERSHIP.meta

export default function LeadershipPage() {
  const { eyebrow, title, description, people, investors } = ABOUT_LEADERSHIP
  return (
    <>
      <PageHero eyebrow={eyebrow} title={withAccent(title, "best")} description={description} />

      <Section tone="card" size="md">
        <ul className="flex flex-col gap-16 lg:gap-24">
          {people.map((person, i) => (
            <li key={person.name}>
              <PersonCard person={person} shape="row" reverse={i % 2 === 1} />
            </li>
          ))}
        </ul>
      </Section>

      <Section size="lg" className="bg-gradient-checkout-hero">
        <div className="flex flex-col items-center gap-12">
          <SectionHeading level={2} align="center" title={investors.title} />
          <ul className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
            {investors.names.map((name) => (
              <li
                key={name}
                className="flex min-h-28 items-center justify-center bg-card/80 px-4 text-center font-heading text-h5 font-semibold text-foreground backdrop-blur-xl"
              >
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

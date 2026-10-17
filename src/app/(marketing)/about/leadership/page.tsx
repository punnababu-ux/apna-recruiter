/**
 * /about/leadership — Our leadership and investors. Copy: content/company.ts
 * ABOUT_LEADERSHIP (Lovable "Our Leadership").
 *
 *   Hero       the chip, the serif headline, the line
 *   Leaders    one row each: portrait beside their own words (serif quote),
 *              name, role, LinkedIn; sides alternate
 *   Investors  the six names as a wordmark wall, in the same white band
 */

import type { Metadata } from "next"
import { Compass, Section, SectionHeading } from "@apna/design-system"
import { PageHero, PersonCard, withAccent } from "@/components/marketing/page-blocks"
import { ABOUT_LEADERSHIP } from "@/content/company"

export const metadata: Metadata = ABOUT_LEADERSHIP.meta

export default function LeadershipPage() {
  const { eyebrow, title, description, people, investors } = ABOUT_LEADERSHIP
  return (
    <>
      <PageHero
        icon={<Compass aria-hidden />}
        eyebrow={eyebrow}
        title={withAccent(title, "best")}
        description={description}
      />

      {/* The leaders, then their backers, in one white band (the contact
          band below is on the canvas, so this band closes the page). */}
      <Section tone="card" size="md">
        <div className="flex flex-col gap-24 lg:gap-32">
          <ul className="flex flex-col gap-16 lg:gap-24">
            {people.map((person, i) => (
              <li key={person.name}>
                <PersonCard person={person} shape="row" reverse={i % 2 === 1} />
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-12">
            <SectionHeading level={2} align="center" title={investors.title} />
            <ul className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
              {investors.names.map((name) => (
                <li
                  key={name}
                  className="flex min-h-28 items-center justify-center bg-muted px-4 text-center font-heading text-h5 font-semibold text-foreground"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}

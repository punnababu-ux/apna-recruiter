/**
 * /about/leadership — Our leadership and investors. Copy: content/company.ts
 * ABOUT_LEADERSHIP (Lovable "Our Leadership").
 *
 *   Hero       the chip, the serif headline, the line
 *   Leaders    one row each: portrait beside their own words (serif quote),
 *              name, role, LinkedIn; sides alternate
 *   Investors  the six firms' own logos, in colour, in the same white band
 */

import type { Metadata } from "next"
import Image from "next/image"
import { Compass, Section, SectionHeading } from "@apna/design-system"
import { PageHero, PersonCard, withAccent } from "@/components/marketing/page-blocks"
import { ABOUT_LEADERSHIP } from "@/content/company"
import { cn } from "@/lib/utils"

export const metadata: Metadata = ABOUT_LEADERSHIP.meta

/** Logo heights by shape: long wordmarks lower, compact marks taller. */
const LOGO_HEIGHT = { sm: "h-5 sm:h-6", md: "h-7 sm:h-8", lg: "h-10 sm:h-12", xl: "h-14 sm:h-16" } as const

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
          <ul className="flex flex-col gap-6 lg:gap-8">
            {people.map((person, i) => (
              <li key={person.name}>
                <PersonCard person={person} shape="row" reverse={i % 2 === 1} />
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-12">
            <SectionHeading level={2} align="center" title={investors.title} />
            <ul className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3">
              {investors.firms.map((firm) => (
                <li key={firm.name} className="flex min-h-28 items-center justify-center bg-muted px-6 py-6">
                  {/* Each firm's own logo, in colour; the dark-mode version
                      swaps in with the theme. */}
                  <Image
                    src={`/logos/investors/${firm.logo}`}
                    width={240}
                    height={80}
                    unoptimized
                    alt={firm.name}
                    className={cn("w-auto max-w-full object-contain dark:hidden", LOGO_HEIGHT[firm.size])}
                  />
                  <Image
                    src={`/logos/investors/${firm.dark}`}
                    width={240}
                    height={80}
                    unoptimized
                    alt={firm.name}
                    className={cn("hidden w-auto max-w-full object-contain dark:block", LOGO_HEIGHT[firm.size])}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  )
}

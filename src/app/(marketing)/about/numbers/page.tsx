/**
 * /about/numbers — apna by the numbers. Copy: content/company.ts
 * ABOUT_NUMBERS. Hero, then "By the numbers" on white: the recruiter
 * numbers only (no tabs), large, on one lifted card in the green suite
 * gradient (apna's own green — not the hero's mother gradient again).
 */

import type { Metadata } from "next"
import { BarChart2, Section, SectionHeading } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, StatGrid } from "@/components/marketing/page-blocks"
import { ABOUT_NUMBERS } from "@/content/company"

export const metadata: Metadata = ABOUT_NUMBERS.meta

export default function NumbersPage() {
  return (
    <>
      <PageHero icon={<BarChart2 aria-hidden />} eyebrow={ABOUT_NUMBERS.eyebrow} title={ABOUT_NUMBERS.title} description={ABOUT_NUMBERS.description} />
      {/* The numbers on white (the hero above is the gradient). */}
      <Section tone="card" size="lg">
        <div className="flex flex-col items-center gap-10">
          <SectionHeading
            level={2}
            align="center"
            title={ABOUT_NUMBERS.sectionTitle}
            description={ABOUT_NUMBERS.recruiters.blurb}
          />
          <StatGrid stats={ABOUT_NUMBERS.recruiters.stats} size="lg" tone="green" />
        </div>
      </Section>
      <ContactSection />
    </>
  )
}

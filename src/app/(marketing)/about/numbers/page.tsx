/**
 * /about/numbers — apna by the numbers. Copy: content/company.ts
 * ABOUT_NUMBERS. Hero, then Lovable's "By the numbers" block on white: the
 * tabs, the per-tab line, the numbers large in one card.
 */

import type { Metadata } from "next"
import {
  BarChart2,
  Section,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { NumbersSwitcher } from "@/components/marketing/page-switchers"
import { ABOUT_NUMBERS } from "@/content/company"

export const metadata: Metadata = ABOUT_NUMBERS.meta

export default function NumbersPage() {
  return (
    <>
      <PageHero icon={<BarChart2 aria-hidden />} eyebrow={ABOUT_NUMBERS.eyebrow} title={ABOUT_NUMBERS.title} description={ABOUT_NUMBERS.description} />
      {/* The numbers on white (the hero above is the gradient). */}
      <Section tone="card" size="lg">
        <NumbersSwitcher />
      </Section>
      <ContactSection />
    </>
  )
}

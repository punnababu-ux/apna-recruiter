/** /about/numbers — apna by the numbers. Copy: content/company.ts ABOUT_NUMBERS. */

import type { Metadata } from "next"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { NumbersSwitcher } from "@/components/marketing/page-switchers"
import { ABOUT_NUMBERS } from "@/content/company"

export const metadata: Metadata = ABOUT_NUMBERS.meta

export default function NumbersPage() {
  return (
    <>
      <PageHero eyebrow={ABOUT_NUMBERS.eyebrow} title={ABOUT_NUMBERS.title} description={ABOUT_NUMBERS.description}>
        <NumbersSwitcher />
      </PageHero>
      <ContactSection />
    </>
  )
}

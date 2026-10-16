/** /newsroom — Press releases and coverage. Copy: content/press.ts. */

import type { Metadata } from "next"
import { Section } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { PressList } from "@/components/marketing/page-switchers"
import { PRESS } from "@/content/press"

export const metadata: Metadata = PRESS.meta

export default function NewsroomPage() {
  return (
    <>
      <PageHero eyebrow={PRESS.eyebrow} title={PRESS.title} description={PRESS.description} />
      <Section tone="card" size="md" width="narrow">
        <PressList />
      </Section>
      <ContactSection />
    </>
  )
}

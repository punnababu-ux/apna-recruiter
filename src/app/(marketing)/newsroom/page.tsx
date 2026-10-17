/**
 * /newsroom — Press releases and coverage. Copy: content/press.ts (Lovable
 * "Press Releases"). Year tabs; the year's latest story as a large card,
 * the rest as rows in one card, on white.
 */

import type { Metadata } from "next"
import {
  Newspaper,
  Section,
} from "@apna/design-system"
import { PageHero } from "@/components/marketing/page-blocks"
import { PressList } from "@/components/marketing/page-switchers"
import { PRESS } from "@/content/press"

export const metadata: Metadata = PRESS.meta

export default function NewsroomPage() {
  return (
    <>
      <PageHero icon={<Newspaper aria-hidden />} eyebrow={PRESS.eyebrow} title={PRESS.title} description={PRESS.description} />
      <Section tone="card" size="lg">
        <PressList />
      </Section>
    </>
  )
}

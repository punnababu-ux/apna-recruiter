/**
 * /newsroom/awards — the hall. Copy and pictures: content/company.ts AWARDS.
 *
 * The one dark marketing page (user call, 2026-10-20): walking in should
 * feel like entering an auditorium where the awards are on display. Dark by
 * CSS alone: [data-hall] below switches the dark tokens on (semantic.css).
 *
 *   Hero     the stage wash: house lights dim on arrival, a pool of
 *            light settles on the headline
 *   Walk     the gallery: scrolling down walks you sideways past the
 *            awards (HallWalk); the one in the centre is lit, the rest
 *            recede into the dark
 *   Cabinet  the wall of honour: every award small, in a lit niche
 */

import type { Metadata } from "next"
import Image from "next/image"
import { Award, Section, SectionHeading } from "@apna/design-system"
import { HallWalk } from "@/components/marketing/awards-hall"
import { HeroChip, withAccent } from "@/components/marketing/page-blocks"
import { AWARDS } from "@/content/company"

export const metadata: Metadata = AWARDS.meta


export default function AwardsPage() {
  const { eyebrow, title, titleAccent, description, shelf, items } = AWARDS
  return (
    <div data-hall className="relative text-foreground">

      <div className="relative">
        <div aria-hidden className="hall-wash absolute inset-x-0 top-0 h-full" />
        <div aria-hidden className="hall-pool absolute inset-0" />
        <Section size="lg" className="relative max-md:pt-8 pb-0 md:pb-0">
          <SectionHeading
            level={1}
            align="center"
            eyebrow={<HeroChip icon={<Award aria-hidden />}>{eyebrow}</HeroChip>}
            title={withAccent(title, titleAccent)}
            description={description}
          />
        </Section>
      </div>

      <HallWalk awards={items} />

      <Section size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={<span className="text-overline text-muted-foreground">{shelf.eyebrow}</span>}
            title="The wall of honour"
          />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {items.map((award) => (
              <li key={award.title} data-lit="" className="relative flex flex-col items-center gap-3 rounded-card-nested hall-plinth p-4">
                <div aria-hidden className="hall-spotlight absolute inset-0 rounded-card-nested" />
                <Image src={award.image} alt="" width={200} height={200} className="relative aspect-square w-full rounded-xs object-cover" />
                <span className="relative text-caption text-center text-balance text-foreground">{award.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  )
}

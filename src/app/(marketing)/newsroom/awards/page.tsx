/**
 * /newsroom/awards — Awards and certifications. Copy and pictures:
 * content/company.ts AWARDS (Lovable "The awards room").
 *
 *   Hero    the chip, the serif headline, the line, then the awards-room
 *           picture, wide
 *   Shelf   "On the shelf": every award with its own picture; the first
 *           (OpenAI) wide, across two columns
 */

import type { Metadata } from "next"
import Image from "next/image"
import {
  Award,
  Badge,
  Card,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { PageHero } from "@/components/marketing/page-blocks"
import { AWARDS } from "@/content/company"
import { cn } from "@/lib/utils"

export const metadata: Metadata = AWARDS.meta

export default function AwardsPage() {
  const { eyebrow, title, description, heroImage, shelf, items } = AWARDS
  return (
    <>
      <PageHero icon={<Award aria-hidden />} eyebrow={eyebrow} title={title} description={description}>
        <Image
          src={heroImage}
          alt=""
          width={1600}
          height={1067}
          priority
          className="aspect-video w-full rounded-card object-cover shadow-elevated"
        />
      </PageHero>

      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading
            level={2}
            align="center"
            eyebrow={<span className="text-overline text-muted-foreground">{shelf.eyebrow}</span>}
            title={shelf.title}
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((award, i) => (
              <li key={award.title} className={cn(i === 0 && "sm:col-span-2")}>
                <Card padding="none" className="h-full overflow-hidden">
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={i === 0 ? 1200 : 600}
                    height={i === 0 ? 675 : 600}
                    className={cn("w-full object-cover", i === 0 ? "aspect-video" : "aspect-square")}
                  />
                  <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-overline text-muted-foreground">{award.by}</span>
                      <Badge variant="outline" className="shrink-0 tabular-nums">
                        {award.year}
                      </Badge>
                    </div>
                    <h3 className="text-h5 text-balance text-foreground">{award.title}</h3>
                    <p className="text-sm text-pretty text-muted-foreground">{award.description}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  )
}

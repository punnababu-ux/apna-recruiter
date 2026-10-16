"use client"

/**
 * FeatureShowcase — a ProgressAccordion of offers beside a picture that
 * follows the open one (About's "Built for recruiters"). Each item names
 * its picture; the picture cross-fades as the accordion walks. Pure layout
 * over ProgressAccordion and the marketing illustrations.
 */

import * as React from "react"
import { ProgressAccordion } from "@apna/design-system"
import { ProductIllustration, TrustIllustration } from "@/components/marketing/product-illustrations"

export type ShowcasePicture = "Smart Jobs" | "AI Calling Agent" | "Hyperlocal Database" | "apna Unlimited" | "Trust"

export interface ShowcaseItem {
  title: string
  tagline: string
  description: string
  picture: ShowcasePicture
}

const PICTURE_CLASS = "h-80 rounded-card sm:h-112"

export function FeatureShowcase({ heading, items }: { heading: React.ReactNode; items: readonly ShowcaseItem[] }) {
  const [active, setActive] = React.useState(items[0].title)
  const picture = items.find((item) => item.title === active)?.picture ?? items[0].picture

  return (
    // The heading runs the full width on top (title and line each on one
    // line where they fit); the accordion and its picture sit side by side
    // under it.
    <div className="flex flex-col gap-10 lg:gap-12">
      {heading}
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ProgressAccordion
          value={active}
          onValueChange={setActive}
          items={items.map((item) => ({
            value: item.title,
            title: item.title,
            subtitle: item.tagline,
            content: item.description,
          }))}
        />
        {/* Keyed on the picture so each change fades in afresh. */}
        <div key={picture} className="animate-in fade-in duration-large">
          {picture === "Trust" ? (
            <TrustIllustration size="lg" className={PICTURE_CLASS} />
          ) : (
            <ProductIllustration product={picture} size="lg" className={PICTURE_CLASS} />
          )}
        </div>
      </div>
    </div>
  )
}

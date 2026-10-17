/**
 * ValueArt — a stack card's 3D clay picture (Culture's values, Join us's
 * Life at apna): its 3D clay object
 * (public/images/company/values/<name>.png) once generated. Until then, a
 * stand-in of the same size and weight: the value's icon on a large
 * frosted disc, so the card's layout is final and the swap is one line
 * (READY below).
 */

import type { ComponentType } from "react"
import Image from "next/image"
import { HeartHandshake, KeyRound, Rocket, Scale, Target, TrendingUp } from "@apna/design-system"

export type ValueName =
  | "ownership"
  | "customer-obsession"
  | "empathy"
  | "transparency"
  // Life at apna (Join us)
  | "momentum"
  | "ownership-over-hierarchy"
  | "raise-the-bar"

const ICON: Record<ValueName, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  ownership: KeyRound,
  "customer-obsession": Target,
  empathy: HeartHandshake,
  transparency: Scale,
  momentum: Rocket,
  "ownership-over-hierarchy": KeyRound,
  "raise-the-bar": TrendingUp,
}

/** Values whose clay image is in public/images/company/values. */
const READY = new Set<ValueName>([
  "ownership",
  "customer-obsession",
  "empathy",
  "transparency",
  "momentum",
  "ownership-over-hierarchy",
  "raise-the-bar",
])

export function ValueArt({ name }: { name: ValueName }) {
  if (READY.has(name)) {
    return (
      <Image
        src={`/images/company/values/${name}.png`}
        alt=""
        width={320}
        height={320}
        className="size-56 object-contain md:size-72 lg:size-80"
      />
    )
  }
  const Icon = ICON[name]
  return (
    <span className="flex size-48 items-center justify-center rounded-full border border-card/60 bg-card/70 shadow-card backdrop-blur-xl md:size-64">
      <Icon className="size-16 text-foreground sm:size-20" aria-hidden />
    </span>
  )
}

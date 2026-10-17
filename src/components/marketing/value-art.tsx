/**
 * ValueArt — a culture value's picture on its card: its 3D clay object
 * (public/images/company/values/<name>.png) once generated. Until then, a
 * stand-in of the same size and weight: the value's icon on a large
 * frosted disc, so the card's layout is final and the swap is one line
 * (READY below).
 */

import type { ComponentType } from "react"
import Image from "next/image"
import { HeartHandshake, KeyRound, Scale, Target } from "@apna/design-system"

type ValueName = "ownership" | "customer-obsession" | "empathy" | "transparency"

const ICON: Record<ValueName, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  ownership: KeyRound,
  "customer-obsession": Target,
  empathy: HeartHandshake,
  transparency: Scale,
}

/** Values whose clay image is in public/images/company/values. */
const READY = new Set<ValueName>([])

export function ValueArt({ name }: { name: ValueName }) {
  if (READY.has(name)) {
    return (
      <Image
        src={`/images/company/values/${name}.png`}
        alt=""
        width={320}
        height={320}
        className="size-48 object-contain sm:size-64"
      />
    )
  }
  const Icon = ICON[name]
  return (
    <span className="flex size-40 items-center justify-center rounded-full border border-card/60 bg-card/70 shadow-card backdrop-blur-xl sm:size-56">
      <Icon className="size-16 text-foreground sm:size-20" aria-hidden />
    </span>
  )
}

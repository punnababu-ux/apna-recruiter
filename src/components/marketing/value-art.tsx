/**
 * ValueArt — a stack card's 3D clay picture (Culture's values, Join us's
 * Life at apna, the Lounge's How it works): its 3D clay object
 * (public/images/company/values/<name>.png) once generated. Until then, a
 * stand-in of the same size and weight: the value's icon on a large
 * frosted disc, so the card's layout is final and the swap is one line
 * (READY below).
 */

import type { ComponentType } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  BarChart2,
  Building2,
  DoorOpen,
  GraduationCap,
  HeartHandshake,
  KeyRound,
  Landmark,
  MessagesSquare,
  Rocket,
  Scale,
  Target,
  TrendingUp,
  Wrench,
} from "@apna/design-system"

export type ValueName =
  | "ownership"
  | "customer-obsession"
  | "empathy"
  | "transparency"
  // Life at apna (Join us)
  | "momentum"
  | "ownership-over-hierarchy"
  | "raise-the-bar"
  // The Lounge's audiences
  | "student"
  | "university"
  | "government"
  // The Lounge's How it works
  | "deploy"
  | "access"
  | "practise"
  | "improve"
  | "track"

const ICON: Record<ValueName, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  ownership: KeyRound,
  "customer-obsession": Target,
  empathy: HeartHandshake,
  transparency: Scale,
  momentum: Rocket,
  "ownership-over-hierarchy": KeyRound,
  "raise-the-bar": TrendingUp,
  student: GraduationCap,
  university: Building2,
  government: Landmark,
  deploy: Wrench,
  access: DoorOpen,
  practise: MessagesSquare,
  improve: TrendingUp,
  track: BarChart2,
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
  "student",
  "university",
  "government",
])

export function ValueArt({ name, size = "lg" }: { name: ValueName; size?: "md" | "lg" }) {
  if (READY.has(name)) {
    return (
      <Image
        src={`/images/company/values/${name}.png`}
        alt=""
        width={320}
        height={320}
        className={size === "md" ? "size-48 object-contain sm:size-56" : "size-56 object-contain md:size-72 lg:size-80"}
      />
    )
  }
  const Icon = ICON[name]
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full border border-card/60 bg-card/70 shadow-card backdrop-blur-xl",
        size === "md" ? "size-32" : "size-48 md:size-64"
      )}
    >
      <Icon className={cn("text-foreground", size === "md" ? "size-12" : "size-16 sm:size-20")} aria-hidden />
    </span>
  )
}

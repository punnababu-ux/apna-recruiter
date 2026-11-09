"use client"

/**
 * MetaFact — one fact on a job or candidate card, led by a small gray icon
 * (default since 2026-11-09; ?icons=0 shows the old dots). One icon, one meaning: MapPin location, Calendar posted
 * on, UserRound posted by, Briefcase experience. The ₹ needs no icon.
 *
 * Decisions: docs/DECISIONS.md, "Small icons for card facts".
 */

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Briefcase, cn, MapPin } from "@apna/design-system"

export const useMetaIcons = () => useSearchParams().get("icons") !== "0"

export function MetaFact({ icon: Icon, className, children }: { icon: typeof MapPin; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-1", className)}>
      <Icon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="truncate">{children}</span>
    </span>
  )
}

/** Experience and salary hold their width; the location gives way. */
export function CandidateFacts({ lead, experience, salary, location, className }: {
  lead?: string
  experience: string
  salary?: string
  location?: string
  className?: string
}) {
  return (
    <p className={cn("flex min-w-0 items-center gap-3 text-sm", className)}>
      {lead && <span className="shrink-0 whitespace-nowrap">{lead}</span>}
      <MetaFact icon={Briefcase} className="shrink-0">{experience}</MetaFact>
      {salary && <span className="shrink-0 whitespace-nowrap">{salary}</span>}
      {location && <MetaFact icon={MapPin}>{location}</MetaFact>}
    </p>
  )
}

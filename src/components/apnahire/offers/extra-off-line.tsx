/**
 * ExtraOffLine — "10% extra off applied", under a price once the exit offer
 * is claimed. One line for both checkouts' desktop cards; phone rows use the
 * shorter "Incl. 10% extra" beside the % OFF badge (MobileDiscountRow).
 *
 * While the offer is on, the words shimmer and the discount icon rocks
 * together every few seconds. Same pairing on every "offer applied" line.
 */

import { BadgePercent } from "@apna/design-system"
import { EXTRA_OFF } from "@/content/offers"

export function ExtraOffLine() {
  return (
    <span className="flex items-center gap-1 text-xs not-italic text-success">
      <BadgePercent className="size-3.5 shrink-0 animate-wiggle" aria-hidden />
      <span className="animate-text-shimmer">{EXTRA_OFF.applied}</span>
    </span>
  )
}

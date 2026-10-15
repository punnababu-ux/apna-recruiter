/**
 * ExtraOffLine — "10% extra off applied", under a price once the exit offer
 * is claimed. One line for both checkouts' desktop cards; phone rows use the
 * shorter "Incl. 10% extra" beside the % OFF badge (MobileDiscountRow).
 */

import { BadgePercent } from "@apna/design-system"
import { EXTRA_OFF } from "@/content/offers"

export function ExtraOffLine() {
  return (
    <span className="flex items-center gap-1 text-xs not-italic text-success">
      <BadgePercent className="size-3.5 shrink-0" aria-hidden />
      {EXTRA_OFF.applied}
    </span>
  )
}

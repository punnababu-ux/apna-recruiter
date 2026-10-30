/**
 * ExtraOffLine — "Extra 10% off applied", under a price once the exit offer
 * is claimed, on both checkouts' desktop cards. On phones the cards don't
 * say it: ExtraOffBar does, once, in the pinned header (user call,
 * 2026-10-30). The card prices still carry the 10%.
 *
 * While the offer is on, the words shimmer and the discount icon rocks
 * together every few seconds. Same pairing on every "offer applied" line.
 */

import { AlertBanner, BadgePercent } from "@apna/design-system"
import { EXTRA_OFF } from "@/content/offers"
import { cn } from "@/lib/utils"
import { CountdownChip } from "@/components/apnahire/offers/countdown-chip"

export function ExtraOffLine() {
  return (
    <span className="flex items-center gap-1 text-xs not-italic text-success">
      <BadgePercent className="size-3.5 shrink-0 animate-wiggle" aria-hidden />
      <span className="animate-text-shimmer">{EXTRA_OFF.applied}</span>
    </span>
  )
}

/** Phones: the claimed 10% said once, as a strip at the bottom of the
 *  page's pinned header (CheckoutTopBar / JobPostingChrome `below`), so it
 *  stays in view while the cards scroll: the offer on the left, the time
 *  it has left on the right (a 24-hour offer, user call 2026-10-30).
 *  Renders nothing until claimed (`deadline` null). */
export function ExtraOffBar({ deadline, className }: { deadline: number | null; className?: string }) {
  if (deadline === null) return null
  return (
    <div
      role="status"
      className={cn(
        "flex h-10 items-center justify-between gap-3 border-t border-border bg-accent px-4 animate-in fade-in-0 sm:px-6",
        className
      )}
    >
      <ExtraOffLine />
      <CountdownChip deadline={deadline} className="bg-card py-0.5 text-xs" />
    </div>
  )
}

/** V2 (self-checkout, phones): the claimed 10% as the design system's
 *  solid green success banner above the tab's heading, with the time left
 *  on the right, instead of the strip in the pinned header (user call,
 *  2026-10-30). Renders nothing until claimed. */
export function ExtraOffBanner({ deadline, className }: { deadline: number | null; className?: string }) {
  if (deadline === null) return null
  return (
    <AlertBanner
      variant="success"
      appearance="primary"
      icon={<BadgePercent className="size-4 animate-wiggle" aria-hidden />}
      // One thin row: icon and the offer on the left, the time left on the
      // right (user call, 2026-10-30). Not the banner's `cta` slot: that
      // stacks below the text on a phone.
      title={
        // inline-flex: the banner sets its title inline; a block flex box
        // inside it added a line above and pushed the icon off centre.
        <span className="inline-flex w-full items-center justify-between gap-2 align-middle">
          {EXTRA_OFF.applied}
          <CountdownChip deadline={deadline} className="bg-primary-foreground/15 py-0.5 text-xs text-primary-foreground" />
        </span>
      }
      className={className}
    />
  )
}

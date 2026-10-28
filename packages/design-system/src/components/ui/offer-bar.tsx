/**
 * OfferBar — the subscriber's one-line nudge on top of the plan card
 * (Figma Self-checkout › Subscription-upgrade, "Subscriber strip"). One
 * plum bar for every case: an upgrade, extra slots, a database top-up,
 * auto-pay off, a rebuy. The bar never changes colour; `tone` colours the
 * hook line only:
 *   offer   grey   an offer (upgrade, slots, top-up)
 *   fix     amber  something to fix (auto-pay off)
 *   lapsed  salmon a plan that has ended (rebuy)
 *
 * API
 *   <OfferBar
 *     tone="offer"
 *     art={<img … />}                         clay object, ~48px
 *     hook="Special upgrade offer"
 *     headline={<>Pay <OfferBarDrop from="₹2,499" to="₹833" unit="/month" /> on the annual plan</>}
 *     points={["1 active job slot for 365 days", "2,400 database credits"]}
 *     price={{ amount: "₹9,999", strike: "₹11,110", off: "10% OFF" }}
 *     deadline={<><Clock /> Offer ends in 24:56:44</>}
 *     cta={<Button variant="emphasis" trailingIcon={<ArrowRight />}>Upgrade now</Button>}
 *   />
 *
 * Without `points` and `price` (auto-pay off) the right side is just the
 * CTA. Two lines on the left, never three: hook, then headline. The surface
 * is marked dark, so an `emphasis` CTA renders white (Button rule).
 *
 * Layout: stacked on phones (what you get, then price and CTA on one row);
 * from md one row, a rule between the hook and what you get.
 */

import * as React from "react"
import { Check } from "@/icons/icons"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

const HOOK_TONE = {
  offer: "text-surface-inverted-fg/70",
  fix: "text-highlight",
  lapsed: "text-lapsed-on-dark",
} as const

export interface OfferBarProps extends Omit<React.ComponentProps<"div">, "title"> {
  tone?: keyof typeof HOOK_TONE
  art?: React.ReactNode
  hook: React.ReactNode
  headline: React.ReactNode
  /** What you get, one short line each. */
  points?: React.ReactNode[]
  price?: { amount: React.ReactNode; strike?: React.ReactNode; off?: React.ReactNode }
  /** The corner pill: a countdown or "Limited time offer". */
  deadline?: React.ReactNode
  cta: React.ReactNode
}

function OfferBar({ tone = "offer", art, hook, headline, points, price, deadline, cta, className, ...props }: OfferBarProps) {
  const rail = !!(points?.length || price)
  return (
    <div
      data-slot="offer-bar"
      data-surface="dark"
      className={cn(
        "relative flex flex-col gap-4 rounded-card bg-gradient-offer-bar p-4 text-surface-inverted-fg md:flex-row md:items-center md:gap-6 md:px-6 md:py-5",
        deadline && "pt-9 md:pt-7",
        className
      )}
      {...props}
    >
      {deadline && (
        <Badge variant="on-dark" size="ribbon" className="absolute top-0 right-0 h-7 gap-1.5 rounded-tr-[inherit] px-3">
          {deadline}
        </Badge>
      )}

      <div className={cn("flex min-w-0 items-center gap-3 md:gap-4", rail && "md:basis-1/2")}>
        {art && <div className="size-10 shrink-0 md:size-12 [&>*]:size-full [&>*]:object-contain">{art}</div>}
        <div className="flex min-w-0 flex-col gap-1">
          <p className={cn("text-xs md:truncate md:text-sm", HOOK_TONE[tone])}>{hook}</p>
          <p className="text-base font-semibold md:truncate md:text-xl">{headline}</p>
        </div>
      </div>

      {rail ? (
        <>
          <div aria-hidden className="h-px bg-surface-inverted-fg/15 md:h-auto md:w-px md:self-stretch" />
          {/* Phones: lines across, then price | CTA, the CTA dropping under
              the price when both don't fit (320px). From md: half and half —
              hook and headline on the left, then the rule, then lines over
              price with the CTA at the far right. */}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 md:grid md:flex-1 md:grid-flow-col md:grid-rows-2 md:justify-between md:gap-x-8 md:gap-y-2">
            {points?.length ? (
              <ul className="flex w-full flex-col gap-1.5 md:w-auto">
                {points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-surface-inverted-fg/85 md:text-sm">
                    <Check className="size-4 shrink-0 text-highlight" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
            {price && (
              <p className="flex items-center gap-1.5 whitespace-nowrap md:gap-2">
                <span className="text-lg font-bold md:text-2xl">{price.amount}</span>
                {price.strike && <span className="text-xs text-surface-inverted-fg/60 line-through">{price.strike}</span>}
                {price.off && (
                  <Badge variant="on-dark" size="sm">
                    {price.off}
                  </Badge>
                )}
              </p>
            )}
            <div className="justify-self-end md:row-span-2">{cta}</div>
          </div>
        </>
      ) : (
        <div className="md:ml-auto md:shrink-0">{cta}</div>
      )}
    </div>
  )
}

/** "₹2,499 → ₹833 /month" inside a headline: the old price struck, the new
 *  one gold. Each price keeps its unit on the same line. */
function OfferBarDrop({ from, to, unit }: { from: React.ReactNode; to: React.ReactNode; unit?: React.ReactNode }) {
  return (
    <>
      <span className="whitespace-nowrap text-surface-inverted-fg/60 line-through decoration-1">{from}</span>{" "}
      <span className="whitespace-nowrap text-highlight">
        {to}
        {unit && <span className="text-sm font-medium md:text-base"> {unit}</span>}
      </span>
    </>
  )
}

export { OfferBar, OfferBarDrop }

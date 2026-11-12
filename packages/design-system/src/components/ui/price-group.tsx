/**
 * PriceGroup — puts a price, its struck price and its % saving in the order
 * the alignment calls for (AGENTS.md, prices rule 7). It owns the ORDER only:
 * every caller keeps its own sizes, colours and placement.
 *
 *   align="start"   price, unit, struck price, %   (price at the left edge)
 *   align="end"     %, struck price, price, unit   (price at the right edge)
 *   align="responsive"   start on phones, end from md
 *
 * The price, unit and struck price never split (one no-wrap group); the %
 * may wrap under it as a whole. Screen readers always hear the price first:
 * "end" reverses the row visually, not in the DOM.
 *
 * Usage
 *   <PriceGroup
 *     price={<span className="text-plan-price">₹3,649</span>}
 *     unit={<span className="text-plan-unit">/month</span>}
 *     strike={<span className="text-sm line-through">₹4,194</span>}
 *     discount={<Badge variant="discount">−13%</Badge>}
 *   />
 */

import * as React from "react"
import { cn } from "@/lib/utils"

const ROW = {
  start: "",
  end: "flex-row-reverse",
  responsive: "md:flex-row-reverse",
} as const

export interface PriceGroupProps extends React.ComponentProps<"div"> {
  align?: keyof typeof ROW
  price: React.ReactNode
  unit?: React.ReactNode
  strike?: React.ReactNode
  discount?: React.ReactNode
}

function PriceGroup({ align = "start", price, unit, strike, discount, className, ...props }: PriceGroupProps) {
  const row = ROW[align]
  return (
    <div data-slot="price-group" className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-1", row, className)} {...props}>
      <div className={cn("flex items-center gap-1.5 whitespace-nowrap", row)}>
        {/* Price and unit stay together whichever way the row reads. */}
        <span className="flex items-center gap-1.5">
          {price}
          {unit}
        </span>
        {strike}
      </div>
      {discount && <div className="shrink-0">{discount}</div>}
    </div>
  )
}

export { PriceGroup }

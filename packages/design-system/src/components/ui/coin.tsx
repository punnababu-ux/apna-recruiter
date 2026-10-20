/**
 * Coin — a gold disc carrying an icon (₹ for plans). The mark of the
 * promoted "Plans" destination: the bottom bar's raised Plans tile, the
 * sidebar's plans link and the `premium` Button all use it, so plans look
 * the same wherever they're offered.
 *
 *   <Coin icon={IndianRupee} />            24px, for buttons and rows
 *   <Coin icon={IndianRupee} size="lg" />  28px, for the bottom bar tile
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export function Coin({
  icon: Icon,
  size = "md",
  className,
}: {
  icon: React.ComponentType<{ className?: string }>
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  return (
    <span
      data-slot="coin"
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-highlight text-highlight-foreground",
        size === "lg" ? "size-7" : size === "sm" ? "size-5" : "size-6",
        className
      )}
    >
      <Icon className={size === "lg" ? "size-4" : size === "sm" ? "size-3" : "size-3.5"} />
    </span>
  )
}

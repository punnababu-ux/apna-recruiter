/**
 * StickyCtaBar — the phone's bottom-pinned CTA dock: a frosted card strip
 * holding the screen's one primary action ("Buy 6 job credits · ₹3,649",
 * "Buy & post · ₹1,399"). Phones only (< md); from md the action sits in the
 * page.
 *
 * The bar owns everything about the dock: position, the frosted surface,
 * the home-indicator inset (`pb-safe-3.5`) and the button's floating pill
 * shape. Pass one Button; it's stretched full width and rounded fully.
 *
 *   <StickyCtaBar>
 *     <Button variant="checkout" size="xl" onClick={buy}>Buy now</Button>
 *   </StickyCtaBar>
 *
 * Give the page enough end padding (~96px on phones) that its last item
 * scrolls clear of the bar.
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export function StickyCtaBar({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      data-slot="sticky-cta-bar"
      className={cn(
        "fixed inset-x-0 bottom-0 z-sticky border-t border-border bg-card/95 p-3.5 pb-safe-3.5 backdrop-blur-md md:hidden",
        "*:data-[slot=button]:w-full *:data-[slot=button]:rounded-full *:data-[slot=button]:shadow-popover",
        className
      )}
    >
      {children}
    </div>
  )
}

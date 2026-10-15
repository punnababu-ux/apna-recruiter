/**
 * CloseBubble — the one close control for pop-ups.
 *
 * A 32px dark translucent disc with a white X, sitting OUTSIDE the
 * pop-up: 8px above its top-right corner (Figma "close-button-bubble").
 * DialogContent and bottom SheetContent render it for you, so call sites
 * never place a close button themselves. Side drawers (right/left sheets)
 * keep their inside X: there is no room outside a full-height panel.
 *
 * Used directly only as a `render` target for a primitive's Close part:
 *   <DialogPrimitive.Close render={<CloseBubble />} />
 *
 * a11y: labelled "Close"; focus ring from the system; ink + press feedback.
 */

import * as React from "react"

import { cn } from "@/lib/utils"
import { XIcon } from "@/icons/icons"

function CloseBubble({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="close-bubble"
      aria-label="Close"
      className={cn(
        "ink press relative flex size-8 shrink-0 items-center justify-center rounded-full bg-close-bubble text-close-bubble-foreground transition-interactive outline-none hover:bg-close-bubble-hover focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-5",
        className
      )}
      {...props}
    >
      <XIcon aria-hidden />
    </button>
  )
}

export { CloseBubble }

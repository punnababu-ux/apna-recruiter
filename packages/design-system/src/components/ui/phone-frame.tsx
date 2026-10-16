/**
 * PhoneFrame — a phone-shaped bezel for previewing mobile screens inside
 * a desktop page (e.g. "how candidates will see your job").
 *
 * The screen scrolls independently of the page. Width is capped at
 * `max-w-xs`; the frame keeps a phone aspect ratio. Purely presentational.
 * No notch: it hid the top line of whatever scrolled under it, and the
 * bezel alone already reads as a phone.
 *
 * API
 *   <PhoneFrame label="Candidate view">{screen}</PhoneFrame>
 *
 * Accessibility: `label` becomes the region's accessible name.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

interface PhoneFrameProps extends React.ComponentProps<"div"> {
  label?: string
  screenClassName?: string
}

function PhoneFrame({ label, className, screenClassName, children, ...props }: PhoneFrameProps) {
  return (
    <div
      data-slot="phone-frame"
      role="region"
      aria-label={label}
      className={cn(
        "relative mx-auto w-full max-w-xs overflow-hidden rounded-4xl border-8 border-foreground bg-foreground shadow-dialog",
        className
      )}
      {...props}
    >
      <div
        data-slot="phone-frame-screen"
        className={cn(
          "no-scrollbar aspect-[9/19] overflow-y-auto rounded-3xl bg-background",
          screenClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}

export { PhoneFrame }

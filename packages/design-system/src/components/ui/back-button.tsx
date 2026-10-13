"use client"

/**
 * BackButton — Standardized navigation action for returning to a previous screen.
 *
 * API
 *   <BackButton onClick={...} /> // optional custom click handler (e.g. exit wizard check)
 *
 * RULE — one back affordance, everywhere. Every back action in the product
 * (wizard headers, checkout top bars, detail pages) is this component as-is:
 * a 32px outlined circle with a ChevronLeft. No variants, no size/icon
 * overrides, no hand-rolled `<Button><ArrowLeft/></Button>`. A recruiter
 * moving from self-checkout into the job-posting flow and its plan step must
 * meet the same control in the same place. Header placement is fixed too:
 * the button is the first item in the row, followed at `gap-3` by the page
 * title or logo. `className` is for surface adaptation only (e.g. a
 * transparent fill on a fixed-light surface), never for shape or glyph.
 * (A `ghost` bare-arrow variant existed for self-checkout and was removed
 * for exactly this reason — it made the two flows' back buttons differ.)
 *
 * Accessibility (a11y)
 *   - Implements `aria-label="Go back"` by default so screen readers announce its purpose.
 *   - Fully supports standard keyboard navigation focus/active states.
 */

import * as React from "react"
import { ChevronLeft } from "@/icons/icons"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function BackButton({
  onClick,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children" | "variant" | "size">) {
  const router = useRouter()

  const handleBack = (e: Parameters<NonNullable<React.ComponentProps<typeof Button>["onClick"]>>[0]) => {
    if (onClick) {
      onClick(e)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label="Go back"
      onClick={handleBack}
      className={cn("shrink-0", className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
    </Button>
  )
}

export { BackButton }

"use client"

/**
 * BackButton — Standardized navigation action for returning to a previous screen.
 *
 * API
 *   <BackButton onClick={...} /> // optional custom click handler (e.g. exit wizard check)
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

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
import { ArrowLeft, ChevronLeft } from "@/icons/icons"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function BackButton({
  onClick,
  className,
  variant = "outline",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children" | "variant" | "size"> & {
  /** "outline" (default) — a 32px bordered circle with a chevron, for
   *  in-page and wizard back actions.
   *  "ghost" — a bare 24px arrow in a 40px hit box, for a product header
   *  where the glyph sits directly on the page surface. */
  variant?: "outline" | "ghost"
}) {
  const router = useRouter()

  const handleBack = (e: Parameters<NonNullable<React.ComponentProps<typeof Button>["onClick"]>>[0]) => {
    if (onClick) {
      onClick(e)
    } else {
      router.back()
    }
  }

  const ghost = variant === "ghost"

  return (
    <Button
      variant={variant}
      size={ghost ? "icon-lg" : "icon-sm"}
      aria-label="Go back"
      onClick={handleBack}
      className={cn("shrink-0", className)}
      {...props}
    >
      {ghost ? <ArrowLeft className="size-6" /> : <ChevronLeft className="size-4" />}
    </Button>
  )
}

export { BackButton }

"use client"

/**
 * TapTooltip — the design system's Tooltip (dark, with an arrow), opened by a
 * tap or click instead of hover, so it works the same on phones and desktop.
 * For explainer text (AGENTS.md: "Explainer copy is ASD-STE100").
 *
 * The trigger carries no marker of its own; style it at the call site if the
 * text needs one. A tap on it never reaches a clickable card around it.
 */

import * as React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@apna/design-system"
import { cn } from "@/lib/utils"

export function TapTooltip({
  content,
  className,
  children,
}: {
  content: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  return (
    // Only the tap below opens or closes it from the trigger: the
    // primitive's own hover opens and its close on a trigger press are
    // ignored. Escape and a press elsewhere still close it.
    <Tooltip
      open={open}
      onOpenChange={(next, details) => {
        if (!next && details.reason !== "trigger-press") setOpen(false)
      }}
    >
      <TooltipTrigger
        onClick={(e) => {
          e.stopPropagation()
          setOpen((o) => !o)
        }}
        onKeyDown={(e) => e.stopPropagation()}
        className={cn("cursor-pointer text-left", className)}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent className="max-w-60">{content}</TooltipContent>
    </Tooltip>
  )
}

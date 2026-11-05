"use client"

/**
 * ChatAppliedRow — the "applied" line of the chat list: the result count,
 * then one removable chip per applied filter or search, then "Clear all".
 *
 *   Nothing applied   "307 chats", muted.
 *   Something applied "34 of 307 chats" and the chips. The chips sit on ONE
 *                     horizontally scrolling line (no wrap, no scrollbar), so
 *                     many chips never grow the row: its height stays the
 *                     caller's (SUBROW on md+).
 *
 * No removable-chip primitive exists in the design system, so a chip is a
 * Button (size xs, outline: the ink and press come with it) with an X icon.
 */

import * as React from "react"
import { Button, X } from "@apna/design-system"
import { cn } from "@/lib/utils"

export type AppliedChip = {
  key: string
  label: string
  /** The status glyph, kept from the Filters menu. */
  icon?: React.ComponentType<{ className?: string }>
  onRemove: () => void
}

export function ChatAppliedRow({
  shown,
  total,
  chips,
  onClearAll,
  className,
}: {
  shown: number
  total: number
  chips: AppliedChip[]
  onClearAll: () => void
  className?: string
}) {
  const noun = total === 1 ? "chat" : "chats"
  const applied = chips.length > 0
  return (
    <div data-slot="chat-applied-row" className={cn("flex min-w-0 items-center gap-2", className)}>
      <span className={cn("shrink-0 text-body-sm", applied ? "text-foreground" : "text-muted-foreground")}>
        {applied ? `${shown} of ${total} ${noun}` : `${total} ${noun}`}
      </span>
      {applied && (
        <>
          <ul aria-label="Applied filters" className="no-scrollbar mask-fade-e flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto pr-6">
            {chips.map((c) => {
              const Icon = c.icon
              return (
                <li key={c.key} className="shrink-0">
                  <Button
                    variant="outline"
                    size="xs"
                    aria-label={`Remove filter: ${c.label}`}
                    title={`Remove filter: ${c.label}`}
                    onClick={c.onRemove}
                  >
                    {Icon && <Icon aria-hidden />}
                    <span className="max-w-32 truncate">{c.label}</span>
                    <X aria-hidden />
                  </Button>
                </li>
              )
            })}
          </ul>
          <Button variant="ghost" size="xs" className="shrink-0" onClick={onClearAll}>
            Clear all
          </Button>
        </>
      )}
    </div>
  )
}

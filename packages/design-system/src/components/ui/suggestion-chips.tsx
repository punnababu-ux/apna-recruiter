/**
 * SuggestionChips — tappable suggested replies under a chat (Intercom/Front
 * style). Chips WRAP their text over several lines, so Button (nowrap, fixed
 * height) is not used.
 *
 *   <SuggestionChips items={["Yes, I can join", "Call me"]}
 *                    onSelect={(text) => send(text)}
 *                    label="Suggested replies"   // visually-hidden group label
 *                    icon={<Sparkles />} />      // optional leading icon per chip
 *
 * A11y: a role="group" labelled by `label`; each chip is a native button.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

function SuggestionChips({
  items,
  onSelect,
  label = "Suggested replies",
  icon,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect" | "children"> & {
  items: string[]
  onSelect: (item: string) => void
  label?: string
  icon?: React.ReactNode
}) {
  return (
    <div
      data-slot="suggestion-chips"
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item}
          type="button"
          data-slot="suggestion-chip"
          onClick={() => onSelect(item)}
          className="ink press relative flex items-start gap-2 rounded-control border border-border bg-card px-3 py-2 text-left text-body-sm text-foreground transition-interactive outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0"
        >
          {icon}
          <span>{item}</span>
        </button>
      ))}
    </div>
  )
}

export { SuggestionChips }

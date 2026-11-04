/**
 * SuggestionChips — tappable suggested replies under a chat (Intercom/Front
 * style). Chips WRAP their text over several lines, so Button (nowrap, fixed
 * height) is not used.
 *
 *   <SuggestionChips items={["Yes, I can join", { label: "AI summary", icon: <Sparkles />, value: "summary" }]}
 *                    onSelect={(value) => send(value)}
 *                    layout="wrap | scroll"      // default wrap
 *                    label="Suggested replies"   // visually-hidden group label
 *                    icon={<Sparkles />} />      // optional icon for every chip without its own
 *
 * `items`: a string, or `{ label, icon?, value? }`. A chip's icon beats the
 * shared `icon`. `onSelect` gets `value` when given, else the label (so string
 * callers are unchanged).
 *
 * Layout
 *   wrap    chips wrap over lines (a panel, a card).
 *   scroll  ONE horizontal row that scrolls sideways, scrollbar hidden
 *           (`no-scrollbar`), chips on one line each. Made to float on the
 *           `chat-wallpaper` above a floating ChatComposer.
 * Both layouts: bg-card chips with `shadow-control` (the smallest elevation
 * role, a hairline lift), so they read on a wallpaper as well as on a card.
 *
 * A11y: a role="group" labelled by `label`; each chip is a native button.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

type SuggestionItem = string | { label: string; icon?: React.ReactNode; value?: string }

function SuggestionChips({
  items,
  onSelect,
  label = "Suggested replies",
  icon,
  layout = "wrap",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "onSelect" | "children"> & {
  items: SuggestionItem[]
  onSelect: (item: string) => void
  label?: string
  /** Shared leading icon, for chips that carry none of their own. */
  icon?: React.ReactNode
  layout?: "wrap" | "scroll"
}) {
  const scroll = layout === "scroll"
  return (
    <div
      data-slot="suggestion-chips"
      data-layout={layout}
      role="group"
      aria-label={label}
      className={cn(scroll ? "no-scrollbar flex gap-2 overflow-x-auto" : "flex flex-wrap gap-2", className)}
      {...props}
    >
      {items.map((item) => {
        const { label: text, icon: own, value } = typeof item === "string" ? { label: item } : item
        return (
          <button
            key={value ?? text}
            type="button"
            data-slot="suggestion-chip"
            onClick={() => onSelect(value ?? text)}
            className={cn(
              "ink press relative flex items-start gap-2 rounded-control border border-border bg-card px-3 py-2 text-left text-body-sm text-foreground shadow-control transition-interactive outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0",
              scroll && "shrink-0 items-center whitespace-nowrap rounded-full [&_svg]:mt-0"
            )}
          >
            {own ?? icon}
            <span>{text}</span>
          </button>
        )
      })}
    </div>
  )
}

export { SuggestionChips }
export type { SuggestionItem }

/**
 * GstNote — the one tax disclaimer under prices: "*GST applicable".
 *
 * Every pricing surface uses this component, never its own wording ("18% GST
 * will be added at checkout", "+ GST" …): see "Tax disclaimer" in AGENTS.md.
 * The order summary shows the actual GST line, so plan pages only need to
 * say it applies.
 *
 * Muted hero-foreground by default (it sits on the checkout page canvas);
 * pass `className` for another surface, e.g. `text-muted-foreground` on a
 * card.
 */

import { cn } from "@/lib/utils"

export const GST_NOTE = "*GST applicable"

export function GstNote({ className }: { className?: string }) {
  return <p className={cn("text-xs text-checkout-hero-fg-muted", className)}>{GST_NOTE}</p>
}

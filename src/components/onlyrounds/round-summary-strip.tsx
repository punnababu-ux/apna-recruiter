/**
 * RoundSummaryStrip — at-a-glance summary of the active round's configuration.
 *
 * Shows the round name + mode on the left, key meta as InfoChips, and actions
 * on the right. If dialing is active, it hides setup options (Test call) and
 * shows a pulsing active status and a "Stop Dialing" button.
 */

import { Bot, FlaskConical, PhoneOutgoing, PhoneOff, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InfoChip } from "@/components/onlyrounds/shared"
import { cn } from "@/lib/utils"

export type RoundMetaItem = {
  icon: LucideIcon
  label: string
}

export function RoundSummaryStrip({
  roundName,
  mode = "ai",
  meta = [],
  onTest,
  onStartDialing,
  onStopDialing,
  isDialing = false,
  className,
}: {
  /** e.g. "Screening", "Tech interview" */
  roundName: string
  /** Used in the leading label, e.g. "Screening · AI" */
  mode?: "ai" | "human"
  meta?: RoundMetaItem[]
  /** Click handler for the Test CTA. Hidden when not provided. */
  onTest?: () => void
  /** Click handler for starting dialing. Hidden when not provided. */
  onStartDialing?: () => void
  /** Click handler for stopping dialing. Hidden when not provided. */
  onStopDialing?: () => void
  /** Whether dialing is currently active. */
  isDialing?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-card",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2">
        <div className="inline-flex items-center gap-2 text-sm font-semibold">
          <Bot className="size-4 text-primary" />
          {roundName} · {mode === "ai" ? "AI" : "Human"}
          {isDialing && (
            <Badge variant="success" className="animate-pulse ml-2 h-5">
              Dialing active
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {meta.map((m, i) => (
            <InfoChip key={i} icon={m.icon}>
              {m.label}
            </InfoChip>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {onTest && !isDialing && (
          <Button
            variant="outline"
            size="sm"
            onClick={onTest}
            className="bg-card"
          >
            <FlaskConical className="size-3.5" />
            Test
          </Button>
        )}
        {onStopDialing && isDialing && (
          <Button
            size="sm"
            variant="destructive"
            onClick={onStopDialing}
          >
            <PhoneOff className="size-3.5" />
            Stop Dialing
          </Button>
        )}
        {onStartDialing && !isDialing && (
          <Button
            size="sm"
            onClick={onStartDialing}
          >
            <PhoneOutgoing className="size-3.5" />
            Start Dialing
          </Button>
        )}
      </div>
    </div>
  )
}

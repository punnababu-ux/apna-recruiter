/**
 * RoundSummaryStrip — at-a-glance summary of the active round's configuration.
 *
 * Sits between the page tabs and the candidate list. Shows the round name +
 * mode on the left, key meta as InfoChips, and a "Test" CTA on the right
 * (used to manually trigger the AI round as the recruiter).
 *
 * The meta items are user-supplied; pass whichever subset is relevant for
 * the round type (AI screening shows duration + agent + format + language +
 * criteria count; a human round might show duration + interviewer only).
 */

import { Bot, FlaskConical, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
  className,
}: {
  /** e.g. "Screening", "Tech interview" */
  roundName: string
  /** Used in the leading label, e.g. "Screening · AI" */
  mode?: "ai" | "human"
  meta?: RoundMetaItem[]
  /** Click handler for the Test CTA. Hidden when not provided. */
  onTest?: () => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-accent/30 px-4 py-3",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-2">
        <div className="inline-flex items-center gap-2 text-sm font-semibold">
          <Bot className="size-4 text-primary" />
          {roundName} · {mode === "ai" ? "AI" : "Human"}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {meta.map((m, i) => (
            <InfoChip key={i} icon={m.icon}>
              {m.label}
            </InfoChip>
          ))}
        </div>
      </div>

      {onTest ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onTest}
          className="shrink-0 bg-card"
        >
          <FlaskConical className="size-3.5" />
          Test
        </Button>
      ) : null}
    </div>
  )
}

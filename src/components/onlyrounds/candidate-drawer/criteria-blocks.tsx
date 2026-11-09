"use client"

import { CircleCheck, Play, Star, Flag } from "@apna/design-system"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type {
  CefrAnalysis,
  CefrDimension,
  CriteriaGroup,
  CriterionScore,
} from "@/components/onlyrounds/candidate-drawer/types"
import { fmtMmSs } from "@/components/onlyrounds/candidate-drawer/utils"

// ── Criterion sub-blocks ──────────────────────────────────────────────────

function getGroupHeaderInfo(id: string, label: string) {
  const normId = id.toLowerCase()
  const normLabel = label.toLowerCase()
  if (normId.includes("must") || normLabel.includes("must")) {
    return {
      Icon: CircleCheck,
      iconClass: "text-success",
      labelText: "Must have criteria",
    }
  }
  if (normId.includes("preferred") || normLabel.includes("preferred")) {
    return {
      Icon: Star,
      iconClass: "text-info fill-info/20",
      labelText: "Preferred criteria",
    }
  }
  return {
    Icon: Flag,
    iconClass: "text-destructive fill-destructive/20",
    labelText: "Red flag criteria",
  }
}

export function CriteriaGroupBlock({
  group,
  onSeek,
  mediaType,
}: {
  group: CriteriaGroup
  onSeek?: (sec: number) => void
  mediaType?: "audio" | "video"
}) {
  const { Icon, iconClass, labelText } = getGroupHeaderInfo(group.id, group.label)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={cn("size-4 shrink-0", iconClass)} />
          <span className="text-xs font-bold uppercase tracking-wide text-foreground">
            {labelText}
          </span>
        </div>
        <div className="h-px bg-border flex-1 ml-3" />
      </div>
      <div className="flex flex-col gap-3">
        {group.items.map((c) => (
          <CriterionRow key={c.id} item={c} onSeek={onSeek} mediaType={mediaType} />
        ))}
      </div>
    </div>
  )
}

function CriterionRow({
  item,
  onSeek,
  mediaType = "audio",
}: {
  item: CriterionScore
  onSeek?: (sec: number) => void
  mediaType?: "audio" | "video"
}) {
  const isHigh = item.score >= 7
  const isMid = item.score >= 4 && item.score < 7
  const hasTimestamp = typeof item.atSecond === "number"

  return (
    <div className="rounded-card-nested border border-border bg-card overflow-hidden">
      {/* Card Header */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b border-border px-3 py-2 text-xs font-semibold",
          isHigh
            ? "bg-success/5"
            : isMid
              ? "bg-warning/5"
              : "bg-destructive/5"
        )}
      >
        <span className="text-foreground font-medium">{item.text}</span>
        <span className="shrink-0 text-muted-foreground font-mono">
          {item.score} / 10
        </span>
      </div>

      {/* Card Body */}
      <div className="flex items-center justify-between gap-4 p-3 bg-card">
        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
          {item.reasoning}
        </p>
        <Tooltip>
          <TooltipTrigger
            render={
              <button
                type="button"
                onClick={() => onSeek?.(item.atSecond ?? 0)}
                aria-label={
                  hasTimestamp
                    ? `Jump to ${fmtMmSs(item.atSecond!)} in ${mediaType}`
                    : `Play from start in ${mediaType}`
                }
                className="flex size-6 shrink-0 items-center justify-center rounded-full border border-success/30 bg-success/5 text-success hover:bg-success/15 hover:scale-105 transition-interactive cursor-pointer"
              >
                <Play className="size-2.5 fill-success text-success ml-0.5" />
              </button>
            }
          />
          <TooltipContent side="left">
            {hasTimestamp
              ? `Jump to ${fmtMmSs(item.atSecond!)} in ${mediaType === "video" ? "video" : "audio"}`
              : `Play ${mediaType === "video" ? "video" : "audio"} from start`}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

function CefrDimensionCard({ dimension }: { dimension: CefrDimension }) {
  const isMti =
    dimension.label.toLowerCase().includes("mother") ||
    dimension.label.toLowerCase().includes("influence")
  const isHigh = dimension.score >= 7 && !isMti

  return (
    <div
      className={cn(
        "rounded-card-nested border bg-card overflow-hidden",
        isHigh ? "border-border" : "border-warning/30"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b border-border px-3 py-2 text-xs font-semibold",
          isHigh ? "bg-success/5" : "bg-warning/5"
        )}
      >
        <span className="text-foreground font-medium">{dimension.label}</span>
        <span className="shrink-0 text-muted-foreground font-mono">
          {dimension.score} / 10
        </span>
      </div>
      <div className="p-3 bg-card">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {dimension.description}
        </p>
      </div>
    </div>
  )
}

export function CefrBlock({ cefr }: { cefr: CefrAnalysis }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Sub-header row */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-1">
        <span className="flex items-center gap-1.5">
          <span>Directional CEFR Level:</span>
          <Badge variant="info">{cefr.level}</Badge>
        </span>
        <span className="flex items-center gap-1.5">
          <span>Recommended for:</span>
          <Badge variant="success">{cefr.recommendedFor}</Badge>
        </span>
      </div>

      {/* Grid of Dimension Cards */}
      <div className="flex flex-col gap-3">
        {cefr.dimensions.map((d) => (
          <CefrDimensionCard key={d.label} dimension={d} />
        ))}
      </div>

      {/* Areas of Improvement */}
      {cefr.areasOfImprovement.length > 0 && (
        <div className="rounded-card-nested border border-border bg-muted/10 p-3 mt-1">
          <h5 className="text-xs font-bold text-foreground mb-2">Areas of improvement</h5>
          <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
            {cefr.areasOfImprovement.map((a, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

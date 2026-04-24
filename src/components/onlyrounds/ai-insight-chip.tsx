/**
 * AIInsightChip — compact pill used to surface a single AI-detected signal
 * about a candidate interview (e.g. "Notice period not discussed").
 *
 * `tone` controls the colour semantics:
 *   - miss   → destructive (red outline) — the model flagged a gap
 *   - warn   → warning (amber)           — soft caution
 *   - info   → info (sky)                — neutral signal
 *   - ok     → success (green)           — positive confirmation
 *
 * Kept deliberately minimal: Badge with a leading icon. Never use it as
 * a CTA — it's read-only metadata.
 */

import { AlertCircle, CheckCircle2, CircleDot, Info } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type InsightTone = "miss" | "warn" | "info" | "ok"

const ICON: Record<InsightTone, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  miss: AlertCircle,
  warn: CircleDot,
  info: Info,
  ok: CheckCircle2,
}

const CLASS: Record<InsightTone, string> = {
  miss: "border border-destructive/30 bg-transparent text-destructive",
  warn: "border border-warning/30 bg-transparent text-warning",
  info: "border border-info/30 bg-transparent text-info",
  ok:   "border border-success/30 bg-transparent text-success",
}

export function AIInsightChip({
  tone = "miss",
  children,
  className,
}: {
  tone?: InsightTone
  children: React.ReactNode
  className?: string
}) {
  const Icon = ICON[tone]
  return (
    <Badge
      variant="outline"
      className={cn("h-6 rounded-full px-2 text-2xs font-normal", CLASS[tone], className)}
    >
      <Icon className="size-3" />
      {children}
    </Badge>
  )
}

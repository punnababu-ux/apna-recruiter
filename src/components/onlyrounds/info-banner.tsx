/**
 * InfoBanner — horizontal, page-top variant of Alert with an inline CTA slot.
 *
 * This is NOT a new palette. It is a pure layout composition over the
 * existing `<Alert>` primitive and delegates every colour decision to
 * Alert's own variants (`info`, `warning`, `success`, `destructive`).
 *
 * If you need a different tone, add it to Alert — don't add it here.
 */

import {
  AlertTriangle,
  CheckCircle2,
  Info,
  XCircle,
  type LucideIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type BannerVariant = "info" | "warning" | "success" | "destructive"

const ICON: Record<BannerVariant, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
  destructive: XCircle,
}

export function InfoBanner({
  variant = "info",
  icon,
  title,
  description,
  action,
  className,
}: {
  variant?: BannerVariant
  /** Override the default variant icon (e.g. a contextual PhoneOutgoing). */
  icon?: LucideIcon
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  className?: string
}) {
  const Icon = icon ?? ICON[variant]
  return (
    <Alert
      variant={variant}
      className={cn(
        // Override Alert's default `grid` layout for a horizontal strip;
        // keep Alert's variant colours / border / radius intact.
        "flex items-center gap-3 px-4 py-3",
        // Drop the Alert action slot's absolute positioning — we lay the
        // action out inline at the end of the flex row instead.
        "has-data-[slot=alert-action]:pr-4",
        className,
      )}
    >
      <Icon className="size-4 shrink-0" />
      <div className="min-w-0 flex-1">
        <AlertTitle className="text-sm font-medium leading-tight">
          {title}
        </AlertTitle>
        {description ? (
          <AlertDescription className="mt-0.5 text-xs">
            {description}
          </AlertDescription>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Alert>
  )
}

"use client"

import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * MetricCard — a stat/metric summary tile, in two registers.
 *
 * `variant="metric"` (default) is the dashboard reading: bordered, label
 * small and first, value large and bottom, room for an icon and a trend.
 * `variant="stat"` is the marketing reading, lifted out of `trust-bar.tsx`
 * where it was hand-rolled (`rounded-xl bg-muted px-6 py-9`, value first and
 * large, no border, no icon/trend chrome, brightens to `bg-card` on hover).
 * The two didn't share a component before because they don't share a class
 * string — they share only the idea of "one number, one label."
 */

const metricCardVariants = cva("rounded-xl text-left transition-all", {
  variants: {
    variant: {
      // Unchanged from before this had variants — no card-hover-lift here,
      // on purpose: a dashboard grid of these isn't meant to invite a click.
      metric: "border border-border/70 bg-card p-4 shadow-xs",
      // Ported verbatim from trust-bar.tsx, where this was hand-rolled.
      stat: "card-hover-lift flex flex-col gap-2 bg-muted px-6 py-9 hover:bg-card",
    },
  },
  defaultVariants: {
    variant: "metric",
  },
})

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  /** Metric label / header text */
  label: React.ReactNode
  /** Primary metric value display (e.g. "166", "88%", "$4.2k") */
  value: React.ReactNode
  /** Optional icon displayed in top right. `variant="metric"` only. */
  icon?: React.ReactNode
  /** Optional trend or secondary helper text. `variant="metric"` only. */
  trend?: React.ReactNode
  /** Optional variant for trend color ('success' | 'warning' | 'destructive' | 'neutral') */
  trendVariant?: "success" | "warning" | "destructive" | "neutral"
}

const trendVariantMap = {
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  neutral: "text-muted-foreground",
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  (
    { className, variant = "metric", label, value, icon, trend, trendVariant = "neutral", ...props },
    ref
  ) => {
    if (variant === "stat") {
      return (
        <div
          ref={ref}
          className={cn(metricCardVariants({ variant }), className)}
          {...props}
        >
          <p className="text-h3 font-heading font-semibold text-foreground">{value}</p>
          <p className="text-base text-foreground">{label}</p>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(metricCardVariants({ variant }), className)} {...props}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          {icon && (
            <div className="rounded-lg bg-muted/60 p-2 text-foreground [&>svg]:size-4">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <span className="text-2xl font-heading font-bold text-foreground">{value}</span>
          {trend && (
            <span className={cn("text-2xs font-medium", trendVariantMap[trendVariant])}>
              {trend}
            </span>
          )}
        </div>
      </div>
    )
  }
)

MetricCard.displayName = "MetricCard"

export { MetricCard, metricCardVariants }

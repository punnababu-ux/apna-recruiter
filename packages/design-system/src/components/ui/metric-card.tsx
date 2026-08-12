"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * MetricCard — A reusable stat/metric summary card for dashboards and directory headers.
 */
export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Metric label / header text */
  label: React.ReactNode
  /** Primary metric value display (e.g. "166", "88%", "$4.2k") */
  value: React.ReactNode
  /** Optional icon displayed in top right */
  icon?: React.ReactNode
  /** Optional trend or secondary helper text (e.g. "+12% this mo") */
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
  ({ className, label, value, icon, trend, trendVariant = "neutral", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border/70 bg-card p-4 shadow-xs text-left transition-all",
          className
        )}
        {...props}
      >
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

export { MetricCard }

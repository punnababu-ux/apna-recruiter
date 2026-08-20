"use client"

/**
 * OrderSummary — Sticky right-panel for the pricing page.
 *
 * Shows selected job bundle + database add-on, running total,
 * and the "Proceed to checkout" CTA.
 */

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Button, Separator } from "@apna/design-system"
import { cn } from "@/lib/utils"

export interface OrderLine {
  label: string
  sublabel?: string
  price: number
}

interface OrderSummaryProps {
  lines: OrderLine[]
  onClear?: () => void
  onCheckout?: (total: number) => void
  className?: string
}

export function OrderSummary({
  lines,
  onClear,
  onCheckout,
  className,
}: OrderSummaryProps) {
  const total = lines.reduce((sum, l) => sum + l.price, 0)

  return (
    <div
      data-slot="order-summary"
      className={cn(
        "sticky top-4 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Order summary
        </h2>
        {onClear && lines.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-info underline underline-offset-2 hover:opacity-80"
          >
            Clear
          </button>
        )}
      </div>

      <Separator />

      {/* Line items */}
      {lines.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing selected yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {lines.map((line, i) => (
            <li key={i} className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {line.label}
                </p>
                {line.sublabel && (
                  <p className="text-xs text-muted-foreground">{line.sublabel}</p>
                )}
              </div>
              <span className="shrink-0 text-sm font-semibold text-foreground">
                ₹{line.price.toLocaleString("en-IN")}
              </span>
            </li>
          ))}
        </ul>
      )}

      <Separator />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Total</span>
        <span className="text-2xl font-bold text-foreground">
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        className="w-full gap-2 font-semibold"
        disabled={lines.length === 0}
        onClick={() => onCheckout?.(total)}
      >
        Proceed to checkout
        <ArrowRight className="size-4" aria-hidden />
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        GST will be added at checkout
      </p>
    </div>
  )
}

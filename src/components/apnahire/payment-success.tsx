"use client"

/**
 * PaymentSuccess — full-page purchase confirmation.
 *
 * Shown in place of the plan-selection page once a mocked payment succeeds.
 */

import * as React from "react"
import { CheckCircle2 } from "@apna/design-system"
import { Button, Separator } from "@apna/design-system"
import type { CartLine } from "@/components/apnahire/checkout-drawer"
import { inr } from "@/lib/format"

interface PaymentSuccessProps {
  lines: CartLine[]
  total: number
  orderId: string
  onSearchCandidates?: () => void
  onPostJob?: () => void
  /** Set when this payment was the last step of posting a job: the job is
   *  already live, so the screen says so and doesn't ask them to post again
   *  (paid-but-not-posted jobs were a recurring support issue). */
  postedJob?: { title: string; onViewJobs: () => void }
}

export function PaymentSuccess({
  lines,
  total,
  orderId,
  onSearchCandidates,
  onPostJob,
  postedJob,
}: PaymentSuccessProps) {
  const subtotal = lines.reduce((sum, l) => sum + l.price, 0)
  const gst = total - subtotal >= 0 ? total - subtotal : Math.round(subtotal * 0.18)

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-muted px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 shadow-card">
        <CheckCircle2 className="size-14 text-success" aria-hidden />

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-h3 font-heading font-bold text-foreground">
            {postedJob ? "Your job is live" : "Payment successful"}
          </h1>
          {postedJob && (
            <p className="text-sm text-foreground">
              {postedJob.title} is now visible to candidates. Nothing else to do.
            </p>
          )}
          <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>
        </div>

        <div className="w-full rounded-xl border border-border bg-muted/40 p-4">
          <p className="mb-3 text-sm font-semibold text-foreground">Payment details</p>
          <ul className="flex flex-col gap-2">
            {lines.map((line) => (
              <li key={line.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{line.label}</span>
                <span className="font-medium text-foreground">
                  {line.priceLabel ?? inr(line.price)}
                </span>
              </li>
            ))}
          </ul>
          <Separator className="my-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sub total</span>
            <span className="font-medium text-foreground">{inr(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-medium text-foreground">{inr(gst)}</span>
          </div>
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Total (inc tax)</span>
            <span className="text-lg font-bold text-foreground">
              {inr(total)}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="flex-1 font-semibold" onClick={onSearchCandidates}>
            Search candidates
          </Button>
          {postedJob ? (
            <Button variant="success" className="flex-1 font-semibold" onClick={postedJob.onViewJobs}>
              View my jobs
            </Button>
          ) : (
            <Button variant="success" className="flex-1 font-semibold" onClick={onPostJob}>
              Post a job now
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

/**
 * PaymentSuccess — full-page purchase confirmation.
 *
 * Shown in place of the plan-selection page once a mocked payment succeeds,
 * and when a job is posted without paying (credits, a free slot): then it's
 * only "Your job is live" — no order ID, no payment details.
 *
 * PaymentFailed — the same card when the payment doesn't go through: what
 * happened, the order they were paying for, Try again (back to the gateway)
 * and Change method (back to the order summary).
 */

import * as React from "react"
import { Button, Separator } from "@apna/design-system"
import { ValueArt } from "@/components/marketing/value-art"
import type { CartLine } from "@/components/apnahire/checkout-drawer"
import { splitGst } from "@/lib/apnahire/bill"
import { inr } from "@/lib/format"

interface PaymentSuccessProps {
  lines: CartLine[]
  total: number
  orderId: string
  onSearchCandidates?: () => void
  onPostJob?: () => void
  /** Every outcome offers the way back to the dashboard. */
  onDashboard: () => void
  /** Set when this payment was the last step of posting a job: the job is
   *  already live, so the screen says so and doesn't ask them to post again
   *  (paid-but-not-posted jobs were a recurring support issue). */
  postedJob?: { title: string }
  /** Database credits bought (self-checkout): searching is the next step,
   *  not posting a job. */
  boughtDatabase?: boolean
  /** What paid for it when nothing was charged, e.g. "Used 1 Premium job credit". */
  note?: string
  /** PREVIEW (?flow=essential): the Finish setup list, under the title. */
  setup?: React.ReactNode
}

export function PaymentSuccess({
  lines,
  total,
  orderId,
  onSearchCandidates,
  onPostJob,
  onDashboard,
  postedJob,
  boughtDatabase,
  note,
  setup,
}: PaymentSuccessProps) {
  const paid = total > 0

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background bg-gradient-result-success px-4 py-12">
      <div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-card border border-border bg-card p-4 sm:p-6">
        <ValueArt name="success" size="xs" />

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-h3 font-heading font-bold text-foreground">
            {postedJob ? "Your job is live" : "Payment successful"}
          </h1>
          {postedJob && (
            <p className="text-sm text-foreground">
              {postedJob.title} is now visible to candidates.{setup ? "" : " Nothing else to do."}
            </p>
          )}
          {paid ? (
            <p className="text-sm text-muted-foreground">Order ID: {orderId}</p>
          ) : (
            note && <p className="text-sm text-muted-foreground">{note}</p>
          )}
        </div>

        {setup}
        {paid && <OrderDetails lines={lines} total={total} title="Payment details" />}

        {/* One solid primary (the screen's only green), chosen by what was bought:
            job posted → dashboard; database credits → search; job credits or a
            subscription → post a job. "Go to dashboard" is the way out of all
            three (decided 2026-11-11, docs/DECISIONS.md). Phones stack it on top. */}
        <div className="flex w-full flex-col-reverse gap-3 sm:flex-row">
          {postedJob ? (
            <>
              <Button variant="outline" size="lg" className="w-full sm:flex-1" onClick={onSearchCandidates}>
                Search candidates
              </Button>
              <Button size="lg" className="w-full sm:flex-1" onClick={onDashboard}>
                Go to dashboard
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="lg" className="w-full sm:flex-1" onClick={onDashboard}>
                Go to dashboard
              </Button>
              <Button size="lg" className="w-full sm:flex-1" onClick={boughtDatabase ? onSearchCandidates : onPostJob}>
                {boughtDatabase ? "Search candidates" : "Post a job"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function OrderDetails({ lines, total, title }: { lines: CartLine[]; total: number; title: string }) {
  // The charged total is the truth: split it back into sub total + GST, and
  // show whatever came off the line prices (coupon, upgrade credit) as its
  // own row, so the receipt adds up.
  const itemsTotal = lines.reduce((sum, l) => sum + l.price, 0)
  const { subtotal, gst } = splitGst(total)
  const discounts = itemsTotal - subtotal
  return (
    <div className="w-full rounded-card-nested border border-border bg-muted/40 p-3 sm:p-4">
      <p className="mb-3 text-sm font-semibold text-foreground">{title}</p>
      <ul className="flex flex-col gap-2">
        {lines.map((line) => (
          <li key={line.id} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{line.label}</span>
            <span className="font-medium text-foreground">{line.priceLabel ?? inr(line.price)}</span>
          </li>
        ))}
      </ul>
      <Separator className="my-3" />
      {discounts > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Discounts</span>
          <span className="font-medium text-success">−{inr(discounts)}</span>
        </div>
      )}
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
        <span className="text-lg font-bold text-foreground">{inr(total)}</span>
      </div>
    </div>
  )
}

export function PaymentFailed({
  lines,
  total,
  onRetry,
  onChangeMethod,
}: {
  lines: CartLine[]
  total: number
  /** Back to the payment step with the same method. */
  onRetry: () => void
  /** Back to the order summary to pick another method. */
  onChangeMethod: () => void
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background bg-gradient-result-failure px-4 py-12">
      <div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-card border border-border bg-card p-4 sm:p-6">
        <ValueArt name="alert" size="xs" />
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-h3 font-heading font-bold text-foreground">Payment failed</h1>
          <p className="text-sm text-muted-foreground">
            No money was taken. If any was debited, we refund it in 5–7 days.
          </p>
        </div>
        <OrderDetails lines={lines} total={total} title="Order details" />
        {/* "Change method" doesn't fit half a 320px card: stacked on phones,
            Try again (the screen's only green) on top. */}
        <div className="flex w-full flex-col-reverse gap-3 sm:flex-row">
          <Button variant="outline" size="lg" className="w-full sm:flex-1" onClick={onChangeMethod}>
            Change method
          </Button>
          <Button size="lg" className="w-full sm:flex-1" onClick={onRetry}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  )
}

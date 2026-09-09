"use client"

/**
 * PaymentModal — mocked payment-method chooser.
 *
 * UI only: no real payment gateway is wired up. Mirrors the self-checkout
 * prototype's Razorpay-styled chooser with a deliberate "simulate failure"
 * path on Netbanking, purely for demoing the flow end-to-end.
 */

import * as React from "react"
import { Lock } from "@apna/design-system"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  RadioGroup,
  RadioGroupItem,
  Separator,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

export type PaymentMethod = "upi" | "card" | "netbanking"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemLabel: string
  amount: number
  onSuccess: () => void
  onFailure: () => void
}

export function PaymentModal({
  open,
  onOpenChange,
  itemLabel,
  amount,
  onSuccess,
  onFailure,
}: PaymentModalProps) {
  const [method, setMethod] = React.useState<PaymentMethod>("upi")
  const [processing, setProcessing] = React.useState<"success" | "failure" | null>(null)

  React.useEffect(() => {
    if (open) {
      setMethod("upi")
      setProcessing(null)
    }
  }, [open])

  const runMockPayment = (outcome: "success" | "failure") => {
    setProcessing(outcome)
    window.setTimeout(() => {
      if (outcome === "success") onSuccess()
      else onFailure()
    }, 900)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-base">
            <span>apnaHire — {itemLabel}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-1 py-2">
          <span className="text-xs text-muted-foreground">Amount payable</span>
          <span className="text-3xl font-bold text-foreground">
            ₹{amount.toLocaleString("en-IN")}
          </span>
        </div>

        <Separator />

        <p className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
          Payment options (demo simulation)
        </p>

        <RadioGroup value={method} onValueChange={(v) => setMethod(v as PaymentMethod)} className="gap-2">
          {[
            { id: "upi" as const, label: "UPI / QR", tag: "Instant", tagVariant: "success" as const, sub: "Google Pay, PhonePe, Paytm, BHIM" },
            { id: "card" as const, label: "Credit / Debit Card", sub: "Visa, Mastercard, RuPay" },
            { id: "netbanking" as const, label: "Netbanking", tag: "Simulates failure", tagVariant: "destructive" as const, sub: "HDFC, ICICI, SBI, Axis Bank" },
          ].map((option) => (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                method === option.id ? "border-primary bg-accent" : "border-border hover:bg-muted/50"
              )}
            >
              <RadioGroupItem value={option.id} />
              <div className="flex-1">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {option.label}
                  {option.tag && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-2xs font-semibold",
                        option.tagVariant === "destructive"
                          ? "bg-destructive-subtle text-destructive-subtle-fg"
                          : "bg-success-subtle text-success-subtle-fg"
                      )}
                    >
                      {option.tag}
                    </span>
                  )}
                </span>
                <p className="text-2xs text-muted-foreground">{option.sub}</p>
              </div>
            </label>
          ))}
        </RadioGroup>

        <div className="mt-2 flex flex-col gap-2">
          {method === "netbanking" ? (
            <Button
              variant="destructive"
              size="lg"
              className="w-full font-semibold"
              disabled={processing !== null}
              onClick={() => runMockPayment("failure")}
            >
              {processing === "failure" ? "Processing…" : `Pay with Netbanking (Simulate failure)`}
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full font-semibold"
              disabled={processing !== null}
              onClick={() => runMockPayment("success")}
            >
              {processing === "success" ? "Processing…" : `Pay ₹${amount.toLocaleString("en-IN")}`}
            </Button>
          )}
          <p className="flex items-center justify-center gap-1.5 text-2xs text-muted-foreground">
            <Lock className="size-3" aria-hidden />
            Secured checkout · 256-bit encrypted · 100% safe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import * as React from "react"
import { ShieldCheck, Play, Sparkles, Info } from "lucide-react"
import { Button, Switch, Separator } from "@apna/design-system"
import { cn } from "@/lib/utils"

export interface CheckoutSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  planName?: string
  planPrice?: number
  onProceedToPay?: (finalTotal: number, includesAIAddon: boolean) => void
}

export function CheckoutSummary({
  planName = "Premium job x 1",
  planPrice = 2499,
  onProceedToPay,
  className,
  ...props
}: CheckoutSummaryProps) {
  const [includeAIAddon, setIncludeAIAddon] = React.useState<boolean>(false)
  const aiAddonPrice = 1190
  const aiAddonOldPrice = 1700

  const subtotal = planPrice + (includeAIAddon ? aiAddonPrice : 0)
  const gstTax = Math.round(subtotal * 0.18)
  const total = subtotal + gstTax

  return (
    <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-12", className)} {...props}>
      {/* Left Column: Purchase Summary */}
      <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Purchase summary
          </h2>
          <Separator className="my-4" />

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between font-semibold text-foreground">
              <span>{planName}</span>
              <span>₹{planPrice.toLocaleString()}</span>
            </div>

            {includeAIAddon && (
              <div className="flex items-center justify-between font-semibold text-foreground text-xs text-primary">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />
                  AI Calling Agent Add-on
                </span>
                <span>₹{aiAddonPrice.toLocaleString()}</span>
              </div>
            )}

            <Separator className="my-3 opacity-60" />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Sub total</span>
              <span className="font-semibold text-foreground">₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex items-start justify-between text-xs text-muted-foreground">
              <div className="space-y-1">
                <span>GST Fee (18%)</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="text-2xs font-semibold text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    Add GSTIN number
                  </button>
                  <Info className="size-3 text-muted-foreground/60" />
                </div>
              </div>
              <span className="font-semibold text-foreground">₹{gstTax.toLocaleString()}</span>
            </div>

            <Separator className="my-3 border-t-2 border-border" />

            <div className="flex items-center justify-between">
              <div>
                <span className="font-heading text-base font-bold text-foreground">Total</span>
                <span className="text-2xs text-muted-foreground ml-1">(Inc. tax)</span>
              </div>
              <span className="text-2xl font-extrabold text-foreground">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-2xs text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
          We protect fair use and privacy; policy violations or fraud may lead to account suspension
          and loss of service fees. By subscribing, you authorize Apna Incorporated to charge you.
        </p>
      </div>

      {/* Right Column: Add-ons & Pay CTA */}
      <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">
            Select Add-on
          </h2>
          <Separator className="my-4" />

          {/* AI Calling Agent Card */}
          <div
            className={cn(
              "rounded-xl border p-4 transition-all",
              includeAIAddon
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-border bg-muted/20"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-foreground">
                    AI Calling Agent
                  </h3>
                </div>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-xs text-muted-foreground line-through">
                  ₹{aiAddonOldPrice.toLocaleString()}
                </span>
                <span className="text-base font-bold text-foreground">
                  ₹{aiAddonPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Instantly calls & screens applicants to find top candidates automatically.
            </p>

            <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/40">
              {/* Listen Demo Pill */}
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-2xs font-semibold text-foreground shadow-2xs">
                <span>Listen to demo</span>
                <div className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Play className="size-2.5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Switch Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-2xs font-medium text-muted-foreground">
                  {includeAIAddon ? "Added" : "Add"}
                </span>
                <Switch
                  checked={includeAIAddon}
                  onCheckedChange={(checked) => setIncludeAIAddon(checked)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground font-medium">
            <ShieldCheck className="size-4 text-success" />
            100% safe and secure checkout
          </div>

          <Button
            variant="default"
            size="lg"
            className="w-full font-bold text-sm shadow-md"
            onClick={() => onProceedToPay?.(total, includeAIAddon)}
          >
            Proceed to pay ₹{total.toLocaleString()}
          </Button>
        </div>
      </div>
    </div>
  )
}

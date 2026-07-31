import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button, Badge } from "@apna/design-system"
import { Check, Sparkles, Building, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export interface QuantityUpsellOption {
  quantity: number
  discountPercent?: number
  oldPrice?: number
  price: number
}

export interface QuantityUpsellModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  planTitle: string
  basePrice: number
  onProceed: (selectedQuantity: number, totalPrice: number) => void
}

export function QuantityUpsellModal({
  open,
  onOpenChange,
  planTitle,
  basePrice,
  onProceed,
}: QuantityUpsellModalProps) {
  const [selectedQty, setSelectedQty] = React.useState<number>(1)

  const options: QuantityUpsellOption[] = [
    {
      quantity: 1,
      price: basePrice,
    },
    {
      quantity: 4,
      discountPercent: 10,
      oldPrice: basePrice * 4,
      price: Math.round(basePrice * 4 * 0.9),
    },
    {
      quantity: 8,
      discountPercent: 20,
      oldPrice: basePrice * 8,
      price: Math.round(basePrice * 8 * 0.8),
    },
  ]

  const selectedOption = options.find((o) => o.quantity === selectedQty) || options[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-bold text-foreground">
            Buy more, <span className="text-primary font-extrabold">save</span> more
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Select bulk job postings to unlock instant package savings.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt.quantity}
              type="button"
              onClick={() => setSelectedQty(opt.quantity)}
              className={cn(
                "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                selectedQty === opt.quantity
                  ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                  : "border-border bg-card hover:border-border/80"
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    {opt.quantity} {planTitle} {opt.quantity === 1 ? "Job" : "Jobs"}
                  </span>
                  {opt.discountPercent && (
                    <Badge variant="success" className="text-2xs font-bold">
                      Save {opt.discountPercent}%
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-baseline gap-1.5">
                {opt.oldPrice && (
                  <span className="text-xs font-medium text-muted-foreground line-through">
                    ₹{opt.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-base font-extrabold text-foreground">
                  ₹{opt.price.toLocaleString()}
                </span>
              </div>
            </button>
          ))}
        </div>

        <Button
          variant="default"
          className="w-full font-semibold"
          onClick={() => onProceed(selectedQty, selectedOption.price)}
        >
          Proceed to pay ₹{selectedOption.price.toLocaleString()}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export interface CrossSellModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  singlePlanTitle: string
  singlePlanPrice: number
  onContinueSingle: () => void
  onSwitchUnlimited: () => void
}

export function CrossSellModal({
  open,
  onOpenChange,
  singlePlanTitle,
  singlePlanPrice,
  onContinueSingle,
  onSwitchUnlimited,
}: CrossSellModalProps) {
  const monthlyPrice = 2499
  const diffPrice = Math.max(0, monthlyPrice - singlePlanPrice)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-6">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg font-bold text-foreground">
            Get 30-day unlimited hiring for just{" "}
            <span className="text-primary font-extrabold">₹{diffPrice.toLocaleString()}</span> more
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Upgrade your single job posting to apna Unlimited for maximum applicant reach.
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Single Job Posting side */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-5">
            <div>
              <span className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">
                Single Job Posting
              </span>
              <h4 className="font-heading text-base font-bold text-foreground mt-1">
                {singlePlanTitle}
              </h4>
              <div className="my-2 text-2xl font-bold text-foreground">
                ₹{singlePlanPrice.toLocaleString()}*
              </div>
              <ul className="my-4 flex flex-col gap-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" />
                  Active for 15 days
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-success" />
                  Standard visibility
                </li>
              </ul>
            </div>
            <Button variant="outline" className="w-full text-xs font-semibold" onClick={onContinueSingle}>
              Continue with {singlePlanTitle.toLowerCase()}
            </Button>
          </div>

          {/* Monthly Unlimited side */}
          <div className="flex flex-col justify-between rounded-xl border border-primary bg-primary/10 p-5 ring-1 ring-primary/20">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xs font-semibold text-primary uppercase tracking-wider">
                  apna Unlimited
                </span>
                <Badge variant="default" className="text-2xs font-bold">
                  Recommended
                </Badge>
              </div>
              <h4 className="font-heading text-base font-bold text-foreground mt-1">
                Monthly Plan
              </h4>
              <div className="my-2 text-2xl font-bold text-foreground">
                ₹{monthlyPrice.toLocaleString()}*
                <span className="text-xs font-normal text-muted-foreground ml-1">/month</span>
              </div>
              <ul className="my-4 flex flex-col gap-2 text-xs text-foreground font-medium">
                <li className="flex items-center gap-2">
                  <Building className="size-3.5 text-primary" />1 Active job slot (30 days)
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="size-3.5 text-primary" />
                  Unlimited free reposts
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-primary" />
                  200 DB unlocks (worth ₹2,000)
                </li>
              </ul>
            </div>
            <Button variant="default" className="w-full text-xs font-semibold shadow-xs" onClick={onSwitchUnlimited}>
              Switch to apna unlimited
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

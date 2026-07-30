import * as React from "react"
import { Check, X, Flame } from "lucide-react"
import { Button } from "@apna/design-system"
import { cn } from "@/lib/utils"

export interface PricingFeature {
  label: string
  included: boolean
  highlightIcon?: "whatsapp" | "flame"
}

export interface PricingPlan {
  id: string
  title: string
  originalPrice: number
  currentPrice: number
  actionLabel: string
  features: PricingFeature[]
}

export interface PricingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlan[]
  oldUserPricingEnabled?: boolean
  onSelectPlan?: (planId: string) => void
}

function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  )
}

export function PricingCards({
  plans,
  oldUserPricingEnabled = false,
  onSelectPlan,
  className,
  ...props
}: PricingCardsProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-muted/20 p-4 sm:p-6",
        className
      )}
      {...props}
    >
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
        <div className="flex size-5 items-center justify-center rounded-full border border-success/30 text-success">
          <span className="text-2xs">1</span>
        </div>
        Single job posting
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="font-heading text-lg font-bold text-foreground mb-3">
              {plan.title}
            </h3>

            <div className="mb-5 flex items-baseline gap-0.5">
              {oldUserPricingEnabled ? (
                <>
                  <span className="text-3xl font-bold text-foreground">
                    ₹{plan.currentPrice.toLocaleString()}*
                  </span>
                  <span className="text-sm font-medium text-muted-foreground line-through">
                    ₹{plan.originalPrice.toLocaleString()}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-muted-foreground line-through">
                    ₹{plan.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-3xl font-bold text-foreground">
                    ₹{plan.currentPrice.toLocaleString()}*
                  </span>
                </>
              )}
            </div>

            <Button
              variant="outline"
              className="w-full justify-center font-semibold mb-6 border-border/80"
              onClick={() => onSelectPlan?.(plan.id)}
            >
              {plan.actionLabel}
            </Button>

            <div className="h-px w-full bg-border/50 mb-6" />

            <ul className="flex flex-col gap-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  {feature.included ? (
                    <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  ) : (
                    <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
                  )}
                  <span
                    className={cn(
                      "text-sm",
                      feature.included
                        ? "font-medium text-foreground"
                        : "text-muted-foreground/70"
                    )}
                  >
                    {feature.label}
                  </span>
                  {feature.highlightIcon === "whatsapp" && (
                    <WhatsappIcon className="mt-0.5 size-4 shrink-0 text-success" />
                  )}
                  {feature.highlightIcon === "flame" && (
                    <Flame className="mt-0.5 size-4 shrink-0 text-destructive" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

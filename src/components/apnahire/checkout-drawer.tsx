"use client"

/**
 * CheckoutDrawer — right-side cart/order-summary drawer.
 *
 * Opens when the user clicks "Buy now" on any plan card. Structure matches
 * the Figma "order summary side card" board (node 863:5722) state-for-state:
 *
 *  - Primary item at MRP with its own itemized discount row beneath it.
 *  - A database-credit upsell card (blue banner + 3 tiers, 380 first) that
 *    is replaced by a plain net-priced line + "Remove" once one is added —
 *    the added add-on does NOT get its own discount row (Figma shows it at
 *    its net price directly).
 *  - Coupon and GSTIN each expand into their own light-gray card with an
 *    inline-action input (green "Apply" / "Save"), never both at once.
 *  - "Sub total" is the post-coupon taxable amount, which is what GST is
 *    charged on — matching the Figma bill maths exactly.
 *
 * Matches source behavior: the backdrop does NOT close the drawer (only the
 * X button does) — outside-press is intercepted and cancelled below.
 */

import * as React from "react"
import { Lock, ChevronRight, Pencil, Tag, Check, X } from "@apna/design-system"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
  Badge,
  Separator,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

export interface CartLine {
  id: string
  label: string
  sublabel?: string
  /** Selling price — what actually gets charged and summed into the total. */
  price: number
  /** Gross/list price. When present, this (not `price`) is the headline
   *  value shown next to the line, with the discount broken out below it. */
  mrp?: number
  discountLabel?: string
  discountAmount?: number
}

export interface DatabaseAddon {
  id: string
  credits: number
  validDays: number
  price: number
  mrp: number
  discountPct: number
}

/** Order matches Figma: the mid tier is surfaced first, not ascending. */
const DATABASE_ADDONS: DatabaseAddon[] = [
  { id: "380", credits: 380, validDays: 90, price: 3649, mrp: 6840, discountPct: 46 },
  { id: "170", credits: 170, validDays: 30, price: 1949, mrp: 3170, discountPct: 38 },
  { id: "900", credits: 900, validDays: 180, price: 7099, mrp: 15750, discountPct: 54 },
]

const MAX_ADDON_DISCOUNT_PCT = Math.max(...DATABASE_ADDONS.map((a) => a.discountPct))

const COUPONS: Record<string, { label: string; discountPct: number; maxDiscount: number }> = {
  STAY20: { label: "STAY20", discountPct: 20, maxDiscount: 300 },
  FIRST20: { label: "FIRST20", discountPct: 20, maxDiscount: 300 },
  WELCOME10: { label: "WELCOME10", discountPct: 10, maxDiscount: 200 },
}

interface CheckoutDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: CartLine | null
  onProceedToPay: (total: number) => void
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`

/** Light-gray expandable card used by both the coupon and GSTIN blocks. */
function EditCard({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-muted p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/25 text-muted-foreground hover:bg-muted-foreground/40"
        >
          <X className="size-3" aria-hidden />
        </button>
      </div>
      {children}
    </div>
  )
}

/** White input with an inline green text action on its right edge. */
function InlineActionInput({
  value,
  onChange,
  placeholder,
  actionLabel,
  onAction,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  actionLabel: string
  onAction: () => void
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="button"
        onClick={onAction}
        disabled={!value.trim()}
        className={cn(
          "shrink-0 text-sm font-semibold",
          value.trim() ? "text-checkout-primary" : "text-muted-foreground"
        )}
      >
        {actionLabel}
      </button>
    </div>
  )
}

/** A single cart line: headline price, plus either an itemized discount row
 *  beneath it or an inline "Remove" link under the price. */
function CartLineRow({ line, onRemove }: { line: CartLine; onRemove?: () => void }) {
  return (
    <li className="flex flex-col gap-1">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-base font-semibold text-foreground">{line.label}</p>
          {line.sublabel && <p className="text-xs text-muted-foreground">{line.sublabel}</p>}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <span className="text-base font-semibold text-foreground">
            {inr(line.mrp ?? line.price)}
          </span>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="text-xs text-foreground underline underline-offset-2 hover:text-destructive"
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {line.discountLabel && (
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-foreground">{line.discountLabel}</span>
          <span className="font-medium text-checkout-discount-fg">
            -{inr(line.discountAmount ?? 0)}
          </span>
        </div>
      )}
    </li>
  )
}

export function CheckoutDrawer({ open, onOpenChange, item, onProceedToPay }: CheckoutDrawerProps) {
  const [addonId, setAddonId] = React.useState<string | null>(null)
  const [couponInput, setCouponInput] = React.useState("")
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null)
  const [gstin, setGstin] = React.useState("")
  const [gstinInput, setGstinInput] = React.useState("")
  // Mutual exclusion: only one of the coupon/GSTIN edit cards is open at a time.
  const [expanded, setExpanded] = React.useState<"coupon" | "gstin" | null>(null)

  React.useEffect(() => {
    if (open) {
      setAddonId(null)
      setCouponInput("")
      setAppliedCoupon(null)
      setGstin("")
      setGstinInput("")
      setExpanded(null)
    }
  }, [open, item?.id])

  if (!item) return null

  const addon = addonId ? DATABASE_ADDONS.find((a) => a.id === addonId) ?? null : null

  // The add-on line carries no discount row of its own — Figma shows it at
  // its net price with just a "Remove" affordance.
  const lines: CartLine[] = [
    item,
    ...(addon
      ? [
          {
            id: `db-${addon.id}`,
            label: `${addon.credits} Database credits`,
            sublabel: `Valid for ${addon.validDays} days`,
            price: addon.price,
          },
        ]
      : []),
  ]

  const itemsTotal = lines.reduce((sum, l) => sum + l.price, 0)
  const coupon = appliedCoupon ? COUPONS[appliedCoupon] : null
  const couponDiscount = coupon
    ? Math.min(Math.round((itemsTotal * coupon.discountPct) / 100), coupon.maxDiscount)
    : 0
  // "Sub total" in the bill is the post-coupon taxable amount (Figma maths).
  const subtotal = itemsTotal - couponDiscount
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  const handleApplyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase()
    if (COUPONS[normalized]) {
      setAppliedCoupon(normalized)
      setExpanded(null)
      setCouponInput("")
    }
  }

  const handleApplyGstin = () => {
    if (gstinInput.trim()) {
      setGstin(gstinInput.trim().toUpperCase())
      setExpanded(null)
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(next, eventDetails) => {
        // Source: clicking the backdrop must NOT close the drawer — only the
        // explicit close (X) button does.
        if (!next && eventDetails.reason === "outside-press") {
          eventDetails.cancel()
          return
        }
        onOpenChange(next)
      }}
    >
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Order summary</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Selected item(s) */}
          <ul className="flex flex-col gap-4">
            {lines.map((line) => (
              <CartLineRow
                key={line.id}
                line={line}
                onRemove={line.id === `db-${addon?.id}` ? () => setAddonId(null) : undefined}
              />
            ))}
          </ul>

          {/* Database add-on upsell — only until one is added */}
          {!addon && (
            <div className="flex flex-col overflow-hidden rounded-xl border border-info">
              <div className="bg-info py-1.5 text-center">
                <span className="text-xs font-bold uppercase tracking-wide text-info-foreground">
                  Take {MAX_ADDON_DISCOUNT_PCT}% off database
                </span>
              </div>
              <ul className="flex flex-col divide-y divide-border bg-muted">
                {DATABASE_ADDONS.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {a.credits} database credits
                      </p>
                      <p className="text-xs text-muted-foreground">Valid for {a.validDays} days</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground line-through">
                          {inr(a.mrp)}
                        </span>
                        <span className="text-base font-semibold text-foreground">
                          {inr(a.price)}
                        </span>
                        <Badge className="border-transparent bg-checkout-discount-bg text-2xs font-semibold text-checkout-discount-fg">
                          {a.discountPct}% OFF
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 font-semibold"
                      onClick={() => setAddonId(a.id)}
                    >
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coupon — dashed trigger, its own edit card, or the applied row */}
          {appliedCoupon ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-foreground">Coupon discount ({appliedCoupon})</span>
                <span className="font-medium text-checkout-discount-fg">
                  -{inr(couponDiscount)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-checkout-discount-fg">
                  <span className="flex size-4 items-center justify-center rounded-full bg-checkout-discount-fg text-white">
                    <Check className="size-2.5" aria-hidden />
                  </span>
                  Applied
                </span>
                <button
                  type="button"
                  onClick={() => setAppliedCoupon(null)}
                  className="text-xs text-foreground underline underline-offset-2 hover:text-destructive"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : expanded === "coupon" ? (
            <EditCard title="Apply coupon" onClose={() => setExpanded(null)}>
              <InlineActionInput
                value={couponInput}
                onChange={setCouponInput}
                placeholder="Enter coupon code"
                actionLabel="Apply"
                onAction={() => handleApplyCoupon(couponInput)}
              />
              {Object.values(COUPONS).map((c) => (
                <div
                  key={c.label}
                  className="flex items-center justify-between gap-3 rounded-lg bg-card p-3"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <Tag className="size-4 text-checkout-primary" aria-hidden />
                      {c.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Get {c.discountPct}% off up to{" "}
                      <span className="font-semibold text-foreground">{inr(c.maxDiscount)}</span> on
                      this purchase
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon(c.label)}
                    className="shrink-0 text-sm font-semibold text-checkout-primary"
                  >
                    Apply
                  </button>
                </div>
              ))}
            </EditCard>
          ) : (
            <button
              type="button"
              onClick={() => setExpanded("coupon")}
              className="flex items-center justify-between rounded-xl border border-dashed border-border bg-muted/60 px-4 py-3"
            >
              <span className="flex items-center gap-2 text-sm">
                <Tag className="size-4 text-muted-foreground" aria-hidden />
                <span className="font-semibold text-foreground">Apply Coupons</span>
                <span className="text-muted-foreground">• {Object.keys(COUPONS).length} offers</span>
              </span>
              <ChevronRight className="size-4 text-checkout-primary" aria-hidden />
            </button>
          )}

          {/* Bill details — pinned to the bottom of the scroll area */}
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <Separator />
            <p className="text-sm font-semibold text-foreground">Bill details</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">Sub total</span>
              <span className="font-semibold text-foreground">{inr(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">GST (18%)</span>
              <span className="text-foreground">{inr(gst)}</span>
            </div>

            {expanded === "gstin" ? (
              <EditCard title="Add GSTIN number" onClose={() => setExpanded(null)}>
                <InlineActionInput
                  value={gstinInput}
                  onChange={(v) => setGstinInput(v.toUpperCase())}
                  placeholder="Enter GSTIN"
                  actionLabel="Save"
                  onAction={handleApplyGstin}
                />
              </EditCard>
            ) : gstin ? (
              <div className="flex items-center gap-1.5 text-sm text-foreground">
                GSTIN: {gstin}
                <button
                  type="button"
                  onClick={() => {
                    setGstinInput(gstin)
                    setExpanded("gstin")
                  }}
                  aria-label="Edit GSTIN"
                >
                  <Pencil className="size-3.5 text-muted-foreground" aria-hidden />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded("gstin")}
                className="self-start text-sm font-medium text-info underline underline-offset-2"
              >
                Add GSTIN number
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-base text-foreground">
              Total <span className="text-xs text-muted-foreground">(Inc tax)</span>
            </span>
            <span className="text-2xl font-bold text-foreground">{inr(total)}</span>
          </div>
          <Button
            size="lg"
            className="w-full border-transparent bg-checkout-primary font-semibold text-checkout-primary-foreground hover:bg-checkout-primary-hover"
            onClick={() => onProceedToPay(total)}
          >
            Proceed to pay {inr(total)}
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5" aria-hidden />
            100% safe and secure checkout
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}

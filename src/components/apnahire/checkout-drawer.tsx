"use client"

/**
 * CheckoutDrawer — right-side cart/order-summary drawer.
 *
 * Opens when the user clicks "Buy now" on any plan card. Shows the selected
 * item(s) — each priced at MRP with its own itemized discount row below it
 * (never a strikethrough), a database-credit add-on upsell card, a coupon
 * code block and a GSTIN block (each independently expandable, but only one
 * open for editing at a time), a GST-inclusive bill breakdown, and the
 * "Proceed to pay" CTA.
 *
 * Matches source behavior: the backdrop does NOT close the drawer (only the
 * X button does) — outside-press is intercepted and cancelled below.
 */

import * as React from "react"
import { Lock, ChevronDown, Pencil, Tag } from "@apna/design-system"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
  Separator,
  Input,
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

const DATABASE_ADDONS: DatabaseAddon[] = [
  { id: "170", credits: 170, validDays: 30, price: 1949, mrp: 3170, discountPct: 38 },
  { id: "380", credits: 380, validDays: 90, price: 3649, mrp: 6840, discountPct: 38 },
  { id: "900", credits: 900, validDays: 180, price: 7099, mrp: 15750, discountPct: 54 },
]

const MAX_ADDON_DISCOUNT_PCT = Math.max(...DATABASE_ADDONS.map((a) => a.discountPct))

const COUPONS: Record<string, { label: string; discountPct: number; maxDiscount: number }> = {
  STAY20: { label: "STAY20", discountPct: 20, maxDiscount: 300 },
  FIRST20: { label: "FIRST20", discountPct: 20, maxDiscount: 300 },
}

interface CheckoutDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: CartLine | null
  onProceedToPay: (total: number) => void
}

/** A single cart line: headline price (MRP if present, else price), plus an
 *  optional itemized discount row directly beneath it — used identically
 *  for the primary item, the DB add-on, and (via its own markup) the coupon. */
function CartLineRow({ line }: { line: CartLine }) {
  return (
    <li className="flex flex-col gap-1">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-foreground">{line.label}</p>
          {line.sublabel && <p className="text-xs text-muted-foreground">{line.sublabel}</p>}
        </div>
        <span className="shrink-0 text-sm font-semibold text-foreground">
          ₹{(line.mrp ?? line.price).toLocaleString("en-IN")}
        </span>
      </div>
      {line.discountLabel && (
        <div className="flex items-center justify-between gap-2 text-xs font-medium text-checkout-discount-fg">
          <span>{line.discountLabel}</span>
          <span>-₹{line.discountAmount?.toLocaleString("en-IN")}</span>
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

  const lines: CartLine[] = [
    item,
    ...(addon
      ? [
          {
            id: `db-${addon.id}`,
            label: `${addon.credits} Database credits`,
            sublabel: `Valid for ${addon.validDays} days`,
            price: addon.price,
            mrp: addon.mrp,
            discountLabel: `Database add-on discount (${addon.discountPct}% OFF)`,
            discountAmount: addon.mrp - addon.price,
          },
        ]
      : []),
  ]

  const subtotal = lines.reduce((sum, l) => sum + l.price, 0)
  const coupon = appliedCoupon ? COUPONS[appliedCoupon] : null
  const couponDiscount = coupon ? Math.min(Math.round((subtotal * coupon.discountPct) / 100), coupon.maxDiscount) : 0
  const taxableAmount = subtotal - couponDiscount
  const gst = Math.round(taxableAmount * 0.18)
  const total = taxableAmount + gst

  const handleApplyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase()
    if (COUPONS[normalized]) {
      setAppliedCoupon(normalized)
      setExpanded(null)
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

        <div className="flex flex-1 flex-col gap-5 p-4">
          {/* Selected item(s) — each priced at MRP with its own discount row */}
          <ul className="flex flex-col gap-3">
            {lines.map((line) => (
              <CartLineRow key={line.id} line={line} />
            ))}
          </ul>

          {/* Database add-on upsell — bordered card with a solid banner strip */}
          {!addon && (
            <div className="flex flex-col overflow-hidden rounded-xl border border-info">
              <div className="flex items-center justify-center gap-1.5 bg-info py-1.5">
                <Tag className="size-3.5 text-info-foreground" aria-hidden />
                <span className="text-2xs font-semibold uppercase tracking-wide text-info-foreground">
                  Take {MAX_ADDON_DISCOUNT_PCT}% off database
                </span>
              </div>
              <ul className="flex flex-col gap-2 p-3">
                {DATABASE_ADDONS.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {a.credits} database credits
                      </p>
                      <p className="text-2xs text-muted-foreground">
                        Valid for {a.validDays} days · ₹{a.price.toLocaleString("en-IN")}{" "}
                        <span className="line-through">₹{a.mrp.toLocaleString("en-IN")}</span>
                      </p>
                    </div>
                    <Button size="xs" variant="outline" onClick={() => setAddonId(a.id)}>
                      Add
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {addon && (
            <button
              type="button"
              onClick={() => setAddonId(null)}
              className="self-start text-xs font-medium text-destructive underline underline-offset-2"
            >
              Remove database add-on
            </button>
          )}

          <Separator />

          {/* Coupon — dashed trigger that expands into its own edit card */}
          <div className="flex flex-col gap-2">
            {!appliedCoupon ? (
              <>
                <button
                  type="button"
                  onClick={() => setExpanded((e) => (e === "coupon" ? null : "coupon"))}
                  className="flex items-center justify-between rounded-lg border border-dashed border-border px-3 py-2 text-sm font-medium text-foreground"
                >
                  <span className="flex items-center gap-1.5">
                    <Tag className="size-4 text-muted-foreground" aria-hidden />
                    Apply Coupons · {Object.keys(COUPONS).length} offers
                  </span>
                  <ChevronDown
                    className={cn("size-4 transition-transform", expanded === "coupon" && "rotate-180")}
                    aria-hidden
                  />
                </button>
                {expanded === "coupon" && (
                  <div className="flex flex-col gap-2 rounded-lg bg-muted/40 p-3">
                    <div className="flex gap-2">
                      <Input
                        inputSize="sm"
                        placeholder="Enter coupon code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" variant="outline" onClick={() => handleApplyCoupon(couponInput)}>
                        Apply
                      </Button>
                    </div>
                    {Object.values(COUPONS).map((c) => (
                      <div
                        key={c.label}
                        className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2"
                      >
                        <span className="text-xs font-medium text-foreground">
                          {c.label} — {c.discountPct}% off up to ₹{c.maxDiscount}
                        </span>
                        <Button size="xs" variant="outline" onClick={() => handleApplyCoupon(c.label)}>
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-between text-xs font-medium text-checkout-discount-fg">
                <span>Coupon discount ({appliedCoupon})</span>
                <span className="flex items-center gap-2">
                  -₹{couponDiscount.toLocaleString("en-IN")}
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-destructive underline underline-offset-2"
                  >
                    Remove
                  </button>
                </span>
              </div>
            )}
          </div>

          <Separator />

          {/* Bill details */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">Bill details</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sub total</span>
              <span className="font-medium text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="text-muted-foreground">GST Fee (18%)</span>
                {!gstin ? (
                  <button
                    type="button"
                    onClick={() => setExpanded((e) => (e === "gstin" ? null : "gstin"))}
                    className="text-2xs font-medium text-info underline underline-offset-2"
                  >
                    Add GSTIN number
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-2xs font-medium text-foreground">
                    GSTIN: <strong>{gstin}</strong>
                    <button
                      type="button"
                      onClick={() => {
                        setGstinInput(gstin)
                        setExpanded("gstin")
                      }}
                      aria-label="Edit GSTIN"
                    >
                      <Pencil className="size-3" aria-hidden />
                    </button>
                  </span>
                )}
                {expanded === "gstin" && (
                  <div className="mt-1 flex w-56 gap-1.5">
                    <Input
                      inputSize="sm"
                      placeholder="e.g. 29AAAAA0000A1Z5"
                      value={gstinInput}
                      onChange={(e) => setGstinInput(e.target.value.toUpperCase())}
                      className="flex-1"
                    />
                    <Button size="sm" variant="outline" onClick={handleApplyGstin}>
                      Apply
                    </Button>
                  </div>
                )}
              </div>
              <span className="font-medium text-foreground">₹{gst.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Total <span className="text-xs text-muted-foreground">(Inc tax)</span>
            </span>
            <span className="text-2xl font-bold text-foreground">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border p-4">
          <Button
            size="lg"
            className="w-full border-transparent bg-checkout-primary font-semibold text-checkout-primary-foreground hover:bg-checkout-primary-hover"
            onClick={() => onProceedToPay(total)}
          >
            Proceed to pay ₹{total.toLocaleString("en-IN")}
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

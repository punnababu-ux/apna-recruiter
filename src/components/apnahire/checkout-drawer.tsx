"use client"

/**
 * CheckoutDrawer — right-side order-summary drawer for credit purchases.
 *
 * Rebuilt from Figma file `92gU18d45olE04ATyhhVHD`, board `1214:17714`
 * ("New & Other_checkout_cases"), frames `1214:18759` … `1236:21211`
 * (438 px wide, nine states: db-suggested → db added → coupon
 * expanded/typed/applied → GSTIN empty/typed/saved/edit).
 *
 * Structure:
 *  - The drawer is a muted canvas holding stacked white sections with a
 *    12 px gap, rounded on its left edge.
 *  - Line items show the list price struck through *inline* next to the net
 *    price. There is no per-item discount row. "Remove" sits on the add-on
 *    line's subtitle row.
 *  - One "Complete your hiring needs" upsell card with 50/100/200 pack chips
 *    (100 preselected) and a green "Add" pill — shown only for job-credit
 *    purchases with no add-on yet.
 *  - The coupon block takes exactly one of three shapes: a white trigger row,
 *    a bordered (shadowless) expanded panel, or a compact "saved with" row.
 *    The `Coupon discount (CODE) −₹300` figure lives in Bill details.
 *  - Bill details carries Item total (with the struck MRP total), the coupon
 *    row, Sub total, GST and the GSTIN slot (link → gray inset card → saved
 *    row → "Edit GSTIN number" card).
 *  - "Sub total" is the post-coupon taxable amount, which is what GST is
 *    charged on — this reconciles against every drawn frame.
 *
 * The previous implementation was built from board `863:5722`, which sits
 * under the canvas label "Dont refer" (`1236:24415`) and is deprecated. Its
 * blue "Take N% off database" banner, 380/170/900 tier list and per-item
 * "Job plan discount" rows exist nowhere on `1214:17714` and are gone.
 *
 * Matches source behavior: the backdrop does NOT close the drawer (only the
 * X button does) — outside-press is intercepted and cancelled below.
 *
 * Subscription (Unlimited monthly/quarterly) purchases are drawn in Figma as
 * a separate 536 px component with a payment-method step. That is not built
 * here; the sections below are kept independent so a `variant` prop can be
 * layered on without restructuring.
 */

import * as React from "react"
import {
  Ban,
  Check,
  ChevronRight,
  CircleCheck,
  CreditCard,
  Lock,
  Mail,
  Pencil,
  RefreshCw,
  Smartphone,
  Sparkles,
  Tag,
  X,
  XCircle,
  type IconComponent,
} from "@apna/design-system"
import {
  Badge,
  Button,
  ChipTabs,
  Input,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@apna/design-system"
import { cn } from "@/lib/utils"

export interface CartLine {
  id: string
  label: string
  sublabel?: string
  /** Selling price — what actually gets charged and summed into the total. */
  price: number
  /** List price. Rendered struck-through immediately before `price` when it
   *  is greater than `price` (Figma hides the strike otherwise). */
  mrp?: number
  /** Subscription purchases only. Setting this switches the drawer to the
   *  recurring variant: no add-on upsell, a payment-method step, and an
   *  auto-renew disclosure. The value is the plan's own billing period in
   *  days, which is what the renewal date is computed from. */
  renewAfterDays?: number
  /** @deprecated Board `1214:17714` has no per-item discount row; these are
   *  no longer rendered. Kept on the type only so `self-checkout.tsx` keeps
   *  compiling until its own change (spec #21) lands and stops setting them. */
  discountLabel?: string
  /** @deprecated See `discountLabel`. */
  discountAmount?: number
}

/**
 * A database-credit pack offered in the upsell.
 *
 * Only the 100-credit pack is priced in Figma (`1236:20936`/`20937`/`20938`) —
 * `50` and `200` appear there as bare chip labels with no price, MRP, discount
 * or validity. Those two are priced here at the 100 pack's own ₹10/credit
 * rate, a decision taken by the design owner (2026-09-27) rather than read off
 * the board, so that all three chips are selectable. It keeps the discount
 * uniform: 80/580, 160/1160 and 320/2320 all round to 14%.
 *
 * Note this flat rate is deliberately NOT the volume tiering used by the
 * Database-credits tab, where the per-credit price falls as the bundle grows
 * (₹11.5 → ₹9.6 → ₹7.9). Revisit if these packs ever need to match it.
 */
export interface DatabasePack {
  credits: number
  validDays: number
  price: number
  mrp: number
  discountPct: number
}

const DATABASE_PACKS: DatabasePack[] = [
  { credits: 50, validDays: 90, price: 500, mrp: 580, discountPct: 14 },
  { credits: 100, validDays: 90, price: 1000, mrp: 1160, discountPct: 14 },
  { credits: 200, validDays: 90, price: 2000, mrp: 2320, discountPct: 14 },
]

/** Figma puts the check on the 100 chip in all 13 chip instances. */
const DEFAULT_PACK = "100"

/**
 * The two tiles in the subscription footer's payment step.
 *
 * Figma pairs each with brand marks (GPay/Paytm/PhonePe on the UPI tile;
 * Visa/Mastercard/Amex/RuPay on the card tile) and a bespoke `upi_pay` glyph.
 * Those are brand artwork with no design-system equivalent and no asset in
 * this repo, so they are omitted rather than substituted — see the spec's
 * Icons table.
 */
const SUBSCRIPTION_PAYMENT_METHODS = [
  { value: "upi-autopay", label: "UPI Autopay", icon: Smartphone },
  { value: "card", label: "Card (Credit/Debit)", icon: CreditCard },
] as const satisfies readonly {
  value: SubscriptionPaymentMethod
  label: string
  icon: IconComponent
}[]

const SUBSCRIPTION_TRUST_ITEMS = [
  { label: "Auto-renew", icon: RefreshCw },
  { label: "Renewal reminder", icon: Mail },
  { label: "Stop or cancel anytime", icon: Ban },
] as const satisfies readonly { label: string; icon: IconComponent }[]

/** `STAY20` is the only coupon rendered anywhere on the board. `WELCOME10`
 *  does not exist in the file; `FIRST20` survives only as a stale layer name
 *  whose rendered text is `STAY20`. */
const COUPONS: Record<string, { label: string; discountPct: number; maxDiscount: number }> = {
  STAY20: { label: "STAY20", discountPct: 20, maxDiscount: 300 },
}

/** Figma's trigger row reads "3 offers" in all three instances, including on
 *  the out-of-scope Quarterly frame — i.e. it is a shared component string,
 *  not a per-cart count, and it contradicts the single-card list. Kept
 *  verbatim pending a PM decision; flip to `Object.keys(COUPONS).length`
 *  once the other two offers exist. */
const COUPON_OFFER_COUNT = 3

/** Only the two methods that can carry a recurring mandate are offered — the
 *  one-time flow's Netbanking option cannot. */
export type SubscriptionPaymentMethod = "upi-autopay" | "card"

interface CheckoutDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: CartLine | null
  /** `lines` is the full cart (primary item + any add-on bought inside the
   *  drawer). `paymentMethod` is set only for subscriptions, where the choice
   *  is made here rather than in the payment step — Razorpay needs it up front
   *  to create the recurring mandate. */
  onProceedToPay: (
    total: number,
    lines: CartLine[],
    paymentMethod?: SubscriptionPaymentMethod
  ) => void
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`

/** "1 April 2026" — the format the disclosure is drawn in. */
const renewalDateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

/**
 * Figma hard-codes "1 April 2026", an example date that has already passed, so
 * the renewal date is computed instead. Days, not calendar months: the board
 * cannot distinguish the two (1 Jan + 90 days and 1 Jan + 3 months both land on
 * 1 April) and every other validity in this product is expressed in days.
 */
function renewalDateFrom(days: number) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return renewalDateFormat.format(d)
}

/**
 * Figma only ever draws the Quarterly plan — "Monthly" appears nowhere on the
 * board — so the monthly suffix is derived rather than sourced.
 */
function periodLabelFor(days: number) {
  return days >= 90 ? "/quarter" : "/month"
}

/**
 * Bordered field with an inline text action on its right edge (green when
 * actionable, muted when not). The DS `Input` supplies the placeholder token,
 * disabled handling and the 40 px height; the wrapper owns the border so the
 * action can sit inside it. Figma draws no focus ring, but dropping focus
 * affordance entirely is not acceptable, so the wrapper takes `focus-within`.
 */
function InlineActionInput({
  value,
  onChange,
  placeholder,
  actionLabel,
  onAction,
  maxLength,
  inputMode,
  "aria-label": ariaLabel,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  actionLabel: string
  onAction: () => void
  maxLength?: number
  inputMode?: React.ComponentProps<"input">["inputMode"]
  "aria-label": string
}) {
  const enabled = value.trim().length > 0
  return (
    <div className="flex h-10 items-center gap-2.5 rounded-xl border border-border bg-card pl-2.5 focus-within:border-ring">
      <Input
        value={value}
        aria-label={ariaLabel}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && enabled) {
            e.preventDefault()
            onAction()
          }
        }}
        placeholder={placeholder}
        className="h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent px-0 py-0 text-foreground caret-checkout-primary focus-visible:ring-0"
      />
      <button
        type="button"
        onClick={onAction}
        disabled={!enabled}
        className={cn(
          "shrink-0 self-stretch px-4 text-sm font-semibold",
          enabled ? "text-checkout-primary" : "text-muted-foreground"
        )}
      >
        {actionLabel}
      </button>
    </div>
  )
}

/** Gray inset card used by the GSTIN add/edit states. */
function GstinCard({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted px-4 py-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-base font-semibold text-foreground">{title}</p>
        <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label={`Close ${title}`}>
          {/* Material's `cancel` is a filled disc with a knocked-out X;
              lucide's is an outline, so it is filled against the card. */}
          <XCircle className="size-6 fill-muted-foreground text-card" aria-hidden />
        </Button>
      </div>
      {children}
    </div>
  )
}

/** A single cart line: title + inline struck MRP and net price, then the
 *  subtitle row which for the add-on also carries "Remove". */
function CartLineRow({ line, onRemove }: { line: CartLine; onRemove?: () => void }) {
  return (
    <li className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-base font-semibold text-foreground">{line.label}</p>
        <div className="flex shrink-0 items-center gap-3">
          {line.mrp != null && line.mrp > line.price && (
            <span className="text-sm text-muted-foreground line-through">{inr(line.mrp)}</span>
          )}
          <span className="text-base font-semibold text-foreground">{inr(line.price)}</span>
        </div>
      </div>
      {(line.sublabel || onRemove) && (
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs text-muted-foreground">{line.sublabel}</p>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="shrink-0 text-xs text-foreground underline underline-offset-2"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </li>
  )
}

/** One bill row: label left, value right. */
function BillRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-foreground">{label}</span>
      {children}
    </div>
  )
}

export function CheckoutDrawer({ open, onOpenChange, item, onProceedToPay }: CheckoutDrawerProps) {
  const [packValue, setPackValue] = React.useState(DEFAULT_PACK)
  const [addonCredits, setAddonCredits] = React.useState<number | null>(null)
  const [couponInput, setCouponInput] = React.useState("")
  const [appliedCoupon, setAppliedCoupon] = React.useState<string | null>(null)
  const [gstin, setGstin] = React.useState("")
  const [gstinInput, setGstinInput] = React.useState("")
  // Mutual exclusion: no frame shows the coupon panel and the GSTIN card open
  // at the same time.
  const [expanded, setExpanded] = React.useState<"coupon" | "gstin" | null>(null)
  // UPI Autopay is the selected tile in both subscription frames.
  const [paymentMethod, setPaymentMethod] =
    React.useState<SubscriptionPaymentMethod>("upi-autopay")

  React.useEffect(() => {
    if (open) {
      setPackValue(DEFAULT_PACK)
      setAddonCredits(null)
      setCouponInput("")
      setAppliedCoupon(null)
      setGstin("")
      setGstinInput("")
      setExpanded(null)
      setPaymentMethod("upi-autopay")
    }
  }, [open, item?.id])

  if (!item) return null

  const selectedPack =
    DATABASE_PACKS.find((p) => String(p.credits) === packValue) ?? DATABASE_PACKS[1]
  const addon = addonCredits
    ? DATABASE_PACKS.find((p) => p.credits === addonCredits) ?? null
    : null

  const lines: CartLine[] =
    addon && addon.price != null
      ? [
          item,
          {
            id: `db-${addon.credits}`,
            label: `${addon.credits} Database credits`,
            sublabel: `Valid for ${addon.validDays} days`,
            price: addon.price,
            mrp: addon.mrp,
          },
        ]
      : [item]

  // itemsNet = Σ price · itemsMrp = Σ (mrp ?? price)
  const itemsNet = lines.reduce((sum, l) => sum + l.price, 0)
  const itemsMrp = lines.reduce((sum, l) => sum + (l.mrp ?? l.price), 0)
  const coupon = appliedCoupon ? COUPONS[appliedCoupon] : null
  const couponDiscount = coupon
    ? Math.min(Math.round((itemsNet * coupon.discountPct) / 100), coupon.maxDiscount)
    : 0
  // "Sub total" in the bill is the post-coupon taxable amount (Figma maths).
  const subtotal = itemsNet - couponDiscount
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  // Figma only ever draws the upsell over a job-credit primary item; the
  // Quarterly-plan frames on the same board carry no upsell block at all.
  const isSubscription = item.renewAfterDays != null
  const showUpsell = !addon && !isSubscription && item.id.startsWith("job-")

  // The renewal charge does NOT follow the coupon: both frames print ₹7,079
  // even though the coupon frame's total is ₹6,725. It is the plan's own price
  // plus its own GST — i.e. the coupon is first-cycle only.
  const renewalAmount = item.price + Math.round(item.price * 0.18)
  const periodLabel = periodLabelFor(item.renewAfterDays ?? 0)

  const handleApplyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase()
    // No invalid-coupon state exists in Figma — a non-matching code is
    // ignored and the panel stays open.
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
      {/* The `data-[side=right]:` prefixes are mandatory: the Sheet primitive's
          own `data-[side=right]:w-3/4` / `data-[side=right]:sm:max-w-sm` are
          attribute-qualified (specificity 0,2,0) and beat a bare `w-full` /
          `sm:max-w-md` (0,1,0); twMerge cannot dedupe across variant prefixes
          either. Matching the prefix is what makes the width take. */}
      <SheetContent
        side="right"
        showCloseButton={false}
        className={cn(
          // The `data-[side=right]:` prefix is load-bearing: the Sheet
          // primitive sets its own width under that selector, which a plain
          // `sm:max-w-md` loses to on specificity.
          "gap-0 overflow-hidden bg-muted p-0 data-[side=right]:w-full sm:rounded-l-2xl",
          // Figma draws the subscription order summary as a wider component
          // (536px) than the one-time one (438px) — the payment tiles and the
          // three-item trust row do not fit the narrower drawer.
          isSubscription
            ? "data-[side=right]:sm:max-w-lg"
            : "data-[side=right]:sm:max-w-md"
        )}
      >
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
          {/* 1 — Header + line items */}
          <section className="flex flex-col gap-4 bg-card py-5 shadow-card">
            <div className="flex items-center justify-between gap-3 px-5">
              {/* Atomic utilities rather than the `text-h4` preset: SheetTitle
                  already sets `text-base font-medium`, and twMerge classifies
                  the unknown `text-h4` as a text-COLOUR utility, so it is
                  dropped outright when merged next to `text-foreground`.
                  These four classes are text-h4's resolved values. */}
              <SheetTitle className="font-heading text-xl font-semibold text-foreground">
                Order summary
              </SheetTitle>
              <SheetClose render={<Button variant="ghost" size="icon-sm" />}>
                <X className="size-6 text-muted-foreground" aria-hidden />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>

            <Separator />

            <ul className="flex flex-col gap-4 px-4">
              {lines.map((line, i) => (
                <React.Fragment key={line.id}>
                  {i > 0 && (
                    // A px-4 WRAPPER, not `<Separator className="mx-4 w-auto"/>`:
                    // the primitive's `data-horizontal:w-full` is emitted later
                    // in the stylesheet at equal specificity, so it beats
                    // `w-auto` and `mx-4` would push the rule past the edge.
                    <li aria-hidden>
                      <Separator />
                    </li>
                  )}
                  <CartLineRow
                    line={line}
                    onRemove={i > 0 ? () => setAddonCredits(null) : undefined}
                  />
                </React.Fragment>
              ))}
            </ul>
          </section>

          {/* 2 — Database-credit upsell */}
          {showUpsell && (
            <section className="flex flex-col gap-4 bg-card p-4 shadow-card">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-checkout-primary" aria-hidden />
                  <p className="text-sm font-semibold text-foreground">
                    Complete your hiring needs
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Search &amp; hire from 6 Cr+ candidates
                </p>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-foreground">
                      Add {selectedPack.credits} database credits
                    </p>
                    {selectedPack.validDays != null && (
                      <p className="text-xs text-muted-foreground">
                        Valid for {selectedPack.validDays} days
                      </p>
                    )}
                  </div>
                  {selectedPack.price != null && (
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <div className="flex items-center gap-1">
                        {selectedPack.mrp != null && selectedPack.mrp > selectedPack.price && (
                          <span className="text-xs text-muted-foreground line-through">
                            {inr(selectedPack.mrp)}
                          </span>
                        )}
                        <span className="text-base font-semibold text-foreground">
                          {inr(selectedPack.price)}
                        </span>
                      </div>
                      {selectedPack.discountPct != null && (
                        <Badge variant="discount">{selectedPack.discountPct}% OFF</Badge>
                      )}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-2">
                  <ChipTabs
                    aria-label="Database credit pack size"
                    variant="choice"
                    itemClassName="h-9 px-4"
                    value={packValue}
                    onValueChange={setPackValue}
                    items={DATABASE_PACKS.map((p) => ({
                      value: String(p.credits),
                      label:
                        String(p.credits) === packValue ? (
                          <>
                            <Check className="size-5" aria-hidden />
                            {p.credits}
                          </>
                        ) : (
                          p.credits
                        ),
                    }))}
                  />
                  <Button
                    variant="checkout"
                    size="sm"
                    className="shrink-0 px-3 text-sm"
                    onClick={() => setAddonCredits(selectedPack.credits)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* 3 — Coupon: trigger, expanded panel, or applied row */}
          {appliedCoupon ? (
            <section className="flex items-center justify-between gap-3 bg-card p-4 shadow-card">
              <div className="flex items-start gap-2">
                <Tag className="mt-0.5 size-5 shrink-0 text-checkout-primary" aria-hidden />
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-foreground">
                    {inr(couponDiscount)} saved with {appliedCoupon}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="self-start text-xs text-foreground underline underline-offset-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex shrink-0 items-start gap-1.5">
                {/* Material's `check_circle` is a filled disc; lucide's is an
                    outline, so it is filled against the card. */}
                <CircleCheck className="size-4 fill-checkout-primary text-card" aria-hidden />
                <span className="text-xs text-checkout-primary">Applied</span>
              </div>
            </section>
          ) : expanded === "coupon" ? (
            // Bordered and genuinely shadowless in both S3 and S4.
            <section className="flex flex-col gap-4 border border-border bg-card px-4 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Tag className="size-5 text-foreground" aria-hidden />
                  <p className="text-sm font-semibold text-foreground">Apply coupon</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setExpanded(null)}
                  aria-label="Close apply coupon"
                >
                  <XCircle className="size-5 fill-muted-foreground text-card" aria-hidden />
                </Button>
              </div>

              <InlineActionInput
                value={couponInput}
                onChange={setCouponInput}
                placeholder="Enter coupon code"
                actionLabel="Apply"
                aria-label="Coupon code"
                onAction={() => handleApplyCoupon(couponInput)}
              />

              {Object.values(COUPONS).map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <Tag className="size-5 text-checkout-primary" aria-hidden />
                      {c.label}
                    </span>
                    <span className="text-xs text-foreground">
                      Get {c.discountPct}% off up to{" "}
                      <span className="font-semibold">{inr(c.maxDiscount)}</span> on this purchase
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
            </section>
          ) : (
            <button
              type="button"
              onClick={() => setExpanded("coupon")}
              className="flex items-center justify-between gap-3 bg-card p-4 text-left shadow-card"
            >
              <span className="flex items-center gap-2">
                <Tag className="size-5 text-foreground" aria-hidden />
                <span className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-foreground">Apply Coupons</span>
                  {/* `display: list-item` gives Figma's disc bullet without
                      nesting a <ul> inside a <button>, which is invalid HTML. */}
                  <span className="list-item list-inside list-disc text-xs text-muted-foreground">
                    {COUPON_OFFER_COUNT} offers
                  </span>
                </span>
              </span>
              <ChevronRight className="size-5 shrink-0 text-checkout-primary" aria-hidden />
            </button>
          )}

          {/* 4 — Bill details. `flex-1 justify-end` reproduces Figma's slack
              white space above "Bill details", which collapses as the GSTIN
              card grows. */}
          <section className="flex flex-1 flex-col justify-end gap-4 bg-card shadow-card">
            <div className="flex flex-col gap-4 px-4 pt-3 pb-4">
              <p className="text-sm font-semibold text-foreground">Bill details</p>

              <div className="flex flex-col gap-2">
                <BillRow label="Item total">
                  <span className="flex items-center gap-3">
                    {itemsMrp > itemsNet && (
                      <span className="text-sm text-muted-foreground line-through">
                        {inr(itemsMrp)}
                      </span>
                    )}
                    <span className="text-base font-semibold text-foreground">{inr(itemsNet)}</span>
                  </span>
                </BillRow>

                {appliedCoupon && (
                  <BillRow label={`Coupon discount (${appliedCoupon})`}>
                    <span className="text-sm text-checkout-primary">-{inr(couponDiscount)}</span>
                  </BillRow>
                )}

                <Separator />

                <BillRow label="Sub total">
                  <span className="text-base font-semibold text-foreground">{inr(subtotal)}</span>
                </BillRow>

                <BillRow label="GST (18%)">
                  <span className="text-sm text-foreground">{inr(gst)}</span>
                </BillRow>

                {expanded === "gstin" ? (
                  <GstinCard
                    // Reopening from the saved row retitles the card.
                    title={gstin ? "Edit GSTIN number" : "Add GSTIN number"}
                    onClose={() => setExpanded(null)}
                  >
                    <InlineActionInput
                      value={gstinInput}
                      onChange={(v) => setGstinInput(v.toUpperCase())}
                      placeholder="Enter GSTIN"
                      actionLabel="Save"
                      aria-label="GSTIN number"
                      maxLength={15}
                      onAction={handleApplyGstin}
                    />
                  </GstinCard>
                ) : gstin ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground">GSTIN: {gstin}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Edit GSTIN number"
                      onClick={() => {
                        setGstinInput(gstin)
                        setExpanded("gstin")
                      }}
                    >
                      <Pencil className="size-5 text-foreground" aria-hidden />
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setGstinInput("")
                      setExpanded("gstin")
                    }}
                    className="self-start text-sm text-info underline underline-offset-2"
                  >
                    Add GSTIN number
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Footer stays pinned outside the scroll body — Figma's tallest
            frames (913 px) overflow a typical viewport. `border-t` stands in
            for Figma's upward drop shadow, which has no token. */}
        <div className="flex flex-col gap-4 border-t border-border bg-card p-5 sm:rounded-bl-2xl">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span className="text-base text-foreground">Total</span>
              <span className="text-xs text-muted-foreground">(Inc tax)</span>
            </span>
            <span className="text-2xl font-semibold text-foreground">{inr(total)}</span>
          </div>
          {isSubscription ? (
            <>
              {/* The method is chosen here, not in the payment step: Razorpay
                  needs it up front to create the recurring mandate. */}
              <fieldset className="flex flex-col gap-2">
                <legend className="pb-2 text-sm font-semibold text-foreground">
                  Select payment method
                </legend>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v) => setPaymentMethod(v as SubscriptionPaymentMethod)}
                  className="flex gap-3"
                >
                  {SUBSCRIPTION_PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                    <label
                      key={value}
                      className={cn(
                        "flex flex-1 cursor-pointer items-center gap-2 rounded-xl border p-3 transition-colors",
                        paymentMethod === value
                          ? "border-checkout-primary bg-muted"
                          : "border-border hover:bg-muted/50"
                      )}
                    >
                      <Icon className="size-6 shrink-0 text-foreground" aria-hidden />
                      <span className="flex-1 text-sm font-medium text-foreground">
                        {label}
                      </span>
                      <RadioGroupItem value={value} />
                    </label>
                  ))}
                </RadioGroup>
              </fieldset>

              <Button
                variant="checkout"
                size="lg"
                className="h-12 w-full text-base font-semibold"
                onClick={() => onProceedToPay(total, lines, paymentMethod)}
              >
                {appliedCoupon
                  ? `Pay ${inr(total)} & subscribe`
                  : `Subscribe ${inr(total)} ${periodLabel}`}
              </Button>

              <p className="text-center text-xs leading-4 text-muted-foreground">
                By subscribing, you authorise Apna Incorporated to charge you according
                to the terms. Your plan will automatically renew on{" "}
                {renewalDateFrom(item.renewAfterDays ?? 0)} for{" "}
                <span className="font-semibold">{inr(renewalAmount)} </span>
                {periodLabel} (inc. GST)
              </p>

              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                {SUBSCRIPTION_TRUST_ITEMS.map(({ label, icon: Icon }) => (
                  <li
                    key={label}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <Icon className="size-3 shrink-0" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <Button
                variant="checkout"
                size="lg"
                className="h-12 w-full text-base font-semibold"
                onClick={() => onProceedToPay(total, lines)}
              >
                Proceed to pay {inr(total)}
              </Button>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-4" aria-hidden />
                100% safe and secure checkout
              </p>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

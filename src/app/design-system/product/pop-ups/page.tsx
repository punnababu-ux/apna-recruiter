"use client"

/**
 * Product › Pop-ups — every pop-up the website and app open, live, with
 * sample data, and the rules for when each one appears. Open any of them
 * from its card; nothing here buys, posts or sends anything.
 */

import * as React from "react"
import { Button, Checkbox } from "@apna/design-system"
import { ContactPopup } from "@/components/marketing/contact-section"
import { JobTypesDialog } from "@/components/apnahire/job-plan-cards"
import {
  AnnualUpgradeDialog,
  CreditPackOfferDialog,
  CreditsToPlanDialog,
  JobBundleOfferDialog,
} from "@/components/apnahire/offers/upsell-dialogs"
import { ExitOfferDialog } from "@/components/apnahire/offers/exit-offer-dialog"
import { CouponExpiredDialog } from "@/components/apnahire/offers/coupon-expired-dialog"
import { SlotsFullDialog } from "@/components/apnahire/slots/slots-full-dialog"
import { PaymentModal } from "@/components/apnahire/payment-modal"
import { CheckoutDrawer } from "@/components/apnahire/checkout-drawer"
import { SINGLE_CREDIT, UPSELL_PACK_22 } from "@/components/apnahire/job-credit-bundles"
import { SUBSCRIPTION_PLANS } from "@/components/apnahire/subscription-plans"
import { JOB_PLAN_TIERS } from "@/content/job-plans"
import { SLOT_PRESETS } from "@/hooks/use-job-slots"
import { RuleList, ShowcaseEntry, ShowcasePage } from "../showcase-blocks"

type PopupId =
  | "contact"
  | "contact-signed-in"
  | "job-types"
  | "job-bundle"
  | "credit-pack"
  | "annual"
  | "credits-to-plan"
  | "exit"
  | "coupon-expired"
  | "slots-full"
  | "payment"
  | "order-summary"

const noop = () => {}
const FULL_SLOTS = SLOT_PRESETS.full.slots!

export default function PopUpsPage() {
  const [open, setOpen] = React.useState<PopupId | null>(null)
  const [extraOff, setExtraOff] = React.useState(false)
  const close = () => setOpen(null)
  const is = (id: PopupId) => open === id
  const toggle = (id: PopupId) => (next: boolean) => setOpen(next ? id : null)
  const openBtn = (id: PopupId, label = "Open") => (
    <Button variant="outline" size="sm" onClick={() => setOpen(id)}>
      {label}
    </Button>
  )
  const upsell = { onClose: close, onStay: close, onTake: close, extraOff }

  return (
    <ShowcasePage
      category="Product"
      title="Pop-ups"
      description="Every pop-up the website and the recruiter app open, live with sample data. Each card says when it appears, where, and the rules it follows. Nothing here buys, posts or sends anything."
      importLine='import { ContactPopup } from "@/components/marketing/contact-section"'
    >
      <ShowcaseEntry title="Rules for every pop-up">
        <RuleList
          rules={[
            "Desktop: a centred Dialog. Phone: a bottom Sheet, or the Dialog when it fits.",
            "Close with the CloseBubble outside the top-right corner. Never add your own X inside.",
            "One primary (green) action at most. Upsells offer two tiles, not two green buttons.",
            "Don't stack pop-ups. Close one before opening the next (an upsell closes before the order summary opens).",
            "Never open a pop-up on page load. A pop-up answers something the user did (a click, trying to leave).",
            "A confirmation closes with one button (\"Okay, got it\"). It never leads somewhere new.",
            "A pop-up's main button is full width, whether the content above it is centred (a confirmation) or left-aligned (a form): never left in one pop-up and centred in another.",
          ]}
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox checked={extraOff} onCheckedChange={(v) => setExtraOff(Boolean(v))} />
          Show prices with the 10% exit offer claimed
        </label>
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Contact form · Get in touch with us"
        component="ContactPopup · ContactButton"
        where="Logged out: every Contact sales / Talk to sales / Contact us (contact band, homepage Enterprise card, product pages, Enterprise and Lounge heroes, /pricing)"
        actions={openBtn("contact")}
      >
        <RuleList
          rules={[
            "Only for logged-out visitors. We don't know them yet, so we ask.",
            "Open it with ContactButton, or ContactPopup for a custom trigger. Never link to #contact-us instead.",
            "After a valid submit it swaps to the confirmation. Reopening starts a fresh form.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Sales confirmation · Thank you for showing interest"
        component="ContactPopup signedIn"
        where="Logged in: Contact sales on /apnahire/credits (the Need a custom solution strip, Enterprise cards, sticky CTA)"
        actions={openBtn("contact-signed-in")}
      >
        <RuleList
          rules={[
            "Logged in, we already know the recruiter: no form, straight to this confirmation.",
            "Copy is fixed in content/contact.ts (signedIn). One button, \"Okay, got it\", closes it.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="What each job type gets you"
        component="JobTypesDialog"
        where="Self-checkout › Jobs tab › Need more info?"
        actions={openBtn("job-types")}
      >
        <RuleList
          rules={[
            "Read-only: no buy button. Credits are spent at posting time.",
            "Prices, credits and features come from JOB_PLAN_TIERS (content/job-plans.ts). Never type a price here.",
            "Built from PricingCard (price-first), the same card as the job-posting plans step.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Upsell · Post 3 jobs and save"
        component="JobBundleOfferDialog"
        where="Express checkout (zero credits), after picking a job type"
        actions={openBtn("job-bundle")}
      >
        <RuleList
          rules={[
            "All upsells are OfferDialog + OfferChoice: two tiles, stay or upgrade.",
            "Tiles compare line for line: price, note, validity and CTA sit on the same row in both.",
            "Shown once per purchase. Either tile continues to the order summary.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Upsell · Bigger credit pack"
        component="CreditPackOfferDialog"
        where="Self-checkout (Buy 13 credits) · express checkout (short of credits)"
        actions={openBtn("credit-pack")}
      >
        <RuleList rules={["Both tiles show validity with the clock in self-checkout. In express, only the pack does."]} />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Upsell · Go annual"
        component="AnnualUpgradeDialog"
        where="Buying the monthly (or quarterly) apna Unlimited plan, either checkout"
        actions={openBtn("annual")}
      >
        <RuleList rules={["Uses the premium offer gradient (gold on plum), not the product gradient."]} />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Upsell · Credits or a plan"
        component="CreditsToPlanDialog"
        where="Self-checkout, when a credit bundle costs about as much as a plan"
        actions={openBtn("credits-to-plan")}
      >
        <RuleList rules={["The plan tile lists its database credits and their value, like the annual tile."]} />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Exit offer · 10% extra off"
        component="ExitOfferDialog"
        where="Leaving either checkout without buying (back, close)"
        actions={openBtn("exit")}
      >
        <RuleList
          rules={[
            "Once per session. Claiming starts the countdown, and every price on the page then carries the 10%.",
            "With the offer claimed, \"10% extra off applied\" comes first under each price, then the gray per-unit note.",
          ]}
        />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Offer expired"
        component="CouponExpiredDialog"
        where="Order summary open when the claimed 10% runs out"
        actions={openBtn("coupon-expired")}
      >
        <RuleList rules={["Only from the order summary. Prices go back to normal when it closes."]} />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="All job slots are in use"
        component="SlotsFullDialog"
        where="Subscriber posts a job with every slot taken (job posting, last step)"
        actions={openBtn("slots-full")}
      >
        <RuleList rules={["Two ways out: expire a live job to free its slot, or add a slot."]} />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Payment"
        component="PaymentModal"
        where="Proceed to pay, from the order summary (both checkouts)"
        actions={openBtn("payment")}
      >
        <RuleList rules={["Prototype: a mocked method chooser. Subscriptions show the mandate method read-only."]} />
      </ShowcaseEntry>

      <ShowcaseEntry
        title="Order summary"
        component="CheckoutDrawer"
        where="Any Buy now, either checkout"
        actions={openBtn("order-summary")}
      >
        <RuleList
          rules={[
            "A side panel (SheetPanel) on desktop, a bottom sheet on phones.",
            "One add-on card per checkout: Database in self-checkout, AI calling in express. It runs the attention ring once per session.",
            "The GST line lives here. Plan pages only say \"*GST applicable\".",
          ]}
        />
      </ShowcaseEntry>

      <ContactPopup open={is("contact")} onOpenChange={toggle("contact")} />
      <ContactPopup open={is("contact-signed-in")} onOpenChange={toggle("contact-signed-in")} signedIn />
      <JobTypesDialog open={is("job-types")} onOpenChange={toggle("job-types")} extraOff={extraOff} />
      <JobBundleOfferDialog open={is("job-bundle")} tier={JOB_PLAN_TIERS.premium} {...upsell} />
      <CreditPackOfferDialog
        open={is("credit-pack")}
        need={{ credits: 13, price: 7099, mrp: 8999, validDays: 180 }}
        pack={UPSELL_PACK_22}
        {...upsell}
      />
      <AnnualUpgradeDialog
        open={is("annual")}
        from={{
          label: "Monthly plan",
          price: SUBSCRIPTION_PLANS.monthly.price,
          months: 1,
          dbCredits: SUBSCRIPTION_PLANS.monthly.dbCredits,
          dbWorth: SUBSCRIPTION_PLANS.monthly.dbWorth,
        }}
        {...upsell}
      />
      <CreditsToPlanDialog
        open={is("credits-to-plan")}
        bundle={{ credits: 6, price: 3649, mrp: 4194, validDays: 90 }}
        plan={{
          label: "Quarterly plan",
          price: SUBSCRIPTION_PLANS.quarterly.price,
          months: SUBSCRIPTION_PLANS.quarterly.months,
          dbCredits: SUBSCRIPTION_PLANS.quarterly.dbCredits,
          dbWorth: SUBSCRIPTION_PLANS.quarterly.dbWorth,
        }}
        {...upsell}
      />
      <ExitOfferDialog open={is("exit")} onClaim={close} onDecline={close} onDismiss={close} />
      <CouponExpiredDialog open={is("coupon-expired")} onClose={close} />
      <SlotsFullDialog
        open={is("slots-full")}
        onOpenChange={toggle("slots-full")}
        slots={FULL_SLOTS}
        onExpireAndPost={close}
        onUpgrade={close}
      />
      <PaymentModal
        open={is("payment")}
        onOpenChange={toggle("payment")}
        itemLabel={`${SINGLE_CREDIT.credits} job credit`}
        amount={SINGLE_CREDIT.price}
        onSuccess={close}
        onFailure={noop}
      />
      <CheckoutDrawer
        open={is("order-summary")}
        onOpenChange={toggle("order-summary")}
        item={{
          id: "showcase-13",
          label: "13 Job credits",
          sublabel: "Valid for 180 days",
          price: 7099,
          mrp: 8999,
        }}
        onProceedToPay={close}
      />
    </ShowcasePage>
  )
}

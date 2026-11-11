/**
 * Engineering › Review states — every prototype state you can set from the
 * address bar, with a builder and a link for each one. It replaces the
 * hidden preview panel that "*GST applicable" used to open (removed
 * 2026-11-07, docs/DECISIONS.md "No hidden preview panel").
 */

import * as React from "react"
import { RuleList, ShowcaseEntry, ShowcasePage } from "../../product/showcase-blocks"
import { AllStatesTable, ReviewStatesBuilder } from "./review-states-builder"

export const metadata = { title: "Review states" }

export default function ReviewStatesPage() {
  return (
    <ShowcasePage
      category="Engineering"
      title="Review states"
      description="Set a screen's review state from the address bar: credit balance, checkout layout, offer bars, old versions. Pick below and open the link, or use a ready-made one. This replaces the hidden panel that “*GST applicable” used to open."
    >
      <ShowcaseEntry title="Build a link" where="Params combine. The pricing phase is not a URL param: it is saved in this browser and applies to every page.">
        <ReviewStatesBuilder />
      </ShowcaseEntry>

      <ShowcaseEntry title="Every state" where="One link per option, plus every layout and credit pair. Each opens in a new tab.">
        <AllStatesTable />
      </ShowcaseEntry>

      <ShowcaseEntry title="Rules">
        <RuleList
          rules={[
            "Product copy is never a control. A review state is a URL param, never a click on “*GST applicable” or a date.",
            "A new review state is added to the screen that reads it and to this page, in the same change.",
            "Before production, these params and the pricing-phase key are replaced by account data.",
          ]}
        />
      </ShowcaseEntry>
    </ShowcasePage>
  )
}

"use client"

/** Product › Banners — every offer banner (OfferBar), live with sample data. */

import { OfferBannerGallery } from "@/components/apnahire/offer-banner-gallery"
import { RuleList, ShowcaseEntry, ShowcasePage } from "../showcase-blocks"

export default function BannersCatalogPage() {
  return (
    <ShowcasePage
      category="Product"
      title="Banners"
      description="Every rebuy, upgrade and credit banner, live with sample data. Each one shows its case and the ?bar= value that previews it on My jobs."
      importLine='import { OfferBannerFor } from "@/components/apnahire/offer-banners"'
    >
      <ShowcaseEntry title="Rules for every banner" component="OfferBar">
        <RuleList
          rules={[
            "One component: OfferBar. Clay object, badge, headline with one gold number, then price, deadline and CTA on the right.",
            "The surface follows the pop-up the CTA opens: subscription plum, credits green, out of credits red, festive gold.",
            "The badge says why the banner shows. Time goes in the deadline: Limited time offer, then Ends in hh:mm:ss in the last 24 hours.",
            "The CTA is the white emphasis button at the default size.",
            "Phones: the clay hides, the CTA goes full width, the deadline joins the price line where it fits.",
            "A festive skin changes only the background, the headline face and the clay, never the structure.",
          ]}
        />
      </ShowcaseEntry>
      <div className="-mx-4 md:-mx-8">
        <OfferBannerGallery />
      </div>
    </ShowcasePage>
  )
}

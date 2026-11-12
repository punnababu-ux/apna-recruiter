"use client"

/** Preview only: every rebuy / upgrade / credit banner on one page (2026-11-12). */

import { Suspense } from "react"
import { OfferBannerGallery } from "@/components/apnahire/offer-banner-gallery"

export default function BannersPage() {
  return <Suspense><OfferBannerGallery /></Suspense>
}

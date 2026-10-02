/**
 * Shared tone maps for `AlertBanner` and `RenewalBanner` — kept in one place
 * so the two banner components can never drift on what "primary" vs
 * "secondary" appearance means for a given `Alert` variant. Not part of the
 * public API (not re-exported from the package root); each banner imports
 * directly.
 */

export const bannerAccentColorMap: Record<string, string> = {
  default: "text-foreground",
  destructive: "text-destructive",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
}

export const bannerPrimaryBgMap: Record<string, string> = {
  default: "bg-gradient-banner-default text-white",
  destructive: "bg-gradient-banner-destructive text-white",
  success: "bg-gradient-banner-success text-white",
  warning: "bg-gradient-banner-warning text-gray-950",
  info: "bg-gradient-banner-info text-white",
}

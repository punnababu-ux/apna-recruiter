/**
 * Shared tone maps for `AlertBanner` and `RenewalBanner` — kept in one place
 * so the two banner components can never drift on what "primary" vs
 * "secondary" appearance means for a given `Alert` variant. Not part of the
 * public API (not re-exported from the package root); each banner imports
 * directly.
 */

export const bannerAccentColorMap: Record<string, string> = {
  default: "text-foreground",
  muted: "text-foreground",
  destructive: "text-destructive-subtle-foreground",
  // Role colour on the tinted fill fails contrast (success 3.77:1, info
  // 4.23:1). The -subtle-foreground text is the pairing meant for that fill.
  success: "text-success-subtle-foreground",
  // gold-500 text on a light card is ~2:1 — use the tint pairing instead.
  warning: "text-warning-subtle-foreground",
  info: "text-info-subtle-foreground",
}

/** Quieter text on a tinted banner (a struck price, a caption). The plain
 *  muted grey fails contrast on a coloured tint, so it uses that tint's
 *  own foreground. */
export const bannerMutedColorMap: Record<string, string> = {
  default: "text-muted-foreground",
  muted: "text-muted-foreground",
  destructive: "text-destructive-subtle-foreground",
  success: "text-success-subtle-foreground",
  warning: "text-warning-subtle-foreground",
  info: "text-info-subtle-foreground",
}

export const bannerPrimaryBgMap: Record<string, string> = {
  default: "bg-gradient-banner-default text-white",
  muted: "bg-gradient-banner-default text-white",
  destructive: "bg-gradient-banner-destructive text-white",
  success: "bg-gradient-banner-success text-white",
  warning: "bg-gradient-banner-warning text-gray-950",
  info: "bg-gradient-banner-info text-white",
}

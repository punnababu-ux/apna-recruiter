/**
 * PageHeader — title, optional tabs, and an action cluster.
 *
 * Layout rules (automatic — no extra props needed):
 *   title + tabs + actions   → title row stacked above; tabs + CTA share a row
 *   title + actions (no tabs) → title and CTA on ONE row, vertically centred
 *   tabs + actions (no title) → tabs and CTA on ONE row
 *
 * variant="default"
 *   bg-card + border-b. Includes all internal padding.
 *   Self-contained — place it and spacing is handled.
 *
 * variant="transparent"
 *   No background, no border, NO internal padding — zero px/py.
 *   The caller owns every gap: top spacing, bottom spacing, and horizontal
 *   alignment are all set via className or the surrounding layout.
 *   A small structural gap (gap-1.5) keeps the title row and tabs row from
 *   touching when both are present; this is a layout detail, not content spacing.
 */

import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  eyebrow,
  description,
  actions,
  tabs,
  variant = "default",
  className,
}: {
  title?: React.ReactNode
  eyebrow?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  tabs?: React.ReactNode
  variant?: "default" | "transparent"
  className?: string
}) {
  const isDefault = variant === "default"
  const hasTitleBlock = title || eyebrow || description

  // ── No tabs: title + actions on one row ────────────────────────────────
  if (hasTitleBlock && !tabs) {
    return (
      <header className={cn(isDefault && "border-b border-border bg-card", className)}>
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            // Default: full-bleed band, but constrain inner content to the same
            // max-width the page body uses so the title aligns with body content.
            isDefault && "mx-auto w-full max-w-7xl px-6 py-4",
          )}
        >
          <div className="min-w-0 flex-1">
            {eyebrow ? (
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h1 className="text-xl font-semibold leading-tight">{title}</h1>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </header>
    )
  }

  // ── Has tabs: title + actions on the top row, tabs on their own row ─────
  return (
    <header
      className={cn(
        isDefault && "border-b border-border bg-card",
        // In transparent mode, use flex-col so a structural gap (not padding)
        // keeps the title row and tabs row from touching.
        !isDefault && "flex flex-col gap-3",
        className,
      )}
    >
      {hasTitleBlock || actions ? (
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            isDefault && "mx-auto w-full max-w-7xl px-6 pt-5 pb-3",
          )}
        >
          <div className="min-w-0 flex-1">
            {eyebrow ? (
              <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <h1 className="text-xl font-semibold leading-tight">{title}</h1>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
      ) : null}

      {tabs ? (
        <div
          className={cn(
            "flex items-center min-w-0 max-w-full overflow-x-auto no-scrollbar",
            // pt-0 + pb-0: the underline indicator of variant="line" tabs sits
            // at bottom-0 of the trigger, which lands flush against the
            // header's border-b line.
            isDefault && "mx-auto w-full max-w-7xl px-6",
          )}
        >
          <div className="min-w-0 max-w-full flex-1 overflow-x-auto no-scrollbar">{tabs}</div>
        </div>
      ) : null}
    </header>
  )
}

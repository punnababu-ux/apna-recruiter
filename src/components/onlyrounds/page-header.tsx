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
            isDefault && "px-6 py-4",
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

  // ── Has tabs: stacked layout (title above, tabs + actions below) ────────
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
      {hasTitleBlock ? (
        <div className={cn(isDefault && "px-6 pt-5 pb-3")}>
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
      ) : null}

      {tabs || actions ? (
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-4",
            isDefault && "px-6 py-2",
          )}
        >
          {tabs ? <div className="min-w-0 flex-1">{tabs}</div> : <div />}
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}

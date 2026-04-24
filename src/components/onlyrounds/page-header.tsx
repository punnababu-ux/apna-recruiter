/**
 * PageHeader — top-of-page title row with optional breadcrumb, description,
 * tab navigation, and an action cluster on the right.
 *
 * Layout:
 *   (optional) eyebrow + title + description block
 *   tabs + actions on a single horizontal line (tabs left, actions right)
 *
 * The `tabs` prop slot accepts any Tabs composition so callers own routing.
 */

import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  eyebrow,
  description,
  actions,
  tabs,
  className,
}: {
  title?: React.ReactNode
  eyebrow?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  tabs?: React.ReactNode
  className?: string
}) {
  const hasTitleBlock = title || eyebrow || description

  return (
    <header className={cn("border-b border-border bg-card", className)}>
      {hasTitleBlock ? (
        <div className="px-6 pt-5 pb-3">
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
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-2">
          <div className="min-w-0 flex-1">{tabs}</div>
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}

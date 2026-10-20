/**
 * Building blocks for the Product showcase pages: a page header, one entry
 * per component (what, where it's used, a live demo or its actions) and a
 * rule list. Layout only; the components inside carry their own look.
 */

import * as React from "react"
import { Badge } from "@apna/design-system"

export function ShowcasePage({
  category,
  title,
  description,
  importLine,
  children,
}: {
  category: string
  title: string
  description: string
  importLine?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{category}</Badge>
        </div>
        <h1 className="text-h3 text-foreground">{title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
      </div>
      {importLine && (
        <div className="rounded-card-nested border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
          <code>{importLine}</code>
        </div>
      )}
      {children}
    </div>
  )
}

export function ShowcaseEntry({
  title,
  component,
  where,
  actions,
  children,
}: {
  title: string
  /** The component(s) to import. */
  component?: string
  /** Where it's used in the product or website. */
  where?: React.ReactNode
  /** An "Open" button for a pop-up, or a link to see it live. */
  actions?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4 rounded-card-nested border border-border bg-card p-6">
      <div className="flex flex-col gap-3 border-b border-border pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {component && <code className="font-mono text-xs text-muted-foreground">{component}</code>}
        </div>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>
      {where && (
        <p className="text-sm text-foreground">
          <span className="font-semibold">Where: </span>
          {where}
        </p>
      )}
      {children}
    </section>
  )
}

export function RuleList({ rules }: { rules: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
      {rules.map((r) => (
        <li key={r}>{r}</li>
      ))}
    </ul>
  )
}

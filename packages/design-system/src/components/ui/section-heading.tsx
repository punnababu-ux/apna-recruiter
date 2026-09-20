/**
 * SectionHeading — the eyebrow / title / description block that opens a band.
 *
 * Exists to carry the three typographic decisions that are easy to forget and
 * invisible when missed: `text-balance` on the title so a headline never drops
 * one orphaned word, `text-pretty` and a reading measure on the description so
 * it doesn't run the full band width, and the gap between them.
 *
 * Sets no colour. That is what lets the same component sit on a light band and
 * inside `tone="ink"` — it inherits, so the surface decides.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

const TITLE_PRESET = {
  1: "text-display-lg",
  2: "text-h2",
  3: "text-h3",
} as const

export interface SectionHeadingProps
  extends Omit<React.ComponentProps<"header">, "title"> {
  /** Small label above the title — a `<Badge size="lg">` or plain text. */
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Buttons or links, placed opposite the title on wide screens. */
  actions?: React.ReactNode
  align?: "start" | "center"
  /** Heading level. Also picks the type preset: 1 is the page-opening size. */
  level?: 1 | 2 | 3
}

function SectionHeading({
  className,
  eyebrow,
  title,
  description,
  actions,
  align = "start",
  level = 2,
  ...props
}: SectionHeadingProps) {
  const Title = `h${level}` as const
  const centered = align === "center"

  return (
    <header
      data-slot="section-heading"
      className={cn(
        "flex w-full flex-col gap-4",
        centered && "items-center text-center",
        actions && "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
      {...props}
    >
      <div className={cn("flex flex-col gap-3", centered && "items-center")}>
        {eyebrow && <div data-slot="section-heading-eyebrow">{eyebrow}</div>}

        <Title
          data-slot="section-heading-title"
          className={cn(TITLE_PRESET[level], "font-semibold text-balance")}
        >
          {title}
        </Title>

        {description && (
          <p
            data-slot="section-heading-description"
            className={cn(
              "text-lead max-w-prose text-muted-foreground text-pretty",
              // On an ink band the muted role is near-invisible; the band sets
              // data-tone, so the description can follow it without a prop.
              "group-data-[tone=ink]/section:text-ink-fg-muted"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-3">{actions}</div>
      )}
    </header>
  )
}

export { SectionHeading }

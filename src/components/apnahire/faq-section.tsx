"use client"

/**
 * FaqSection — "Frequently asked questions" block shown at the bottom of
 * every pricing tab (Jobs, Database, Subscription, Enterprise — Figma
 * repeats this section identically across all four).
 *
 * Open item: filled light-gray panel, no border, green chevron.
 * Closed item: white panel with a border, muted chevron.
 */

import * as React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@apna/design-system"
import { Button, ChevronDown } from "@apna/design-system"
import { cn } from "@/lib/utils"
import { HELP_CENTRE } from "@/content/nav"
import { HOME_PROOF } from "@/content/home"

export interface FaqItem {
  value: string
  question: string
  answer?: string
}

// The live site's answers (employer.apna.co, 2026-10-19), shared with the
// homepage. "Is job validity…" has no live answer yet, so it isn't listed.
const FAQS: readonly FaqItem[] = HOME_PROOF.faqs

interface FaqSectionProps {
  /** The questions; defaults to the pricing page's set. The first opens. */
  items?: readonly FaqItem[]
  /** Hide the "Help & support" and "Show more" buttons (a page whose
   *  list is complete, like Enterprise). */
  hideActions?: boolean
  onHelpAndSupport?: () => void
  onShowMore?: () => void
  className?: string
}

export function FaqSection({ items = FAQS, hideActions, onHelpAndSupport, onShowMore, className }: FaqSectionProps) {
  const [open, setOpen] = React.useState<string[]>(items[0] ? [items[0].value] : [])

  return (
    <div
      data-slot="faq-section"
      className={cn(
        "flex flex-col items-start gap-8 py-16 lg:flex-row lg:gap-4",
        className
      )}
    >
      <div className="flex w-full shrink-0 flex-col items-start gap-6 lg:w-92">
        <h2 className="text-h3 font-heading font-semibold text-foreground [[data-voice=editorial]_&]:font-editorial">
          Frequently
          <br />
          asked questions
        </h2>
        {/* Without a handler it opens the Help Center in a new tab. */}
        {!hideActions &&
          (onHelpAndSupport ? (
            <Button type="button" variant="outline" size="sm" onClick={onHelpAndSupport}>
              Help &amp; support
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<a href={HELP_CENTRE} target="_blank" rel="noreferrer noopener" />}
            >
              Help &amp; support
            </Button>
          ))}
      </div>

      <div className="flex w-full flex-col items-end gap-4">
        <Accordion
          value={open}
          onValueChange={(v) => setOpen(v as string[])}
          className="w-full gap-4"
        >
          {items.map((faq) => {
            const isOpen = open.includes(faq.value)
            return (
              <AccordionItem
                key={faq.value}
                value={faq.value}
                className={cn(
                  "card-hover-lift rounded-card px-6 not-last:border-b",
                  isOpen ? "border-transparent bg-muted" : "border border-border bg-card"
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "py-6 text-base font-semibold text-foreground hover:no-underline",
                    // Figma tints the chevron green only while the item is open.
                    isOpen && "**:data-[slot=accordion-trigger-icon]:text-checkout-primary"
                  )}
                >
                  {faq.question}
                </AccordionTrigger>
                {faq.answer && (
                  <AccordionContent className="pb-6 text-base leading-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                )}
              </AccordionItem>
            )
          })}
        </Accordion>

        {/* Only when there are more questions to load. */}
        {!hideActions && onShowMore && (
          <Button type="button" variant="link" className="self-start" onClick={onShowMore} trailingIcon={<ChevronDown aria-hidden />}>
            Show more
          </Button>
        )}
      </div>
    </div>
  )
}

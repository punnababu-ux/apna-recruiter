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

interface FaqItem {
  value: string
  question: string
  answer?: string
}

const FAQS: FaqItem[] = [
  {
    value: "why-apna",
    question: "Why should I use Apna over others?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  { value: "not-enough-candidates", question: "What happens if I don't receive enough candidates?" },
  { value: "cities", question: "In which cities can I hire via Apna?" },
  { value: "validity", question: "Is job validity different than credits validity?" },
]

interface FaqSectionProps {
  onHelpAndSupport?: () => void
  onShowMore?: () => void
  className?: string
}

export function FaqSection({ onHelpAndSupport, onShowMore, className }: FaqSectionProps) {
  const [open, setOpen] = React.useState<string[]>(["why-apna"])

  return (
    <div
      data-slot="faq-section"
      className={cn(
        "flex flex-col items-start gap-8 py-16 lg:flex-row lg:gap-4",
        className
      )}
    >
      <div className="flex w-full shrink-0 flex-col items-start gap-6 lg:w-92">
        <h2 className="text-h3 font-heading font-semibold text-foreground">
          Frequently
          <br />
          asked questions
        </h2>
        <Button type="button" variant="outline" size="sm" onClick={onHelpAndSupport}>
          Help &amp; support
        </Button>
      </div>

      <div className="flex w-full flex-col items-end gap-4">
        <Accordion
          value={open}
          onValueChange={(v) => setOpen(v as string[])}
          className="w-full gap-4"
        >
          {FAQS.map((faq) => {
            const isOpen = open.includes(faq.value)
            return (
              <AccordionItem
                key={faq.value}
                value={faq.value}
                className={cn(
                  "card-hover-lift rounded-xl px-6 not-last:border-b",
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

        <button
          type="button"
          onClick={onShowMore}
          className="inline-flex items-center gap-1 text-sm text-info underline underline-offset-2"
        >
          Show more
          <ChevronDown className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  )
}

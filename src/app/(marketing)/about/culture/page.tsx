/** /about/culture — Our culture and values. Copy: content/company.ts ABOUT_VALUES. */

import type { Metadata } from "next"
import { Card, CheckCircle2, Section } from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { ABOUT_VALUES } from "@/content/company"

export const metadata: Metadata = ABOUT_VALUES.meta

export default function CulturePage() {
  const { eyebrow, title, description, values, closing } = ABOUT_VALUES
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <Section tone="card" size="md">
        <div className="flex flex-col gap-12">
          <ul className="grid gap-6 md:grid-cols-2">
            {values.map((value, i) => (
              <li key={value.title}>
                <Card padding="lg" tone="muted" className="h-full gap-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-h4 font-semibold text-primary tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-h4 text-foreground">{value.title}</h2>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {value.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                        <span className="text-sm text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>
          <p className="text-center text-h4 text-balance text-muted-foreground">{closing}</p>
        </div>
      </Section>
      <ContactSection />
    </>
  )
}

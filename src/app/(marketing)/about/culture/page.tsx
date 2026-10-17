/**
 * /about/culture — Our culture and values. Copy: content/company.ts
 * ABOUT_VALUES (Lovable "Our Cultures and Values").
 *
 *   Hero     the chip, the serif headline, the line
 *   Values   the four values as stacking cards in the suite gradients,
 *            each with its 3D clay object in a tile on the left (ValueArt),
 *            its four commitments as one checked column beside it
 *   Closing  the line as a statement band in the mother gradient
 */

import type { Metadata } from "next"
import {
  CheckCircle2,
  Heart,
  ScrollStack,
  Section,
} from "@apna/design-system"
import { ValueArt } from "@/components/marketing/value-art"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, StackCard, StatementBand, deckPosition } from "@/components/marketing/page-blocks"
import { ABOUT_VALUES } from "@/content/company"

export const metadata: Metadata = ABOUT_VALUES.meta

export default function CulturePage() {
  const { eyebrow, title, description, values, closing } = ABOUT_VALUES
  return (
    <>
      <PageHero icon={<Heart aria-hidden />} eyebrow={eyebrow} title={title} description={description} />

      <Section tone="card" size="md">
        {/* No section title: the hero already names them (Lovable has none). */}
        <ScrollStack>
            {values.map((value, i) => (
              <StackCard
                key={value.title}
                index={i}
                art={<ValueArt name={value.art} />}
                overline={deckPosition(i, values.length)}
                title={value.title}
              >
                <ul className="flex flex-col gap-4">
                  {value.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-foreground" aria-hidden />
                      <span className="text-base text-pretty text-foreground sm:text-lg">{point}</span>
                    </li>
                  ))}
                </ul>
              </StackCard>
            ))}
        </ScrollStack>
      </Section>

      <StatementBand title={closing} />

      <ContactSection tone="card" />
    </>
  )
}

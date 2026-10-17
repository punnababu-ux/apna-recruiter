/**
 * /about/culture — Our culture and values. Copy: content/company.ts
 * ABOUT_VALUES (Lovable "Our Cultures and Values").
 *
 *   Hero     the chip, the serif headline, the line
 *   Values   the four values as stacking cards in the suite gradients,
 *            each with its 3D clay object in a tile on the left (ValueArt),
 *            its four commitments as one checked column beside it
 *   Closing  the line as the values band's sign-off (the apna wordmark,
 *            serif line), then the contact card with the footer
 */

import type { Metadata } from "next";
import {
  CheckCircle2,
  Heart,
  LogoApnaWordmark,
  ScrollStack,
  Section,
} from "@apna/design-system";
import { ValueArt } from "@/components/marketing/value-art";
import { ContactSection } from "@/components/marketing/contact-section";
import {
  PageHero,
  StackCard,
  deckPosition,
} from "@/components/marketing/page-blocks";
import { ABOUT_VALUES } from "@/content/company";

export const metadata: Metadata = ABOUT_VALUES.meta;

export default function CulturePage() {
  const { eyebrow, title, description, values, closing } = ABOUT_VALUES;
  return (
    <>
      <PageHero
        icon={<Heart aria-hidden />}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <Section tone="card" size="md">
        {/* No section title: the hero already names them (Lovable has none). */}
        <div className="flex flex-col gap-16 lg:gap-24">
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
                      <CheckCircle2
                        className="mt-1 size-5 shrink-0 text-foreground"
                        aria-hidden
                      />
                      <span className="text-base text-pretty text-foreground sm:text-lg">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </StackCard>
            ))}
          </ScrollStack>

          {/* The sign-off, in the same band right under the last value: the
            apna wordmark, the line in the serif. */}
          <div className="flex flex-col items-center gap-6 text-center">
            {/* The apna wordmark alone (deep on light, white in dark). */}
            <LogoApnaWordmark variant="deep" className="h-8 w-auto dark:hidden" />
            <LogoApnaWordmark variant="white" className="hidden h-8 w-auto dark:block" />
            <p className="max-w-2xl text-editorial-h2 text-balance text-foreground">
              {closing}
            </p>
          </div>
        </div>
      </Section>

      {/* With the footer, on the page gradient: a white card. */}
      <ContactSection />
    </>
  );
}

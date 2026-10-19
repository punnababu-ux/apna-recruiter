/**
 * TestimonialCard / TestimonialGrid — the one way a customer quote is drawn,
 * on every page (home, pricing, customer stories).
 *
 *   TestimonialCard  frosted card (surface-frosted: frosted on a gradient
 *                    band, muted on a white one), a quote mark or the
 *                    company's mark, the quote in text-quote, then who said
 *                    it pinned to the bottom so sibling cards align.
 *   TestimonialGrid  three across from lg; defaults to the homepage's real
 *                    customer quotes (content/home.ts HOME_PROOF).
 *
 * Not clickable, so no hover lift.
 */

import type { ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage, Card, Quote } from "@apna/design-system"
import { HOME_PROOF } from "@/content/home"
import { ILLUSTRATION_TONE, type IllustrationTone } from "@/components/marketing/product-illustrations"
import { cn } from "@/lib/utils"

/** No photo: one of the four suite gradients, picked from the name so a
 *  person keeps the same colour on every page and every load. */
const TONES: IllustrationTone[] = ["sky", "green", "plum", "gold"]
const toneFor = (name: string) => TONES[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % TONES.length]

/** "Dr Varun" → "DV", "Kabir Chugh" → "KC". */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export function TestimonialCard({
  quote,
  name,
  role,
  photo,
  mark,
  className,
}: {
  quote: string
  name?: string
  role?: string
  /** Their photo, beside the name (enterprise quotes have them). */
  photo?: string
  /** The company's logo (CompanyMark) in place of the quote mark. */
  mark?: ReactNode
  className?: string
}) {
  return (
    <Card padding="lg" className={cn("surface-frosted h-full gap-6", className)}>
      {mark ?? <Quote className="size-6 text-product-accent" aria-hidden />}
      <p className="text-quote text-pretty text-foreground">&ldquo;{quote}&rdquo;</p>
      {name && (
        <div className="mt-auto flex items-center gap-3">
          {/* Every quote shows who said it: their photo, or their initials on
              one of the four suite gradients (never a plain grey disc). */}
          <Avatar className="size-12">
            {photo && <AvatarImage src={photo} alt={name} />}
            <AvatarFallback className={cn("font-semibold text-foreground", ILLUSTRATION_TONE[toneFor(name)])}>
              {initials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-semibold text-foreground">{name}</p>
            {role && <p className="text-sm text-muted-foreground">{role}</p>}
          </div>
        </div>
      )}
    </Card>
  )
}

export function TestimonialGrid({
  items = HOME_PROOF.testimonials.items,
  className,
}: {
  items?: readonly { quote: string; name: string; role: string; photo?: string }[]
  className?: string
}) {
  return (
    <ul data-slot="testimonial-grid" className={cn("grid gap-6 lg:grid-cols-3", className)}>
      {items.map((t) => (
        <li key={t.name}>
          <TestimonialCard quote={t.quote} name={t.name} role={t.role} photo={"photo" in t ? t.photo : undefined} />
        </li>
      ))}
    </ul>
  )
}

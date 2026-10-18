/**
 * Page blocks for the company pages (About, Careers, Newsroom, Customer
 * Stories): the pieces every one of them repeats, named once so the pages
 * read as one site with the homepage and product pages.
 *
 *   HeroChip    the hero's label: the homepage's outlined chip ("India's
 *               #1 hiring platform"). RULE: a hero never has an eyebrow,
 *               it has this chip; sections below keep gray eyebrows.
 *   PageHero    the opening band: the living backdrop, the chip, the h1 in
 *               the editorial serif, description, optional actions;
 *               `children` go under it
 *   StatGrid    numbers over their labels (value first visually, label
 *               first for screen readers)
 *   StackCard   one card of a ScrollStack, in the suite gradients by
 *               position (sky, green, plum, gold); a very large light
 *               watermark the copy reads over, or a picture on its left; an
 *               overline, an Inter title and the body
 *   StatementBand  a full-width band in the mother gradient carrying one
 *               serif statement (About's mission, Culture's closing line)
 *   ClosingBand a page's own closing card in the contact band's place and
 *               look (Join us: "Ready to make an impact?"); the layout's
 *               shared contact band steps aside for it
 *   PersonCard  a leader: initials, name, role, their own words, LinkedIn
 *
 * Pure layout over Section, SectionHeading, Card, Avatar and Button.
 */

import type { ReactNode } from "react"
import Image from "next/image"
import {
  ArrowUpRight,
  Badge,
  Button,
  Card,
  CheckCircle2,
  ScrollStackItem,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import type { Person } from "@/content/company"
import { CLIENT_LOGOS } from "@/content/logos"
import { ILLUSTRATION_TONE, type IllustrationTone } from "@/components/marketing/product-illustrations"
import { cn } from "@/lib/utils"

/** Sets one word of a headline in italic (`em`, styled by the editorial
 *  presets): "…talent and *opportunity*." Every hero headline has one. The
 *  accent never breaks inside itself ("high-intent" stays whole). */
export function withAccent(text: string, word?: string): ReactNode {
  if (!word || !text.includes(word)) return text
  const [before, after] = text.split(word)
  return (
    <>
      {before}
      <em className="whitespace-nowrap">{word}</em>
      {after}
    </>
  )
}

/** The hero's chip — the homepage hero's own (Badge lg, outline, on card). */
export function HeroChip({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <Badge size="lg" variant="outline" className="bg-card">
      {icon ?? <CheckCircle2 aria-hidden />}
      {children}
    </Badge>
  )
}

export function PageHero({
  eyebrow,
  icon,
  title,
  description,
  actions,
  children,
}: {
  /** The chip's label. */
  eyebrow: string
  /** The chip's icon — one that says what the label says (Trophy for "#1",
   *  Flag for "Founded", Heart for culture…). Defaults to a check. */
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="relative isolate">
      <HeroBackdrop />
      <Section size="lg" className="relative max-md:pt-8">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-8">
            <SectionHeading
              level={1}
              align="center"
              eyebrow={<HeroChip icon={icon}>{eyebrow}</HeroChip>}
              title={title}
              description={description}
            />
            {actions && <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>}
          </div>
          {children}
        </div>
      </Section>
    </div>
  )
}

/**
 * StatGrid — a row of numbers, anchored: one frosted card (the pages'
 * card language) with hairline dividers between the stats, each number
 * led by a short accent rule in the surface's product colour (gray on
 * company pages). Numbers are Inter, tabular. Phones: two columns with
 * the dividers between rows instead.
 */
export function StatGrid({
  stats,
  size = "default",
  tone,
  className,
}: {
  stats: readonly { value: string; label: string }[]
  /** "lg" for a page that is about its numbers (By the numbers) — bigger
   *  numbers on a lifted, gradient card; "facts"
   *  for short text values (a case study's client / industry / …): label
   *  first as an overline, the value in body weight. */
  size?: "default" | "lg" | "facts"
  /** With "lg": one of the suite gradients for the lifted card, so it
   *  doesn't repeat the hero's mother gradient. */
  tone?: IllustrationTone
  className?: string
}) {
  const facts = size === "facts"
  return (
    <Card
      padding="none"
      className={cn(
        "w-full",
        // "lg" is the page's subject, so it's lifted: the mother gradient
        // inside and the elevated shadow, not the frosted strip.
        size === "lg"
          ? cn("shadow-elevated", tone ? ILLUSTRATION_TONE[tone] : "bg-gradient-checkout-hero")
          : "surface-frosted shadow-card"
      )}
    >
      <dl
        className={cn(
          "grid grid-cols-2 divide-border sm:grid-cols-3 sm:divide-x",
          "max-sm:[&>*:nth-child(odd)]:border-r max-sm:[&>*:nth-child(n+3)]:border-t sm:[&>*:nth-child(n+4)]:border-t [&>*]:border-border",
          // An odd last stat on phones takes the full row (no empty cell).
          "max-sm:[&>*:last-child:nth-child(odd)]:col-span-2 max-sm:[&>*:last-child:nth-child(odd)]:border-r-0",
          className
        )}
      >
        {stats.map((stat) => (
          <div key={stat.label} className={cn("flex flex-col gap-2 p-5 sm:p-6 lg:p-8", size === "lg" && "lg:p-10")}>
            {!facts && <span aria-hidden className="h-1 w-8 rounded-full bg-product-accent" />}
            <dt className={cn("text-pretty", facts ? "text-overline text-muted-foreground" : "order-3 text-sm text-muted-foreground")}>
              {stat.label}
            </dt>
            <dd
              className={cn(
                facts
                  ? "text-base font-semibold text-pretty text-foreground"
                  : "order-2 font-heading text-h3 font-semibold whitespace-nowrap text-foreground tabular-nums sm:text-h2",
                size === "lg" && "sm:text-h1 lg:text-display"
              )}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}

/** Stacking cards take the four hiring-suite gradients in turn, in the
 *  suite's order — a deck always reads as one set (AGENTS.md). */
const STACK_TONES: IllustrationTone[] = ["sky", "green", "plum", "gold"]

export function StackCard({
  index,
  watermark,
  art,
  overline,
  title,
  children,
}: {
  /** The card's place in its deck: picks its gradient (sky, green, plum,
   *  gold, then round again). */
  index: number
  /** A very large, very light word or number behind the copy… */
  watermark?: string
  /** …or a picture (a 3D clay object) on the card's left, in its place. */
  art?: ReactNode
  overline: ReactNode
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <ScrollStackItem
      className={cn(
        "relative isolate overflow-hidden",
        ILLUSTRATION_TONE[STACK_TONES[index % STACK_TONES.length]]
      )}
    >
      {watermark && !art && (
        <span
          aria-hidden
          className="text-watermark pointer-events-none absolute -right-6 -bottom-10 -z-10 select-none lg:-bottom-16"
        >
          {watermark}
        </span>
      )}
      {art ? (
        // The picture in its own column on the left, centred in the card's
        // full height, straight on the card's gradient (no tile fill); the
        // copy right beside it. Phones: picture on top.
        <div className="grid gap-2 p-2 md:grid-cols-5">
          <div
            aria-hidden
            className="flex min-h-64 items-center justify-center p-6 md:col-span-2 md:min-h-96"
          >
            {art}
          </div>
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 md:col-span-3 lg:p-12">
            <span className="text-overline text-muted-foreground tabular-nums">{overline}</span>
            <h3 className="text-h3 text-balance text-foreground sm:text-h2">{title}</h3>
            {children}
          </div>
        </div>
      ) : (
        <div className="flex min-h-80 max-w-3xl flex-col justify-center gap-5 p-6 sm:p-10 lg:min-h-96 lg:p-14">
          <span className="text-overline text-muted-foreground tabular-nums">{overline}</span>
          <h3 className="text-h3 text-balance text-foreground sm:text-h2">{title}</h3>
          {children}
        </div>
      )}
    </ScrollStackItem>
  )
}

/** "01 / 04" — a stack card's place in its deck. */
export const deckPosition = (i: number, total: number) =>
  `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`

export function StatementBand({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** A button under the statement (a closing band's one action). */
  actions?: ReactNode
}) {
  return (
    <Section size="lg" className="bg-gradient-checkout-hero">
      <div className="flex flex-col items-center gap-8">
        <SectionHeading
          level={2}
          align="center"
          eyebrow={eyebrow && <span className="text-overline text-muted-foreground">{eyebrow}</span>}
          title={title}
          description={description}
        />
        {actions}
      </div>
    </Section>
  )
}

/**
 * PersonCard — a leader. Two shapes:
 *   "row"   (Leadership) a large portrait beside their own words in the
 *           serif quote voice, name, role, LinkedIn; `reverse` flips the
 *           sides so a list alternates
 *   "card"  (Management) portrait on top, name, role, a short bio, LinkedIn
 */
export function PersonCard({
  person,
  shape = "card",
  reverse = false,
}: {
  person: Person
  shape?: "row" | "card"
  reverse?: boolean
}) {
  const linkedIn = (
    <Button
      variant="link-inline"
      className="self-start"
      nativeButton={false}
      render={<a href={person.linkedin} target="_blank" rel="noreferrer noopener" />}
      trailingIcon={<ArrowUpRight aria-hidden />}
    >
      LinkedIn
    </Button>
  )

  if (shape === "row") {
    return (
      <article className="grid items-center gap-8 md:grid-cols-12 lg:gap-16">
        <Image
          src={person.photo}
          alt={person.name}
          width={560}
          height={700}
          className={cn(
            "aspect-4/5 w-full max-w-xs justify-self-center rounded-card object-cover shadow-card md:col-span-4 md:max-w-none",
            reverse && "md:order-last"
          )}
        />
        <div className="flex flex-col gap-6 md:col-span-8">
          <p className="text-quote text-pretty text-foreground sm:text-quote-md">&ldquo;{person.bio}&rdquo;</p>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-h5 text-foreground">{person.name}</h3>
            <p className="text-overline text-muted-foreground">{person.role}</p>
          </div>
          {linkedIn}
        </div>
      </article>
    )
  }

  return (
    <Card padding="none" className="h-full overflow-hidden">
      <Image
        src={person.photo}
        alt={person.name}
        width={480}
        height={600}
        className="aspect-4/5 w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-h6 text-foreground">{person.name}</h3>
          <p className="text-overline text-muted-foreground">{person.role}</p>
        </div>
        <p className="text-sm text-pretty text-muted-foreground">{person.bio}</p>
        <div className="mt-auto">{linkedIn}</div>
      </div>
    </Card>
  )
}

/** A company's logo where we have one (content/logos.ts), else its name. */
export function CompanyMark({ company }: { company: string }) {
  const logo = CLIENT_LOGOS.find((l) => l.name === company)
  if (!logo) return <span className="text-h5 text-foreground">{company}</span>
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={logo.src} alt={company} height={28} width={logo.width} className="brand-logo h-7 w-auto self-start" />
}

/** A page's own closing card, in the shared contact band's place and look —
 *  for the rare page where another action is the right ending (Join us:
 *  open roles). `data-closing-band` tells the marketing layout to skip the
 *  contact band on this page. */
export function ClosingBand({
  title,
  description,
  actions,
}: {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}) {
  return (
    <Section data-closing-band size="md" className="pb-0 md:pb-0">
      <Card padding="lg" className="surface-feature flex flex-col items-center gap-8 text-center sm:p-12">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-editorial-h2 text-balance text-foreground sm:text-editorial-h1">{title}</h2>
          {description && <p className="text-lead max-w-prose text-pretty text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </Card>
    </Section>
  )
}

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
 *   PersonCard  a leader: initials, name, role, their own words, LinkedIn
 *
 * Pure layout over Section, SectionHeading, Card, Avatar and Button.
 */

import type { ReactNode } from "react"
import {
  ArrowUpRight,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CheckCircle2,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import type { Person } from "@/content/company"
import { cn } from "@/lib/utils"

/** Sets one word of a headline in italic (`em`, styled by the editorial
 *  presets): "…talent and *opportunity*." */
export function withAccent(text: string, word?: string): ReactNode {
  if (!word || !text.includes(word)) return text
  const [before, after] = text.split(word)
  return (
    <>
      {before}
      <em>{word}</em>
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
  title,
  description,
  actions,
  children,
}: {
  /** The chip's label. */
  eyebrow: string
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
              eyebrow={<HeroChip>{eyebrow}</HeroChip>}
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
  className,
}: {
  stats: readonly { value: string; label: string }[]
  className?: string
}) {
  return (
    <Card padding="none" className="w-full border-card/60 bg-card/70 shadow-card backdrop-blur-xl">
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
          <div key={stat.label} className="flex flex-col gap-2 p-5 sm:p-6 lg:p-8">
            <span aria-hidden className="h-1 w-8 rounded-full bg-product-accent" />
            <dt className="order-3 text-sm text-pretty text-muted-foreground">{stat.label}</dt>
            <dd className="order-2 font-heading text-h3 font-semibold whitespace-nowrap text-foreground tabular-nums sm:text-h2">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  )
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

export function PersonCard({ person, quote = false }: { person: Person; quote?: boolean }) {
  return (
    <Card padding="lg" className="h-full gap-5">
      <div className="flex items-center gap-4">
        <Avatar className="size-14">
          <AvatarFallback className="text-base font-semibold">{initials(person.name)}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="text-h6 text-foreground">{person.name}</h3>
          <p className="text-sm text-muted-foreground">{person.role}</p>
        </div>
      </div>
      <p className={cn("text-sm text-muted-foreground text-pretty", quote && "text-base text-foreground")}>
        {quote ? <>&ldquo;{person.bio}&rdquo;</> : person.bio}
      </p>
      <Button
        variant="link-inline"
        className="mt-auto self-start"
        nativeButton={false}
        render={<a href={person.linkedin} target="_blank" rel="noreferrer noopener" />}
        trailingIcon={<ArrowUpRight aria-hidden />}
      >
        LinkedIn
      </Button>
    </Card>
  )
}

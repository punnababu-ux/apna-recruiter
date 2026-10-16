/**
 * Page blocks for the company pages (About, Careers, Newsroom, Customer
 * Stories): the pieces every one of them repeats, named once so the pages
 * read as one site with the homepage and product pages.
 *
 *   PageHero    the opening band: the living backdrop, eyebrow, h1,
 *               description, optional actions; `children` go under it
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
  Button,
  Card,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { HeroBackdrop } from "@/components/marketing/hero-backdrop"
import type { Person } from "@/content/company"
import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
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
              eyebrow={<span className="text-overline text-primary">{eyebrow}</span>}
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

export function StatGrid({
  stats,
  className,
}: {
  stats: readonly { value: string; label: string }[]
  className?: string
}) {
  return (
    <dl className={cn("grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
          <dd className="order-1 font-heading text-h3 font-semibold whitespace-nowrap text-foreground sm:text-h2">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
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

/**
 * /careers — Join us. Copy: content/company.ts CAREERS. The open roles live
 * on careers.apna.co: the hero's green button goes there, and the closing
 * card repeats it as the dark companion.
 */

import type { Metadata } from "next"
import { ArrowUpRight, Button, Card, Section, SectionHeading } from "@apna/design-system"
import { PageHero } from "@/components/marketing/page-blocks"
import { CAREERS } from "@/content/company"

export const metadata: Metadata = CAREERS.meta

const rolesLink = <a href={CAREERS.cta.href} target="_blank" rel="noreferrer noopener" />

export default function CareersPage() {
  const { eyebrow, title, description, body, cta, life, closing } = CAREERS
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <Button size="lg" nativeButton={false} render={rolesLink} trailingIcon={<ArrowUpRight aria-hidden />}>
            {cta.label}
          </Button>
        }
      />
      <Section tone="card" size="md">
        <div className="flex flex-col gap-12">
          <p className="mx-auto max-w-prose text-center text-lead text-pretty text-muted-foreground">{body}</p>
          <SectionHeading level={2} align="center" title={life.title} />
          <ul className="grid gap-6 md:grid-cols-3">
            {life.items.map((item) => (
              <li key={item.title}>
                <Card padding="lg" tone="muted" className="h-full gap-3">
                  <h3 className="text-h5 text-balance text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section size="md" className="pb-0 md:pb-0">
        <Card
          padding="lg"
          className="flex flex-col items-center gap-8 border-card/60 bg-card/60 text-center shadow-card backdrop-blur-xl sm:p-12"
        >
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-editorial-h2 text-balance text-foreground sm:text-editorial-h1">{closing.title}</h2>
            <p className="text-lead max-w-prose text-pretty text-muted-foreground">{closing.description}</p>
          </div>
          <Button
            variant="emphasis"
            size="lg"
            className="w-full sm:w-auto"
            nativeButton={false}
            render={rolesLink}
            trailingIcon={<ArrowUpRight aria-hidden />}
          >
            {cta.label}
          </Button>
        </Card>
      </Section>
    </>
  )
}

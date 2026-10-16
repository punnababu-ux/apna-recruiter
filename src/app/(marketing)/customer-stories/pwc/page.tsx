/** /customer-stories/pwc — PwC × apna CampusAI. Copy: content/company.ts STORY_PWC. */

import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Button,
  Card,
  CheckCircle2,
  Section,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero } from "@/components/marketing/page-blocks"
import { STORY_PWC } from "@/content/company"

export const metadata: Metadata = STORY_PWC.meta

export default function PwcStoryPage() {
  const { eyebrow, title, description, facts, headline, sections, solution, results, impact, closing } = STORY_PWC
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description}>
        <dl className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <Card key={fact.label} padding="md" className="gap-1">
              <dt className="text-overline text-muted-foreground">{fact.label}</dt>
              <dd className="text-base font-semibold text-foreground">{fact.value}</dd>
            </Card>
          ))}
        </dl>
      </PageHero>

      <Section tone="card" size="md" width="narrow">
        <article className="flex flex-col gap-12">
          <Button
            variant="link-inline"
            className="self-start"
            nativeButton={false}
            render={<Link href="/customer-stories" />}
            leadingIcon={<ArrowLeft aria-hidden />}
          >
            All customer stories
          </Button>

          <Card tone="ink" padding="lg" className="gap-2">
            <span className="font-heading text-display font-semibold">{headline.value}</span>
            <span className="text-lead text-ink-fg-muted">{headline.label}</span>
          </Card>

          {sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h2 className="text-h3 text-foreground">{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="text-lead text-pretty text-muted-foreground">{p}</p>
              ))}
            </section>
          ))}

          <section className="flex flex-col gap-4">
            <h2 className="text-h3 text-foreground">{solution.title}</h2>
            <p className="text-lead text-pretty text-muted-foreground">{solution.intro}</p>
            <ul className="flex flex-col gap-3">
              {solution.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span className="text-base text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-lead text-pretty text-muted-foreground">{solution.outro}</p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-h3 text-foreground">{results.title}</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  {results.columns.map((c) => (
                    <TableHead key={c}>{c}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.rows.map((row) => (
                  <TableRow key={row.metric}>
                    <TableCell className="whitespace-normal">{row.metric}</TableCell>
                    <TableCell className="font-semibold whitespace-normal">{row.outcome}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-h3 text-foreground">{impact.title}</h2>
            <p className="text-lead text-pretty text-muted-foreground">{impact.body}</p>
          </section>
        </article>
      </Section>

      <ContactSection title={closing.title} cta={closing.cta} />
    </>
  )
}

/** /customer-stories/pwc — PwC × apna CampusAI. Copy: content/company.ts STORY_PWC. */

import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Button,
  Card,
  CheckCircle2,
  GraduationCap,
  Section,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@apna/design-system"
import { ContactSection } from "@/components/marketing/contact-section"
import { PageHero, StatGrid } from "@/components/marketing/page-blocks"
import { STORY_PWC } from "@/content/company"

export const metadata: Metadata = STORY_PWC.meta

export default function PwcStoryPage() {
  const { eyebrow, title, description, facts, headline, sections, solution, results, impact, closing } = STORY_PWC
  return (
    <>
      <PageHero icon={<GraduationCap aria-hidden />} eyebrow={eyebrow} title={title} description={description} />

      {/* The campaign at a glance: one anchored card under the hero. */}
      <Section size="none" className="relative -mt-8 pb-8 md:-mt-12 md:pb-12">
        <StatGrid
          size="facts"
          stats={facts.map((f) => ({ label: f.label, value: f.value }))}
          className="lg:grid-cols-4 lg:[&>*]:border-t-0"
        />
      </Section>

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

          {/* The result, big, in the mother gradient (no dark band). */}
          <Card padding="none" className="gap-2 border-card/60 bg-gradient-checkout-hero p-8 shadow-card sm:p-10">
            <span className="text-display-lg font-heading text-foreground tabular-nums">{headline.value}</span>
            <span className="text-lead text-pretty text-muted-foreground">{headline.label}</span>
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
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden />
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

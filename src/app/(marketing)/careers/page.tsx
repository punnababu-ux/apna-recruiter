/**
 * /careers — Join us. Copy: content/company.ts CAREERS (Lovable "Join Us").
 *
 *   Hero     the chip, the serif headline, one paragraph (the hook and
 *            the pace), the green "See open roles" (careers.apna.co),
 *            the team's faces in an avatar row
 *   Life     "Life at apna" as the About story's stacking cards
 *   Closing  "Ready to make an impact?" as a statement band, the roles link
 *            again as the dark companion
 */

import type { Metadata } from "next"
import {
  ArrowUpRight,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Button,
  ScrollStack,
  Section,
  SectionHeading,
} from "@apna/design-system"
import { PageHero, StackCard, StatementBand, deckPosition } from "@/components/marketing/page-blocks"
import { ABOUT_LEADERSHIP, ABOUT_MANAGEMENT, CAREERS } from "@/content/company"

export const metadata: Metadata = CAREERS.meta

const TEAM = [...ABOUT_LEADERSHIP.people, ...ABOUT_MANAGEMENT.people]

const rolesLink = <a href={CAREERS.cta.href} target="_blank" rel="noreferrer noopener" />

export default function CareersPage() {
  const { eyebrow, title, description, body, cta, life, closing } = CAREERS
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={`${description} ${body}`}
        actions={
          <Button size="lg" nativeButton={false} render={rolesLink} trailingIcon={<ArrowUpRight aria-hidden />}>
            {cta.label}
          </Button>
        }
      >
        {/* The people you'd work with — real faces, no copy needed. */}
        <AvatarGroup className="-space-x-3">
          {TEAM.map((person) => (
            <Avatar key={person.name} className="size-12 sm:size-14">
              <AvatarImage src={person.photo} alt={person.name} className="object-cover" />
              <AvatarFallback>{person.name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
      </PageHero>

      <Section tone="card" size="md">
        <div className="flex flex-col gap-10">
          <SectionHeading level={2} align="center" title={life.title} />
          <ScrollStack>
            {life.items.map((item, i) => (
              <StackCard
                key={item.title}
                watermark={String(i + 1).padStart(2, "0")}
                overline={deckPosition(i, life.items.length)}
                title={item.title}
              >
                <p className="max-w-2xl text-lg leading-relaxed text-pretty text-foreground sm:text-xl">
                  {item.description}
                </p>
              </StackCard>
            ))}
          </ScrollStack>
        </div>
      </Section>

      <StatementBand
        title={closing.title}
        description={closing.description}
        actions={
          <Button
            variant="emphasis"
            size="lg"
            nativeButton={false}
            render={rolesLink}
            trailingIcon={<ArrowUpRight aria-hidden />}
          >
            {cta.label}
          </Button>
        }
      />
    </>
  )
}

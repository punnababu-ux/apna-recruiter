/**
 * /careers — Join us. Copy: content/company.ts CAREERS (Lovable "Join Us").
 *
 *   Hero     the chip, the serif headline, one paragraph (the hook and
 *            the pace), the green "See open roles" (careers.apna.co),
 *            the team's faces in an avatar row
 *   Life     "Life at apna" as stacking cards, each with its 3D clay object
 *   Closing  "Ready to make an impact?" as the Life band's sign-off, the
 *            roles link again as the dark companion
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
  Target,
} from "@apna/design-system"
import { ValueArt } from "@/components/marketing/value-art"
import { PageHero, StackCard, deckPosition } from "@/components/marketing/page-blocks"
import { ABOUT_LEADERSHIP, ABOUT_MANAGEMENT, CAREERS } from "@/content/company"

export const metadata: Metadata = CAREERS.meta

const TEAM = [...ABOUT_LEADERSHIP.people, ...ABOUT_MANAGEMENT.people]

const rolesLink = <a href={CAREERS.cta.href} target="_blank" rel="noreferrer noopener" />

export default function CareersPage() {
  const { eyebrow, title, description, body, cta, life, closing } = CAREERS
  return (
    <>
      <PageHero
        icon={<Target aria-hidden />}
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
        <AvatarGroup className="-space-x-2 sm:-space-x-3">
          {TEAM.map((person) => (
            <Avatar key={person.name} className="size-8 sm:size-14">
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
                index={i}
                art={<ValueArt name={item.art} />}
                overline={deckPosition(i, life.items.length)}
                title={item.title}
              >
                <p className="max-w-2xl text-lg leading-relaxed text-pretty text-foreground sm:text-xl">
                  {item.description}
                </p>
              </StackCard>
            ))}
          </ScrollStack>

          {/* The sign-off, in the same band under the last card: the
              question, its line, the roles link as the dark companion. */}
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-editorial-h2 text-balance text-foreground">{closing.title}</h2>
            <p className="text-lead max-w-prose text-pretty text-muted-foreground">{closing.description}</p>
            <Button
              variant="emphasis"
              size="lg"
              nativeButton={false}
              render={rolesLink}
              trailingIcon={<ArrowUpRight aria-hidden />}
            >
              {cta.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}

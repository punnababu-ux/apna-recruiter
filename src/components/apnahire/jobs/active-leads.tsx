"use client"

/**
 * A new job with no applications yet (ECC "Applied" tab, zero applicants):
 *
 *   FindingCandidates  says the job is out and applications are on the way.
 *   ActiveLeads        meanwhile, the database's closest matches for this job
 *                      ("active leads"): three profiles, then "+N more · View
 *                      all leads", the database credit balance, and what an
 *                      unlock costs. A profile opens it in the Database tab
 *                      (highlighted); View all opens the tab with active leads
 *                      on top. Unlocks cost database credits; applicants never
 *                      do (docs/DECISIONS.md, "applicants are free").
 *
 *   <FindingCandidates />
 *   <ActiveLeads leads={…} more={12} credits={12} onOpen={id => …} onViewAll={…} />
 */

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  avatarTone,
  Button,
  Card,
  ChevronRight,
  Sparkles,
  UserSearch,
} from "@apna/design-system"
import { ValueArt } from "@/components/marketing/value-art"
import { ActiveStatus } from "@/components/apnahire/active-status"
import { AvailableCreditsButton } from "@/components/apnahire/available-credits-button"

export type ActiveLead = {
  id: string
  name: string
  photo?: string
  role: string
  company?: string
  area: string
  experience: string
  salary: string
  activeAgo: string
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export function FindingCandidates() {
  return (
    <Card padding="none" className="flex flex-row items-center gap-4 p-4 md:p-5">
      <ValueArt name="database-search" size="xs" />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-base font-semibold text-foreground">Finding the right candidates</span>
        <p className="text-sm text-muted-foreground">
          We show your job to people who fit it. Their applications show here as they apply.
        </p>
      </div>
    </Card>
  )
}

export function ActiveLeads({
  leads,
  more,
  credits,
  onOpen,
  onViewAll,
}: {
  leads: ActiveLead[]
  /** Matches beyond the ones shown. */
  more: number
  /** Database credits left: each unlock uses one. */
  credits: number
  onOpen: (id: string) => void
  onViewAll: () => void
}) {
  return (
    <Card padding="none" className="flex flex-col gap-4 p-4 md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="flex items-center gap-1.5 text-base font-semibold text-foreground">
            <Sparkles aria-hidden className="size-4 text-info" />
            Active leads for this job
          </span>
          <p className="text-sm text-muted-foreground">
            While applications come in, unlock candidates from our database who match this job.
          </p>
        </div>
        {/* The express checkout's balance chip, so balances read one way
            everywhere; it opens the same "Available credits" panel. */}
        <AvailableCreditsButton chip kinds={["database"]} balance={{ database: credits }} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {leads.map((l) => (
          <Card
            key={l.id}
            padding="none"
            className="rounded-card-nested flex flex-col overflow-visible"
            onClick={() => onOpen(l.id)}
            role="button"
            aria-label={`Open ${l.name} in the database`}
          >
            <div className="flex items-center gap-3 rounded-t-card-nested border-b border-border bg-gradient-ai px-4 py-3">
              <Avatar>
                {l.photo && <AvatarImage src={l.photo} alt="" />}
                <AvatarFallback tone={avatarTone(l.name)}>{initials(l.name)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-semibold text-foreground">{l.name}</span>
                <ActiveStatus ago={l.activeAgo} />
              </div>
              <ChevronRight aria-hidden className="size-4 shrink-0 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-3 px-4 py-3 text-sm">
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-foreground">{l.role}</span>
                {l.company && <span className="text-muted-foreground">{l.company}</span>}
              </div>
              <div className="flex flex-col gap-0.5 text-muted-foreground">
                <span>{l.area}</span>
                <span>
                  {l.experience} · {l.salary}
                </span>
              </div>
            </div>
          </Card>
        ))}

        {more > 0 && (
          <Card padding="none" className="rounded-card-nested flex flex-col justify-between gap-4 p-4" onClick={onViewAll}>
            <div className="flex items-center gap-3">
              <AvatarGroup>
                {leads.slice(0, 3).map((l) => (
                  <Avatar key={l.id} size="sm">
                    {l.photo && <AvatarImage src={l.photo} alt="" />}
                    <AvatarFallback tone={avatarTone(l.name)}>{initials(l.name)}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <span className="text-sm font-semibold text-foreground">+{more} more</span>
            </div>
            <p className="text-sm text-muted-foreground">More people who match this job and are active now.</p>
            <Button variant="outline" size="lg" className="w-full">
              View all leads
            </Button>
          </Card>
        )}
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <UserSearch aria-hidden className="size-4" />1 database credit unlocks 1 profile
      </p>
    </Card>
  )
}

"use client"

/**
 * PhoneJobPage — a job's candidates, designed for the phone on its own terms
 * (/apnahire/jobs/[id], below md).
 *
 * The recruiter has a dialer in hand and is working down a list, so the page
 * is a calling queue, not a shrunken desktop table:
 *
 *   App bar       Back · job, status and place · search · ⋮
 *   Tabs          Applied | Database
 *   Queue         To call · Called · Shortlisted · Rejected, then Filters and Sort
 *   Card          who · facts · one AI line · a green Call and WhatsApp
 *   After a call  one question: Shortlist, Not a fit, or why it failed
 *   Profile       full screen, actions in thumb reach, Next
 *   No applicants the job is live, then a quiet list of database leads
 *
 * Decisions: docs/DECISIONS.md, "ECC on phones is its own product". A green
 * Call on every card follows the phone plan-card rule: a list of equal
 * choices, each with its own action.
 */

import * as React from "react"
import {
  ArrowUpDown,
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarTone,
  BackButton,
  Badge,
  Button,
  Card,
  Check,
  ChevronRight,
  ConversationList,
  ConversationRow,
  Database,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  FilterSheet,
  Input,
  MoreVertical,
  Phone,
  PhoneOff,
  RadioGroup,
  RadioGroupItem,
  Search,
  Sheet,
  SheetPanel,
  SheetPanelHeader,
  SlidersHorizontal,
  Sparkles,
  Tabs,
  TabsList,
  TabsTrigger,
  UserCheck,
  X,
  type FilterGroup,
} from "@apna/design-system"
import { WhatsAppIcon } from "@/components/onlyrounds/candidate-card"
import { ValueArt } from "@/components/marketing/value-art"
import { ActiveStatus } from "@/components/apnahire/active-status"
import { MatchBars } from "@/components/apnahire/match-bars"
import { MobileChipRow } from "@/components/apnahire/mobile-chip-row"
import { PlanPopup, PopupBody, PopupHeader } from "@/components/apnahire/plan-popup"
import { CandidateProfilePanel } from "@/components/apnahire/chats/candidate-profile-panel"
import type { ActiveLead } from "@/components/apnahire/jobs/active-leads"
import type { ApplicantStatus } from "@/components/apnahire/jobs/applicant-card"
import type { CallStatus } from "@/components/apnahire/jobs/contact-number"
import type { ChatThread, MatchLevel } from "@/content/chats"

export type PhoneCandidate = {
  id: string
  name: string
  phone?: string
  photo?: string
  level: MatchLevel
  activeAgo: string
  experience: string
  salary: string
  location: string
  met: number
  total: number
  missing: string[]
  status: ApplicantStatus
  callStatus?: CallStatus
}

const QUEUES: { value: ApplicantStatus; label: string; empty: string }[] = [
  { value: "pending", label: "To call", empty: "You have called everyone" },
  { value: "viewed", label: "Called", empty: "No calls yet" },
  { value: "shortlisted", label: "Shortlisted", empty: "No one shortlisted yet" },
  { value: "rejected", label: "Rejected", empty: "No one rejected" },
]

const CALL_LABEL: Record<CallStatus, string> = {
  answered: "Answered",
  "not-connected": "Did not pick up",
  invalid: "Wrong number",
}

const whatsappHref = (phone = "") => `https://wa.me/${phone.replace(/\D/g, "")}`

function whyLine(c: PhoneCandidate) {
  if (c.missing.length === 0) return `Meets all ${c.total} requirements`
  if (c.met === 0) return "Meets none of your requirements"
  return `Missing: ${c.missing.join(", ")}`
}

function CallActions({ candidate, size, onCall, children }: {
  candidate: PhoneCandidate
  size: "default" | "lg"
  onCall: () => void
  children?: React.ReactNode
}) {
  const first = candidate.status === "pending"
  return (
    <>
      <Button
        size={size}
        variant={first ? "default" : "outline"}
        className="min-w-0 flex-1"
        nativeButton={false}
        render={<a href={`tel:${candidate.phone ?? ""}`} />}
        onClick={onCall}
      >
        <Phone aria-hidden /> {first ? "Call" : "Call again"}
      </Button>
      {children}
      <Button
        variant="outline"
        size={size === "lg" ? "icon-lg" : "icon"}
        aria-label={`Message ${candidate.name} on WhatsApp`}
        nativeButton={false}
        render={<a href={whatsappHref(candidate.phone)} target="_blank" rel="noreferrer" />}
      >
        <WhatsAppIcon className="size-4 text-success" />
      </Button>
    </>
  )
}

function CandidateCard({ candidate: c, onOpen, onCall, onUpdate }: {
  candidate: PhoneCandidate
  onOpen: () => void
  onCall: () => void
  onUpdate: () => void
}) {
  return (
    // The name stretches over the card, so a tap anywhere opens the profile.
    // No lift: the card holds actions of its own.
    <Card padding="none" className="relative flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          {c.photo && <AvatarImage src={c.photo} alt="" />}
          <AvatarFallback tone={avatarTone(c.name)}>{c.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onOpen}
              className="min-w-0 truncate text-left text-base font-semibold text-foreground after:absolute after:inset-0 after:rounded-card"
            >
              {c.name}
            </button>
            <span className="shrink-0 text-xs text-muted-foreground">
              <MatchBars level={c.level} label />
            </span>
          </div>
          {c.callStatus ? (
            <span className="truncate text-xs text-muted-foreground">{CALL_LABEL[c.callStatus]}</span>
          ) : (
            <ActiveStatus ago={c.activeAgo} />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        <p className="truncate text-foreground">
          {c.experience}
          <span aria-hidden className="px-1.5 text-muted-foreground">•</span>
          {c.salary}
          <span aria-hidden className="px-1.5 text-muted-foreground">•</span>
          {c.location}
        </p>
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <Sparkles aria-hidden className="size-4 shrink-0 text-info" />
          <span className="truncate">{whyLine(c)}</span>
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-2">
        <CallActions candidate={c} size="default" onCall={onCall}>
          {c.status === "viewed" && (
            <Button variant="outline" onClick={onUpdate}>
              Update
            </Button>
          )}
        </CallActions>
      </div>
    </Card>
  )
}

function AfterCallSheet({ candidate, onClose, onCallStatus, onShortlist, onReject }: {
  candidate?: PhoneCandidate
  onClose: () => void
  onCallStatus: (id: string, v: CallStatus) => void
  onShortlist: (id: string) => void
  onReject: (id: string) => void
}) {
  if (!candidate) return <PlanPopup open={false} onOpenChange={onClose}>{null}</PlanPopup>
  const id = candidate.id
  const options = [
    { label: "Shortlist", icon: <Check aria-hidden className="text-success" />, act: () => (onCallStatus(id, "answered"), onShortlist(id)) },
    { label: "Not a fit", icon: <X aria-hidden className="text-destructive" />, act: () => (onCallStatus(id, "answered"), onReject(id)) },
    { label: "Did not pick up", icon: <PhoneOff aria-hidden className="text-warning" />, act: () => onCallStatus(id, "not-connected") },
    { label: "Wrong number", icon: <PhoneOff aria-hidden className="text-destructive" />, act: () => onCallStatus(id, "invalid") },
  ]
  return (
    <PlanPopup open onOpenChange={(o) => !o && onClose()}>
      <PopupHeader art="contact" title={`How did the call with ${candidate.name} go?`} />
      <PopupBody className="gap-2">
        {options.map((o) => (
          <Button
            key={o.label}
            variant="outline"
            size="lg"
            className="w-full justify-start"
            onClick={() => {
              o.act()
              onClose()
            }}
          >
            {o.icon} {o.label}
          </Button>
        ))}
      </PopupBody>
    </PlanPopup>
  )
}

function JustPosted({ leads, more, credits, onOpenLead, onViewAll }: {
  leads: ActiveLead[]
  more: number
  credits: number
  onOpenLead: (id: string) => void
  onViewAll: () => void
}) {
  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-safe-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <ValueArt name="database-search" size="sm" />
        <h2 className="text-h4 text-foreground">Your job is live</h2>
        <p className="text-sm text-muted-foreground">We will alert you when someone applies.</p>
      </div>
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <h3 className="flex items-center gap-1.5 text-base font-semibold text-foreground">
            <Sparkles aria-hidden className="size-4 text-info" />
            Active leads for this job
          </h3>
          <p className="text-sm text-muted-foreground">Candidates in our database who match your job. Reach them first.</p>
        </div>
        <Card padding="none" className="overflow-hidden">
          <ConversationList label="Active leads">
            {leads.map((l) => (
              <ConversationRow
                key={l.id}
                name={l.name}
                initial={l.name.charAt(0).toUpperCase()}
                avatarSrc={l.photo}
                preview={`${l.role} • ${l.experience}`}
                // Recency decides who is worth a database credit.
                status={<ActiveStatus ago={l.activeAgo} />}
                time=""
                render={<button type="button" onClick={() => onOpenLead(l.id)} />}
              />
            ))}
          </ConversationList>
        </Card>
        {more > 0 && (
          <Button variant="outline" size="lg" className="w-full" onClick={onViewAll}>
            View all {leads.length + more}
          </Button>
        )}
        <p className="text-center text-xs text-muted-foreground">
          1 database credit unlocks 1 profile. You have {credits}.
        </p>
      </section>
    </div>
  )
}

export function PhoneJobPage({
  title,
  status,
  place,
  appliedCount,
  databaseCount,
  rows,
  search,
  onSearch,
  filterGroups,
  filterCount,
  onClearFilters,
  sort,
  sorts,
  onSort,
  tab,
  onTab,
  leadId,
  onOpenLead,
  profile,
  noApplicants,
  leads,
  moreLeads,
  credits,
  onOpenDatabaseLead,
  onViewAllLeads,
  banner,
  database,
  onBack,
  onAbout,
  onCall,
  onCallStatus,
  onShortlist,
  onReject,
}: {
  title: string
  status: { label: string; variant: React.ComponentProps<typeof Badge>["variant"] }
  place?: string
  appliedCount: number
  databaseCount: number
  rows: PhoneCandidate[]
  search: string
  onSearch: (v: string) => void
  filterGroups: FilterGroup[]
  filterCount: number
  onClearFilters: () => void
  sort: string
  sorts: readonly string[]
  onSort: (v: string) => void
  tab: "applied" | "database"
  onTab: (v: "applied" | "database") => void
  leadId: string | null
  onOpenLead: (id: string | null) => void
  profile?: { thread: ChatThread; onAddNote: (text: string) => void }
  noApplicants: boolean
  leads: ActiveLead[]
  moreLeads: number
  credits: number
  onOpenDatabaseLead: (id: string) => void
  onViewAllLeads: () => void
  banner?: React.ReactNode
  database: React.ReactNode
  onBack: () => void
  onAbout: () => void
  onCall: (id: string) => void
  onCallStatus: (id: string, v: CallStatus) => void
  onShortlist: (id: string) => void
  onReject: (id: string) => void
}) {
  const [queue, setQueue] = React.useState<ApplicantStatus>("pending")
  const [searching, setSearching] = React.useState(false)
  const [filtersOpen, setFiltersOpen] = React.useState(false)
  const [sortOpen, setSortOpen] = React.useState(false)
  const [afterCallId, setAfterCallId] = React.useState<string | null>(null)

  const counts = (status: ApplicantStatus) => rows.filter((r) => r.status === status).length
  const shown = rows.filter((r) => r.status === queue)
  const narrowed = filterCount > 0 || search.trim() !== ""
  const afterCall = rows.find((r) => r.id === afterCallId)
  const current = rows.find((r) => r.id === leadId)
  // The current row stays in the walk after a decision moves it to another queue.
  const walk = rows.filter((r) => r.status === queue || r.id === leadId)
  const next = walk[walk.findIndex((r) => r.id === leadId) + 1]
  const call = (id: string) => {
    onCall(id)
    setAfterCallId(id)
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-sticky flex h-16 items-center gap-2 border-b border-border bg-card px-4">
        <BackButton onClick={onBack} />
        {searching ? (
          <>
            <Input
              autoFocus
              aria-label="Search by candidate name"
              placeholder="Search by name"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="h-9 min-w-0 flex-1 text-base"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close search"
              onClick={() => {
                onSearch("")
                setSearching(false)
              }}
            >
              <X />
            </Button>
          </>
        ) : (
          <>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h1 className="truncate text-base font-semibold text-foreground capitalize">{title}</h1>
              <div className="flex min-w-0 items-center gap-1.5">
                <Badge variant={status.variant} className="shrink-0">{status.label}</Badge>
                {place && <span className="truncate text-xs text-muted-foreground">{place}</span>}
              </div>
            </div>
            {tab === "applied" && !noApplicants && (
              <>
                <Button variant="ghost" size="icon-sm" aria-label="Search candidates" onClick={() => setSearching(true)}>
                  <Search />
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon-sm" aria-label="About this job" onClick={onAbout}>
              <MoreVertical />
            </Button>
          </>
        )}
      </header>

      <div className="bg-card">
        <Tabs value={tab} onValueChange={(v) => onTab(v as "applied" | "database")}>
          <TabsList variant="line" tone="checkout" className="w-full">
            <TabsTrigger value="applied"><UserCheck aria-hidden /> Applied ({appliedCount})</TabsTrigger>
            <TabsTrigger value="database"><Database aria-hidden /> Database ({databaseCount.toLocaleString("en-IN")})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {banner && <div className="px-4 pt-4">{banner}</div>}

      {tab === "database" ? (
        <div className="p-4">{database}</div>
      ) : noApplicants ? (
        <JustPosted leads={leads} more={moreLeads} credits={credits} onOpenLead={onOpenDatabaseLead} onViewAll={onViewAllLeads} />
      ) : (
        <main className="flex flex-1 flex-col gap-3 px-4 pt-3 pb-safe-6">
          <MobileChipRow
            items={QUEUES.map((q) => ({ value: q.value, label: `${q.label} (${counts(q.value)})` }))}
            value={queue}
            onValueChange={setQueue}
          />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal aria-hidden /> Filters
              {filterCount > 0 && <Badge variant="count">{filterCount}</Badge>}
            </Button>
            <Button variant="outline" size="sm" aria-label={`Sort candidates, ${sort}`} onClick={() => setSortOpen(true)}>
              <ArrowUpDown aria-hidden /> {sort}
            </Button>
          </div>
          {shown.length === 0 ? (
            <Card padding="none">
              <Empty>
                <EmptyMedia>
                  <ValueArt name="no-results" size="sm" />
                </EmptyMedia>
                <EmptyHeader>
                  <EmptyTitle className="text-lg font-semibold">
                    {narrowed ? "No candidates match" : QUEUES.find((q) => q.value === queue)?.empty}
                  </EmptyTitle>
                  {narrowed && <EmptyDescription>Try fewer filters or another name.</EmptyDescription>}
                </EmptyHeader>
                {narrowed && (
                  <Button
                    size="lg"
                    onClick={() => {
                      onClearFilters()
                      onSearch("")
                      setSearching(false)
                    }}
                  >
                    Clear all
                  </Button>
                )}
              </Empty>
            </Card>
          ) : (
            shown.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onOpen={() => onOpenLead(c.id)}
                onCall={() => call(c.id)}
                onUpdate={() => setAfterCallId(c.id)}
              />
            ))
          )}
        </main>
      )}

      <FilterSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filterGroups={filterGroups}
        onClearFilters={onClearFilters}
      />

      <PlanPopup open={sortOpen} onOpenChange={setSortOpen}>
        <PopupHeader title="Sort by" />
        <PopupBody className="gap-0">
          <RadioGroup
            aria-label="Sort by"
            value={sort}
            onValueChange={(v) => {
              onSort(v as string)
              setSortOpen(false)
            }}
            className="gap-0"
          >
            {sorts.map((s) => (
              <label key={s} className="flex h-11 cursor-pointer items-center gap-3 text-sm">
                <RadioGroupItem value={s} aria-label={s} />
                {s}
              </label>
            ))}
          </RadioGroup>
        </PopupBody>
      </PlanPopup>

      {current && profile && (
        <Sheet open={!!leadId} onOpenChange={(o) => !o && onOpenLead(null)}>
          <SheetPanel>
            <div className="bg-card py-3">
              <SheetPanelHeader title={current.name} action={<MatchBars level={current.level} label />} />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto bg-card">
              <CandidateProfilePanel key={current.id} thread={profile.thread} actions={<></>} hideWho onAddNote={profile.onAddNote} />
            </div>
            <div className="border-t border-border bg-card pb-safe">
              <div className="flex items-center gap-2 p-3">
                <CallActions candidate={current} size="lg" onCall={() => call(current.id)} />
                {next && (
                  <Button variant="outline" size="lg" onClick={() => onOpenLead(next.id)}>
                    Next <ChevronRight aria-hidden />
                  </Button>
                )}
              </div>
            </div>
          </SheetPanel>
        </Sheet>
      )}

      <AfterCallSheet
        candidate={afterCall}
        onClose={() => setAfterCallId(null)}
        onCallStatus={onCallStatus}
        onShortlist={onShortlist}
        onReject={onReject}
      />
    </div>
  )
}

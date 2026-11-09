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
 *   Queue         All · To call · Called · Shortlisted · Rejected (desktop's
 *                 All · Action pending · Viewed number · Shortlisted · Rejected),
 *                 with Sort and Filters fixed at the bottom of the screen
 *   Card          who · facts · one AI line · contact left (compact green Call,
 *                 WhatsApp), decide right (Reject, Shortlist icons); once
 *                 called, a button that shows the status and changes it
 *   After a call  one tap on a radio list, or Later to change nothing
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
  ChevronDown,
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
import { ActiveStatus, appliedAgo } from "@/components/apnahire/active-status"
import { CandidateFacts, useMetaIcons } from "@/components/apnahire/jobs/meta-fact"
import { MatchBars } from "@/components/apnahire/match-bars"
import { MobileChipRow } from "@/components/apnahire/mobile-chip-row"
import { PlanPopup, PopupBody, PopupFooter, PopupHeader } from "@/components/apnahire/plan-popup"
import { CandidateProfilePanel } from "@/components/apnahire/chats/candidate-profile-panel"
import { CandidateDeck, type DeckHandle } from "@/components/apnahire/jobs/candidate-deck"
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
  appliedDays: number
  experience: string
  salary: string
  location: string
  met: number
  total: number
  missing: string[]
  status: ApplicantStatus
  callStatus?: CallStatus
}

type Queue = ApplicantStatus | "all"

const QUEUES: { value: Queue; label: string; empty: string }[] = [
  { value: "all", label: "All", empty: "No candidates yet" },
  { value: "pending", label: "To call", empty: "You have called everyone" },
  { value: "viewed", label: "Called", empty: "No calls yet" },
  { value: "shortlisted", label: "Shortlisted", empty: "No one shortlisted yet" },
  { value: "rejected", label: "Rejected", empty: "No one rejected" },
]

/** What the recruiter can set after a call. One candidate, one status. */
export type CallOutcome = "shortlisted" | "rejected" | "not-connected"
const OUTCOMES: CallOutcome[] = ["shortlisted", "rejected", "not-connected"]

const STATUS_VIEW: Record<CallOutcome | "answered", { label: string; icon: React.ReactNode }> = {
  shortlisted: { label: "Shortlisted", icon: <Check aria-hidden className="size-4 text-success" /> },
  rejected: { label: "Rejected", icon: <X aria-hidden className="size-4 text-destructive" /> },
  "not-connected": { label: "Did not pick up", icon: <PhoneOff aria-hidden className="size-4 text-warning" /> },
  answered: { label: "Answered", icon: <Phone aria-hidden className="size-4 text-success" /> },
}

const outcomeOf = (c: PhoneCandidate): CallOutcome | undefined =>
  c.status === "shortlisted" || c.status === "rejected" ? c.status : c.callStatus === "not-connected" ? c.callStatus : undefined

const whatsappHref = (phone = "") => `https://wa.me/${phone.replace(/\D/g, "")}`

function whyLine(c: PhoneCandidate) {
  if (c.missing.length === 0) return `Meets all ${c.total} requirements`
  if (c.met === 0) return "Meets none of your requirements"
  return `Missing: ${c.missing.join(", ")}`
}

function WhatsAppButton({ candidate, size }: { candidate: PhoneCandidate; size: "icon" | "icon-lg" }) {
  return (
    <Button
      variant="outline"
      size={size}
      aria-label={`Message ${candidate.name} on WhatsApp`}
      nativeButton={false}
      render={<a href={whatsappHref(candidate.phone)} target="_blank" rel="noreferrer" />}
    >
      <WhatsAppIcon className="size-4 text-success" />
    </Button>
  )
}

function CallActions({ candidate, size, onCall }: {
  candidate: PhoneCandidate
  size: "default" | "lg"
  onCall: () => void
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
      <WhatsAppButton candidate={candidate} size={size === "lg" ? "icon-lg" : "icon"} />
    </>
  )
}

/** Contact left, decide right; once called, the status. Card and deck alike. */
function CandidateActions({ candidate: c, large, onCall, onUpdate, onOutcome }: {
  candidate: PhoneCandidate
  large?: boolean
  onCall: () => void
  onUpdate: () => void
  onOutcome: (v: CallOutcome) => void
}) {
  const shown = outcomeOf(c) ?? (c.callStatus === "answered" ? "answered" : undefined)
  const shownStatus = shown && STATUS_VIEW[shown]
  const size = large ? "lg" : "default"
  const icon = large ? "icon-lg" : "icon"
  if (c.status === "pending") {
    return (
      <>
        <Button size={size} nativeButton={false} render={<a href={`tel:${c.phone ?? ""}`} />} onClick={onCall}>
          <Phone aria-hidden /> Call
        </Button>
        <WhatsAppButton candidate={c} size={icon} />
        {/* Apart from Call, so a slip on Call can't reject someone. */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size={icon} aria-label={`Reject ${c.name}`} onClick={() => onOutcome("rejected")}>
            <X aria-hidden className="text-destructive" />
          </Button>
          <Button variant="outline" size={icon} aria-label={`Shortlist ${c.name}`} onClick={() => onOutcome("shortlisted")}>
            <Check aria-hidden className="text-success" />
          </Button>
        </div>
      </>
    )
  }
  return (
    <>
      {/* Shows the status and changes it, as desktop's call status menu does. */}
      <Button variant="outline" size={size} className="min-w-0 flex-1 justify-between" onClick={onUpdate}>
        <span className="flex min-w-0 items-center gap-1.5">
          {shownStatus?.icon}
          <span className="truncate">{shownStatus?.label ?? "Update status"}</span>
        </span>
        {/* Narrowest phones: the whole label matters more than the chevron. */}
        <ChevronDown aria-hidden className="text-muted-foreground @max-xs:hidden" />
      </Button>
      <Button
        variant="outline"
        size={icon}
        aria-label={`Call ${c.name} again`}
        nativeButton={false}
        render={<a href={`tel:${c.phone ?? ""}`} />}
        onClick={onCall}
      >
        <Phone aria-hidden />
      </Button>
      <WhatsAppButton candidate={c} size={icon} />
    </>
  )
}

function CandidateCard({ candidate: c, onOpen, onCall, onUpdate, onOutcome }: {
  candidate: PhoneCandidate
  onOpen: (e: React.MouseEvent<HTMLElement>) => void
  onCall: () => void
  onUpdate: () => void
  onOutcome: (v: CallOutcome) => void
}) {
  const icons = useMetaIcons()
  return (
    // The name stretches over the card, so a tap anywhere opens the profile,
    // and the ink shows it. No lift: the card holds actions of its own.
    <Card padding="none" className="@container ink press-subtle relative flex cursor-pointer flex-col gap-3 p-4">
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
          <ActiveStatus label="Applied" ago={appliedAgo(c.appliedDays)} clock={icons} />
        </div>
      </div>

      <div className="flex flex-col gap-1 text-sm">
        {icons ? (
          // The recruiter knows the job's city; the area is enough here.
          <CandidateFacts experience={c.experience} salary={c.salary} location={c.location.split(",")[0]} className="text-foreground" />
        ) : (
          <p className="truncate text-foreground">
            {c.experience}
            <span aria-hidden className="px-1.5 text-muted-foreground">•</span>
            {c.salary}
            <span aria-hidden className="px-1.5 text-muted-foreground">•</span>
            {c.location}
          </p>
        )}
        <p className="flex items-center gap-1.5 text-muted-foreground">
          <Sparkles aria-hidden className="size-4 shrink-0 text-info" />
          <span className="truncate">{whyLine(c)}</span>
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-2">
        <CandidateActions candidate={c} onCall={onCall} onUpdate={onUpdate} onOutcome={onOutcome} />
      </div>
    </Card>
  )
}

/** The sheet's rows answer the tap; the radio shows what is set. */
const SHEET_ROW = "ink relative flex h-11 cursor-pointer items-center gap-3 rounded-md text-sm transition-interactive"

function StatusSheet({ sheet, candidate, onClose, onOutcome }: {
  sheet: { justCalled: boolean } | null
  candidate?: PhoneCandidate
  onClose: () => void
  onOutcome: (id: string, v: CallOutcome) => void
}) {
  if (!sheet || !candidate) return <PlanPopup open={false} onOpenChange={onClose}>{null}</PlanPopup>
  return (
    <PlanPopup open onOpenChange={(o) => !o && onClose()}>
      <PopupHeader art="contact" title={`How did the call with ${candidate.name} go?`} />
      <PopupBody className="gap-0">
        <RadioGroup
          aria-label="Candidate status"
          value={outcomeOf(candidate) ?? ""}
          onValueChange={(v) => {
            onOutcome(candidate.id, v as CallOutcome)
            onClose()
          }}
          className="gap-0"
        >
          {OUTCOMES.map((v) => (
            <label key={v} className={SHEET_ROW}>
              {STATUS_VIEW[v].icon}
              {STATUS_VIEW[v].label}
              <RadioGroupItem value={v} aria-label={STATUS_VIEW[v].label} className="ml-auto" />
            </label>
          ))}
        </RadioGroup>
      </PopupBody>
      {sheet.justCalled && (
        <PopupFooter>
          {/* Answered but undecided, or not now: nothing changes. */}
          <Button variant="outline" size="lg" onClick={onClose}>
            Later
          </Button>
        </PopupFooter>
      )}
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
  deck,
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
  onOutcome,
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
  /** Preview: the expanded card instead of the full-screen profile. */
  deck?: { threadOf: (id: string) => ChatThread | undefined; addNote: (id: string, text: string) => void }
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
  onOutcome: (id: string, v: CallOutcome) => void
}) {
  // The page's job is who to call next; All once no one is left.
  const [queue, setQueue] = React.useState<Queue>(() => (rows.some((r) => r.status === "pending") ? "pending" : "all"))
  const [searching, setSearching] = React.useState(false)
  const [filtersOpen, setFiltersOpen] = React.useState(false)
  const [sortOpen, setSortOpen] = React.useState(false)
  const [sheet, setSheet] = React.useState<{ id: string; justCalled: boolean } | null>(null)

  const inQueue = (r: PhoneCandidate, q: Queue) => q === "all" || r.status === q
  const counts = (q: Queue) => rows.filter((r) => inQueue(r, q)).length
  const shown = rows.filter((r) => inQueue(r, queue))
  const narrowed = filterCount > 0 || search.trim() !== ""
  const sheetCandidate = rows.find((r) => r.id === sheet?.id)
  const current = rows.find((r) => r.id === leadId)
  // The current row stays in the walk after a decision moves it to another queue.
  const walk = rows.filter((r) => inQueue(r, queue) || r.id === leadId)
  const next = walk[walk.findIndex((r) => r.id === leadId) + 1]
  const call = (id: string) => {
    onCall(id)
    setSheet({ id, justCalled: true })
  }
  const deckHandle = React.useRef<DeckHandle>(null)
  const [deckFrom, setDeckFrom] = React.useState<number>()
  // Who the open card walks through stays put while decisions change queues.
  const [deckWalk, setDeckWalk] = React.useState<string[]>([])
  if (!leadId && deckWalk.length) setDeckWalk([])
  if (deck && leadId && !deckWalk.length && walk.length) setDeckWalk(walk.map((r) => r.id))
  const openCard = (e: React.MouseEvent<HTMLElement>, id: string) => {
    if (deck) setDeckFrom(e.currentTarget.getBoundingClientRect().top - 32)
    onOpenLead(id)
  }
  // With the card open, a decision from the call sheet flies it out too.
  const setStatus = (id: string, v: CallOutcome) => {
    if (leadId && deck && v !== "not-connected") deckHandle.current?.decide(id, v)
    else onOutcome(id, v)
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
        <main className="flex flex-1 flex-col gap-3 px-4 pt-3 pb-safe-20">
          <MobileChipRow
            items={QUEUES.map((q) => ({ value: q.value, label: `${q.label} (${counts(q.value)})` }))}
            value={queue}
            onValueChange={setQueue}
          />
          {narrowed && (
            <p className="text-sm text-muted-foreground">
              Showing {rows.length} of {appliedCount}
            </p>
          )}
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
                onOpen={(e) => openCard(e, c.id)}
                onCall={() => call(c.id)}
                onUpdate={() => setSheet({ id: c.id, justCalled: false })}
                onOutcome={(v) => onOutcome(c.id, v)}
              />
            ))
          )}
          {/* Reachable while scrolling a long list; the page has no bottom nav. */}
          <div className="fixed inset-x-0 bottom-0 z-sticky grid grid-cols-2 border-t border-border bg-card pb-safe">
            <Button variant="ghost" size="xl" className="min-w-0 rounded-none border-r-border px-2" aria-label={`Sort candidates, ${sort}`} onClick={() => setSortOpen(true)}>
              <ArrowUpDown aria-hidden /> <span className="truncate">{sort}</span>
            </Button>
            <Button variant="ghost" size="xl" className="min-w-0 rounded-none px-2" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal aria-hidden /> Filters
              {filterCount > 0 && <Badge variant="count">{filterCount}</Badge>}
            </Button>
          </div>
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
              <label key={s} className={SHEET_ROW}>
                {s}
                <RadioGroupItem value={s} aria-label={s} className="ml-auto" />
              </label>
            ))}
          </RadioGroup>
        </PopupBody>
      </PlanPopup>

      {deck && leadId && deckWalk.length > 0 && (
        <CandidateDeck
          rows={rows}
          walk={deckWalk}
          startId={leadId}
          fromY={deckFrom}
          handle={deckHandle}
          threadOf={deck.threadOf}
          onAddNote={deck.addNote}
          onClose={() => onOpenLead(null)}
          onDecide={onOutcome}
          actions={(id) => {
            const c = rows.find((r) => r.id === id)
            return c && (
              <CandidateActions
                candidate={c}
                large
                onCall={() => call(id)}
                onUpdate={() => setSheet({ id, justCalled: false })}
                onOutcome={(v) => setStatus(id, v)}
              />
            )
          }}
        />
      )}

      {!deck && current && profile && (
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

      <StatusSheet sheet={sheet} candidate={sheetCandidate} onClose={() => setSheet(null)} onOutcome={setStatus} />
    </div>
  )
}

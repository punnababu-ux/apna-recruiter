"use client"

/**
 * CandidateDetails — a job's candidate, read in full.
 * One order on desktop and phones: who, then Profile · Notes. The
 * host pins the actions in a footer, in the card's order: contact left,
 * decide right. Notes are written and read in one tab.
 *
 *   CandidateDetailsSheet   desktop: the side panel, with previous and next
 *   jobs/candidate-deck.tsx phones: the same content in the expanded card
 *
 * Decisions: docs/DECISIONS.md, "Candidate details rethink".
 */

import * as React from "react"
import { toast } from "sonner"
import {
  AlertTriangle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarTone,
  Badge,
  Button,
  Card,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Download as DownloadIcon,
  MapPin,
  FileText,
  Plus,
  Sheet,
  SheetPanel,
  SheetPanelHeader,
  Sparkles,
  Tabs,
  TabsList,
  TabsTrigger,
  Textarea,
  ThumbsDown,
  ThumbsUp,
  cn,
} from "@apna/design-system"
import { ActiveStatus } from "@/components/apnahire/active-status"
import { CandidateFacts, MetaFact, useMetaIcons } from "@/components/apnahire/jobs/meta-fact"
import { MatchBars } from "@/components/apnahire/match-bars"
import type { ChatThread } from "@/content/chats"

type Tab = "profile" | "notes"

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-h6 text-foreground">{title}</h3>
      {children}
    </section>
  )
}

function Points({ icon: Icon, items, iconClass }: { icon: typeof CircleCheck; items: string[]; iconClass: string }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((text) => (
        <li key={text} className="flex items-start gap-2 text-sm text-foreground">
          <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", iconClass)} />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <Badge key={s} variant="secondary">{s}</Badge>
      ))}
    </div>
  )
}

function AiFeedback() {
  return (
    <div className="flex items-center gap-1 max-md:hidden">
      <Button variant="ghost" size="icon-sm" aria-label="This AI match is helpful" onClick={() => toast("Thanks for your feedback")}>
        <ThumbsUp aria-hidden />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="This AI match is not helpful" onClick={() => toast("Thanks for your feedback")}>
        <ThumbsDown aria-hidden />
      </Button>
    </div>
  )
}

/** Fields are chosen in docs/DECISIONS.md, "Candidate profile fields". */
function ProfileTab({ thread }: { thread: ChatThread }) {
  const { profile, match } = thread
  const full = profile.full
  return (
    <div className="flex flex-col gap-6">
      <Section
        title={
          <span className="flex items-center gap-1.5">
            <Sparkles aria-hidden className="size-4 text-info" /> AI match
          </span>
        }
      >
        <Points icon={CircleCheck} items={match.strengths} iconClass="text-success" />
        {match.gaps.length > 0 && <Points icon={AlertTriangle} items={match.gaps} iconClass="text-destructive" />}
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground italic">This is AI-generated and can have mistakes</p>
          <AiFeedback />
        </div>
      </Section>
      {full?.hasResume && <ResumeRow />}
      {full && (
        <>
          <Section title="Work experience">
            <ul className="flex flex-col gap-3">
              {full.work.map((w) => (
                <li key={`${w.title}${w.dates}`} className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">{w.title}</span>
                  <span className="text-sm text-muted-foreground">{w.company}</span>
                  <span className="text-xs text-muted-foreground">
                    {w.dates} • {w.duration}{w.notice ? ` • ${w.notice}` : ""}
                  </span>
                  <span className="text-xs text-muted-foreground max-md:hidden">Role: {w.role} • Industry: {w.industry}</span>
                </li>
              ))}
            </ul>
          </Section>
          <Section title="Education">
            <ul className="flex flex-col gap-2 text-sm text-foreground">
              {/* Phones: the highest level is enough to decide. */}
              {full.education.map((e, i) => <li key={e} className={i > 0 ? "max-md:hidden" : undefined}>{e}</li>)}
            </ul>
          </Section>
        </>
      )}
      {profile.skills.length > 0 && <Section title="Skills"><Chips items={profile.skills} /></Section>}
      <Section title="Languages"><Chips items={profile.languages} /></Section>
      {full && (
        <>
          <Section title="Assets and documents"><Chips items={full.assets} /></Section>
          <Section title="Preferences"><Chips items={full.preferences} /></Section>
          <Section title="Personal details">
            {/* Desktop's header says gender and age; on phones they live here.
                Phones have Call and WhatsApp, so no email. */}
            <p className="text-sm text-foreground md:hidden">{full.gender} • {full.age}</p>
            <p className="text-sm break-words text-foreground max-md:hidden">{full.email}</p>
          </Section>
        </>
      )}
    </div>
  )
}

/** Desktop reads it in place. An embedded document is unreadable at phone width. */
function ResumeRow() {
  return (
    <Section title="Resume">
      <div className="flex gap-2">
        <Button variant="outline" size="lg" className="min-w-0 flex-1" onClick={() => toast.info("Opening the resume.")}>
          <FileText aria-hidden /> View resume
        </Button>
        <Button variant="outline" size="icon-lg" aria-label="Download resume" onClick={() => toast.info("Downloading the resume.")}>
          <DownloadIcon aria-hidden />
        </Button>
      </div>
    </Section>
  )
}

function NotesTab({ thread, onAddNote }: { thread: ChatThread; onAddNote: (text: string) => void }) {
  const [draft, setDraft] = React.useState("")
  const save = () => {
    if (!draft.trim()) return
    onAddNote(draft.trim())
    setDraft("")
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Textarea
          aria-label="Note about this candidate"
          placeholder="Write a note. Only you can see it."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="text-base md:text-sm"
        />
        <Button variant="outline" className="self-end" disabled={!draft.trim()} onClick={save}>
          <Plus aria-hidden /> Save note
        </Button>
      </div>
      {thread.notes.length > 0 && (
        <ul className="flex flex-col gap-3" aria-label="Notes">
          {thread.notes.map((n) => (
            <li key={n.id} className="flex flex-col gap-0.5">
              <span className="text-xs text-muted-foreground">{n.at}</span>
              <span className="text-sm text-foreground">{n.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CandidateDetails({ thread, onAddNote, leading }: {
  thread: ChatThread
  onAddNote: (text: string) => void
  /** In the photo's place: the phone's back button once the card is full screen. */
  leading?: React.ReactNode
}) {
  const [tab, setTab] = React.useState<Tab>("profile")
  const root = React.useRef<HTMLDivElement>(null)
  const { candidate, profile, match, notes } = thread
  const [genderAge] = candidate.meta.split(" · ")
  const salary = profile.expectedSalary ?? profile.currentSalary
  const icons = useMetaIcons()
  return (
    <div ref={root} data-slot="candidate-details" className="flex flex-col bg-card">
      {/* Who and the tabs stay in view while the profile scrolls. */}
      <div className="sticky top-0 z-10 bg-card">
      <div className="flex items-center gap-3 px-4 pt-4 pb-4">
        {leading ? (
          <div className="flex size-10 shrink-0 items-center">{leading}</div>
        ) : (
          <Avatar size="lg">
            {candidate.photo && <AvatarImage src={candidate.photo} alt="" />}
            <AvatarFallback tone={avatarTone(candidate.name)}>{candidate.initial}</AvatarFallback>
          </Avatar>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center justify-between gap-3">
            <span className="min-w-0 truncate text-base font-semibold text-foreground">{candidate.name}</span>
            <span className="shrink-0 text-xs text-muted-foreground"><MatchBars level={match.level} label /></span>
          </div>
          {/* Phones lead with what decides a call; age and gender sit in the profile. */}
          {icons ? (
            <>
              <CandidateFacts experience={profile.experience} salary={salary} className="text-muted-foreground md:hidden" />
              <CandidateFacts lead={genderAge} experience={profile.experience} salary={salary} className="text-muted-foreground max-md:hidden" />
              <p className="text-sm text-muted-foreground"><MetaFact icon={MapPin}>{profile.location}</MetaFact></p>
            </>
          ) : (
            <>
              <p className="truncate text-sm text-muted-foreground md:hidden">{profile.experience} • {salary}</p>
              <p className="text-sm text-muted-foreground max-md:hidden">{genderAge} • {profile.experience} • {salary}</p>
              <p className="truncate text-sm text-muted-foreground">{profile.location}</p>
            </>
          )}
          {/* Once full screen the header stays pinned, so it stays short. */}
          {!leading && profile.full && <ActiveStatus label="Applied" ago={profile.full.appliedAgo} clock={icons} />}
          {!leading && !profile.full && profile.activeAgo && <ActiveStatus ago={profile.activeAgo} />}
        </div>
      </div>
        <Tabs
          value={tab}
          onValueChange={(v) => {
            setTab(v as Tab)
            // A new tab starts at its top, not hidden under this header. Not 0:
            // on a phone that would also shrink the screen back to a card.
            const scroller = root.current?.closest<HTMLElement>(".overflow-y-auto")
            if (scroller && scroller.scrollTop > 9) scroller.scrollTop = 9
          }}
        >
          <TabsList variant="line" tone="checkout" className="w-full">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notes">Notes{notes.length > 0 ? ` (${notes.length})` : ""}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="p-4">
        {tab === "profile" && <ProfileTab thread={thread} />}
        {tab === "notes" && <NotesTab thread={thread} onAddNote={onAddNote} />}
      </div>
    </div>
  )
}

/** "3 of 24" with previous and next. The side panel and the deck share it. */
export function CandidateStepper({ position, total, onPrevious, onNext }: {
  position: number
  total: number
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="px-1 text-sm whitespace-nowrap text-muted-foreground">{position} of {total}</span>
      <Button variant="ghost" size="icon-sm" aria-label="Previous candidate" disabled={position <= 1} onClick={onPrevious}>
        <ChevronLeft aria-hidden />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Next candidate" disabled={position >= total} onClick={onNext}>
        <ChevronRight aria-hidden />
      </Button>
    </div>
  )
}

/**
 * The actions floating over the bottom of a desktop profile. The
 * host needs `relative`, and its scroller the PILL_ROOM padding, so the last
 * lines of the profile can scroll clear of the pill.
 */
const PILL_ROOM = "pb-32"

function ActionPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="@container pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
      <div className="pointer-events-auto w-fit max-w-full rounded-card border border-border bg-card p-2 shadow-elevated @2xl:rounded-full">
        {children}
      </div>
    </div>
  )
}

/** Desktop compact: the profile beside the list, always ending inside the window. */
export function CandidatePane({ thread, onAddNote, actions, floating }: {
  thread: ChatThread
  onAddNote: (text: string) => void
  actions: React.ReactNode
  floating?: boolean
}) {
  const pane = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = pane.current
    if (!el) return
    // Bars and banners above it move its top, so measure rather than assume.
    const fit = () => {
      el.style.height = `${window.innerHeight - el.getBoundingClientRect().top - 16}px`
    }
    fit()
    const seen = new ResizeObserver(fit)
    seen.observe(document.body)
    window.addEventListener("scroll", fit, { passive: true })
    window.addEventListener("resize", fit)
    return () => {
      seen.disconnect()
      window.removeEventListener("scroll", fit)
      window.removeEventListener("resize", fit)
    }
  }, [])
  return (
    <Card ref={pane} padding="none" className="relative sticky top-48 hidden min-w-0 flex-1 flex-col overflow-hidden lg:flex">
      <div className={cn("min-h-0 flex-1 overflow-y-auto", floating && PILL_ROOM)}>
        <CandidateDetails key={thread.id} thread={thread} onAddNote={onAddNote} />
      </div>
      {floating ? <ActionPill>{actions}</ActionPill> : <div className="shrink-0 border-t border-border p-4">{actions}</div>}
    </Card>
  )
}

export function CandidateDetailsSheet({ open, onOpenChange, thread, onAddNote, footer, floating, ...stepper }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  thread: ChatThread
  onAddNote: (text: string) => void
  footer: React.ReactNode
  floating?: boolean
} & React.ComponentProps<typeof CandidateStepper>) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetPanel>
        <div className="border-b border-border bg-card py-4">
          <SheetPanelHeader title="Candidate profile" action={<CandidateStepper {...stepper} />} />
        </div>
        <div className={cn("min-h-0 flex-1 overflow-y-auto bg-card", floating && PILL_ROOM)}>
          <CandidateDetails key={thread.id} thread={thread} onAddNote={onAddNote} />
        </div>
        {floating ? <ActionPill>{footer}</ActionPill> : <div className="border-t border-border bg-card p-4">{footer}</div>}
      </SheetPanel>
    </Sheet>
  )
}

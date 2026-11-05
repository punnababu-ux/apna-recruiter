"use client"

/**
 * CandidateProfilePanel — the right pane of the chats screen (HR-CRM style):
 * who the candidate is and how well they fit the job, beside the thread.
 * From xl (1280px) it is the third pane of ChatWorkspace; below xl the
 * thread header's Profile button opens the same panel in CandidateProfileSheet
 * (the app's right side panel, full screen on phones).
 *
 *   Match line    The sub-row under the pane's band: match Badge + score
 *   Profile row   Avatar · name · meta · match Badge (icon + label, never
 *                 colour alone) · Call and Add note. Call is a masked call
 *                 (PRD FR-10): a toast, no tel: link, so neither side sees
 *                 the other's number. Add note opens a Textarea under the
 *                 card; saved notes list newest first
 *   Sections      Flat on bg-card, split by Separator as the candidate
 *                 drawer does: Job match (Meter + score + level, "Why a good
 *                 match" with check icons, "Gaps" with alert icons), Skills,
 *                 Profile (IconLabel rows), Resume
 *   Resume        Locked: an explainer and the panel's one primary button,
 *                 "Unlock resume" with its database-credit cost. Unlocked:
 *                 an "Unlocked" Badge and a "View resume" outline button
 *
 * Scripted mock data: unlocking flips a flag in useChats; nothing leaves the
 * prototype.
 */

import * as React from "react"
import { toast } from "sonner"
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  CalendarClock,
  Check,
  CircleCheck,
  FileText,
  GraduationCap,
  IndianRupee,
  Languages,
  Lock,
  MapPin,
  Minus,
  Phone,
  Plus,
  Briefcase,
  Separator,
  Sheet,
  SheetPanel,
  SheetPanelHeader,
  StickyNote,
  Textarea,
  Unlock,
  Meter,
} from "@apna/design-system"
import { IconLabel } from "@/components/onlyrounds/shared"
import { useChats } from "@/hooks/apnahire/use-chats"
import { cn } from "@/lib/utils"
import { MATCH_LABEL, UNAVAILABLE_COPY, type ChatThread, type MatchLevel } from "@/content/chats"

/** Level → badge colour, meter colour and icon. The label always shows too. */
const LEVEL = {
  high: { badge: "success", tone: "default", icon: ArrowUp },
  medium: { badge: "warning", tone: "warning", icon: Minus },
  low: { badge: "destructive", tone: "destructive", icon: ArrowDown },
} as const satisfies Record<MatchLevel, { badge: string; tone: string; icon: unknown }>

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-h6 text-foreground">{children}</h3>
}

function PointList({ icon: Icon, items, iconClass }: { icon: typeof Check; items: string[]; iconClass: string }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((text) => (
        <li key={text} className="flex items-start gap-2 text-body-sm text-foreground">
          <Icon className={`mt-0.5 size-4 shrink-0 ${iconClass}`} aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

export function CandidateProfilePanel({ thread }: { thread: ChatThread }) {
  const { addNote, unlockResume } = useChats()
  const { candidate, profile, match, notes, resumeUnlocked } = thread
  const level = LEVEL[match.level]
  // Deleted or blocked: no call and no unlock; the reason shows under the buttons.
  const unavailable = candidate.availability ? UNAVAILABLE_COPY[candidate.availability] : undefined
  const [noting, setNoting] = React.useState(false)
  const [draft, setDraft] = React.useState("")

  const saveNote = () => {
    if (!draft.trim()) return
    addNote(thread.id, draft)
    setDraft("")
    setNoting(false)
  }

  const facts = [
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Briefcase, label: "Experience", value: profile.experience },
    { icon: GraduationCap, label: "Education", value: profile.education },
    { icon: Languages, label: "Languages", value: profile.languages.join(", ") },
    profile.currentSalary && { icon: IndianRupee, label: "Current salary", value: profile.currentSalary },
    profile.expectedSalary && { icon: IndianRupee, label: "Expected salary", value: profile.expectedSalary },
    { icon: CalendarClock, label: "Availability", value: profile.availability },
    { icon: Phone, label: "Phone", value: profile.phoneMasked },
  ].filter((f): f is { icon: typeof MapPin; label: string; value: string } => !!f)

  return (
    <div data-slot="candidate-profile-panel" className="flex flex-col bg-card">
      {/* The match line: the sub-row under the pane's band (h-14, as the list's
          and the thread's). The level is a label with an icon, never colour alone. */}
      <div className={cn("flex h-14 shrink-0 items-center gap-2 border-b border-border px-4")}>
        <Badge variant={level.badge}>
          <level.icon aria-hidden />
          {MATCH_LABEL[match.level]}
        </Badge>
        <span className="text-caption truncate text-muted-foreground">{match.score}% for {thread.job.title}</span>
      </div>

      {/* The profile row: the avatar sits at the same inset and size as the
          list rows' (px-4 py-3, Avatar lg), so the photos line up. */}
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            {candidate.photo && <AvatarImage src={candidate.photo} alt="" />}
            <AvatarFallback className="bg-accent text-accent-foreground">{candidate.initial}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-h6 truncate">{candidate.name}</span>
            <span className="text-caption text-muted-foreground">{candidate.meta}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            disabled={!!unavailable}
            aria-describedby={unavailable ? "call-unavailable" : undefined}
            onClick={() => toast.info("Connecting a masked call. Neither of you sees the other's number.")}
          >
            <Phone aria-hidden />
            Call
          </Button>
          <Button variant="outline" size="sm" className="flex-1" aria-expanded={noting} onClick={() => setNoting((v) => !v)}>
            <StickyNote aria-hidden />
            Add note
          </Button>
        </div>
        {unavailable && (
          <p className="text-caption text-muted-foreground" id="call-unavailable">
            {`${unavailable.reason} You can't call.`}
          </p>
        )}
      </div>

      {(noting || notes.length > 0) && (
        <div className="flex flex-col gap-3 border-b border-border px-4 py-3">
          {noting && (
            <div className="flex flex-col gap-2">
              <Textarea
                aria-label="Note about this candidate"
                placeholder="Write a note. Only you can see it."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setNoting(false)}>
                  Cancel
                </Button>
                <Button variant="outline" size="sm" disabled={!draft.trim()} onClick={saveNote}>
                  <Plus aria-hidden />
                  Save note
                </Button>
              </div>
            </div>
          )}
          {notes.length > 0 && (
            <ul className="flex flex-col gap-3" aria-label="Notes">
              {notes.map((n) => (
                <li key={n.id} className="flex flex-col gap-0.5">
                  <span className="text-caption text-muted-foreground">{n.at}</span>
                  <span className="text-body-sm text-foreground">{n.text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-3" aria-label="Job match">
          <SectionTitle>Job match</SectionTitle>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-h4">{match.score}%</span>
            <span className="text-caption inline-flex items-center gap-1 text-foreground">
              <level.icon className="size-3.5" aria-hidden />
              {MATCH_LABEL[match.level]}
            </span>
          </div>
          <Meter label={`Match score for ${thread.job.title}`} value={match.score} tone={level.tone} />
          <div className="flex flex-col gap-2">
            <span className="text-caption font-semibold text-foreground">Why a good match</span>
            <PointList icon={CircleCheck} items={match.strengths} iconClass="text-success" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-caption font-semibold text-foreground">Gaps</span>
            <PointList icon={AlertTriangle} items={match.gaps} iconClass="text-destructive" />
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-3" aria-label="Skills">
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-3" aria-label="Profile">
          <SectionTitle>Profile</SectionTitle>
          <dl className="flex flex-col gap-2.5">
            {facts.map(({ icon, label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <dt className="text-caption text-muted-foreground">
                  <IconLabel icon={icon}>{label}</IconLabel>
                </dt>
                <dd className="text-body-sm text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Separator />

        <section className="flex flex-col gap-3" aria-label="Resume">
          <div className="flex items-center justify-between gap-2">
            <SectionTitle>Resume</SectionTitle>
            {resumeUnlocked && (
              <Badge variant="success">
                <Check aria-hidden />
                Unlocked
              </Badge>
            )}
          </div>
          {resumeUnlocked ? (
            <Button variant="outline" onClick={() => toast.info("Opening the resume.")}>
              <FileText aria-hidden />
              View resume
            </Button>
          ) : (
            <>
              <p className="text-body-sm text-muted-foreground">
                <Lock className="mr-1 inline size-3.5 align-text-bottom" aria-hidden />
                Unlock the resume to see the full work history. It uses 1 database credit.
              </p>
              {unavailable && (
                <p className="text-caption text-muted-foreground" id="unlock-unavailable">
                  {`${unavailable.reason} You can't unlock the resume.`}
                </p>
              )}
              <Button
                disabled={!!unavailable}
                aria-describedby={unavailable ? "unlock-unavailable" : undefined}
                onClick={() => {
                  unlockResume(thread.id)
                  toast.success("Resume unlocked. 1 database credit used.")
                }}
              >
                <Unlock aria-hidden />
                Unlock resume · 1 credit
              </Button>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

/** The panel in the app's right side panel, below xl. Full screen on phones. */
export function CandidateProfileSheet({
  thread,
  open,
  onOpenChange,
}: {
  thread: ChatThread
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetPanel>
        <div className="bg-card py-4">
          <SheetPanelHeader title="Candidate profile" />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto bg-card">
          <CandidateProfilePanel thread={thread} />
        </div>
      </SheetPanel>
    </Sheet>
  )
}

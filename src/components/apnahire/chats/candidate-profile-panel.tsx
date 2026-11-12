"use client"

/**
 * CandidateProfilePanel — "Candidate 360", the right pane of the chats screen
 * (HR-CRM style): who the candidate is and why they fit the job, beside the
 * thread. From xl (1280px) it is the third pane of ChatWorkspace; below xl
 * the thread header's Profile button opens the same panel in
 * CandidateProfileSheet (the app's right side panel, full screen on phones).
 * Built to scan and act on, top-down: who, what to do, why, the rest.
 *
 *   Who           Avatar · name · meta in the sub-row under the pane's band
 *                 (h-14). The three panes' second bar is one context strip
 *                 (user call, 2026-11-05): the list's count and filters, the
 *                 thread's job, this candidate
 *   Actions       Directly under the person: Call and Add note. Call is a
 *                 masked call (PRD FR-10): a toast, no tel: link, so neither
 *                 side sees the other's number. Add note opens a Textarea
 *                 here. A deleted or blocked candidate's reason shows here
 *                 and Call is disabled
 *   Sections      An Accordion (several open at once), one heading style
 *                 (text-h6), one divider between items:
 *                 Why a match (open): the top 3 strengths (check icons) then
 *                 the top 2 gaps (alert icons); the rest behind "Show all N".
 *                 The score and the level are in the thread header, tied to
 *                 the job, so there is no meter or badge here.
 *                 Key facts (open): a two-column grid, label over value
 *                 Skills: Badges, 6 visible and "+N more"
 *                 Resume: locked = an explainer and the panel's one primary
 *                 button, "Unlock resume · 1 credit" (the cost is only on the
 *                 button); unlocked = a "View resume" outline button
 *                 Notes: newest first with their times; Add note opens it
 *
 * Scripted mock data: unlocking flips a flag in useChats; nothing leaves the
 * prototype.
 *
 * Also the job's leads profile (ECC, /apnahire/jobs/[id]): one profile for a
 * candidate in chats and in a job's list. That page passes `actions` (View
 * number · WhatsApp · Reject · Shortlist, in place of Call) and its own note
 * and unlock handlers, since its candidates aren't chat threads.
 */

import * as React from "react"
import { toast } from "sonner"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertTriangle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarTone,
  Badge,
  Button,
  CircleCheck,
  FileText,
  Phone,
  Plus,
  Sheet,
  SheetPanel,
  SheetPanelHeader,
  Sparkles,
  StickyNote,
  Textarea,
  Unlock,
  ChevronDown,
  ChevronUp,
} from "@apna/design-system"
import { useChats } from "@/hooks/apnahire/use-chats"
import { UNAVAILABLE_COPY, type ChatThread } from "@/content/chats"

/** Strengths and gaps shown before "Show all", and skills before "+N more". */
const TOP_STRENGTHS = 3
const TOP_GAPS = 2
const TOP_SKILLS = 6

/** One heading style for every section. */
const TRIGGER = "items-center py-3 text-h6 text-foreground hover:no-underline"

function PointList({ icon: Icon, items, iconClass }: { icon: typeof CircleCheck; items: string[]; iconClass: string }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((text) => (
        <li key={text} className="flex items-start gap-2 text-body-sm text-foreground">
          <Icon className={`mt-0.5 size-4 shrink-0 ${iconClass}`} aria-hidden />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

export function CandidateProfilePanel({
  thread,
  actions,
  onAddNote,
  onUnlockResume,
  hideWho,
}: {
  thread: ChatThread
  /** Replaces Call: the host's own actions for this candidate. */
  actions?: React.ReactNode
  onAddNote?: (text: string) => void
  onUnlockResume?: () => void
  /** The host already names the person (a phone profile's title bar). */
  hideWho?: boolean
}) {
  const chats = useChats()
  const addNote = (id: string, text: string) => (onAddNote ? onAddNote(text) : chats.addNote(id, text))
  const unlockResume = (id: string) => (onUnlockResume ? onUnlockResume() : chats.unlockResume(id))
  const { candidate, profile, match, notes, resumeUnlocked } = thread
  // Deleted or blocked: no call and no unlock; the reason shows under the buttons.
  const unavailable = candidate.availability ? UNAVAILABLE_COPY[candidate.availability] : undefined
  const [noting, setNoting] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const [open, setOpen] = React.useState<string[]>(["match", "facts", "resume"])
  const [allPoints, setAllPoints] = React.useState(false)
  const [allSkills, setAllSkills] = React.useState(false)

  const saveNote = () => {
    if (!draft.trim()) return
    addNote(thread.id, draft)
    setDraft("")
    setNoting(false)
    // The saved note shows in Notes: open it.
    setOpen((v) => (v.includes("notes") ? v : [...v, "notes"]))
  }

  const strengths = allPoints ? match.strengths : match.strengths.slice(0, TOP_STRENGTHS)
  const gaps = allPoints ? match.gaps : match.gaps.slice(0, TOP_GAPS)
  const hiddenPoints = match.strengths.length + match.gaps.length - strengths.length - gaps.length
  const skills = allSkills ? profile.skills : profile.skills.slice(0, TOP_SKILLS)
  const hiddenSkills = profile.skills.length - skills.length

  const facts = [
    profile.current && { label: "Current / latest", value: profile.current },
    { label: "Location", value: profile.location },
    { label: "Experience", value: profile.experience },
    profile.expectedSalary && { label: "Expected salary", value: profile.expectedSalary },
    profile.currentSalary && { label: "Current salary", value: profile.currentSalary },
    { label: "Availability", value: profile.availability },
    { label: "Languages", value: profile.languages.join(", ") },
    { label: "Education", value: profile.education },
    // Leads pass their own actions, which show the number once viewed.
    !actions && { label: "Phone", value: profile.phoneMasked },
    profile.activeAgo && { label: "Active", value: profile.activeAgo },
  ].filter((f): f is { label: string; value: string } => !!f)

  return (
    <div data-slot="candidate-profile-panel" className="flex flex-col bg-card">
      {/* Who: the pane's sub-row (h-14, as the list's and the thread's), so
          the three panes' second bar reads as one context strip: the
          list's count and filters, the thread's job, this candidate. */}
      <div className={hideWho ? "hidden" : "flex h-14 shrink-0 items-center gap-3 border-b border-border px-4"}>
        <Avatar size="lg">
          {candidate.photo && <AvatarImage src={candidate.photo} alt="" />}
          <AvatarFallback tone={avatarTone(candidate.name)}>{candidate.initial}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-h6 truncate">{candidate.name}</span>
          <span className="text-caption truncate text-muted-foreground">{candidate.meta}</span>
        </div>
      </div>

      {/* What to do: Call and Add note right under the person, then the
          reason they're off (deleted or blocked) and the note being written. */}
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3">
        {actions}
        <div className="flex gap-2">
          {!actions && (
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
          )}
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
      </div>

      <Accordion multiple value={open} onValueChange={setOpen} className="px-4">
        <AccordionItem value="match">
          <AccordionTrigger className={TRIGGER}>
            <span className="flex items-center gap-1.5">
              <Sparkles aria-hidden className="size-4 text-info" />
              AI match
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-col gap-3">
              <PointList icon={CircleCheck} items={strengths} iconClass="text-success" />
              {gaps.length > 0 && (
                <>
                  <span className="text-caption font-semibold text-foreground">Gaps</span>
                  <PointList icon={AlertTriangle} items={gaps} iconClass="text-destructive" />
                </>
              )}
              {(hiddenPoints > 0 || allPoints) && (
                <Button
                  variant="link"
                  size="sm"
                  className="self-start"
                  aria-expanded={allPoints}
                  trailingIcon={allPoints ? <ChevronUp aria-hidden /> : <ChevronDown aria-hidden />}
                  onClick={() => setAllPoints((v) => !v)}
                >
                  {allPoints ? "Show fewer" : `Show all ${match.strengths.length + match.gaps.length}`}
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="facts">
          <AccordionTrigger className={TRIGGER}>Key facts</AccordionTrigger>
          <AccordionContent className="pb-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
              {facts.map(({ label, value }) => (
                <div key={label} className="flex min-w-0 flex-col gap-0.5">
                  <dt className="text-caption text-muted-foreground">{label}</dt>
                  <dd className="text-body-sm font-medium break-words text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger className={TRIGGER}>Skills</AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {skills.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
              {(hiddenSkills > 0 || allSkills) && (
                <Button variant="link" size="sm" aria-expanded={allSkills} trailingIcon={allSkills ? <ChevronUp aria-hidden /> : <ChevronDown aria-hidden />} onClick={() => setAllSkills((v) => !v)}>
                  {allSkills ? "Show fewer" : `+${hiddenSkills} more`}
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="resume">
          <AccordionTrigger className={TRIGGER}>
            <span>Resume</span>
            {!resumeUnlocked && <span className="ml-2 text-caption font-normal text-muted-foreground">Locked</span>}
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex flex-col gap-3">
              {resumeUnlocked ? (
                <Button variant="outline" onClick={() => toast.info("Opening the resume.")}>
                  <FileText aria-hidden />
                  View resume
                </Button>
              ) : (
                <>
                  <p className="text-body-sm text-muted-foreground">Unlock the resume to see the full work history.</p>
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
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="notes">
          <AccordionTrigger className={TRIGGER}>
            <span>Notes</span>
            <span className="ml-2 text-caption font-normal text-muted-foreground">{notes.length}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            {notes.length > 0 ? (
              <ul className="flex flex-col gap-3" aria-label="Notes">
                {notes.map((n) => (
                  <li key={n.id} className="flex flex-col gap-0.5">
                    <span className="text-caption text-muted-foreground">{n.at}</span>
                    <span className="text-body-sm text-foreground">{n.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-body-sm text-muted-foreground">No notes yet. Add note saves one only you can see.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

/** The panel in the app's right side panel, below xl. Full screen on phones. */
export function CandidateProfileSheet({
  thread,
  open,
  onOpenChange,
  title = "Candidate 360",
  ...panel
}: {
  thread: ChatThread
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
} & Omit<React.ComponentProps<typeof CandidateProfilePanel>, "thread">) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetPanel>
        <div className="bg-card py-4">
          <SheetPanelHeader title={title} />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto bg-card">
          <CandidateProfilePanel thread={thread} {...panel} />
        </div>
      </SheetPanel>
    </Sheet>
  )
}

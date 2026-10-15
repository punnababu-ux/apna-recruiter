"use client"

/**
 * CandidateJobPreview — the job as a candidate sees it in the apna app,
 * rendered inside a PhoneFrame next to the review form so every edit shows
 * its effect immediately. Missing required fields render as quiet
 * placeholders rather than disappearing, so the recruiter can see what the
 * candidate would be missing.
 */

import * as React from "react"
import {
  ArrowLeft,
  Avatar,
  AvatarFallback,
  Badge,
  Bookmark,
  Briefcase,
  Clock,
  GraduationCap,
  IndianRupee,
  Languages,
  MapPin,
  PhoneFrame,
  Share2,
  Skeleton,
} from "@apna/design-system"
import {
  EDUCATION_LABELS,
  ENGLISH_LABELS,
  JOB_TYPE_LABELS,
  LOCATION_TYPE_LABELS,
  experienceLabel,
  locationLabel,
  companyName,
  salaryLabel,
} from "@/lib/apnahire/job-draft"
import { cn } from "@/lib/utils"
import type { JobPostDraft } from "@/types/apnahire-job"

/** While the AI is still drafting, empty fields shimmer instead of saying
 *  "not added" — they're on their way, not missing. */
const PreviewLoadingContext = React.createContext(false)

function Placeholder({ children }: { children: React.ReactNode }) {
  const loading = React.useContext(PreviewLoadingContext)
  if (loading) return <Skeleton variant="ai" inline className="h-3 w-28" />
  return <span className="italic text-muted-foreground">{children}</span>
}

function Description({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <div className="flex flex-col gap-1 text-xs leading-5 text-muted-foreground">
      {lines.map((line, i) =>
        line.startsWith("- ") ? (
          <p key={i} className="flex gap-1.5">
            <span aria-hidden>•</span>
            <span>{line.slice(2)}</span>
          </p>
        ) : line.trim() === "" ? (
          <span key={i} aria-hidden className="h-1" />
        ) : (
          <p key={i} className={cn(line.endsWith(":") && "font-semibold text-foreground")}>
            {line}
          </p>
        )
      )}
    </div>
  )
}

function Req({ label, preferred }: { label: string; preferred: boolean }) {
  return (
    <span>
      {label}
      {preferred && <span className="text-muted-foreground"> · preferred</span>}
    </span>
  )
}

const fmtDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export type PreviewSection = "top" | "description" | "requirements" | "interview"

function Section({ title, id, children }: { title: string; id?: PreviewSection; children: React.ReactNode }) {
  return (
    <section data-preview-section={id} className="flex flex-col gap-2 border-t border-border px-4 py-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </section>
  )
}

function Row({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-xs text-foreground">
      <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <span>{children}</span>
    </p>
  )
}

export function CandidateJobPreview({
  draft,
  loading = false,
  flashKey,
  focus,
}: {
  draft: JobPostDraft
  /** Drafting in progress — placeholders shimmer. */
  loading?: boolean
  /** Changing this replays a brief highlight over the screen (AI edits). */
  flashKey?: number
  /** Scrolls the phone screen to the part the recruiter is editing. */
  focus?: PreviewSection
}) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const root = rootRef.current
    const screen = root?.closest<HTMLElement>("[data-slot=phone-frame-screen]")
    if (!root || !screen) return
    const target = focus && focus !== "top" ? root.querySelector<HTMLElement>(`[data-preview-section="${focus}"]`) : null
    const top = target
      ? target.getBoundingClientRect().top - screen.getBoundingClientRect().top + screen.scrollTop - 8
      : 0
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    screen.scrollTo({ top, behavior: reduce ? "auto" : "smooth" })
  }, [focus])
  const salary = salaryLabel(draft)
  const location = locationLabel(draft)
  const experience = experienceLabel(draft)
  const tags = [
    draft.jobType && JOB_TYPE_LABELS[draft.jobType],
    draft.locationType && LOCATION_TYPE_LABELS[draft.locationType],
    experience,
    draft.english && ENGLISH_LABELS[draft.english],
    draft.nightShift && "Night shift",
    draft.relocation && "Relocation OK",
  ].filter(Boolean) as string[]

  return (
    <PreviewLoadingContext.Provider value={loading}>
      <PhoneFrame label="How candidates will see your job">
        <div ref={rootRef} key={flashKey} className={cn("flex min-h-full flex-col", flashKey ? "animate-ai-flash" : undefined)}>
          <div className="flex items-center justify-between px-4 pb-2 pt-4 text-foreground">
            <ArrowLeft className="size-5" aria-hidden />
            <div className="flex items-center gap-3">
              <Bookmark className="size-5" aria-hidden />
              <Share2 className="size-5" aria-hidden />
            </div>
          </div>

          <div className="flex flex-col gap-3 px-4 pb-3">
            <div className="flex items-center gap-3">
              <Avatar className="rounded-lg">
                <AvatarFallback className="rounded-lg">{companyName(draft)[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-foreground">
                  {draft.title || <Placeholder>Job title</Placeholder>}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {companyName(draft)}
                  {draft.industry && draft.industry !== "Other" && ` · ${draft.industry}`}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Row icon={MapPin}>{location ?? <Placeholder>Location not added</Placeholder>}</Row>
              <Row icon={IndianRupee}>
                {salary ? (
                  <span className="font-semibold">{salary} / month</span>
                ) : (
                  <Placeholder>Salary not added</Placeholder>
                )}
              </Row>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {draft.skills.length > 0 && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-1.5">
                {draft.skills.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </Section>
          )}

          <Section title="Job description" id="description">
            {draft.description.trim() ? (
              <Description text={draft.description} />
            ) : (
              <p className="text-xs">
                <Placeholder>Description not added</Placeholder>
              </p>
            )}
          </Section>

          <Section title="Requirements" id="requirements">
            <div className="flex flex-col gap-1.5">
              <Row icon={GraduationCap}>
                {draft.education ? (
                  <Req label={EDUCATION_LABELS[draft.education]} preferred={draft.strictness.education === "preferred"} />
                ) : (
                  <Placeholder>Education not set</Placeholder>
                )}
              </Row>
              <Row icon={Briefcase}>
                {experience ? (
                  <Req label={experience} preferred={draft.strictness.experience === "preferred"} />
                ) : (
                  <Placeholder>Experience not set</Placeholder>
                )}
              </Row>
              {draft.english && draft.english !== "none" && (
                <Row icon={Languages}>
                  <Req label={ENGLISH_LABELS[draft.english]} preferred={draft.strictness.english === "preferred"} />
                </Row>
              )}
              {draft.languages.length > 0 && <Row icon={Languages}>{draft.languages.join(", ")}</Row>}
              {draft.assets.length > 0 && <Row icon={Briefcase}>Must have: {draft.assets.join(", ")}</Row>}
            </div>
          </Section>

          {draft.perks.length > 0 && (
            <Section title="Perks">
              <div className="flex flex-wrap gap-1.5">
                {draft.perks.map((p) => (
                  <Badge key={p} variant="outline">
                    {p}
                  </Badge>
                ))}
              </div>
            </Section>
          )}

          {draft.screeningQuestions.length > 0 && (
            <Section title="You'll be asked when you apply">
              <ul className="flex flex-col gap-1.5">
                {draft.screeningQuestions.map((q) => (
                  <li key={q.id} className="flex items-start gap-1.5 text-xs text-foreground">
                    <span aria-hidden>•</span>
                    {q.question}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section title="Interview" id="interview">
            {draft.walkIn ? (
              <div className="flex flex-col gap-1.5">
                <Row icon={Clock}>
                  Walk-in
                  {draft.walkInDetails.startDate &&
                    ` · ${fmtDate(draft.walkInDetails.startDate)}${
                      draft.walkInDetails.endDate ? ` – ${fmtDate(draft.walkInDetails.endDate)}` : ""
                    }`}
                  {draft.walkInDetails.startTime && ` · ${draft.walkInDetails.startTime}–${draft.walkInDetails.endTime}`}
                </Row>
                {draft.walkInDetails.address && <Row icon={MapPin}>{draft.walkInDetails.address}</Row>}
              </div>
            ) : (
              <Row icon={Clock}>
                {draft.contact === "none"
                  ? "The recruiter will call you after you apply"
                  : "You can call or WhatsApp the recruiter after you apply"}
              </Row>
            )}
            {draft.joiningFee && draft.joiningFeeDetails.amount != null && (
              <p className="rounded-md bg-warning-subtle px-2 py-1.5 text-xs text-foreground">
                This job asks for a fee of ₹{draft.joiningFeeDetails.amount.toLocaleString("en-IN")}
              </p>
            )}
          </Section>

        </div>
      </PhoneFrame>
    </PreviewLoadingContext.Provider>
  )
}

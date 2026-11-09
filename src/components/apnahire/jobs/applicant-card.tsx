"use client"

/**
 * ApplicantCard — one candidate who applied to a job (ECC "Applied" tab),
 * as on live employer.apna.co (docs/reference/LIVE-EMPLOYER-KB.md §3).
 *
 *   header   initials, name › (the whole card opens the profile), match top right
 *   facts    gender, age · experience · expected salary · area
 *   matching "Meets N of M" + ticked chips, then "Missing: …"
 *   rows     Current / latest · Education (skills, languages in the profile)
 *   actions  ApplicantActions: View number (green; free: applicants are the
 *            job's own leads, no credit) · WhatsApp · Reject · Shortlist. Once decided, a status
 *            tag replaces Reject and Shortlist. The profile panel reuses it.
 *   footer   "Applied N days ago | Active …" · Add a note
 */

import * as React from "react"
import {
  Avatar,
  Briefcase,
  AvatarFallback,
  AvatarImage,
  avatarTone,
  Badge,
  Button,
  Card,
  Check,
  Checkbox,
  ChevronRight,
  GraduationCap,
  Phone,
  Sparkles,
  X,
} from "@apna/design-system"
import { cn } from "@/lib/utils"
import { WhatsAppIcon } from "@/components/onlyrounds/candidate-card"
import { CallStatusMenu, ContactNumber, type CallStatus } from "@/components/apnahire/jobs/contact-number"
import { MatchBars } from "@/components/apnahire/match-bars"
import { ActiveStatus } from "@/components/apnahire/active-status"
import type { MatchLevel } from "@/content/chats"

export type ApplicantProfile = {
  gender: string
  age: number
  experience: string
  salary: string
  location: string
  matching: string[]
  current?: string
  education?: string
  skills?: string[]
  languages: string
  activeAgo: string
}

/** The match chip's tint: level → the Badge's own tone (user call, 2026-11-06). */
const MATCH_TONE = { high: "success", medium: "warning", low: "destructive" } as const

export type ApplicantStatus = "pending" | "viewed" | "shortlisted" | "rejected"

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

export function ApplicantCard({
  name,
  phone,
  profile,
  match,
  requirements,
  photo,
  callStatus,
  onCallStatus,
  selected,
  onSelect,
  appliedDays,
  status,
  onOpen,
  onViewNumber,
  onReject,
  onShortlist,
}: {
  name: string
  phone?: string
  profile: ApplicantProfile
  match: { level: MatchLevel; score: number }
  /** Unused on the card now (the profile shows the resume); kept for callers. */
  resume?: boolean
  /** The job's key requirements; gives "Meets N of M" and what's missing. */
  requirements?: string[]
  photo?: string
  callStatus?: CallStatus
  onCallStatus?: (v: CallStatus) => void
  /** Bulk selection (Excel, WhatsApp). Shown when onSelect is passed. */
  selected?: boolean
  onSelect?: () => void
  appliedDays: number
  status: ApplicantStatus
  onOpen: () => void
  onViewNumber: () => void
  onReject: () => void
  onShortlist: () => void
}) {
  const facts = [`${profile.gender}, ${profile.age}`, profile.experience, profile.salary, profile.location]

  const applied = appliedDays <= 1 ? "Applied today" : `Applied ${appliedDays} days ago`

  // Four zones, read top to bottom (user call, 2026-11-06):
  //   1. who + how well   name, facts, recency · the match chip
  //   2. why              the requirement checklist, on a muted panel (text
  //                       with ticks, not outlined pills: pills read as buttons)
  //   3. background       latest job, education, with icons, no label column
  //   4. act              a bar under a rule: contact left, decision right
  // The name button stretches over the card (after:inset-0), so a click
  // anywhere opens the profile; actions sit above it (relative z-10). No
  // lift: the card holds several actions of its own (AGENTS.md).
  return (
    <Card padding="none" className="@container relative flex flex-col">
      <div className="flex flex-col gap-4 p-4 md:p-5">
        {/* 1. Who + how well */}
        <div className="flex items-start gap-3">
          {onSelect && (
            <Checkbox
              aria-label={`Select ${name}`}
              checked={!!selected}
              onCheckedChange={onSelect}
              className="relative z-10 mt-3"
            />
          )}
          <Avatar size="lg">
            {photo && <AvatarImage src={photo} alt="" />}
            <AvatarFallback tone={avatarTone(name)}>{initials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {/* Activity sits with the name: "who, and are they around?" is
                one glance (user call, 2026-11-06). */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <button
                type="button"
                onClick={onOpen}
                className="flex items-center gap-1 text-left text-base font-semibold text-foreground after:absolute after:inset-0 after:rounded-card hover:underline"
              >
                {name}
                <ChevronRight aria-hidden className="size-4 shrink-0 text-muted-foreground" />
              </button>
              <ActiveStatus ago={profile.activeAgo} />
            </div>
            {/* The • travels with the fact after it, so a wrapped line never ends on one. */}
            <p className="flex flex-wrap gap-x-2 text-sm text-foreground @max-3xl:hidden">
              {facts.map((f, i) => (
                <span key={f} className="whitespace-nowrap">
                  {i > 0 && <span aria-hidden className="pr-2 text-muted-foreground">•</span>}
                  {f}
                </span>
              ))}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <Badge variant={MATCH_TONE[match.level]} className="h-6 gap-1 px-2.5 text-xs font-semibold">
              <MatchBars level={match.level} label size="sm" />
            </Badge>
            {/* Level with the facts: the header stays two rows a side. */}
            <span className="text-xs whitespace-nowrap text-muted-foreground @max-3xl:hidden">{applied}</span>
          </div>
        </div>

        {/* A narrow card (phones, or the filter panel open): full width, two
            set lines, so facts never wrap beside the avatar (2026-11-08). */}
        <div className="flex flex-col gap-0.5 text-sm text-foreground @3xl:hidden">
          <p className="truncate">
            {facts.slice(0, 3).map((f, i) => (
              <React.Fragment key={f}>
                {i > 0 && <span aria-hidden className="px-1.5 text-muted-foreground">•</span>}
                {f}
              </React.Fragment>
            ))}
          </p>
          <p className="flex items-baseline justify-between gap-3">
            <span className="truncate">{profile.location}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{applied}</span>
          </p>
        </div>

        {/* 2. Why: the checklist */}
        {requirements && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-card-nested bg-gradient-ai px-4 py-3">
            {/* Live calls this "AI matching": keep the AI mark and name,
                and the profile's section title (user call, 2026-11-06). */}
            <span className="flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-foreground">
              <Sparkles aria-hidden className="size-4 text-info" />
              AI match
              <span className="font-regular text-muted-foreground">
                ({profile.matching.length}/{requirements.length})
              </span>
            </span>
            <ul className="contents text-sm">
              {requirements.map((r) => {
                const met = profile.matching.includes(r)
                return (
                  <li key={r} className={cn("flex items-center gap-1.5", met ? "text-foreground" : "text-muted-foreground")}>
                    {met ? (
                      <Check aria-hidden className="size-4 text-success" />
                    ) : (
                      <X aria-hidden className="size-4 text-destructive" />
                    )}
                    <span className={cn(!met && "line-through decoration-muted-foreground/50")}>{r}</span>
                    <span className="sr-only">{met ? "met" : "not met"}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* 3. Background. Skills and languages live in the profile. */}
        {(profile.current || profile.education) && (
          <ul className="flex flex-col gap-1.5 text-sm text-foreground">
            {profile.current && (
              <li className="flex items-start gap-2">
                <Briefcase aria-label="Current or latest job" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 max-md:truncate">{profile.current}</span>
              </li>
            )}
            {profile.education && (
              <li className="flex items-start gap-2">
                <GraduationCap aria-label="Education" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span className="min-w-0 max-md:truncate">{profile.education}</span>
              </li>
            )}
          </ul>
        )}
      </div>

      {/* 4. Act */}
      <div className="relative z-10 flex flex-col gap-3 border-t border-border px-4 py-3 md:px-5">
        <ApplicantActions
          name={name}
          phone={phone}
          status={status}
          callStatus={callStatus}
          onCallStatus={onCallStatus}
          onViewNumber={onViewNumber}
          onReject={onReject}
          onShortlist={onShortlist}
        />
      </div>
    </Card>
  )
}

/** The decision row: on the card and in the profile panel. */
export function ApplicantActions({
  name,
  phone,
  status,
  callStatus,
  onCallStatus,
  onViewNumber,
  onReject,
  onShortlist,
}: {
  name: string
  phone?: string
  status: ApplicantStatus
  callStatus?: CallStatus
  onCallStatus?: (v: CallStatus) => void
  onViewNumber: () => void
  onReject: () => void
  onShortlist: () => void
}) {
  const numberShown = status !== "pending"
  const decided = status === "shortlisted" || status === "rejected"
  return (
    <div className="flex flex-wrap items-center gap-2">
      {numberShown && phone ? (
        <ContactNumber name={name} phone={phone} />
      ) : (
        <Button size="sm" onClick={onViewNumber}>
          <Phone /> View number
        </Button>
      )}
      <Button
        variant="outline"
        size="icon-sm"
        aria-label={`Message ${name} on WhatsApp`}
        nativeButton={false}
        render={<a href={`https://wa.me/${(phone ?? "").replace(/\D/g, "")}`} target="_blank" rel="noreferrer" />}
      >
        <WhatsAppIcon className="size-4 text-success" />
      </Button>
      {numberShown && onCallStatus && !decided && <CallStatusMenu value={callStatus} onChange={onCallStatus} />}
      {/* Phones: the decision pair takes its own row in equal halves. */}
      {/* Once decided, phones keep call status and the outcome on one row. */}
      <div className={cn("flex items-center gap-2 max-sm:w-full", decided ? "max-sm:justify-between sm:contents" : "sm:ml-auto")}>
        {decided ? (
          <>
            {numberShown && onCallStatus && <CallStatusMenu value={callStatus} onChange={onCallStatus} />}
            <Badge variant={status === "shortlisted" ? "success" : "destructive"} className="sm:ml-auto">
              {status === "shortlisted" ? "Shortlisted" : "Rejected"}
            </Badge>
          </>
        ) : (
          <>
            {/* Neutral buttons, coloured icons: the match chip is the card's
                one tinted mark (user call, 2026-11-06). */}
            <Button variant="outline" size="sm" className="max-sm:flex-1" onClick={onReject}>
              <X aria-hidden className="text-destructive" /> Reject
            </Button>
            <Button variant="outline" size="sm" className="max-sm:flex-1" onClick={onShortlist}>
              <Check aria-hidden className="text-success" /> Shortlist
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

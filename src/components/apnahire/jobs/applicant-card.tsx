"use client"

/**
 * ApplicantCard — one candidate who applied to a job (ECC "Applied" tab),
 * as on live employer.apna.co (docs/live-employer-kb/README.md §3).
 *
 *   header   initials, name (opens the profile), match bars + score, "View profile"
 *   facts    gender, age · experience · expected salary · area
 *   matching the job requirements they meet, as ticked chips
 *   rows     Current / latest · Education · Skills · Languages
 *   actions  ApplicantActions: View number (green; costs a database credit
 *            on live) · WhatsApp · Reject · Shortlist. Once decided, a status
 *            tag replaces Reject and Shortlist. The profile panel reuses it.
 *   footer   "Applied N days ago | Active …" · Add a note
 */

import * as React from "react"
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  Check,
  ChevronRight,
  Phone,
} from "@apna/design-system"
import { WhatsAppIcon } from "@/components/onlyrounds/candidate-card"
import { MatchBars } from "@/components/apnahire/match-bars"
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

export type ApplicantStatus = "pending" | "viewed" | "shortlisted" | "rejected"

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    // Phones: label over value; from sm a fixed label column.
    <div className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-muted-foreground sm:w-28">{label}</dt>
      <dd className="min-w-0 text-foreground">{children}</dd>
    </div>
  )
}

export function ApplicantCard({
  name,
  phone,
  profile,
  match,
  resume,
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
  resume?: boolean
  appliedDays: number
  status: ApplicantStatus
  onOpen: () => void
  onViewNumber: () => void
  onReject: () => void
  onShortlist: () => void
}) {
  const facts = [`${profile.gender}, ${profile.age}`, profile.experience, profile.salary, profile.location]

  return (
    <Card padding="none" className="flex flex-col gap-4 p-4 md:p-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Avatar size="lg">
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <button type="button" onClick={onOpen} className="text-base font-semibold text-foreground hover:underline">
              {name}
            </button>
            <MatchBars level={match.level} score={match.score} className="text-sm text-muted-foreground" />
          </div>
          {/* The • travels with the fact after it, so a wrapped line never ends on one. */}
          <p className="flex flex-wrap gap-x-2 text-sm text-muted-foreground">
            {facts.map((f, i) => (
              <span key={f} className="whitespace-nowrap">
                {i > 0 && <span aria-hidden className="pr-2">•</span>}
                {f}
              </span>
            ))}
          </p>
        </div>
        <Button variant="link" size="sm" className="shrink-0 max-sm:hidden" onClick={onOpen}>
          {resume ? "View profile and resume" : "View profile"}
        </Button>
      </div>

      {/* Matching */}
      {profile.matching.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Matching:</span>
          {profile.matching.map((m) => (
            <Badge key={m} variant="outline">
              <Check className="text-success" /> {m}
            </Badge>
          ))}
        </div>
      )}

      {/* Details */}
      <dl className="flex flex-col gap-2">
        {profile.current && <Row label="Current / latest">{profile.current}</Row>}
        {profile.education && <Row label="Education">{profile.education}</Row>}
        {profile.skills && <Row label="Skills">{profile.skills.join(", ")}</Row>}
        <Row label="Languages">{profile.languages}</Row>
      </dl>

      <ApplicantActions name={name} phone={phone} status={status} onViewNumber={onViewNumber} onReject={onReject} onShortlist={onShortlist} />

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex flex-wrap gap-x-1">
          <span className="whitespace-nowrap">Applied {appliedDays <= 1 ? "today" : `${appliedDays} days ago`} |</span>
          <span className="whitespace-nowrap">Active {profile.activeAgo}</span>
        </span>
        <Button variant="link" size="sm" className="sm:hidden" onClick={onOpen}>
          View profile <ChevronRight />
        </Button>
        <Button variant="link" size="sm" className="max-sm:hidden" onClick={onOpen}>
          Add a note
        </Button>
      </div>
    </Card>
  )
}

/** The decision row: on the card and in the profile panel. */
export function ApplicantActions({
  name,
  phone,
  status,
  onViewNumber,
  onReject,
  onShortlist,
}: {
  name: string
  phone?: string
  status: ApplicantStatus
  onViewNumber: () => void
  onReject: () => void
  onShortlist: () => void
}) {
  const numberShown = status !== "pending"
  const decided = status === "shortlisted" || status === "rejected"
  return (
    <div className="flex flex-wrap items-center gap-2">
      {numberShown && phone ? (
        <Button variant="outline" size="sm" nativeButton={false} render={<a href={`tel:${phone}`} />}>
          <Phone /> {phone}
        </Button>
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
      {/* Phones: the decision pair takes its own row in equal halves. */}
      <div className="flex items-center gap-2 max-sm:w-full sm:ml-auto">
        {decided ? (
          <Badge variant={status === "shortlisted" ? "success" : "destructive"}>
            {status === "shortlisted" ? "Shortlisted" : "Rejected"}
          </Badge>
        ) : (
          <>
            <Button variant="destructive" size="sm" className="max-sm:flex-1" onClick={onReject}>
              Reject
            </Button>
            <Button variant="success" size="sm" className="max-sm:flex-1" onClick={onShortlist}>
              Shortlist
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

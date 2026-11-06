"use client"

/**
 * ApplicantTable — the "List" view of a job's leads (ECC): one row per
 * candidate, to scan and compare many at once. Tablet and up only; phones
 * use the detailed cards or the compact list.
 *
 *   Candidate · Match · Experience · Expected salary · Location ·
 *   Requirements met · Applied · Actions
 *
 * A row opens the shared profile (onOpen). Actions mirror the card's:
 * View number, then Reject / Shortlist, or the status once decided.
 * Rows come in the page's order; `sections` draws a section title
 * ("High matches · 3") above the first row of each level.
 */

import * as React from "react"
import {
  Badge,
  Button,
  Check,
  Phone,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  X,
} from "@apna/design-system"
import { ContactNumber } from "@/components/apnahire/jobs/contact-number"
import { MatchBars } from "@/components/apnahire/match-bars"
import type { ApplicantProfile, ApplicantStatus } from "@/components/apnahire/jobs/applicant-card"
import type { MatchLevel } from "@/content/chats"

export type ApplicantTableRow = {
  id: string
  name: string
  phone?: string
  profile: ApplicantProfile
  match: { level: MatchLevel; score: number }
  /** e.g. "4 of 4". */
  requirements: string
  applied: string
  status: ApplicantStatus
}

export function ApplicantTable({
  rows,
  sections,
  onOpen,
  onViewNumber,
  onReject,
  onShortlist,
}: {
  rows: ApplicantTableRow[]
  /** Row id → a section title drawn above it ("High matches · 3"). */
  sections?: Record<string, string>
  onOpen: (id: string) => void
  onViewNumber: (id: string) => void
  onReject: (id: string) => void
  onShortlist: (id: string) => void
}) {
  // A button in a row must not also open the profile.
  const act = (fn: (id: string) => void, id: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    fn(id)
  }
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-4">Candidate</TableHead>
            <TableHead>Match</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Expected salary</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Requirements met</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead className="pr-4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <React.Fragment key={r.id}>
              {sections?.[r.id] && (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={8} className="bg-muted py-2 pl-4 text-sm font-semibold text-foreground">
                    {sections[r.id]}
                  </TableCell>
                </TableRow>
              )}
              <TableRow className="cursor-pointer" onClick={() => onOpen(r.id)}>
                <TableCell className="pl-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">{r.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {r.profile.gender}, {r.profile.age}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <MatchBars level={r.match.level} label className="text-sm text-muted-foreground" />
                </TableCell>
                <TableCell className="text-sm">{r.profile.experience}</TableCell>
                <TableCell className="text-sm whitespace-nowrap">{r.profile.salary}</TableCell>
                <TableCell className="text-sm">{r.profile.location}</TableCell>
                <TableCell className="text-sm">{r.requirements}</TableCell>
                <TableCell className="text-sm whitespace-nowrap text-muted-foreground">{r.applied}</TableCell>
                <TableCell className="pr-4">
                  <div className="flex items-center justify-end gap-2">
                    {r.status === "pending" ? (
                      <Button size="sm" onClick={act(onViewNumber, r.id)}>
                        <Phone /> View number
                      </Button>
                    ) : (
                      r.phone && <ContactNumber name={r.name} phone={r.phone} />
                    )}
                    {r.status === "shortlisted" || r.status === "rejected" ? (
                      <Badge variant={r.status === "shortlisted" ? "success" : "destructive"}>
                        {r.status === "shortlisted" ? "Shortlisted" : "Rejected"}
                      </Badge>
                    ) : (
                      <>
                        <Button variant="outline" size="icon-sm" aria-label={`Reject ${r.name}`} onClick={act(onReject, r.id)}>
                          <X className="text-destructive" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={act(onShortlist, r.id)}>
                          <Check aria-hidden className="text-success" /> Shortlist
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

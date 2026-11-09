"use client"

/**
 * ApplicantTriageTable — a job's leads as a table: scan
 * many, compare, act in bulk. Each row offers only what its stage needs:
 *
 *   Contact   View number (the row's one green), then the number; WhatsApp
 *   Status    Action pending, Viewed number, the call's result, or the decision
 *
 * Columns read who, how good, how fresh, facts, where they stand, then act.
 * The action is right-aligned, so WhatsApp and ⋮ hold their place whether the
 * row shows View number or the number.
 *
 * Call status, Shortlist and Reject sit in the ⋮ menu; for many at once, the checkboxes
 * and the page's bulk bar. A row opens the shared profile.
 *
 * Decisions: docs/DECISIONS.md, "Desktop compact and table views".
 */

import * as React from "react"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Avatar,
  AvatarFallback,
  AvatarImage,
  avatarTone,
  Badge,
  Button,
  Check,
  Checkbox,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  MoreVertical,
  Phone,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  X,
} from "@apna/design-system"
import { CallStatusGroup, callStatusLabel, ContactNumber, type CallStatus } from "@/components/apnahire/jobs/contact-number"
import { WhatsAppIcon } from "@/components/onlyrounds/candidate-card"
import { MatchBars } from "@/components/apnahire/match-bars"
import { appliedAgo } from "@/components/apnahire/active-status"
import type { ApplicantStatus } from "@/components/apnahire/jobs/applicant-card"
import type { MatchLevel } from "@/content/chats"

export type TriageRow = {
  id: string
  name: string
  phone?: string
  photo?: string
  genderAge: string
  level: MatchLevel
  met: number
  total: number
  experience: string
  salary: string
  location: string
  appliedDays: number
  status: ApplicantStatus
  callStatus?: CallStatus
}

// Narrow screens scroll the table sideways; the contact action stays in reach.
const ACTION_CELL = "max-xl:sticky max-xl:right-0 max-xl:bg-card"

type SortKey = "experience" | "salary" | "appliedDays"

// shortcut: reads the number out of display strings; sort on real fields with an API.
const number = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0
const sortValue = (r: TriageRow, key: SortKey) => (key === "appliedDays" ? r.appliedDays : number(r[key]))

function SortHead({ label, column, sort, onSort }: {
  label: string
  column: SortKey
  sort: { key: SortKey; up: boolean } | null
  onSort: (key: SortKey) => void
}) {
  const on = sort?.key === column
  const Icon = !on ? ArrowUpDown : sort.up ? ArrowUp : ArrowDown
  return (
    <TableHead aria-sort={!on ? "none" : sort.up ? "ascending" : "descending"}>
      <Button variant="ghost" size="sm" className="-ml-3 text-muted-foreground" onClick={() => onSort(column)}>
        {label} <Icon aria-hidden />
      </Button>
    </TableHead>
  )
}

export function ApplicantTriageTable({
  rows,
  sections,
  picked,
  onPick,
  onPickAll,
  onOpen,
  onViewNumber,
  onCallStatus,
  onReject,
  onShortlist,
}: {
  rows: TriageRow[]
  /** Row id → a section title above it. Dropped while a column sorts the rows. */
  sections?: Record<string, string>
  picked: Set<string>
  onPick: (id: string) => void
  onPickAll: (on: boolean) => void
  onOpen: (id: string) => void
  onViewNumber: (id: string) => void
  onCallStatus: (id: string, v: CallStatus) => void
  onReject: (id: string) => void
  onShortlist: (id: string) => void
}) {
  const [sort, setSort] = React.useState<{ key: SortKey; up: boolean } | null>(null)
  const onSort = (key: SortKey) => setSort((s) => (s?.key === key ? { key, up: !s.up } : { key, up: true }))
  const shown = sort
    ? [...rows].sort((a, b) => (sortValue(a, sort.key) - sortValue(b, sort.key)) * (sort.up ? 1 : -1))
    : rows
  const stop = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 pl-4">
              <Checkbox
                aria-label="Select all candidates"
                checked={rows.length > 0 && rows.every((r) => picked.has(r.id))}
                indeterminate={rows.some((r) => picked.has(r.id)) && !rows.every((r) => picked.has(r.id))}
                onCheckedChange={(on) => onPickAll(!!on)}
              />
            </TableHead>
            <TableHead>Candidate</TableHead>
            <TableHead>Match</TableHead>
            <SortHead label="Applied" column="appliedDays" sort={sort} onSort={onSort} />
            <SortHead label="Experience" column="experience" sort={sort} onSort={onSort} />
            <SortHead label="Salary" column="salary" sort={sort} onSort={onSort} />
            <TableHead className="max-xl:hidden">Area</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className={cn("pr-12 text-right", ACTION_CELL)}>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shown.map((r) => {
            const decided = r.status === "shortlisted" || r.status === "rejected"
            const numberShown = r.status !== "pending"
            return (
              <React.Fragment key={r.id}>
                {!sort && sections?.[r.id] && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={9} className="bg-muted py-2 pl-4 text-sm font-semibold text-foreground">
                      {sections[r.id]}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow className="cursor-pointer" data-state={picked.has(r.id) ? "selected" : undefined} onClick={() => onOpen(r.id)}>
                  <TableCell className="pl-4" onClick={stop}>
                    <Checkbox aria-label={`Select ${r.name}`} checked={picked.has(r.id)} onCheckedChange={() => onPick(r.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {r.photo && <AvatarImage src={r.photo} alt="" />}
                        <AvatarFallback tone={avatarTone(r.name)}>{r.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col gap-0.5">
                        <span className="text-sm font-semibold text-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground">{r.genderAge}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                      <MatchBars level={r.level} /> <span>{r.met}/{r.total}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap text-muted-foreground">{r.appliedDays <= 1 ? "Today" : appliedAgo(r.appliedDays)}</TableCell>
                  <TableCell className="text-sm whitespace-nowrap">{r.experience}</TableCell>
                  <TableCell className="text-sm whitespace-nowrap">{r.salary}</TableCell>
                  <TableCell className="text-sm whitespace-nowrap max-xl:hidden">{r.location.split(",")[0]}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {decided ? (
                      <Badge variant={r.status === "shortlisted" ? "success" : "destructive"}>
                        {r.status === "shortlisted" ? "Shortlisted" : "Rejected"}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {r.callStatus ? callStatusLabel(r.callStatus) : numberShown ? "Viewed number" : "Action pending"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className={cn("pr-4", ACTION_CELL)} onClick={stop}>
                    <div className="flex items-center justify-end gap-2">
                      {!numberShown || !r.phone ? (
                        <Button size="sm" onClick={() => onViewNumber(r.id)}>
                          <Phone aria-hidden /> View number
                        </Button>
                      ) : (
                        <ContactNumber name={r.name} phone={r.phone} />
                      )}
                      {r.phone && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Message ${r.name} on WhatsApp`}
                          nativeButton={false}
                          render={<a href={`https://wa.me/${r.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" />}
                        >
                          <WhatsAppIcon className="size-4 text-success" />
                        </Button>
                      )}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${r.name}`} className="text-muted-foreground">
                            <MoreVertical aria-hidden />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        {/* A call can only be marked once the number is out. */}
                        {numberShown && <CallStatusGroup value={r.callStatus} onChange={(v) => onCallStatus(r.id, v)} />}
                        {numberShown && !decided && <DropdownMenuSeparator />}
                        {!decided && (
                          <>
                            <DropdownMenuItem onClick={() => onShortlist(r.id)}>
                              <Check aria-hidden className="text-success" /> Shortlist
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onReject(r.id)}>
                              <X aria-hidden className="text-destructive" /> Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

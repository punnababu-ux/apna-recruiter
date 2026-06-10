"use client"

import { ChevronLeft, ChevronRight, Info, Mic, Phone, Video } from "lucide-react"
import * as React from "react"

import { PageHeader } from "@/components/onlyrounds/page-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  SortableTableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  type SortDirection,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type Transaction = {
  id: string
  creditType: string
  credits: number
  transactionType: "Debit" | "Credit"
  entityType: string
  mandate: string
  lead: string
  minutes: number
  createdDate: string
  createdTime: string
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    creditType: "Audio",
    credits: 2,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "ats prod sanity",
    lead: "aditi multi creation 2",
    minutes: 6,
    createdDate: "14 May 2026",
    createdTime: "11:30 am",
  },
  {
    id: "tx-2",
    creditType: "Audio",
    credits: 4,
    transactionType: "Debit",
    entityType: "Screening assessment agent voice",
    mandate: "ewdd",
    lead: "Hardeep test failed parsing j",
    minutes: 15,
    createdDate: "30 Apr 2026",
    createdTime: "10:36 am",
  },
  {
    id: "tx-3",
    creditType: "Audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "Customer Support - Interview Call",
    lead: "Aditi Pal",
    minutes: 1,
    createdDate: "21 Apr 2026",
    createdTime: "5:54 pm",
  },
  {
    id: "tx-4",
    creditType: "Audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester - profile",
    lead: "chaitra",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "7:03 pm",
  },
  {
    id: "tx-5",
    creditType: "Audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Interview agent audio",
    mandate: "manual tester - download pdf",
    lead: "chaitra",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "6:51 pm",
  },
  {
    id: "tx-6",
    creditType: "Audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester - download pdf",
    lead: "chaitra",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "6:44 pm",
  },
  {
    id: "tx-7",
    creditType: "Audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening assessment agent voice",
    mandate: "manual tester - mic issue",
    lead: "cha",
    minutes: 3,
    createdDate: "17 Apr 2026",
    createdTime: "3:06 pm",
  },
  {
    id: "tx-8",
    creditType: "Audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester ravi hindi",
    lead: "chaitra_inbound",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "2:02 pm",
  },
  {
    id: "tx-9",
    creditType: "Audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester - isha hindi",
    lead: "chaitra_inbound",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "2:00 pm",
  },
  {
    id: "tx-10",
    creditType: "Outbound_audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester - isha hindi",
    lead: "chaitra_new_agent",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "1:38 pm",
  },
  {
    id: "tx-11",
    creditType: "Outbound_audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester ravi hindi",
    lead: "harsha_ravi_hindi_agent",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "1:29 pm",
  },
  {
    id: "tx-12",
    creditType: "Outbound_audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester ravi hindi",
    lead: "Hardeep",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "1:11 pm",
  },
  {
    id: "tx-13",
    creditType: "Audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester - isha hindi",
    lead: "Hardeep Singh",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "12:24 pm",
  },
  {
    id: "tx-14",
    creditType: "Outbound_audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester ravi hindi",
    lead: "ayra ravi hindi",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "12:21 pm",
  },
  {
    id: "tx-15",
    creditType: "Outbound_audio",
    credits: 1,
    transactionType: "Debit",
    entityType: "Screening agent audio",
    mandate: "manual tester - isha hindi",
    lead: "chaitra bankapur",
    minutes: 1,
    createdDate: "17 Apr 2026",
    createdTime: "12:14 pm",
  },
]

type SortKey = "creditType" | "credits" | "transactionType" | "entityType" | "mandate" | "lead" | "minutes" | "createdDate"

type ColumnWidths = Record<SortKey, number>

const MIN_WIDTH = 60
const DEFAULT_WIDTHS: ColumnWidths = {
  creditType: 110,
  credits: 80,
  transactionType: 140,
  entityType: 180,
  mandate: 220,
  lead: 180,
  minutes: 80,
  createdDate: 150,
}

export default function CreditsPage() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const [sortKey, setSortKey] = React.useState<SortKey | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDirection>(null)
  const [widths, setWidths] = React.useState<ColumnWidths>(DEFAULT_WIDTHS)

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return TRANSACTIONS
    const copy = [...TRANSACTIONS]
    copy.sort((a, b) => {
      let av = a[sortKey]
      let bv = b[sortKey]

      if (typeof av === "string" && typeof bv === "string") {
        av = av.toLowerCase()
        bv = bv.toLowerCase()
      }

      if (av < bv) return sortDir === "asc" ? -1 : 1
      if (av > bv) return sortDir === "asc" ? 1 : -1
      return 0
    })
    return copy
  }, [sortKey, sortDir])

  const setSort = (key: SortKey) => (next: SortDirection) => {
    if (!next) {
      setSortKey(null)
      setSortDir(null)
      return
    }
    setSortKey(key)
    setSortDir(next)
  }

  const resize = (key: SortKey) => (delta: number) => {
    setWidths((prev) => ({
      ...prev,
      [key]: Math.max(MIN_WIDTH, prev[key] + delta),
    }))
  }

  const sortFor = (key: SortKey): SortDirection =>
    sortKey === key ? sortDir : null

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col">
      {/* Page Header with Tab Switcher */}
      <PageHeader
        variant="transparent"
        className="px-6 pt-4"
        title="Credit Usage Dashboard"
        description="Track AI agent consumption across your recruitment funnel"
        tabs={
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList variant="inverted">
              <TabsTrigger value="dashboard">Credit Dashboard</TabsTrigger>
              <TabsTrigger value="history">Credit History</TabsTrigger>
            </TabsList>
          </Tabs>
        }
      />

      {/* Main Content Area */}
      <main className="flex-1 px-6 py-4 flex flex-col gap-6">
        {activeTab === "dashboard" ? (
          <>
            {/* Top-Level Credits Overview Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              
              {/* Audio Credits */}
              <div className="relative flex flex-col justify-between rounded-lg border border-border bg-card p-inset shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Mic className="size-4 text-muted-foreground" />
                      <span>Audio Credits</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">Activated</Badge>
                  </div>
                  <div className="mt-4 flex flex-col gap-1 border-b border-border pb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground">Used:</span>
                      <span className="text-2xl font-bold text-foreground">123</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground">Remaining:</span>
                      <span className="text-sm font-semibold text-muted-foreground">47</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <Badge variant="secondary" className="text-2xs font-semibold text-muted-foreground border-border">
                    4min = 1 credit
                  </Badge>
                </div>
              </div>

              {/* Video Credits */}
              <div className="relative flex flex-col justify-between rounded-lg border border-border bg-card p-inset shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Video className="size-4 text-muted-foreground" />
                      <span>Video Credits</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">Activated</Badge>
                  </div>
                  <div className="mt-4 flex flex-col gap-1 border-b border-border pb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground">Used:</span>
                      <span className="text-2xl font-bold text-foreground">21</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground">Remaining:</span>
                      <span className="text-sm font-semibold text-muted-foreground">30</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <Badge variant="secondary" className="text-2xs font-semibold text-muted-foreground border-border">
                    4min = 1 credit
                  </Badge>
                </div>
              </div>

              {/* Outbound Credits */}
              <div className="relative flex flex-col justify-between rounded-lg border border-border bg-card p-inset shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Phone className="size-4 text-muted-foreground" />
                      <span>Outbound Credits</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">Activated</Badge>
                  </div>
                  <div className="mt-4 flex flex-col gap-1 border-b border-border pb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground">Used:</span>
                      <span className="text-2xl font-bold text-foreground">40</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-muted-foreground">Remaining:</span>
                      <span className="text-sm font-semibold text-muted-foreground">110</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <Badge variant="secondary" className="text-2xs font-semibold text-muted-foreground border-border">
                    3min = 1 credit
                  </Badge>
                </div>
              </div>

            </div>

            {/* Screening Usage Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-lg font-bold text-foreground">Screening Usage</h2>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Credits consumed specifically for automated candidate screening processes.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Badge variant="outline" className="text-xs font-semibold px-3 py-1">
                  Screening Credits Used: 136
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                
                {/* Audio Screening Card */}
                <div className="rounded-lg border border-border bg-card p-inset shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Mic className="size-4" />
                    </div>
                    <Badge variant="secondary" className="text-2xs font-medium">Audio</Badge>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground font-medium">Credits Used</span>
                    <span className="text-2xl font-bold text-foreground">115</span>
                  </div>
                </div>

                {/* Video Screening Card */}
                <div className="rounded-lg border border-border bg-card p-inset shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Video className="size-4" />
                    </div>
                    <Badge variant="secondary" className="text-2xs font-medium">Video</Badge>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground font-medium">Credits Used</span>
                    <span className="text-2xl font-bold text-foreground">21</span>
                  </div>
                </div>

              </div>

              {/* Screening Warning/Note using library Alert banner */}
              <Alert className="bg-muted/30 border-border">
                <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground mr-1">Note:</span>
                  These are AI-powered screening calls. Credits are charged based on call duration for each screening type.
                </AlertDescription>
              </Alert>
            </div>

            {/* Interview Usage Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Interview Usage</h2>
                <Badge variant="outline" className="text-xs font-semibold px-3 py-1">
                  Interview Credits Used: 7
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                
                {/* Audio Interview Card */}
                <div className="rounded-lg border border-border bg-card p-inset shadow-2xs">
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
                    <Mic className="size-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Interview (Audio)</h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground font-medium">Credits Used</span>
                    <span className="text-2xl font-bold text-foreground">7</span>
                  </div>
                </div>

                {/* Video Interview Card */}
                <div className="rounded-lg border border-border bg-card p-inset shadow-2xs">
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
                    <Video className="size-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Interview (Video)</h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground font-medium">Credits Used</span>
                    <span className="text-2xl font-bold text-foreground">0</span>
                  </div>
                </div>

              </div>

              {/* Interview Warning/Note using library Alert banner */}
              <Alert className="bg-muted/30 border-border">
                <AlertDescription className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground mr-1">Note:</span>
                  These are AI-led interview rounds. Human rounds conducted by your team do not consume credits.
                </AlertDescription>
              </Alert>
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-border bg-card shadow-xs overflow-hidden">
            <Table className="table-fixed">
              <colgroup>
                <col style={{ width: widths.creditType }} />
                <col style={{ width: widths.credits }} />
                <col style={{ width: widths.transactionType }} />
                <col style={{ width: widths.entityType }} />
                <col style={{ width: widths.mandate }} />
                <col style={{ width: widths.lead }} />
                <col style={{ width: widths.minutes }} />
                <col style={{ width: widths.createdDate }} />
              </colgroup>
              <TableHeader>
                <TableRow>
                  <SortableTableHead
                    sort={sortFor("creditType")}
                    onSortChange={setSort("creditType")}
                    resizable
                    onResize={resize("creditType")}
                    className="pl-4"
                  >
                    Credit Type
                  </SortableTableHead>
                  <SortableTableHead
                    sort={sortFor("credits")}
                    onSortChange={setSort("credits")}
                    resizable
                    onResize={resize("credits")}
                  >
                    Credits
                  </SortableTableHead>
                  <SortableTableHead
                    sort={sortFor("transactionType")}
                    onSortChange={setSort("transactionType")}
                    resizable
                    onResize={resize("transactionType")}
                  >
                    Transaction Type
                  </SortableTableHead>
                  <SortableTableHead
                    sort={sortFor("entityType")}
                    onSortChange={setSort("entityType")}
                    resizable
                    onResize={resize("entityType")}
                  >
                    Entity Type
                  </SortableTableHead>
                  <SortableTableHead
                    sort={sortFor("mandate")}
                    onSortChange={setSort("mandate")}
                    resizable
                    onResize={resize("mandate")}
                  >
                    Mandate
                  </SortableTableHead>
                  <SortableTableHead
                    sort={sortFor("lead")}
                    onSortChange={setSort("lead")}
                    resizable
                    onResize={resize("lead")}
                  >
                    Lead
                  </SortableTableHead>
                  <SortableTableHead
                    sort={sortFor("minutes")}
                    onSortChange={setSort("minutes")}
                    resizable
                    onResize={resize("minutes")}
                    className="text-right"
                  >
                    Minutes
                  </SortableTableHead>
                  <SortableTableHead
                    sort={sortFor("createdDate")}
                    onSortChange={setSort("createdDate")}
                    resizable
                    onResize={resize("createdDate")}
                  >
                    Created Date
                  </SortableTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="truncate font-medium text-foreground pl-4">
                      {tx.creditType}
                    </TableCell>
                    <TableCell className="truncate text-foreground">{tx.credits}</TableCell>
                    <TableCell className="truncate">
                      <Badge variant="destructive" className="font-semibold rounded-md">
                        {tx.transactionType}
                      </Badge>
                    </TableCell>
                    <TableCell className="truncate text-muted-foreground">{tx.entityType}</TableCell>
                    <TableCell className="truncate text-muted-foreground">
                      {tx.mandate}
                    </TableCell>
                    <TableCell className="truncate text-muted-foreground">{tx.lead}</TableCell>
                    <TableCell className="truncate text-right text-foreground font-medium">
                      {tx.minutes}
                    </TableCell>
                    <TableCell className="truncate text-muted-foreground text-xs leading-normal">
                      <span className="font-medium text-foreground block">
                        {tx.createdDate}
                      </span>
                      <span className="text-2xs block">{tx.createdTime}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Table Footer / Pagination */}
            <div className="flex items-center justify-end gap-6 border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>Rows per page:</span>
                <span className="font-semibold text-foreground">20</span>
              </div>
              
              <div>
                <span>1–20 of 258</span>
              </div>

              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon-sm" disabled className="h-7 w-7">
                  <ChevronLeft className="size-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" className="h-7 w-7">
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

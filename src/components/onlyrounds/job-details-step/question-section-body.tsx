"use client"

import { Pencil, Plus, Sparkles, Trash2, Upload } from "@apna/design-system"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { QAItem, QuestionSection, QuestionSectionPreset } from "@/types/onlyrounds"
import { MAX_QA, useIdGen } from "@/components/onlyrounds/job-details-step/question-shared"
import type { Draft } from "@/components/onlyrounds/job-details-step/question-shared"

export function QuestionSectionBody({
  sectionId,
  sectionTitle,
  sectionTarget,
  items,
  onChange,
  jobTitle = "",
  jobJd = "",
  suggestedPresets,
}: {
  sectionId: string
  sectionTitle: string
  sectionTarget: QuestionSection["target"]
  items: QAItem[]
  onChange: (next: QAItem[]) => void
  jobTitle?: string
  jobJd?: string
  suggestedPresets?: QuestionSectionPreset[]
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [csvError, setCsvError] = React.useState<string | null>(null)
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [drafts, setDrafts] = React.useState<Draft[]>([])
  const nextDraftId = useIdGen(`draft-${sectionId}`)
  const nextQaId = useIdGen(`qs-qa-${sectionId}`)
  const nextCsvId = useIdGen(`qs-csv-${sectionId}`)
  const makeDraft = (): Draft => ({ key: nextDraftId(), question: "", answer: "" })

  const [suggestions, setSuggestions] = React.useState<{ question: string; answer: string }[] | null>(null)
  const [loadingSuggestions, setLoadingSuggestions] = React.useState(false)
  const [suggestError, setSuggestError] = React.useState<string | null>(null)

  const matchingPreset = suggestedPresets?.find(
    (p) => p.title.toLowerCase().trim() === sectionTitle.toLowerCase().trim()
  )
  const presetQuestions =
    matchingPreset?.questions && matchingPreset.questions.length > 0 ? matchingPreset.questions : null
  const [seededTitle, setSeededTitle] = React.useState<string | null>(null)
  if (presetQuestions && seededTitle !== sectionTitle) {
    setSeededTitle(sectionTitle)
    setSuggestions(presetQuestions)
  }

  const visibleSuggestions = React.useMemo(() => {
    if (!suggestions) return []
    return suggestions.filter(
      (s) =>
        !items.some(
          (item) =>
            item.question.toLowerCase().trim() ===
            s.question.toLowerCase().trim(),
        ),
    )
  }, [suggestions, items])

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true)
    setSuggestError(null)
    try {
      const res = await fetch("/api/onlyrounds/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          jd: jobJd,
          sectionTitle,
          targetAudience: sectionTarget,
          existingQuestions: items.map((it) => it.question),
        }),
      })
      if (!res.ok) throw new Error("Failed to fetch suggested questions.")
      const data = await res.json()
      if (data.error) {
        setSuggestError(data.error)
      } else {
        setSuggestions(data.questions || [])
      }
    } catch (err) {
      console.error("[fetchSuggestions]", err)
      setSuggestError("Something went wrong while generating suggestions.")
    } finally {
      setLoadingSuggestions(false)
    }
  }

  const atLimit = items.length >= MAX_QA
  const remaining = Math.max(0, MAX_QA - items.length - drafts.length)

  const openAdd = () => {
    if (atLimit) return
    setEditingId(null)
    setDrafts([makeDraft()])
    setEditorOpen(true)
  }

  const openEdit = (item: QAItem) => {
    setEditingId(item.id)
    setDrafts([
      { key: item.id, question: item.question, answer: item.answer },
    ])
    setEditorOpen(true)
  }

  const updateDraft = (key: string, patch: Partial<Omit<Draft, "key">>) => {
    setDrafts((ds) => ds.map((d) => (d.key === key ? { ...d, ...patch } : d)))
  }

  const removeDraft = (key: string) => {
    setDrafts((ds) => (ds.length <= 1 ? ds : ds.filter((d) => d.key !== key)))
  }

  const addAnotherDraft = () => {
    setDrafts((ds) => {
      if (items.length + ds.length >= MAX_QA) return ds
      return [...ds, makeDraft()]
    })
  }

  const saveDraft = () => {
    if (editingId) {
      const d = drafts[0]
      const q = d.question.trim()
      const a = d.answer.trim()
      if (!q && !a) {
        setEditorOpen(false)
        return
      }
      onChange(
        items.map((it) =>
          it.id === editingId ? { ...it, question: q, answer: a } : it,
        ),
      )
      setEditorOpen(false)
      return
    }
    const filled = drafts
      .map((d) => ({ question: d.question.trim(), answer: d.answer.trim() }))
      .filter((d) => d.question || d.answer)
    if (filled.length === 0) {
      setEditorOpen(false)
      return
    }
    onChange(
      [
        ...items,
        ...filled.map((d) => ({
          id: nextQaId(),
          question: d.question,
          answer: d.answer,
        })),
      ].slice(0, MAX_QA),
    )
    setEditorOpen(false)
  }

  const canAddAnother = !editingId && items.length + drafts.length < MAX_QA
  const removeAt = (id: string) => onChange(items.filter((q) => q.id !== id))

  const handleCsv = async (file: File) => {
    setCsvError(null)
    if (!/\.csv$/i.test(file.name)) {
      setCsvError("Upload a .csv file.")
      return
    }
    const text = await file.text()
    const rows = parseCsv(text)
    const body = rows[0]?.[0]?.toLowerCase()?.startsWith("question")
      ? rows.slice(1)
      : rows
    const parsed = body
      .filter((r) => r.length >= 2 && (r[0].trim() || r[1].trim()))
      .map((r) => ({
        id: nextCsvId(),
        question: r[0].trim(),
        answer: r[1].trim(),
      }))
    if (parsed.length === 0) {
      setCsvError("No rows parsed from the CSV.")
      return
    }
    if (items.length + parsed.length > MAX_QA)
      setCsvError(`Only the first ${MAX_QA} entries were kept.`)
    onChange([...items, ...parsed].slice(0, MAX_QA))
  }

  return (
    <div className="flex flex-col gap-3">
      {items.length > 0 ? (
        <ul className="flex flex-col divide-y divide-border rounded-md border border-border bg-card">
          {items.map((item, idx) => (
            <li key={item.id} className="flex items-center gap-3 px-3 py-2">
              <span className="w-6 shrink-0 text-xs font-medium text-muted-foreground">
                {idx + 1}.
              </span>
              <button
                type="button"
                onClick={() => openEdit(item)}
                className="min-w-0 flex-1 cursor-pointer text-left text-sm"
              >
                <span className="block truncate font-medium">
                  {item.question || (
                    <span className="italic text-muted-foreground">
                      (empty question)
                    </span>
                  )}
                </span>
                {item.answer ? (
                  <span className="block truncate text-xs text-muted-foreground">
                    {item.answer}
                  </span>
                ) : null}
              </button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Edit question"
                onClick={() => openEdit(item)}
              >
                <Pencil className="size-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Remove question"
                onClick={() => removeAt(item.id)}
              >
                <Trash2 className="size-3" />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-3 items-start p-4 rounded-md border border-dashed border-border bg-muted/10">
          <p className="text-xs text-muted-foreground">
            No questions in this section yet. Add a question manually, upload a CSV, or let AI suggest questions tailored to your job description.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={openAdd}
          disabled={atLimit}
        >
          <Plus className="size-3.5" />
          Add question
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={atLimit}
        >
          <Upload className="size-3.5" />
          Upload CSV
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          loading={loadingSuggestions}
          onClick={fetchSuggestions}
          disabled={atLimit}
        >
          {!loadingSuggestions && <Sparkles className="size-3.5 text-primary" />}
          Suggest questions
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleCsv(f)
            e.currentTarget.value = ""
          }}
        />
        <span
          className={cn(
            "ml-auto text-xs text-muted-foreground",
            atLimit && "text-warning",
          )}
        >
          {items.length} / {MAX_QA}
        </span>
      </div>

      {csvError ? (
        <p className="text-xs text-destructive">{csvError}</p>
      ) : null}

      {suggestError ? (
        <p className="text-xs text-destructive">{suggestError}</p>
      ) : null}

      {/* Skeletons while loading */}
      {loadingSuggestions ? (
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton variant="ai" className="h-16 w-full" />
          <Skeleton variant="ai" className="h-16 w-full" />
          <Skeleton variant="ai" className="h-16 w-full" />
        </div>
      ) : null}

      {/* Suggestions block */}
      {!loadingSuggestions && visibleSuggestions.length > 0 ? (
        <div className="mt-2 rounded-md border border-border bg-muted/30 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1">
              <Sparkles className="size-3 text-primary" />
              AI Suggested Questions
            </span>
            <Button type="button" variant="ghost" size="xs" className="text-muted-foreground" onClick={() => setSuggestions(null)}>
              Hide
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {visibleSuggestions.map((s, idx) => {
              return (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 rounded-md border border-border bg-card p-2 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{s.question}</p>
                    <p className="mt-1 text-muted-foreground italic">
                      Expected response: {s.answer}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-xs"
                    disabled={atLimit}
                    onClick={() => {
                      onChange([
                        ...items,
                        {
                          id: nextQaId(),
                          question: s.question,
                          answer: s.answer,
                        },
                      ])
                    }}
                    aria-label="Add suggestion"
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit question" : "Add questions"}
            </DialogTitle>
          </DialogHeader>
          <div className="-mx-1 flex max-h-96 flex-col gap-4 overflow-y-auto px-1 py-1">
            {drafts.map((d, idx) => (
              <div
                key={d.key}
                className={cn(
                  "flex flex-col gap-3",
                  !editingId &&
                    drafts.length > 1 &&
                    "rounded-md border border-border bg-muted/30 p-3",
                )}
              >
                {!editingId && drafts.length > 1 ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Question {idx + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="Remove question"
                      onClick={() => removeDraft(d.key)}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor={`qs-q-${d.key}`}
                    className="text-sm font-medium"
                  >
                    Question
                  </Label>
                  <Input
                    id={`qs-q-${d.key}`}
                    autoFocus={idx === 0}
                    value={d.question}
                    onChange={(e) =>
                      updateDraft(d.key, { question: e.target.value })
                    }
                    placeholder="e.g. How many years of experience do you have?"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor={`qs-a-${d.key}`}
                    className="text-sm font-medium"
                  >
                    Answer / expected response
                  </Label>
                  <Textarea
                    id={`qs-a-${d.key}`}
                    value={d.answer}
                    onChange={(e) =>
                      updateDraft(d.key, { answer: e.target.value })
                    }
                    placeholder="Share the ideal answer or what a good response looks like."
                    rows={3}
                  />
                </div>
              </div>
            ))}
            {!editingId ? (
              <div className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addAnotherDraft}
                  disabled={!canAddAnother}
                >
                  <Plus className="size-3.5" />
                  Add another question
                </Button>
                <span className="text-xs text-muted-foreground">
                  {remaining} {remaining === 1 ? "slot" : "slots"} left
                </span>
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditorOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={saveDraft}>
              {editingId
                ? "Save changes"
                : drafts.length > 1
                  ? `Add ${drafts.length} questions`
                  : "Add question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Minimal CSV parser — handles quoted fields with commas/newlines and
// doubled-quote escapes. Adequate for the mocked prototype.
function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ""
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        cell += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ",") {
        row.push(cell)
        cell = ""
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++
        row.push(cell)
        rows.push(row)
        row = []
        cell = ""
      } else {
        cell += ch
      }
    }
  }
  if (cell.length > 0 || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }
  return rows
}

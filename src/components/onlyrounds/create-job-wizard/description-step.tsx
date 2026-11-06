"use client"

import { Briefcase, FileText, Sparkles, X, Paperclip, RotateCcw, ArrowRight } from "@apna/design-system"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Field as UIField, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { FormShape, GenerationData } from "@/components/onlyrounds/create-job-wizard/types"
import { deriveTitleFromJd } from "@/components/onlyrounds/create-job-wizard/utils"

// ── Wizard constants ──────────────────────────────────────────────────────

/** Maximum JD file size accepted by the upload flow. */
const MAX_JD_FILE_SIZE_BYTES = 5 * 1024 * 1024
/** Simulated parse delay for plain-text / markdown uploads. */
const MOCK_PARSE_DELAY_TXT_MS = 900
/** Simulated parse delay for binary uploads (PDF, DOCX). */
const MOCK_PARSE_DELAY_BINARY_MS = 1400

const PLACEHOLDERS = [
  "e.g. 'Senior React Developer with 3+ years experience, remotely from India' or paste description...",
  "e.g. 'Customer Support Associate (English & Hindi speaking)' or paste description...",
  "e.g. 'Field Sales Executive with own bike in Bengaluru' or paste description...",
  "e.g. 'Manual Tester with experience in UI and API testing' or paste description...",
  "e.g. 'Product Manager to own roadmap and ship features' or paste description...",
]

export function DescriptionStep({
  form,
  update,
  showErrors,
  populateFormFromGeneration,
}: {
  form: FormShape
  update: <K extends keyof FormShape>(key: K, value: FormShape[K]) => void
  showErrors: boolean
  populateFormFromGeneration: (data: GenerationData, promptValToSet?: string) => void
}) {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [promptVal, setPromptVal] = React.useState(form.promptText || "")
  const [attachedFile, setAttachedFile] = React.useState<File | null>(null)
  const [generating, setGenerating] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [showAllPrompt, setShowAllPrompt] = React.useState(false)

  const [displayedPlaceholder, setDisplayedPlaceholder] = React.useState("")
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0)

  React.useEffect(() => {
    if (generating || processing || promptVal.trim() !== "") {
      setDisplayedPlaceholder("")
      return
    }

    let charIdx = 0
    let currentText = ""
    const fullText = PLACEHOLDERS[placeholderIndex]
    
    const typingInterval = setInterval(() => {
      if (charIdx < fullText.length) {
        currentText += fullText[charIdx]
        setDisplayedPlaceholder(currentText)
        charIdx++
      } else {
        clearInterval(typingInterval)
        
        const delayTimeout = setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length)
        }, 4000)
        
        return () => clearTimeout(delayTimeout)
      }
    }, 35)

    return () => {
      clearInterval(typingInterval)
    }
  }, [placeholderIndex, generating, processing, promptVal])

  const hasResults = form.title.trim().length > 0 && form.jd.trim().length > 0

  const SUGGESTIONS = [
    "React Frontend Engineer with 3+ years experience, Remote",
    "Customer Support Associate (English & Hindi speaking)",
    "Field Sales Executive with own bike in Bengaluru",
  ]

  const unusedSuggestions = SUGGESTIONS.filter(
    (s) => s.toLowerCase() !== promptVal.toLowerCase(),
  )

  const handleReset = () => {
    setError(null)
    setPromptVal("")
    setAttachedFile(null)
    update("title", "")
    update("jd", "")
    update("promptText", "")
    update("attachedFileName", "")
    setShowAllPrompt(false)
  }

  const handleGenerate = async (seedText?: string) => {
    const textToSubmit = seedText || promptVal.trim()
    if (!textToSubmit) return
    setError(null)
    setGenerating(true)
    try {
      const res = await fetch("/api/onlyrounds/generate-jd", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jd: textToSubmit }),
      })
      if (!res.ok) {
        setError("Could not generate. Try again in a moment.")
        return
      }
      const data = await res.json()
      if (!data.jobDescription) {
        setError(data.error ?? "Add more details, then try again.")
        return
      }
      populateFormFromGeneration(data, textToSubmit)
    } catch {
      setError("Could not reach the generator. Try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handlePolish = async () => {
    setError(null)
    setGenerating(true)
    try {
      const res = await fetch("/api/onlyrounds/generate-jd", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: form.title, jd: form.jd }),
      })
      if (!res.ok) {
        setError("Could not generate. Try again in a moment.")
        return
      }
      const data = await res.json()
      if (!data.jobDescription) {
        setError(data.error ?? "Could not refine the description.")
        return
      }
      populateFormFromGeneration(data)
    } catch {
      setError("Could not reach the generator. Try again.")
    } finally {
      setGenerating(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setError(null)
    if (!/\.(txt|md|pdf|docx?)$/i.test(file.name)) {
      setError("Upload a .txt, .md, .pdf, .doc, or .docx file.")
      return
    }
    if (file.size > MAX_JD_FILE_SIZE_BYTES) {
      setError("File must be under 5 MB.")
      return
    }
    setProcessing(true)
    try {
      let parsed = ""
      if (/\.(txt|md)$/i.test(file.name)) {
        parsed = await file.text()
        await new Promise((r) => setTimeout(r, MOCK_PARSE_DELAY_TXT_MS))
      } else {
        await new Promise((r) => setTimeout(r, MOCK_PARSE_DELAY_BINARY_MS))
        const stem = file.name
          .replace(/\.(pdf|docx?|txt|md)$/i, "")
          .replace(/[_\-]+/g, " ")
          .trim()
        const role = stem.length > 0 ? stem : "this role"
        parsed =
          `About ${role}\n\n` +
          `We're hiring a ${role} to own end-to-end outcomes, partner ` +
          `with cross-functional stakeholders, and ship with craft.\n\n` +
          `Responsibilities\n` +
          `• Drive day-to-day execution for your scope\n` +
          `• Partner with product, design, and data peers\n` +
          `• Communicate trade-offs and raise risks early\n\n` +
          `What we're looking for\n` +
          `• Relevant domain experience\n` +
          `• Strong written communication\n` +
          `• Comfort working through ambiguity`
      }
      update("promptText", `Uploaded file: ${file.name}`)
      update("attachedFileName", file.name)
      update("jd", parsed)
      const derived = deriveTitleFromJd(parsed)
      if (derived) update("title", derived)
    } finally {
      setProcessing(false)
    }
  }

  const jdMissing = showErrors && !form.jd.trim()
  const titleMissing = showErrors && !form.title.trim()

  return (
    <div className="flex flex-col gap-4">
      {hasResults ? (
        /* Result State: Sliding Split View (2-column layout) */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Left Column: Prompt / File Summary */}
          <div className="md:col-span-1">
            <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-4 h-fit shadow-card">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Your Input
                </h4>
                {form.attachedFileName ? (
                  <div className="flex items-center gap-1.5 text-sm font-medium text-foreground p-2 rounded-md bg-muted/30 border border-border">
                    <Paperclip className="size-3.5 text-primary shrink-0" />
                    <span className="truncate flex-1">{form.attachedFileName}</span>
                  </div>
                ) : form.promptText ? (
                  <div className="flex flex-col gap-1.5">
                    <div className={cn(
                      "text-sm font-medium text-foreground italic whitespace-pre-wrap leading-relaxed",
                      showAllPrompt && "max-h-60 overflow-y-auto pr-1"
                    )}>
                      &ldquo;
                      {form.promptText.length > 180 && !showAllPrompt
                        ? `${form.promptText.slice(0, 180)}...`
                        : form.promptText}
                      &rdquo;
                    </div>
                    {form.promptText.length > 180 ? (
                      <Button type="button" variant="link" size="sm" className="self-start" onClick={() => setShowAllPrompt(!showAllPrompt)}>
                        {showAllPrompt ? "See less" : "See more"}
                      </Button>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    Custom details entered manually.
                  </p>
                )}
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="w-full text-xs gap-1.5 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                Rewrite Prompt
              </Button>
            </div>
          </div>

          {/* Right Column: Editable Fields */}
          <div className="md:col-span-2 rounded-lg border border-border bg-card p-6 shadow-card flex flex-col gap-4">
            <UIField>
              <FieldLabel htmlFor="title" icon={Briefcase}>Job title</FieldLabel>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Customer Support Associate"
                aria-invalid={titleMissing ? true : undefined}
              />
              {titleMissing ? (
                <FieldError>Required</FieldError>
              ) : (
                <FieldDescription>Shown on candidate landing page.</FieldDescription>
              )}
            </UIField>

            <UIField>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="jd" icon={FileText}>Job description</FieldLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePolish}
                  loading={generating}
                  disabled={generating || !form.jd.trim()}
                  className="h-7 text-xs gap-1 cursor-pointer"
                >
                  {!generating && <Sparkles className="size-3 text-primary" />}
                  Polish with AI
                </Button>
              </div>
              <div className="relative">
                <Textarea
                  id="jd"
                  value={form.jd}
                  onChange={(e) => update("jd", e.target.value)}
                  placeholder="Paste or write the JD details here..."
                  rows={12}
                  aria-invalid={jdMissing ? true : undefined}
                  readOnly={generating}
                />
                {generating ? (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md bg-background z-docked">
                    <Skeleton variant="ai" className="absolute inset-0 rounded-none" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-card">
                        <Sparkles className="size-4 animate-pulse text-primary" />
                        <span>Polishing with AI…</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {jdMissing ? (
                <FieldError>Required</FieldError>
              ) : error ? (
                <p className="text-xs text-destructive mt-1">{error}</p>
              ) : (
                <FieldDescription>Editable. We&apos;ll auto-extract skills from this text.</FieldDescription>
              )}
            </UIField>
          </div>
        </div>
      ) : (
        /* Initial State: Unified AI Command Bar Card */
        <div className="rounded-lg border border-border bg-card p-6 shadow-card w-full animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <h3 className="text-lg font-semibold">What is your hiring requirement?</h3>
          </div>

          <div className="relative rounded-lg border border-border bg-background shadow-control focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-interactive flex flex-col">
            {/* token-lint-ignore: Need fixed field-sizing and fixed height to prevent prompt input card auto-expansion */}
            <Textarea
              value={promptVal}
              onChange={(e) => setPromptVal(e.target.value)}
              placeholder={generating || processing ? "" : displayedPlaceholder}
              className="w-full h-28 max-h-28 [field-sizing:fixed] resize-none border-0 bg-transparent p-4 pb-2 text-sm focus-visible:ring-0 focus-visible:outline-hidden overflow-y-auto"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleGenerate()
                }
              }}
              readOnly={generating || processing}
            />
            
            {generating || processing ? (
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md bg-background z-docked">
                <Skeleton variant="ai" className="absolute inset-0 rounded-none" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Sparkles className="size-4 animate-pulse text-primary" />
                    <span>
                      {processing ? "Processing document…" : "Writing with AI…"}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {!(generating || processing) ? (
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => fileRef.current?.click()}
                    title="Attach file"
                    disabled={generating || processing}
                    className="text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <Paperclip className="size-4" />
                  </Button>
                  
                  {attachedFile ? (
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground border border-border max-w-48">
                      <FileText className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate flex-1">{attachedFile.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="shrink-0 hover:text-destructive"
                        onClick={() => setAttachedFile(null)}
                        aria-label="Remove attachment"
                      >
                        <X />
                      </Button>
                    </span>
                  ) : null}

                  <input
                    ref={fileRef}
                    type="file"
                    accept=".txt,.md,.pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) {
                        setAttachedFile(f)
                        handleFileUpload(f)
                      }
                      e.currentTarget.value = ""
                    }}
                  />
                </div>

                <Button
                  type="button"
                  size="icon-sm"
                  disabled={(!promptVal.trim() && !attachedFile) || generating || processing}
                  onClick={() => handleGenerate()}
                  title="Generate JD"
                  className="cursor-pointer"
                >
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            ) : null}
          </div>

          {error ? (
            <p className="text-xs text-destructive mt-2 text-center">{error}</p>
          ) : null}

          {unusedSuggestions.length > 0 && !generating && !processing ? (
            <div className="mt-5 flex flex-wrap items-center gap-1.5 justify-center">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Sparkles className="size-3 text-primary" />
                Suggestions:
              </span>
              {unusedSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setPromptVal(suggestion)
                    setError(null)
                  }}
                  className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-interactive cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

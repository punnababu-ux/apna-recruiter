"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { ChevronLeft, Download, FileSpreadsheet, FileText, Upload, UserPlus, X, File, Loader2 } from "@apna/design-system"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field as UIField,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────

export type NewCandidateData = {
  name: string
  phone: string
  email: string
  resumeFile?: File
  sourceDetail?: string
}

type Step = "select" | "bulk" | "manual"

// ── CSV Sample Data ───────────────────────────────────────────────────────
const SAMPLE_CSV_CONTENT = "Name,Phone,Email\nJohn Doe,+919999999999,john@example.com\nJane Smith,+918888888888,jane@example.com"
const SAMPLE_CSV_DATA_URI = `data:text/csv;charset=utf-8,${encodeURIComponent(SAMPLE_CSV_CONTENT)}`

export function AddCandidateDialog({
  open,
  onOpenChange,
  onAddCandidates,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddCandidates: (candidates: NewCandidateData[]) => void
}) {
  const [step, setStep] = useState<Step>("select")

  // Reset state on open change
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setStep("select")
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={cn("sm:max-w-md duration-150 gap-6", step !== "select" && "sm:max-w-lg")}>
        {step === "select" && (
          <SelectStep onViewBulk={() => setStep("bulk")} onViewManual={() => setStep("manual")} />
        )}
        {step === "bulk" && (
          <BulkStep
            onBack={() => setStep("select")}
            onSuccess={(data) => {
              onAddCandidates(data)
              handleOpenChange(false)
            }}
          />
        )}
        {step === "manual" && (
          <ManualStep
            onBack={() => setStep("select")}
            onSuccess={(candidate) => {
              onAddCandidates([candidate])
              handleOpenChange(false)
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

// ── Step: Selector ────────────────────────────────────────────────────────

function SelectStep({
  onViewBulk,
  onViewManual,
}: {
  onViewBulk: () => void
  onViewManual: () => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <DialogHeader>
        <DialogTitle>Add candidates</DialogTitle>
        <DialogDescription>
          Choose how you would like to add candidates to this job posting.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={onViewBulk}
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 text-left outline-none transition-colors hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 text-primary">
            <FileSpreadsheet className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-foreground">
              Bulk upload candidates
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Upload a list of candidates from a CSV spreadsheet.
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={onViewManual}
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 text-left outline-none transition-colors hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 text-primary">
            <UserPlus className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-foreground">
              Add candidate manually
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              Fill out details for a single candidate individually.
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}

// ── Step: Bulk CSV Upload ──────────────────────────────────────────────────

function BulkStep({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: (data: NewCandidateData[]) => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      validateAndSetFile(selected)
    }
  }

  const validateAndSetFile = (f: File) => {
    setError(null)
    if (!f.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file (.csv).")
      setFile(null)
      return
    }
    setFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) {
      validateAndSetFile(dropped)
    }
  }

  const handleProcess = async () => {
    if (!file) return
    setProcessing(true)
    setError(null)

    try {
      const text = await file.text()
      const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)

      if (lines.length < 2) {
        setError("The CSV file has no records or data.")
        setProcessing(false)
        return
      }

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase())
      const nameIdx = headers.indexOf("name")
      const phoneIdx = headers.indexOf("phone")
      const emailIdx = headers.indexOf("email")

      if (nameIdx === -1 || phoneIdx === -1 || emailIdx === -1) {
        setError("Missing columns. CSV headers must contain 'Name', 'Phone', and 'Email'.")
        setProcessing(false)
        return
      }

      const results: NewCandidateData[] = []
      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(",").map((cell) => cell.trim().replace(/^["']|["']$/g, ""))
        const name = row[nameIdx] || ""
        const phone = row[phoneIdx] || ""
        const email = row[emailIdx] || ""

        if (!name || !phone || !email) {
          setError(`Row ${i + 1} has incomplete data. Name, Phone, and Email are all required.`)
          setProcessing(false)
          return
        }
        results.push({ name, phone, email, sourceDetail: file.name })
      }

      // Simulate a small processing transition so it matches visual system aesthetics
      await new Promise((r) => setTimeout(r, 1200))

      toast.success(`Bulk upload processed! Added ${results.length} candidates.`)
      onSuccess(results)
    } catch {
      setError("Failed to parse the CSV file. Please verify formatting.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" onClick={onBack} disabled={processing}>
            <ChevronLeft className="size-4" />
          </Button>
          <DialogTitle>Bulk upload candidates</DialogTitle>
        </div>
        <DialogDescription className="pl-8">
          Upload a CSV containing your list of exploratory leads for this job.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-6 pl-8">
        {/* Sample file trigger */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-3">
          <div className="flex items-center gap-2 min-w-0">
            <FileSpreadsheet className="size-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-foreground">
                sample_candidates.csv
              </span>
              <span className="block text-2xs text-muted-foreground">
                template structure for uploads
              </span>
            </div>
          </div>
          <a
            href={SAMPLE_CSV_DATA_URI}
            download="sample_candidates.csv"
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/40 shrink-0"
          >
            <Download className="size-3.5" />
            Template
          </a>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => !processing && fileInputRef.current?.click()}
          className={cn(
            "flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-6 text-center transition-colors hover:bg-muted/30 focus-visible:outline-none",
            file && "border-primary bg-primary/5 hover:bg-primary/5",
            error && "border-destructive bg-destructive/5 hover:bg-destructive/5",
            processing && "pointer-events-none opacity-60"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="sr-only"
            onChange={handleFileChange}
            disabled={processing}
          />
          {processing ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="size-6 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground font-medium">
                Parsing spreadsheet records...
              </span>
            </div>
          ) : file ? (
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <File className="size-8 text-primary" />
              <span className="block truncate text-xs font-semibold text-foreground max-w-64">
                {file.name}
              </span>
              <span className="block text-2xs text-muted-foreground">
                {(file.size / 1024).toFixed(1)} KB
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setFile(null)
                  setError(null)
                }}
                className="mt-1 h-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="size-3.5" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="size-8 text-muted-foreground" />
              <div className="text-xs">
                <span className="font-semibold text-primary">Click to upload</span> or drag
                and drop
              </div>
              <span className="text-2xs text-muted-foreground">CSV files only (up to 5MB)</span>
            </div>
          )}
        </div>

        {error && <p className="text-xs font-medium text-destructive">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onBack} disabled={processing}>
            Cancel
          </Button>
          <Button onClick={handleProcess} disabled={!file || processing}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Step: Manual Form ──────────────────────────────────────────────────────

function ManualStep({
  onBack,
  onSuccess,
}: {
  onBack: () => void
  onSuccess: (candidate: NewCandidateData) => void
}) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = () => {
    const nextErrors: Record<string, string> = {}
    if (!name.trim()) nextErrors.name = "Name is required"
    if (!phone.trim()) {
      nextErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s\-()]{10,15}$/.test(phone.trim())) {
      nextErrors.phone = "Invalid phone number format"
    }
    if (!email.trim()) {
      nextErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Invalid email address"
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    // Small mock saving spinner
    await new Promise((r) => setTimeout(r, 800))

    toast.success("Candidate successfully added!")
    onSuccess({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      resumeFile: resumeFile || undefined,
      sourceDetail: "manually added",
    })
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <DialogHeader>
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon-sm" onClick={onBack} disabled={isSubmitting}>
            <ChevronLeft className="size-4" />
          </Button>
          <DialogTitle>Add candidate manually</DialogTitle>
        </div>
        <DialogDescription className="pl-8">
          Fill in candidate information. Mandatory fields are marked with an asterisk (*).
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-6 pl-8">
        <UIField data-invalid={errors.name ? "true" : undefined}>
          <FieldLabel htmlFor="cand-name" icon={UserPlus}>
            Applicant name<span className="ml-0.5 text-destructive">*</span>
          </FieldLabel>
          <Input
            id="cand-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. John Doe"
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
          />
          <FieldError>{errors.name}</FieldError>
        </UIField>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <UIField data-invalid={errors.phone ? "true" : undefined}>
            <FieldLabel htmlFor="cand-phone" icon={UserPlus}>
              Phone number<span className="ml-0.5 text-destructive">*</span>
            </FieldLabel>
            <Input
              id="cand-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 99999 99999"
              disabled={isSubmitting}
              aria-invalid={!!errors.phone}
            />
            <FieldError>{errors.phone}</FieldError>
          </UIField>

          <UIField data-invalid={errors.email ? "true" : undefined}>
            <FieldLabel htmlFor="cand-email" icon={UserPlus}>
              Email address<span className="ml-0.5 text-destructive">*</span>
            </FieldLabel>
            <Input
              id="cand-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
            />
            <FieldError>{errors.email}</FieldError>
          </UIField>
        </div>

        {/* Resume upload */}
        <UIField>
          <FieldLabel icon={FileText}>
            Resume upload{" "}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              (Optional)
            </span>
          </FieldLabel>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
            >
              <Upload className="size-3.5" />
              {resumeFile ? "Change file" : "Upload resume"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) => {
                const selected = e.target.files?.[0]
                if (selected) {
                  setResumeFile(selected)
                }
              }}
              disabled={isSubmitting}
            />
            {resumeFile && (
              <div className="flex items-center gap-1.5 min-w-0">
                <File className="size-4 text-primary shrink-0" />
                <span className="truncate text-xs font-medium text-foreground max-w-48">
                  {resumeFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  className="text-muted-foreground hover:text-foreground shrink-0"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            )}
          </div>
          <FieldDescription>Supports PDF, DOC, or DOCX formats up to 5MB.</FieldDescription>
        </UIField>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Add Candidate
          </Button>
        </div>
      </div>
    </form>
  )
}

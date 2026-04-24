"use client"

/**
 * ClientForm — controlled form for creating/editing a client record.
 *
 * Collects: name · logo (image upload) · about · website · email. Built on
 * top of the Field primitives so spacing, label sizing, and error slots
 * match the rest of the product. The logo field accepts an image file
 * (png/jpg/svg/webp) and emits a data URL on `ClientFormValues.logo`, so
 * callers can persist without a separate upload step.
 */

import { ImagePlus, Upload, X } from "lucide-react"
import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export type ClientFormValues = {
  name: string
  logo: string
  about: string
  website: string
  email: string
}

const EMPTY: ClientFormValues = {
  name: "",
  logo: "",
  about: "",
  website: "",
  email: "",
}

export function ClientForm({
  defaultValues,
  onCancel,
  onSubmit,
  submitLabel = "Save client",
}: {
  defaultValues?: Partial<ClientFormValues>
  onCancel?: () => void
  onSubmit: (values: ClientFormValues) => void
  submitLabel?: string
}) {
  const [values, setValues] = useState<ClientFormValues>({ ...EMPTY, ...defaultValues })

  const bind = <K extends Exclude<keyof ClientFormValues, "logo">>(key: K) => ({
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value })),
  })

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(values)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="client-name">Client name</FieldLabel>
          <Input
            id="client-name"
            placeholder="Flipkart"
            required
            {...bind("name")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="client-logo">Logo</FieldLabel>
          <FieldContent>
            <LogoUpload
              value={values.logo}
              onChange={(next) => setValues((v) => ({ ...v, logo: next }))}
            />
            <FieldDescription>
              PNG, JPG, SVG, or WebP. Square works best. Leave empty to use the
              client initial.
            </FieldDescription>
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="client-about">About</FieldLabel>
          <Textarea
            id="client-about"
            placeholder="Short description of the client — industry, focus, anything useful for recruiters."
            rows={3}
            {...bind("about")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="client-website">Website</FieldLabel>
          <Input
            id="client-website"
            type="url"
            placeholder="https://flipkart.com"
            required
            {...bind("website")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="client-email">Primary contact email</FieldLabel>
          <Input
            id="client-email"
            type="email"
            placeholder="recruiting@flipkart.com"
            required
            {...bind("email")}
          />
        </Field>
      </FieldGroup>

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}

function LogoUpload({
  value,
  onChange,
}: {
  value: string
  onChange: (next: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("File must be an image (PNG, JPG, SVG, or WebP).")
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2 MB.")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setError(null)
      onChange(typeof reader.result === "string" ? reader.result : "")
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        id="client-logo"
        type="file"
        accept="image/png,image/jpeg,image/svg+xml,image/webp"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
          e.currentTarget.value = ""
        }}
      />
      <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
        {value ? (
          <img
            src={value}
            alt="Client logo preview"
            className="size-full object-contain p-1"
          />
        ) : (
          <ImagePlus className="size-5 text-muted-foreground" aria-hidden />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="size-3.5" />
            {value ? "Replace" : "Upload image"}
          </Button>
          {value ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange("")
                setError(null)
              }}
            >
              <X className="size-3.5" />
              Remove
            </Button>
          ) : null}
        </div>
        {error ? (
          <span className="text-xs text-destructive">{error}</span>
        ) : null}
      </div>
    </div>
  )
}

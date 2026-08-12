"use client"

import * as React from "react"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Label,
  Badge,
  Slider,
  SearchFilterBar,
} from "@apna/design-system"

export default function InputsComponentsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="info">Category 2</Badge>
        </div>
        <h1 className="text-2xl font-bold font-heading text-foreground mt-2">
          2. Form & Inputs
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Form wrappers, inputs, textareas, dropdowns, checkboxes, switches, and radio groups.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs text-muted-foreground">
        <code>{'import { Field, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider } from "@apna/design-system"'}</code>
      </div>

      {/* Field Wrappers */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Fields & Inputs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Field>
            <FieldLabel>Job Title</FieldLabel>
            <Input placeholder="e.g. Senior Frontend Engineer" />
            <FieldDescription>Clear role title for candidate matching.</FieldDescription>
          </Field>

          <Field data-invalid={true}>
            <FieldLabel>Required Field (Error state)</FieldLabel>
            <Input placeholder="Invalid input example" />
            <FieldError>This field is required.</FieldError>
          </Field>
        </div>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Search & Multi-Group Filter Bar
        </h2>
        <SearchFilterBar
          placeholder="Search candidates or job postings..."
          value=""
          onChange={() => {}}
          filterGroups={[
            {
              label: "Status",
              options: ["Active", "Published", "Draft"],
              selected: ["Active"],
              onToggle: () => {},
            },
            {
              label: "Location",
              options: ["Bengaluru", "Hyderabad", "Remote"],
              selected: [],
              onToggle: () => {},
            },
          ]}
        />
      </div>

      {/* Select & Textarea */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Select Dropdowns & Textarea
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Field>
            <FieldLabel>Experience Level</FieldLabel>
            <Select value="mid">
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior (0-2 yrs)</SelectItem>
                <SelectItem value="mid">Mid-level (2-5 yrs)</SelectItem>
                <SelectItem value="senior">Senior (5+ yrs)</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field className="md:col-span-2">
            <FieldLabel>Job Overview</FieldLabel>
            <Textarea placeholder="Describe the responsibilities and key requirements..." className="h-24" />
          </Field>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="space-y-6">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Selection Controls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Checkbox */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-heading">Checkbox</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox id="chk-default" />
                <Label htmlFor="chk-default">Default</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="chk-checked" checked={true} />
                <Label htmlFor="chk-checked">Checked</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="chk-disabled" disabled />
                <Label htmlFor="chk-disabled" className="opacity-50">Disabled</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="chk-disabled-checked" checked={true} disabled />
                <Label htmlFor="chk-disabled-checked" className="opacity-50">Disabled Checked</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="chk-error" aria-invalid={true} />
                <Label htmlFor="chk-error" className="text-destructive">Error</Label>
              </div>
            </div>
          </div>

          {/* Switch */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-heading">Switch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Switch id="sw-default" />
                <Label htmlFor="sw-default">Default</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="sw-checked" checked={true} />
                <Label htmlFor="sw-checked">Checked</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="sw-disabled" disabled />
                <Label htmlFor="sw-disabled" className="opacity-50">Disabled</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="sw-disabled-checked" checked={true} disabled />
                <Label htmlFor="sw-disabled-checked" className="opacity-50">Disabled Checked</Label>
              </div>

            </div>
          </div>

          {/* Radio */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-heading">Radio</h3>
            <div className="space-y-4">
              <RadioGroup value="r-checked" className="space-y-1">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="r-default" id="r-default" />
                  <Label htmlFor="r-default">Default</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="r-checked" id="r-checked" />
                  <Label htmlFor="r-checked">Checked</Label>
                </div>
              </RadioGroup>
              <RadioGroup value="r-disabled-checked" className="space-y-1">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="r-disabled" id="r-disabled" disabled />
                  <Label htmlFor="r-disabled" className="opacity-50">Disabled</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="r-disabled-checked" id="r-disabled-checked" disabled />
                  <Label htmlFor="r-disabled-checked" className="opacity-50">Disabled Checked</Label>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <RadioGroupItem value="r-error" id="r-error" aria-invalid={true} />
                  <Label htmlFor="r-error" className="text-destructive">Error</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-6">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Range & Slider
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-8">
            <h3 className="text-sm font-semibold text-foreground font-heading">Slider (Default)</h3>
            <div className="space-y-4">
              <Slider defaultValue={50} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 space-y-8">
            <h3 className="text-sm font-semibold text-foreground font-heading">Slider (Disabled)</h3>
            <div className="space-y-4">
              <Slider defaultValue={50} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

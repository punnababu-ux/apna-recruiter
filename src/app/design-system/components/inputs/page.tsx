"use client"

import * as React from "react"
import {
  OtpInput,
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
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteCollection,
  AutocompleteItem,
  AutocompleteEmpty,
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Label,
  Badge,
  Slider,
  SearchFilterBar,
  PromptInput,
  Button,
  Mic,
  OptionCard,
  OptionCardGroup,
  NumberStepper,
  RangeSlider,
  Building2,
  Home,
  Route,
  Store,
  Headset,
  Truck,
  Laptop,
} from "@apna/design-system"

const SEARCH_DEMO = [
  { label: "Product", items: [{ id: "jobs", label: "Smart Job Posting" }, { id: "db", label: "apna Database" }, { id: "ai", label: "AI Calling Agent" }] },
  { label: "Resources", items: [{ id: "blogs", label: "Blogs" }, { id: "faqs", label: "FAQs" }, { id: "help", label: "Help Center" }] },
]

export default function InputsComponentsPage() {
  const [prompt, setPrompt] = React.useState("")
  const [workplace, setWorkplace] = React.useState("office")
  const [industry, setIndustry] = React.useState("Retail")
  const [years, setYears] = React.useState(1)
  const [salary, setSalary] = React.useState([15000, 25000])
  const [otp, setOtp] = React.useState("")
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

      {/* One-time code */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <h2 className="border-b border-border/60 pb-2 text-h6 text-foreground">One-time code (OtpInput)</h2>
        <OtpInput value={otp} onChange={setOtp} invalid={otp === "000000"} aria-label="Demo code" />
        <span className="text-xs text-muted-foreground">
          Type, paste or SMS-autofill a code; 000000 shows the invalid state. Used on /login/otp.
        </span>
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

      {/* Autocomplete */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <h2 className="border-b border-border/60 pb-2 text-h6 text-foreground">Search with suggestions (Autocomplete)</h2>
        <Autocomplete items={SEARCH_DEMO} itemToStringValue={(item: { label: string }) => item.label}>
          <AutocompleteInput placeholder="Search" containerClassName="max-w-xs" className="rounded-full bg-muted" />
          <AutocompleteContent>
            <AutocompleteEmpty>No results</AutocompleteEmpty>
            <AutocompleteList>
              {(group: (typeof SEARCH_DEMO)[number]) => (
                <AutocompleteGroup key={group.label} items={group.items}>
                  <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
                  <AutocompleteCollection>
                    {(item: { id: string; label: string }) => (
                      <AutocompleteItem key={item.id} value={item}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </AutocompleteCollection>
                </AutocompleteGroup>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
        <span className="text-xs text-muted-foreground">
          Type to filter; ↑/↓ and Enter to pick. The marketing header&apos;s site search.
        </span>
      </div>

      {/* Select & Textarea */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Select Dropdowns & Textarea
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          <Field>
            <FieldLabel>Experience Level</FieldLabel>
            {/* `items` maps values to labels so the trigger shows
              * "Mid-level (2-5 yrs)", not the raw value "mid". */}
            <Select
              defaultValue="mid"
              items={{ junior: "Junior (0-2 yrs)", mid: "Mid-level (2-5 yrs)", senior: "Senior (5+ yrs)" }}
            >
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

      {/* Prompt input */}
      <div className="space-y-6">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Prompt Input (AI)
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PromptInput
            size="lg"
            value={prompt}
            onValueChange={setPrompt}
            onSubmit={() => setPrompt("")}
            placeholder="Describe who you want to hire…"
            actions={
              <Button type="button" size="icon" variant="outline" className="rounded-full" aria-label="Speak">
                <Mic />
              </Button>
            }
          />
          <PromptInput value="" onValueChange={() => {}} onSubmit={() => {}} loading placeholder="Ask AI to change anything" />
        </div>
      </div>

      {/* Wizard answers */}
      <div className="space-y-6">
        <h2 className="text-base font-semibold text-foreground font-heading border-b border-border/60 pb-2">
          Option Card, Number Stepper, Range Slider (wizard answers)
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <OptionCardGroup aria-label="Where will they work?">
            {[
              ["office", "Work from office", "At your office or store every day", <Building2 key="i" />],
              ["home", "Work from home", "Fully remote", <Home key="i" />],
              ["field", "Field job", "Mostly travelling — sales visits, deliveries", <Route key="i" />],
            ].map(([v, t, d, icon]) => (
              <OptionCard
                key={v as string}
                icon={icon}
                title={t}
                description={d}
                selected={workplace === v}
                onSelect={() => setWorkplace(v as string)}
              />
            ))}
          </OptionCardGroup>
          <OptionCardGroup aria-label="Industry" columns={2}>
            {[
              ["Retail", <Store key="i" />],
              ["BPO / Call Centre", <Headset key="i" />],
              ["E-commerce & Logistics", <Truck key="i" />],
              ["IT & Software", <Laptop key="i" />],
            ].map(([v, icon]) => (
              <OptionCard
                key={v as string}
                layout="tile"
                icon={icon}
                title={v}
                selected={industry === v}
                onSelect={() => setIndustry(v as string)}
              />
            ))}
          </OptionCardGroup>
          <NumberStepper
            label="Minimum experience"
            value={years}
            onValueChange={setYears}
            min={1}
            max={30}
            format={(n) => `${n} yr${n === 1 ? "" : "s"}`}
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Salary ₹{salary[0].toLocaleString("en-IN")} – ₹{salary[1].toLocaleString("en-IN")}
            </span>
            <RangeSlider
              min={5000}
              max={60000}
              step={500}
              value={[salary[0], salary[1]]}
              onValueChange={(v) => setSalary(v)}
              ticks={{ minor: 2500, major: 10000 }}
              scale={[5000, 20000, 40000, 60000]}
              formatValue={(n) => `₹${n.toLocaleString("en-IN")}`}
              formatScale={(n) => `₹${n / 1000}k`}
              thumbLabels={["Minimum salary", "Maximum salary"]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

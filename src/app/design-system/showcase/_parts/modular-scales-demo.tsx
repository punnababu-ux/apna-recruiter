"use client"

/**
 * ModularScalesDemo — live showcase for the two-knob design system.
 *
 * Binds `--font-size-ratio` and `--radius-ratio` to two range inputs. Moving
 * either slider mutates the CSS custom property on the document root, so
 * every component on the page retunes in real time — no re-render needed.
 *
 * This is a showcase-only affordance. Production code should never mutate
 * tokens imperatively; the source of truth is `src/styles/tokens/*.css`.
 */

import { useEffect, useState } from "react"

const DEFAULT_FONT_RATIO = 1.2
const DEFAULT_RADIUS_RATIO = 1.25

export function ModularScalesDemo() {
  const [fontRatio, setFontRatio] = useState(DEFAULT_FONT_RATIO)
  const [radiusRatio, setRadiusRatio] = useState(DEFAULT_RADIUS_RATIO)

  // Mirror each slider value onto :root as a CSS custom property. The
  // primitives.css ramp is authored in terms of these two vars, so the
  // whole system recomputes the moment they change.
  useEffect(() => {
    document.documentElement.style.setProperty("--font-size-ratio", String(fontRatio))
    return () => {
      document.documentElement.style.removeProperty("--font-size-ratio")
    }
  }, [fontRatio])

  useEffect(() => {
    document.documentElement.style.setProperty("--radius-ratio", String(radiusRatio))
    return () => {
      document.documentElement.style.removeProperty("--radius-ratio")
    }
  }, [radiusRatio])

  const reset = () => {
    setFontRatio(DEFAULT_FONT_RATIO)
    setRadiusRatio(DEFAULT_RADIUS_RATIO)
  }

  return (
    <div className="space-y-6 rounded-surface border border-border bg-card p-inset">
      {/* Controls ----------------------------------------------------- */}
      <div className="grid gap-stack sm:grid-cols-2">
        <ScaleSlider
          label="Type ratio"
          varName="--font-size-ratio"
          min={1.1}
          max={1.4}
          step={0.005}
          value={fontRatio}
          onChange={setFontRatio}
          marks={[
            { value: 1.125, label: "1.125" },
            { value: 1.2,   label: "1.2" },
            { value: 1.25,  label: "1.25" },
            { value: 1.333, label: "1.333" },
          ]}
        />
        <ScaleSlider
          label="Radius ratio"
          varName="--radius-ratio"
          min={1.0}
          max={1.5}
          step={0.01}
          value={radiusRatio}
          onChange={setRadiusRatio}
          marks={[
            { value: 1.1,  label: "1.1" },
            { value: 1.25, label: "1.25" },
            { value: 1.4,  label: "1.4" },
          ]}
        />
      </div>

      <div className="flex items-center gap-inline">
        <button
          type="button"
          onClick={reset}
          className="rounded-control border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Reset to defaults
        </button>
        <p className="text-caption">
          Both ratios mutate CSS custom properties on <code className="font-mono">:root</code>.
          Everything on the page reacts — type scale, card corners, buttons, inputs.
        </p>
      </div>

      {/* Live preview ------------------------------------------------- */}
      <div className="space-y-stack">
        <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">
          Type scale — live
        </div>
        <div className="space-y-2">
          <p className="text-display">Display — text-display</p>
          <p className="text-h1">Page title — text-h1</p>
          <p className="text-h3">Section — text-h3</p>
          <p className="text-body">Body — text-body</p>
          <p className="text-caption">Caption — text-caption</p>
        </div>
      </div>

      <div className="space-y-stack">
        <div className="font-mono text-2xs uppercase tracking-wider text-muted-foreground">
          Radius roles — live
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Class names are written literally — Tailwind JIT needs to see  */}
          {/* the full utility string at build time to emit the CSS rule.    */}
          <RadiusCard className="rounded-field"   label="field" />
          <RadiusCard className="rounded-control" label="control" />
          <RadiusCard className="rounded-surface" label="surface" />
          <RadiusCard className="rounded-overlay" label="overlay" />
          <RadiusCard className="rounded-hero"    label="hero" />
          <RadiusCard className="rounded-pill"    label="pill" />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Internals                                                                  */
/* -------------------------------------------------------------------------- */

function ScaleSlider({
  label, varName, min, max, step, value, onChange, marks,
}: {
  label: string
  varName: string
  min: number
  max: number
  step: number
  value: number
  onChange: (next: number) => void
  marks: { value: number; label: string }[]
}) {
  return (
    <label className="flex flex-col gap-field">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium">{label}</span>
        <code className="font-mono text-2xs text-muted-foreground">
          {varName}: {value.toFixed(3)}
        </code>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex justify-between font-mono text-2xs text-muted-foreground">
        {marks.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange(m.value)}
            className="hover:text-foreground"
          >
            {m.label}
          </button>
        ))}
      </div>
    </label>
  )
}

function RadiusCard({ className, label }: { className: string; label: string }) {
  // The `rounded-*` utility is emitted by globals.css via the `@theme inline`
  // block. The class name is passed in literally so Tailwind's JIT picks it
  // up at build time (template-interpolated names are invisible to the JIT).
  return (
    <div className={`flex h-20 w-24 flex-col items-center justify-center gap-1 border border-border bg-background ${className}`}>
      <div className="text-sm font-semibold">{label}</div>
      <code className="font-mono text-2xs text-muted-foreground">rounded-{label}</code>
    </div>
  )
}

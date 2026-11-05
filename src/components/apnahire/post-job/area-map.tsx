"use client"

/**
 * AreaMap — an OpenStreetMap preview of the picked area, so the recruiter
 * sees the pin lands where they meant. Open source end to end: Nominatim
 * finds the place, OSM's embed draws it. No key, no dependency.
 *
 * shortcut: public Nominatim allows ~1 request/second and no heavy use;
 * move to a hosted geocoder (or coordinates from the place search) before
 * production.
 */

import * as React from "react"

type Point = { lat: number; lon: number }

export function AreaMap({ area, city }: { area: string; city: string }) {
  const [point, setPoint] = React.useState<Point | null>(null)

  React.useEffect(() => {
    const ctrl = new AbortController()
    setPoint(null)
    const q = encodeURIComponent(`${area}, ${city}, India`)
    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((rows: { lat: string; lon: string }[]) => {
        if (rows[0]) setPoint({ lat: +rows[0].lat, lon: +rows[0].lon })
      })
      .catch(() => {}) // No map is fine; the area card still says where.
    return () => ctrl.abort()
  }, [area, city])

  if (!point) return <div aria-hidden className="aspect-video w-full animate-pulse rounded-card-nested bg-muted" />

  const d = 0.012 // ≈1.3 km either side: a neighbourhood
  const bbox = [point.lon - d, point.lat - d, point.lon + d, point.lat + d].join(",")
  return (
    <iframe
      title={`Map of ${area}, ${city}`}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${point.lat},${point.lon}`}
      loading="lazy"
      className="aspect-video w-full rounded-card-nested border border-border"
    />
  )
}

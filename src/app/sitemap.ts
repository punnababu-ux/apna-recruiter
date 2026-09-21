import type { MetadataRoute } from "next"

/**
 * Sitemap for the public marketing site.
 *
 * Lists only routes that actually exist and are meant to be indexed — the
 * `(marketing)` group and nothing else. `src/content/nav.ts` and
 * `footer.ts` already link to a handful of pages that aren't built yet
 * (`/about`, `/careers`, `/enterprise`, …); a sitemap is a claim to search
 * engines that a URL is real, so listing those here ahead of the pages
 * existing would be lying to Google. Add a route here in the same commit
 * that ships the page, not before.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://employer.apna.co"

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]
}

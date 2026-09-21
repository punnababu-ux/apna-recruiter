import type { MetadataRoute } from "next"

/**
 * Belt-and-suspenders with the per-layout `robots: { index: false }` on
 * `/design-system` and `/apnahire`: those metadata exports keep those pages
 * out of search results even if linked to, but a crawler still has to fetch
 * each page to see the noindex tag. Disallowing the whole path here means
 * well-behaved crawlers don't bother, which also keeps them off internal
 * tooling and authenticated app routes that have no reason to be crawled.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system", "/apnahire", "/onlyrounds", "/api"],
    },
    sitemap: "https://employer.apna.co/sitemap.xml",
  }
}

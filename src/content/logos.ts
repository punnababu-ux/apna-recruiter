/**
 * Client / partner logo roster.
 *
 * The design's own exported assets (`public/logos/*`), used wherever the
 * site says "trusted by" — the homepage's "Top Hiring Partners" band and
 * `trust-bar.tsx` (which predates this file and keeps its own copy of the
 * same list; not worth churning that component just to point it here).
 *
 * This is deliberately NOT the logo set shown on the Lovable prototype's
 * equivalent band (Zomato, Amazon, Reliance, Tata Motors, …) — those aren't
 * in this repo's asset library, and fetching new brand marks isn't a call
 * to make without asking. This is the roster already vetted and shipping
 * on /pricing.
 */

export interface ClientLogo {
  name: string
  src: string
  /** Designed width at 36px height, from Figma. */
  width: number
}

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Paytm", src: "/logos/paytm.svg", width: 116 },
  { name: "Jio", src: "/logos/jio.svg", width: 36 },
  { name: "Axis Bank", src: "/logos/axis-bank.svg", width: 152 },
  { name: "Aditya Birla Capital", src: "/logos/aditya-birla-capital.png", width: 136 },
  { name: "Tech Mahindra", src: "/logos/tech-mahindra.svg", width: 131 },
  { name: "Bajaj Allianz", src: "/logos/bajaj-allianz.png", width: 92 },
  { name: "Flipkart", src: "/logos/flipkart.svg", width: 137 },
  { name: "BigBasket", src: "/logos/bigbasket.png", width: 120 },
  { name: "HDFC Bank", src: "/logos/hdfc-bank.svg", width: 208 },
  { name: "Swiggy", src: "/logos/swiggy.svg", width: 121 },
  { name: "Uber", src: "/logos/uber.svg", width: 104 },
  { name: "Urban Company", src: "/logos/urban-company.png", width: 128 },
  { name: "Zomato", src: "/logos/zomato.svg", width: 168 },
]

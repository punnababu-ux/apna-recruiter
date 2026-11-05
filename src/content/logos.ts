/**
 * Client / partner logo roster.
 *
 * The design's own exported assets (`public/logos/*`), used wherever the
 * site says "trusted by" — the homepage's "Top Hiring Partners" band and
 * `proof-bands.tsx` (home and pricing share it; formerly trust-bar.tsx kept its own copy of the
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
  { name: "BigBasket", src: "/logos/bigbasket.png", width: 89 }, // Wikimedia Commons (the old export was cropped)
  { name: "HDFC Bank", src: "/logos/hdfc-bank.svg", width: 208 },
  { name: "Swiggy", src: "/logos/swiggy.svg", width: 121 },
  { name: "Uber", src: "/logos/uber.svg", width: 104 },
  { name: "Urban Company", src: "/logos/urban-company.png", width: 128 },
  { name: "Zomato", src: "/logos/zomato.svg", width: 168 },
  // From employer.apna.co's "Trusted by" strip (2026-10-19).
  { name: "Tata 1mg", src: "/logos/tata-1mg.png", width: 159 },
  { name: "Nizams", src: "/logos/nizams.png", width: 108 },
  { name: "Shadowfox", src: "/logos/shadowfox.png", width: 95 },
]

/** Customer-story logos (2026-11-05): each company's own mark from Wikimedia
 *  Commons / Wikipedia. Kept apart from CLIENT_LOGOS so the "Top Hiring
 *  Partners" band doesn't grow. CompanyMark looks in both. */
export const STORY_LOGOS: ClientLogo[] = [
  { name: "Adecco India", src: "/logos/adecco-india.svg", width: 74 },
  { name: "Amazon", src: "/logos/amazon.svg", width: 119 },
  { name: "Apollo Hospitals", src: "/logos/apollo-hospitals.svg", width: 34 },
  { name: "Bajaj Finserv", src: "/logos/bajaj-finserv.png", width: 105 },
  { name: "Blue Dart", src: "/logos/blue-dart.svg", width: 120 },
  { name: "Byju's", src: "/logos/byjus.svg", width: 133 },
  { name: "Cafe Coffee Day", src: "/logos/cafe-coffee-day.png", width: 26 },
  { name: "Concentrix", src: "/logos/concentrix.svg", width: 233 },
  { name: "DMart", src: "/logos/dmart.svg", width: 149 },
  { name: "Delhivery", src: "/logos/delhivery.svg", width: 227 },
  { name: "Domino's India", src: "/logos/dominos-india.svg", width: 36 },
  { name: "Firstsource", src: "/logos/firstsource.svg", width: 94 },
  { name: "Foxconn India", src: "/logos/foxconn-india.svg", width: 308 },
  { name: "Godrej Properties", src: "/logos/godrej-properties.png", width: 138 },
  { name: "Havells", src: "/logos/havells.svg", width: 55 },
  { name: "ICICI Bank", src: "/logos/icici-bank.svg", width: 179 },
  { name: "IndiGo", src: "/logos/indigo.svg", width: 131 },
  { name: "Infosys BPM", src: "/logos/infosys-bpm.svg", width: 90 },
  { name: "L&T Construction", src: "/logos/l-t-construction.png", width: 36 },
  { name: "Lenskart", src: "/logos/lenskart.svg", width: 260 },
  { name: "Mahindra & Mahindra", src: "/logos/mahindra-mahindra.png", width: 48 },
  { name: "MakeMyTrip", src: "/logos/makemytrip.svg", width: 113 },
  { name: "OYO", src: "/logos/oyo.png", width: 36 },
  { name: "PharmEasy", src: "/logos/pharmeasy.png", width: 181 },
  { name: "PolicyBazaar", src: "/logos/policybazaar.png", width: 119 },
  { name: "PwC", src: "/logos/pwc.svg", width: 294 },
  { name: "Randstad India", src: "/logos/randstad-india.svg", width: 172 },
  { name: "Reliance Retail", src: "/logos/reliance-retail.svg", width: 70 },
  { name: "Shapoorji Pallonji", src: "/logos/shapoorji-pallonji.svg", width: 64 },
  { name: "TCS", src: "/logos/tcs.svg", width: 108 },
  { name: "Taj Hotels", src: "/logos/taj-hotels.svg", width: 41 },
  { name: "Tata Motors", src: "/logos/tata-motors.svg", width: 316 },
  { name: "Teamlease", src: "/logos/teamlease.png", width: 46 },
  { name: "Teleperformance", src: "/logos/teleperformance.svg", width: 189 },
  { name: "Titan", src: "/logos/titan.png", width: 35 },
  { name: "Vodafone Idea", src: "/logos/vodafone-idea.png", width: 40 },
  { name: "Wipro", src: "/logos/wipro.svg", width: 90 },
  { name: "Zepto", src: "/logos/zepto.svg", width: 108 },
]

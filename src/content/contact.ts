/**
 * Contact us — the homepage's closing section (and the target of every
 * "Contact us" link: `/#contact-us`).
 *
 * Copy, fields and options are verbatim from employer.apna.co/contact-us,
 * read live on 2026-10-16. The success message reuses the page's own "A
 * dedicated talent executive will get back to you shortly."
 */

export const CONTACT_ANCHOR = "contact-us"

export const CONTACT = {
  // The closing band (user call, 2026-10-19): post a job, or talk to sales
  // (opens the contact form).
  cta: "Talk to sales",
  title: "Your next hire could apply today.",
  description: "60% of businesses get qualified candidates within 24 hours.",
  post: { label: "Post a job", href: `/login?next=${encodeURIComponent("/apnahire/jobs/new")}` },
  steps: [
    "Submit this simple form.",
    "A dedicated talent executive will get back to you shortly.",
    "We'll partner with you to talk through your business needs and see how apna can help.",
  ],
  formTitle: "Get in touch with us",
  fields: {
    name: "Full name",
    email: "Work Email",
    phone: "Mobile number",
    role: "Your role",
    company: "Company name",
    size: "Company size",
  },
  roles: ["HR", "Owner", "Hiring Manager", "Consultancy", "Others"],
  sizes: ["0-10", "11-50", "51-100", "101-500", "501-1000", "1001+"],
  select: "Select…",
  submit: "Submit",
  legal: "By clicking “Submit” I agree to the Terms of Use and the Privacy Statement.",
  success: {
    title: "Thanks — we've got it.",
    body: "A dedicated talent executive will get back to you shortly.",
  },
  // Logged in (self-checkout's Contact sales): we already know who they
  // are, so no form — just this.
  signedIn: {
    title: "Thank you for showing interest",
    body: "Someone from our sales team will connect with you shortly to help you with your requirements.",
  },
  done: "Okay, got it",
} as const

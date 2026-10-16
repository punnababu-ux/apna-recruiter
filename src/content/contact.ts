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
  cta: "Contact us",
  /** Two lines on purpose — the section breaks after the first. */
  title: ["Join over 7 Lakhs+ employers.", "We're happy to help."],
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
} as const

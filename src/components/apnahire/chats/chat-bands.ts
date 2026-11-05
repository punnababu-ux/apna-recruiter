/**
 * Shared heights for the Express screen's three panes (md+), so the white
 * header bars line up as one band and the second bars as one context strip.
 * Every pane draws its band and sub-row from these two strings; change the
 * height here and all three move together.
 *
 *   BAND    h-16 (64px, the top bar's step): list title and actions, thread
 *           avatar and name, profile (Candidate 360) title. Each draws border-b, so the
 *           three read as one line; the pane dividers run below it.
 *   SUBROW  h-14 (56px) directly under the band, the context strip (user
 *           call, 2026-11-05): the list's count and applied filters, the
 *           thread's job card, Candidate 360's person (photo, name, meta).
 */
export const BAND = "md:h-16 md:shrink-0 md:border-b md:border-border md:bg-card md:px-4"
export const SUBROW = "md:flex md:h-14 md:shrink-0 md:items-center md:border-b md:border-border md:bg-card md:px-4"

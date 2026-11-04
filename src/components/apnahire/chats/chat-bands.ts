/**
 * Shared heights for the Express screen's three panes (md+), so the white
 * header bars line up as one band and the rows below start at the same y.
 * Every pane draws its band and sub-row from these two strings; change the
 * height here and all three move together.
 *
 *   BAND    h-16 (64px, the top bar's step): list title and actions, thread
 *           avatar and name, profile title. Each draws border-b, so the
 *           three read as one line; the pane dividers run below it.
 *   SUBROW  h-14 (56px) directly under the band: the list's result count
 *           and sort (or the search field), the thread's job card, the
 *           profile's match line.
 */
export const BAND = "md:h-16 md:shrink-0 md:border-b md:border-border md:bg-card md:px-4"
export const SUBROW = "md:flex md:h-14 md:shrink-0 md:items-center md:border-b md:border-border md:bg-card md:px-4"

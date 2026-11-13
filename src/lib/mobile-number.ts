/**
 * The ten digits of an Indian mobile number, out of whatever was typed,
 * pasted or autofilled into a number field.
 *
 *   +91 98765 43210    →  9876543210   the country code
 *   919876543210       →  9876543210
 *   09876543210        →  9876543210   the trunk 0 (Chrome's autofill writes
 *                                      it for `autocomplete="tel-national"`)
 *   0091 98765 43210   →  9876543210
 *   98765 43210        →  9876543210
 *
 * Only a string longer than ten digits can hold a prefix, so ten digits or
 * fewer are left as typed, also when they start with 91 or 0. Typing one
 * digit at a time is unchanged, and an eleventh digit is still ignored.
 *
 * Until 2026-11-13 the field kept the first ten digits of anything, so
 * "+91 98765 43210" became 9198765432 and an autofilled number 0987654321.
 * Both passed the 10-digit check.
 */
export function mobileDigits(raw: string) {
  let digits = raw.replace(/\D/g, "")
  const dropLeadingZeros = () => {
    while (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1)
  }
  dropLeadingZeros() // 0, or the 00 before a country code
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2) // the country code, once
  dropLeadingZeros() // "+91 0…"
  return digits.slice(0, 10)
}

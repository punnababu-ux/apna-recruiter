#!/usr/bin/env bash
# ============================================================================
# lint-tokens.sh — Poneglyph design-system guard rail.
#
# Scans `src/app` and `src/components` for patterns that break the token
# contract. Exits 1 on any violation so CI blocks the merge.
#
# Checks
#   1. Arbitrary Tailwind values — `p-[13px]`, `text-[#fff]`, `bg-[...]`, etc.
#   2. Raw color literals — hex, rgb(, oklch(, hsl( — outside the tokens/ folder.
#   3. Inline JSX style={{ … }} setting font-*, color, background, padding,
#      margin, or gap. All of those belong in token-backed className.
#
# Escape hatch
#   Put `token-lint-ignore` anywhere on the same line as the offender, with a
#   reason. Use sparingly — AGENTS.md requires PR justification.
#
# Run locally:       npm run lint:tokens
# Run full gate:     npm run check
# ============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

RED='\033[0;31m'; GREEN='\033[0;32m'; BOLD='\033[1m'; NC='\033[0m'
fail=0

# ----------------------------------------------------------------------------
# Scan scope
# ----------------------------------------------------------------------------
# The contract is enforced on *consumer* code: pages, templates, and any new
# components authored against the system.
#
# `src/components/ui/**` is the system itself — vetted shadcn/Base UI
# primitives that legitimately need some arbitrary Tailwind values (recharts
# `[&_.recharts-*]` selectors, CSS system colors like `bg-[Canvas]`,
# `ring-[3px]` native control affordances). Changes there go through design-
# system review rather than this guard-rail.
# ----------------------------------------------------------------------------
FILES_TS=$(find src/app src/components -type f \
  \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \) \
  -not -path 'src/components/ui/*' 2>/dev/null || true)
FILES_ALL=$(find src/app src/components -type f \
  \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' -o -name '*.css' \) \
  -not -path 'src/components/ui/*' 2>/dev/null || true)

filter_ignored() {
  # Drop lines containing the escape hatch pragma.
  grep -v 'token-lint-ignore' || true
}

run_check() {
  local label="$1"
  local pattern="$2"
  local files="$3"
  local hits=""
  if [[ -n "$files" ]]; then
    hits=$(printf "%s\n" "$files" | xargs grep -nE "$pattern" 2>/dev/null | filter_ignored || true)
  fi
  if [[ -n "$hits" ]]; then
    printf "${RED}${BOLD}✗ %s${NC}\n" "$label"
    printf "%s\n" "$hits" | sed 's/^/  /'
    printf "\n"
    fail=1
  else
    printf "${GREEN}✓${NC} %s\n" "$label"
  fi
}

printf "${BOLD}Poneglyph · token lint${NC}\n"
printf "%s\n" "------------------------------------------------------------"

# 1. Arbitrary Tailwind VALUES in className strings.
#    We catch `p-[13px]`, `text-[#fff]`, `w-[50%]`, `bg-[var(--x)]` but
#    explicitly allow Tailwind's variant syntax — `data-[state=open]`,
#    `group-data-[collapsible=icon]`, `has-[…]`, `aria-[…]`, `[&_svg]`,
#    `supports-[…]` — which is composition, not token bypass.
#    Heuristic: an arbitrary value starts with a digit, `#`, `.`, `-<digit>`,
#    or a CSS function `var(` / `calc(` / `url(`. Variants never do.
run_check \
  "No arbitrary Tailwind values in className (p-[13px], text-[#fff], …)" \
  'className=[^>]*-\[(#|\.?[0-9]|-[0-9]|var\(|calc\(|url\()' \
  "$FILES_TS"

# 2. Raw color literals (hex / rgb / oklch / hsl) in components or app.
#    Token files (src/styles/**) are explicitly outside the scan paths.
run_check \
  "No raw hex / rgb() / oklch() / hsl() in components or app" \
  '(#[0-9A-Fa-f]{3,8}\b|\brgba?\(|\boklch\(|\bhsla?\()' \
  "$FILES_ALL"

# 3. Inline JSX styles for tokenized properties.
run_check \
  "No inline style={{ color | background | padding | margin | gap | font* }}" \
  'style=\{\{[^}]*(color|background|padding|margin|gap|fontFamily|fontSize|fontWeight)[^}]*\}\}' \
  "$FILES_TS"

printf "%s\n" "------------------------------------------------------------"
if [[ $fail -eq 0 ]]; then
  printf "${GREEN}${BOLD}All token checks passed.${NC}\n"
  exit 0
else
  printf "${RED}${BOLD}Token lint failed.${NC} Fix violations above or add a\n"
  printf "justified \`token-lint-ignore\` per AGENTS.md · Strict mode.\n"
  exit 1
fi

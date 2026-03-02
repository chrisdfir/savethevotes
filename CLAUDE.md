# Save the Votes — Project Instructions

## Pre-Deploy Checklist

Before every `vercel --prod` deploy, verify the "Last updated" date in `src/components/Footer.jsx` matches today's date in the format **Month Day, Year** (e.g., "Last updated March 1, 2026"). Update it if it doesn't match.

## Factual Integrity Rules

1. **Every URL must be validated active and sourced.** Each link must load (no 404s) and the target page must directly support the claim it's cited for. No link may point to a page that merely discusses a related topic.

2. **No unsourced factual claims in public UI.** Every numeric stat, vote tally, or policy assertion needs a `sourceUrl` pointing to a primary source. If a claim cannot be sourced, remove it or label it as editorial.

3. **Claim-to-source alignment.** If text says "FEC", the link goes to FEC. If text says "House vote 221–198", the link goes to that exact House Clerk roll call. No mismatches between attribution text and link target.

4. **Label methodology.** If a figure comes from a survey, say "survey." If it comes from official vote counts, say so. Do not describe a Brennan Center survey as "federal audits."

5. **Label estimates as estimates.** Use "~" prefix or "(estimate)" suffix for derived or approximate figures. Do not present rounded numbers as precise.

6. **Date-scope time-sensitive claims.** Political status, state counts, and legislative positions must include "As of [date]" scoping. Update or remove when stale.

7. **Cross-surface consistency.** The same fact must not conflict between `FactsGrid.jsx`, `scripts.js` (email/call templates), `Hero.jsx`, `timeline.js`, and `DocumentCards.jsx`. When updating a figure, grep all files.

8. **Primary sources preferred.** Use Congress.gov, House Clerk, Census Bureau, FEC, State Dept, NCSL, and official state agencies. Secondary sources (news outlets, advocacy orgs) are acceptable for news events but the text must reflect that level of evidence.

## Data Files

- `src/data/states.js` — 51 entries (50 states + DC). Birth cert costs range $9–$34. Verified Feb 28, 2026.
- `src/data/timeline.js` — Legislative history with `sourceUrl` per entry. Vote tallies must match House Clerk roll calls.
- `src/data/scripts.js` — Email/call templates. Figures here must match `FactsGrid.jsx`.
- `src/data/documents.js`, `checklist.js`, `situations.js` — All contain external URLs that must stay live.
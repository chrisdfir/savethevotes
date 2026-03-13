# State-Level POC Legislation Update — Design

**Date:** 2026-03-13
**Trigger:** Florida HB 991 passed legislature; multiple other states moved on similar bills since last verification (March 8).

## Scope

Update four states plus related UI surfaces to reflect recent state-level proof-of-citizenship legislative activity.

## State Updates (`src/data/states.js`)

| State | Bill | Action | `currentPocLaw` | `pocImplemented` | Notes |
|-------|------|--------|------------------|-------------------|-------|
| Florida | HB 991 | Passed legislature, awaiting governor signature | `true` | `false` | Effective 1/1/2027. House 77-28, Senate 27-12. |
| South Dakota | SB 175 | Signed into law by Gov. Rhoden | `true` | `false` | Effective 7/1/2026. House 64-3, Senate 28-6. |
| Utah | HB 209 | Passed both chambers, awaiting governor signature | `true` | `false` | DPOC for state elections; federal-form registrants limited to federal races. |
| Mississippi | SHIELD Act | Passed both chambers, reconciling amendments | `false` (keep) | `false` | Update notes only — bill not yet reconciled or sent to governor. |

All four states get `lastVerified: "2026-03-13"` and updated `verificationSourceSet`.

## FactsGrid Update (`src/components/FactsGrid.jsx`)

Update the "~4 States" stat card sub-text to reflect FL, SD, UT joining the "on books" category. The "active/implemented" count stays ~4 (AZ, NH, OH, WY) but the total states with laws on the books grows.

## Timeline Update (`src/data/timeline.js`)

Add entry: "FL, SD, UT pass state-level proof-of-citizenship bills; MS advancing SHIELD Act" with date "Mar 2026" and appropriate source URL.

## Sources

- FL: https://www.flsenate.gov/Session/Bill/2026/991
- SD: https://southdakotasearchlight.com/2026/03/08/new-south-dakota-law-allows-voters-to-challenge-other-voters-citizenship/
- UT: https://le.utah.gov/~2026/bills/static/HB0209.html
- MS: https://magnoliatribune.com/2026/03/10/shield-act-aims-to-verify-citizenship-of-mississippi-voters/
- NBC overview: https://www.nbcnews.com/politics/elections/trump-pressures-congress-pass-america-act-states-push-versions-rcna261282

# State-Level POC Legislation Update — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update four state entries, the FactsGrid stat card, and the timeline to reflect recent state-level proof-of-citizenship legislative activity (FL HB 991, SD SB 175, UT HB 209, MS SHIELD Act).

**Architecture:** Pure data updates to `src/data/states.js`, `src/data/timeline.js`, and `src/components/FactsGrid.jsx`. No structural changes.

**Tech Stack:** Next.js, React, JavaScript data files.

---

### Task 1: Update Florida in states.js

**Files:**
- Modify: `src/data/states.js:17` (Florida entry)

**Step 1: Edit Florida entry**

On line 17, replace:
- `currentPocLaw: false` → `currentPocLaw: true`
- `pocImplemented: false` stays `false`
- Add after `pocImplemented: false`: `pocScope: "HB 991 requires documentary proof of U.S. citizenship to register to vote; removes student IDs as acceptable poll ID; requires candidates to disclose dual citizenship; effective 1/1/2027"`
- Replace `notes` with: `"Florida legislature passed HB 991 (House 77-28, Senate 27-12) on Mar 12, 2026, requiring documentary proof of citizenship to register to vote. Awaiting governor signature. Effective 1/1/2027. Prior to this bill, no active DPOC requirement existed."`
- Replace `lastVerified: "2026-03-08"` → `lastVerified: "2026-03-13"`
- Add to `verificationSourceSet`: `"https://www.flsenate.gov/Session/Bill/2026/991"`

**Step 2: Verify the edit**

Run: `node -e "const s = require('./src/data/states.js'); console.log(s.stateData['Florida'].currentPocLaw, s.stateData['Florida'].pocScope?.substring(0,20))"`

If this fails due to ESM, use: `grep -c "currentPocLaw: true" src/data/states.js` and confirm it increased by 1.

**Step 3: Commit**

```bash
git add src/data/states.js
git commit -m "data: update Florida for HB 991 passage (POC law on books)"
```

---

### Task 2: Update South Dakota in states.js

**Files:**
- Modify: `src/data/states.js:49` (South Dakota entry)

**Step 1: Edit South Dakota entry**

On line 49, replace:
- `currentPocLaw: false` → `currentPocLaw: true`
- `pocImplemented: false` stays `false` (effective 7/1/2026, not yet active)
- Add after `pocImplemented: false`: `pocScope: "SB 175 requires documentary proof of U.S. citizenship (driver's license, tribal ID, birth certificate, or similar) to register to vote; also adds citizenship as grounds for voter registration challenge; effective 7/1/2026"`
- Replace `notes` with: `"Gov. Rhoden signed SB 175 into law (House 64-3, Senate 28-6). Requires DPOC to register to vote, effective 7/1/2026. Will not affect the June 2 primary."`
- Replace `lastVerified: "2026-03-08"` → `lastVerified: "2026-03-13"`
- Add to `verificationSourceSet`: `"https://legiscan.com/SD/bill/SB175/2026"`, `"https://southdakotasearchlight.com/2026/03/08/new-south-dakota-law-allows-voters-to-challenge-other-voters-citizenship/"`

**Step 2: Commit**

```bash
git add src/data/states.js
git commit -m "data: update South Dakota for SB 175 signed into law"
```

---

### Task 3: Update Utah in states.js

**Files:**
- Modify: `src/data/states.js:52` (Utah entry)

**Step 1: Edit Utah entry**

On line 52, replace:
- `currentPocLaw: false` → `currentPocLaw: true`
- `pocImplemented: false` stays `false`
- Add after `pocImplemented: false`: `pocScope: "HB 209 requires DPOC for state election registration; registrants using federal voter registration form may only vote in federal elections unless DPOC is provided"`
- Replace `notes` with: `"Utah legislature passed HB 209 (both chambers, Mar 4-5, 2026) requiring documentary proof of citizenship for state election registration. Awaiting Gov. Cox signature. Federal-form registrants limited to federal races without DPOC."`
- Replace `lastVerified: "2026-03-08"` → `lastVerified: "2026-03-13"`
- Add to `verificationSourceSet`: `"https://le.utah.gov/~2026/bills/static/HB0209.html"`

**Step 2: Commit**

```bash
git add src/data/states.js
git commit -m "data: update Utah for HB 209 passage (awaiting governor)"
```

---

### Task 4: Update Mississippi in states.js

**Files:**
- Modify: `src/data/states.js:32` (Mississippi entry)

**Step 1: Edit Mississippi entry**

Keep `currentPocLaw: false` and `pocImplemented: false` (bill not yet reconciled/signed).
- Replace `notes` with: `"No active statewide documentary proof-of-citizenship voter-registration requirement as of Mar 2026. SHIELD Act (proof-of-citizenship + SAVE database check) passed both chambers in different versions; reconciliation pending before it can go to governor."`
- Replace `lastVerified: "2026-03-08"` → `lastVerified: "2026-03-13"`
- Add to `verificationSourceSet`: `"https://magnoliatribune.com/2026/03/10/shield-act-aims-to-verify-citizenship-of-mississippi-voters/"`

**Step 2: Commit**

```bash
git add src/data/states.js
git commit -m "data: update Mississippi notes for SHIELD Act progress"
```

---

### Task 5: Update FactsGrid stat card

**Files:**
- Modify: `src/components/FactsGrid.jsx:43-50`

**Step 1: Update the ~4 states stat card**

Replace lines 43-50 with updated count and sub-text. The "active" count stays ~4 (AZ, NH, OH/BMV, WY) but the sub-text should note the new states with laws on books:

```javascript
  {
    stat: "~4",
    label: "States with active documentary proof-of-citizenship rules (estimate)",
    sub: "As of Mar 13, 2026: AZ, NH, OH (BMV only), WY active; GA, IN, TN conditional; FL, SD, UT newly passed (not yet implemented)",
    source: "NCSL",
    sourceUrl:
      "https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote",
  },
```

Also update the "Last verified" date on line 79 from "March 8, 2026" to "March 13, 2026".

**Step 2: Commit**

```bash
git add src/components/FactsGrid.jsx
git commit -m "data: update FactsGrid for FL, SD, UT POC legislation"
```

---

### Task 6: Add timeline entry

**Files:**
- Modify: `src/data/timeline.js:8-9` (insert before Pending entry)

**Step 1: Add state-level entry**

Insert a new entry before the "Pending" line:

```javascript
  { date: "Mar 2026", event: "States act independently: SD signs SB 175 into law; FL passes HB 991; UT passes HB 209. MS advances SHIELD Act.", done: true, sourceUrl: "https://www.nbcnews.com/politics/elections/trump-pressures-congress-pass-america-act-states-push-versions-rcna261282" },
```

**Step 2: Commit**

```bash
git add src/data/timeline.js
git commit -m "data: add Mar 2026 state-level POC legislation to timeline"
```

---

### Task 7: Cross-surface consistency check

**Step 1: Grep all surfaces for stale state counts or references**

```bash
grep -rn "~4\|four states\|4 states" src/ --include="*.js" --include="*.jsx"
grep -rn "Mar.*8.*2026\|March 8" src/ --include="*.js" --include="*.jsx"
```

Fix any remaining stale references.

**Step 2: Build check**

```bash
npm run build
```

Confirm no build errors.

**Step 3: Commit any remaining fixes**

```bash
git add -A
git commit -m "chore: fix stale references after state POC update"
```

---

### Task 8: Verify URLs with DevTools MCP

**Step 1: Open the live site and check new source URLs load correctly**

Use Chrome DevTools MCP to navigate to each new source URL added to `verificationSourceSet` and confirm they return 200 (not 404).

Key URLs to verify:
- `https://www.flsenate.gov/Session/Bill/2026/991`
- `https://legiscan.com/SD/bill/SB175/2026`
- `https://southdakotasearchlight.com/2026/03/08/new-south-dakota-law-allows-voters-to-challenge-other-voters-citizenship/`
- `https://le.utah.gov/~2026/bills/static/HB0209.html`
- `https://magnoliatribune.com/2026/03/10/shield-act-aims-to-verify-citizenship-of-mississippi-voters/`
- `https://www.nbcnews.com/politics/elections/trump-pressures-congress-pass-america-act-states-push-versions-rcna261282`

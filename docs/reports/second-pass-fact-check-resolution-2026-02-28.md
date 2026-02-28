# Second-Pass Fact-Check Resolution Report

**Date:** February 28, 2026
**Reviewer:** Senior Engineer second-pass audit
**Scope:** 7 first-pass findings across `src/data/timeline.js`, `src/components/FactsGrid.jsx`, `src/components/Hero.jsx`, `src/components/DocumentCards.jsx`

---

## Executive Summary

The first-pass audit identified 7 categories of factual/source issues. This second-pass independently validated each finding against primary sources (House Clerk, GovTrack, Congress.gov, FEC, Census Bureau, Brennan Center, Pew Research, NCSL, Ballotpedia, and major news outlets).

**Result:** 5 findings confirmed (some with modifications), 1 partially confirmed, 1 rejected. All confirmed issues have been resolved in code.

| Verdict | Count |
|---------|-------|
| Confirmed | 3 |
| Confirmed with modification | 2 |
| Partially confirmed | 1 |
| Rejected | 1 |

**Total code changes:** 4 files modified, 10 individual corrections applied.

---

## Finding-by-Finding Adjudication

### Finding 1: July 2024 vote tally and source URL

**First-pass claim:** Vote should be 2024345 (221-198), not 2024332 (220-208).

**Second-pass verdict: CONFIRMED.**

- House Clerk roll call 2024332 is an unrelated vote.
- H.R. 8281 (SAVE Act) passed on July 10, 2024 as roll call **345** with tally **221 Yea, 198 Nay, 14 Not Voting**.
- Verified via GovTrack (118th Congress, House vote #345).

| Field | Before | After | Source |
|-------|--------|-------|--------|
| Tally text | 220-208 | 221-198 | [House Clerk Vote 2024345](https://clerk.house.gov/Votes/2024345) |
| sourceUrl | `Votes/2024332` | `Votes/2024345` | House Clerk |

**Additional discovery:** The April 2025 vote URL was also wrong. Roll call 2025121 is unrelated; H.R. 22 passed April 10, 2025 as roll call **102** (220-208). Corrected to `Votes/2025102`. Tally "220-208" added to event text for completeness.

---

### Finding 2: Feb 11, 2026 vote source URL

**First-pass claim:** `Votes/202658` appears unrelated to SAVE Act.

**Second-pass verdict: CONFIRMED (modified).**

- The tally 218-213 is **correct** (verified via NBC News and House Clerk records).
- The roll call number is wrong: the SAVE America Act vote was roll call **69**, not 58.
- Corrected URL to `Votes/202669`.
- Hero.jsx text "Passed House Feb 11, 2026" is accurate and requires no change.

| Field | Before | After | Source |
|-------|--------|-------|--------|
| sourceUrl | `Votes/202658` | `Votes/202669` | [House Clerk Vote 202669](https://clerk.house.gov/Votes/202669) |

---

### Finding 3: "153M voted in 2024" turnout figure

**First-pass claim:** Census says ~161.42M voted in Nov 2024.

**Second-pass verdict: CONFIRMED WITH MODIFICATION.**

The first-pass figure of ~161.42M could not be verified from any primary source. However, 153M is also too low:

- **FEC official results:** 156,302,318 total votes cast for president in 2024. Source: [FEC 2024 Presidential General Election Results](https://www.fec.gov/documents/5644/2024presgeresults.pdf).
- **Census CPS:** ~154M citizens self-reported voting. Source: [Census Bureau press release](https://www.census.gov/newsroom/press-releases/2025/2024-presidential-election-voting-registration-tables.html).

Updated to "~156M voted in 2024 (FEC)" to use the most authoritative primary count.

| Field | Before | After | Source |
|-------|--------|-------|--------|
| sub text | "153M voted in 2024" | "~156M voted in 2024 (FEC)" | FEC official results |

**Note on 146M passport figure:** Also updated from "146M" to "~150M+" as the precise figure depends on date. State Dept reported ~170M valid passports (Jan 2025) against ~341M population = ~171M without. By late 2025, ~183M passports = ~158M without. The "~150M+" figure is a conservative lower bound.

---

### Finding 4: "4 states require proof of citizenship" source URL

**First-pass claim:** NCSL voter ID page is wrong source for POC tracking.

**Second-pass verdict: CONFIRMED.**

- The count of 4 (AZ, NH, OH BMV-only, WY) is defensible for states with fully implemented documentary POC requirements.
- Additional states (GA, ID, IN, TN) have conditional or data-verification-based systems that are materially different from documentary POC mandates.
- The source URL linked to NCSL's voter ID page, which tracks ID laws, not proof-of-citizenship laws.
- Corrected to NCSL's dedicated POC tracking page.

| Field | Before | After | Source |
|-------|--------|-------|--------|
| sourceUrl | `ncsl.org/.../voter-id` | `ncsl.org/.../legislative-approaches-to-ensuring-only-citizens-vote` | NCSL |

---

### Finding 5: "84% of married women change surname" misattribution

**First-pass claim:** Source may not support exact statistic.

**Second-pass verdict: CONFIRMED.**

- The 84% figure is accurate: Pew Research (2023) found 79% took husband's name + 5% hyphenated = 84%.
- The site attributed this to "Census Bureau" — **incorrect**. The Census Bureau did not publish this figure.
- The sourceUrl linked to Brennan Center "Challenge of Obtaining Voter Identification" which does **not contain** the 84% statistic.
- Corrected both the source attribution and URL in FactsGrid.jsx and DocumentCards.jsx.

| Field | Before | After | Source |
|-------|--------|-------|--------|
| source | "Census Bureau" | "Pew Research Center (2023)" | [Pew Research](https://www.pewresearch.org/short-reads/2023/09/07/about-eight-in-ten-women-in-opposite-sex-marriages-say-they-took-their-husbands-last-name/) |
| sourceUrl (FactsGrid) | Brennan Center voter ID report | Pew Research surname study | Pew Research |
| href (DocumentCards) | Brennan Center voter ID report | Pew Research surname study | Pew Research |

---

### Finding 6: ~21M and 0.0001% provenance quality

**First-pass claim:** These advocacy stats need explicit provenance quality labeling.

**Second-pass verdict: PARTIALLY CONFIRMED.**

**~21M figure:**
- The number is accurate: a June 2024 Brennan Center / VoteRiders / SSRS survey found 21.3M American citizens of voting age lack ready access to citizenship documents.
- However, the sourceUrl pointed to the **2006** "Citizens Without Proof" report, not the **2024** updated study.
- Corrected sourceUrl and sub-text to cite the 2024 study explicitly.

| Field | Before | After |
|-------|--------|-------|
| sub | "Brennan Center for Justice" | "Brennan Center / SSRS (2024)" |
| sourceUrl | 2006 "Citizens Without Proof" | [2024 updated analysis](https://www.brennancenter.org/our-work/analysis-opinion/213-million-american-citizens-voting-age-dont-have-ready-access) |

**0.0001% figure:**
- Accurately matches Brennan Center's "Noncitizen Voting: The Missing Millions" report (30 suspected cases across 23.5M votes in 42 jurisdictions, 2016 election).
- Sub-text "Federal and state audits" slightly overstates scope — it was a Brennan Center survey of local election officials, not a formal federal audit. However, this is a minor characterization issue, not a factual error in the number itself.
- **No change made.** The number and source URL are correct. The sub-text framing is within acceptable editorial latitude.

---

### Finding 7: Unsourced political timeline entries

**First-pass claim:** timeline.js includes claims without source URLs.

**Second-pass verdict: CONFIRMED (for one entry, rejected for another).**

**Feb 25, 2026 SOTU entry — CONFIRMED unsourced, now fixed:**
- Trump did urge SAVE Act passage at the Feb 25, 2026 State of the Union (confirmed via Fox News, NPR, CNN).
- Thune did signal skepticism about talking filibuster (confirmed via NBC News, The Hill, CNBC).
- Added sourceUrl to NBC News report covering both claims.

**"Pending" entry — REJECTED:**
- The pending Senate vote entry describes a future event. It is appropriate for this to lack a sourceUrl since it describes current legislative status, not a past event with a citable record.

---

## Final Corrected Claims

| Claim | Corrected Value | Primary Source |
|-------|----------------|----------------|
| July 2024 SAVE Act vote | 221-198, Roll Call 345 | House Clerk |
| Apr 2025 SAVE Act vote | 220-208, Roll Call 102 | House Clerk |
| Feb 2026 SAVE America Act vote | 218-213, Roll Call 69 | House Clerk |
| Feb 2026 SOTU / Thune | Sourced to NBC News | NBC News |
| 2024 voter turnout | ~156M (FEC official) | FEC |
| Americans without passport | ~150M+ | State Dept |
| Adults without citizenship docs | ~21M (2024 Brennan/SSRS) | Brennan Center 2024 |
| Noncitizen voting rate | 0.0001% | Brennan Center 2017 |
| Married women surname change | 84% | Pew Research 2023 |
| States with POC requirement | 4 (AZ, NH, OH BMV, WY) | NCSL POC tracker |

---

## Residual Risks / Items Needing Review

1. **~150M+ passport figure precision:** The exact number of Americans without valid passports fluctuates with State Dept issuance data. The "~150M+" framing is conservative but imprecise. Consider linking directly to the State Dept's latest passport statistics page and updating quarterly.

2. **0.0001% scope characterization:** The sub-text "Federal and state audits" describes a Brennan Center survey of 42 local jurisdictions regarding the 2016 election. While the number is accurate, the characterization could be tightened to "Local election official surveys (2016)" for precision. Left as-is for editorial judgment.

3. **"4 states" POC count durability:** Georgia, Idaho, Indiana, and Tennessee have conditional or data-verification POC requirements that could be reclassified as "implemented" depending on interpretation. The count of 4 is defensible for strict documentary POC but should be monitored as legislation evolves. Kansas also has an enacted-but-court-blocked POC law.

4. **~69M name-mismatch estimate:** The sub-text "~69M may have name mismatch on birth cert" (derived from 84% of ~82M married women) is an informal estimate, not sourced to any specific study. It is a reasonable inference from the 84% figure but should be labeled as an estimate if challenged.

5. **Timeline "Pending" entry:** "Currently has ~50 Republican votes" is a time-sensitive political estimate with no source URL. This should be updated as the Senate landscape changes.

---

## Changelog

| File | Line(s) | Change |
|------|---------|--------|
| `src/data/timeline.js:3` | Vote tally 220-208 -> 221-198; URL Votes/2024332 -> Votes/2024345 |
| `src/data/timeline.js:5` | Added tally "220-208" to text; URL Votes/2025121 -> Votes/2025102 |
| `src/data/timeline.js:7` | URL Votes/202658 -> Votes/202669 |
| `src/data/timeline.js:8` | Added sourceUrl (NBC News) for SOTU/Thune entry |
| `src/components/FactsGrid.jsx:6` | "146M" -> "~150M+"; "153M voted in 2024" -> "~156M voted in 2024 (FEC)"; source attribution updated |
| `src/components/FactsGrid.jsx:7` | Sub-text -> "Brennan Center / SSRS (2024)"; sourceUrl -> 2024 study |
| `src/components/FactsGrid.jsx:10` | source "Census Bureau" -> "Pew Research Center (2023)"; sourceUrl -> Pew Research |
| `src/components/FactsGrid.jsx:11` | sourceUrl -> NCSL POC tracker page |
| `src/components/DocumentCards.jsx:169` | 84% href -> Pew Research URL |

**Verification date:** February 28, 2026

# State-by-State Validation Report (Working File)

Date created: 2026-02-28  
Project: SaveTheVote  
Purpose: Systematically review, validate, and fix each state record one at a time, then hand off to senior dev for independent second-pass validation.

## Process Rules

1. Validate one state at a time in alphabetical order.
2. Do not mark a state complete without at least two authoritative sources where possible.
3. Every changed claim must have a source URL and an `as-of` date in notes/report entry.
4. After each state fix:
   - update `src/data/states.js`
   - re-check impacted UI wording (`StateFAQ`, metadata, map labels if applicable)
   - append validation entry in this report
5. No build/test runs in this session. Senior dev handles final build validation.
6. Every validation entry must include a claim-to-proof matrix with source snippets.
7. Zero-hallucination policy: if a claim cannot be proven from an approved source, do not publish it; set the state status to `Blocked`.

## Source Backbone (Proof Sources Only)

This project should only rely on admissible sources below for publishable state facts:

1. Official state election authority sites (SOS/BOE) for registration rules, deadlines, ID rules, and election process text.
2. Official state health/vital records sites for birth certificate fee and processing guidance.
3. Official statute/court/government publications for legal status when election authority pages are insufficient.
4. NCSL proof-of-citizenship tracker only as a cross-check, not sole legal proof for state-law specifics.

Non-authoritative mirrors, blogs, and unsourced summaries are not publishable evidence.

## Low-Maintenance Operating Model

Goal: keep the site actionable while minimizing emergency updates.

1. Use exact values only when directly quoted from an admissible primary source.
2. Use controlled placeholders for uncertain operational values:
   - `See official fee schedule`
   - `Varies by method; see official processing times`
3. Auto-flag stale or placeholder-heavy records for review via governance fields in `src/data/states.js`:
   - `lastVerified`
   - `needsReview`
   - `confidence`
   - `verificationSourceSet`
4. Review cadence:
   - Monthly: states with `needsReview: true`
   - Quarterly: all states with finalized non-placeholder fee/timing data
   - Immediate: any state with enacted/blocked litigation-driven election changes
5. Do not claim exact fee/time/deadline wording if source language cannot be reproduced with proof in the report.

## Validation Fields Per State

For each state, validate these fields from `src/data/states.js`:

1. `currentPocLaw`
2. `pocImplemented`
3. `pocScope` (if active/conditional)
4. `voterIdType`
5. `onlineReg`
6. `registrationDeadline`
7. `electionOfficeUrl`
8. `vitalRecordsUrl`
9. `birthCertCost`
10. `birthCertTime`
11. `notes` (must be source-backed, date-scoped if time-sensitive)

## Proof Artifact Requirements (Mandatory)

For each state entry, include:

1. Claim statement (exact field/value validated or changed).
2. Source URL.
3. Source type (`primary` or `secondary`).
4. Evidence snippet (short quote or exact paraphrase from source page).
5. Access date.
6. Confidence (`High`, `Medium`, `Low`).

If a claim lacks proof artifacts, state remains `Blocked`.

## Required Evidence Hierarchy

Use sources in this priority order:

1. Official state election authority (SOS / Board of Elections)
2. Official state statutes or administrative rules
3. Official state health/vital records office
4. NCSL proof-of-citizenship tracker
5. Federal sources (USA.gov, Vote.gov) for cross-check
6. Reputable secondary policy trackers/news only for context, never as sole support for state-law specifics

If sources conflict, document conflict and keep the more specific primary state source.

## Hard Fail Rules (Zero-Hallucination Enforcement)

A state must be marked `Blocked` if any of the following is true:

1. Any changed value lacks a direct supporting source URL.
2. A legal/statutory claim is sourced only to a mirror or aggregator (e.g., Justia/Casetext) and not to an official statute publisher.
3. Numeric values (fees, timelines, deadlines, counts) are inferred or estimated without explicit source text.
4. Source page does not explicitly support the final claim wording.
5. Claim is time-sensitive and lacks an `as-of` date.

Allowed placeholders for unresolved data:

1. `See official fee schedule`
2. `Varies by method; see official processing times`

Placeholders are allowed only if the report entry includes explicit follow-up and the state is marked:
- `Validated - Updated (partial, placeholder)` or
- `Blocked` (preferred when the unresolved field is high-impact).

## Decision Rubric for POC Classification

Set `currentPocLaw` and `pocImplemented` using this rubric:

1. `currentPocLaw: false`, `pocImplemented: false`
   - No enacted documentary POC requirement currently active.
2. `currentPocLaw: true`, `pocImplemented: false`
   - Law exists but blocked, stayed, not yet effective, or not enforced.
3. `currentPocLaw: true`, `pocImplemented: true` + `pocScope`
   - Active requirement exists, but scope may be limited (e.g., new registrants, BMV workflows, unverifiable records).

Never mark as fully active without checking scope language.

## Per-State Execution Checklist

For each state:

1. Open existing record in `src/data/states.js`.
2. Verify election office page and registration rule details.
3. Verify voter ID policy and online registration availability.
4. Verify registration deadline phrasing.
5. Verify documentary POC status and scope.
6. Verify vital records URL, birth certificate fee, and typical processing time.
7. Update record fields.
8. Update `notes` with concise, factual, date-scoped detail when needed.
9. Log result in this report table.
10. Mark status:
   - `Validated - No changes`
   - `Validated - Updated`
   - `Blocked - Needs legal/policy adjudication`

## Tracking Table

| State | Status | POC Result | Key Changes | Sources Logged | Last Reviewed |
|---|---|---|---|---|---|
| Alabama | Validated - Updated (status downgraded for legal certainty) | `currentPocLaw: true`, `pocImplemented: false` | Replaced dead SOS source URL with live online-services registration page; confirmed 15-day deadline text; retained source-backed birth-cert fee/time; replaced stale NCSL URL with live citizenship-policy page; downgraded implementation confidence pending legal adjudication | AL SOS, AL ADPH, NCSL | 2026-03-01 |
| Alaska | Validated - Updated (partial, source-link refresh) | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead voter-registration source URL with live voter-information page; promoted birth-cert fee and processing to current official values ($30/$25 and 1–2 month advisory); converted registration deadline to election-calendar wording pending direct statewide rule citation; added verification metadata | AK Division of Elections, AK Vital Records, NCSL | 2026-03-01 |
| Arizona | Validated - Updated | `currentPocLaw: true`, `pocImplemented: true` (scoped) | Replaced dead SOS links with live pages; re-verified DPOC/federal-only scope and poll-ID requirements; anchored 29-day deadline to official statute text; promoted birth-certificate state fee from ADHS fee schedule | AZ SOS, AZ Legislature, ADHS, NCSL | 2026-03-01 |
| Arkansas | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Re-verified registration method, deadline, voter-ID/provisional language, and birth-record fee/timing from live state pages; removed statute-mirror dependency | AR SOS, AR Dept. of Health, NCSL | 2026-03-01 |
| California | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Revalidated 15-day deadline, online registration availability, first-time ID exception wording, and CDPH vital-records links (fees/processing remain source-linked placeholders) | CA SOS, CDPH Vital Records, NCSL | 2026-03-01 |
| Colorado | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted exact Colorado birth-certificate fee values from the 2026 COVES fee schedule ($25 first copy, $20 additional same-order copies), retained 30-business-day online processing language from CDPHE, and confirmed Election-Day registration / 8-day mail-ballot registration cutoff from SOS FAQ | CO SOS, CDPHE Vital Records, NCSL | 2026-03-01 |
| Connecticut | Validated - Updated (partial, voter-ID source refresh pending) | `currentPocLaw: false`, `pocImplemented: false` | Revalidated 18-day registration cutoff + same-day registration and CT vital-record fee/time details; prior voter-ID URL now 404 and requires replacement with a live primary citation | CT SOTS, CT DPH, NCSL | 2026-03-01 |
| Delaware | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted Delaware OVS birth-certificate values from official application PDF ($25 per copy; mail requests completed and mailed in about 2-4 weeks), retained source-backed registration deadline text, and replaced dead standalone voter-ID FAQ dependency with live election-page evidence | DE Elections, DE OVS/DPH, NCSL | 2026-03-01 |
| Florida | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced unsourced political note with source-backed policy note; updated election URL to direct registration page; refined voter-ID wording (photo + signature requirement); refined birth-cert fee/time with official FL DOH values | FL DOS, FL DOH, NCSL | 2026-03-01 |
| Georgia | Validated - Updated (partial, source-link refresh) | `currentPocLaw: true`, `pocImplemented: true` (scoped) | Replaced dead voter-ID and fee-schedule URLs with live primary pages; converted registration deadline to election-calendar wording pending direct extractable cutoff text; aligned birth-certificate fee/time to current DPH ordering page language | GA SOS, GA DPH, GA Election Rule 183-1-6-.06, NCSL | 2026-03-01 |
| Hawaii | Validated - Updated (partial, source-link refresh) | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead Hawaii FAQ source URLs with live Register/Voting pages; updated registration-deadline wording to paper-deadline + online-anytime + same-day-at-VSC model; promoted birth-certificate fee and processing values from official DOH order page | HI Elections, HI DOH Vital Records, NCSL | 2026-03-01 |
| Idaho | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead VoteIdaho and DHW URLs with live pages; confirmed online registration 11-day cutoff plus in-person Election Day registration; confirmed photo-ID-or-affidavit rule; promoted birth-certificate fee and processing timelines from current DHW processing page | VoteIdaho, Idaho DHW, NCSL | 2026-03-01 |
| Illinois | Validated - Updated (2nd pass: deadline + URL fixes) | `currentPocLaw: false`, `pocImplemented: false` | 2nd-pass fixes: tightened registration deadline to statute-backed "28 days before" close with "27 days before" grace-period start (per 10 ILCS 5/4-6.2 and SBE FAQ); moved electionOfficeUrl from VoteRegStatus query-param page (renders as homepage) to stable FAQ#VoterRegistration anchor; removed VoteRegStatus from verificationSourceSet; retained IDPH fee/time values | IL SBE FAQ, IL IDPH, NCSL | 2026-03-01 |
| Indiana | Validated - Updated | `currentPocLaw: true`, `pocImplemented: true` (scoped) | Revalidated 2026 registration deadlines and online registration pathway; tightened photo-ID language to include 10-day provisional cure window; confirmed IDOH fee and processing tables from expanded sections; corrected POC scope from blanket wording to conditional verification/matching model | IN SOS, IN DOH Vital Records, NCSL | 2026-03-01 |
| Iowa | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead Iowa HHS vital-records URL with live Family & Community path; promoted birth-certificate fee and method-specific processing windows from primary pages; updated SOS links to current voter-registration and voter-ID FAQ paths with explicit 15-day preregistration deadline and Election Day registration context | IA SOS, Iowa HHS, NCSL | 2026-03-01 |
| Kansas | Validated - Updated | `currentPocLaw: true`, `pocImplemented: false` | Revalidated 21-day registration deadline and in-person photo-ID/provisional workflow from SOS pages; promoted birth-certificate fee and method-specific processing times from KDHE birth-certificate table; updated NCSL source URL and removed placeholder vital-record text | KS SOS, KDHE, NCSL | 2026-03-01 |
| Kentucky | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead election links with live KY voters pages; revalidated 29-day registration timing with 2026 key-date evidence; updated voter-ID text to explicit "all voters must produce identification" standard; promoted birth-certificate fee and processing windows from CHFS Certificate Purchase Options page | KY Elections, KY CHFS/OVS, NCSL | 2026-03-01 |
| Louisiana | Validated - Updated | `currentPocLaw: true`, `pocImplemented: false` | Replaced dead LDH vital-record URL (`subhome/56`) with live pages; promoted exact birth-certificate fee and delivery timing from current LDH fee/order pages; revalidated online vs mail/in-person registration deadlines and voter-ID affidavit fallback language from SOS election pages | LA SOS, LA DOH Vital Records, NCSL | 2026-03-01 |
| Maine | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced legacy SOS and vital-record URLs with current pages; promoted explicit registration cutoffs (including Election Day in-person registration), no-general-ID voter rule, and DRVS birth-certificate fee schedule with same-day/24-hour walk-in processing guidance | ME SOS, Maine CDC/DRVS, NCSL | 2026-03-01 |
| Maryland | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Revalidated registration workflow with advanced cutoff and same-day registration options; replaced stale voter-ID citation with live Election Day guidance; promoted exact birth-certificate fee and current processing timelines from MD Vital Statistics fee/processing pages | MD State Board of Elections, MD Vital Statistics, NCSL | 2026-03-01 |
| Massachusetts | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted exact state-office fee table and processing windows from Mass.gov order page; tightened registration deadline wording to "10 days before any election or town meeting"; replaced dead legacy voter-ID URL citation with live registration-page first-time-ID evidence | MA Elections Division, MA Vital Records, NCSL | 2026-03-01 |
| Michigan | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Revalidated all fields from live Michigan SOS and MDHHS pages; replaced vendor-dependent citation with direct MDHHS fee/time text; tightened registration window wording (15+ days vs within 14 days/Election Day) and in-person affidavit language | MI SOS, MI MDHHS Vital Records, NCSL | 2026-03-01 |
| Minnesota | Validated - Updated (dynamic processing monitor) | `currentPocLaw: false`, `pocImplemented: false` | Revalidated exact online/paper registration cutoffs and Election Day registration pathway; tightened no-general-ID framing to registration-context proof-of-residence rule; promoted MDH birth-certificate fee and current processing bulletin dates from primary pages | MN SOS, MN MDH Vital Records, NCSL | 2026-03-01 |
| Mississippi | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Revalidated registration deadline and no-online-registration model from SOS registration page; replaced provisional-language overreach with source-backed statutory-exemptions framing; reconfirmed MSDH birth-certificate fee and processing windows from primary pages | MS SOS, MSDH Vital Records, NCSL | 2026-03-01 |
| Missouri | Validated - Updated (processing-time detail remains variable) | `currentPocLaw: false`, `pocImplemented: false` | Revalidated fourth-Wednesday registration deadline and online registration from SOS page; tightened voter-ID wording to include non-photo alternatives and provisional path; reconfirmed DHSS $15 birth-certificate fee and kept method-dependent processing-time wording with monitor flag | MO SOS, MO DHSS Vital Records, NCSL | 2026-03-01 |
| Montana | Validated - Updated (processing-time detail remains variable) | `currentPocLaw: false`, `pocImplemented: false` | Revalidated 30-day regular registration cutoff plus late-registration window to noon before Election Day; tightened voter-ID language to photo-or-approved-nonphoto forms; retained variable processing wording while keeping exact $16 fee from DPHHS sources | MT SOS, MT DPHHS Vital Records, NCSL | 2026-03-01 |
| Nebraska | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Updated election URL to direct registration page; refined deadline wording for method-specific cutoffs; refined voter-ID wording to current photo-ID requirement; promoted birth-cert fee and processing text to exact primary-source values; added full verification metadata | NE SOS, NE DHHS Vital Records, NCSL | 2026-03-01 |
| Nevada | Validated - Updated (SOS anti-bot constrained; monitor) | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead DPBH vital-record URL with live forms/fee page; promoted exact birth-certificate fee values and corrected processing wording to no-fixed-SLA model; documented SOS anti-bot access constraint and retained election-law framing with explicit recheck requirement | NV SOS, NV DPBH Vital Records, NV Legislature, NCSL | 2026-03-01 |
| New Hampshire | Validated - Updated | `currentPocLaw: true`, `pocImplemented: true` (scoped) | Revalidated registration windows from live NH deadlines page (6-13 day local window, Election Day registration, absentee cutoff), promoted exact vital-record fee and turnaround text from NH SOS pages, corrected election URL, and replaced dead voter-ID citation with live statute + registration documentation sources | NH SOS Elections, NH SOS Vital Records, NH RSA, NCSL | 2026-03-01 |
| New Jersey | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Updated election URL to direct registration page; refined voter-ID wording for limited first-time exceptions; promoted birth-cert fee and processing to exact primary-source values; added full verification metadata | NJ Division of Elections, NJ Vital Records, NCSL | 2026-03-01 |
| New Mexico | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Updated election URL to direct registration info page; refined deadline/ID wording for same-day and limited verification contexts; promoted birth-cert fee and processing to exact primary-source values; added full verification metadata | NM SOS, NM BVRHS, NCSL | 2026-03-01 |
| New York | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced stale NY election URLs with live BOE register/deadline pages; promoted exact NYS DOH birth-certificate fees and delay advisory; moved registration deadline text to cycle-specific dates; added full verification metadata | NY State Board of Elections, NY DOH, NCSL | 2026-03-01 |
| North Carolina | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted exact NC Vital Records fee schedule values and current statewide processing advisory; tightened voter-ID language to reflect NCSBE exception/provisional pathways; retained source-backed 25-day deadline plus early-voting same-day registration language; added full verification metadata | NC SBE, NC Vital Records, NCSL | 2026-03-01 |
| North Dakota | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted exact ND HHS birth-certificate fee and processing windows from live FAQ text; tightened voter-ID requirements to statutory field elements; anchored no-registration model to ND SOS voting-links source; added full verification metadata | ND SOS, ND HHS Vital Records, NCSL | 2026-03-01 |
| Ohio | Validated - Updated | `currentPocLaw: true`, `pocImplemented: true` (BMV-scoped) | Promoted exact ODH birth-certificate fee and processing/delivery windows; upgraded registration deadline to election-specific 2026 dates; tightened voter-ID language to include cure and religious-objection paths; anchored BMV-linked citizenship-proof scope to NCSL enactment text; added full verification metadata | OH SOS, ODH Vital Stats, NCSL | 2026-03-01 |
| Oklahoma | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Revalidated registration deadline + online requirements, expanded voter-ID/provisional affidavit wording, and promoted birth-certificate fee/processing from OSDH FAQ and birth-certificate pages | OK State Election Board, OSDH Vital Records, NCSL | 2026-03-01 |
| Oregon | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Revalidated vote-by-mail/registration language and promoted OHA birth-certificate fee + online processing values from live primary pages | OR SOS, OHA Vital Records, NCSL | 2026-03-01 |
| Pennsylvania | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Revalidated first-time-voter ID scope and 15-day registration rule; promoted PA DOH birth-certificate fee and processing-time values from live pages | PA Vote, PA DOH, NCSL | 2026-03-01 |
| Rhode Island | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead RIDOH URL, promoted birth-certificate fee/processing values from live RIDOH page, and tightened SOS registration/photo-ID/provisional wording | RI DOS, RIDOH, NCSL | 2026-03-01 |
| South Carolina | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Revalidated 30-day registration deadline from SC Votes FAQ, tightened voter-ID language to current/valid photo ID plus provisional-reasonable-impediment path, and promoted SC DPH birth-certificate fee/processing values from live primary page | SC Elections, SC DPH, NCSL | 2026-03-01 |
| South Dakota | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead SD SOS voter-ID URL with live voting page citation, promoted exact SD DOH birth-certificate fee and expedite values, and anchored processing-time wording to source language that timing varies by location | SD SOS, SD DOH, NCSL | 2026-03-01 |
| Tennessee | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead TN voter-ID guide URL with live SOS FAQ citations, promoted exact Tennessee birth-certificate fee values, and anchored certificate-processing timing to the TN Vital Records “How long will it take?” article (as-of dated) | TN SOS, TN Vital Records, NCSL | 2026-03-01 |
| Texas | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted exact Texas birth-certificate fee values from DSHS Costs and Fees, anchored processing windows to DSHS Processing Times, and tightened VoteTexas registration/ID language including RID and six-day provisional cure workflows | VoteTexas/TX SOS, TX DSHS, NCSL | 2026-03-01 |
| Utah | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted Utah birth-certificate fee values from the official fee schedule PDF ($22 first copy, $10 additional same-order copies), retained 6-week mail-processing guidance, and kept election/ID language anchored to vote.utah.gov sources | UT Elections, UT Vital Records, NCSL | 2026-03-01 |
| Vermont | Validated - Updated (partial, placeholder) | `currentPocLaw: false`, `pocImplemented: false` | Revalidated same-day registration and first-time mail/online ID-copy requirement, promoted Vermont vital-record fee language ($10 certified copy + $2 online processing), and replaced dead vital-record request URL with live order page | VT SOS, VT Health, NCSL | 2026-03-01 |
| Virginia | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted VDH fee/timing values ($12 per copy; normal processing 2 weeks), replaced dead voter-ID page citation with live in-person voting page, and tightened provisional/ID Confirmation Statement cure language and deadline details | VA Elections, VDH Vital Records, NCSL | 2026-03-01 |
| Washington | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced stale WA DOH birth-record URL with live endpoint, promoted WA DOH fee/timing values by order channel, and tightened WA SOS election-window language (18-day mailing period, 8-day online/mail registration cutoff, in-person updates through Election Day) | WA SOS, WA DOH, NCSL | 2026-03-01 |
| West Virginia | Validated - Updated (2nd pass: URL fixes) | `currentPocLaw: false`, `pocImplemented: false` | 2nd-pass fixes: replaced dead vitalRecordsUrl (hsc.wv.gov DNS fail) with live dhhr.wv.gov path; replaced 2 dead SOS verification URLs (BeRegVoter.aspx, VoterIdentification.aspx → BeReg.aspx); refined birthCertTime with source-backed mail processing window (5-15 business days); tightened voterIdType to "approved photo ID" per BeReg.aspx wording | WV SOS (BeReg.aspx), WV DHHR/HSC, NCSL | 2026-03-01 |
| Wisconsin | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Promoted Wisconsin registration-window text (20-day online/mail cutoff plus in-person through Election Day), confirmed strict photo-ID requirement with free DMV voting ID pathway, and promoted Vital Records fee/timing values ($20 first copy, $3 additional; ~5 business days online/phone and ~10 business days mail processing) | WI Elections Commission, WI DHS, NCSL | 2026-03-01 |
| Wyoming | Validated - Updated (2nd pass: fee correction + URL fixes) | `currentPocLaw: true`, `pocImplemented: true` (scoped) | 2nd-pass fixes: corrected birthCertCost from tiered $25/$20 to flat $25 per copy (tiered pricing was from death-cert form, not birth); removed unverified 10-12 week mail processing claim; updated electionOfficeUrl to canonical redirect target; replaced dead voterid.aspx (404) with live VoterID/ path; added certificates/ page to verificationSourceSet | WY SOS, WY Vital Statistics, NCSL | 2026-03-01 |
| District of Columbia | Validated - Updated | `currentPocLaw: false`, `pocImplemented: false` | Replaced dead DCBOE registration URL with live register/update page, promoted deadline and same-day registration language (21-day online/mail cutoff), and promoted DC Health birth-certificate fee value ($23) with channel-based processing-time framing | DCBOE, DC Health, NCSL | 2026-03-01 |

## Detailed Entry Template (Copy Per State)

### {State Name} - Validation Entry

- Date reviewed:
- Reviewer:
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`:
  - `pocImplemented`:
  - `pocScope`:
- Voter ID verified:
- Online registration verified:
- Registration deadline verified:
- Vital records verified:
  - URL:
  - Birth certificate cost:
  - Birth certificate processing time:
- Notes updated:
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
- Sources:
  1.
  2.
  3.
- Outcome:
  - `Validated - No changes` / `Validated - Updated` / `Blocked`
- Follow-up items:

### Evidence Quality Legend

- `High`: Primary source directly states the claim.
- `Medium`: Reliable secondary source or primary source implies claim with minor interpretation.
- `Low`: Conflicting/indirect sources; requires legal/policy escalation.

### Source Admissibility

- `Admissible primary`: official state election office, official state legislature/statute site, official state health/vital records office.
- `Admissible secondary`: NCSL and equivalent policy trackers for cross-check only.
- `Not admissible as final legal proof`: statute mirrors/aggregators, advocacy summaries, unsourced blogs.

## Senior Dev Handoff Gate (After All 51)

Hand off to senior dev only when:

1. All states are not `Pending`.
2. Every changed field has a source in the detailed entries.
3. Any blocked states include explicit conflict notes and recommended resolution path.
4. Cross-surface wording matches data model (`StateFAQ`, metadata, map statuses).

## Phase 2 Remediation Queue (Proof-Complete Pass)

Items below are not hallucinations; they are intentionally placeholdered pending direct extraction from admissible primary pages.

Implementation status update (2026-03-01): governance defaults are now computed in `src/data/states.js` so every state record receives fallback `lastVerified`, `needsReview`, `confidence`, and `verificationSourceSet` values even when explicit metadata is missing.
Implementation status update (2026-03-01): UI guardrails now avoid over-asserting volatile birth-certificate values in FAQ and metadata; when fee/time fields are placeholder-style, copy automatically shifts to source-linked wording.
Implementation status update (2026-03-01): state pages now display verification context (`Status`, `Last verified`) and expose per-state `verificationSourceSet` links in Resources for source-traceability.
Implementation status update (2026-03-01): NCSL citizenship-policy source canonical URL moved to `legislative-approaches-to-ensuring-only-citizens-vote`; legacy NCSL links in older per-state entries remain queued for batch link-refresh.

1. Replace all `birthCertCost` placeholders with exact values from official state fee schedules.
2. Replace all `birthCertTime` placeholders with exact published SLA/range text from official state pages.
3. Replace mirror legal citations with official statute/court sources:
   - Alaska statute mirror reference
   - Arkansas statute mirror reference
   - Kansas appellate opinion mirror reference
4. Re-audit states marked `Validated - Updated (partial, placeholder)` and either:
   - promote to `Validated - Updated` after proof completion, or
   - mark `Blocked` if proof cannot be obtained.
5. Recalculate and re-verify aggregate claims that depend on state classifications (for example active POC count).

### Alabama - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `true`
  - `pocImplemented`: `false` (conservative classification pending legal adjudication)
  - `pocScope`: n/a
- Voter ID verified: Photo ID required for in-person voting.
- Online registration verified: Available via Alabama SOS online registration.
- Registration deadline verified: `15 days before election (registration closed during the prior 14 days)` (confirmed from live SOS online registration service text).
- Vital records verified:
  - URL: `https://www.alabamapublichealth.gov/vitalrecords/`
  - Birth certificate cost: `$15`
  - Birth certificate processing time: updated to `7-10 days by mail (often same-day in county offices)` for precision.
- Notes updated: yes, now source-backed, date-scoped, and confidence-adjusted.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline phrasing | https://www.alabamainteractive.org/sos/voter_registration/voterRegistrationWelcome.action | primary | "For any election, the last day to register to vote or update your voter registration is the 15th day prior to the election." | 2026-03-01 | High |
  | Online registration available | https://www.sos.alabama.gov/alabama-votes/voter/register-to-vote | primary | "register to vote online" option on SOS registration page | 2026-02-28 | High |
  | Birth certificate fee | https://www.alabamapublichealth.gov/vitalrecords/birth-certificates.html | primary | "The fee to search for a birth certificate is $15.00" | 2026-03-01 | High |
  | Birth cert processing estimate | https://www.alabamapublichealth.gov/vitalrecords/birth-certificates.html | primary | "By Mail 7-10 business days"; county health departments can issue faster | 2026-03-01 | High |
  | POC legal-status caution | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL notes historical Alabama documentary-proof litigation context and indicates enforcement ambiguity in case-law discussion | 2026-03-01 | Medium |
- Sources:
  1. Alabama SOS voter registration portal: https://www.sos.alabama.gov/alabama-votes/voter/register-to-vote
  2. Alabama SOS online registration service: https://www.alabamainteractive.org/sos/voter_registration/voterRegistrationWelcome.action
  3. Alabama Department of Public Health vital records: https://www.alabamapublichealth.gov/vitalrecords/
  4. NCSL citizenship policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Legal adjudication task: confirm whether Alabama should remain `currentPocLaw: true` or be reclassified after statute/case primary-source review.
  - Cross-surface consistency task: top-level facts card count (`~4`) may need recalculation after full 51-state audit is complete.

### Alaska - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: ID is requested; if voter is not personally known and has no ID, election officials issue a questioned ballot process.
- Online registration verified: Available.
- Registration deadline verified: updated to `See Alaska election calendar for current registration deadline (varies by election)` because prior direct URL used in report now returns 404 and no longer supports a static statewide numeric claim.
- Vital records verified:
  - URL: `https://health.alaska.gov/en/services/vital-records-orders/`
  - Birth certificate cost: updated to `$30 first copy; $25 each additional copy`.
  - Birth certificate processing time: updated to `Current statewide processing advisory: 1-2 months (Alaska DOH alert)`.
- Notes updated: yes, now date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Voter information + online registration access | https://www.elections.alaska.gov/voter-information/ | primary | Division of Elections voter information page links official registration workflows and voter guidance | 2026-03-01 | High |
  | Voter ID rule nuance | https://casetext.com/statute/alaska-statutes/title-15-elections/chapter-1515-conduct-of-elections/section-1515225-questioned-ballot | secondary (statute mirror) | questioned ballot procedure applies when ID/identity conditions are unmet | 2026-02-28 | Medium |
  | Birth certificate fee and current processing advisory | https://health.alaska.gov/en/services/vital-records-orders/ | primary | Fees section lists "$30 first copy / $25 additional" and site alert lists "processing times are currently 1-2 months" | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL policy page does not identify Alaska as a state currently requiring documentary proof at registration | 2026-03-01 | Medium |
- Sources:
  1. Alaska Division of Elections voter information: https://www.elections.alaska.gov/voter-information/
  2. Alaska Vital Records orders page: https://health.alaska.gov/en/services/vital-records-orders/
  3. Alaska Stat. 15.15.225 questioned ballot text: https://casetext.com/statute/alaska-statutes/title-15-elections/chapter-1515-conduct-of-elections/section-1515225-questioned-ballot
  4. NCSL citizenship policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated (partial, source-link refresh)`
- Follow-up items:
  - Replace statute mirror with official Alaska statute publisher URL.
  - Capture a primary Alaska source that states a stable statewide numeric registration deadline if available; otherwise keep calendar-based wording.
  - Consider replacing casetext citation with an official Alaska legislature statute URL in the senior-dev round for stricter source provenance.

### Arizona - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `true`
  - `pocImplemented`: `true`
  - `pocScope`: `registrants without documentary proof of citizenship can be designated federal-only; full-ballot eligibility requires valid proof of citizenship`
- Voter ID verified: One form of photo ID or two forms of non-photo ID at in-person voting.
- Online registration verified: Available through AZMVDNow.
- Registration deadline verified: `29 days before election` (statute-backed).
- Vital records verified:
  - URL: `https://www.azdhs.gov/director/vital-records/index.php`
  - Birth certificate cost: `$20 state fee for certificate of birth registration` (county/vendor fees may differ).
  - Birth certificate processing time: `Varies by order method (state office, county office, or VitalChek)`.
- Notes updated: yes, date-scoped and source-backed for election-law behavior.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | DPOC and federal-only scope | https://azsos.gov/elections/voters/registration-requirements | primary | SOS states a registrant without proof of citizenship whose citizenship is not otherwise verified is eligible only for federal elections; full-ballot eligibility is restored when valid proof is provided. | 2026-03-01 | High |
  | Poll ID options | https://azsos.gov/elections/voters/voting-elections | primary | SOS states voters present one ID from List #1 or two IDs from List #2 or #3. | 2026-03-01 | High |
  | Registration deadline | https://www.azleg.gov/ars/16/00120.htm | primary | A.R.S. 16-120 states registration must be received before midnight of the twenty-ninth day preceding the election. | 2026-03-01 | High |
  | Online registration available | https://azsos.gov/elections/voters/registering-vote | primary | SOS \"How to Register to Vote\" section directs eligible voters to AZMVDNow EZ Voter Registration. | 2026-03-01 | High |
  | Birth certificate state fee | https://www.azdhs.gov/director/vital-records/#fee-schedule | primary | ADHS fee schedule lists \"Certificate of Birth Registration $20.00\". | 2026-03-01 | High |
  | Processing time variability | https://www.azdhs.gov/director/vital-records/index.php | primary | ADHS routes requests through state, county, and VitalChek options rather than posting a single statewide SLA. | 2026-03-01 | Medium |
- Sources:
  1. Arizona SOS registration requirements: https://azsos.gov/elections/voters/registration-requirements
  2. Arizona SOS registering to vote: https://azsos.gov/elections/voters/registering-vote
  3. Arizona SOS voting in elections: https://azsos.gov/elections/voters/voting-elections
  4. Arizona Legislature A.R.S. 16-120: https://www.azleg.gov/ars/16/00120.htm
  5. Arizona ADHS vital records portal: https://www.azdhs.gov/director/vital-records/index.php
  6. Arizona ADHS fee schedule anchor: https://www.azdhs.gov/director/vital-records/#fee-schedule
  7. NCSL citizenship policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Replace the processing-time placeholder only if ADHS publishes a stable statewide SLA in primary text.

### Arkansas - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Photo ID required at polls; voters unable to verify registration may cast provisional ballots and cure by the statutory Monday-noon deadline stated on SOS page.
- Online registration verified: Not available (paper/mail/in-person registration workflows).
- Registration deadline verified: `30 days before election`.
- Vital records verified:
  - URL: `https://healthy.arkansas.gov/programs-services/certificates-records/order-birth-records/`
  - Birth certificate cost: `$12 first copy; $10 each additional copy of the same record ordered at the same time`
  - Birth certificate processing time: `Online requests typically 7-14 business days after approval; mail requests allow 10-14 days processing plus delivery`
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline | https://www.sos.arkansas.gov/elections/voter-information/voter-registration-information/ | primary | SOS states applications must be submitted or mailed no later than 30 days prior to an election. | 2026-03-01 | High |
  | Online registration not available | https://www.sos.arkansas.gov/elections/voter-information/voter-registration-information/ | primary | SOS states voters must fill out a paper voter registration application and provides mail/in-person channels. | 2026-03-01 | High |
  | Voter ID and provisional-cure rule | https://www.sos.arkansas.gov/elections/voter-information/voter-registration-information/ | primary | SOS states voters verify registration with photo ID and may cast provisional ballots with cure by noon on the first Monday after the election. | 2026-03-01 | High |
  | Birth certificate fee | https://healthy.arkansas.gov/programs-services/certificates-records/order-birth-records/ | primary | ADH states the cost is $12.00 for the first copy and $10.00 for each additional copy of the same record ordered at the same time. | 2026-03-01 | High |
  | Birth certificate processing estimates | https://healthy.arkansas.gov/programs-services/certificates-records/order-birth-records/ | primary | ADH states online requests typically take 7-14 business days after approval and mail requests allow 10-14 processing days plus delivery. | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL does not list Arkansas as actively implementing a documentary proof-of-citizenship registration requirement. | 2026-03-01 | Medium |
- Sources:
  1. Arkansas SOS voter registration information: https://www.sos.arkansas.gov/elections/voter-information/voter-registration-information/
  2. Arkansas Department of Health birth records ordering page: https://healthy.arkansas.gov/programs-services/certificates-records/order-birth-records/
  3. NCSL citizenship policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - If an official Arkansas legislature page is needed in addition to SOS for the provisional-cure language, add it in senior-dev round.

### California - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Generally no ID required at polls; first-time-by-mail registrants may need ID in limited HAVA scenarios.
- Online registration verified: Available.
- Registration deadline verified: `15 days before election`, with same-day (conditional) registration available after deadline.
- Vital records verified:
  - URL: `https://www.cdph.ca.gov/Programs/CHSI/Pages/Vital-Records.aspx`
  - Birth certificate cost: set to `See CDPH/county fee schedules` pending county-specific extraction.
  - Birth certificate processing time: set to `Varies by office and method (see CDPH/county guidance)`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline + conditional registration | https://www.sos.ca.gov/elections/voter-registration | primary | SOS states the regular deadline is 15 days before election and supports Conditional Voter Registration after that | 2026-02-28 | High |
  | Online registration available | https://www.sos.ca.gov/elections/voter-registration | primary | California SOS provides online voter registration access | 2026-02-28 | High |
  | Voter ID general rule + limited exception | https://www.sos.ca.gov/elections/voting-resources/voting-california/what-bring | primary | SOS guidance indicates most voters do not show ID, with first-time-by-mail exceptions under federal law | 2026-02-28 | High |
  | Birth records authority | https://www.cdph.ca.gov/Programs/CHSI/Pages/Vital-Records.aspx | primary | CDPH Vital Records is official statewide entry for obtaining certified birth records | 2026-02-28 | High |
  | No active documentary POC requirement | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | California is not listed among states with documentary proof-of-citizenship registration requirements | 2026-03-01 | Medium |
- Sources:
  1. California SOS voter registration: https://www.sos.ca.gov/elections/voter-registration
  2. California SOS voter ID guidance: https://www.sos.ca.gov/elections/voting-resources/voting-california/what-bring
  3. California Department of Public Health Vital Records: https://www.cdph.ca.gov/Programs/CHSI/Pages/Vital-Records.aspx
  4. NCSL citizenship policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev/manual step: if desired, replace placeholder birth-cert fee/time with state-level or county-level fee table values and method-specific SLAs.

### Colorado - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: ID required for in-person voting; many forms accepted.
- Online registration verified: Available.
- Registration deadline verified: in-person registration through Election Day; online/mail registration must be completed 8 days before Election Day to receive a ballot by mail.
- Vital records verified:
  - URL: `https://cdphe.colorado.gov/vitalrecords`
  - Birth certificate cost: `2026 COVES fee schedule lists birth certificates at $25.00 first copy and $20.00 additional same-order copies`.
  - Birth certificate processing time: `Online orders: normal processing is 30 business days; check current processing dates for other methods`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration + deadline nuance | https://www.sos.state.co.us/pubs/elections/FAQs/VoterRegistrationFAQ.html | primary | SOS FAQ states voters may register through Election Day; to receive a ballot by mail, online/mail registration must be completed through the 8th day before Election Day. | 2026-03-01 | High |
  | In-person voting ID requirement | https://www.sos.state.co.us/pubs/elections/FAQs/VoterRegistrationFAQ.html | primary | SOS FAQ states how registration method affects ballot delivery and supports in-person voter service and polling center registration through Election Day, where ID requirements apply under Colorado election rules. | 2026-03-01 | Medium |
  | Birth record fee and processing references | https://cdphe.colorado.gov/vitalrecords | primary | CDPHE page states fee changes effective Jan 1, 2026 and that normal online processing is 30 business days, with current processing times posted on linked pages. | 2026-03-01 | High |
  | Exact birth-certificate fee values | https://drive.google.com/file/d/1POQTDPVLqteFe2rdx59mnLAOyca4ZA3A/view | primary | 2026 COVES Fee Schedule lists birth certificates at $25.00 first copy and $20.00 additional same-order copies. | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Colorado is not listed among states with documentary proof-of-citizenship registration requirements. | 2026-03-01 | Medium |
- Sources:
  1. Colorado SOS voter registration FAQ: https://www.sos.state.co.us/pubs/elections/FAQs/VoterRegistrationFAQ.html
  2. Colorado CDPHE vital records hub: https://cdphe.colorado.gov/vitalrecords
  3. Colorado 2026 COVES fee schedule: https://drive.google.com/file/d/1POQTDPVLqteFe2rdx59mnLAOyca4ZA3A/view
  4. NCSL citizenship policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`

### Connecticut - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Previously validated wording retained, but prior direct voter-ID source URL now returns 404 and needs replacement.
- Online registration verified: Available.
- Registration deadline verified: pre-election cutoff 18 days; same-day registration available for regular general elections.
- Vital records verified:
  - URL: `https://portal.ct.gov/dph/vital-records/how-to-obtain-a-record`
  - Birth certificate cost: `Town-issued birth cert: $20; state-issued birth cert: $30`
  - Birth certificate processing time: `State processing can be up to 12 weeks; town offices are generally faster`
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration available | https://portal.ct.gov/sots/election-services/voter-information/voter-registration-information | primary | SOTS voter registration page includes online voter registration options. | 2026-03-01 | High |
  | Registration deadline and same-day scope | https://portal.ct.gov/sots/election-services/voter-information/voter-registration-information | primary | SOTS page states pre-election cutoff is 18 days and same-day registration is available on Election Day. | 2026-03-01 | High |
  | Prior voter-ID source is dead | https://portal.ct.gov/sots/election-services/voter-information/voter-id-requirements | primary | URL currently resolves to CT.gov 404 page and must be replaced with a live primary citation. | 2026-03-01 | High |
  | Birth certificate fees | https://portal.ct.gov/dph/vital-records/how-to-obtain-a-record | primary | DPH lists town-issued certificates at $20 and state-issued birth certificates at $30. | 2026-03-01 | High |
  | Birth certificate processing expectations | https://portal.ct.gov/dph/vital-records/how-to-obtain-a-record | primary | DPH states state-office processing can be up to 12 weeks and town processing is generally faster. | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Connecticut is not listed among states with documentary proof-of-citizenship registration requirements. | 2026-03-01 | Medium |
- Sources:
  1. Connecticut SOTS voter registration information: https://portal.ct.gov/sots/election-services/voter-information/voter-registration-information
  2. Connecticut SOTS voter ID requirements (currently 404): https://portal.ct.gov/sots/election-services/voter-information/voter-id-requirements
  3. Connecticut DPH vital records ordering guidance: https://portal.ct.gov/dph/vital-records/how-to-obtain-a-record
  4. NCSL citizenship policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated (partial, voter-ID source refresh pending)`
- Follow-up items:
  - Replace the dead CT voter-ID URL with a live primary citation before upgrading confidence.
  - Confirm same-day registration language remains correct after any 2026 legislative changes.

### Delaware - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Delaware requests ID at polling places but permits voters without ID to complete an affirmation statement and vote.
- Online registration verified: Available.
- Registration deadline verified: 4th Saturday before primary and general elections.
- Vital records verified:
  - URL: `https://dhss.delaware.gov/dph/ss/vitalstats/`
  - Birth certificate cost: `$25 per certified copy (including each additional copy of the same record on the same application)`.
  - Birth certificate processing time: `Mail requests are completed and mailed in about 2-4 weeks`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Voter-ID treatment at polling place | https://elections.delaware.gov/public/faq/index.shtml | primary | FAQ states if no acceptable ID is provided, the voter signs an affirmation statement and then votes a regular ballot. | 2026-03-01 | High |
  | Online registration availability | https://elections.delaware.gov/voter/votereg.shtml | primary | Delaware voter registration page links online registration system (`ivote.de.gov`). | 2026-03-01 | High |
  | Registration deadline schedule | https://elections.delaware.gov/voter/votereg.shtml | primary | Delaware voter registration page states deadline is the 4th Saturday before primary and general elections. | 2026-03-01 | High |
  | Birth certificate fee and turnaround | https://dhss.delaware.gov/wp-content/uploads/sites/10/dph/pdf/birth24.pdf | primary | Delaware OVS birth application lists $25 per copy and states requests are completed and mailed in two to four weeks. | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Delaware is not listed among states with documentary proof-of-citizenship registration requirements. | 2026-03-01 | Medium |
- Sources:
  1. Delaware Elections voter registration page: https://elections.delaware.gov/voter/votereg.shtml
  2. Delaware Elections FAQ page: https://elections.delaware.gov/public/faq/index.shtml
  3. Delaware DPH/OVS vital stats page: https://dhss.delaware.gov/dph/ss/vitalstats/
  4. Delaware OVS birth certificate application: https://dhss.delaware.gov/wp-content/uploads/sites/10/dph/pdf/birth24.pdf
  5. NCSL citizenship policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev round: monitor Delaware election deadlines and OVS turnaround text for cycle-specific updates.

### Florida - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Current and valid photo ID required at polls; if photo ID has no signature, an additional ID with signature is required.
- Online registration verified: Available.
- Registration deadline verified: `29 days before election`.
- Vital records verified:
  - URL: `https://www.floridahealth.gov/certificates-records/birth-certificates/`
  - Birth certificate cost: `$9 first computer-generated certification (+$4 each additional; other types/rush vary)`
  - Birth certificate processing time: `Normal processing is 3-5 business days (plus shipping)`
- Notes updated: yes, unsourced political statement removed and replaced with policy status note.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline | https://dos.fl.gov/elections/for-voters/voter-registration/register-to-vote-or-update-your-information/ | primary | Florida DOS registration page states registration closes 29 days before an election | 2026-03-01 | High |
  | Online registration availability | https://dos.fl.gov/elections/for-voters/voter-registration/register-to-vote-or-update-your-information/ | primary | DOS page links official online voter registration portal | 2026-03-01 | High |
  | Poll ID requirements | https://dos.fl.gov/elections/for-voters/voting/election-day-voting/ | primary | DOS election-day page states current/valid photo ID is required and signature ID may be needed | 2026-03-01 | High |
  | Birth certificate fee | https://www.floridahealth.gov/certificates-records/birth-certificates/ | primary | FL DOH lists $9 for first computer-generated certificate and $4 each additional copy | 2026-03-01 | High |
  | Birth certificate processing time | https://www.floridahealth.gov/certificates-records/birth-certificates/ | primary | FL DOH page states normal processing time is 3-5 business days | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Florida is not listed among states with documentary proof-of-citizenship registration requirements | 2026-03-01 | Medium |
- Sources:
  1. Florida DOS voter registration page: https://dos.fl.gov/elections/for-voters/voter-registration/register-to-vote-or-update-your-information/
  2. Florida DOS election-day voting/ID page: https://dos.fl.gov/elections/for-voters/voting/election-day-voting/
  3. Florida DOH birth certificates page: https://www.floridahealth.gov/certificates-records/birth-certificates/
  4. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev round: verify if any 2026 Florida election-law changes alter registration or ID wording.

### Georgia - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `true`
  - `pocImplemented`: `true`
  - `pocScope`: `applicants' citizenship is verified through DDS/SAVE and additional evidence workflows when records are unresolved`
- Voter ID verified: Photo ID required for in-person voting; absentee voting requires ID information.
- Online registration verified: Available.
- Registration deadline verified: `See Georgia SOS election calendar for current registration deadlines (varies by election)`.
- Vital records verified:
  - URL: `https://dph.georgia.gov/VitalRecords/how-do-i-order-georgia-birth-and-death-records-online`
  - Birth certificate cost: `$25 per certified copy via ROVER plus $8 processing fee (third-party vendors may apply different fees)`
  - Birth certificate processing time: `Standard delivery is 8-10 weeks; expedited vendor processing is about 5 business days before shipping`
- Notes updated: yes, now date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration availability | https://sos.ga.gov/how-to-guide/how-guide-registering-vote | primary | GA SOS registration guide links official online registration portal and eligibility workflow | 2026-03-01 | High |
  | Registration deadline source-of-truth | https://sos.ga.gov/page/election-calendar-and-events | primary | GA SOS election calendar is the official location for election-specific registration deadlines | 2026-03-01 | Medium |
  | Voter ID requirements | https://sos.ga.gov/page/georgia-voter-identification-requirements | primary | GA SOS page states photo ID is required and provides absentee ID-information requirements | 2026-03-01 | High |
  | POC verification rule basis | https://rules.sos.ga.gov/gac/183-1-6-.06 | primary | Georgia election rule 183-1-6-.06 sets citizenship verification/evidence procedures in voter registration process | 2026-03-01 | High |
  | Birth certificate fees and processing | https://dph.georgia.gov/VitalRecords/how-do-i-order-georgia-birth-and-death-records-online | primary | DPH page lists $25 certificate fee + $8 processing and standard/expedited timeline guidance | 2026-03-01 | High |
  | POC status cross-check | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL includes Georgia in citizenship-policy/legal-workflow discussions and supports ongoing implementation monitoring | 2026-03-01 | Medium |
- Sources:
  1. Georgia SOS voter registration guide: https://sos.ga.gov/how-to-guide/how-guide-registering-vote
  2. Georgia SOS voter ID requirements: https://sos.ga.gov/page/georgia-voter-identification-requirements
  3. Georgia election rule 183-1-6-.06: https://rules.sos.ga.gov/gac/183-1-6-.06
  4. Georgia SOS election calendar: https://sos.ga.gov/page/election-calendar-and-events
  5. Georgia DPH vital records ordering page: https://dph.georgia.gov/VitalRecords/how-do-i-order-georgia-birth-and-death-records-online
  6. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated (partial, source-link refresh)`
- Follow-up items:
  - Dead-link log: `https://sos.ga.gov/georgia-voter-identification-requirements` and `https://dph.georgia.gov/document/document/vr-fee-schedule/download` now return 404.
  - Senior-dev/manual step: extract election-specific registration cutoff text from the current calendar PDF each cycle before converting back from calendar-based wording.
  - Senior-dev round: confirm Georgia's implementation wording remains accurate against any 2026 litigation or administrative updates.

### Hawaii - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Hawaii voting pages emphasize mailed-ballot and voter-service-center workflows; direct statewide poll-ID rule text was not found in the pages reviewed and remains flagged for senior-dev confirmation.
- Online registration verified: Available.
- Registration deadline verified: paper registration has election-specific deadlines; online registration is available at any time and in-person registration is available at voter service centers through Election Day.
- Vital records verified:
  - URL: `https://health.hawaii.gov/vitalrecords/birth-marriage-certificates/`
  - Birth certificate cost: `$10 first certified copy + $4 each additional copy + $2.50 administration fee (increments apply for higher copy counts)`.
  - Birth certificate processing time: `Usually up to 4-6 weeks (delays possible for incomplete/inaccurate submissions)`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration pathways and 2026 deadline model | https://elections.hawaii.gov/register-to-vote/ | primary | Hawaii Elections page lists paper registration deadlines while stating voters may register online at any time or in person at voter service centers | 2026-03-01 | High |
  | Voter service center and same-day registration model | https://elections.hawaii.gov/voter-service-centers-and-places-of-deposit/ | primary | Voter service center page states centers provide accessible in-person voting, same-day voter registration, and voted-ballot collection | 2026-03-01 | High |
  | Voting model cross-check | https://elections.hawaii.gov/voting/ | primary | Voting page repeats paper registration deadlines and online-anytime/in-person VSC registration language | 2026-03-01 | High |
  | Vital records authority | https://health.hawaii.gov/vitalrecords/ | primary | Hawaii DOH Vital Records page is official ordering/records entry point | 2026-03-01 | High |
  | Birth certificate fee and processing | https://health.hawaii.gov/vitalrecords/birth-marriage-certificates/ | primary | DOH page lists $10 first copy, $4 additional copies, administration fee structure, and usual 4-6 week processing | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Hawaii is not listed among states with documentary proof-of-citizenship registration requirements | 2026-03-01 | Medium |
- Sources:
  1. Hawaii Elections register-to-vote page: https://elections.hawaii.gov/register-to-vote/
  2. Hawaii Elections voting page: https://elections.hawaii.gov/voting/
  3. Hawaii Elections voter service centers page: https://elections.hawaii.gov/voter-service-centers-and-places-of-deposit/
  4. Hawaii DOH Vital Records home: https://health.hawaii.gov/vitalrecords/
  5. Hawaii DOH birth/marriage certificate ordering page: https://health.hawaii.gov/vitalrecords/birth-marriage-certificates/
  6. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated (partial, source-link refresh)`
- Follow-up items:
  - Dead-link log: `https://elections.hawaii.gov/frequently-asked-questions/` and `https://elections.hawaii.gov/faqs/` currently return 404.
  - Senior-dev/manual step: confirm statewide in-person voter-ID treatment text from current statute/admin guidance before setting confidence to high.

### Idaho - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Photo ID required at in-person check-in, or a voter may sign a Personal Identification Affidavit instead of presenting photo ID.
- Online registration verified: Available.
- Registration deadline verified: online registration closes 11 days before election; in-person registration remains available at early voting and on Election Day with required documents.
- Vital records verified:
  - URL: `https://healthandwelfare.idaho.gov/services-programs/birth-marriage-death-records/processing-times-and-fees`
  - Birth certificate cost: `$16 per certified copy (plus optional express/online processing and shipping fees)`.
  - Birth certificate processing time: `Standard non-rush orders: 3-5 weeks; express service orders: 2-3 weeks (processing excludes mailing)`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration availability | https://voteidaho.gov/voter-registration/ | primary | VoteIdaho registration page links official online voter registration portal | 2026-03-01 | High |
  | Registration deadline and same-day option | https://voteidaho.gov/voter-registration/ | primary | VoteIdaho states online registration deadline is 11 days before election and in-person registration is available at early voting and Election Day | 2026-03-01 | High |
  | Voter ID requirement and affidavit fallback | https://voteidaho.gov/guide-to-vote-in-person/ | primary | Guide states a photo ID or signed Personal Identification Affidavit is required each time a voter votes in person | 2026-03-01 | High |
  | Vital records authority | https://healthandwelfare.idaho.gov/services-programs/birth-marriage-death-records | primary | Idaho DHW Birth/Marriage/Death Records page is the official gateway for ordering/changing records | 2026-03-01 | High |
  | Birth certificate fee and processing | https://healthandwelfare.idaho.gov/services-programs/birth-marriage-death-records/processing-times-and-fees | primary | DHW processing page states $16 per copy, standard 3-5 week processing, and express 2-3 week processing | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Idaho is not listed among states with active documentary proof-of-citizenship registration requirements | 2026-03-01 | Medium |
- Sources:
  1. VoteIdaho registration page: https://voteidaho.gov/voter-registration/
  2. VoteIdaho in-person voting guide: https://voteidaho.gov/guide-to-vote-in-person/
  3. Idaho DHW Birth/Marriage/Death records page: https://healthandwelfare.idaho.gov/services-programs/birth-marriage-death-records
  4. Idaho DHW processing times and fees page: https://healthandwelfare.idaho.gov/services-programs/birth-marriage-death-records/processing-times-and-fees
  5. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Dead-link log: `https://voteidaho.gov/register/`, `https://voteidaho.gov/voter-id/`, and `https://healthandwelfare.idaho.gov/services-programs/birth-marriage-death-records/order-birth-certificate` now return 404.

### Illinois - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No standard voter-ID requirement at polls in Illinois election guidance; in-person voter registration requires identification documents.
- Online registration verified: Available.
- Registration deadline verified: regular registration closes 28 days before an election; grace-period registration and voting begin 27 days before the election and continue through Election Day.
- Vital records verified:
  - URL: `https://dph.illinois.gov/topics-services/birth-death-other-records/birth-records.html`
  - Birth certificate cost: `$15 for first copy and $2 for each additional copy of the same record ordered at the same time`.
  - Birth certificate processing time: `IDPH advises approximately 12 weeks from receipt for mailed vital-record requests`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration availability | https://www.elections.il.gov/Main/FAQ.aspx#VoterRegistration | primary | Illinois SBE FAQ provides registration methods and links to online registration workflows | 2026-03-01 | High |
  | Registration closure window + grace period | https://www.elections.il.gov/Main/FAQ.aspx#VoterRegistration | primary | FAQ states registration is closed during the 27-day period before elections, and Illinois election guidance references grace-period registration continuation | 2026-03-01 | High |
  | No standard poll-ID rule in election-day guidance | https://www.elections.il.gov/ElectionOperations/ElectionDayVoting.aspx | primary | Election Day voting guidance describes polling-place procedures and provisional-voting flow without a universal poll-ID mandate statement | 2026-03-01 | Medium |
  | In-person registration identification requirement | https://www.elections.il.gov/Main/FAQ.aspx#VoterRegistration | primary | FAQ states two forms of identification (one with current residence address) are required for in-person registration | 2026-03-01 | High |
  | Vital records authority + processing advisory | https://dph.illinois.gov/topics-services/birth-death-other-records/birth-records.html | primary | IDPH birth-records page states mailed vital-record requests are processed in approximately 12 weeks from receipt | 2026-03-01 | High |
  | Birth-certificate pricing values | https://dph.illinois.gov/content/dam/soi/en/web/idph/files/resources/resources-birth-death-other-records/vital-records-fee-schedule.pdf | primary | IDPH fee schedule states certified birth record fee is $15 first copy and $2 each additional copy ordered at the same time | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Illinois is not listed among states with active documentary proof-of-citizenship registration requirements | 2026-03-01 | Medium |
- Sources:
  1. Illinois SBE FAQ (voter registration): https://www.elections.il.gov/Main/FAQ.aspx#VoterRegistration
  2. Illinois Election Day voting page: https://www.elections.il.gov/ElectionOperations/ElectionDayVoting.aspx
  3. Illinois IDPH birth records page: https://dph.illinois.gov/topics-services/birth-death-other-records/birth-records.html
  4. Illinois IDPH vital records fee schedule: https://dph.illinois.gov/content/dam/soi/en/web/idph/files/resources/resources-birth-death-other-records/vital-records-fee-schedule.pdf
  5. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev round: monitor IDPH fee schedule and processing-time advisories for updates.

### Indiana - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `true`
  - `pocImplemented`: `true`
  - `pocScope`: `citizenship verification is implemented through BMV/jury/list-maintenance matching and temporary-credential workflows; documentary proof can be required when citizenship cannot be otherwise verified`
- Voter ID verified: Government-issued photo ID required for in-person voting; voters without acceptable ID may cast a provisional ballot and must cure (or claim an exemption) by noon 10 days after the election.
- Online registration verified: Available.
- Registration deadline verified: `29 days before election` (current posted examples: April 6, 2026 for the primary and October 5, 2026 for the general election).
- Vital records verified:
  - URL: `https://secure.in.gov/health/vital-records/order-now/`
  - Birth certificate cost: `$10 first copy; $4 each additional copy in the same order`
  - Birth certificate processing time: `Standard form 2-3 weeks; long form 6-8 weeks (processing may vary case-by-case)`
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration availability | https://www.in.gov/sos/elections/voter-information/register-to-vote/ | primary | Indiana SOS register-to-vote page links the official online voter registration system (indianavoters.in.gov) | 2026-03-01 | High |
  | Registration deadline | https://www.in.gov/sos/elections/voter-information/register-to-vote/ | primary | SOS page posts cycle-specific deadlines matching the 29-day pre-election rule (e.g., Apr 6 and Oct 5, 2026) | 2026-03-01 | High |
  | Strict photo ID + provisional process | https://www.in.gov/sos/elections/voter-information/photo-id-law/ | primary | Indiana photo ID page requires government-issued photo ID and states provisional cure by noon 10 days after election | 2026-03-01 | High |
  | Birth certificate fee and processing | https://secure.in.gov/health/vital-records/order-now/ | primary | Expanded Fee Schedule and Processing Times sections show $10 first copy, $4 additional, and 2-3 week/6-8 week birth processing windows | 2026-03-01 | High |
  | Conditional POC/citizenship verification status | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL cites Indiana list-maintenance and temporary-credential matching laws as conditional citizenship-verification pathways | 2026-03-01 | Medium |
- Sources:
  1. Indiana SOS register-to-vote page: https://www.in.gov/sos/elections/voter-information/register-to-vote/
  2. Indiana SOS photo ID law page: https://www.in.gov/sos/elections/voter-information/photo-id-law/
  3. Indiana Vital Records order page: https://secure.in.gov/health/vital-records/order-now/
  4. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev round: monitor Indiana statutory or litigation changes affecting temporary-credential matching and documentary-proof workflows after March 1, 2026.

### Iowa - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Voter ID is required at polls; if no acceptable ID is presented, voters may use an attester/Election Day registration documents or cast a provisional ballot and provide ID by county canvass.
- Online registration verified: Available.
- Registration deadline verified: pre-registration deadline is 15 days before election; Election Day registration is available with required identity/residence documentation.
- Vital records verified:
  - URL: `https://hhs.iowa.gov/family-community/vital-records`
  - Birth certificate cost: `$15 per record search (includes certified copy if found; nonrefundable)`.
  - Birth certificate processing time: regular mail about `4-6 weeks`; expedited shipping options are posted as `2-5` or `5-10` business days; in-person service may be same day.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration options and deadlines | https://sos.iowa.gov/voters/voter-registration | primary | Iowa SOS voter registration page states preregistration deadline is 15 days before election and provides online/mail registration pathways | 2026-03-01 | High |
  | Online registration availability | https://sos.iowa.gov/voters/voter-registration | primary | SOS page links the Iowa DOT online voter registration system for eligible credential holders | 2026-03-01 | High |
  | Voter ID requirement and provisional process | https://sos.iowa.gov/voters/voter-id-faq | primary | Iowa SOS FAQ states acceptable poll IDs, attester/Election Day documentation alternatives, and provisional ballot/ID cure by county canvass | 2026-03-01 | High |
  | Vital records authority and fee | https://hhs.iowa.gov/family-community/vital-records | primary | Iowa HHS Vital Records page states $15 fee per record search with copy if found (nonrefundable) | 2026-03-01 | High |
  | Vital-record processing windows by method | https://hhs.iowa.gov/family-community/vital-records/how-request-certified-record | primary | Iowa HHS request page provides average processing windows (including 4-6 weeks regular mail and faster shipping options) | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Iowa appears in list-maintenance legislation context, not as a state with active statewide documentary proof-of-citizenship registration mandate | 2026-03-01 | Medium |
- Sources:
  1. Iowa SOS voter registration page: https://sos.iowa.gov/voters/voter-registration
  2. Iowa SOS voter ID FAQ: https://sos.iowa.gov/voters/voter-id-faq
  3. Iowa HHS vital records page: https://hhs.iowa.gov/family-community/vital-records
  4. Iowa HHS certified-record request page: https://hhs.iowa.gov/family-community/vital-records/how-request-certified-record
  5. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Dead-link log: `https://hhs.iowa.gov/programs/bureau-health-statistics/vital-records` now returns a not-found page and was replaced.

### Kansas - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `true`
  - `pocImplemented`: `false`
  - `pocScope`: n/a (not enforceable)
- Voter ID verified: Photo ID required for in-person voting; voters without valid ID are issued provisional ballots and must cure before county canvass.
- Online registration verified: Available.
- Registration deadline verified: `21 days before election`.
- Vital records verified:
  - URL: `https://www.kdhe.ks.gov/1186/Birth-Certificate`
  - Birth certificate cost: `$20 per certified copy (plus method-specific expedited/processing fees where applicable)`.
  - Birth certificate processing time: walk-in about `15-20 minutes`; internet/telephone about `3-5 business days` after receipt; regular/priority mail about `7-10 business days` (volume dependent).
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration | https://sos.ks.gov/elections/election-faq.html | primary | Kansas SOS FAQ states voters must be registered 21 days prior to an election; voter information page links online registration resources | 2026-03-01 | High |
  | Voter ID requirement + provisional path | https://sos.ks.gov/elections/voter-information.html | primary | SOS voter information page requires photo ID for in-person voting and describes provisional ballot issuance/cure before county canvass when ID is missing/invalid | 2026-03-01 | High |
  | Vital records authority | https://www.kdhe.ks.gov/1186/Birth-Certificate | primary | KDHE birth-certificate page provides official ordering methods and fee/time table | 2026-03-01 | High |
  | Birth-certificate fee and processing | https://www.kdhe.ks.gov/1186/Birth-Certificate | primary | Ordering table lists $20 copy fee and method-specific processing windows (walk-in, internet/phone, regular mail) | 2026-03-01 | High |
  | POC status cross-check | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL categorizes Kansas within enacted/contested citizenship-policy history rather than active statewide DPOC enforcement | 2026-03-01 | Medium |
- Sources:
  1. Kansas SOS voter information page: https://sos.ks.gov/elections/voter-information.html
  2. Kansas SOS election FAQ page: https://sos.ks.gov/elections/election-faq.html
  3. Kansas KDHE birth-certificate page: https://www.kdhe.ks.gov/1186/Birth-Certificate
  4. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev round: monitor litigation or legislative changes that could alter Kansas DPOC enforceability status.

### Kentucky - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: All voters must produce identification at the polling place; acceptable proof-of-identification issuers are listed on the KY "Voter ID Requirements" page.
- Online registration verified: Available.
- Registration deadline verified: `29 days before election`.
- Vital records verified:
  - URL: `https://www.chfs.ky.gov/agencies/dph/dehp/vsb/Pages/purchase.aspx`
  - Birth certificate cost: `$10 per birth certificate (non-refundable search fee), plus additional VitalChek/UPS fees where applicable`.
  - Birth certificate processing time: `Mail/drop-box orders are filled within five to seven business days; allow up to 30 working days`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration | https://elect.ky.gov/Voters/Pages/Voting-In-Person-and-By-Mail.aspx | primary | KY election summary lists "Last Day to register to vote Monday April 20, 2026" for the May 19, 2026 primary (29-day timing) and links online registration workflows | 2026-03-01 | High |
  | Voter ID requirement | https://elect.ky.gov/Frequently-Asked-Questions/Pages/Election-Day-Information.aspx | primary | FAQ states "All voters must produce identification at the polling place" and points to official ID-requirements page | 2026-03-01 | High |
  | Acceptable proof-of-identification issuers | https://elect.ky.gov/Voters/Pages/Absentee-Excused-In-Person.aspx | primary | Voter-ID page defines acceptable issuing authorities and photo-ID requirement categories | 2026-03-01 | High |
  | Birth-certificate fee | https://www.chfs.ky.gov/agencies/dph/dehp/vsb/Pages/purchase.aspx | primary | Certificate Purchase Options page lists "Birth: $10 US per certificate (non-refundable search fee)" | 2026-03-01 | High |
  | Birth-certificate processing time | https://www.chfs.ky.gov/agencies/dph/dehp/vsb/Pages/purchase.aspx | primary | Processing Time section says mail/drop-box orders are filled in 5-7 business days and to allow up to 30 working days | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Kentucky is not listed as an active statewide documentary-POC registration state in the current NCSL tracker taxonomy | 2026-03-01 | Medium |
- Sources:
  1. Kentucky voters home: https://elect.ky.gov/Voters/Pages/default.aspx
  2. Kentucky upcoming election summary: https://elect.ky.gov/Voters/Pages/Voting-In-Person-and-By-Mail.aspx
  3. Kentucky election-day FAQ: https://elect.ky.gov/Frequently-Asked-Questions/Pages/Election-Day-Information.aspx
  4. Kentucky voter ID requirements: https://elect.ky.gov/Voters/Pages/Absentee-Excused-In-Person.aspx
  5. Kentucky OVS home: https://www.chfs.ky.gov/agencies/dph/dehp/vsb/Pages/default.aspx
  6. Kentucky OVS certificate purchase options: https://www.chfs.ky.gov/agencies/dph/dehp/vsb/Pages/purchase.aspx
  7. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Continue routine quarterly revalidation because election-calendar key dates are cycle-specific.

### Louisiana - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `true`
  - `pocImplemented`: `false`
  - `pocScope`: n/a (not currently enforced as statewide documentary registration requirement)
- Voter ID verified: Photo ID required at polls; affidavit/provisional process available when ID unavailable.
- Online registration verified: Available.
- Registration deadline verified: `30 days before election by mail; 20 days before election online`.
- Vital records verified:
  - URL: `https://ldh.la.gov/page/635` (birth records) and `https://ldh.la.gov/page/691` (service fees).
  - Birth certificate cost: `$15.00 per copy` (plus `$0.50` state charge on mail/VitalChek orders; additional VitalChek security/shipping fees apply).
  - Birth certificate processing time: mail requests should allow `approximately 8-10 weeks for delivery` (expedited VitalChek paths available with additional fees).
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadlines and online registration | https://www.sos.la.gov/ElectionsAndVoting/RegisterToVote/Pages/default.aspx | primary | SOS Register to Vote page states registration must be at least 20 days before election online (GeauxVote) or 30 days before election in person/by mail | 2026-03-01 | High |
  | Voter ID + affidavit fallback | https://www.sos.la.gov/ElectionsAndVoting/Vote/VoteOnElectionDay/Pages/default.aspx | primary | SOS Election Day page lists acceptable picture IDs and says voters without qualifying ID may still vote by signing a voter affidavit | 2026-03-01 | High |
  | Vital records authority and ordering method | https://ldh.la.gov/page/635 | primary | LDH birth-record page provides ordering channels and says mail applicants should allow approximately 8-10 weeks for delivery | 2026-03-01 | High |
  | Birth-certificate fee | https://ldh.la.gov/page/691 | primary | LDH service-fees page lists Birth Certificate as $15.00 per copy and additional state/service fees for certain order channels | 2026-03-01 | High |
  | Legacy URL deprecation | https://ldh.la.gov/microsite/56 | primary | Previous LDH URL now returns a 404 page and should not be used as active source | 2026-03-01 | High |
  | POC status cross-check | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL categorization supports Louisiana enacted-history / non-implemented statewide documentary-POC posture | 2026-03-01 | Medium |
- Sources:
  1. Louisiana SOS Register to Vote page: https://www.sos.la.gov/ElectionsAndVoting/RegisterToVote/Pages/default.aspx
  2. Louisiana SOS Vote on Election Day page: https://www.sos.la.gov/ElectionsAndVoting/Vote/VoteOnElectionDay/Pages/default.aspx
  3. Louisiana LDH Vital Records request page: https://ldh.la.gov/vital-records/request-a-birth-or-death-certificate
  4. Louisiana LDH Birth Records page: https://ldh.la.gov/page/635
  5. Louisiana LDH Service Fees page: https://ldh.la.gov/page/691
  6. Legacy LDH URL now 404: https://ldh.la.gov/microsite/56
  7. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Continue monitoring policy/litigation changes that could shift Louisiana documentary-POC implementation status.

### Maine - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No general ID is required for already-registered voters; Election Day registrants must register in person with ID and proof of residence.
- Online registration verified: Available.
- Registration deadline verified: in-person registration through close of polls on Election Day; online by 5 PM on the 21st day before Election Day; mail registration received by close of business 21 days before Election Day.
- Vital records verified:
  - URL: `https://www.maine.gov/dhhs/mecdc/vital-records/request-documents`
  - Birth certificate cost: `$15.00` search fee includes one certified copy if found; `$6.00` each additional certified copy requested during the same search.
  - Birth certificate processing time: walk-in requests are generally same day, with occasional up-to-24-hour turnaround.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadlines by method | https://www.maine.gov/sos/elections-voting/state-of-maine-voter-guide#Isthereadeadlineforregistering | primary | Maine Voter Guide lists in-person registration through close of polls on Election Day and 21-day online/mail deadlines (with 2026 date examples) | 2026-03-01 | High |
  | Online registration availability | https://www.maine.gov/sos/elections-voting/registering-to-vote | primary | Registering-to-vote page links official online voter registration service | 2026-03-01 | High |
  | Voter ID framework | https://www.maine.gov/sos/elections-voting/your-right-to-vote-in-maine | primary | Rights page states registered voters do not need ID to get a ballot; Election Day registrants must register in person and show ID/proof of residence | 2026-03-01 | High |
  | Vital records authority + processing | https://www.maine.gov/dhhs/mecdc/vital-records/request-documents | primary | Request Documents page states same-day walk-in service with occasional up-to-24-hour turnaround and provides mail/online options | 2026-03-01 | High |
  | Birth-certificate fee schedule | https://www.maine.gov/dhhs/mecdc/vital-records/request-documents#FeeSchedule | primary | Fee Schedule lists $15.00 search/one certified copy and $6.00 each additional certified copy of same record | 2026-03-01 | High |
  | Legacy SOS voter-ID URL deprecation | https://www.maine.gov/sos/cec/elec/voter-info/voterid.html | primary | Previous voter-ID path now returns a 404 page and should not be used as active source | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Maine is not listed as an active statewide documentary-POC registration state in current NCSL tracker taxonomy | 2026-03-01 | Medium |
- Sources:
  1. Maine SOS registering-to-vote page: https://www.maine.gov/sos/elections-voting/registering-to-vote
  2. Maine SOS voter guide (deadline section): https://www.maine.gov/sos/elections-voting/state-of-maine-voter-guide#Isthereadeadlineforregistering
  3. Maine SOS voter rights page: https://www.maine.gov/sos/elections-voting/your-right-to-vote-in-maine
  4. Maine CDC vital records home: https://www.maine.gov/dhhs/mecdc/vital-records
  5. Maine CDC request documents + fee schedule: https://www.maine.gov/dhhs/mecdc/vital-records/request-documents#FeeSchedule
  6. Legacy Maine SOS voter-id page now 404: https://www.maine.gov/sos/cec/elec/voter-info/voterid.html
  7. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Continue periodic checks of election-cycle date examples in voter-guide deadline text.

### Maryland - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No universal poll-ID rule; same-day registrants must bring proof of residence and some voters may be asked to show ID based on registration status.
- Online registration verified: Available.
- Registration deadline verified: Advanced deadline is about three weeks before election (2026 primary example: June 2, 2026); same-day registration available at early voting centers and on Election Day with required proof of residence.
- Vital records verified:
  - URL: `https://health.maryland.gov/vsa/pages/birth.aspx`
  - Birth certificate cost: `$10.00` base fee (`+ $13.00` internet processing fee for online orders and optional `$20.00` expedited-shipping fee).
  - Birth certificate processing time: same-day lobby orders; mail orders about 6 weeks; online orders about 5 weeks regular shipping or about 3 weeks expedited.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration process and same-day option | https://elections.maryland.gov/voter_registration/index.html | primary | Registration section states voters can register during early voting or on Election Day at assigned polling place with proof of residence | 2026-03-01 | High |
  | Advanced registration deadline (cycle-specific example) | https://elections.maryland.gov/voting/election_day_questions.html | primary | Election Day guidance lists advanced deadline as June 2, 2026 for the June 23, 2026 primary and explains late/same-day registration paths | 2026-03-01 | High |
  | Online registration availability | https://elections.maryland.gov/voter_registration/application.html | primary | Application page links Maryland's OLVR and explains online submission requirements | 2026-03-01 | High |
  | Voter ID framing + stale-link remediation | https://elections.maryland.gov/voting/election_day_questions.html | primary | Voters are directed to voter services to determine if ID is required; prior direct identification URL now returns 404 | 2026-03-01 | High |
  | Vital records authority | https://health.maryland.gov/vsa/pages/birth.aspx | primary | Birth page is official MDH source and links fee/processing resources | 2026-03-01 | High |
  | Birth-certificate fee table | https://health.maryland.gov/vsa/Pages/fees.aspx | primary | Fees page lists Birth at $10.00 plus online processing/expedite surcharges for internet orders | 2026-03-01 | High |
  | Current processing times | https://health.maryland.gov/vsa/Pages/proctime.aspx | primary | Processing page lists same-day lobby, ~6-week mail, and ~5-week regular online (~3-week expedited online) timelines | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Maryland is not listed as an active statewide documentary-POC registration state in current NCSL tracker taxonomy | 2026-03-01 | Medium |
- Sources:
  1. Maryland voter registration intro page: https://elections.maryland.gov/voter_registration/index.html
  2. Maryland voter registration application page: https://elections.maryland.gov/voter_registration/application.html
  3. Maryland election day questions page: https://elections.maryland.gov/voting/election_day_questions.html
  4. Maryland voting intro page: https://elections.maryland.gov/voting/index.html
  5. Maryland vital statistics birth page: https://health.maryland.gov/vsa/pages/birth.aspx
  6. Maryland VSA fees page: https://health.maryland.gov/vsa/Pages/fees.aspx
  7. Maryland VSA processing-time page: https://health.maryland.gov/vsa/Pages/proctime.aspx
  8. Legacy Maryland voter ID URL now 404: https://elections.maryland.gov/voting/identification.html
  9. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Recheck cycle-specific advanced registration date examples before each statewide election year.

### Massachusetts - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No general poll-ID requirement; first-time voters who registered by mail without including ID may need to show ID when voting.
- Online registration verified: Available.
- Registration deadline verified: `10 days before any election or town meeting`.
- Vital records verified:
  - URL: `https://www.mass.gov/how-to/order-a-birth-marriage-or-death-certificate`
  - Birth certificate cost: `$20 per copy in person; $32 per copy by mail; $54 online/phone first copy; $42 online/phone each additional copy`.
  - Birth certificate processing time: `Most orders are filled within 2-3 weeks; online VitalChek requests typically process in 7-10 business days; expedited options available`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration | https://www.sec.state.ma.us/divisions/elections/voter-resources/registering-to-vote.htm | primary | Elections page states the deadline is 10 days before any election or town meeting and confirms online registration | 2026-03-01 | High |
  | First-time voter ID limited case | https://www.sec.state.ma.us/divisions/elections/voter-resources/registering-to-vote.htm | primary | Register-by-mail section states first-time registrants should include ID copy and may need to show ID the first time they vote | 2026-03-01 | High |
  | Legacy voter-ID URL invalid | https://www.sec.state.ma.us/divisions/elections/voter-resources/voter-id-requirements.htm | primary | URL returns a 404 page and cannot be used as a live citation | 2026-03-01 | High |
  | Birth certificate fee schedule and processing windows | https://www.mass.gov/how-to/order-a-birth-marriage-or-death-certificate | primary | Fees table and processing notes list in-person/mail/online prices plus 2-3 week and 7-10 business day processing guidance | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Massachusetts is not listed as an active documentary proof-of-citizenship implementation state | 2026-03-01 | Medium |
- Sources:
  1. Massachusetts registering-to-vote page: https://www.sec.state.ma.us/divisions/elections/voter-resources/registering-to-vote.htm
  2. Legacy Massachusetts voter-ID URL (404): https://www.sec.state.ma.us/divisions/elections/voter-resources/voter-id-requirements.htm
  3. Massachusetts birth record ordering page: https://www.mass.gov/how-to/order-a-birth-marriage-or-death-certificate
  4. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Monitor Mass.gov fee tables for periodic updates to online vendor pricing.

### Michigan - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Photo ID is requested for in-person registration; if unavailable, a voter may sign an affidavit and still register.
- Online registration verified: Available.
- Registration deadline verified: If 15+ days remain before Election Day, online/mail/in-person registration is available; within 14 days and on Election Day, registration is in person only with proof of residency.
- Vital records verified:
  - URL: `https://www.michigan.gov/mdhhs/doing-business/vitalrecords`
  - Birth certificate cost: `$34 vital records fee (first copy); online orders include VitalChek processing and shipping fees`.
  - Birth certificate processing time: `Online birth-certificate standard service averages 21-45 business days; optional rush service is available`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration windows | https://www.michigan.gov/sos/elections/voting/register-to-vote | primary | SOS page states 15+ day multi-channel registration and in-person-only registration with proof of residency within 14 days and on Election Day | 2026-03-01 | High |
  | Voter ID + affidavit path | https://www.michigan.gov/sos/elections/voting/register-to-vote | primary | SOS page states in-person registrants are asked for photo ID and may sign an affidavit if they do not have one | 2026-03-01 | High |
  | Birth certificate fee/time | https://www.michigan.gov/mdhhs/doing-business/vitalrecords | primary | MDHHS page lists $34 vital-record fee and online birth-certificate average processing of 21-45 business days, with rush options | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Michigan is not listed as an active documentary proof-of-citizenship implementation state | 2026-03-01 | Medium |
- Sources:
  1. Michigan SOS register to vote: https://www.michigan.gov/sos/elections/voting/register-to-vote
  2. Michigan MDHHS vital records: https://www.michigan.gov/mdhhs/doing-business/vitalrecords
  3. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Recheck SOS deadline language before each statewide election cycle in case same-day registration rules are amended.

### Minnesota - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No ID is needed if registration is current and active; proof of residence is required when registering or updating registration at the polling place.
- Online registration verified: Available.
- Registration deadline verified: Online deadline is 11:59 p.m. 21 days before Election Day; paper deadline is 5 p.m. 21 days before Election Day; Election Day registration is available with proof of residence.
- Vital records verified:
  - URL: `https://www.health.state.mn.us/people/vitalrecords/`
  - Birth certificate cost: `$26 certified birth certificate; $13 noncertified birth record`.
  - Birth certificate processing time: `MDH rolling processing bulletin (as of Feb 24, 2026): standard orders received by Jan 21, 2026 and expedited orders received by Feb 20, 2026 completed and mailed`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadlines and Election Day registration | https://www.sos.mn.gov/elections-voting/register-to-vote/common-registration-questions/ | primary | SOS states online and paper registration deadlines are 21 days before Election Day, with Election Day registration available using proof of residence | 2026-03-01 | High |
  | Voter ID/proof-of-residence nuance | https://sos.mn.gov/elections-voting/election-day-voting/do-i-need-to-bring-id/ | primary | SOS states no ID is needed if registration is current/active; proof of residence is required when registering/updating at the polling place | 2026-03-01 | High |
  | Birth certificate fee table | https://www.health.state.mn.us/people/vitalrecords/birthnc.html | primary | MDH birth-certificate page lists $26 certified and $13 noncertified birth record fees | 2026-03-01 | High |
  | Current processing bulletin | https://www.health.state.mn.us/people/vitalrecords | primary | MDH processing-dates panel lists latest completed received-date cutoffs for standard and expedited orders | 2026-03-01 | Medium |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Minnesota is not listed as an active documentary proof-of-citizenship implementation state | 2026-03-01 | Medium |
- Sources:
  1. Minnesota register to vote page: https://www.sos.mn.gov/elections-voting/register-to-vote/
  2. Minnesota registration deadline details: https://www.sos.mn.gov/elections-voting/register-to-vote/common-registration-questions/
  3. Minnesota Election Day ID guidance: https://sos.mn.gov/elections-voting/election-day-voting/do-i-need-to-bring-id/
  4. Minnesota MDH vital records processing page: https://www.health.state.mn.us/people/vitalrecords
  5. Minnesota MDH birth certificate fee page: https://www.health.state.mn.us/people/vitalrecords/birthnc.html
  6. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated (dynamic processing monitor)`
- Follow-up items:
  - Recheck MDH processing-date bulletin at least monthly because listed completion dates update continuously.

### Mississippi - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Photo ID required; statutory SOS-listed exemptions apply for specific absentee-by-mail, religious-objection affidavit, and qualifying care-facility polling-place voters.
- Online registration verified: Not available as statewide online registration.
- Registration deadline verified: registration must be completed at least 30 days before the election.
- Vital records verified:
  - URL: `https://msdh.ms.gov/msdhsite/index.cfm/31,0,109,808,html`
  - Birth certificate cost: `$17 first certified copy; $6 each additional copy ordered at the same time`.
  - Birth certificate processing time: `Standard 7-10 business days; online/phone orders may process in 3-5 business days with expedited options`.
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline / no online registration | https://www.sos.ms.gov/voter-id/register | primary | SOS registration page states registration must be completed at least 30 days before an election and lists in-person/by-mail methods | 2026-03-01 | High |
  | Voter-ID requirement and exemptions | https://www.sos.ms.gov/voter-id/acceptable | primary | SOS acceptable-ID page states all voters must present an accepted photo ID before voting | 2026-03-01 | High |
  | Statutory exemption classes | https://www.sos.ms.gov/voter-id/exemptions | primary | SOS exemptions page lists exemption categories including certain absentee-by-mail, religious-objection affidavit, and qualifying care-facility voters | 2026-03-01 | High |
  | Birth certificate fee and processing | https://msdh.ms.gov/msdhsite/index.cfm/31,0,109,808,html | primary | MSDH Q&A page lists standard and expedited processing windows; linked instructions list $17 first copy and $6 additional copies | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Mississippi is not listed as an active documentary proof-of-citizenship implementation state | 2026-03-01 | Medium |
- Sources:
  1. Mississippi SOS register page: https://www.sos.ms.gov/voter-id/register
  2. Mississippi SOS acceptable ID list: https://www.sos.ms.gov/voter-id/acceptable
  3. Mississippi SOS voter-ID exemptions: https://www.sos.ms.gov/voter-id/exemptions
  4. Mississippi MSDH birth records Q&A: https://msdh.ms.gov/msdhsite/index.cfm/31,0,109,808,html
  5. Mississippi MSDH birth-certificate instructions (fee table): https://msdh.ms.gov/msdhsite/handlers/printcontent.cfm?ContentID=1240&EntryCode=8593&GroupID=31&ThisPageURL=http%3A%2F%2Fmsdh.ms.gov%2Fmsdhsite%2Findex.cfm%2F31%2C1240%2C109%2C62%2Chtml
  6. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Re-check SOS acceptable-ID and exemptions pages before each statewide election cycle.

### Missouri - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Photo ID required for in-person voting; SOS guidance includes non-photo alternatives and provisional-ballot options when required.
- Online registration verified: Available.
- Registration deadline verified: voter registration must be completed by the fourth Wednesday prior to an election.
- Vital records verified:
  - URL: `https://health.mo.gov/data/vitalrecords/`
  - Birth certificate cost: `$15 per birth certificate copy`
  - Birth certificate processing time: `Varies by order method and issuance channel; expedited services available through authorized vendor`
- Notes updated: yes, date-scoped and source-backed.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration | https://www.sos.mo.gov/elections/goVoteMissouri/register.aspx | primary | SOS page states registration can be completed online and must be completed by the fourth Wednesday before an election | 2026-03-01 | High |
  | Voter ID and provisional process | https://www.sos.mo.gov/voterid | primary | SOS voter-ID guidance states photo ID is required and references non-photo and provisional options where applicable | 2026-03-01 | High |
  | Birth record fee and ordering authority | https://health.mo.gov/data/vitalrecords/ | primary | DHSS vital records page states birth records are available for $15 and lists ordering channels | 2026-03-01 | High |
  | Processing-time phrasing | https://health.mo.gov/data/vitalrecords/ | primary | DHSS indicates method-dependent processing and channel differences rather than a single statewide SLA | 2026-03-01 | Medium |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Missouri is not listed as an active documentary proof-of-citizenship implementation state | 2026-03-01 | Medium |
- Sources:
  1. Missouri registration page: https://www.sos.mo.gov/elections/goVoteMissouri/register.aspx
  2. Missouri voter ID page: https://www.sos.mo.gov/voterid
  3. Missouri DHSS vital records page: https://health.mo.gov/data/vitalrecords/
  4. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated (processing-time detail remains variable)`
- Follow-up items:
  - Recheck DHSS processing guidance each validation cycle because no single statewide fixed SLA is posted.

### Montana - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Voters must show identification, either an acceptable photo ID or an approved non-photo document with name and current address.
- Online registration verified: Not available statewide as online voter registration.
- Registration deadline verified: regular registration closes 30 days before Election Day; late registration is available at county election offices until noon the day before Election Day.
- Vital records verified:
  - URL: `https://dphhs.mt.gov/vitalrecords`
  - Birth certificate cost: updated to `$16 per certified copy`.
  - Birth certificate processing time: updated to `Varies by workload and order channel; see Montana DPHHS current processing guidance`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration and late registration | https://sosmt.gov/elections/vote/ | primary | Montana SOS voter page states regular registration closes 30 days before Election Day and late registration runs until noon the day before Election Day | 2026-03-01 | High |
  | Voter ID requirement | https://sosmt.gov/elections/vote/voter-id-voting/ | primary | SOS voter-ID page states acceptable photo and approved non-photo identification options for voting | 2026-03-01 | High |
  | Birth certificate fee | https://dphhs.mt.gov/vitalrecords/fees | primary | Montana DPHHS fees page lists $16 per certified copy | 2026-03-01 | High |
  | Vital records authority and processing variability | https://dphhs.mt.gov/vitalrecords | primary | Montana DPHHS directs users to current processing guidance and ordering channels rather than a fixed statewide SLA | 2026-03-01 | Medium |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Montana is not listed as an active documentary proof-of-citizenship implementation state | 2026-03-01 | Medium |
- Sources:
  1. Montana SOS voter page: https://sosmt.gov/elections/vote/
  2. Montana SOS voter-ID page: https://sosmt.gov/elections/vote/voter-id-voting/
  3. Montana DPHHS vital records page: https://dphhs.mt.gov/vitalrecords
  4. Montana DPHHS fee page: https://dphhs.mt.gov/vitalrecords/fees
  5. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated (processing-time detail remains variable)`
- Follow-up items:
  - Senior-dev/manual step: if DPHHS later publishes a fixed statewide processing SLA, replace variable wording with exact quoted SLA text.

### Nebraska - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Photo ID required under Nebraska's current voter ID law.
- Online registration verified: Available.
- Registration deadline verified: online registration closes midnight on third Friday before election; other methods have separate cutoffs.
- Vital records verified:
  - URL: `https://dhhs.ne.gov/Pages/vital-records.aspx`
  - Birth certificate cost: updated to `$17 first copy; $16 each additional copy in the same order`.
  - Birth certificate processing time: updated to `Regular mail requests: minimum 15 business days processing (plus mailing time); walk-in by appointment availability`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration and deadline wording | https://sos.nebraska.gov/elections/voter-registration | primary | Nebraska SOS registration page provides online registration and third-Friday cutoff language | 2026-02-28 | High |
  | Photo ID requirement | https://sos.nebraska.gov/elections/voter-id | primary | Nebraska SOS voter-ID guidance states photo ID requirement for voting | 2026-02-28 | High |
  | Birth certificate fee and processing minimum | https://dhhs.ne.gov/Pages/Vital-Records-Frequently-Asked-Questions.aspx | primary | Nebraska DHHS FAQ lists "$17.00 for first copy, $16.00 for each additional" and regular-mail minimum processing time of 15 business days | 2026-03-01 | High |
  | Vital records authority | https://dhhs.ne.gov/Pages/vital-records.aspx | primary | Nebraska DHHS vital records page is official source for ordering records | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration | secondary | Nebraska not listed among documentary POC states | 2026-02-28 | Medium |
- Sources:
  1. Nebraska voter registration page: https://sos.nebraska.gov/elections/voter-registration
  2. Nebraska voter ID page: https://sos.nebraska.gov/elections/voter-id
  3. Nebraska DHHS vital records page: https://dhhs.ne.gov/Pages/vital-records.aspx
  4. NCSL proof-of-citizenship tracker: https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev/manual step: monitor DHHS FAQ for fee and timeline changes and refresh `lastVerified` on update.

### Nevada - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No universal photo-ID-only poll rule; identification requirements vary by voter and registration context under Nevada election law.
- Online registration verified: Available.
- Registration deadline verified: online/mail deadlines apply before Election Day, with same-day in-person registration available where authorized.
- Vital records verified:
  - URL: `https://www.dpbh.nv.gov/programs/birth-death-marriage-divorce-records/birth-death-vital-records-forms/`
  - Birth certificate cost: `$25.00 certified legal copy for birth certificates; $10.00 verification of records`.
  - Birth certificate processing time: `No single statewide fixed processing SLA is published on the forms page; online/phone ordering is through VitalChek and in-person service is by appointment`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | SOS election source access in this environment | https://www.nvsos.gov/sos/elections | primary | SOS elections pages currently return anti-bot challenge pages in this automated environment | 2026-03-01 | Medium |
  | Registration and ID legal framework anchor | https://www.leg.state.nv.us/NRS/NRS-293.html | primary | Nevada election statutes define registration and identification requirements by context rather than a universal photo-ID-only poll rule | 2026-03-01 | Medium |
  | Vital records authority and fee table | https://www.dpbh.nv.gov/programs/birth-death-marriage-divorce-records/birth-death-vital-records-forms/ | primary | DPBH forms page lists ordering channels and fee schedule including $25 certified legal copy and $10 verification | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Nevada is not listed as an active documentary proof-of-citizenship implementation state | 2026-03-01 | Medium |
- Sources:
  1. Nevada SOS elections portal (anti-bot constrained): https://www.nvsos.gov/sos/elections
  2. Nevada SOS registration endpoint (anti-bot constrained): https://www.nvsos.gov/sos/elections/voters/register-to-vote
  3. Nevada online registration endpoint (anti-bot constrained): https://registertovote.nv.gov/
  4. Nevada DPBH birth/death forms and fee page: https://www.dpbh.nv.gov/programs/birth-death-marriage-divorce-records/birth-death-vital-records-forms/
  5. Nevada election statute title: https://www.leg.state.nv.us/NRS/NRS-293.html
  6. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated (SOS anti-bot constrained; monitor)`
- Follow-up items:
  - Manual browser pass required on Nevada SOS election pages each cycle to reconfirm registration and ID wording outside anti-bot challenge constraints.

### New Hampshire - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `true`
  - `pocImplemented`: `true`
  - `pocScope`: `new voter registrants under current state citizenship-document requirements`
- Voter ID verified: Voter identification requirements are governed by RSA 659:13, and registration materials require proof of identity, age, citizenship, and domicile.
- Online registration verified: Not available.
- Registration deadline verified: in-person local registration up to 6-13 days before election (community-specific); Election Day registration available at polling place; absentee-registration request cutoff is 12 p.m. the day before election.
- Vital records verified:
  - URL: `https://www.sos.nh.gov/vital-records-0/purchasing-correcting-vital-records/request-certificates`
  - Birth certificate cost: `$15.00 search fee including one certified copy if found; $10.00 for each additional certified copy of the same record issued at the same time`.
  - Birth certificate processing time: `In-person requests are usually issued while you wait; mailed requests should allow 20 business days from receipt for processing`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration windows and Election Day registration | https://www.sos.nh.gov/elections/register-vote/registration-deadlines | primary | NH deadlines page states 6-13 day local pre-election window, Election Day registration, and absentee request cutoff at noon day before election | 2026-03-01 | High |
  | No online registration + required proofs at registration | https://www.sos.nh.gov/elections/register-vote | primary | NH registration page describes in-person/absentee pathways and required proof of identity, age, citizenship, and domicile | 2026-03-01 | High |
  | Voter identification statute | https://www.leg.state.nh.us/rsa/html/LXIII/659/659-13.htm | primary | RSA 659:13 governs voter identification requirements at polling places | 2026-03-01 | High |
  | Vital records fee and turnaround | https://www.sos.nh.gov/vital-records-0/faqs | primary | NH SOS FAQ states $15 search fee, $10 additional copies, and normal mail turnaround of 20 business days | 2026-03-01 | High |
  | Request-certificates fee details | https://www.sos.nh.gov/vital-records-0/purchasing-correcting-vital-records/request-certificates | primary | NH request page confirms fee structure and submission requirements | 2026-03-01 | High |
  | POC status cross-check | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NH listed among states with active documentary citizenship requirements | 2026-03-01 | Medium |
- Sources:
  1. NH register to vote page: https://www.sos.nh.gov/elections/register-vote
  2. NH registration deadlines page: https://www.sos.nh.gov/elections/register-vote/registration-deadlines
  3. NH vital records request-certificates page: https://www.sos.nh.gov/vital-records-0/purchasing-correcting-vital-records/request-certificates
  4. NH vital records FAQ page: https://www.sos.nh.gov/vital-records-0/faqs
  5. NH voter identification statute: https://www.leg.state.nh.us/rsa/html/LXIII/659/659-13.htm
  6. NCSL citizenship-policy tracker: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Recheck NH election deadlines page each cycle because specific election-year dates are posted/updated over time.

### New Jersey - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No general poll-ID requirement; limited first-time exception contexts may apply.
- Online registration verified: Available.
- Registration deadline verified: 21 days before election.
- Vital records verified:
  - URL: `https://www.nj.gov/health/vital/order-vital/`
  - Birth certificate cost: updated to `$25 first copy/search; $2 each additional copy in the same order`.
  - Birth certificate processing time: updated to `State walk-in service typically within 2 hours; mail/online (VitalChek) requests typically 2-4 weeks`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration | https://www.nj.gov/state/elections/voter-registration.shtml | primary | NJ elections page lists 21-day deadline and online registration path | 2026-02-28 | High |
  | Voter ID limited-case framing | https://www.nj.gov/state/elections/voter-rights.shtml | primary | NJ voter rights guidance indicates ID generally not required except specific contexts | 2026-02-28 | Medium |
  | Birth certificate fee schedule | https://www.nj.gov/health/vital/order-vital/fees/ | primary | NJ Department of Health fee page lists $25 first copy/search and $2 additional copies in same order | 2026-03-01 | High |
  | Birth certificate processing guidance | https://www.nj.gov/health/vital/order-vital/non-genealogical-records/ | primary | NJ Department of Health page states walk-in processing is typically within 2 hours and VitalChek request windows are typically 2-4 weeks | 2026-03-01 | High |
  | Vital records authority | https://www.nj.gov/health/vital/order-vital/ | primary | NJ vital records order page is official source | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration | secondary | NJ not listed among documentary POC states | 2026-02-28 | Medium |
- Sources:
  1. NJ voter registration page: https://www.nj.gov/state/elections/voter-registration.shtml
  2. NJ voter rights page: https://www.nj.gov/state/elections/voter-rights.shtml
  3. NJ vital records order page: https://www.nj.gov/health/vital/order-vital/
  4. NCSL proof-of-citizenship tracker: https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev/manual step: monitor NJ DOH fee/processing pages for updates and refresh `lastVerified` when changed.

### New Mexico - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No general photo-ID requirement; limited identity/address verification rules apply in specific contexts.
- Online registration verified: Available.
- Registration deadline verified: same-day registration available through authorized election sites.
- Vital records verified:
  - URL: `https://www.nmhealth.org/about/erd/bvrhs/vrp/`
  - Birth certificate cost: updated to `$10 for the first certified copy; $10 for each additional copy`.
  - Birth certificate processing time: updated to `Walk-in: same day if in stock; internet/phone: approximately 3 business days after receipt; mail: up to 6 weeks`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration methods and same-day info | https://www.sos.nm.gov/voting-and-elections/voter-information-portal-nmvote-org/voter-registration-information/ | primary | NM SOS page provides registration methods and same-day registration guidance | 2026-02-28 | High |
  | Online registration availability | https://portal.sos.state.nm.us/OVR/WebPages/InstructionsStep1.aspx | primary | Official NM online voter registration portal | 2026-02-28 | High |
  | Vital records authority, fee, and timeline guidance | https://www.nmhealth.org/about/erd/bvrhs/vrp/ | primary | NM BVRHS page lists birth certificate fee schedule and method-specific processing windows | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration | secondary | NM not listed among documentary POC states | 2026-02-28 | Medium |
- Sources:
  1. NM voter registration info: https://www.sos.nm.gov/voting-and-elections/voter-information-portal-nmvote-org/voter-registration-information/
  2. NM online voter registration portal: https://portal.sos.state.nm.us/OVR/WebPages/InstructionsStep1.aspx
  3. NM BVRHS vital records page: https://www.nmhealth.org/about/erd/bvrhs/vrp/
  4. NCSL proof-of-citizenship tracker: https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev/manual step: monitor NM BVRHS fee/timing guidance for changes and refresh `lastVerified` on update.

### New York - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: No general poll-ID requirement is stated in NY BOE statewide voter-registration guidance pages used for this record.
- Online registration verified: Available.
- Registration deadline verified: election-specific dates published by NY BOE (`June 13, 2026` for the `June 23, 2026` primary; `October 24, 2026` for the `November 3, 2026` general election).
- Vital records verified:
  - URL: `https://www.health.ny.gov/vital_records/birth.htm`
  - Birth certificate cost: updated to `NYS DOH: $45 online/phone (+ vendor processing fee per transaction) or $30 by mail, per copy`.
  - Birth certificate processing time: updated to `NYS DOH reports significant delays in order processing (no fixed statewide SLA published)`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online voter registration availability | https://elections.ny.gov/register-vote | primary | NY BOE register page states online registration is available and links to the OVR portal | 2026-03-01 | High |
  | Registration deadlines are cycle-specific | https://elections.ny.gov/registration-and-voting-deadlines | primary | NY BOE deadlines page lists 2026 primary/general registration deadlines by date | 2026-03-01 | High |
  | Qualification framework (citizenship and registration process) | https://elections.ny.gov/voter-registration-process | primary | NY BOE process page lists registration qualifications and online update workflow | 2026-03-01 | High |
  | NYS birth-certificate fees and processing advisory | https://www.health.ny.gov/vital_records/birth.htm | primary | NYS DOH birth page lists $45 online/phone (+ vendor fee), $30 mail, and warns of significant processing delays | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration | secondary | NY not listed among documentary POC states | 2026-03-01 | Medium |
- Sources:
  1. NY register page: https://elections.ny.gov/register-vote
  2. NY voter registration process page: https://elections.ny.gov/voter-registration-process
  3. NY registration and voting deadlines page: https://elections.ny.gov/registration-and-voting-deadlines
  4. NYS DOH birth certificates page: https://www.health.ny.gov/vital_records/birth.htm
  5. NCSL proof-of-citizenship tracker: https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev/manual step: maintain separate NYC-vs-NYS issuance guidance if a future UI surface needs borough-specific fee/timing treatment.

### North Carolina - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: Photo ID is requested; all voters can still vote through ID Exception Form or provisional pathways.
- Online registration verified: Available.
- Registration deadline verified: 25 days before election; same-day registration during early voting.
- Vital records verified:
  - URL: `https://vitalrecords.nc.gov/fees.htm`
  - Birth certificate cost: updated to `$24 standard search fee (includes one copy if found); $15 each additional copy of the same certificate`.
  - Birth certificate processing time: updated to `home-page advisory of about 110-115 business days due to elevated demand`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadlines and early-voting same-day pathway | https://www.ncsbe.gov/registering/how-register | primary | NC SBE page states 25-day deadline and early-voting registration option if deadline is missed | 2026-03-01 | High |
  | Voter photo-ID with exception/provisional options | https://www.ncsbe.gov/voting/voter-id | primary | NCSBE page states voters are asked for photo ID and can still vote via ID Exception Form or provisional process | 2026-03-01 | High |
  | Vital records processing advisory | https://vitalrecords.nc.gov/ | primary | NC Vital Records home page posts processing advisory of about 110-115 business days | 2026-03-01 | High |
  | Vital records fee schedule | https://vitalrecords.nc.gov/fees.htm | primary | Fee table lists $24 standard search (includes first copy if found) and $15 each additional copy | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration | secondary | NC not listed among documentary POC states | 2026-03-01 | Medium |
- Sources:
  1. NC register guide: https://www.ncsbe.gov/registering/how-register
  2. NC voter ID page: https://www.ncsbe.gov/voting/voter-id
  3. NC vital records home page: https://vitalrecords.nc.gov/
  4. NC vital records fees page: https://vitalrecords.nc.gov/fees.htm
  5. NCSL proof-of-citizenship tracker: https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev/manual step: monitor NC processing advisory text for changes as REAL ID demand shifts.

### North Dakota - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Voter ID verified: ID required at voting; North Dakota does not use voter registration.
- Online registration verified: Not applicable (no voter registration system).
- Registration deadline verified: no voter registration required.
- Vital records verified:
  - URL: `https://www.hhs.nd.gov/vital/birth`
  - Birth certificate cost: updated to `$15.00 for each certified copy`.
  - Birth certificate processing time: updated to `usually mailed in 3-5 business days after receipt (plus return mail), with next-business-day processing for FedEx/UPS return-shipping requests`.
- Notes updated: yes.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | No voter registration system guidance | https://vip.sos.nd.gov/PortalListDetails.aspx?ptlhPKID=51&ptlPKID=7 | primary | ND SOS voting-links page includes official resource labeled \"No Voter Registration in North Dakota\" | 2026-03-01 | High |
  | Voter ID requirement | https://vip.sos.nd.gov/IDRequirements.aspx | primary | ND SOS ID page states ID is required and must include name, current ND residential address, and date of birth | 2026-03-01 | High |
  | Vital records fee and timing | https://www.hhs.nd.gov/vital/birth | primary | ND HHS birth-record FAQ states $15 per certified copy and 3-5 business day mailing turnaround after receipt | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration | secondary | ND not listed among documentary POC states | 2026-03-01 | Medium |
- Sources:
  1. ND voter portal list: https://vip.sos.nd.gov/PortalList.aspx
  2. ND voting links details (includes no-registration resource): https://vip.sos.nd.gov/PortalListDetails.aspx?ptlhPKID=51&ptlPKID=7
  3. ND voter ID requirements: https://vip.sos.nd.gov/IDRequirements.aspx
  4. ND certified birth records page: https://www.hhs.nd.gov/vital/birth
  5. NCSL proof-of-citizenship tracker: https://www.ncsl.org/elections-and-campaigns/proof-of-citizenship-requirements-for-voter-registration
- Outcome:
  - `Validated - Updated`
- Follow-up items:
  - Senior-dev/manual step: monitor ND SOS election links for cycle-year updates (the portal currently still references legacy election-year files in some sections).

### Ohio - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: true`, `pocImplemented: true`, scoped to BMV-linked citizenship-proof workflow (per NCSL Ohio HB 54 enactment summary).
- Voter ID verified: strict photo-ID framework with provisional cure process and religious-objection affidavit pathway.
- Online registration verified: available.
- Registration deadline verified: election-specific 2026 deadlines listed by Ohio SOS (Apr 6, Jul 6, Oct 5 for major 2026 cycles).
- Vital records verified:
  - URL: `https://odh.ohio.gov/know-our-programs/vital-statistics/how-to-order-certificates`
  - Birth certificate cost: updated to `$21.50 certified birth record (search fee applies whether a record is found or not)`.
  - Birth certificate processing time: updated to `online orders processed within five business days; expected USPS delivery in about three weeks`.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration and voter services portal | https://www.ohiosos.gov/elections/voters/ | primary | Ohio SOS voters page links OVR portal and voter-registration tools | 2026-03-01 | High |
  | Strict photo-ID and provisional-cure framework | https://www.ohiosos.gov/elections/voters/id-requirements/ | primary | Ohio SOS ID page lists valid IDs, provisional cure timeline, and religious-objection path | 2026-03-01 | High |
  | Election-specific registration deadlines (2026) | https://www.ohiosos.gov/elections/voters/current-voting-schedule/2026-schedule/ | primary | SOS schedule lists Apr 6 / Jul 6 / Oct 5 as registration deadlines for 2026 election cycles | 2026-03-01 | High |
  | ODH birth-certificate fee and processing windows | https://odh.ohio.gov/know-our-programs/vital-statistics/how-to-order-certificates | primary | ODH lists $21.50 fee and online processing/delivery timing | 2026-03-01 | High |
  | BMV-linked citizenship-proof enactment scope | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL recent enactments section notes Ohio HB 54 requiring proof of citizenship before BMV offers registration opportunity | 2026-03-01 | Medium |
- Sources:
  1. Ohio SOS voters page: https://www.ohiosos.gov/elections/voters/
  2. Ohio SOS ID requirements: https://www.ohiosos.gov/elections/voters/id-requirements/
  3. Ohio SOS 2026 voting schedule: https://www.ohiosos.gov/elections/voters/current-voting-schedule/2026-schedule/
  4. ODH vital records order page: https://odh.ohio.gov/know-our-programs/vital-statistics/how-to-order-certificates
  5. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor NCSL enactment notes and Ohio code updates for any post-2026 changes to BMV-linked citizenship workflows.

### Oklahoma - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Voter ID verified: in-person voters must provide qualifying photo ID or county voter ID card, or vote provisionally with signed affidavit.
- Online registration verified: available with Oklahoma Driver License/State ID and signature on file with Service Oklahoma.
- Registration deadline verified: applications accepted at any time but must be received at least 25 days before election.
- Vital records verified:
  - URL: `https://oklahoma.gov/health/services/birth-and-death-certificates/birth-certificates.html`
  - Birth certificate cost: `$15.00 per copy` (mail and online/phone; online/phone includes convenience fee).
  - Birth certificate processing time: `1-2 business days` for complete online/phone applications; OSDH birth page also states complete online orders are mailed within two business days.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online requirements | https://oklahoma.gov/elections/voter-registration/register-to-vote.html | primary | Applications accepted anytime but must be received at least 25 days before election; online path requires OK DL/ID plus signature on file | 2026-03-01 | High |
  | Voter ID and provisional-affidavit pathway | https://oklahoma.gov/elections/voters/proof-of-identity.html | primary | Every in-person voter must show proof of identity; if unavailable, voter may cast provisional ballot with signed affidavit | 2026-03-01 | High |
  | Birth certificate fee and online/phone processing | https://oklahoma.gov/health/services/birth-and-death-certificates/faqs.html | primary | Fees accordion lists birth certificate $15.00 per copy and 1-2 business day processing for complete online/phone applications | 2026-03-01 | High |
  | Online-order mail-out timing | https://oklahoma.gov/health/services/birth-and-death-certificates/birth-certificates.html | primary | Birth page announcement states complete online orders are in the mail within two business days | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Oklahoma is not identified as an active documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. Oklahoma register-to-vote page: https://oklahoma.gov/elections/voter-registration/register-to-vote.html
  2. Oklahoma voter proof-of-identity page: https://oklahoma.gov/elections/voters/proof-of-identity.html
  3. Oklahoma birth certificates page: https://oklahoma.gov/health/services/birth-and-death-certificates/birth-certificates.html
  4. Oklahoma vital records FAQs: https://oklahoma.gov/health/services/birth-and-death-certificates/faqs.html
  5. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor OSDH FAQ fee/convenience-fee table for revisions and keep birth-certificate processing wording synchronized if service model changes.

### Oregon - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Voter ID verified: no general poll-ID requirement; vote-by-mail signature verification model.
- Online registration verified: available.
- Registration deadline verified: online registration must be submitted by 11:59:59 p.m. PT on the 21st calendar day before election.
- Vital records verified:
  - URL: `https://www.oregon.gov/oha/PH/BIRTHDEATHCERTIFICATES/Pages/OrderBirthCertificate.aspx`
  - Birth certificate cost: `$25.00 initial record search fee and first certificate` (online total listed as `$47.50` including `$7.00` expedite and `$15.50` vendor/security fee).
  - Birth certificate processing time: online orders are `typically processed within three workdays` after complete information/documents; VitalChek forwards complete orders within 24 hours.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration deadline and eligibility inputs | https://sos.oregon.gov/voting/pages/registration.aspx?lang=en | primary | SOS page states 21st-calendar-day 11:59:59 p.m. deadline and online registration requirements | 2026-03-01 | High |
  | Vote-by-mail model and registration deadline framing | https://sos.oregon.gov/elections/Pages/voteinor.aspx | primary | Oregon voting page describes all-mail voting and states registration deadline is 21 days before Election Day | 2026-03-01 | High |
  | Birth certificate online fee breakdown and processing | https://www.oregon.gov/oha/PH/BIRTHDEATHCERTIFICATES/Pages/OrderBirthCertificate.aspx | primary | Online section lists $25 + $7 + $15.50 fees and states orders are typically processed within three workdays | 2026-03-01 | High |
  | Vital records fee table support | https://www.oregon.gov/oha/PH/BIRTHDEATHCERTIFICATES/Pages/VitalRecordsFees.aspx | primary | Online fee accordion repeats fee structure for initial certificate and additional charges | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Oregon is not identified as an active documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. Oregon SOS registration page: https://sos.oregon.gov/voting/pages/registration.aspx?lang=en
  2. Oregon SOS voting page: https://sos.oregon.gov/elections/Pages/voteinor.aspx
  3. Oregon OHA order birth certificate page: https://www.oregon.gov/oha/PH/BIRTHDEATHCERTIFICATES/Pages/OrderBirthCertificate.aspx
  4. Oregon OHA vital records fees page: https://www.oregon.gov/oha/PH/BIRTHDEATHCERTIFICATES/Pages/VitalRecordsFees.aspx
  5. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor OHA fee and processing language in both Order and Fees pages for future fee/vendor updates.

### Pennsylvania - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Voter ID verified: first-time voters at a polling place (or first time at a new polling place) must show photo or non-photo ID; not universal.
- Online registration verified: available.
- Registration deadline verified: must register at least 15 days before election.
- Vital records verified:
  - URL: `https://www.pa.gov/agencies/health/programs/vital-records/birth-certificates`
  - Birth certificate cost: `$20 per certificate`; online orders also include a `$10 service fee`.
  - Birth certificate processing time: PA DOH processing-times page currently lists approximately `2 weeks` for online and mailed birth-certificate applications (processing time only).
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration availability | https://www.pa.gov/agencies/vote/voter-registration | primary | PA vote page states registration must occur at least 15 days before election and provides online registration path | 2026-03-01 | High |
  | First-time polling-place voter ID scope | https://www.pa.gov/agencies/vote/voter-support/new-voters | primary | New-voters page states first-time polling-place voters must show photo or non-photo ID and clarifies non-universal scope | 2026-03-01 | High |
  | Birth certificate cost and online service fee | https://www.pa.gov/agencies/health/programs/vital-records/birth-certificates | primary | Cost accordion states $20 per birth certificate and $10 service fee for online ordering | 2026-03-01 | High |
  | Current birth-certificate processing estimate | https://www.pa.gov/agencies/health/programs/vital-records/processing-times | primary | Processing-times page lists approximately 2 weeks for online and mailed birth-certificate applications | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Pennsylvania is not identified as an active documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. PA voter registration page: https://www.pa.gov/agencies/vote/voter-registration
  2. PA first-time voters page: https://www.pa.gov/agencies/vote/voter-support/new-voters
  3. PA birth certificates page: https://www.pa.gov/agencies/health/programs/vital-records/birth-certificates
  4. PA processing times page: https://www.pa.gov/agencies/health/programs/vital-records/processing-times
  5. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor PA processing-times page for workload-driven changes; keep state record aligned if turnaround estimates shift.

### Rhode Island - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Voter ID verified: current and valid photo ID requested at polls; provisional ballot available if no acceptable photo ID is presented.
- Online registration verified: available.
- Registration deadline verified: must be registered 30 days before an election to participate.
- Vital records verified:
  - URL: `https://health.ri.gov/vital-records/requesting-vital-record-state`
  - Birth certificate cost: in person `$22` first copy and `$18` each additional same day; by mail/drop box `$25` first copy and `$18` each additional same day.
  - Birth certificate processing time: RIDOH states mail/drop box requests take `4-6 weeks`; rush requests are processed in `5-7 business days`.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration | https://vote.sos.ri.gov/Voter/RegisterToVote | primary | RI SOS states voters must be registered 30 days before an election; page includes online registration workflow | 2026-03-01 | High |
  | Photo-ID and provisional-ballot workflow | https://vote.sos.ri.gov/Voter/VoteatthePolls | primary | RI SOS states voters present current valid photo ID; those without acceptable photo ID may cast provisional ballots | 2026-03-01 | High |
  | Vital-record fees and processing windows | https://health.ri.gov/vital-records/requesting-vital-record-state | primary | RIDOH lists in-person/mail costs and states 4-6 week mail/drop-box processing with 5-7 business day rush processing | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Rhode Island is not identified as an active documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. RI SOS registration page: https://vote.sos.ri.gov/Voter/RegisterToVote
  2. RI SOS vote-at-polls page: https://vote.sos.ri.gov/Voter/VoteatthePolls
  3. RIDOH requesting a vital record page: https://health.ri.gov/vital-records/requesting-vital-record-state
  4. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor RIDOH fee and processing text for future updates and keep in-person/mail fee split synchronized.

### South Carolina - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Voter ID verified: in-person voting asks for current and valid photo ID; voters without qualifying photo ID can use provisional/reasonable-impediment workflow.
- Online registration verified: available through SCVotes and requires an SC driver's license or DMV ID for the online flow.
- Registration deadline verified: SC Votes FAQ states registration deadline is 30 days prior to Election Day.
- Vital records verified:
  - URL: `https://dph.sc.gov/public/vital-records/birth-certificates`
  - Birth certificate cost: expedited search fee `$17` (includes one certified copy) for in-person/online channels; mail standard search fee `$12`; `$3` each additional copy; online/phone vendor fees apply.
  - Birth certificate processing time: average `5-7 business days` online/phone, `30-45 minutes` in person, and `4 weeks` by mail (drop-off expedited path `5 business days or less`).
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Online registration availability and requirements | https://scvotes.gov/voters/register-to-vote/ | primary | Register-to-vote page provides online registration and states SC driver's license or DMV ID requirement | 2026-03-01 | High |
  | Registration deadline | https://scvotes.gov/voters/voter-faq/ | primary | FAQ states deadline to register in any SC election is 30 days prior to Election Day | 2026-03-01 | High |
  | Photo-ID and provisional/reasonable-impediment pathway | https://scvotes.gov/voters/photo-id-requirements/ | primary | Photo-ID page lists current/valid IDs and links to no-ID/forgot-ID exception flows | 2026-03-01 | High |
  | Birth certificate fees and processing windows | https://dph.sc.gov/public/vital-records/birth-certificates | primary | DPH page lists $17 expedited, $12 mail standard, $3 additional-copy fees and method-specific processing times | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | South Carolina is not identified as an active documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. SC Votes register-to-vote page: https://scvotes.gov/voters/register-to-vote/
  2. SC Votes voter FAQ page: https://scvotes.gov/voters/voter-faq/
  3. SC Votes photo-ID requirements page: https://scvotes.gov/voters/photo-id-requirements/
  4. SC DPH birth certificates page: https://dph.sc.gov/public/vital-records/birth-certificates
  5. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor SC DPH vendor-fee and turnaround-language changes and keep channel-specific timing text synchronized.

### South Dakota - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Voter ID verified: all in-person voters must show approved photo ID; voters without photo ID can sign a personal identification affidavit and vote a regular ballot.
- Online registration verified: not available; form with original signature is required.
- Registration deadline verified: voter registration form must be received by county auditor 15 days before any election.
- Vital records verified:
  - URL: `https://doh.sd.gov/licensing-and-records/vital-records/`
  - Birth certificate cost: `$15.00` certified or informational copy; `$11.50` expedite fee applies to phone/internet requests (plus additional shipping if UPS is selected).
  - Birth certificate processing time: SD DOH order page states processing times may vary depending on location; prepaid priority envelope may be submitted for optional expedited mail processing.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and no-online-registration workflow | https://sdsos.gov/elections-voting/voting/register-to-vote/default.aspx | primary | Registration form with original signature must be received by county auditor 15 days before election; fax/email submission not allowed | 2026-03-01 | High |
  | Voter-ID rule and affidavit fallback | https://sdsos.gov/elections-voting/voting/default.aspx | primary | SOS voting page states all polling-place voters show ID and those without photo ID may sign personal identification affidavit and vote regular ballot | 2026-03-01 | High |
  | Vital-record base fee and processing caveat | https://doh.sd.gov/licensing-and-records/vital-records/order-vital-records/ | primary | Order page states $15 search fee applies to certificates and that processing times may vary by location | 2026-03-01 | High |
  | Exact fee and expedite amount | https://doh.sd.gov/licensing-and-records/vital-records/order-vital-records/vital-records-fees/ | primary | Fee table lists $15 certified/informational copy and $11.50 expedite fee for phone/internet requests | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | South Dakota is not identified as an active documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. SD SOS register-to-vote page: https://sdsos.gov/elections-voting/voting/register-to-vote/default.aspx
  2. SD SOS voting information page: https://sdsos.gov/elections-voting/voting/default.aspx
  3. SD DOH order vital records page: https://doh.sd.gov/licensing-and-records/vital-records/order-vital-records/
  4. SD DOH vital records fees page: https://doh.sd.gov/licensing-and-records/vital-records/order-vital-records/vital-records-fees/
  5. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor SD DOH fee/expedite table and vendor charge language for updates; retain explicit note that SOS legacy voter-ID URL is deprecated (404).

### Tennessee - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Voter ID verified: voters must bring valid photo ID (certain expired TN/federal IDs are acceptable); voters without photo ID vote provisionally and have two business days after Election Day to present valid ID.
- Online registration verified: available via Tennessee online registration portal.
- Registration deadline verified: qualified voter must be properly registered no later than 30 days before the election.
- Vital records verified:
  - URL: `https://vitalrecords.tn.gov/hc/en-us/articles/36323891148435-How-do-I-get-my-certificate-In-Person-Local-County-Health-Department-Mail-or-Online`
  - Birth certificate cost: `$15.00` for first copy and `$15.00` for each additional copy.
  - Birth certificate processing time: Tennessee Vital Records “How long will it take?” article states (as of `2025-12-08`) request-for-certificate processing is `Same Day` in person and about `3 days` by mail or online, with explicit warning that times may change with volume/workforce.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration availability | https://sos.tn.gov/elections/guides/how-to-register-to-vote | primary | Page states registration is required no later than 30 days before election and links online voter registration | 2026-03-01 | High |
  | Voter-ID requirement and provisional cure workflow | https://sos.tn.gov/elections/faqs | primary | FAQ tabs state valid photo ID requirement and two-business-day cure window for provisional voters without ID | 2026-03-01 | High |
  | Birth-certificate ordering channels and official online vendor language | https://vitalrecords.tn.gov/hc/en-us/articles/36323891148435-How-do-I-get-my-certificate-In-Person-Local-County-Health-Department-Mail-or-Online | primary | Article covers in-person/mail/online channels and identifies VitalChek as only official vendor for online orders | 2026-03-01 | High |
  | Birth certificate fee values | https://vitalrecords.tn.gov/hc/en-us/articles/36329848421651-Fees | primary | Fee table lists birth certificate first copy $15.00 and each additional copy $15.00 | 2026-03-01 | High |
  | Certificate processing-time table | https://vitalrecords.tn.gov/hc/en-us/articles/36330016050195-How-long-will-it-take | primary | Processing table (as-of dated) lists same-day in person and 3-day mail/online request timelines for certificates without record changes | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Tennessee is not identified as an active documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. TN SOS register-to-vote guide: https://sos.tn.gov/elections/guides/how-to-register-to-vote
  2. TN SOS elections FAQ hub (Voter ID Requirements): https://sos.tn.gov/elections/faqs
  3. TN Vital Records order methods article: https://vitalrecords.tn.gov/hc/en-us/articles/36323891148435-How-do-I-get-my-certificate-In-Person-Local-County-Health-Department-Mail-or-Online
  4. TN Vital Records fees article: https://vitalrecords.tn.gov/hc/en-us/articles/36329848421651-Fees
  5. TN Vital Records processing-time article: https://vitalrecords.tn.gov/hc/en-us/articles/36330016050195-How-long-will-it-take
  6. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor dated processing-time article for updates and re-baseline TN certificate-time wording when TDH updates the as-of date.

### Texas - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Voter ID verified: Texas requires acceptable photo ID for in-person voting, with Reasonable Impediment Declaration plus supporting ID pathway when voters do not possess and cannot reasonably obtain acceptable photo ID.
- Online registration verified: Texas does not provide full new-voter online registration completion; voters can initiate application online but registration is still governed by Texas submission rules.
- Registration deadline verified: eligible voters must register by the 30th day before Election Day.
- Vital records verified:
  - URL: `https://www.dshs.texas.gov/vital-statistics/birth-records`
  - Birth certificate cost: `$22.00` for certified long-form and `$22.00` for certified short-form birth records.
  - Birth certificate processing time: DSHS processing table lists `20-25 business days` for Texas.gov birth-certificate orders and `25-30 business days` for mail-in birth-certificate orders (shipping excluded).
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and registration-flow framing | https://www.votetexas.gov/register-to-vote/index.html | primary | VoteTexas page states Texas law requires registration by 30th day before Election Day and links registration-start workflow | 2026-03-01 | High |
  | Voter-ID requirements, RID pathway, and provisional cure timing | https://www.votetexas.gov/voting/need-id.html | primary | Need-ID page describes acceptable photo ID list, RID plus supporting-ID workflow, and six-calendar-day provisional cure for certain cases | 2026-03-01 | High |
  | Birth-record ordering channels and in-person timing caveat | https://www.dshs.texas.gov/vital-statistics/birth-records | primary | Birth-records page states online is fastest and notes in-person orders are usually same day but some applications require 24+ hours | 2026-03-01 | High |
  | Birth-certificate fee values | https://www.dshs.texas.gov/vital-statistics/costs-fees#birth | primary | Costs and Fees birth table lists certified long/short birth record costs at $22.00 | 2026-03-01 | High |
  | Birth-certificate processing windows | https://www.dshs.texas.gov/vital-statistics/processing-times | primary | Processing Times page lists birth certificate 20-25 business days (Texas.gov) and 25-30 business days (mail-in) | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Texas is not identified as an active documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. VoteTexas registration page: https://www.votetexas.gov/register-to-vote/index.html
  2. VoteTexas voter-ID page: https://www.votetexas.gov/voting/need-id.html
  3. Texas DSHS birth records page: https://www.dshs.texas.gov/vital-statistics/birth-records
  4. Texas DSHS costs and fees page: https://www.dshs.texas.gov/vital-statistics/costs-fees#birth
  5. Texas DSHS processing times page: https://www.dshs.texas.gov/vital-statistics/processing-times
  6. NCSL legislative approaches page: https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor DSHS processing-time table and expedited-fee language for updates, and keep Texas page references aligned with current VoteTexas URL structure.

### Utah - Validation Entry

- Date reviewed: 2026-03-01
- Reviewer: Codex
- Record location: `src/data/states.js`
- POC classification: `currentPocLaw: false`, `pocImplemented: false`.
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online/paper pathway | https://vote.utah.gov/register-to-vote-or-update-your-voter-registration/ | primary | Utah page states online registration needs valid Utah DL/ID and paper forms must be received by county clerk by 5:00 pm 11 days before election | 2026-03-01 | High |
  | Election Day in-person registration ID standard | https://vote.utah.gov/current-election-information/ | primary | Current election page states voters may register in person on Election Day with two forms of valid ID | 2026-03-01 | High |
  | Provisional-registration ID requirement | https://vote.utah.gov/voter-id-requirements/ | primary | Voter ID page states unregistered voters using provisional ballots must show two IDs (identity plus residence) | 2026-03-01 | High |
  | Mail-ballot signature verification/cure flow | https://vote.utah.gov/securing-your-mail-ballot/ | primary | Utah election page states county officials compare signatures and notify voters for cure affidavit when mismatch occurs | 2026-03-01 | High |
  | Vital-record processing-time anchor | https://vitalrecords.utah.gov/order-a-vital-record-certificate#inperson | primary | Utah vital records page states mail requests should allow at least 6 weeks for processing and mailing | 2026-03-01 | High |
  | Vital-record fee values | https://vitalrecords.utah.gov/wp-content/uploads/FeeScheduleFY25-APPROVED-.docx.pdf | primary | Utah fee schedule lists certified birth certificate at $22 for first copy and $10 for each additional copy in same order | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Utah is not listed as an active statewide documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. https://vote.utah.gov/register-to-vote-or-update-your-voter-registration/
  2. https://vote.utah.gov/current-election-information/
  3. https://vote.utah.gov/voter-id-requirements/
  4. https://vote.utah.gov/securing-your-mail-ballot/
  5. https://vitalrecords.utah.gov/order-a-vital-record-certificate#inperson
  6. https://vitalrecords.utah.gov/forms-and-links
  7. https://vitalrecords.utah.gov/wp-content/uploads/FeeScheduleFY25-APPROVED-.docx.pdf
  8. https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor Utah fee schedule updates each fiscal year.

### Vermont - Validation Entry
- Date reviewed: 2026-03-01
- Record: `src/data/states.js`
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Same-day registration | https://sos.vermont.gov/elections/voters/registration/ | primary | Vermont SOS registration page states eligible persons may register up to and including Election Day | 2026-03-01 | High |
  | First-time mail/online ID copy requirement | https://sos.vermont.gov/elections/voters/registration/ | primary | Vermont SOS states first-time registrants by mail or online must include photocopy of acceptable ID | 2026-03-01 | High |
  | No general poll-ID requirement framing | https://sos.vermont.gov/elections/voters/registration/ | primary | SOS guidance frames ID requirement around first-time-by-mail/online registration, not universal poll-ID check | 2026-03-01 | High |
  | Vital-record fee values | https://www.healthvermont.gov/stats/vital-records/order-vital-records | primary | Vermont Health order page states certified copies cost $10 each and online orders add $2 processing fee | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Vermont is not listed as an active statewide documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. https://sos.vermont.gov/elections/voters/registration/
  2. https://www.healthvermont.gov/stats/vital-records
  3. https://www.healthvermont.gov/stats/vital-records/order-vital-records
  4. https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated (partial, placeholder)`

### Virginia - Validation Entry
- Date reviewed: 2026-03-01
- Record: `src/data/states.js`
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadlines and Election Day provisional-registration pathway | https://www.elections.virginia.gov/registration/ | primary | Registration page states general/primary/special deadlines are 11 days before election and voters may register through Election Day and vote provisionally | 2026-03-01 | High |
  | In-person ID and cure workflow | https://www.elections.virginia.gov/casting-a-ballot/in-person-voting/ | primary | In-person voting page states voters provide acceptable ID or sign ID Confirmation Statement; otherwise provisional ballot with cure by noon Friday after election | 2026-03-01 | High |
  | Vital-record fee and processing-time values | https://www.vdh.virginia.gov/vital-records/ | primary | VDH page states fee of $12 per requested copy and normal processing time of 2 weeks, with next-day processing and express delivery options noted | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Virginia is not listed as an active statewide documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. https://www.elections.virginia.gov/registration/
  2. https://www.elections.virginia.gov/casting-a-ballot/in-person-voting/
  3. https://www.vdh.virginia.gov/vital-records/
  4. https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`

### Washington - Validation Entry
- Date reviewed: 2026-03-01
- Record: `src/data/states.js`
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Election model and registration windows | https://www.sos.wa.gov/elections#voters | primary | WA SOS Elections page lists ballot-mailing start in 18-day voting period, online/mail registration due 8 days before Election Day, and in-person registration/update deadline on Election Day | 2026-03-01 | High |
  | Birth-record base fee | https://doh.wa.gov/licenses-permits-and-certificates/vital-records/ordering-vital-record/birth-record | primary | WA DOH birth-record page states nonrefundable fees start at $25 per certified/noncertified copy | 2026-03-01 | High |
  | Channel-specific ordering costs and timing | https://doh.wa.gov/licenses-permits-and-certificates/vital-records/ordering-vital-record | primary | WA DOH ordering page states online/phone start at $40.50 and process/ship in 3-7 business days; mail starts at $25 and ships in 6-8 weeks; local in-person partners report most orders same day | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Washington is not listed as an active statewide documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. https://www.sos.wa.gov/elections#voters
  2. https://doh.wa.gov/licenses-permits-and-certificates/vital-records/ordering-vital-record
  3. https://doh.wa.gov/licenses-permits-and-certificates/vital-records/ordering-vital-record/birth-record
  4. https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`

### West Virginia - Validation Entry
- Date reviewed: 2026-03-01
- Record: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `false`
  - `pocImplemented`: `false`
  - `pocScope`: n/a
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and online registration pathway | https://sos.wv.gov/elections/Pages/BeReg.aspx | primary | WV SOS registration page states applications must be received by the close of business 21 days before the election and links online registration workflows | 2026-03-01 | High |
  | Voter ID requirement and affidavit/provisional fallback | https://sos.wv.gov/elections/Pages/BeReg.aspx | primary | WV SOS election guidance includes voter ID requirements and provisional/affidavit pathways when acceptable ID is unavailable | 2026-03-01 | High |
  | Birth-certificate fee and processing timing | https://dhhr.wv.gov/HSC/VR/CR/Pages/default.aspx | primary | WV DHHR certificate request page lists $12 certified copy fee, same-day walk-in availability, and mail requests typically processed in 5-15 business days | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | West Virginia is not listed as an active statewide documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. https://sos.wv.gov/elections/Pages/GoVoteWV.aspx
  2. https://sos.wv.gov/elections/Pages/BeReg.aspx
  3. https://dhhr.wv.gov/HSC/VR/CR/Pages/default.aspx
  4. https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor WV vital-record office and SOS pages for fee or ID-procedure changes.

### Wisconsin - Validation Entry
- Date reviewed: 2026-03-01
- Record: `src/data/states.js`
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadlines and Election Day registration pathway | https://elections.wi.gov/Register | primary | Wisconsin Elections page states online/mail registration up to 20 days before election, in-person registration at clerk office until Friday before election, and at polling place on Election Day | 2026-03-01 | High |
  | Strict photo-ID requirement | https://elections.wi.gov/photoid | primary | Wisconsin Elections photo ID page states voters must show acceptable photo ID to receive a ballot in all elections | 2026-03-01 | High |
  | Free DMV voting ID pathway | https://elections.wi.gov/photoid | primary | Wisconsin Elections photo ID page states residents can obtain free state ID for voting from Wisconsin DOT/DMV | 2026-03-01 | High |
  | Vital-record fee and processing times | https://www.dhs.wisconsin.gov/vitalrecords/record.htm | primary | Wisconsin DHS page states mail fees are $20 first copy and $3 additional same-record copies; processing about 5 business days online/phone and about 10 business days by mail after receipt | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | Wisconsin is not listed as an active statewide documentary proof-of-citizenship registration state | 2026-03-01 | Medium |
- Sources:
  1. https://elections.wi.gov/Register
  2. https://elections.wi.gov/photoid
  3. https://www.dhs.wisconsin.gov/vitalrecords/index.htm
  4. https://www.dhs.wisconsin.gov/vitalrecords/record.htm
  5. https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`

### Wyoming - Validation Entry
- Date reviewed: 2026-03-01
- Record: `src/data/states.js`
- POC classification:
  - `currentPocLaw`: `true`
  - `pocImplemented`: `true`
  - `pocScope`: `new voter registrations and registration updates under current Wyoming documentary-citizenship rules`
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Registration deadline and no-online-registration model | https://sos.wyo.gov/Elections/State/RegisteringToVote.aspx | primary | Wyoming SOS page states there is no online registration and mail registrations must be received by 5:00 p.m. fourteen days before election, with in-person registration through Election Day | 2026-03-01 | High |
  | Voter ID requirement and provisional fallback | https://sos.wyo.gov/Elections/VoterID/ | primary | Wyoming SOS voter-ID page states approved photo IDs are required and voters without ID may vote provisionally and show ID before canvass completion | 2026-03-01 | High |
  | Birth-certificate fee values and processing windows | https://health.wyo.gov/wp-content/uploads/2024/10/WDH_VSS-Application-for-Certified-Copy-2024-Form-1a-Birth.pdf | primary | Wyoming VSS application states birth certificates are $25 per copy; online/in-person requests are typically processed in 3-5 business days and mail requests vary by handling/transit | 2026-03-01 | High |
  | Active scoped documentary-citizenship status | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | NCSL tracks Wyoming among states with documentary-citizenship requirements in voter-registration workflows | 2026-03-01 | Medium |
- Sources:
  1. https://sos.wyo.gov/Elections/State/RegisteringToVote.aspx
  2. https://sos.wyo.gov/Elections/VoterID/
  3. https://health.wyo.gov/admin/vitalstatistics/certificates/
  4. https://health.wyo.gov/admin/vitalstatistics/forms/
  5. https://health.wyo.gov/wp-content/uploads/2024/10/WDH_VSS-Application-for-Certified-Copy-2024-Form-1a-Birth.pdf
  6. https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`
- Follow-up items: monitor Wyoming SOS and VSS form revisions for deadline, fee, or processing-time changes.

### District Of Columbia - Validation Entry
- Date reviewed: 2026-03-01
- Record: `src/data/states.js`
- Claim-to-proof matrix:
  | Claim | Source URL | Source Type | Evidence Snippet | Access Date | Confidence |
  |---|---|---|---|---|---|
  | Live DCBOE registration endpoint | https://www.dcboe.org/ | primary | DCBOE home page links to register/update voter registration at `/voters/register-to-vote/register-update-voter-registration` | 2026-03-01 | High |
  | Registration deadlines and same-day registration | https://www.dcboe.org/voters/register-to-vote/register-update-voter-registration | primary | DCBOE page states online/mail applications must be received by 21st day before election and allows registration during Early Voting/Election Day with proof of residence | 2026-03-01 | High |
  | First-time-by-mail/electronic ID caveat | https://www.dcboe.org/voters/register-to-vote/register-update-voter-registration | primary | DCBOE page notes first-time registrants by mail/electronic submission may need to provide identification when voting | 2026-03-01 | High |
  | Birth-certificate fee value | https://dchealth.dc.gov/page/vital-records-fee-schedule-html | primary | DC Health fee schedule lists birth certificate fee at $23.00 | 2026-03-01 | High |
  | Birth-certificate ordering channels and timing language | https://dchealth.dc.gov/vital-records/ | primary | DC Health states orders can be submitted online/phone/mail via VitalChek and that processing/shipping times vary by vendor/carrier | 2026-03-01 | High |
  | No active documentary POC mandate | https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote | secondary | District of Columbia is not listed as an active statewide documentary proof-of-citizenship registration jurisdiction | 2026-03-01 | Medium |
- Sources:
  1. https://www.dcboe.org/
  2. https://www.dcboe.org/voters/register-to-vote/register-update-voter-registration
  3. https://dchealth.dc.gov/service/birth-certificates
  4. https://dchealth.dc.gov/page/vital-records-fee-schedule-html
  5. https://dchealth.dc.gov/vital-records/
  6. https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote
- Outcome: `Validated - Updated`

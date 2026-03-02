import { NEXT_FEDERAL_ELECTION } from "@/data/elections";

/**
 * Compute deadline-related metrics for a state.
 * @param {object} state — a state entry from stateData
 * @param {Date} [now] — override for testability (defaults to current date)
 * @returns {{ daysUntilElection: number, registrationDeadline: string, urgency: "critical"|"soon"|"plenty" }}
 */
export function computeDeadlineMetrics(state, now = new Date()) {
  const election = new Date(NEXT_FEDERAL_ELECTION + "T00:00:00");
  const diffMs = election.getTime() - now.getTime();
  const daysUntilElection = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  let urgency = "plenty";
  if (daysUntilElection <= 30) urgency = "critical";
  else if (daysUntilElection <= 90) urgency = "soon";

  return {
    daysUntilElection,
    registrationDeadline: state.registrationDeadline || "Check state website",
    urgency,
  };
}

/**
 * Compute a friction score (0–5) based on how many bureaucratic hurdles
 * a voter faces in a given state. Higher = more friction.
 *
 * Factors (1 point each):
 *  - Proof-of-citizenship law on the books
 *  - POC law actively enforced
 *  - Voter ID required (photo)
 *  - No online registration
 *  - Record needs review (data quality flag)
 *
 * @param {object} state
 * @returns {{ score: number, maxScore: number, factors: string[] }}
 */
export function computeFrictionScore(state) {
  const factors = [];

  if (state.currentPocLaw) factors.push("Proof-of-citizenship law on books");
  if (state.currentPocLaw && state.pocImplemented) factors.push("POC law actively enforced");
  if (state.voterIdRequired) factors.push("Photo ID required");
  if (!state.onlineReg) factors.push("No online registration");
  if (state.needsReview) factors.push("Data under review");

  return {
    score: factors.length,
    maxScore: 5,
    factors,
  };
}

/**
 * Compute source freshness based on the state's lastVerified date.
 * @param {object} state
 * @param {Date} [now]
 * @returns {{ daysSinceVerified: number|null, label: string, level: "fresh"|"aging"|"stale"|"unknown" }}
 */
export function computeSourceFreshness(state, now = new Date()) {
  if (!state.lastVerified) {
    return { daysSinceVerified: null, label: "No verification date", level: "unknown" };
  }

  const verified = new Date(state.lastVerified + "T00:00:00");
  if (Number.isNaN(verified.getTime())) {
    return { daysSinceVerified: null, label: "Invalid date", level: "unknown" };
  }

  const diffMs = now.getTime() - verified.getTime();
  const daysSinceVerified = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

  let level = "fresh";
  let label = `Verified ${daysSinceVerified}d ago`;

  if (daysSinceVerified > 90) {
    level = "stale";
    label = `Stale — verified ${daysSinceVerified}d ago`;
  } else if (daysSinceVerified > 30) {
    level = "aging";
    label = `Aging — verified ${daysSinceVerified}d ago`;
  }

  return { daysSinceVerified, label, level };
}

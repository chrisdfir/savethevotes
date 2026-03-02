import { stateData } from "@/data/states";
import { computeDeadlineMetrics, computeFrictionScore, computeSourceFreshness } from "./metrics";

/**
 * Get all three metric groups for a single state.
 * @param {string} stateName — key in stateData (e.g. "Alabama")
 * @param {Date} [now]
 * @returns {{ deadline: object, friction: object, freshness: object } | null}
 */
export function getStateMetrics(stateName, now = new Date()) {
  const state = stateData[stateName];
  if (!state) return null;

  return {
    deadline: computeDeadlineMetrics(state, now),
    friction: computeFrictionScore(state),
    freshness: computeSourceFreshness(state, now),
  };
}

/**
 * Get metrics for all 51 entries, keyed by state name.
 * @param {Date} [now]
 * @returns {Record<string, { deadline: object, friction: object, freshness: object }>}
 */
export function getAllStateMetrics(now = new Date()) {
  const result = {};
  for (const name of Object.keys(stateData)) {
    result[name] = getStateMetrics(name, now);
  }
  return result;
}

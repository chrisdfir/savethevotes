import { stateData } from "./states";

export function stateToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function slugToState(slug) {
  return Object.keys(stateData).find(
    (name) => stateToSlug(name) === slug
  );
}

export function getAllStateSlugs() {
  return Object.keys(stateData).map(stateToSlug);
}

// Pre-computed map for O(1) lookup
export const slugMap = Object.fromEntries(
  Object.keys(stateData).map((name) => [stateToSlug(name), name])
);

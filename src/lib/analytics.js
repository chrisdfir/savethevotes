/** Lightweight GA4 event helpers. Safe to call when gtag is not loaded. */

export function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export function trackShare(platform) {
  trackEvent("share", { method: platform });
}

export function trackOutboundClick(url, label) {
  trackEvent("click", { event_category: "outbound", event_label: label, link_url: url });
}

export function trackStateView(stateName) {
  trackEvent("select_content", { content_type: "state_guide", item_id: stateName });
}

export function trackSectionExpand(sectionId) {
  trackEvent("select_content", { content_type: "section_expand", item_id: sectionId });
}

export function trackCTA(ctaName) {
  trackEvent("select_content", { content_type: "cta", item_id: ctaName });
}

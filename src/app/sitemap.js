import { stateData } from "@/data/states";
import { stateToSlug } from "@/data/stateSlugs";
import { SITE_LAST_UPDATED } from "@/data/siteConfig";

export default function sitemap() {
  const states = Object.entries(stateData).map(([name, state]) => ({
    url: `https://savethevotes.org/${stateToSlug(name)}`,
    lastModified: state.lastVerified || SITE_LAST_UPDATED,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://savethevotes.org",
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://savethevotes.org/privacy",
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://savethevotes.org/terms",
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...states,
  ];
}

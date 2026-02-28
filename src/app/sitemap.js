import { getAllStateSlugs } from "@/data/stateSlugs";

export default function sitemap() {
  const states = getAllStateSlugs().map((slug) => ({
    url: `https://savethevotes.org/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://savethevotes.org",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://savethevotes.org/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...states,
  ];
}

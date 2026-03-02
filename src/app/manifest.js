export default function manifest() {
  return {
    name: "Save the Votes",
    short_name: "SaveTheVotes",
    description:
      "State-by-state voter registration guides. Find out what documents you need to vote under the SAVE Act.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1a",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

import { stateData } from "@/data/states";
import { slugToState, getAllStateSlugs } from "@/data/stateSlugs";
import { notFound } from "next/navigation";
import StateGuide from "@/components/StateGuide";
import StateFAQ from "@/components/StateFAQ";

const volatilePlaceholderPatterns = [
  /see .*fee schedule/i,
  /varies by/i,
  /processing queue/i,
  /see .*processing/i,
];

function isVolatilePlaceholder(value) {
  return (
    typeof value === "string" &&
    volatilePlaceholderPatterns.some((pattern) => pattern.test(value))
  );
}

export function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }) {
  const { state: slug } = await params;
  const stateName = slugToState(slug);
  if (!stateName) return {};
  const state = stateData[stateName];

  const pocSummary = state.currentPocLaw
    ? (state.pocImplemented
        ? `Proof-of-citizenship rule is active${state.pocScope ? ` for ${state.pocScope}` : ""}.`
        : "Proof-of-citizenship law exists but is not currently enforced.")
    : "No proof-of-citizenship requirement is currently active.";
  const hasVolatilePlaceholders =
    isVolatilePlaceholder(state.birthCertCost) ||
    isVolatilePlaceholder(state.birthCertTime);
  const birthMeta = hasVolatilePlaceholders
    ? `Birth certificate fees and processing can vary; see official state sources for current details.`
    : `Birth certificate costs ${state.birthCertCost}, processing ${state.birthCertTime}.`;
  const description = `Everything you need to register to vote in ${stateName}. ${birthMeta} ${pocSummary} Voter ID: ${state.voterIdType}.`;
  const ogDescription = `${stateName} voter registration guide: birth certificate costs, voter ID rules, proof-of-citizenship status, election office links, and deadlines. Free nonpartisan resource.`;

  return {
    title: `${stateName} Voter Registration Guide`,
    description,
    openGraph: {
      title: `${stateName} Voting Guide — Save the Votes`,
      description: ogDescription,
      url: `https://savethevotes.org/${slug}`,
      siteName: "Save the Votes",
      type: "article",
      images: [
        {
          url: "https://savethevotes.org/og",
          width: 1200,
          height: 630,
          alt: `${stateName} Voter Registration Guide — Save the Votes`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${stateName} Voting Guide — Save the Votes`,
      description: ogDescription,
      images: ["https://savethevotes.org/og"],
    },
    alternates: {
      canonical: `https://savethevotes.org/${slug}`,
    },
  };
}

export default async function StatePage({ params }) {
  const { state: slug } = await params;
  const stateName = slugToState(slug);
  if (!stateName) notFound();
  const state = stateData[stateName];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://savethevotes.org",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${stateName} Voter Registration Guide`,
        item: `https://savethevotes.org/${slug}`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${stateName} Voter Registration Guide`,
    description: `Everything you need to register to vote in ${stateName}. Birth certificate info, voter ID rules, and election resources.`,
    url: `https://savethevotes.org/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Save the Votes",
      url: "https://savethevotes.org",
    },
    dateModified: state.lastVerified || "2026-03-02",
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <StateGuide stateName={stateName} state={state} slug={slug} />
      <StateFAQ stateName={stateName} state={state} />
    </article>
  );
}

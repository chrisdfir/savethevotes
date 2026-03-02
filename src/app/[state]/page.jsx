import { stateData } from "@/data/states";
import { slugToState, getAllStateSlugs } from "@/data/stateSlugs";
import { notFound } from "next/navigation";
import StateGuide from "@/components/StateGuide";
import StateFAQ from "@/components/StateFAQ";

export function generateStaticParams() {
  return getAllStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({ params }) {
  const { state: slug } = await params;
  const stateName = slugToState(slug);
  if (!stateName) return {};
  const state = stateData[stateName];

  const pocSnippet = state.currentPocLaw
    ? (state.pocImplemented ? "Proof-of-citizenship requirement is active." : "POC law on books but not enforced.")
    : "No proof-of-citizenship requirement.";
  const description = `${stateName} voter registration guide: birth certificate costs, voter ID rules, deadlines, and election office links. ${pocSnippet} Free nonpartisan resource.`;
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
          url: `https://savethevotes.org/og?state=${encodeURIComponent(stateName)}`,
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
      images: [`https://savethevotes.org/og?state=${encodeURIComponent(stateName)}`],
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

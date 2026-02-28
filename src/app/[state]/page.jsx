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

  return {
    title: `${stateName} Voter Registration Guide`,
    description: `Everything you need to register to vote in ${stateName}. Birth certificate costs ${state.birthCertCost}, processing ${state.birthCertTime}. ${state.currentPocLaw ? "Proof of citizenship required." : "No proof of citizenship requirement."} Voter ID: ${state.voterIdType}.`,
    openGraph: {
      title: `${stateName} Voting Guide — Save the Votes`,
      description: `Voter registration requirements, birth certificate info, and election resources for ${stateName}.`,
      url: `https://savethevotes.org/${slug}`,
      siteName: "Save the Votes",
      type: "article",
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

  return (
    <article>
      <StateGuide stateName={stateName} state={state} slug={slug} />
      <StateFAQ stateName={stateName} state={state} />
    </article>
  );
}

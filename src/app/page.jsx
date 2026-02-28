import Hero from "@/components/Hero";
import ActionChecklist from "@/components/ActionChecklist";
import USMap from "@/components/USMap";
import StateSelector from "@/components/StateSelector";
import DocumentCards from "@/components/DocumentCards";
import SpecialSituations from "@/components/SpecialSituations";
import FactsGrid from "@/components/FactsGrid";
import Timeline from "@/components/Timeline";
import ActionSection from "@/components/ActionSection";
import SectionDivider from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <ActionChecklist />
      <SectionDivider />
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-serif text-3xl text-text mb-2">Explore Your State</h2>
        <p className="text-text-secondary mb-8">
          Click any state to see its voter registration guide. States are colored
          by proof-of-citizenship law status.
        </p>
        <USMap />
      </section>
      <SectionDivider />
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <h2 className="font-serif text-3xl text-text mb-2">Your State Guide</h2>
        <p className="text-text-secondary mb-6">
          Select your state to see current voter registration requirements, how
          to get your birth certificate, and direct links to your election
          office. States with a red left border currently have
          proof-of-citizenship laws.
        </p>
        <StateSelector />
      </section>
      <SectionDivider />
      <DocumentCards />
      <SectionDivider />
      <SpecialSituations />
      <SectionDivider />
      <FactsGrid />
      <SectionDivider />
      <Timeline />
      <SectionDivider />
      <ActionSection />
    </>
  );
}

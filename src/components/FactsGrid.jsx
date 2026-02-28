"use client";

import { motion, useReducedMotion } from "framer-motion";

const facts = [
  { stat: "146M", label: "Americans without a valid passport", sub: "153M voted in 2024", source: "State Dept. & Census Bureau", sourceUrl: "https://travel.state.gov/content/travel/en/about/reports-and-statistics.html" },
  { stat: "~21M", label: "Adults without easy access to citizenship docs", sub: "Brennan Center for Justice", sourceUrl: "https://www.brennancenter.org/our-work/research-reports/citizens-without-proof" },
  { stat: "0.0001%", label: "Rate of suspected noncitizen voting", sub: "Federal and state audits", sourceUrl: "https://www.brennancenter.org/our-work/research-reports/noncitizen-voting-missing-millions" },
  { stat: "31,000+", label: "Eligible citizens blocked in Kansas", sub: "Similar law tested 2013–2018", source: "Fish v. Kobach ruling", sourceUrl: "https://www.aclu.org/cases/fish-v-kobach" },
  { stat: "84%", label: "of married women who change their surname", sub: "~69M may have name mismatch on birth cert", source: "Census Bureau", sourceUrl: "https://www.census.gov/library/stories/2023/02/unique-aspects-women-marriage-702702.html" },
  { stat: "4", label: "States currently require proof of citizenship", sub: "AZ, NH, OH (BMV only), WY", source: "NCSL", sourceUrl: "https://www.ncsl.org/elections-and-campaigns/voter-id" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FactsGrid() {
  const shouldReduceMotion = useReducedMotion();

  const reducedItem = {
    hidden: { opacity: 1 },
    show: { opacity: 1 },
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="font-serif text-3xl text-text mb-2">The Facts</h2>
      <p className="text-text-secondary mb-8">
        Numbers that show why proof-of-citizenship laws threaten eligible voters
        far more than they prevent fraud.
      </p>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={shouldReduceMotion ? undefined : container}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {facts.map((f) => (
          <motion.div
            key={f.stat}
            variants={shouldReduceMotion ? reducedItem : item}
            className="rounded-xl border border-border bg-surface-elevated p-6 text-center"
          >
            <p className="font-mono text-3xl font-bold text-accent mb-2">
              {f.stat}
            </p>
            <p className="text-text text-base mb-1">{f.label}</p>
            {f.sourceUrl ? (
              <a
                href={f.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-muted hover:text-accent transition-colors underline decoration-dotted underline-offset-2"
              >
                {f.sub}
              </a>
            ) : (
              <p className="font-mono text-xs text-text-muted">{f.sub}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

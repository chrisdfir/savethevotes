"use client";

import { motion, useReducedMotion } from "framer-motion";

const facts = [
  {
    stat: "~150M+",
    label: "Americans without a valid passport (estimate)",
    sub: "State Dept passport statistics (2025)",
    source: "U.S. State Dept.",
    sourceUrl:
      "https://travel.state.gov/content/travel/en/about-us/reports-and-statistics.html",
  },
  {
    stat: "~21M",
    label: "Adults without easy access to citizenship docs",
    sub: "Brennan Center / SSRS (2024)",
    sourceUrl:
      "https://www.brennancenter.org/our-work/analysis-opinion/213-million-american-citizens-voting-age-dont-have-ready-access",
  },
  {
    stat: "0.0001%",
    label: "Rate of suspected noncitizen voting",
    sub: "Brennan Center survey of 42 jurisdictions (2016)",
    sourceUrl:
      "https://www.brennancenter.org/our-work/research-reports/noncitizen-voting-missing-millions",
  },
  {
    stat: "31,000+",
    label: "Eligible citizens blocked in Kansas",
    sub: "Similar law tested 2013-2018",
    source: "Fish v. Kobach ruling",
    sourceUrl: "https://www.aclu.org/cases/fish-v-schwab-formerly-fish-v-kobach",
  },
  {
    stat: "84%",
    label: "of married women who change their surname",
    sub: "~69M may have name mismatch on birth cert",
    source: "Pew Research Center (2023)",
    sourceUrl:
      "https://www.pewresearch.org/short-reads/2023/09/07/about-eight-in-ten-women-in-opposite-sex-marriages-say-they-took-their-husbands-last-name/",
  },
  {
    stat: "~4",
    label: "States with active documentary proof-of-citizenship rules (estimate)",
    sub: "As of Feb 28, 2026: AZ, NH, OH (BMV only), WY",
    source: "NCSL",
    sourceUrl:
      "https://www.ncsl.org/elections-and-campaigns/legislative-approaches-to-ensuring-only-citizens-vote",
  },
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
      <p className="text-text-secondary mb-2">
        Numbers that show why proof-of-citizenship laws threaten eligible voters
        far more than they prevent fraud.
      </p>
      <p className="font-mono text-xs text-text-muted mb-8">
        Last verified: February 28, 2026
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

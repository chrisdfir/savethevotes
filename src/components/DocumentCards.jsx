"use client";

import { motion, useReducedMotion } from "framer-motion";
import { acceptableDocuments } from "@/data/documents";
import DocIcon from "@/components/ui/DocIcon";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  DocumentCards section                                              */
/* ------------------------------------------------------------------ */
export default function DocumentCards() {
  const shouldReduceMotion = useReducedMotion();

  const reducedCardVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  return (
    <section
      id="documents"
      className="scroll-target relative px-4 py-16 sm:px-6 md:py-24 max-w-6xl mx-auto"
    >
      {/* ---- Section header ---- */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text mb-4">
          What Documents Would Be Required?
        </h2>
        <p className="text-text-secondary text-lg leading-relaxed mb-4">
          Under the SAVE Act, voters would need to present documentary proof of
          U.S. citizenship when registering to vote. Only a narrow set of
          federal documents are accepted.
        </p>
        <p className="text-text-secondary leading-relaxed mb-4">
          In the latest House-passed 2026 package, Congress.gov summaries also
          describe additional voter-ID requirements for in-person voting.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Standard driver&rsquo;s licenses, REAL IDs, military IDs, and tribal
          IDs would{" "}
          <span className="text-danger font-semibold">not</span> qualify
          as proof of citizenship under this legislation.
        </p>
      </div>

      {/* ---- Cards grid ---- */}
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {acceptableDocuments.map((doc) => (
          <motion.article
            key={doc.name}
            variants={shouldReduceMotion ? reducedCardVariants : cardVariants}
            className="flex flex-col gap-3 rounded-xl border border-border bg-surface-elevated p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-start gap-3">
              <DocIcon type={doc.icon} />
              <h3 className="font-mono font-bold text-sm uppercase tracking-wide text-text leading-snug">
                {doc.name}
              </h3>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <span className="text-text-muted">
                <span className="font-semibold text-text-secondary">Cost:</span>{" "}
                {doc.cost}
              </span>
              <span className="text-text-muted">
                <span className="font-semibold text-text-secondary">Time:</span>{" "}
                {doc.time}
              </span>
            </div>

            <p className="text-text-secondary text-sm leading-relaxed flex-1">
              {doc.howToGet}
            </p>

            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-accent hover:text-accent-light text-sm font-medium mt-auto transition-colors"
            >
              Official Info
              <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.article>
        ))}
      </motion.div>

      {/* ---- Name-change alert ---- */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3 }}
        className="mt-12 rounded-xl border-2 border-danger/40 bg-danger/5 p-6 sm:p-8"
        role="note"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-danger-light mb-2">
          Important Note for Married / Name-Changed Voters
        </p>
        <p className="text-text-secondary leading-relaxed">
          Roughly <a href="https://www.pewresearch.org/short-reads/2023/09/07/about-eight-in-ten-women-in-opposite-sex-marriages-say-they-took-their-husbands-last-name/" target="_blank" rel="noopener noreferrer" className="text-danger-light hover:underline">84% of married women</a> in the U.S. change their surname. The
          SAVE Act does not explicitly mention marriage certificates as
          acceptable proof of citizenship. If your current legal name differs
          from the name on your birth certificate, a{" "}
          <strong className="text-text">U.S. passport in your current legal name</strong>{" "}
          may be the most reliable document to satisfy the requirement.
        </p>
      </motion.div>
    </section>
  );
}

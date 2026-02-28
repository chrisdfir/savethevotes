"use client";

import { motion, useReducedMotion } from "framer-motion";
import { acceptableDocuments } from "@/data/documents";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons keyed by document type                           */
/* ------------------------------------------------------------------ */
function DocIcon({ type, className = "w-8 h-8" }) {
  const icons = {
    passport: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <circle cx="12" cy="10" r="3" />
        <path d="M8 17h8" />
        <path d="M8 2v20" />
      </svg>
    ),
    birth: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="13" y2="17" />
      </svg>
    ),
    naturalization: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    citizenship: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    consular: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
      </svg>
    ),
  };

  return (
    <div className="text-accent" aria-hidden="true">
      {icons[type] ?? icons.birth}
    </div>
  );
}

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
      className="relative px-4 py-16 sm:px-6 md:py-24 max-w-6xl mx-auto"
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
          Roughly <a href="https://www.brennancenter.org/our-work/research-reports/challenge-obtaining-voter-identification" target="_blank" rel="noopener noreferrer" className="text-danger-light hover:underline">84% of married women</a> in the U.S. change their surname. The
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { checklistSteps } from "@/data/checklist";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function ActionChecklist() {
  const shouldReduceMotion = useReducedMotion();

  const reducedItemVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="font-serif text-3xl text-text mb-2">
        What You Can Do Right Now
      </h2>
      <p className="text-text-secondary mb-8">
        Whether or not the SAVE Act becomes law, having your documents in order
        protects your right to vote. Start today.
      </p>

      {/* Registration CTA */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        className="rounded-xl border-2 border-accent/40 bg-accent/5 p-6 sm:p-8 mb-10"
      >
        <h3 className="font-serif text-xl text-text mb-2">
          Check Your Voter Registration
        </h3>
        <p className="text-text-secondary mb-4">
          Before anything else, make sure your voter registration is active and
          your information is current. It only takes a minute.
        </p>
        <a
          href="https://vote.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-mono text-sm font-bold hover:bg-accent-dark transition-colors"
        >
          Check at Vote.gov
          <span className="sr-only">(opens in new tab)</span>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </motion.div>

      {/* Numbered checklist */}
      <motion.ol
        className="space-y-4"
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {checklistSteps.map((step, i) => (
          <motion.li
            key={step.title}
            variants={shouldReduceMotion ? reducedItemVariants : itemVariants}
            className="flex gap-4 rounded-xl border border-border bg-surface-elevated p-5"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold text-text mb-1">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
              {step.url && (
                <a
                  href={step.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:text-accent-light text-sm font-medium mt-2 transition-colors"
                >
                  {step.urlLabel}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

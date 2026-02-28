"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { specialSituations } from "@/data/situations";

/* Reuse DocIcon pattern from DocumentCards */
function SituationIcon({ type, className = "w-6 h-6" }) {
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
    <div className="text-accent flex-shrink-0" aria-hidden="true">
      {icons[type] ?? icons.birth}
    </div>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function SpecialSituations() {
  const [openId, setOpenId] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const reducedCardVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
  };

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="font-serif text-3xl text-text mb-2">
        Special Situations
      </h2>
      <p className="text-text-secondary mb-8">
        Some citizens face extra hurdles. Find guidance for your situation below.
      </p>

      <motion.div
        className="space-y-3"
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {specialSituations.map((situation) => {
          const isOpen = openId === situation.id;
          const panelId = `panel-${situation.id}`;
          const buttonId = `btn-${situation.id}`;

          return (
            <motion.div
              key={situation.id}
              variants={shouldReduceMotion ? reducedCardVariants : cardVariants}
              className="rounded-xl border border-border bg-surface-elevated overflow-hidden"
            >
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(situation.id)}
                className="w-full flex items-center gap-3 p-5 text-left hover:bg-accent/5 transition-colors"
              >
                <SituationIcon type={situation.icon} />
                <span className="flex-1 font-semibold text-text">
                  {situation.title}
                </span>
                <ChevronIcon open={isOpen} />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: "easeInOut" }
                    }
                  >
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-text-secondary text-sm leading-relaxed mb-3">
                        {situation.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        {situation.url && (
                          <a
                            href={situation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-accent hover:text-accent-light text-sm font-medium transition-colors"
                          >
                            {situation.urlLabel}
                            <span aria-hidden="true">&rarr;</span>
                          </a>
                        )}
                        {situation.phone && (
                          <a
                            href={`tel:${situation.phone.replace(/-/g, "")}`}
                            className="inline-flex items-center gap-1 text-text-secondary hover:text-accent text-sm font-medium transition-colors"
                          >
                            Call {situation.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

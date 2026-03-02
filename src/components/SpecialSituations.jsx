"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { specialSituations } from "@/data/situations";
import DocIcon from "@/components/ui/DocIcon";

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
    <section id="situations" className="scroll-target max-w-5xl mx-auto px-6 py-12">
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
                <DocIcon type={situation.icon} className="w-6 h-6" />
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

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { timelineEvents } from "@/data/timeline";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Timeline() {
  const shouldReduceMotion = useReducedMotion();

  const reducedItem = {
    hidden: { opacity: 1 },
    show: { opacity: 1 },
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="font-serif text-3xl text-text mb-2">
        Bill Status Timeline
      </h2>
      <p className="text-text-secondary mb-8">
        How the SAVE Act has progressed through Congress.
      </p>

      <motion.ol
        className="relative ml-4 border-l-2 border-accent/30 space-y-8 pl-8"
        variants={shouldReduceMotion ? undefined : container}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {timelineEvents.map((ev, i) => (
          <motion.li key={`${ev.date}-${i}`} variants={shouldReduceMotion ? reducedItem : item} className="relative">
            {/* Dot */}
            <span
              className={`absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 ${
                ev.done
                  ? "bg-accent border-accent"
                  : "bg-surface-elevated border-text-muted"
              }`}
            />
            <p
              className={`font-mono text-sm mb-1 ${
                ev.done ? "text-accent" : "text-text-muted"
              }`}
            >
              {ev.date}
            </p>
            <p className="text-text">
              {ev.event}
              {ev.sourceUrl && (
                <>
                  {" "}
                  <a
                    href={ev.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent text-xs font-mono transition-colors"
                    aria-label="Source"
                  >
                    [source]
                  </a>
                </>
              )}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

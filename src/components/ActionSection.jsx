"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ActionSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-serif text-3xl text-text mb-3">Take Action</h2>
        <p className="text-text-secondary max-w-2xl mx-auto mb-8">
          Regardless of your position on the SAVE Act, your senators need to
          hear from you. The bill&apos;s fate will be decided in the Senate.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.senate.gov/senators/senators-contact.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-accent/15 border border-accent/40 px-8 py-4 text-accent font-semibold text-lg hover:bg-accent/25 transition-colors"
          >
            Find Your Senators &rarr;
          </a>
          <a
            href="tel:+12022243121"
            className="inline-block rounded-lg bg-accent/15 border border-accent/40 px-8 py-4 text-accent font-semibold text-lg hover:bg-accent/25 transition-colors"
          >
            Capitol Switchboard: (202)&nbsp;224-3121
          </a>
        </div>
      </motion.div>
    </section>
  );
}

"use client";
import { motion, useReducedMotion } from "framer-motion";
import StatusBadge from "@/components/ui/StatusBadge";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
    },
  };

  const item = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      };

  return (
    <header className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent dark:from-accent/10" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto text-center px-6 py-16 md:py-24"
      >
        <motion.div
          variants={item}
          className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-4"
        >
          Citizen Preparedness Resource
        </motion.div>

        <motion.h1
          variants={item}
          className="font-serif text-[clamp(42px,7vw,72px)] font-normal leading-[1.05] text-text mb-5"
        >
          Save the Votes
        </motion.h1>

        <motion.p
          variants={item}
          className="text-[clamp(16px,2.5vw,20px)] leading-relaxed text-text-secondary max-w-xl mx-auto mb-7 font-light"
        >
          The SAVE Act could change how Americans register to vote. Whether or
          not it passes,{" "}
          <em className="text-text font-normal">be ready</em>. Find out exactly
          what documents you need and how to get them in your state.
        </motion.p>

        <motion.div
          variants={item}
          className="flex gap-3 justify-center flex-wrap"
        >
          <StatusBadge active={true} label="Passed House Feb 11, 2026" />
          <StatusBadge active={false} label="Senate vote pending" />
        </motion.div>
      </motion.div>
    </header>
  );
}

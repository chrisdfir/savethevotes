"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function ScrollToTop() {
  const isScrolled = useScrollPosition(400);
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.button
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" })}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-accent text-white
                     flex items-center justify-center shadow-lg shadow-accent/40
                     hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/50
                     transition-all duration-200 cursor-pointer z-50"
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { acceptableDocuments } from "@/data/documents";

function generateFaqs(stateName, state) {
  const faqs = [];

  // 1. POC question
  if (state.currentPocLaw && state.pocImplemented) {
    faqs.push({
      question: `Do I need proof of citizenship to register to vote in ${stateName}?`,
      answer: `Yes. ${stateName} currently has an active proof-of-citizenship requirement for voter registration. You will need to provide documentary proof of U.S. citizenship, such as a birth certificate, U.S. passport, or naturalization certificate, when registering to vote.${state.notes ? ` ${state.notes}` : ""}`,
    });
  } else if (state.currentPocLaw && !state.pocImplemented) {
    faqs.push({
      question: `Do I need proof of citizenship to register to vote in ${stateName}?`,
      answer: `${stateName} has a proof-of-citizenship law on the books, but it is not currently being enforced. You do not need to provide documentary proof of citizenship at this time, though this could change. It is still a good idea to have your documents ready.${state.notes ? ` ${state.notes}` : ""}`,
    });
  } else {
    faqs.push({
      question: `Do I need proof of citizenship to register to vote in ${stateName}?`,
      answer: `No. ${stateName} does not currently require documentary proof of citizenship to register to vote. However, if the federal SAVE Act passes, all states would be required to collect proof of citizenship for voter registration. Getting your documents in order now is recommended.`,
    });
  }

  // 2. Birth certificate cost
  faqs.push({
    question: `How much does a birth certificate cost in ${stateName}?`,
    answer: `A certified birth certificate in ${stateName} costs ${state.birthCertCost}. Processing typically takes ${state.birthCertTime}. You can order online through VitalChek or directly from the ${stateName} vital records office. Remember: you must order from the state where you were born, not where you currently live.`,
  });

  // 3. Voter ID
  faqs.push({
    question: `What voter ID do I need in ${stateName}?`,
    answer: `${stateName} requires ${state.voterIdType.toLowerCase()} for voting. Check with your local election office or visit the ${stateName} Secretary of State website for specific details on acceptable forms of identification.`,
  });

  // 4. Online registration
  faqs.push({
    question: `Can I register to vote online in ${stateName}?`,
    answer: state.onlineReg
      ? `Yes, ${stateName} offers online voter registration. Visit your state's election office website to register or update your registration. The registration deadline is ${state.registrationDeadline.toLowerCase()}.`
      : `No, ${stateName} does not currently offer online voter registration. You will need to register by mail or in person. The registration deadline is ${state.registrationDeadline.toLowerCase()}.`,
  });

  // 5. Accepted documents (only if POC law)
  if (state.currentPocLaw) {
    const docList = acceptableDocuments.map((d) => d.name).join("; ");
    faqs.push({
      question: `What documents count as proof of citizenship in ${stateName}?`,
      answer: `Documents generally accepted as proof of U.S. citizenship include: ${docList}. Requirements may vary, so check with the ${stateName} election office for the most current list of accepted documents.`,
    });
  }

  // 6. Registration deadline
  faqs.push({
    question: `What is the voter registration deadline in ${stateName}?`,
    answer: `The voter registration deadline in ${stateName} is ${state.registrationDeadline.toLowerCase()}. Make sure to register or update your registration well before this deadline to ensure you can vote.`,
  });

  return faqs;
}

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-alt transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="text-sm font-semibold text-text">{faq.question}</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 text-text-muted"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StateFAQ({ stateName, state }) {
  const faqs = generateFaqs(stateName, state);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="max-w-4xl mx-auto px-6 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h2 className="font-serif text-2xl text-text mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem key={faq.question} faq={faq} index={i} />
        ))}
      </div>
    </section>
  );
}

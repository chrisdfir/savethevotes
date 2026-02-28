"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { callingScript, emailTemplate } from "@/data/scripts";

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

function ExpandablePanel({ id, title, icon, children, isOpen, onToggle, shouldReduceMotion }) {
  const panelId = `action-panel-${id}`;
  const buttonId = `action-btn-${id}`;

  return (
    <div className="rounded-xl border border-border bg-surface-elevated overflow-hidden">
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-5 text-left hover:bg-accent/5 transition-colors"
      >
        <span className="text-accent" aria-hidden="true">{icon}</span>
        <span className="flex-1 font-semibold text-text">{title}</span>
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
            <div className="px-5 pb-5 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-mono text-sm font-bold hover:bg-accent-dark transition-colors"
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
          Copied!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
          Copy to Clipboard
        </>
      )}
    </button>
  );
}

export default function ActionSection() {
  const shouldReduceMotion = useReducedMotion();
  const [openPanel, setOpenPanel] = useState(null);

  const toggle = (id) => setOpenPanel((prev) => (prev === id ? null : id));

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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
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

      {/* Expandable script panels */}
      <div className="space-y-3 max-w-3xl mx-auto">
        <ExpandablePanel
          id="calling"
          title="Calling Tips & Script"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          }
          isOpen={openPanel === "calling"}
          onToggle={() => toggle("calling")}
          shouldReduceMotion={shouldReduceMotion}
        >
          <div className="space-y-4 text-sm text-text-secondary">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                Opening
              </p>
              <p className="bg-surface-alt border border-border rounded-lg p-3 italic">
                &ldquo;{callingScript.intro}&rdquo;
              </p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                Talking Points
              </p>
              <ul className="space-y-2">
                {callingScript.talkingPoints.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                Closing
              </p>
              <p className="bg-surface-alt border border-border rounded-lg p-3 italic">
                &ldquo;{callingScript.closing}&rdquo;
              </p>
            </div>
          </div>
        </ExpandablePanel>

        <ExpandablePanel
          id="email"
          title="Email Template"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          }
          isOpen={openPanel === "email"}
          onToggle={() => toggle("email")}
          shouldReduceMotion={shouldReduceMotion}
        >
          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                Subject Line
              </p>
              <p className="text-sm text-text font-medium">
                {emailTemplate.subject}
              </p>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                Email Body
              </p>
              <pre className="bg-surface-alt border border-border rounded-lg p-4 text-sm text-text-secondary whitespace-pre-wrap font-sans leading-relaxed overflow-x-auto">
                {emailTemplate.body}
              </pre>
            </div>

            <CopyButton text={`Subject: ${emailTemplate.subject}\n\n${emailTemplate.body}`} />
          </div>
        </ExpandablePanel>
      </div>
    </section>
  );
}

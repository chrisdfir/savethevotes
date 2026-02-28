"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import USMap from "@/components/USMap";

const tabs = [
  { id: "requirements", label: "Requirements" },
  { id: "birthcert", label: "Birth Certificate" },
  { id: "resources", label: "Resources" },
];

function getPocStatus(state) {
  if (state.currentPocLaw && state.pocImplemented) {
    return { label: "Yes — Active", color: "text-danger", bgColor: "bg-danger/10 border-danger/20" };
  }
  if (state.currentPocLaw && !state.pocImplemented) {
    return { label: "On books — Not enforced", color: "text-warning", bgColor: "bg-warning/10 border-warning/20" };
  }
  return { label: "No current requirement", color: "text-success", bgColor: "bg-success/10 border-success/20" };
}

function InfoBox({ label, value, icon }) {
  return (
    <div className="bg-surface-elevated border border-border rounded-xl p-4">
      <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1.5">
        {icon && <span className="mr-1.5">{icon}</span>}
        {label}
      </div>
      <div className="text-sm font-semibold text-text">{value}</div>
    </div>
  );
}

function RequirementsTab({ stateName, state }) {
  const poc = getPocStatus(state);

  return (
    <div className="space-y-8">
      {/* Info grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox label="Voter ID Requirement" value={state.voterIdType} />
        <InfoBox label="Online Registration" value={state.onlineReg ? "Available" : "Not available"} />
        <InfoBox label="Registration Deadline" value={state.registrationDeadline} />
        <InfoBox label="Proof of Citizenship Law" value={poc.label} />
      </div>

      {/* State notes */}
      {state.notes && (
        <div className={`rounded-xl border p-4 text-sm leading-relaxed ${
          state.currentPocLaw
            ? "bg-danger/5 border-danger/20 text-danger dark:text-danger-light"
            : "bg-success/5 border-success/20 text-success dark:text-success-light"
        }`}>
          <span className="font-bold font-mono text-xs uppercase tracking-wider block mb-1">
            Note
          </span>
          {state.notes}
        </div>
      )}

      {/* What to Do Now */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
        <h3 className="font-serif text-xl text-text mb-4">What to Do Now</h3>
        <ol className="space-y-3 text-sm text-text-secondary list-none">
          {[
            "Check if you have one of the accepted documents (passport, birth certificate, naturalization certificate)",
            "If your name has changed, get a passport in your current legal name",
            "Order your birth certificate now if you don't have one",
            "Verify your voter registration is current",
            "Keep originals safe — the SAVE Act requires originals, not photocopies",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function BirthCertTab({ stateName, state }) {
  return (
    <div className="space-y-8">
      {/* Cost & time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoBox label="Birth Certificate Cost" value={state.birthCertCost} />
        <InfoBox label="Processing Time" value={state.birthCertTime} />
      </div>

      {/* How to order */}
      <div className="bg-surface-elevated border border-border rounded-xl p-6">
        <h3 className="font-serif text-xl text-text mb-4">
          How to Order in {stateName}
        </h3>
        <div className="space-y-4 text-sm text-text-secondary">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-text mb-1">
              Online
            </h4>
            <p>
              Most states partner with{" "}
              <a
                href="https://www.vitalchek.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                VitalChek
                <span className="sr-only">(opens in new tab)</span>
              </a>{" "}
              for online orders. Visit your{" "}
              <a
                href={state.vitalRecordsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                state vital records office
                <span className="sr-only">(opens in new tab)</span>
              </a>{" "}
              for the official ordering portal.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-text mb-1">
              By Mail
            </h4>
            <p>
              Download the application form from your state vital records website, fill it out, and mail with payment and a copy of your ID.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-text mb-1">
              In Person
            </h4>
            <p>
              Visit your county clerk or state vital records office with valid ID and payment. Same-day or next-day service may be available.
            </p>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-sm text-text-secondary">
        <span className="font-bold font-mono text-xs uppercase tracking-wider text-accent block mb-1">
          Tip
        </span>
        You must order your birth certificate from the state where you were born, not the state where you currently live. If you were born in {stateName}, use the link above. If you were born elsewhere, find your birth state on our{" "}
        <Link href="/" className="text-accent hover:underline">
          home page
        </Link>.
      </div>

      {/* Vital records link */}
      <a
        href={state.vitalRecordsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-mono text-sm font-bold hover:bg-accent-dark transition-colors"
      >
        Visit {stateName} Vital Records Office
        <span className="sr-only">(opens in new tab)</span>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
      </a>
    </div>
  );
}

function ResourceCard({ href, title, description }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-surface-elevated border border-border rounded-xl p-4 hover:border-accent/40 hover:bg-accent/5 transition-colors group"
    >
      <h4 className="text-sm font-semibold text-text group-hover:text-accent transition-colors mb-1">
        {title}
        <span className="sr-only">(opens in new tab)</span>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline ml-1.5 opacity-50"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
      </h4>
      <p className="text-xs text-text-muted">{description}</p>
    </a>
  );
}

function ResourcesTab({ stateName, state }) {
  return (
    <div className="space-y-8">
      {/* State resources */}
      <div>
        <h3 className="font-serif text-xl text-text mb-4">
          {stateName} Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResourceCard
            href={state.electionOfficeUrl}
            title={`${stateName} Election Office`}
            description="Official state election information, polling locations, and voter registration status."
          />
          <ResourceCard
            href={state.vitalRecordsUrl}
            title={`${stateName} Vital Records`}
            description="Order birth certificates, marriage records, and other vital documents."
          />
        </div>
      </div>

      {/* Federal resources */}
      <div>
        <h3 className="font-serif text-xl text-text mb-4">
          Federal Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResourceCard
            href="https://www.usa.gov/birth-certificate"
            title="USA.gov Birth Certificates"
            description="Federal guide to ordering birth certificates from any state."
          />
          <ResourceCard
            href="https://travel.state.gov/content/travel/en/passports.html"
            title="U.S. Passports"
            description="Apply for or renew a U.S. passport — accepted as proof of citizenship everywhere."
          />
          <ResourceCard
            href="https://vote.gov/"
            title="Vote.gov"
            description="Register to vote or check your registration status through the official federal portal."
          />
          <ResourceCard
            href="https://www.voteriders.org/"
            title="VoteRiders"
            description="Free help getting the voter ID you need. Call 866-ID-2-VOTE."
          />
        </div>
      </div>

      {/* Take Action */}
      <div className="bg-surface-elevated border border-border rounded-xl p-6">
        <h3 className="font-serif text-xl text-text mb-3">
          Contact Your Senators
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Let your senators know how you feel about the SAVE Act and voter access in {stateName}.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.senate.gov/senators/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white font-mono text-sm font-bold hover:bg-accent-dark transition-colors"
          >
            Find Your Senators
            <span className="sr-only">(opens in new tab)</span>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-alt text-text-secondary font-mono text-sm border border-border">
            Capitol Switchboard: (202) 224-3121
          </span>
        </div>
      </div>
    </div>
  );
}

const tabVariants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function StateGuide({ stateName, state, slug }) {
  const [activeTab, setActiveTab] = useState("requirements");
  const shouldReduceMotion = useReducedMotion();
  const poc = getPocStatus(state);

  const handleTabKeyDown = (e) => {
    const tabIds = tabs.map((t) => t.id);
    const currentIndex = tabIds.indexOf(activeTab);
    let newIndex = currentIndex;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      newIndex = (currentIndex + 1) % tabIds.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      newIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
    } else {
      return;
    }

    setActiveTab(tabIds[newIndex]);
    document.getElementById(tabIds[newIndex])?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-text-muted">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text font-medium">{stateName}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="font-mono text-sm font-bold tracking-widest text-accent uppercase mb-2">
          {state.abbr}
        </div>
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] leading-tight text-text mb-4">
          {stateName}
        </h1>
        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${poc.bgColor} ${poc.color}`}>
            {state.currentPocLaw && state.pocImplemented && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-danger" />
              </span>
            )}
            POC: {poc.label}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold bg-surface-elevated text-text-muted border border-border">
            ID: {state.voterIdType}
          </span>
        </div>
      </header>

      {/* Mini map */}
      <div className="max-w-md mx-auto mb-10">
        <USMap highlight={stateName} />
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex border-b border-border gap-1" role="tablist" aria-label="State guide sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={handleTabKeyDown}
              className={`relative px-4 py-2.5 text-sm font-mono font-bold transition-colors rounded-t-lg ${
                activeTab === tab.id
                  ? "text-accent"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="pt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={activeTab}
              variants={shouldReduceMotion ? undefined : tabVariants}
              initial={shouldReduceMotion ? false : "enter"}
              animate="center"
              exit={shouldReduceMotion ? undefined : "exit"}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "requirements" && (
                <RequirementsTab stateName={stateName} state={state} />
              )}
              {activeTab === "birthcert" && (
                <BirthCertTab stateName={stateName} state={state} />
              )}
              {activeTab === "resources" && (
                <ResourcesTab stateName={stateName} state={state} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
import { stateData } from "@/data/states";
import { stateToSlug } from "@/data/stateSlugs";

const allStates = Object.keys(stateData);

export default function StateSelector() {
  const [query, setQuery] = useState("");

  const filtered = allStates.filter((name) => {
    const q = query.toLowerCase();
    return (
      name.toLowerCase().includes(q) ||
      stateData[name].abbr.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-5">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted pointer-events-none"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <input
          type="text"
          placeholder="Search by state name or abbreviation..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-surface-alt pl-11 pr-4 py-3.5
                     text-text font-mono text-sm placeholder:text-text-muted
                     focus:border-accent focus:ring-2 focus:ring-accent/10 focus:outline-none
                     transition-colors"
          aria-label="Search states"
        />
      </div>

      {/* State grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {filtered.map((name) => {
          const state = stateData[name];
          return (
            <Link
              key={name}
              href={`/${stateToSlug(name)}`}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm
                transition-all duration-150 hover:border-accent hover:bg-accent/5
                ${
                  state.currentPocLaw
                    ? "border-l-2 border-l-danger border-t-border border-r-border border-b-border bg-danger/5 dark:bg-danger/10"
                    : "border-border bg-surface-alt"
                }`}
            >
              <span className="font-mono font-bold text-accent text-xs">
                {state.abbr}
              </span>
              <span className="text-text-secondary group-hover:text-text truncate text-xs">
                {name}
              </span>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-text-muted text-center py-8 font-mono text-sm">
          No states match &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}

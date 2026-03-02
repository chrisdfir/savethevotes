"use client";

import Link from "next/link";

export default function StateError({ reset }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="font-serif text-5xl text-text mb-4">Something Went Wrong</h1>
      <p className="text-text-secondary mb-8">
        We couldn&apos;t load this state guide. Please try again or go back to the homepage.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-mono text-sm font-bold hover:bg-accent-dark transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-text font-mono text-sm font-bold hover:bg-surface-alt transition-colors"
        >
          &larr; All States
        </Link>
      </div>
    </div>
  );
}

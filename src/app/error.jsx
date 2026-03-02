"use client";

export default function Error({ reset }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="font-serif text-5xl text-text mb-4">Something Went Wrong</h1>
      <p className="text-text-secondary mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-mono text-sm font-bold hover:bg-accent-dark transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

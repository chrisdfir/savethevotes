import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center">
        <p className="font-mono text-xs text-text-muted leading-relaxed max-w-3xl mx-auto">
          <Link href="/" className="text-accent hover:text-accent-light transition-colors font-bold">
            Save the Votes
          </Link>{" "}
          is a nonpartisan informational resource. Data sourced from state vital records offices,
          Ballotpedia, Congress.gov, Brennan Center for Justice, and Bipartisan Policy Center.
          Last updated February 27, 2026. This resource does not constitute legal advice.
        </p>
        <p className="mt-3">
          <Link href="/privacy" className="font-mono text-xs text-text-muted hover:text-accent transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}

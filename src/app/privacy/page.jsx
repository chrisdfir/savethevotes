export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Save the Votes — how we handle your data and use analytics.",
  alternates: {
    canonical: "https://savethevotes.org/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl sm:text-4xl text-text mb-2">
        Privacy Policy
      </h1>
      <p className="text-text-muted font-mono text-xs mb-8">
        Last updated: February 27, 2026
      </p>

      <div className="space-y-8 text-text-secondary text-sm leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-text mb-3">Overview</h2>
          <p>
            Save the Votes is a nonpartisan informational resource. We are
            committed to protecting your privacy. This policy explains what
            data we collect, how we use it, and your choices.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">
            What We Collect
          </h2>
          <p className="mb-3">
            We use{" "}
            <a
              href="https://support.google.com/analytics/answer/11593727"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Google Analytics 4
            </a>{" "}
            to understand how visitors use this site. Google Analytics
            collects:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Pages visited and time spent on each page</li>
            <li>Referring website or search engine</li>
            <li>General geographic region (country/state level, not precise location)</li>
            <li>Device type, browser, and screen size</li>
            <li>Interactions such as clicks on external links</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">
            What We Do Not Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not collect your name, email address, or any personal contact information</li>
            <li>We do not use advertising cookies or retargeting</li>
            <li>We do not sell or share data with third parties for marketing</li>
            <li>We do not require you to create an account or log in</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">Cookies</h2>
          <p>
            Google Analytics uses first-party cookies to distinguish unique
            visitors and throttle request rates. These cookies do not
            identify you personally. You can opt out by installing the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>{" "}
            or by disabling cookies in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">
            Third-Party Links
          </h2>
          <p>
            This site links to government websites (vote.gov, state.gov,
            usa.gov, senate.gov, uscis.gov), nonprofit organizations
            (VoteRiders), and other external resources. These sites have
            their own privacy policies, and we are not responsible for their
            practices.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">Hosting</h2>
          <p>
            This site is hosted on{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Vercel
            </a>
            , which may collect standard server logs (IP address, request
            timestamps). See Vercel&apos;s privacy policy for details.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">Changes</h2>
          <p>
            We may update this policy as needed. Changes will be reflected
            in the &ldquo;Last updated&rdquo; date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">Contact</h2>
          <p>
            If you have questions about this privacy policy, you can reach
            us through the{" "}
            <a
              href="https://github.com/chrisdfir/savethevotes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              project&apos;s GitHub repository
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

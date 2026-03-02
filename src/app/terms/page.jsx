export const metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for Save the Votes. This nonpartisan resource provides voter registration information for educational purposes only and does not constitute legal advice.",
  alternates: {
    canonical: "https://savethevotes.org/terms",
  },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl sm:text-4xl text-text mb-2">
        Terms of Use
      </h1>
      <p className="text-text-muted font-mono text-xs mb-8">
        Last updated: March 2, 2026
      </p>

      <div className="space-y-8 text-text-secondary text-sm leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-text mb-3">Purpose</h2>
          <p>
            Save the Votes is a nonpartisan informational resource designed to
            help U.S. citizens understand voter registration requirements and
            prepare the documents they may need to vote. The site aggregates
            publicly available information from government sources and presents
            it in an accessible format.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">Not Legal Advice</h2>
          <p>
            The information on this site is provided for educational and
            informational purposes only. It does not constitute legal advice.
            Election laws and requirements change frequently. Always verify
            current requirements with your state or local election office before
            relying on any information presented here.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">Accuracy</h2>
          <p>
            We make reasonable efforts to keep information current and accurate,
            sourcing data from official government websites, the National
            Conference of State Legislatures, Congress.gov, and other primary
            sources. However, we cannot guarantee that all information is
            complete, current, or error-free. State laws, fees, processing
            times, and deadlines are subject to change without notice.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">External Links</h2>
          <p>
            This site contains links to external government websites, nonprofit
            organizations, and other third-party resources. We are not
            responsible for the content, accuracy, or availability of external
            sites. Inclusion of a link does not imply endorsement.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">
            Nonpartisan Policy
          </h2>
          <p>
            Save the Votes does not endorse, oppose, or advocate for or against
            any candidate, political party, or specific legislative outcome. The
            site presents factual information about proposed and existing
            legislation to help citizens make informed decisions and prepare
            accordingly.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">
            Intellectual Property
          </h2>
          <p>
            Original content on this site (design, text, and code) is made
            available under open-source principles. Government data cited on
            this site is public domain. Source attributions are provided
            throughout the site for all factual claims.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">
            Limitation of Liability
          </h2>
          <p>
            Save the Votes and its contributors shall not be liable for any
            direct, indirect, incidental, or consequential damages arising from
            the use of or inability to use this site or reliance on any
            information provided. Use this site at your own discretion.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">Changes</h2>
          <p>
            We may update these terms as needed. Changes will be reflected in
            the &ldquo;Last updated&rdquo; date at the top of this page.
            Continued use of the site constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-text mb-3">Contact</h2>
          <p>
            Questions about these terms can be directed to{" "}
            <a
              href="mailto:info@savethevotes.org"
              className="text-accent hover:underline"
            >
              info@savethevotes.org
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

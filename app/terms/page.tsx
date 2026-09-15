import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions that govern your use of G.E.A.R. and purchases made on our site.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container-content max-w-2xl py-12">
      <h1 className="font-display text-3xl">Terms of Service</h1>
      <p className="mt-4 text-sm text-ink/50">Last updated: September 2026</p>

      <div className="mt-8 space-y-8 text-ink/70">
        <section>
          <h2 className="font-display text-xl text-ink">Use of Site</h2>
          <p className="mt-2">
            By using this site, you agree to use it only for lawful purposes
            and in a way that does not infringe the rights of, or restrict or
            inhibit the use of, this site by anyone else.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Products &amp; Pricing</h2>
          <p className="mt-2">
            We make every effort to display product colors, descriptions, and
            pricing accurately. We reserve the right to correct pricing or
            product errors, limit order quantities, and update or discontinue
            products at any time without notice.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Orders &amp; Payment</h2>
          <p className="mt-2">
            All orders are subject to acceptance and availability. Payment is
            processed securely at checkout. We reserve the right to refuse or
            cancel any order for reasons including suspected fraud or
            inventory errors.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Shipping &amp; Returns</h2>
          <p className="mt-2">
            Shipping timelines and our return policy are detailed on our{" "}
            <a href="/shipping-returns" className="underline hover:text-ink">
              Shipping &amp; Returns
            </a>{" "}
            page.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Intellectual Property</h2>
          <p className="mt-2">
            All designs, graphics, logos, and content on this site are the
            property of G.E.A.R. and may not be reproduced or used without
            written permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Limitation of Liability</h2>
          <p className="mt-2">
            G.E.A.R. is not liable for any indirect, incidental, or
            consequential damages arising from your use of this site or the
            products purchased through it, to the extent permitted by law.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Contact Us</h2>
          <p className="mt-2">
            Questions about these terms can be sent through our{" "}
            <a href="/contact" className="underline hover:text-ink">
              Contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

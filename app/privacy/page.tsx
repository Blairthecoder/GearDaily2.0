import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How G.E.A.R. collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container-content max-w-2xl py-12">
      <h1 className="font-display text-3xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-ink/50">Last updated: September 2026</p>

      <div className="mt-8 space-y-8 text-ink/70">
        <section>
          <h2 className="font-display text-xl text-ink">Information We Collect</h2>
          <p className="mt-2">
            When you browse our site, place an order, or contact us, we may collect
            your name, email address, shipping and billing address, phone number,
            and payment details. We also collect basic device and usage data
            (such as pages viewed and browser type) to help us improve the site.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">How We Use Your Information</h2>
          <p className="mt-2">
            We use this information to process and fulfill orders, communicate
            with you about your purchase, respond to inquiries, and improve our
            products and site experience. We do not sell your personal
            information to third parties.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Third-Party Services</h2>
          <p className="mt-2">
            We use trusted third-party providers — including our e-commerce and
            payment platform, and shipping carriers — to operate our store.
            These providers only receive the information necessary to perform
            their services and are bound by their own privacy and security
            obligations.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Cookies</h2>
          <p className="mt-2">
            We use cookies to keep items in your cart, remember your
            preferences, and understand how visitors use our site. You can
            disable cookies in your browser settings, though some site features
            may not work as intended.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Your Rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your
            personal information at any time by contacting us at the email
            address below.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl text-ink">Contact Us</h2>
          <p className="mt-2">
            Questions about this policy can be sent through our{" "}
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

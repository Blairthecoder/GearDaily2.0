import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the G.E.A.R. team about an order, product question, or partnership.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-content max-w-xl py-12">
      <h1 className="font-display text-3xl">Contact Us</h1>
      <p className="mt-4 text-ink/70">
        Questions about an order or our products? Reach out and we&apos;ll get
        back to you.
      </p>
      <form className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input id="name" name="name" required className="mt-1 w-full border border-line px-4 py-3" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required className="mt-1 w-full border border-line px-4 py-3" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea id="message" name="message" rows={5} required className="mt-1 w-full border border-line px-4 py-3" />
        </div>
        <button type="submit" className="bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-rust">
          Send Message
        </button>
      </form>
    </div>
  );
}

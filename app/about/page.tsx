import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "G.E.A.R. — Get Edified And Refreshed. Faith-driven apparel rooted in Scripture, designed to encourage and start conversations.",
};

export default function AboutPage() {
  return (
    <div className="container-content max-w-3xl py-16">
      <h1 className="font-display text-4xl">Get Edified And Refreshed</h1>
      <p className="mt-6 text-lg text-ink/70">
        G.E.A.R. is a faith-driven Christian lifestyle apparel brand. Every
        design turns Scripture, biblical principles, and spiritual identity
        into wearable statements — pieces meant to encourage, strengthen, and
        start real conversations about faith.
      </p>
      <p className="mt-4 text-lg text-ink/70">
        We build every piece around a message first, then find the design
        language to carry it. The result is clothing you can wear without
        having to explain it — and clothing you&apos;re glad to explain when
        someone asks.
      </p>
      <Link href="/shop" className="mt-8 inline-block underline text-sm">
        Shop the collection
      </Link>
    </div>
  );
}

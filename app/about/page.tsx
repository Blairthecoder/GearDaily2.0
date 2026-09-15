import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "G.E.A.R.: Get Edified And Refreshed. Faith-driven Christian apparel rooted in Scripture, designed to encourage, edify, and strengthen the spirit.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-content max-w-3xl py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About G.E.A.R.",
          url: "/about",
        }}
      />
      <p className="eyebrow">Our Story</p>
      <h1 className="mt-2 font-display text-4xl">Get Edified And Refreshed</h1>
      <p className="mt-6 text-lg text-ink/70">
        G.E.A.R. is clothing with a purpose. Every design exists to encourage,
        edify, and strengthen the spirit, not as a slogan, but as the actual
        reason the brand exists.
      </p>
      <p className="mt-4 text-lg text-ink/70">
        We build every piece around a message first, then find the design
        language to carry it. The result is clothing you can wear without
        having to explain it, and clothing you&apos;re glad to explain when
        someone asks.
      </p>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-display text-2xl">Why We Exist</h2>
        <p className="mt-4 text-lg text-ink/70">
          G.E.A.R. is meant to be a catalyst: something that builds up
          self-worth and pride in oneself, develops upright character, and
          spurs spiritual growth. We believe what you wear can be a quiet,
          daily reminder of who you are and whose you are, worn by people who
          want their faith to be lived out loud without needing to say a
          word.
        </p>
      </section>

      <section className="mt-12 border-y border-line bg-canvas px-6 py-10 sm:px-10">
        <p className="font-display text-xl leading-relaxed text-ink">
          &ldquo;Finally, be strong in the Lord and in his mighty power. Put
          on the full armor of God, so that you can take your stand against
          the devil&apos;s schemes.&rdquo;
        </p>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-ink/60">
          Ephesians 6:10-11
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-display text-2xl">How We Design</h2>
        <p className="mt-4 text-lg text-ink/70">
          Every G.E.A.R. piece starts with Scripture, not a mood board. We
          study a passage, sit with what it means, and let that meaning
          decide the design, down to the smallest detail, hidden word, or
          color choice. Nothing on the shirt is there just to look good; it&apos;s
          there because it says something.
        </p>
        <p className="mt-4 text-lg text-ink/70">
          We write down the full story behind every design: the Scripture,
          the symbolism, and the reasoning, in{" "}
          <Link href="/behind-the-design" className="underline hover:text-ink">
            Behind the Design
          </Link>
          , so the meaning is never lost between the concept and the closet.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/shop" className="btn-solid">
          Shop the Collection
        </Link>
        <Link href="/behind-the-design" className="btn-outline">
          Read the Design Stories
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = { title: "FAQ" };

const FAQS = [
  {
    q: "What sizes do you carry?",
    a: "Most items run true to size in S–3XL. Check the size guide on each product page for exact measurements.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders typically ship within 3-5 business days. See Shipping & Returns for full details.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery on unworn, unwashed items. See Shipping & Returns for details.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-content max-w-2xl py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <h1 className="font-display text-3xl">Frequently Asked Questions</h1>
      <dl className="mt-8 space-y-6">
        {FAQS.map((item) => (
          <div key={item.q}>
            <dt className="font-medium">{item.q}</dt>
            <dd className="mt-1 text-ink/70">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

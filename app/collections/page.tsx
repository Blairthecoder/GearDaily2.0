import type { Metadata } from "next";
import Link from "next/link";
import { SHOP_BY_MESSAGE } from "@/types/wix";

export const metadata: Metadata = {
  title: "Shop by Message",
  description: "Find the message that speaks to where you are: strength, peace, freedom, trust, love, and identity.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsIndexPage() {
  return (
    <div className="container-content py-12">
      <h1 className="font-display text-3xl">Shop by Message</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {SHOP_BY_MESSAGE.map((item) => (
          <Link
            key={item.slug}
            href={`/collections/${item.slug}`}
            className="border border-line p-8 text-center font-display text-xl hover:border-ink hover:bg-canvas"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { SHOP_BY_MESSAGE } from "@/types/wix";

export function ShopByMessage() {
  return (
    <section className="container-content py-16">
      <h2 className="font-display text-2xl">Shop by Message</h2>
      <p className="mt-1 max-w-xl text-ink/70">
        Every design carries a message. Find the one that speaks to where you are.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SHOP_BY_MESSAGE.map((item) => (
          <Link
            key={item.slug}
            href={`/collections/${item.slug}`}
            className="border border-line px-4 py-6 text-center font-display text-lg transition-colors hover:border-ink hover:bg-canvas"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import { SHOP_BY_MESSAGE } from "@/types/wix";

export function ShopByMessage() {
  return (
    <section className="container-content py-16">
      <p className="eyebrow text-center">Welcome to</p>
      <h2 className="text-center font-display text-2xl">Shop by Message</h2>
      <p className="mx-auto mt-1 max-w-xl text-center text-ink/70">
        Every design carries a message. Find the one that speaks to where you are.
      </p>
      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
        {SHOP_BY_MESSAGE.map((item) => (
          <Link
            key={item.slug}
            href={`/collections/${item.slug}`}
            className="border border-line px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:border-gold hover:text-gold"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

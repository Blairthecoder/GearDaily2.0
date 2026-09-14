import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { SHOP_BY_MESSAGE } from "@/types/wix";
import type { WixProduct } from "@/types/wix";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the full G.E.A.R. collection — faith-driven apparel built around Scripture and meaning.",
};

export default async function ShopPage() {
  let products: WixProduct[] = [];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }

  return (
    <div className="container-content py-12">
      <p className="eyebrow">Our Collections</p>
      <h1 className="font-display text-3xl">Shop All</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-8">
          <div>
            <p className="border-b border-line pb-3 text-sm font-semibold uppercase tracking-wide">
              Shop by Message
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {SHOP_BY_MESSAGE.map((item) => (
                <li key={item.slug}>
                  <Link href={`/collections/${item.slug}`} className="text-ink/70 hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="border-b border-line pb-3 text-sm font-semibold uppercase tracking-wide">
              Shop by Fit
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/men" className="text-ink/70 hover:text-gold">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/women" className="text-ink/70 hover:text-gold">
                  Women
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between border-b border-line pb-4 text-sm">
            <p className="text-ink/60">{products.length} products</p>
          </div>
          <div className="mt-8">
            <ProductGrid
              products={products}
              emptyMessage="Unable to load products right now. Check the Wix Headless connection."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

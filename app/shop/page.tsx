import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import {
  filterProductsByCategory,
  parseProductCategory,
  PRODUCT_CATEGORIES,
} from "@/lib/catalog/product-categories";
import type { WixProduct } from "@/types/wix";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the full G.E.A.R. collection — faith-driven apparel built around Scripture and meaning.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: requestedCategory } = await searchParams;
  const category = parseProductCategory(requestedCategory);
  let products: WixProduct[] = [];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }
  const filteredProducts = filterProductsByCategory(products, category);

  return (
    <div className="container-content py-12">
      <p className="eyebrow">Our Collections</p>
      <h1 className="font-display text-3xl">Shop All</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="space-y-8">
          <div>
            <p className="border-b border-line pb-3 text-sm font-semibold uppercase tracking-wide">
              Category
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {PRODUCT_CATEGORIES.map((item) => (
                <li key={item.value}>
                  <Link
                    href={item.value === "all" ? "/shop" : `/shop?category=${item.value}`}
                    aria-current={category === item.value ? "page" : undefined}
                    className={
                      category === item.value
                        ? "font-semibold text-gold"
                        : "text-ink/70 hover:text-gold"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between border-b border-line pb-4 text-sm">
            <p className="text-ink/60">
              {filteredProducts.length} {category === "all" ? "products" : `${category} products`}
            </p>
          </div>
          <div className="mt-8">
            <ProductGrid
              products={filteredProducts}
              emptyMessage="Unable to load products right now. Check the Wix Headless connection."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

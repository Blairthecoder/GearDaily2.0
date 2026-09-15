import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import {
  parseProductCategory,
  parseProductSort,
  PRODUCT_CATEGORIES,
  PRODUCT_SORTS,
  queryProducts,
} from "@/lib/catalog/product-categories";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/jsonld";
import type { WixProduct } from "@/types/wix";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the full G.E.A.R. collection, faith-driven apparel built around Scripture and meaning.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}) {
  const {
    category: requestedCategory,
    q: requestedQuery,
    sort: requestedSort,
  } = await searchParams;
  const category = parseProductCategory(requestedCategory);
  const query = requestedQuery?.trim() ?? "";
  const sort = parseProductSort(requestedSort);
  let products: WixProduct[] = [];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }
  const filteredProducts = queryProducts(products, category, query, sort);

  function categoryHref(value: string) {
    const params = new URLSearchParams();
    if (value !== "all") params.set("category", value);
    if (query) params.set("q", query);
    if (sort !== "featured") params.set("sort", sort);
    const search = params.toString();
    return search ? `/shop?${search}` : "/shop";
  }

  return (
    <div className="container-content py-12">
      <JsonLd data={collectionPageJsonLd("Shop G.E.A.R.", "/shop", filteredProducts)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Shop", url: "/shop" }])} />
      <p className="eyebrow">Our Collections</p>
      <h1 className="font-display text-3xl">Shop Faith-Driven Apparel</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Browse Scripture-rooted tops, hats, and bottoms created to carry meaning into everyday life.
      </p>

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
                    href={categoryHref(item.value)}
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
          <form className="grid gap-3 border-b border-line pb-5 sm:grid-cols-[1fr_auto_auto]">
            {category !== "all" && <input type="hidden" name="category" value={category} />}
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <input
              id="shop-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search products"
              className="border border-line bg-paper px-3 py-2 text-sm"
            />
            <label htmlFor="shop-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="shop-sort"
              name="sort"
              defaultValue={sort}
              className="border border-line bg-paper px-3 py-2 text-sm"
            >
              {PRODUCT_SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-solid px-5 py-2">
              Apply
            </button>
          </form>

          <div className="flex items-center justify-between border-b border-line py-4 text-sm">
            <p className="text-ink/60">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </p>
            {(query || category !== "all" || sort !== "featured") && (
              <Link href="/shop" className="text-ink/60 underline hover:text-ink">
                Clear filters
              </Link>
            )}
          </div>
          <div className="mt-8">
            <ProductGrid
              products={filteredProducts}
              emptyMessage={
                query
                  ? `No products match “${query}”.`
                  : "No products match these filters."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

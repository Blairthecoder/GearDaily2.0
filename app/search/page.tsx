import type { Metadata } from "next";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import type { WixProduct } from "@/types/wix";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  let products: WixProduct[] = [];

  if (query) {
    try {
      const all = await getAllProducts(100);
      products = all.filter((product) =>
        product.name?.toLowerCase().includes(query.toLowerCase())
      );
    } catch {
      products = [];
    }
  }

  return (
    <div className="container-content py-12">
      <form className="max-w-lg">
        <label htmlFor="q" className="sr-only">
          Search products
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search designs, messages, products..."
          className="w-full border border-line px-4 py-3"
        />
      </form>

      <div className="mt-10">
        {query ? (
          <ProductGrid
            products={products}
            emptyMessage={`No results for "${query}".`}
          />
        ) : (
          <p className="text-ink/60">Search for a product, message, or design.</p>
        )}
      </div>
    </div>
  );
}

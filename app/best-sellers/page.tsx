import type { Metadata } from "next";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import type { WixProduct } from "@/types/wix";

export const metadata: Metadata = {
  title: "Best Sellers",
  description: "The most-loved designs from G.E.A.R.",
};

export default async function BestSellersPage() {
  let products: WixProduct[] = [];
  try {
    // TODO: sort by Wix sales data once exposed via the Stores API.
    products = await getAllProducts();
  } catch {
    products = [];
  }

  return (
    <div className="container-content py-12">
      <h1 className="font-display text-3xl">Best Sellers</h1>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

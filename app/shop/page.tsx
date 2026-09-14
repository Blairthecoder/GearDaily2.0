import type { Metadata } from "next";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
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
      <h1 className="font-display text-3xl">Shop All</h1>
      <div className="mt-8">
        <ProductGrid
          products={products}
          emptyMessage="Unable to load products right now. Check the Wix Headless connection."
        />
      </div>
    </div>
  );
}

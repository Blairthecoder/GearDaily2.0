import type { Metadata } from "next";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import type { WixProduct } from "@/types/wix";

export const metadata: Metadata = {
  title: "Shop Men",
  description: "Faith-driven apparel for men — Scripture-inspired tees, hoodies, and more.",
};

export default async function MenPage() {
  let products: WixProduct[] = [];
  try {
    // TODO: filter by the Wix "Men" collection once mapped in the store.
    products = await getAllProducts();
  } catch {
    products = [];
  }

  return (
    <div className="container-content py-12">
      <h1 className="font-display text-3xl">Shop Men</h1>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

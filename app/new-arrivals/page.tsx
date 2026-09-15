import type { Metadata } from "next";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import type { WixProduct } from "@/types/wix";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The newest faith-driven designs from G.E.A.R.",
  alternates: { canonical: "/new-arrivals" },
};

export default async function NewArrivalsPage() {
  let products: WixProduct[] = [];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }

  return (
    <div className="container-content py-12">
      <h1 className="font-display text-3xl">New Arrivals</h1>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

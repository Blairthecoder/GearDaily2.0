import { ProductCard } from "@/components/product/ProductCard";
import type { WixProduct } from "@/types/wix";

export function ProductGrid({
  products,
  emptyMessage = "No products found.",
}: {
  products: WixProduct[];
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-ink/60">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}

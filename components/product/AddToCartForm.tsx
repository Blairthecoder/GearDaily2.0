"use client";

import { useState, useTransition } from "react";
import { addToCart } from "@/lib/wix/cart";
import { useCart } from "@/lib/cart-context";
import type { WixProduct } from "@/types/wix";

export function AddToCartForm({ product }: { product: WixProduct }) {
  const { refreshCart, openDrawer } = useCart();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const inStock = product.stock?.inStock !== false;

  function handleAddToCart() {
    if (!product._id) return;
    setError(null);
    startTransition(async () => {
      try {
        await addToCart(product._id!, 1);
        await refreshCart();
        openDrawer();
      } catch {
        setError("Couldn't add this item to your cart. Please try again.");
      }
    });
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!inStock || isPending}
        className="w-full bg-ink py-4 text-sm font-medium text-paper hover:bg-rust disabled:cursor-not-allowed disabled:bg-ink/30"
      >
        {!inStock ? "Out of Stock" : isPending ? "Adding..." : "Add to Cart"}
      </button>
      {error && <p className="mt-2 text-sm text-rust">{error}</p>}
    </div>
  );
}

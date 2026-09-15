"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/wix/cart";
import { useCart } from "@/lib/cart-context";
import type { WixProduct } from "@/types/wix";

export function AddToCartForm({ product }: { product: WixProduct }) {
  const { refreshCart, replaceCart, openDrawer } = useCart();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const inStock =
    product.stock?.inStock !== false && product.stock?.inventoryStatus !== "OUT_OF_STOCK";
  const options = (product.productOptions ?? []).filter(
    (option) => option.name && option.choices?.some((choice) => choice.visible !== false)
  );
  const allOptionsSelected = options.every((option) => selectedOptions[option.name!]);

  function handleAddToCart() {
    if (!product._id) return;
    const selectedVariant = product.manageVariants
      ? product.variants?.find(
          (variant) =>
            Object.entries(selectedOptions).every(
              ([name, value]) => variant.choices?.[name] === value
            ) &&
            variant.variant?.visible !== false &&
            variant.stock?.inStock !== false
        )
      : undefined;

    if (product.manageVariants && !selectedVariant?._id) {
      setError("That option combination is unavailable. Please choose another.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const result = await addToCart(
          product._id!,
          quantity,
          options.length > 0 ? selectedOptions : undefined,
          selectedVariant?._id
        );
        if (result.cart) replaceCart(result.cart);
        else await refreshCart();
        openDrawer();
      } catch {
        setError("Couldn't add this item to your cart. Please try again.");
      }
    });
  }

  return (
    <div className="mt-6 space-y-5">
      {options.map((option) => {
        const name = option.name!;
        const isSize = name.toLowerCase().includes("size");
        return (
          <div key={name}>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor={`option-${name}`} className="text-sm font-semibold">
                {name}
              </label>
              {isSize && (
                <Link href="/shipping-returns#size-guide" className="text-xs underline">
                  Size guide
                </Link>
              )}
            </div>
            <select
              id={`option-${name}`}
              value={selectedOptions[name] ?? ""}
              onChange={(event) =>
                setSelectedOptions((current) => ({ ...current, [name]: event.target.value }))
              }
              className="w-full border border-line bg-paper px-3 py-3 text-sm"
              required
            >
              <option value="">Select {name.toLowerCase()}</option>
              {option.choices
                ?.filter((choice) => choice.visible !== false)
                .map((choice) => (
                  <option
                    key={choice.value ?? choice.description}
                    value={choice.value ?? choice.description ?? ""}
                    disabled={choice.inStock === false}
                  >
                    {choice.description ?? choice.value}
                    {choice.inStock === false ? " — unavailable" : ""}
                  </option>
                ))}
            </select>
          </div>
        );
      })}

      <div>
        <p className="mb-2 text-sm font-semibold">Quantity</p>
        <div className="inline-flex items-center border border-line">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="px-4 py-2"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-10 text-center text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((value) => value + 1)}
            className="px-4 py-2"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!inStock || !allOptionsSelected || isPending}
        className="btn-solid w-full disabled:cursor-not-allowed disabled:bg-ink/30 disabled:text-paper disabled:hover:bg-ink/30"
      >
        {!inStock
          ? "Out of Stock"
          : !allOptionsSelected
            ? "Choose Options"
            : isPending
              ? "Adding..."
              : "Add to Cart"}
      </button>
      <p className="text-sm text-ink/60">
        {inStock ? "Available to order" : "Currently unavailable"} · Secure checkout powered by Wix
      </p>
      {error && <p className="mt-2 text-sm text-rust">{error}</p>}
    </div>
  );
}

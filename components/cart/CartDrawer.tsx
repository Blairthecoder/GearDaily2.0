"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useCart } from "@/lib/cart-context";
import {
  createCheckoutUrl,
  getCurrentCart,
  removeLineItem,
  updateLineItemQuantity,
} from "@/lib/wix/cart";

type WixCart = Awaited<ReturnType<typeof getCurrentCart>>;

/**
 * The compact cart shown after an item is added and from the header cart button.
 */
export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, refreshCart } = useCart();
  const [cart, setCart] = useState<WixCart>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isDrawerOpen) return;

    let active = true;
    setLoading(true);
    setError(null);
    getCurrentCart()
      .then((currentCart) => {
        if (active) setCart(currentCart);
      })
      .catch(() => {
        if (active) setError("We couldn't load your cart. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeDrawer, isDrawerOpen]);

  async function syncCart() {
    const updated = await getCurrentCart();
    setCart(updated);
    await refreshCart();
  }

  function handleRemove(lineItemId: string) {
    setError(null);
    startTransition(async () => {
      try {
        await removeLineItem(lineItemId);
        await syncCart();
      } catch {
        setError("We couldn't remove that item. Please try again.");
      }
    });
  }

  function handleQuantity(lineItemId: string, quantity: number) {
    if (quantity < 1) {
      handleRemove(lineItemId);
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        await updateLineItemQuantity(lineItemId, quantity);
        await syncCart();
      } catch {
        setError("We couldn't update that item. Please try again.");
      }
    });
  }

  function handleCheckout() {
    setError(null);
    startTransition(async () => {
      try {
        const url = await createCheckoutUrl(`${window.location.origin}/cart`);
        if (url) window.location.href = url;
        else setError("Checkout is temporarily unavailable. Please try again.");
      } catch {
        setError("Checkout is temporarily unavailable. Please try again.");
      }
    });
  }

  if (!isDrawerOpen) return null;

  const lineItems = cart?.lineItems ?? [];
  const subtotal = lineItems.reduce(
    (sum, item) => sum + Number(item.price?.amount ?? 0) * (item.quantity ?? 0),
    0
  );
  const currency =
    lineItems[0]?.price?.formattedAmount?.replace(/[\d.,\s]/g, "") ?? "";

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Close cart"
        onClick={closeDrawer}
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-lg">Your Cart</h2>
          <button type="button" onClick={closeDrawer} aria-label="Close cart" className="p-2">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {loading ? (
            <p className="py-8 text-sm text-ink/60">Loading your cart...</p>
          ) : lineItems.length === 0 ? (
            <div className="py-8">
              <p className="text-sm text-ink/60">Your cart is empty.</p>
              <Link href="/shop" onClick={closeDrawer} className="mt-4 inline-block text-sm underline">
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lineItems.map((item) => (
                <li key={item._id} className="flex gap-4 py-5">
                  <div className="relative h-24 w-20 flex-shrink-0 bg-canvas">
                    {item.image && (
                      <Image
                        src={formatWixImage(item.image)}
                        alt={item.productName?.original ?? "Cart item"}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex gap-3">
                      <p className="flex-1 text-sm font-medium">{item.productName?.original}</p>
                      <p className="text-sm">{item.price?.formattedAmount}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-ink/60">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => handleQuantity(item._id!, (item.quantity ?? 1) - 1)}
                          disabled={isPending}
                          aria-label={`Decrease ${item.productName?.original ?? "item"} quantity`}
                          className="px-3 py-1 disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="min-w-7 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantity(item._id!, (item.quantity ?? 1) + 1)}
                          disabled={isPending}
                          aria-label={`Increase ${item.productName?.original ?? "item"} quantity`}
                          className="px-3 py-1 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(item._id!)}
                        disabled={isPending}
                        className="underline disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {error && <p className="pb-4 text-sm text-rust">{error}</p>}
        </div>

        {!loading && lineItems.length > 0 && (
          <div className="border-t border-line bg-paper p-6">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isPending}
              className="btn-solid mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Checkout"}
            </button>
            <Link href="/cart" onClick={closeDrawer} className="mt-3 block text-center text-sm underline">
              View full cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function formatWixImage(wixImageString: string): string {
  const match = wixImageString.match(/wix:image:\/\/v1\/([^/]+)\//);
  return match ? `https://static.wixstatic.com/media/${match[1]}` : wixImageString;
}

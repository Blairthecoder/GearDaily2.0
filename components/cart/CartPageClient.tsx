"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getCurrentCart,
  removeLineItem,
  updateLineItemQuantity,
  createCheckoutUrl,
} from "@/lib/wix/cart";
import { useCart } from "@/lib/cart-context";

type WixCart = Awaited<ReturnType<typeof getCurrentCart>>;

export function CartPageClient() {
  const [cart, setCart] = useState<WixCart>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const { refreshCart } = useCart();

  useEffect(() => {
    getCurrentCart()
      .then(setCart)
      .finally(() => setLoading(false));
  }, []);

  async function syncCart() {
    const updated = await getCurrentCart();
    setCart(updated);
    await refreshCart();
  }

  function handleRemove(lineItemId: string) {
    startTransition(async () => {
      await removeLineItem(lineItemId);
      await syncCart();
    });
  }

  function handleQuantity(lineItemId: string, quantity: number) {
    if (quantity < 1) return;
    startTransition(async () => {
      await updateLineItemQuantity(lineItemId, quantity);
      await syncCart();
    });
  }

  function handleCheckout() {
    setCheckoutError(null);
    startTransition(async () => {
      try {
        const url = await createCheckoutUrl(window.location.origin + "/cart");
        if (url) window.location.href = url;
        else setCheckoutError("Checkout is temporarily unavailable. Please try again.");
      } catch {
        setCheckoutError("Checkout is temporarily unavailable. Please try again.");
      }
    });
  }

  if (loading) return <p className="text-ink/60">Loading your cart...</p>;

  const lineItems = cart?.lineItems ?? [];
  const currency = lineItems[0]?.price?.formattedAmount?.replace(/[\d.,\s]/g, "") ?? "";
  const subtotal = lineItems.reduce(
    (sum, item) => sum + Number(item.price?.amount ?? 0) * (item.quantity ?? 0),
    0
  );

  if (lineItems.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-ink/60">Your cart is empty.</p>
        <Link href="/shop" className="mt-4 inline-block underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <ul className="lg:col-span-2 divide-y divide-line">
        {lineItems.map((item) => (
          <li key={item._id} className="flex gap-4 py-6">
            <div className="relative h-24 w-20 flex-shrink-0 bg-canvas">
              {item.image && (
                <Image
                  src={formatWixImage(item.image)}
                  alt={item.productName?.original ?? ""}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex justify-between">
                <p className="font-medium">{item.productName?.original}</p>
                <p>{item.price?.formattedAmount}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-ink/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuantity(item._id!, (item.quantity ?? 1) - 1)}
                    disabled={isPending}
                    aria-label="Decrease quantity"
                    className="border border-line px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantity(item._id!, (item.quantity ?? 1) + 1)}
                    disabled={isPending}
                    aria-label="Increase quantity"
                    className="border border-line px-2"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item._id!)}
                  disabled={isPending}
                  className="underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="border border-line p-6 h-fit">
        <div className="flex justify-between text-lg">
          <span>Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isPending}
          className="mt-6 w-full bg-ink py-4 text-sm font-medium text-paper hover:bg-rust"
        >
          {isPending ? "Redirecting..." : "Checkout"}
        </button>
        {checkoutError && <p className="mt-2 text-sm text-rust">{checkoutError}</p>}
      </div>
    </div>
  );
}

function formatWixImage(wixImageString: string): string {
  // Wix media refs look like `wix:image://v1/<id>/filename#...` — convert to a servable URL.
  const match = wixImageString.match(/wix:image:\/\/v1\/([^/]+)\//);
  return match ? `https://static.wixstatic.com/media/${match[1]}` : wixImageString;
}

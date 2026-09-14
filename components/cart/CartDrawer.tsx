"use client";

import { useCart } from "@/lib/cart-context";

/**
 * Cart drawer shell. Line-item rendering wires up to lib/wix/cart in the
 * cart-experience pass (Phase 7) — this establishes the accessible dialog
 * shape and open/close plumbing consumed by the header cart button.
 */
export function CartDrawer() {
  const { isDrawerOpen, closeDrawer } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Close cart"
        onClick={closeDrawer}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-paper p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg">Your Cart</h2>
          <button type="button" onClick={closeDrawer} aria-label="Close cart" className="p-2">
            ×
          </button>
        </div>
        <p className="mt-8 text-sm text-ink/60">Your cart is empty.</p>
      </div>
    </div>
  );
}

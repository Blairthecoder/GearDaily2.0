"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getCurrentCart } from "@/lib/wix/cart";

export type WixCart = Awaited<ReturnType<typeof getCurrentCart>>;

type CartContextValue = {
  cart: WixCart;
  itemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  refreshCart: () => Promise<void>;
  replaceCart: (cart: WixCart) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<WixCart>(null);
  const [itemCount, setItemCount] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const replaceCart = useCallback((nextCart: WixCart) => {
    setCart(nextCart);
    const count =
      nextCart?.lineItems?.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ?? 0;
    setItemCount(count);
  }, []);

  const refreshCart = useCallback(async () => {
    const currentCart = await getCurrentCart();
    // Keep the mutation response already in memory if Wix's read endpoint is
    // briefly stale immediately after an add/update operation.
    if (currentCart) replaceCart(currentCart);
  }, [replaceCart]);

  useEffect(() => {
    refreshCart().catch(() => setItemCount(0));
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        refreshCart,
        replaceCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

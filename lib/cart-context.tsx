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

type CartContextValue = {
  itemCount: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const refreshCart = useCallback(async () => {
    const cart = await getCurrentCart();
    const count =
      cart?.lineItems?.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ?? 0;
    setItemCount(count);
  }, []);

  useEffect(() => {
    refreshCart().catch(() => setItemCount(0));
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        itemCount,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        refreshCart,
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

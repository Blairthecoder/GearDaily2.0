import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title: "Your Cart",
};

export default function CartPage() {
  return (
    <div className="container-content py-12">
      <h1 className="font-display text-3xl">Your Cart</h1>
      <div className="mt-8">
        <CartPageClient />
      </div>
    </div>
  );
}

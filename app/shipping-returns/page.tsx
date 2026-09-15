import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Shipping timelines, return policy, and size guide for G.E.A.R. orders.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <div className="container-content max-w-2xl py-12">
      <h1 className="font-display text-3xl">Shipping & Returns</h1>
      <div className="mt-6 space-y-6 text-ink/70">
        <p>
          Orders are processed within 1-2 business days and typically arrive
          within 5-7 business days depending on your location.
        </p>
        <p>
          Unworn, unwashed items may be returned within 30 days of delivery
          for a refund or exchange. Sale items are final sale.
        </p>
        <section id="size-guide" className="border-t border-line pt-6">
          <h2 className="font-display text-xl text-ink">Size Guide</h2>
          <p className="mt-2">
            Most apparel uses unisex sizing. Choose your usual size for a relaxed fit,
            or size down for a closer fit. Product-specific size options appear on each
            product page.
          </p>
        </section>
      </div>
    </div>
  );
}

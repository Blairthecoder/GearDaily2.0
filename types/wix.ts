import type { products } from "@wix/stores";

export type WixProduct = products.Product;

export type NavCollection = {
  label: string;
  slug: string;
};

export const SHOP_BY_MESSAGE: NavCollection[] = [
  { label: "Strength", slug: "strength" },
  { label: "Peace", slug: "peace" },
  { label: "Freedom", slug: "freedom" },
  { label: "Trust", slug: "faith-and-trust" },
  { label: "Love", slug: "love" },
  { label: "Identity", slug: "identity" },
];

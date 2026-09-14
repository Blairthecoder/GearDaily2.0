import type { WixProduct } from "@/types/wix";

export const PRODUCT_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["value"];

const MEN_ONLY_PRODUCTS = new Set(["traits of man"]);
const WOMEN_ONLY_PRODUCTS = new Set(["traits of woman", "womens blessings"]);

function normalizeName(name: string | null | undefined) {
  return name?.trim().toLowerCase() ?? "";
}

export function parseProductCategory(value: string | undefined): ProductCategory {
  return PRODUCT_CATEGORIES.some((category) => category.value === value)
    ? (value as ProductCategory)
    : "all";
}

export function filterProductsByCategory(
  products: WixProduct[],
  category: ProductCategory
) {
  if (category === "all") return products;

  return products.filter((product) => {
    const name = normalizeName(product.name);

    if (category === "men") return !WOMEN_ONLY_PRODUCTS.has(name);
    return !MEN_ONLY_PRODUCTS.has(name);
  });
}

import type { WixProduct } from "@/types/wix";

export const PRODUCT_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Hats", value: "hats" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Tops", value: "tops" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["value"];
export type ProductSort = "featured" | "newest" | "price-asc" | "price-desc" | "name";

export const PRODUCT_SORTS: { label: string; value: ProductSort }[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A–Z", value: "name" },
];

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

export function parseProductSort(value: string | undefined): ProductSort {
  return PRODUCT_SORTS.some((sort) => sort.value === value)
    ? (value as ProductSort)
    : "featured";
}

export function getMerchandiseCategory(product: WixProduct): "hats" | "bottoms" | "tops" {
  const name = normalizeName(product.name);
  if (name.includes("hat")) return "hats";
  if (name.includes("sweatpants") || name.includes("sweat pants")) return "bottoms";
  return "tops";
}

export function filterProductsByCategory(
  products: WixProduct[],
  category: ProductCategory
) {
  if (category === "all") return products;

  return products.filter((product) => {
    const name = normalizeName(product.name);

    if (category === "men") return !WOMEN_ONLY_PRODUCTS.has(name);
    if (category === "women") return !MEN_ONLY_PRODUCTS.has(name);
    return getMerchandiseCategory(product) === category;
  });
}

export function queryProducts(
  products: WixProduct[],
  category: ProductCategory,
  query: string,
  sort: ProductSort
) {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = filterProductsByCategory(products, category).filter((product) => {
    if (!normalizedQuery) return true;
    return [product.name, product.description, product.sku]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(normalizedQuery));
  });

  if (sort === "featured") return filtered;

  return [...filtered].sort((a, b) => {
    if (sort === "name") return (a.name ?? "").localeCompare(b.name ?? "");
    if (sort === "newest") {
      return new Date(b._createdDate ?? 0).getTime() - new Date(a._createdDate ?? 0).getTime();
    }

    const aPrice = a.priceData?.discountedPrice ?? a.priceData?.price ?? 0;
    const bPrice = b.priceData?.discountedPrice ?? b.priceData?.price ?? 0;
    return sort === "price-asc" ? aPrice - bPrice : bPrice - aPrice;
  });
}

import { wixClient } from "./client";

/**
 * Product/collection reads. Server components can call these directly
 * (visitor tokens aren't required for public catalog reads).
 */

export async function getProductsByCollection(
  collectionSlug: string,
  limit = 24
) {
  const { items } = await wixClient.products
    .queryProducts()
    .hasSome("collectionIds", [await getCollectionIdBySlug(collectionSlug)])
    .limit(limit)
    .find();
  return items;
}

export async function getAllProducts(limit = 100) {
  const { items } = await wixClient.products.queryProducts().limit(limit).find();
  return items;
}

export async function getProductBySlug(slug: string) {
  const { items } = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .limit(1)
    .find();
  return items[0] ?? null;
}

export async function getCollections() {
  const { items } = await wixClient.collections.queryCollections().find();
  return items;
}

export async function getCollectionIdBySlug(slug: string) {
  const { collection } = await wixClient.collections.getCollectionBySlug(slug);
  return collection?._id ?? "";
}

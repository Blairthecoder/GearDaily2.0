import type { MetadataRoute } from "next";
import { SHOP_BY_MESSAGE } from "@/types/wix";
import { DESIGN_STORIES } from "@/lib/content/behind-the-design";
import { getAllProducts } from "@/lib/wix/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000";

const STATIC_ROUTES = [
  "",
  "/shop",
  "/new-arrivals",
  "/best-sellers",
  "/collections",
  "/behind-the-design",
  "/about",
  "/geared-4-gain",
  "/faq",
  "/contact",
  "/shipping-returns",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts(500);
    productRoutes = products
      .filter((p) => p.slug)
      .map((p) => ({ url: `${siteUrl}/products/${p.slug}` }));
  } catch {
    productRoutes = [];
  }

  const staticRoutes = STATIC_ROUTES.map((route) => ({ url: `${siteUrl}${route}` }));
  const collectionRoutes = SHOP_BY_MESSAGE.map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
  }));
  const storyRoutes = DESIGN_STORIES.map((s) => ({
    url: `${siteUrl}/behind-the-design/${s.slug}`,
  }));

  return [...staticRoutes, ...collectionRoutes, ...storyRoutes, ...productRoutes];
}

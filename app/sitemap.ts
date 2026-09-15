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
  "/journal",
  "/about",
  "/geared-4-gain",
  "/faq",
  "/contact",
  "/shipping-returns",
  "/privacy",
  "/terms",
];

const HOME_PRIORITY = 1;
const SECTION_PRIORITY = 0.8;
const DETAIL_PRIORITY = 0.6;
const LEGAL_PRIORITY = 0.3;

const LEGAL_ROUTES = new Set(["/privacy", "/terms", "/shipping-returns"]);

function priorityFor(route: string) {
  if (route === "") return HOME_PRIORITY;
  if (LEGAL_ROUTES.has(route)) return LEGAL_PRIORITY;
  return SECTION_PRIORITY;
}

function changeFrequencyFor(route: string): NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]> {
  return route === "" ? "daily" : "weekly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts(500);
    productRoutes = products
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${siteUrl}/products/${p.slug}`,
        lastModified: p._createdDate ? new Date(p._createdDate) : now,
        changeFrequency: "weekly" as const,
        priority: DETAIL_PRIORITY,
      }));
  } catch {
    productRoutes = [];
  }

  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: changeFrequencyFor(route),
    priority: priorityFor(route),
  }));
  const collectionRoutes = SHOP_BY_MESSAGE.map((c) => ({
    url: `${siteUrl}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: SECTION_PRIORITY,
  }));
  const storyRoutes = DESIGN_STORIES.map((s) => ({
    url: `${siteUrl}/behind-the-design/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: DETAIL_PRIORITY,
  }));

  return [...staticRoutes, ...collectionRoutes, ...storyRoutes, ...productRoutes];
}

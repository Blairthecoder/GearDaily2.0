import type { WixProduct } from "@/types/wix";
import { getProductImage } from "@/lib/catalog/product-images";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000";

function absoluteUrl(value: string) {
  return value.startsWith("http") ? value : `${siteUrl}${value}`;
}

function plainText(value: string | null | undefined) {
  return value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GearDaily",
    url: siteUrl,
    sameAs: [
      "https://www.instagram.com/geardailyr122/",
      "https://www.facebook.com/geardaily",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GearDaily",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: WixProduct) {
  const image = getProductImage(product)?.url;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: plainText(product.description),
    sku: product.sku,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : { "@type": "Brand", name: "G.E.A.R." },
    image: image ? [absoluteUrl(image)] : undefined,
    url: `${siteUrl}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: product.priceData?.currency,
      price: product.priceData?.discountedPrice ?? product.priceData?.price,
      availability: product.stock?.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteUrl}/products/${product.slug}`,
    },
  };
}

export function collectionPageJsonLd(
  name: string,
  path: string,
  products: WixProduct[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${siteUrl}${path}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${siteUrl}/products/${product.slug}`,
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

import type { WixProduct } from "@/types/wix";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GearDaily",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GearDaily",
    url: siteUrl,
  };
}

export function productJsonLd(product: WixProduct) {
  const image = product.media?.mainMedia?.image?.url;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: image ? [image] : undefined,
    url: `${siteUrl}/products/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: product.priceData?.currency,
      price: product.priceData?.price,
      availability: product.stock?.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteUrl}/products/${product.slug}`,
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

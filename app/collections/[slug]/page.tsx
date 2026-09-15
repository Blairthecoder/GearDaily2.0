import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByCollection } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo/jsonld";
import { SHOP_BY_MESSAGE } from "@/types/wix";
import type { WixProduct } from "@/types/wix";

export function generateStaticParams() {
  return SHOP_BY_MESSAGE.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = SHOP_BY_MESSAGE.find((item) => item.slug === slug);
  if (!collection) return {};
  return {
    title: collection.label,
    description: `Shop the ${collection.label} collection, faith-driven apparel built around this message.`,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = SHOP_BY_MESSAGE.find((item) => item.slug === slug);
  if (!collection) notFound();

  let products: WixProduct[] = [];
  try {
    products = await getProductsByCollection(slug);
  } catch {
    products = [];
  }

  return (
    <div className="container-content py-12">
      <JsonLd
        data={collectionPageJsonLd(collection.label, `/collections/${collection.slug}`, products)}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Shop by Message", url: "/collections" },
          { name: collection.label, url: `/collections/${collection.slug}` },
        ])}
      />
      <p className="eyebrow">Shop by Message</p>
      <h1 className="font-display text-3xl">{collection.label}</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Apparel built around {collection.label.toLowerCase()}, Scripture-rooted
        designs made to wear the message every day.
      </p>
      <div className="mt-8">
        <ProductGrid
          products={products}
          emptyMessage="No products are mapped to this collection in Wix yet."
        />
      </div>
    </div>
  );
}

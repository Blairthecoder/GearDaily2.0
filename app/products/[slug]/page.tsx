import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/wix/products";
import { getDesignStoryBySlug } from "@/lib/content/behind-the-design";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description?.slice(0, 155),
    openGraph: {
      images: product.media?.mainMedia?.image?.url
        ? [product.media.mainMedia.image.url]
        : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  const story = product.ribbon ? getDesignStoryBySlug(product.ribbon) : null;
  const image = product.media?.mainMedia?.image;

  return (
    <div className="container-content py-8">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Shop", url: "/shop" },
          { name: product.name ?? "Product", url: `/products/${product.slug}` },
        ])}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-ink/60">
        <Link href="/shop">Shop</Link> / <span>{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square bg-canvas">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.altText || product.name || ""}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        <div>
          <h1 className="font-display text-3xl">{product.name}</h1>
          {story && (
            <p className="mt-2 text-ink/70">{story.summary}</p>
          )}
          <p className="mt-4 text-xl">{product.priceData?.formatted?.price}</p>

          <AddToCartForm product={product} />

          {story && (
            <div className="mt-10 space-y-6 border-t border-line pt-8">
              <div>
                <h2 className="font-display text-lg">The Meaning Behind the Design</h2>
                <p className="mt-2 text-ink/70">{story.meaning}</p>
              </div>
              <div>
                <h2 className="font-display text-lg">Scripture / Inspiration</h2>
                <p className="mt-2 text-ink/70">{story.scriptureRef}</p>
              </div>
              <div>
                <h2 className="font-display text-lg">Design Details</h2>
                <p className="mt-2 text-ink/70">{story.symbolism}</p>
              </div>
              <Link
                href={`/behind-the-design/${story.slug}`}
                className="inline-block text-sm underline"
              >
                Read the full story
              </Link>
            </div>
          )}

          {product.description && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-lg">Product Details</h2>
              <div
                className="mt-2 text-ink/70"
                // Wix product descriptions are rich text controlled by the store owner
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

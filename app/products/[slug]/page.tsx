import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/wix/products";
import { getDesignStoryByProductSlug } from "@/lib/content/behind-the-design";
import { AddToCartForm } from "@/components/product/AddToCartForm";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getProductImage, getProductImages } from "@/lib/catalog/product-images";
import { getMerchandiseCategory } from "@/lib/catalog/product-categories";
import Link from "next/link";

function plainText(value: string | null | undefined) {
  return value?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return {};
  const image = getProductImage(product);
  return {
    title: product.name,
    description: plainText(product.description)?.slice(0, 155),
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      images: image ? [image.url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      images: image ? [image.url] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug).catch(() => null),
    getAllProducts(100).catch(() => []),
  ]);
  if (!product) notFound();

  const story = getDesignStoryByProductSlug(product.slug);
  const images = getProductImages(product).slice(0, 4);
  const relatedProducts = allProducts
    .filter(
      (candidate) =>
        candidate._id !== product._id &&
        getMerchandiseCategory(candidate) === getMerchandiseCategory(product)
    )
    .slice(0, 4);

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
        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => (
            <div
              key={image.url}
              className={`relative aspect-square overflow-hidden bg-canvas ${
                index === 0 ? "col-span-2" : ""
              }`}
            >
              <Image
                src={image.url}
                alt={index === 0 ? image.altText : `${product.name} view ${index + 1}`}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "25vw"}
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        <div>
          {product.ribbon && (
            <p className="eyebrow">{product.ribbon}</p>
          )}
          <h1 className="font-display text-3xl">{product.name}</h1>
          {story && (
            <p className="mt-2 text-ink/70">{story.summary}</p>
          )}
          <p className="mt-4 text-xl">{product.priceData?.formatted?.price}</p>

          <AddToCartForm product={product} />

          <div className="mt-8 grid gap-4 border-y border-line py-6 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold">Shipping</p>
              <p className="mt-1 text-ink/60">Free U.S. shipping on orders over $75.</p>
            </div>
            <div>
              <p className="font-semibold">Returns</p>
              <p className="mt-1 text-ink/60">Returns accepted within 30 days on eligible items.</p>
            </div>
          </div>

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
                className="rich-text mt-3"
                // Wix product descriptions are rich text controlled by the store owner
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {product.additionalInfoSections?.map((section) => (
            <div key={section.title} className="mt-8 border-t border-line pt-6">
              <h2 className="font-display text-lg">{section.title}</h2>
              {section.description && (
                <div
                  className="rich-text mt-3"
                  dangerouslySetInnerHTML={{ __html: section.description }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-line pt-12">
          <p className="eyebrow">Keep Exploring</p>
          <h2 className="mt-2 font-display text-2xl">You May Also Like</h2>
          <div className="mt-8">
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-display text-2xl">Product Questions</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-semibold">How should I choose my size?</h3>
            <p className="mt-2 text-sm text-ink/70">
              Review the available size choices above and visit our size and shipping guide for more help.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">When will my order arrive?</h3>
            <p className="mt-2 text-sm text-ink/70">
              Orders typically arrive within 5–7 business days after processing.
            </p>
          </div>
        </div>
        <Link href="/faq" className="mt-6 inline-block text-sm font-semibold underline">
          View all frequently asked questions
        </Link>
      </section>
    </div>
  );
}

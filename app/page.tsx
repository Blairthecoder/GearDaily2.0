import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { ShopByMessage } from "@/components/content/ShopByMessage";
import { FeaturedDesignStory } from "@/components/content/FeaturedDesignStory";
import { EmailSignup } from "@/components/content/EmailSignup";
import { PromoTiles } from "@/components/content/PromoTiles";
import { FeatureStrip } from "@/components/content/FeatureStrip";
import { MiniColumns } from "@/components/content/MiniColumns";
import { DESIGN_STORIES } from "@/lib/content/behind-the-design";
import { getProductImage } from "@/lib/catalog/product-images";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import type { WixProduct } from "@/types/wix";

export default async function HomePage() {
  let products: WixProduct[] = [];
  try {
    products = await getAllProducts(8);
  } catch {
    products = [];
  }

  const featuredStory = DESIGN_STORIES[0];
  const heroImage = getProductImage(products[0]);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="container-content grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <p className="eyebrow">New Collection</p>
          <h1 className="mt-2 font-display text-4xl leading-tight lg:text-6xl">
            Faith, Worn Daily.
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink/70">
            Apparel rooted in Scripture, designed to encourage, strengthen, and
            start conversations. Every design carries a message.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/shop" className="btn-solid">
              Shop the Collection
            </Link>
            <Link href="/about" className="btn-outline">
              Discover G.E.A.R.
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] bg-canvas">
          {heroImage && (
            <Image
              src={heroImage.url}
              alt={heroImage.altText}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover"
            />
          )}
        </div>
      </section>

      <PromoTiles products={products.slice(1, 4)} />

      <FeatureStrip />

      <section className="container-content py-16">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="eyebrow">Just Landed</p>
            <h2 className="font-display text-2xl">New Arrivals</h2>
          </div>
          <Link href="/new-arrivals" className="text-sm font-semibold uppercase tracking-wide hover:text-gold">
            View all
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid
            products={products}
            emptyMessage="New arrivals are loading from Wix — connect your store to see live products here."
          />
        </div>
      </section>

      <ShopByMessage />

      {featuredStory && <FeaturedDesignStory story={featuredStory} />}

      <section className="border-y border-line bg-canvas py-16">
        <div className="container-content max-w-2xl text-center">
          <p className="eyebrow">G.E.A.R.ed 4 Gain</p>
          <h2 className="mt-2 font-display text-2xl">Every Design Has a Message</h2>
          <p className="mt-3 text-ink/70">
            Every piece is built around Scripture, biblical character, and
            spiritual growth — clothing meant to start conversations about
            what you believe. A portion of what we do goes toward clothing
            and supporting individuals experiencing homelessness, school-aged
            children, and local communities.
          </p>
          <Link href="/geared-4-gain" className="btn-outline mt-6 inline-block">
            Learn About Our Impact
          </Link>
        </div>
      </section>

      <section className="container-content py-16">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="eyebrow">Fan Favorites</p>
            <h2 className="font-display text-2xl">Best Sellers</h2>
          </div>
          <Link href="/best-sellers" className="text-sm font-semibold uppercase tracking-wide hover:text-gold">
            View all
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={products.slice(0, 4)} />
        </div>
      </section>

      <section className="container-content grid gap-6 pb-16 sm:grid-cols-2">
        {[
          { label: "Shop Men", href: "/men", product: products[4] },
          { label: "Shop Women", href: "/women", product: products[5] },
        ].map((tile) => {
          const image = getProductImage(tile.product);
          return (
            <Link key={tile.href} href={tile.href} className="group relative aspect-[3/4] overflow-hidden bg-canvas">
              {image?.url && (
                <>
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
                </>
              )}
              <span
                className={`absolute bottom-6 left-6 font-display text-2xl ${image?.url ? "text-paper" : "text-ink"}`}
              >
                {tile.label}
              </span>
            </Link>
          );
        })}
      </section>

      <div className="border-t border-line">
        <MiniColumns products={products} />
      </div>

      <EmailSignup />
    </>
  );
}

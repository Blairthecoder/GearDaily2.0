import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { ShopByMessage } from "@/components/content/ShopByMessage";
import { FeaturedDesignStory } from "@/components/content/FeaturedDesignStory";
import { EmailSignup } from "@/components/content/EmailSignup";
import { PromoTiles } from "@/components/content/PromoTiles";
import { CrestWatermark } from "@/components/content/CrestWatermark";
import { FeatureStrip } from "@/components/content/FeatureStrip";
import { CommunityProof } from "@/components/content/CommunityProof";
import { RecentDesignStories } from "@/components/content/RecentDesignStories";
import { DESIGN_STORIES } from "@/lib/content/behind-the-design";
import { getProductImage } from "@/lib/catalog/product-images";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import type { WixProduct } from "@/types/wix";

export const metadata: Metadata = {
  title: "Christian T-Shirts & Faith-Based Apparel",
  description:
    "Shop Christian t-shirts, hats, and lifestyle apparel rooted in Scripture, designed to encourage, strengthen, and start conversations.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  let products: WixProduct[] = [];
  try {
    products = await getAllProducts(8);
  } catch {
    products = [];
  }

  let catalogProducts: WixProduct[] = products;
  try {
    catalogProducts = await getAllProducts(100);
  } catch {
    catalogProducts = products;
  }

  const findProduct = (slug: string, nameNeedle: string) =>
    catalogProducts.find(
      (p) =>
        p.slug === slug ||
        p.name?.trim().toLowerCase().replace(/['’]/g, "").includes(nameNeedle)
    );

  const featuredStory = DESIGN_STORIES[0];
  const heroProduct = products[0];
  const heroImage = getProductImage(heroProduct);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="relative overflow-hidden">
        <CrestWatermark className="pointer-events-none absolute -right-16 -top-10 h-[420px] w-[350px] text-ink/[0.04] lg:-right-10 lg:h-[560px] lg:w-[467px]" />
        <div className="container-content relative grid gap-8 py-10 lg:grid-cols-2 lg:items-start lg:py-16">
        <div className="flex flex-col lg:pt-6">
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
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 max-w-md">
            <div>
              <dt className="font-display text-lg">Free Shipping</dt>
              <dd className="mt-1 text-xs text-ink/60">On U.S. orders $75+</dd>
            </div>
            <div>
              <dt className="font-display text-lg">30 Days</dt>
              <dd className="mt-1 text-xs text-ink/60">Easy returns</dd>
            </div>
            <div>
              <dt className="font-display text-lg">Gives Back</dt>
              <dd className="mt-1 text-xs text-ink/60">Every order</dd>
            </div>
          </dl>
        </div>
        <Link
          href={heroProduct?.slug ? `/products/${heroProduct.slug}` : "/shop"}
          className="group relative block aspect-[4/5] overflow-hidden bg-canvas"
        >
          {heroImage && (
            <Image
              src={heroImage.url}
              alt={heroImage.altText}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {heroProduct && (
            <span className="absolute bottom-4 left-4 bg-paper px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink">
              Shop {heroProduct.name}
            </span>
          )}
        </Link>
        </div>
      </section>

      <EmailSignup />

      <PromoTiles products={products.slice(1, 4)} />

      <FeatureStrip />

      <section className="bg-ink py-16 text-paper">
        <div className="container-content">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">G.E.A.R.ed 4 Gain</p>
              <h2 className="mt-2 font-display text-3xl">Every Order Gives Back</h2>
              <p className="mt-3 text-paper/70">
                A portion of every purchase supports people experiencing
                homelessness, school-aged children, and communities that need
                practical care. Wearing G.E.A.R. means your closet is doing
                something.
              </p>
            </div>
            <Link href="/geared-4-gain" className="btn-outline flex-shrink-0 border-paper text-paper hover:bg-paper hover:text-ink">
              Learn About Our Impact
            </Link>
          </div>
          <dl className="mt-10 grid gap-6 border-t border-paper/20 pt-8 sm:grid-cols-3">
            <div>
              <dt className="font-display text-3xl text-gold">Homelessness</dt>
              <dd className="mt-1 text-sm text-paper/60">Clothing and practical support</dd>
            </div>
            <div>
              <dt className="font-display text-3xl text-gold">Youth</dt>
              <dd className="mt-1 text-sm text-paper/60">Support for school-aged children</dd>
            </div>
            <div>
              <dt className="font-display text-3xl text-gold">Community</dt>
              <dd className="mt-1 text-sm text-paper/60">Care where it&apos;s needed most</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container-content py-12">
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
            emptyMessage="New arrivals are loading from Wix. Connect your store to see live products here."
          />
        </div>
      </section>

      <ShopByMessage stories={DESIGN_STORIES} />

      {featuredStory && <FeaturedDesignStory story={featuredStory} />}

      <section className="container-content py-12">
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

      <section className="border-y border-line bg-canvas py-12">
        <div className="container-content max-w-2xl text-center">
          <p className="eyebrow">Wear What You Believe</p>
          <h2 className="mt-2 font-display text-2xl">Every Design Has a Message</h2>
          <p className="mt-3 text-ink/70">
            Each piece begins with Scripture, faith, and spiritual growth, then
            becomes a design made to encourage conversation and carry meaning.
          </p>
          <Link href="/behind-the-design" className="btn-outline mt-6 inline-block">
            Explore the Stories
          </Link>
        </div>
      </section>

      <section className="container-content grid gap-6 py-12 sm:grid-cols-2">
        {[
          {
            label: "Shop Men",
            href: "/shop?category=men",
            product: findProduct("traits-of-man", "traits of man") ?? products[4],
          },
          {
            label: "Shop Women",
            href: "/shop?category=women",
            product: findProduct("womens-blessings", "womens blessings") ?? products[5],
          },
        ].map((tile) => {
          const image = getProductImage(tile.product);
          return (
            <Link key={tile.href} href={tile.href} className="group relative aspect-[3/4] overflow-hidden bg-canvas">
              {image?.url && (
                <>
                  <Image
                    src={image.url}
                    alt={`${tile.label}, Christian apparel collection`}
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

      <CommunityProof stories={[]} />

      <RecentDesignStories stories={DESIGN_STORIES} />
    </>
  );
}

import Link from "next/link";
import { getAllProducts } from "@/lib/wix/products";
import { ProductGrid } from "@/components/collection/ProductGrid";
import { ShopByMessage } from "@/components/content/ShopByMessage";
import { FeaturedDesignStory } from "@/components/content/FeaturedDesignStory";
import { EmailSignup } from "@/components/content/EmailSignup";
import { DESIGN_STORIES } from "@/lib/content/behind-the-design";
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

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="container-content grid gap-8 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <h1 className="font-display text-4xl leading-tight lg:text-6xl">
            Faith, Worn Daily.
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink/70">
            Apparel rooted in Scripture, designed to encourage, strengthen, and
            start conversations. Every design carries a message.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/shop"
              className="bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-rust"
            >
              Shop the Collection
            </Link>
            <Link
              href="/about"
              className="border border-ink px-6 py-3 text-sm font-medium hover:bg-canvas"
            >
              Discover G.E.A.R.
            </Link>
          </div>
        </div>
        <div className="aspect-[4/5] bg-canvas" aria-hidden="true" />
      </section>

      <section className="container-content py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl">New Arrivals</h2>
          <Link href="/new-arrivals" className="text-sm underline">
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

      <section className="container-content py-12">
        <h2 className="font-display text-2xl">Best Sellers</h2>
        <div className="mt-8">
          <ProductGrid products={products.slice(0, 4)} />
        </div>
      </section>

      <section className="border-y border-line bg-canvas py-16">
        <div className="container-content max-w-2xl text-center">
          <h2 className="font-display text-2xl">Every Design Has a Message</h2>
          <p className="mt-3 text-ink/70">
            Every piece is built around Scripture, biblical character, and
            spiritual growth — clothing meant to start conversations about
            what you believe.
          </p>
        </div>
      </section>

      <section className="container-content grid gap-6 py-16 sm:grid-cols-2">
        <Link href="/men" className="group relative aspect-[3/4] bg-canvas">
          <span className="absolute bottom-6 left-6 font-display text-2xl text-ink">
            Shop Men
          </span>
        </Link>
        <Link href="/women" className="group relative aspect-[3/4] bg-canvas">
          <span className="absolute bottom-6 left-6 font-display text-2xl text-ink">
            Shop Women
          </span>
        </Link>
      </section>

      <section className="container-content py-16">
        <h2 className="font-display text-2xl">Behind the Design</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {DESIGN_STORIES.slice(0, 3).map((story) => (
            <Link key={story.slug} href={`/behind-the-design/${story.slug}`} className="group">
              <div className="aspect-[4/5] bg-canvas" />
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brass">
                {story.scriptureRef}
              </p>
              <h3 className="font-display text-lg">{story.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-content py-16">
        <div className="border border-line p-8 text-center">
          <h2 className="font-display text-2xl">G.E.A.R.ed 4 Gain</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/70">
            A portion of what we do goes toward clothing and supporting
            individuals experiencing homelessness, school-aged children, and
            local communities.
          </p>
          <Link href="/geared-4-gain" className="mt-4 inline-block underline text-sm">
            Learn about our impact
          </Link>
        </div>
      </section>

      <EmailSignup />
    </>
  );
}

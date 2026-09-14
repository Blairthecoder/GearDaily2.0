import Image from "next/image";
import Link from "next/link";
import type { DesignStory } from "@/lib/content/behind-the-design";

export function FeaturedDesignStory({ story }: { story: DesignStory }) {
  return (
    <section className="container-content grid gap-8 py-16 lg:grid-cols-2 lg:items-center">
      <div className="relative aspect-[4/5] bg-canvas">
        {story.heroImage ? (
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-brass">
          {story.scriptureRef}
        </p>
        <h2 className="mt-2 font-display text-3xl">{story.title}</h2>
        <p className="mt-4 text-ink/70">{story.summary}</p>
        <div className="mt-6 flex gap-4">
          <Link
            href={`/behind-the-design/${story.slug}`}
            className="border border-ink px-5 py-3 text-sm font-medium hover:bg-ink hover:text-paper"
          >
            Discover the Story
          </Link>
          {story.productSlug && (
            <Link
              href={`/products/${story.productSlug}`}
              className="bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-rust"
            >
              Shop the Design
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

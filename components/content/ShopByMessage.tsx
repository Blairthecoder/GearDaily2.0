import Image from "next/image";
import Link from "next/link";
import type { DesignStory } from "@/lib/content/behind-the-design";

export function ShopByMessage({ stories }: { stories: DesignStory[] }) {
  return (
    <section className="container-content py-16">
      <p className="eyebrow text-center">Welcome to</p>
      <h2 className="text-center font-display text-2xl">Shop by Message</h2>
      <p className="mx-auto mt-1 max-w-xl text-center text-ink/70">
        Every design carries a message. Find the one that speaks to where you are.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stories.slice(0, 4).map((story) => (
          <Link
            key={story.slug}
            href={
              story.productSlug
                ? `/products/${story.productSlug}`
                : `/behind-the-design/${story.slug}`
            }
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
              {story.heroImage && (
                <Image
                  src={story.heroImage}
                  alt={story.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gold">
              {story.scriptureRef}
            </p>
            <h3 className="mt-1 font-display text-lg">{story.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

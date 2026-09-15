import Image from "next/image";
import Link from "next/link";
import type { DesignStory } from "@/lib/content/behind-the-design";

export function RecentDesignStories({ stories }: { stories: DesignStory[] }) {
  return (
    <section className="container-content py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Behind the Design</p>
          <h2 className="mt-2 font-display text-2xl">The Story Woven Into Every Piece</h2>
        </div>
        <Link href="/behind-the-design" className="text-sm font-semibold uppercase tracking-wide hover:text-gold">
          View all stories
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {stories.slice(0, 3).map((story) => (
          <article key={story.slug}>
            <Link href={`/behind-the-design/${story.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-canvas">
                {story.heroImage && (
                  <Image
                    src={story.heroImage}
                    alt={`${story.title} design story`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold">
                {story.scriptureRef}
              </p>
              <h3 className="mt-1 font-display text-xl">{story.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{story.summary}</p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

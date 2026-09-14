import type { Metadata } from "next";
import Link from "next/link";
import { DESIGN_STORIES } from "@/lib/content/behind-the-design";

export const metadata: Metadata = {
  title: "Behind the Design",
  description:
    "The Scripture, symbolism, and story behind every G.E.A.R. design.",
};

export default function BehindTheDesignIndex() {
  return (
    <div className="container-content py-12">
      <h1 className="font-display text-3xl">Behind the Design</h1>
      <p className="mt-2 max-w-xl text-ink/70">
        Every design carries a message. Here&apos;s the Scripture and story behind it.
      </p>
      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {DESIGN_STORIES.map((story) => (
          <Link key={story.slug} href={`/behind-the-design/${story.slug}`} className="group">
            <div className="aspect-[4/5] bg-canvas" />
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-brass">
              {story.scriptureRef}
            </p>
            <h2 className="font-display text-xl">{story.title}</h2>
            <p className="mt-1 text-sm text-ink/70">{story.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

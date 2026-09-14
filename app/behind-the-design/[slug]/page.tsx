import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DESIGN_STORIES, getDesignStoryBySlug } from "@/lib/content/behind-the-design";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return DESIGN_STORIES.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getDesignStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.summary,
    openGraph: {
      images: story.heroImage ? [story.heroImage] : undefined,
    },
  };
}

export default async function DesignStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getDesignStoryBySlug(slug);
  if (!story) notFound();

  return (
    <div className="container-content max-w-3xl py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: story.title,
          description: story.summary,
          image: story.heroImage,
        }}
      />
      <p className="text-sm font-semibold uppercase tracking-wide text-brass">
        {story.scriptureRef}
      </p>
      <h1 className="mt-2 font-display text-4xl">{story.title}</h1>
      <div className="relative mt-6 aspect-[16/9] overflow-hidden bg-canvas">
        {story.heroImage && (
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <h2 className="font-display text-xl">The Meaning</h2>
          <p className="mt-2 text-ink/70">{story.meaning}</p>
        </div>
        <div>
          <h2 className="font-display text-xl">Design Symbolism</h2>
          <p className="mt-2 text-ink/70">{story.symbolism}</p>
        </div>
      </div>

      {story.productSlug && (
        <Link
          href={`/products/${story.productSlug}`}
          className="mt-10 inline-block bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-rust"
        >
          Shop This Design
        </Link>
      )}
    </div>
  );
}

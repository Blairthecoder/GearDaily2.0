import Image from "next/image";

export type CommunityStory = {
  name: string;
  quote: string;
  image?: string;
};

export function CommunityProof({ stories }: { stories: CommunityStory[] }) {
  if (stories.length === 0) return null;

  return (
    <section className="border-y border-line bg-canvas py-16">
      <div className="container-content">
        <p className="eyebrow">Worn in the Community</p>
        <h2 className="mt-2 font-display text-2xl">Faith in Everyday Life</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <figure key={`${story.name}-${story.quote}`} className="bg-paper p-6">
              {story.image && (
                <div className="relative mb-5 aspect-square overflow-hidden bg-canvas">
                  <Image src={story.image} alt={`${story.name} wearing G.E.A.R.`} fill className="object-cover" />
                </div>
              )}
              <blockquote className="text-ink/80">“{story.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold">{story.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export type DesignStory = {
  slug: string;
  title: string;
  scriptureRef: string;
  summary: string;
  meaning: string;
  symbolism: string;
  heroImage?: string;
  productSlug?: string;
};

/**
 * Editorial content is owned here (not Wix) since it's not commerce data.
 * Placeholder copy below reflects the design narratives supplied in the
 * brand brief — replace with the client's actual "Behind the Design" text
 * before launch.
 */
export const DESIGN_STORIES: DesignStory[] = [
  {
    slug: "the-armor",
    title: "The Armor",
    scriptureRef: "Ephesians 6:10-18",
    summary:
      "Spiritual strength and protection, drawn from the full armor of God — standing firm, shielded, and grounded in His Word.",
    meaning:
      "The Armor represents readiness for spiritual battle: not fighting in your own strength, but standing firm in what God has already given you.",
    symbolism:
      "The shield and sword reference faith and the Word of God; the stance reflects standing firm rather than retreating.",
    heroImage: "/products/the-armor.jpg",
    productSlug: "g-e-a-r-the-armor-t-shirt",
  },
  {
    slug: "trust-god",
    title: "Trust God",
    scriptureRef: "Proverbs 3:5-6",
    summary:
      "Built around discovering the character of God — trust, confidence, and obedience in who He is.",
    meaning:
      "Trust God is a daily decision to lean on His understanding instead of our own, especially in seasons that don't make sense yet.",
    symbolism:
      "Typography and layout draw attention to the attributes of God as reasons for trust, not blind faith.",
    heroImage: "/products/trust-god.jpg",
    productSlug: "trust-god",
  },
  {
    slug: "i-carry-a-peace",
    title: "I Carry a Peace",
    scriptureRef: "Philippians 4:7",
    summary:
      "A peace that surpasses understanding — for anxiety, fear, and the search for rest.",
    meaning:
      "This design is a reminder that peace isn't the absence of a storm, it's a Person you carry with you through it.",
    symbolism: "Quiet, restrained visual language mirrors the calm the message describes.",
    heroImage: "/products/i-carry-a-peace.jpg",
    productSlug: "i-carry-a-peace",
  },
  {
    slug: "i-am-free",
    title: "I Am Free",
    scriptureRef: "Galatians 5:1",
    summary: "Freedom through Christ — deliverance, broken chains, and resurrection life.",
    meaning:
      "I Am Free declares an identity, not a feeling: freedom that was purchased and cannot be re-earned or lost.",
    symbolism: "Broken chain imagery signals deliverance rather than decoration.",
    heroImage: "/products/i-am-free.jpg",
    productSlug: "i-am-free",
  },
];

export function getDesignStoryBySlug(slug: string) {
  return DESIGN_STORIES.find((story) => story.slug === slug) ?? null;
}

export function getDesignStoryByProductSlug(slug: string | null | undefined) {
  return DESIGN_STORIES.find((story) => story.productSlug === slug) ?? null;
}

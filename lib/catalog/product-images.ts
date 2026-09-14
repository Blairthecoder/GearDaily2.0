import type { WixProduct } from "@/types/wix";

export type ResolvedProductImage = {
  url: string;
  altText: string;
};

type FallbackImage = {
  url: string;
  keys: string[];
};

const FALLBACK_IMAGES: FallbackImage[] = [
  {
    url: "/products/i-am-free-front-back.jpg",
    keys: ["i-am-free-front-back", "i am free front & back", "i am free front and back"],
  },
  {
    url: "/products/the-armor.jpg",
    keys: ["g-e-a-r-the-armor-t-shirt", "g.e.a.r. the armor t-shirt", "gear the armor t-shirt", "the armor"],
  },
  {
    url: "/products/black-lettering-dad-hat.jpg",
    keys: ["black-lettering-dad-hat", "black lettering dad hat"],
  },
  {
    url: "/products/red-lettering-dad-hat.jpg",
    keys: ["red-lettering-dad-hat", "red lettering dad hat"],
  },
  {
    url: "/products/gear-hoodie.jpg",
    keys: ["gear-hoodie", "gear hoodie"],
  },
  {
    url: "/products/gear-fleece-sweatpants.jpg",
    keys: ["gear-fleece-sweatpants", "gear fleece sweatpants"],
  },
  {
    url: "/products/orange-embroidered-sweatpants.jpg",
    keys: ["orange-embroidered-sweatpants", "orange embroidered sweatpants"],
  },
  {
    url: "/products/love-is.jpg",
    keys: ["love-is", "love is"],
  },
  {
    url: "/products/trust-god.jpg",
    keys: ["trust-god", "trust god"],
  },
  {
    url: "/products/i-am-free.jpg",
    keys: ["i-am-free", "i am free"],
  },
  {
    url: "/products/make-a-way.jpg",
    keys: ["make-a-way", "make a way"],
  },
  {
    url: "/products/i-carry-a-peace.jpg",
    keys: ["i-carry-a-peace", "i carry a peace"],
  },
  {
    url: "/products/jesus-woke.jpg",
    keys: ["jesus-woke", "jesus woke"],
  },
  {
    url: "/products/god-is-enough.jpg",
    keys: ["god-is-enough", "god is enough"],
  },
  {
    url: "/products/traits-of-man.jpg",
    keys: ["traits-of-man", "traits of man"],
  },
  {
    url: "/products/orange-brand-sweat-pants.jpg",
    keys: [
      "orange-brand-sweat-pants-unisex",
      "orange brand sweat pants - unisex",
      "orange brand sweatpants - unisex",
      "orange brand sweat pants",
    ],
  },
  {
    url: "/products/carrying-a-peace.jpg",
    keys: ["carrying-a-peace", "carrying a peace - unisex", "carrying a peace"],
  },
  {
    url: "/products/im-to-die-for.jpg",
    keys: ["im-to-die-for", "im to die for", "i'm to die for"],
  },
  {
    url: "/products/traits-of-woman.jpg",
    keys: ["woman", "traits-of-woman", "traits of woman"],
  },
  {
    url: "/products/imperturbable.jpg",
    keys: ["imperturbable"],
  },
  {
    url: "/products/womens-blessings.jpg",
    keys: ["womens-blessings", "womens blessings", "women's blessings"],
  },
];

function normalizeKey(value: string | null | undefined): string {
  return (value ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const FALLBACK_BY_KEY = new Map<string, string>();
for (const image of FALLBACK_IMAGES) {
  for (const key of image.keys) {
    FALLBACK_BY_KEY.set(normalizeKey(key), image.url);
  }
}

/**
 * Prefer the current Wix product media. Older GearDaily catalog entries can
 * arrive through the Headless API without a main image, so fall back to the
 * verified product mockup matched by the live catalog's name/slug.
 */
export function getProductImage(
  product: WixProduct | null | undefined,
): ResolvedProductImage | null {
  if (!product) return null;

  const wixImage = product.media?.mainMedia?.image;
  if (wixImage?.url) {
    return {
      url: wixImage.url,
      altText: wixImage.altText || product.name || "GearDaily product",
    };
  }

  const fallbackUrl = [product.slug, product.name]
    .map(normalizeKey)
    .map((key) => FALLBACK_BY_KEY.get(key))
    .find(Boolean);

  return fallbackUrl
    ? {
        url: fallbackUrl,
        altText: product.name || "GearDaily product",
      }
    : null;
}

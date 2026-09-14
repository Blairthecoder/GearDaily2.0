import Image from "next/image";
import Link from "next/link";
import { getProductImage } from "@/lib/catalog/product-images";
import type { WixProduct } from "@/types/wix";

const TILES = [
  { label: "Shop Men", sub: "New drops", href: "/men" },
  { label: "Shop Women", sub: "New drops", href: "/women" },
  { label: "New Arrivals", sub: "Just landed", href: "/new-arrivals" },
];

export function PromoTiles({ products = [] }: { products?: WixProduct[] }) {
  return (
    <section className="container-content grid gap-4 py-10 sm:grid-cols-3">
      {TILES.map((tile, i) => {
        const image = getProductImage(products[i]);
        return (
          <Link
            key={tile.href}
            href={tile.href}
            className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden bg-canvas p-6"
          >
            {image?.url && (
              <>
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
              </>
            )}
            <div className="relative z-10">
              <p className="eyebrow">{tile.sub}</p>
              <p className={`mt-1 font-display text-2xl ${image?.url ? "text-paper" : "text-ink"}`}>
                {tile.label}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

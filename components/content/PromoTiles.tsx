import Link from "next/link";

const TILES = [
  { label: "Shop Men", sub: "New drops", href: "/men" },
  { label: "Shop Women", sub: "New drops", href: "/women" },
  { label: "New Arrivals", sub: "Just landed", href: "/new-arrivals" },
];

export function PromoTiles() {
  return (
    <section className="container-content grid gap-4 py-10 sm:grid-cols-3">
      {TILES.map((tile) => (
        <Link
          key={tile.href}
          href={tile.href}
          className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden bg-canvas p-6"
        >
          <p className="eyebrow">{tile.sub}</p>
          <p className="mt-1 font-display text-2xl">{tile.label}</p>
        </Link>
      ))}
    </section>
  );
}

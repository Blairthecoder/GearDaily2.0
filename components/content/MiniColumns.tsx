import Image from "next/image";
import Link from "next/link";
import type { WixProduct } from "@/types/wix";

function MiniList({ title, products }: { title: string; products: WixProduct[] }) {
  return (
    <div>
      <p className="eyebrow border-b border-line pb-3">{title}</p>
      <ul className="mt-4 space-y-4">
        {products.slice(0, 2).map((product) => {
          const image = product.media?.mainMedia?.image;
          return (
          <li key={product._id}>
            <Link href={`/products/${product.slug}`} className="flex items-center gap-3 group">
              <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden bg-canvas">
                {image?.url && (
                  <Image src={image.url} alt="" fill sizes="56px" className="object-cover" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium group-hover:text-gold">{product.name}</p>
                <p className="mt-1 text-sm text-ink/60">
                  {product.priceData?.formatted?.price}
                </p>
              </div>
            </Link>
          </li>
          );
        })}
        {products.length === 0 && (
          <li className="text-sm text-ink/40">Coming soon</li>
        )}
      </ul>
    </div>
  );
}

export function MiniColumns({ products }: { products: WixProduct[] }) {
  const columns = [
    { title: "New Arrivals", href: "/new-arrivals" },
    { title: "Best Sellers", href: "/best-sellers" },
    { title: "Behind the Design", href: "/behind-the-design" },
    { title: "Shop by Message", href: "/collections" },
  ];

  return (
    <section className="container-content grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((col, i) => (
        <MiniList
          key={col.title}
          title={col.title}
          products={products.slice(i * 2, i * 2 + 2)}
        />
      ))}
    </section>
  );
}

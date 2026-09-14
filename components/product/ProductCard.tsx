import Image from "next/image";
import Link from "next/link";
import { getProductImage } from "@/lib/catalog/product-images";
import type { WixProduct } from "@/types/wix";

export function ProductCard({ product }: { product: WixProduct }) {
  const image = getProductImage(product);
  const price = product.priceData?.formatted?.price;
  const salePrice = product.priceData?.formatted?.discountedPrice;
  const onSale = salePrice && salePrice !== price;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
        {onSale && <span className="badge-sale">Sale</span>}
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.altText || product.name || "GearDaily product"}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/30 text-sm">
            Image coming soon
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <div className="text-sm">
          {onSale ? (
            <>
              <span className="text-rust font-semibold">{salePrice}</span>{" "}
              <span className="text-ink/40 line-through">{price}</span>
            </>
          ) : (
            <span>{price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

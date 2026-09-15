import Image from "next/image";
import Link from "next/link";
import { getProductImages } from "@/lib/catalog/product-images";
import type { WixProduct } from "@/types/wix";

export function ProductCard({ product }: { product: WixProduct }) {
  const images = getProductImages(product);
  const image = images[0];
  const alternateImage = images[1];
  const price = product.priceData?.formatted?.price;
  const salePrice = product.priceData?.formatted?.discountedPrice;
  const onSale = salePrice && salePrice !== price;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-canvas">
        {onSale && <span className="badge-sale">Sale</span>}
        {!onSale && product.ribbon && <span className="badge-ribbon">{product.ribbon}</span>}
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.altText || product.name || "GearDaily product"}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={`object-cover transition-all duration-500 ${
              alternateImage ? "group-hover:opacity-0" : "group-hover:scale-105"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/30 text-sm">
            Image coming soon
          </div>
        )}
        {alternateImage && (
          <Image
            src={alternateImage.url}
            alt={`${product.name || "GearDaily product"} alternate view`}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover opacity-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium">{product.name}</h3>
          {getColorCount(product) > 1 && (
            <p className="mt-1 text-xs text-ink/50">{getColorCount(product)} colors</p>
          )}
        </div>
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

function getColorCount(product: WixProduct) {
  const colorOption = product.productOptions?.find(
    (option) => option.optionType === "color" || option.name?.toLowerCase() === "color"
  );
  return colorOption?.choices?.filter((choice) => choice.visible !== false).length ?? 0;
}

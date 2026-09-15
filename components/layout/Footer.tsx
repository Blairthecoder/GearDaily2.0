import Image from "next/image";
import Link from "next/link";
import { getProductImage } from "@/lib/catalog/product-images";
import { getAllProducts } from "@/lib/wix/products";
import type { WixProduct } from "@/types/wix";

const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL ?? "https://www.geardaily.com/blog";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Men", href: "/shop?category=men" },
      { label: "Women", href: "/shop?category=women" },
      { label: "Best Sellers", href: "/best-sellers" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Behind the Design", href: "/behind-the-design" },
      { label: "G.E.A.R.ed 4 Gain", href: "/geared-4-gain" },
      { label: "Blog", href: BLOG_URL },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "Discover"];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/geardailyr122/", icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/geardaily", icon: FacebookIcon },
];

export async function Footer() {
  let products: WixProduct[] = [];
  try {
    products = await getAllProducts(4);
  } catch {
    products = [];
  }

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="container-content grid grid-cols-2 gap-2 border-b border-paper/10 py-6 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => {
          const image = getProductImage(products[i]);
          return (
            <Link
              key={products[i]?._id ?? i}
              href={products[i]?.slug ? `/products/${products[i]!.slug}` : "/shop"}
              className="relative aspect-square overflow-hidden bg-paper/5"
            >
              {image?.url ? (
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="container-content py-12 grid grid-cols-2 gap-8 lg:grid-cols-5">
        <div className="col-span-2">
          <p className="font-display text-xl">G.E.A.R.</p>
          <p className="mt-2 max-w-xs text-sm text-paper/70">
            Get Edified And Refreshed. Faith-driven apparel rooted in Scripture,
            designed to encourage, strengthen, and start conversations.
          </p>
          <div className="mt-4 flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-paper/70 transition-colors hover:text-gold"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              {col.title}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-paper/80 hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-paper/10">
        <div className="container-content flex flex-col gap-3 py-4 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} GearDaily. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
          <div className="flex gap-2 text-paper/70">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="rounded border border-paper/20 px-2 py-1 text-[10px] uppercase tracking-wide"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M15 8.5h1.5V5.5H15c-1.9 0-3.5 1.6-3.5 3.5v1.5H9.5V13H11.5v7H14.5v-7h1.9l.4-2.5H14.5V9.2c0-.5.3-.7.5-.7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

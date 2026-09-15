"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const PRIMARY_NAV = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Behind the Design", href: "/behind-the-design" },
  { label: "Journal", href: "/journal" },
  { label: "Our Story", href: "/about" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <div className="hidden border-b border-line bg-ink text-paper/80 lg:block">
        <div className="container-content flex h-9 items-center justify-between text-xs">
          <p className="uppercase tracking-wide">
            Free shipping on U.S. orders over $75
          </p>
          <div className="flex items-center gap-6">
            <Link href="/geared-4-gain" className="hover:text-gold">
              G.E.A.R.ed 4 Gain
            </Link>
            <Link href="/faq" className="hover:text-gold">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-gold">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-paper/95 backdrop-blur">
        <div className="container-content flex h-16 items-center justify-between lg:h-20">
          <button
            type="button"
            className="p-2 -ml-2 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-ink mb-1.5" />
            <span className="block h-0.5 w-6 bg-ink mb-1.5" />
            <span className="block h-0.5 w-6 bg-ink" />
          </button>

          <Link href="/" className="flex flex-col items-center leading-none">
            <Image
              src="/brand/logo.png"
              alt="G.E.A.R."
              width={1695}
              height={574}
              priority
              className="h-8 w-auto lg:h-10"
            />
            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/50">
              Get Edified And Refreshed
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wide">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b-2 border-transparent pb-1 transition-colors hover:border-gold hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/search" aria-label="Search" className="p-2">
              <SearchIcon />
            </Link>
            <button
              type="button"
              aria-label={`Cart, ${itemCount} items`}
              onClick={openDrawer}
              className="relative p-2"
            >
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ink">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-nav"
            className="lg:hidden border-t border-line bg-paper px-4 py-4"
          >
            <ul className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wide">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M9 8V6a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

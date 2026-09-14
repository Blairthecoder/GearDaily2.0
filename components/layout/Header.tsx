"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const PRIMARY_NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Shop by Message", href: "/collections" },
  { label: "Behind the Design", href: "/behind-the-design" },
  { label: "Our Story", href: "/about" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
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

        <Link href="/" className="font-display text-xl tracking-wide">
          G.E.A.R.
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {PRIMARY_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-rust">
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
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rust text-[10px] text-paper">
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
          <ul className="flex flex-col gap-4 text-base">
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

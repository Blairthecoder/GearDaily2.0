import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Men", href: "/men" },
      { label: "Women", href: "/women" },
      { label: "Best Sellers", href: "/best-sellers" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Behind the Design", href: "/behind-the-design" },
      { label: "G.E.A.R.ed 4 Gain", href: "/geared-4-gain" },
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

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="container-content grid gap-6 border-b border-paper/10 py-6 sm:grid-cols-4 sm:gap-2">
        {["Behind the Design", "Best Sellers", "New Arrivals", "Shop by Message"].map(
          (label, i) => (
            <div
              key={label}
              className="aspect-square bg-paper/5"
              style={{ opacity: 0.6 + i * 0.1 }}
              aria-hidden="true"
            />
          ),
        )}
      </div>

      <div className="container-content py-12 grid grid-cols-2 gap-8 lg:grid-cols-5">
        <div className="col-span-2">
          <p className="font-display text-xl">G.E.A.R.</p>
          <p className="mt-2 max-w-xs text-sm text-paper/70">
            Get Edified And Refreshed. Faith-driven apparel rooted in Scripture,
            designed to encourage, strengthen, and start conversations.
          </p>
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

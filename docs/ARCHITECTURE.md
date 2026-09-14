# Architecture

## Data flow

```
Frontend (Next.js)
  → @wix/sdk client (lib/wix/client.ts)
    → @wix/stores    → products, collections
    → @wix/ecom      → cart (currentCart), checkout creation
    → @wix/redirects → Wix-hosted checkout URL
  → Wix commerce backend
    → orders, payments, inventory, fulfillment (owned entirely by Wix)
```

## Auth model

Visitor-only OAuth (`OAuthStrategy`). Tokens are generated client-side on
first cart interaction and persisted in a cookie (`wixVisitorTokens`) so the
cart survives reloads. No client secret is used or exposed — this app only
performs visitor-level catalog reads and cart/checkout writes.

## Rendering strategy

- Catalog pages (home, shop, collections, product) are server components
  that read from Wix directly — no client-side data fetching waterfall.
- Cart, add-to-cart, and checkout are client components (`"use client"`)
  since they need visitor session state and mutation.
- Editorial ("Behind the Design") content lives in
  `lib/content/behind-the-design.ts` as static data — it's not commerce
  data and doesn't belong in Wix Stores.

## Directory structure

```
app/                      routes (App Router)
  products/[slug]/        product detail page
  collections/[slug]/     message-based collection pages
  behind-the-design/      editorial index + detail
components/
  layout/                 Header, Footer
  product/                ProductCard, AddToCartForm
  collection/             ProductGrid
  cart/                   CartDrawer, CartPageClient
  content/                homepage sections (ShopByMessage, FeaturedDesignStory, EmailSignup)
  seo/                    JsonLd
lib/
  wix/                    Wix SDK client + query/mutation helpers
  content/                editorial data
  seo/                    JSON-LD builders
types/                    shared TS types
```

## Error handling

Every server-side Wix read is wrapped in try/catch at the call site and
falls back to an empty state (`ProductGrid`'s `emptyMessage`) rather than
throwing — a Wix outage degrades the page instead of crashing it. Client
mutations (add to cart, checkout) surface an inline error message rather
than an unhandled rejection or raw SDK error.

## What's intentionally not built yet

- Member accounts (`/account`) — guest checkout only for V1.
- Real product filtering (size/color/price) — needs live Wix product shape
  to design correctly; add once real catalog data is connected.
- Redirect map for URL migration — see `docs/LAUNCH-CHECKLIST.md`, built
  once the live Wix site is crawled.

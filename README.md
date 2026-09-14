# GearDaily 2.0

Custom ecommerce storefront for GearDaily — a faith-driven Christian
lifestyle apparel brand. This is a **headless Wix storefront**: Wix remains
the commerce backend (products, inventory, cart, checkout, orders); this app
is the custom frontend.

## Architecture

```
GearDaily.com → Next.js frontend → Wix Headless SDK → Wix commerce backend
```

- Products, pricing, inventory, and orders are managed entirely in Wix.
- The frontend controls branding, navigation, merchandising, storytelling,
  SEO, and conversion optimization.
- Checkout hands off to Wix-hosted checkout via `@wix/redirects`.

See `docs/ARCHITECTURE.md` for details.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS (custom design tokens — see `tailwind.config.ts`)
- `@wix/sdk`, `@wix/stores`, `@wix/ecom`, `@wix/redirects`
- Deployment: Netlify (staging first, production later)

## Local Development

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_WIX_CLIENT_ID
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WIX_CLIENT_ID` | Wix Headless OAuth client ID for the `GearDaily2.0` headless project (Wix Dashboard → Settings → Headless Settings). Public — visitor auth only, never the client secret. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for metadata, sitemap, canonicals. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID (optional). |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console verification token (optional). |

Never commit `.env.local`. Never add the Wix client secret to this project —
visitor/member ecommerce flows only need the client ID.

## Wix Integration

- `lib/wix/client.ts` — SDK client + visitor session management (cookie-persisted tokens).
- `lib/wix/products.ts` — product/collection reads (`@wix/stores`).
- `lib/wix/cart.ts` — cart mutations and Wix-hosted checkout handoff (`@wix/ecom`, `@wix/redirects`).

The Wix owner continues managing products, pricing, variants, inventory,
images, orders, and discounts inside Wix — nothing is hard-coded here.

## Staging Deployment

Deploy this repo to Netlify (e.g. `geardaily2.netlify.app`). Add that domain
to **Wix → Settings → Headless Settings → GearDaily2.0 → Allowed Redirect
Domains** so checkout redirects succeed. Do not touch GearDaily.com DNS
during development — the live Wix site stays untouched until launch.

## Production Launch

See `docs/LAUNCH-CHECKLIST.md`. Production migration (DNS cutover) is a
manual, approved step — never automated.

## Known Limitations (V1)

- Gender/category collection filtering (`/men`, `/women`) currently shows
  all products — needs mapping to real Wix collections once the store
  owner tags products accordingly.
- Member accounts are out of scope for V1 (guest checkout only).
- "Behind the Design" editorial content (`lib/content/behind-the-design.ts`)
  is placeholder copy — replace with the client's actual story content.
- No real customer reviews are wired up; review/rating schema is
  intentionally omitted until real review data exists.

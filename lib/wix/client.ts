import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { cart, checkout, currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";

const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;

if (!clientId) {
  throw new Error(
    "NEXT_PUBLIC_WIX_CLIENT_ID is not set. Add it to .env.local — see .env.example."
  );
}

/**
 * Single Wix Headless client for the GearDaily2.0 headless project.
 * Visitor auth only — never import the client secret here or on the client.
 */
export const wixClient = createClient({
  modules: { products, collections, cart, checkout, currentCart, redirects },
  auth: OAuthStrategy({ clientId }),
});

const VISITOR_TOKENS_COOKIE = "wixVisitorTokens";

/**
 * Ensures the browser has a Wix visitor session, persisting tokens in a cookie
 * so the cart survives across page loads. Call once on the client before
 * any cart/checkout mutation.
 */
export async function ensureVisitorTokens() {
  if (typeof document === "undefined") return;

  const existing = readCookie(VISITOR_TOKENS_COOKIE);
  if (existing) {
    try {
      wixClient.auth.setTokens(JSON.parse(existing));
      return;
    } catch {
      // fall through and re-generate
    }
  }

  const tokens = await wixClient.auth.generateVisitorTokens();
  wixClient.auth.setTokens(tokens);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${VISITOR_TOKENS_COOKIE}=${encodeURIComponent(
    JSON.stringify(tokens)
  )}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax${secure}`;
}

function readCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

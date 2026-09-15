import { wixClient, ensureVisitorTokens } from "./client";

/** Client-side cart operations. Every call ensures a visitor session first. */

export async function getCurrentCart() {
  await ensureVisitorTokens();
  try {
    return await wixClient.currentCart.getCurrentCart();
  } catch {
    return null;
  }
}

export async function addToCart(
  catalogItemId: string,
  quantity: number,
  selectedOptions?: Record<string, string>,
  variantId?: string
) {
  await ensureVisitorTokens();
  const catalogOptions = variantId
    ? { variantId }
    : selectedOptions
      ? { options: selectedOptions }
      : undefined;

  return wixClient.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e", // Wix Stores catalog app
          catalogItemId,
          options: catalogOptions,
        },
        quantity,
      },
    ],
  });
}

export async function updateLineItemQuantity(lineItemId: string, quantity: number) {
  await ensureVisitorTokens();
  return wixClient.currentCart.updateCurrentCartLineItemQuantity([
    { _id: lineItemId, quantity },
  ]);
}

export async function removeLineItem(lineItemId: string) {
  await ensureVisitorTokens();
  return wixClient.currentCart.removeLineItemsFromCurrentCart([lineItemId]);
}

/** Creates a Wix-hosted checkout from the current cart and returns the redirect URL. */
export async function createCheckoutUrl(returnUrl: string) {
  await ensureVisitorTokens();
  const { checkoutId } = await wixClient.currentCart.createCheckoutFromCurrentCart({
    channelType: "WEB" as const,
  });

  const { redirectSession } = await wixClient.redirects.createRedirectSession({
    ecomCheckout: { checkoutId },
    callbacks: { postFlowUrl: returnUrl },
  });

  return redirectSession?.fullUrl ?? null;
}

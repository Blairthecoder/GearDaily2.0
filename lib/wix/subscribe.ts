import { wixClient, ensureVisitorTokens } from "./client";

/**
 * Submits an email signup to Wix Contacts (CRM). The contact lands in the
 * same Contacts list the Wix Blog and Wix Email Marketing use, tagged with
 * the "newsletter" label so it can be segmented into a campaign/automation
 * on the Wix side (e.g. new devotion posts, discount codes).
 *
 * The "custom.newsletter" label key must exist in Wix Contacts (Contacts >
 * Manage Labels) for the tag to stick — if it doesn't exist yet, Wix
 * silently drops the label but still creates/updates the contact.
 */
export async function subscribeToNewsletter(email: string) {
  await ensureVisitorTokens();
  return wixClient.submittedContact.appendOrCreateContact({
    info: {
      emails: { items: [{ email, tag: "MAIN" }] },
      labelKeys: { items: ["custom.newsletter"] },
    },
    passThroughData: JSON.stringify({ source: "site-newsletter-signup" }),
  });
}

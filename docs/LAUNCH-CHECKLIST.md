# Launch Checklist

Do not perform production migration automatically. This is a manual,
approved process.

1. [ ] Finish and QA the staging site (desktop + mobile + tablet).
2. [ ] Verify Wix Headless integration: products, collections, cart,
       checkout all load real data from the existing GearDaily Wix catalog.
3. [ ] Complete a full test purchase through Wix checkout in test mode.
4. [ ] Confirm GA4, Search Console, and Meta Pixel are firing correctly
       (view_item, add_to_cart, begin_checkout, purchase).
5. [ ] Crawl the live Wix site (`https://www.geardaily.com`) and record
       every indexed URL.
6. [ ] Build the old → new URL redirect map (`docs/REDIRECT-MAP.md`) —
       never mass-redirect unrelated pages to the homepage.
7. [ ] Save current page titles/meta descriptions from the live site for
       reference during content parity checks.
8. [ ] Add the production domain(s) to Wix → Settings → Headless Settings
       → GearDaily2.0 → Allowed Redirect Domains.
9. [ ] Configure production environment variables in Netlify.
10. [ ] Deploy the production frontend to Netlify (still on a Netlify
        subdomain, DNS not yet switched).
11. [ ] Get explicit approval before changing GearDaily.com DNS.
12. [ ] Update DNS/domain routing.
13. [ ] Verify SSL certificate on the production domain.
14. [ ] Verify canonical URLs point to the production domain.
15. [ ] Verify all redirects from the redirect map return 301s correctly.
16. [ ] Submit the new sitemap to Google Search Console.
17. [ ] Run a final test purchase against production.
18. [ ] Monitor Search Console, GA4, and Wix Orders closely for the first
        1-2 weeks post-launch.

Never take the live Wix storefront offline before this checklist is complete.

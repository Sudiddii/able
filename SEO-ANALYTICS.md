# SEO and analytics implementation

Last audited: 26 September 2026  
Current canonical origin: `https://able-sooty.vercel.app/`

## Current implementation

The site is a five-page static website. Each page has one H1, a unique title and description, an absolute canonical, Open Graph and Twitter metadata, `index,follow,max-image-preview:large`, and a shared Vercel OG image. The sitemap contains only the five canonical pages. `robots.txt` allows the public site and excludes local QA output. Vercel redirects `/index.html` to `/`.

Page search intent:

- Home: product sourcing, product development, resin and ceramic manufacturing, OEM/ODM, and commerce support.
- Products: decorative products and collectibles, tabletop, lighting, wall décor, bath storage, garden planters, aquarium/reptile décor, and seasonal gifting.
- Manufacturing: resin and ceramic product development, moulding, finishing, quality control, packaging, and export preparation.
- Commerce AI: commerce automation, AI operations, content workflows, and sales/service systems for importers, distributors, manufacturers, and ecommerce teams.
- Privacy: policy information only; it does not target commercial search terms.

Structured data uses one consistent `Organization` entity on every page. Home also uses `WebSite` and an eight-category `ItemList`; Products uses `CollectionPage` with an eight-category `ItemList`; other pages use `WebPage`. No Product, Offer, Review, rating, FAQ, certification, capacity, or customer claims are emitted.

## Analytics integration

`analytics-config.js` is the only analytics configuration file. Both IDs are intentionally blank:

```js
window.ABLE_ANALYTICS_CONFIG = {
  ga4MeasurementId: '',
  gtmContainerId: '',
  consentRequired: true,
  debug: false
};
```

Add **one** real ID. If both are entered, GTM takes precedence so GA4 is not loaded twice. With no valid ID, `analytics.js` makes no analytics network request, creates no analytics cookie, and does not add production events to `dataLayer`.

The implementation uses one guarded module, one delegated click listener, and per-form `WeakSet` guards. GA4 is configured with `send_page_view: false`; the module sends one explicit `page_view`, preventing an automatic/manual duplicate. GTM receives the same custom event contract through `dataLayer`.

## Event dictionary

All names use lowercase snake_case. Parameters are allowlisted in code. Attribution fields may be added: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `gclid`.

| Event | Trigger | Parameters |
|---|---|---|
| `page_view` | Once after the configured provider is allowed to start | `page_type`, `page_path`, `page_title`, `business_stream` |
| `navigation_click` | Non-CTA internal or external navigation click | `link_text`, `destination_path`, `nav_location`, `page_type` |
| `cta_click` | Element with a stable `data-analytics-id` | `cta_id`, `cta_text`, `cta_location`, `destination_path` or `destination_anchor`, `business_stream`, `page_type` |
| `product_category_view` | User clicks a category card/link, changes the category selector, or opens a category URL | `category_id`, `category_name`, `page_type` |
| `product_direction_cta_click` | User starts a brief from the Products direction builder | `category_id`, `cta_id`, `business_stream`, `page_type` |
| `manufacturing_stage_view` | After user scrolls/keys/drags the production rail or uses its controls; each stage once per page session | `stage_id`, `stage_name`, `stage_index`, `page_type` |
| `commerce_service_view` | User selects a Commerce AI workflow, expands a case, or opens the workflow diagnostic | `service_id`, `service_name`, `content_type`, `page_type`, `business_stream` |
| `contact_click` | Email or telephone link click; the address/number is never included | `contact_type`, `contact_location`, `page_type` |
| `form_view` | A form first reaches 20% visibility; once per form per page load | `form_id`, `form_type`, `page_type`, `business_stream`, `form_location` |
| `form_start` | First interaction with a valid field; once per form per page load | same common form parameters |
| `form_submit_attempt` | Front-end validation passes and the request is about to start | same common form parameters |
| `form_submit_success` | FormSubmit explicitly returns success | same common form parameters |
| `form_submit_error` | Network or endpoint failure | common form parameters plus `error_type` |

Stable product category IDs:

- `decorative_collectibles`
- `kitchen_tabletop_entertaining`
- `lighting_candles_ambience`
- `wall_decor_mirrors_display`
- `bath_storage_organisation`
- `garden_decor_planters`
- `aquarium_reptile_decor`
- `seasonal_gifting_celebrations`

Recommended GA4 conversions:

- Primary: `form_submit_success`
- Optional secondary: `contact_click`

## TRADE and TECH form funnel

The homepage full form and non-technology Ask Able topics use `form_type: trade`. The Commerce AI full form and Commerce AI Ask Able topic use `form_type: tech`. Attempt, success, and error events originate inside the shared `AbleEnquiry.send` request path, so a button click cannot create a false success event. Invalid forms do not create a submit-attempt or success event.

## UTM attribution

The analytics module accepts `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `gclid`. It stores first-touch and latest-touch values in `sessionStorage` under `able_attribution_v1`. The data expires when the browser session ends and can be cleared by removing that session-storage key. Parameters are not appended to internal links.

Enquiry emails retain the latest attribution fields and compatible first-touch fields. Analytics events receive only the allowlisted campaign values.

## PII prohibition

Analytics must never receive or log:

- name;
- email address;
- telephone number;
- company or brand name;
- website entered in a form;
- project description, workflow description, budget text, or message;
- attachment names or form field values.

`analytics.js` uses a per-event parameter allowlist. Contact events contain only `email` or `phone` as a type; they never contain the actual address or number. Debug events remain in memory and are not printed to the console.

## UK/EU consent

A real GA4 or GTM ID activates a consent-aware flow. Until the user chooses **Accept analytics**, no analytics provider is loaded. **Reject non-essential** leaves all core site and enquiry features working. Consent is saved in `localStorage` under `able_analytics_consent_v1`. The Privacy page exposes “Review analytics choices” whenever a provider is configured.

GA4 defaults advertising storage, ad user data, and ad personalisation to denied. Google Signals, ad personalisation, and remarketing are disabled. With both IDs blank, no consent banner appears because no non-essential analytics runs.

## Search Console

No real Search Console verification token exists in the repository. Do not add a placeholder meta token. To configure it:

1. Add the current Vercel URL-prefix property in Search Console, or verify a future production domain as a Domain Property through DNS.
2. For URL-prefix HTML verification, place the real `google-site-verification` meta tag at the marked `SEARCH_CONSOLE_VERIFICATION` location in `index.html`.
3. Submit `https://able-sooty.vercel.app/sitemap.xml`.
4. Inspect `/`, `/products.html`, `/manufacturing.html`, `/commerce-ai.html`, and `/privacy.html` and confirm the selected canonical.
5. After launch on a permanent domain, create/verify the Domain Property, replace every Vercel canonical/OG/schema/sitemap URL, submit the new sitemap, and request re-indexing.

Public checks on 26 September 2026 returned HTTP 200 for all five live pages, `robots.txt`, and `sitemap.xml`. The live markup did not expose a Search Console HTML verification token. Search Console property ownership, indexing coverage, submitted-sitemap status, and inspection results are private account data and cannot be confirmed from the public site.

## Validation

Local event inspection is available only on localhost with `?analytics_debug=1`. In the browser console, call:

```js
AbleAnalytics.getDebugEvents()
AbleAnalytics.getAttributionRecord()
```

These methods return allowlisted, non-PII data and do not print automatically. For GA4, use DebugView after entering a real ID and granting analytics consent. For GTM, use Preview mode and confirm one event per interaction. Test form success/error by intercepting `https://formsubmit.co/**`; do not send a real QA enquiry.

The 26 September 2026 local QA run used an intercepted FormSubmit request and made no real enquiry. It confirmed:

- one `page_view`, CTA, category and form event per simulated interaction;
- invalid forms produce no submit-attempt event;
- success produces one attempt and one success, while an endpoint failure produces one attempt and one error;
- test name, email and project text do not appear in analytics events;
- UTM and `gclid` values persist into the intercepted enquiry payload;
- no GA/GTM network request, analytics cookie or consent banner appears while IDs are blank;
- all five pages have one H1 and no horizontal overflow at 360, 390, 768, 1024 and 1440 pixels;
- the mobile menu opens at narrow widths and is hidden at laptop width;
- image alternative text, form labels and button accessible names are present; decorative images use empty alt text with `aria-hidden`;
- below-the-fold photographic content uses lazy loading, while hero media remains immediately loadable.

## Required owner actions

- Provide either a real GA4 Measurement ID or GTM Container ID.
- Provide the real Search Console verification method/token.
- Confirm FormSubmit delivery once with an approved live enquiry after deployment.
- Review the Privacy Policy with the organisation's legal adviser.
- Replace the Vercel origin everywhere when the permanent domain is chosen.

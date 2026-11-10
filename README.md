# AURA — Pakistan's Earbuds Store

A complete, modern online store for earbuds, designed like the Apple Store and built for Pakistani buyers.

**Live stack:** Next.js (App Router, JavaScript) · frontend-only with local mock data · cart and orders in `localStorage` · no database, no secrets, no environment variables.

## What is inside

- **Home** — hero product, trust strip, shop-by-budget tiles, best sellers, shop-by-use-case, featured product story band, reviews, "why not a marketplace", accessories, FAQ
- **Shop** — filters by use case (ANC / Gaming / Calls / Sport / Bass / Music), price-band filters, search and 5 sort orders
- **Product pages (12)** — sticky buy sub-nav, colour picker that re-renders the product, 4-icon spec strip, installment line, bundle add-ons, WhatsApp ordering, scroll-story feature chapters (giant stat per screen), family comparison table, full spec table with lab footnotes, verified reviews, sticky mobile buy bar
- **Compare** — all 12 models side by side with honest dashes for missing features
- **Cart drawer** — slide-out bag with free-delivery progress bar and WhatsApp checkout
- **Checkout** — Pakistani address form with 03XXXXXXXXX phone validation, COD / JazzCash / Easypaisa / card / bank transfer, order confirmation with order ID
- **Track Order** — looks up orders placed on the device
- **Support** — warranty steps, delivery-by-city, 10 FAQs

## Pakistan-first by design

PKR pricing with anchor discounts, Cash on Delivery as the hero promise, free delivery over Rs 5,000 (flat Rs 250 below), TCS / Leopards delivery times by city tier, JazzCash & Easypaisa, credit-card installments shown per product, 1-year warranty + 7-day replacement, floating WhatsApp button, Roman-Urdu touches in reviews and microcopy.

## Run it

```bash
npm install
npm run dev    # local dev
npm run build  # production build
npm start      # production server
```

Product visuals are generated SVG renders (see `components/BudVisual.js`), so the store ships with zero image assets and never shows a broken image.

Design research: see `RESEARCH.md` — 30 stores studied.

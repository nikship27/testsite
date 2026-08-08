# Ethnic Threads — Handcrafted Ethnic Fashion Store

A production-ready e-commerce storefront for **Ethnic Threads** (https://ethnicthreads.shop/) — a luxury handcrafted ethnic wear boutique. Built on the **Next.js App Router**, **SQLite + Prisma**, and **Stripe Checkout**, with an amber-and-charcoal artisan aesthetic, multi-currency pricing (INR/GBP/USD), an occasion-based catalog (Fabiken: clothing, outfits/pieces and accessories vs. sarees), WhatsApp ordering, a size & custom-stitching guide, and an integrated Google Business Profile section.

## Tech Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript, Turbopack)        |
| UI         | React 19, Tailwind CSS v4, glassmorphism + dark mode  |
| Database   | SQLite via Prisma ORM 7 (`better-sqlite3` adapter)    |
| Payments   | Stripe Checkout (default INR) + webhooks              |
| State      | React Context (Cart + Theme + Currency) + localStorage |
| Directory  | Google Business Profile: https://share.google/tYb9P3DsNjLZYdsXX |

## Features

- **Catalog**: 8 handcrafted products across 5 categories — Sarees, Kurtas & Sets, Lehengas, Dupattas, Jewelry & Accessories.
- **Occasion tabs**: filter by occasion — Bridal & Wedding, Festive Celebrations, Casual & Office, Gifting & Accessories (server-side via `?occasion=`).
- **Multi-currency pricing**: prices stored as whole rupees (₹); `CurrencyContext` converts via static rates and formats with `Intl.NumberFormat` (INR / USD / GBP), switchable from the header.
- **Product details modal**: size selector (S, M, L, XL, XXL / One Size), fabric & care badges, quantity stepper, quick-add with remembered size, out-of-stock handling.
- **Size & Custom Stitching Guide modal**: size charts and guidance for custom stitching, fabric & care info.
- **WhatsApp ordering**: floating button that opens `wa.me` with a pre-filled cart/message summary (number is a placeholder — see notes below).
- **Search & filters**: server-side search (`q`), category (`category`) and occasion (`occasion`) via URL query params.
- **Cart**: slide-over drawer with per-size quantity adjusters, subtotal, and localStorage persistence.
- **Checkout**: `POST /api/checkout` creates a Stripe Checkout session and writes a `PENDING` order; webhook marks it `COMPLETED` and decrements stock.
- **Success page**: `/success` renders a receipt from the Stripe session + persisted order, including sizes.
- **Store section**: "Visit Our Flagship Store" location card with store timing and directions, plus a reviews section ("4.9 / 5.0 on Google Maps").
- **SEO**: JSON-LD structured data (Organization, WebSite, FAQ) injected in the root layout.
- **Theme**: amber/charcoal luxury palette with manual dark-light toggle and no-flash init.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your Stripe keys:

```bash
cp .env.example .env
```

| Variable                | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `DATABASE_URL`          | `file:./prisma/dev.db` (SQLite file)           |
| `STRIPE_SECRET_KEY`     | Stripe secret key (`sk_test_...`)              |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (`whsec_...`)           |
| `NEXT_PUBLIC_APP_URL`   | Public base URL, e.g. `http://localhost:3000`  |

> The app builds and runs without Stripe keys — checkout returns a clear `503` until they are set.

### 3. Create the database and seed products

```bash
npm run db:migrate   # applies prisma/migrations
npm run db:generate  # generates the Prisma client
npm run db:seed      # inserts the 8 ethnic wear products
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe Webhook (local development)

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed `whsec_...` value into `STRIPE_WEBHOOK_SECRET` in `.env`, then restart the dev server.

## Project Structure

```
prisma/
  schema.prisma        # Product / Order / OrderItem models
  seed.ts              # 8 handcrafted ethnic wear products (Pexels images)
  migrations/          # SQL migrations
src/
  app/
    page.tsx           # Home: hero + filters + grid + reviews + store location
    layout.tsx         # Root layout: providers, header, cart drawer, footer, JSON-LD
    success/page.tsx   # Order confirmation / receipt
    api/
      products/route.ts        # GET  — list + search + category + occasion filter
      products/[id]/route.ts   # GET  — single product
      checkout/route.ts        # POST — Stripe session (INR) + order with sizes
      webhooks/stripe/route.ts # POST — verify + complete order
  components/          # Header, Hero, ProductCard/Grid/Modal, SizeGuideModal,
                       # CartDrawer, CurrencySwitcher, WhatsAppButton,
                       # StoreLocation, CustomerReviews, Footer, icons
  context/             # CartContext, ThemeContext, CurrencyContext
  lib/                 # prisma, stripe, products, format helpers
  generated/prisma/    # Prisma-generated client (do not edit)
```

## API Reference

### `GET /api/products`

Query params: `q` (search), `category`, `occasion`.

```json
{ "products": [{ "id": "...", "title": "...", "price": 12999, "fabric": "Pure Silk · Gold Zari", "sizes": "S,M,L,XL,XXL", "occasion": "Bridal & Wedding", ... }] }
```

### `GET /api/products/:id`

Returns `{ "product": {...} }` or `404`.

### `POST /api/checkout`

```json
{ "items": [{ "productId": "cmsk...", "quantity": 2, "size": "M" }] }
```

Validates stock server-side, creates a Stripe Checkout session (currency `inr`, `unit_amount` in paise) and a `PENDING` order with per-item sizes, then returns `{ "url": "https://checkout.stripe.com/..." }`.

### `POST /api/webhooks/stripe`

Verifies the `stripe-signature`, marks `checkout.session.completed` orders as `COMPLETED`, and decrements product stock in a transaction.

## Database Schema

- **Product**: `id, title, description, price (₹), category, image, stock, fabric, careInstructions, sizes, occasion, createdAt, updatedAt`
- **Order**: `id, totalAmount (₹), status (PENDING/COMPLETED/EXPIRED), stripeSessionId (unique), createdAt`
- **OrderItem**: `id, orderId, productId, quantity, price (₹), size`

## Scripts

| Script               | Description                          |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start the dev server (Turbopack)     |
| `npm run build`      | Production build                     |
| `npm run start`      | Serve the production build           |
| `npm run lint`       | ESLint                               |
| `npm run typecheck`  | TypeScript check (`tsc --noEmit`)    |
| `npm run db:migrate` | Apply Prisma migrations              |
| `npm run db:generate`| Regenerate the Prisma client         |
| `npm run db:seed`    | Seed the database                    |
| `npm run db:studio`  | Open Prisma Studio                   |

## Future Setup Notes

Items left TODO before going live:

1. **WhatsApp number**: `src/components/WhatsAppButton.tsx` uses a placeholder (`919999999999`). Replace with the store's number (country code + digits only). Update the JSON-LD `sameAs` / contact hints in `src/app/layout.tsx` if desired.
2. **Stripe keys**: set real `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET`, and register the webhook endpoint (event: `checkout.session.completed`) in the Stripe dashboard.
3. **Product photography**: swap Pexels placeholder images in `prisma/seed.ts` / `public/images` for studio shots; extend the seed with the full Fabiken line (outfit builder — clothing, pieces, accessories).
4. **Currency rates**: conversion rates live in `src/context/CurrencyContext.tsx` as static numbers — wire them to a nightly job (e.g. `exchangerate-api` or Stripe FX) before enabling multi-currency merchandising.
5. **Google Business Profile / directions link** — confirm the share link (`https://share.google/tYb9P3DsNjLZYdsXX`) points at the real store listing.
6. **Production database**: SQLite is fine for single-node; for horizontal scaling, migrate to Postgres (Prisma supports `provider = "postgresql"`).
7. **Deploy**: set env vars on Vercel/your host, run `npm run db:migrate && npm run db:seed` in a one-shot job, then `npm run build && npm run start`.
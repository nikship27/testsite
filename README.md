# lumina — Modern E-Commerce Storefront

A production-ready e-commerce application built with the **Next.js App Router**, **SQLite + Prisma**, and **Stripe Checkout**. Features a glassmorphic dark/light UI, a persistent cart, live search and category filtering, and a complete order flow from checkout session to confirmed receipt.

## Tech Stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript, Turbopack)      |
| UI         | React 19, Tailwind CSS v4, glassmorphism + dark mode |
| Database   | SQLite via Prisma ORM 7 (`better-sqlite3` adapter)  |
| Payments   | Stripe Checkout + webhooks                          |
| State      | React Context (Cart + Theme) with localStorage      |

## Features

- **Catalog**: product grid with hover zoom, quick-add, stock indicators, and out-of-stock handling.
- **Search & filters**: server-side search (`q`) and category filtering (`category`) via URL query params.
- **Cart**: slide-over drawer with quantity adjusters, subtotal, localStorage persistence, and badge in the header.
- **Checkout**: `POST /api/checkout` creates a Stripe Checkout session; order rows are written on the server.
- **Webhooks**: `POST /api/webhooks/stripe` verifies signatures, marks orders `COMPLETED`, and decrements stock.
- **Success page**: `/success` renders a receipt from the Stripe session + persisted order.
- **Theme**: manual dark/light toggle with system-preference default and no-flash inline init.

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

| Variable                  | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `DATABASE_URL`            | `file:./prisma/dev.db` (SQLite file)             |
| `STRIPE_SECRET_KEY`       | Stripe secret key (`sk_test_...`)                |
| `STRIPE_WEBHOOK_SECRET`   | Webhook signing secret (`whsec_...`)             |
| `NEXT_PUBLIC_APP_URL`     | Public base URL, e.g. `http://localhost:3000`    |

> The app builds and runs without Stripe keys — checkout will return a clear `503` until they are set.

### 3. Create the database and seed products

```bash
npm run db:migrate   # applies prisma/migrations
npm run db:generate  # generates the Prisma client
npm run db:seed      # inserts 8 seeded products
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe Webhook (local development)

Forward Stripe events to your local server so order completion works end-to-end:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed `whsec_...` value into `STRIPE_WEBHOOK_SECRET` in `.env`, then restart the dev server.

## Project Structure

```
prisma/
  schema.prisma        # Product / Order / OrderItem models
  seed.ts              # 8 seeded products (Unsplash images)
  migrations/          # SQL migrations
src/
  app/
    page.tsx           # Home: hero + category pills + product grid
    layout.tsx         # Root layout: providers, header, cart drawer
    success/page.tsx   # Order confirmation / receipt
    api/
      products/route.ts        # GET  — list + search + category filter
      products/[id]/route.ts   # GET  — single product
      checkout/route.ts        # POST — create Stripe session + order
      webhooks/stripe/route.ts # POST — verify + complete order
  components/          # Header, Hero, ProductGrid/Card, CartDrawer, icons
  context/             # CartContext (localStorage), ThemeContext
  lib/                 # prisma, stripe, products, format helpers
  generated/prisma/    # Prisma-generated client (do not edit)
```

## API Reference

### `GET /api/products`

Query params: `q` (search), `category`.

```json
{ "products": [{ "id": "...", "title": "...", "price": 19999, ... }] }
```

### `GET /api/products/:id`

Returns `{ "product": {...} }` or `404`.

### `POST /api/checkout`

```json
{ "items": [{ "productId": "cmsk...", "quantity": 2 }] }
```

Validates stock server-side, creates a Stripe Checkout session and a `PENDING` order, then returns `{ "url": "https://checkout.stripe.com/..." }`.

### `POST /api/webhooks/stripe`

Verifies the `stripe-signature`, marks `checkout.session.completed` orders as `COMPLETED`, and decrements product stock in a transaction.

## Database Schema

- **Product**: `id, title, description, price (cents), category, image, stock, createdAt, updatedAt`
- **Order**: `id, totalAmount (cents), status (PENDING/COMPLETED/EXPIRED), stripeSessionId (unique), createdAt`
- **OrderItem**: `id, orderId, productId, quantity, price (cents at purchase time)`

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server (Turbopack)     |
| `npm run build`   | Production build                     |
| `npm run start`   | Serve the production build           |
| `npm run lint`    | ESLint                               |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run db:migrate` | Apply Prisma migrations           |
| `npm run db:generate` | Regenerate the Prisma client       |
| `npm run db:seed` | Seed the database                     |
| `npm run db:studio` | Open Prisma Studio                  |

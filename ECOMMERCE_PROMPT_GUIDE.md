# 🛒 E-Commerce Master Prompt & Architecture Guide for `testsite`
> **Target Project:** `C:\NIK\testsite` (Next.js 16 + React 19 + Tailwind CSS v4 + TypeScript)  
> **Optimized for:** `opencode` running `Local Auto` / `Qwen 2.5 Coder 14B` via OmniRoute

---

## 🏗️ Project Architecture & File Map

```text
C:\NIK\testsite\
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── checkout/route.ts       # Stripe Session API
│   │   │   ├── products/route.ts       # Product Search & Filter API
│   │   │   └── webhooks/stripe/route.ts# Order confirmation webhook
│   │   ├── product/[id]/page.tsx       # Single Product Detail Page
│   │   ├── success/page.tsx            # Post-Checkout Receipt Page
│   │   ├── globals.css                 # Tailwind CSS v4 styling
│   │   ├── layout.tsx                  # Root layout with CartProvider
│   │   └── page.tsx                    # Main Storefront & Product Grid
│   ├── components/
│   │   ├── Navbar.tsx                  # Header with search & Cart badge
│   │   ├── ProductCard.tsx             # Interactive Product Card with Quick-Add
│   │   ├── ProductGrid.tsx             # Grid layout with category filters
│   │   └── CartDrawer.tsx              # Slide-over cart drawer with totals
│   ├── context/
│   │   └── CartContext.tsx             # React 19 Context for Cart State & LocalStorage
│   └── lib/
│       └── db.ts                       # SQLite database connection & seed data
```

---

## ⚡ Master All-in-One Prompt (Copy into `opencode`)

```text
Act as a Principal Full-Stack Engineer. Build a complete e-commerce store inside `C:\NIK\testsite` using Next.js 16 App Router, React 19, and Tailwind CSS v4.

Execute these files step-by-step:

1. Create `src/lib/db.ts`:
   - Initialize an in-memory or file-based SQLite database with products (id, title, description, price, category, image, stock) and orders.
   - Include 8 seeded products (Electronics, Apparel, Accessories) with valid Unsplash image URLs.

2. Create `src/context/CartContext.tsx`:
   - React 19 Client Context managing cart items array, addToCart, removeFromCart, updateQuantity, clearCart, and LocalStorage persistence.

3. Create Components:
   - `src/components/Navbar.tsx`: Search bar, category filters, and Cart Drawer trigger badge.
   - `src/components/ProductCard.tsx`: Modern product card with image hover zoom, price tag, and 'Add to Cart' button.
   - `src/components/CartDrawer.tsx`: Slide-over drawer listing items, quantity buttons, subtotal, and 'Checkout' button.

4. Update `src/app/layout.tsx`:
   - Wrap children with `<CartProvider>` and add global toast/notification wrapper.

5. Update `src/app/page.tsx`:
   - Replace default template with Hero banner, category tabs, and ProductGrid.

Ensure all imports work cleanly without missing dependencies!
```

---

## 🎯 Modular 4-Step Prompt Suite (Recommended for Step-by-Step Control)

### Step 1: Database & Seed Data (`src/lib/db.ts`)
```text
Inside C:\NIK\testsite, create `src/lib/db.ts`. Initialize a lightweight SQLite or mock database helper with products (id, title, description, price, category, image, stock). Seed it with 8 realistic products (Laptops, Headphones, Sneakers) using working Unsplash images and export helper functions getProducts() and getProductById(id).
```

### Step 2: Cart Context & State Engine (`src/context/CartContext.tsx`)
```text
Create `src/context/CartContext.tsx` using React 19 client context. Manage an array of CartItem { product, quantity }. Provide functions: addToCart, removeFromCart, updateQuantity, clearCart, totalItems, and subtotal. Persist state to LocalStorage.
```

### Step 3: Navbar, Cart Drawer & Homepage (`src/components/` & `src/app/page.tsx`)
```text
Build `src/components/Navbar.tsx`, `src/components/ProductCard.tsx`, and `src/components/CartDrawer.tsx` with modern Tailwind CSS v4 glassmorphism styling. Wrap `src/app/layout.tsx` in CartProvider, and replace `src/app/page.tsx` with a high-converting storefront homepage.
```

### Step 4: Stripe Checkout & Success Page (`src/app/api/checkout/` & `src/app/success/`)
```text
Create `src/app/api/checkout/route.ts` to process cart checkout sessions, and create `src/app/success/page.tsx` to display order confirmation and receipt details upon successful purchase.
```

---

### 💡 Pro-Tips for `opencode` on `testsite`:
- **Model Selection:** Use `Local Auto` or `Qwen 2.5 Coder 14B (local)`.
- **Tailwind v4:** `globals.css` uses `@import "tailwindcss";` — keep standard utility classes (`bg-white`, `dark:bg-zinc-900`, `shadow-lg`, `rounded-2xl`).

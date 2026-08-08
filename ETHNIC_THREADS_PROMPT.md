# 🥻 Ethnic Threads (ethnicthreads.shop) Master Transformation Prompt
> Copy and paste this prompt into **`opencode`** running on **`Local Auto`** to transform `testsite` into your official **Ethnic Threads** store!

---

```text
Act as a Senior E-Commerce Architect and UI Designer. Rebrand and transform `testsite` into "Ethnic Threads" (https://ethnicthreads.shop/), referencing our official Google Business Profile (https://share.google/tYb9P3DsNjLZYdsXX).

Execute the following enhancements across the project:

1. BRANDING, HERO & GOOGLE BUSINESS LINK:
   - Store Name: "Ethnic Threads" (https://ethnicthreads.shop/).
   - Tagline: "Timeless Heritage & Handcrafted Ethnic Fashion".
   - Theme Palette: Luxury Gold accents, Deep Maroon/Burgundy, Emerald Green, Ivory.
   - Update Hero Banner (src/components/Hero.tsx) with a rich festive background, "Explore Collection" CTA button, and "Visit Our Store" link to https://share.google/tYb9P3DsNjLZYdsXX.

2. STORE LOCATION & VISIT US SECTION (src/components/StoreLocation.tsx & Footer.tsx):
   - Create a prominent "Visit Our Flagship Store" section on the homepage:
     * Interactive Location Card displaying store address & store timing (Mon–Sat: 10:30 AM – 8:30 PM).
     * "Get Directions on Google Maps" button pointing directly to: https://share.google/tYb9P3DsNjLZYdsXX
     * Embedded map preview placeholder / Google Maps link badge.

3. GOOGLE REVIEWS & TESTIMONIALS SECTION (src/components/CustomerReviews.tsx):
   - Add a high-converting "Customer Reviews & Ratings" section on the homepage featuring:
     * Overall Rating Header: "★ 4.9 / 5.0 Rating on Google Maps (150+ Verified Reviews)".
     * 3-4 Featured Customer Testimonial Cards with 5-star badges, customer names, verified purchase badges, and glowing quotes about fabric quality, bridal fitting, and saree craftsmanship.

4. ETHNIC WEAR SEED DATA & LOCAL IMAGERY (prisma/seed.ts):
   - Use the locally generated product images placed under `/images/`:
     1. Banarasi Silk Saree (Pure Gold Zari) - ₹12,999 -> Image: "/images/banarasi-saree.png"
     2. Royal Anarkali Suit (Hand-Embroidered) - ₹8,999 -> Image: "/images/anarkali-suit.png"
     3. Floral Printed Festive Lehenga - ₹15,999 -> Image: "/images/festive-lehenga.png"
     4. Antique Kundan Jhumka Earrings - ₹1,499 -> Image: "/images/kundan-jhumka.png"
     5. Hand-Embroidered Velvet Potli Bag - ₹1,199 -> Image: "/images/potli-bag.png"
     6. Chanderi Cotton Kurti Set with Dupatta - ₹4,499
     7. Chikankari Handloom Tunic - ₹2,999
     8. Handwoven Bandhani Dupatta - ₹1,899
   - Categories: "Sarees", "Kurtas & Sets", "Lehengas", "Dupattas", "Jewelry & Accessories".

5. PRODUCT DETAIL ENHANCEMENTS:
   - Add Size Selector options (S, M, L, XL, XXL) on product cards & detail view.
   - Add Fabric & Care badges ("100% Handloom Silk", "Dry Clean Only").
   - Display prices formatted in INR (₹).

6. RE-SEED DATABASE & REBUILD:
   - Update seed data and run `npx prisma db seed` to update dev.db.

Keep all existing cart drawer logic, Stripe payment endpoints, and Next.js 16 App Router setup working cleanly!
```

# FaishonFit — Premium Fashion eCommerce Platform

Phase 1 deliverable: production-grade Next.js 15 project scaffold, full
database architecture, auth architecture, and a complete luxury homepage.

## Tech Stack

- Next.js 15 (App Router, React 19, TypeScript)
- Tailwind CSS + shadcn/ui (Radix primitives)
- Framer Motion + GSAP (ScrollTrigger)
- Zustand (cart / wishlist client state)
- Prisma ORM + PostgreSQL
- NextAuth v5 (Credentials + Google, JWT sessions, edge-safe middleware)
- Zod + React Hook Form
- Stripe + Resend (wired for Phase 4/checkout, not yet called)

## Getting Started

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Configure environment
cp .env.example .env
# then fill in DATABASE_URL, AUTH_SECRET, etc.

# 3. Generate the Prisma client
npx prisma generate

# 4. Push the schema to your PostgreSQL database
npx prisma migrate dev --name init

# 5. Seed sample data
npm run prisma:seed

# 6. Run the dev server
npm run dev
```

Visit http://localhost:3000.

> `--legacy-peer-deps` is required because `@react-three/drei` currently
> declares a React 18 peer range while this project runs React 19; this is
> a benign, well-known mismatch and does not affect runtime behavior.

## Project Structure

```
app/
  (marketing)/          static marketing pages (about, contact, etc. — Phase 2+)
  (shop)/shop/           product listing + filtering — Phase 2
  (shop)/product/[slug]/ product detail page — Phase 2
  (shop)/category/[slug]/category landing — Phase 2
  (auth)/login|register|forgot-password|reset-password/  — Phase 3
  (account)/account/     dashboard, orders, wishlist, addresses — Phase 3
  (checkout)/cart|checkout/  — Phase 4
  admin/                  admin dashboard — Phase 5
  api/                    route handlers (auth, cart, products, orders, admin...)
  layout.tsx              root layout: fonts, header, footer, cart drawer, SEO
  page.tsx                homepage (Phase 1 — complete)
  globals.css

components/
  ui/          shadcn-style primitives (button, badge, input, star-rating)
  layout/      header, footer, announcement bar
  home/        all 10 homepage sections
  product/     product card, quick view dialog
  cart/        cart drawer
  shared/      fabric-plate, marquee, reveal, section-heading

lib/
  auth.ts          full NextAuth config (Node runtime)
  auth.config.ts   edge-safe NextAuth config (used by middleware)
  db.ts            Prisma client singleton
  utils.ts         cn(), formatPrice(), slugify(), etc.
  store/           zustand cart + wishlist stores
  validations/     zod schemas (auth, commerce)
  constants/       site copy, nav, homepage content

prisma/
  schema.prisma    full data model (users, catalog, cart, orders, coupons...)
  seed.ts          sample data seeder

middleware.ts      route protection for /account, /checkout, /admin
```

## Homepage Sections (Phase 1)

1. Announcement bar (rotating promos)
2. Sticky navbar with glassmorphism-on-scroll + mobile drawer
3. Cinematic hero — GSAP curtain reveal, particle field, staggered headline
4. Featured Collections — asymmetric editorial grid, 6 collections
5. Trending Products — Embla carousel, quick view, add-to-cart, wishlist
6. New Arrivals — filterable grid by category
7. Editorial Feature — GSAP parallax pull-quote section
8. Best Sellers — ranked showcase
9. Brand Story — storytelling section with marquee divider
10. Fashion Lookbook — magazine-style editorial gallery
11. Customer Reviews — verified buyer testimonials + aggregate rating
12. Newsletter — validated subscribe form, POSTs to `/api/newsletter`
13. Premium footer — full sitemap, payment methods, back-to-top

## Production Readiness

- `next build` passes clean: 0 type errors, 0 lint errors.
- Homepage first-load JS: ~241 kB (includes Framer Motion, GSAP, Embla).
- `prefers-reduced-motion` respected globally (see `globals.css`).
- Full keyboard focus states via Tailwind `ring` utilities.
- JSON-LD `ClothingStore` structured data + Open Graph/Twitter metadata
  in the root layout.
- Images: no photography assets exist yet, so campaign imagery is
  represented by generated duotone "fabric plates" — swap
  `FabricPlate` for `next/image` once real product photography lands
  (the component boundary is intentionally isolated for this).

## What's Next

- **Phase 2** — Product catalog, PDP, search & filtering
- **Phase 3** — Auth pages, account dashboard, wishlist page
- **Phase 4** — Cart page, multi-step checkout, Stripe
- **Phase 5** — Admin dashboard
- **Phase 6** — Analytics & reporting

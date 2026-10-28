# The Indian Rub Co. — Website

**Rub. Cook. Enjoy.**

Storefront for The Indian Rub Co., a gourmet Indian dry-rub brand: Kashmiri Smoked Chilli, Bhut Jolokia Fire, Malabar Pepper and Smoky Tandoori.

Built with React + Vite as a static site that runs free on Vercel Hobby. No paid domain, API, database or payment gateway is used.

## Developer notes (not shown on the site)

- **No back end.** Cart, coupon, orders and reviews are saved in each visitor's browser (`localStorage`). Orders are not sent anywhere and nobody is notified. Reviews are visible only on the device that submitted them.
- **Payment** is shown as Cash on Delivery; no card or bank details are collected.
- **Order status** stays at "Processing" (it does not invent shipping updates).
- **Search engines:** `index.html` contains `<meta name="robots" content="noindex, nofollow">` so strangers are unlikely to find the site and place orders that can't be fulfilled. Delete that line if you want it listed on Google.
- **Email:** `info@theindianrubco.com` only receives mail if someone owns the `theindianrubco.com` domain and has set up email for it.
- **Ingredients and prices** in `src/data/products.js` should be checked before the site is shown publicly.

## Features

| Area | What it does |
| --- | --- |
| Home | Hero (Shop Now / Explore Our Flavours), featured products, flavour philosophy, why choose us, how it works, cooking inspiration (grilling, BBQ, roasting, air frying, pan cooking), customer reviews, call to action |
| Shop | Search, filter by heat / best-for / cooking method, sort by price or heat |
| Product page | Photo, heat meter, flavour notes, quantity, ingredients, usage, recipe, **Customer Reviews** |
| Reviews | Per-product average, star breakdown, review cards, Write a Review form with validation, empty state "Be the first to review this product". No reviews are pre-filled. |
| Cart | Add / remove, quantity +/−, free-shipping progress bar, coupon, persists across refresh |
| Pricing | Shipping ₹49, free from ₹599. Coupons: `WELCOME10` (10% off), `RUBCOOK` (₹50 off over ₹499) |
| Checkout | Contact + delivery form with validation, Cash on Delivery, Place Order |
| Confirmation | Order Confirmed, order number, summary, Continue Shopping |
| My Orders | Order history on this device |
| About Us / Contact | Brand story, vision, range; address, clickable phone and email |

## Where to edit things

| Change | File |
| --- | --- |
| Address, phone, email | `src/data/business.js` |
| Products, prices, ingredients | `src/data/products.js` |
| Recipes | `src/data/recipes.js` |
| Shipping fee, coupons | `src/lib/pricing.js` |
| Colours, fonts, layout | `src/index.css` (tokens at the top) |

## 1. Run locally

Needs Node.js 20+ (free LTS from <https://nodejs.org>).

```bash
cd indian-rub-co
npm install      # first time only
npm run dev      # http://localhost:5173
```

`npm run build` creates the production site in `dist/`; `npm run preview` serves it locally.

## 2. Upload to GitHub (free)

1. Create a new empty repository on <https://github.com> called `indian-rub-co` (don't add a README).
2. In the project folder (it already contains a git repository with commits):

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/indian-rub-co.git
git push -u origin main
```

No terminal? Use **"uploading an existing file"** on the repo page and drag in everything **except** `node_modules` and `dist`.

## 3. Deploy to Vercel (free Hobby plan)

1. Sign up at <https://vercel.com/signup> with **Continue with GitHub** and pick **Hobby**. No card needed.
2. **Add New… → Project → Import** `indian-rub-co`.
3. Vercel detects Vite. Keep the defaults (`npm run build`, output `dist`) and click **Deploy**.
4. You get a free `*.vercel.app` URL. Every `git push` to `main` redeploys.

`vercel.json` makes page refreshes on routes like `/product/malabar-pepper` work.

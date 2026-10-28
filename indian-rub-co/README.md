# The Indian Rub Co. — Demo Storefront

**Rub. Cook. Enjoy.**

A premium e-commerce storefront for The Indian Rub Co., an Indian gourmet dry-rub brand, built as a **college entrepreneurship project (Group B3)**.

> ⚠️ **Demonstration only.** This is not a live shop. No products are sold, no payments are taken, no card details are collected and no order is sent anywhere. The cart and demo orders are stored only in the visitor's own browser (`localStorage`). There is no shared online order database.

**Cost: ₹0.** No paid domain, API, database, payment gateway or third-party service. Fonts are bundled locally from npm.

---

## Features

| Area | What it does |
| --- | --- |
| Home | Hero, product collection, "Rub. Cook. Enjoy." steps, regional origins, audiences, recipe teaser |
| Shop | Search, filter by heat / best-for / cooking method, sort by price or heat (filters live in the URL) |
| Product page | Large photo, heat meter, flavour notes, quantity selector, ingredients, usage, related recipe |
| Cart | Add / remove, increase / decrease quantity (max 10), persists across refresh and tabs |
| Pricing | Subtotal, demo coupon, **demo shipping ₹49, free from ₹599** (clearly labelled) |
| Coupons | `DEMO10` = 10% off · `RUBCOOK` = ₹50 off orders over ₹499 |
| Checkout | Sample contact/address form with validation, "Fill sample details" button, demo acknowledgement. **No payment fields.** |
| Confirmation | Simulated order reference `IRC-DEMO-XXXXXX` and a "no purchase has taken place" message |
| My Orders | Demo order history with a simulated status (Placed → Packed at 1 min → Shipped at 3 min → Delivered at 6 min) |
| Recipes | Four recipes, one per rub, filterable by cooking method |
| Our Story | Brand story and comparison table from the Group B3 brief, team list |

## Tech stack

- **React 19 + Vite** (frontend only, static build)
- **React Router** for pages
- Plain CSS with design tokens in `src/index.css`
- `@fontsource-variable/fraunces` and `@fontsource-variable/inter` (self-hosted fonts)
- Browser `localStorage` for cart, coupon and demo orders

## Project structure

```
public/images/          optimised product photos + logo (WebP)
src/
  data/products.js      the 4 products (prices, heat, ingredients…)
  data/recipes.js       recipe content
  lib/pricing.js        shipping fee, coupons, totals
  lib/storage.js        localStorage helpers (all keys in one place)
  lib/orders.js         create / read demo orders, simulated status
  context/CartContext.jsx  cart state shared across the app
  components/           Header, Footer, ProductCard, HeatMeter, QuantityStepper, …
  pages/                Home, Shop, ProductDetail, Cart, Checkout, OrderConfirmation, Orders, Recipes, About
  index.css             all styles (tokens → base → components → responsive)
vercel.json             tells Vercel to serve index.html for every route
```

To change a price or description, edit `src/data/products.js`. To change the shipping fee or coupons, edit `src/lib/pricing.js`.

---

## 1. Run locally

You need **Node.js 20 or newer** (free from <https://nodejs.org>, choose the LTS version).

```bash
cd indian-rub-co
npm install        # first time only
npm run dev        # opens a dev server, usually http://localhost:5173
```

Other commands:

```bash
npm run build      # creates the production site in /dist
npm run preview    # serves /dist locally to check the production build
```

## 2. Upload to GitHub (free)

1. Create a free account at <https://github.com> if you don't have one.
2. Click **New repository**, name it `indian-rub-co`, keep it **Public** (or Private — both work with Vercel Hobby), and **do not** tick "Add a README".
3. In a terminal inside the project folder:

```bash
git init                     # skip if the folder already has a .git folder
git add .
git commit -m "The Indian Rub Co. demo storefront"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/indian-rub-co.git
git push -u origin main
```

Don't upload `node_modules` or `dist` — the included `.gitignore` already excludes them.

*No terminal?* On the new GitHub repo page choose **"uploading an existing file"** and drag in every file and folder **except** `node_modules` and `dist`.

## 3. Deploy to Vercel (free Hobby plan)

1. Go to <https://vercel.com/signup> and choose **Continue with GitHub**. Select the **Hobby** plan. No card is needed.
2. Click **Add New… → Project**, then **Import** your `indian-rub-co` repository.
3. Vercel detects **Vite** automatically. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. After about a minute you get a free URL like `https://indian-rub-co.vercel.app` (or with a random suffix).
5. Open it and test: refresh on a product page (should still work thanks to `vercel.json`), add to cart, check out, view My Orders.

Every later `git push` to `main` redeploys automatically.

**Don't** add a custom domain, payment integrations, databases or any paid add-ons — none are needed.

---

## Demo script (for the presentation)

1. Home → scroll through the sections.
2. Shop → search "paneer", filter **Hot to extra hot**, sort by price.
3. Open **Malabar Pepper** → set quantity 2 → Add to cart.
4. Add **Bhut Jolokia Fire** from a card → refresh the page to show the cart persists.
5. Cart → apply `DEMO10` → point out demo shipping and the free-shipping threshold.
6. Checkout → **Fill sample details** → tick the demo acknowledgement → Place demo order.
7. Show the confirmation, then **My Orders**; come back a few minutes later to show the simulated status move on.
8. Explain: everything above is stored in this browser only; a classmate's device shows their own data.

## Honest limitations

- No real inventory, payments, emails or delivery.
- Orders are per-browser; clearing site data removes them.
- Ingredient lists and prices are concept values for the project, not a real product label.

// Product reviews, kept per product so one rub's reviews never appear on another.
// No reviews are pre-filled: the store starts empty and only shows what visitors submit.
import { load, save } from './storage';

const KEY = 'irc_reviews_v1';

function all() {
  return load(KEY, {});
}

export function getReviews(productId) {
  return all()[productId] ?? [];
}

export function getAllReviews() {
  return Object.entries(all()).flatMap(([productId, list]) => list.map((r) => ({ ...r, productId })));
}

export function addReview(productId, { rating, title, text, name }) {
  const review = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    rating,
    title: title.trim(),
    text: text.trim(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
  };
  const data = all();
  data[productId] = [review, ...(data[productId] ?? [])];
  save(KEY, data);
  return review;
}

export function summarise(reviews) {
  const count = reviews.length;
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const n = reviews.filter((r) => r.rating === star).length;
    return { star, n, pct: count ? Math.round((n / count) * 100) : 0 };
  });
  const average = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  return { count, average, breakdown };
}

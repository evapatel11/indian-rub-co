// Small wrapper around browser localStorage (cart, coupon, orders, reviews).

export const KEYS = {
  cart: 'irc_cart_v1',
  coupon: 'irc_coupon_v1',
  orders: 'irc_orders_v1',
};

export function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private mode). The site still works for this session.
  }
}

export function remove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

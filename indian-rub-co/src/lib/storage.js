// Small wrapper around browser localStorage.
// Everything in this demo is stored ONLY in the visitor's own browser.
// There is no server or shared database.

export const KEYS = {
  cart: 'irc_demo_cart_v1',
  coupon: 'irc_demo_coupon_v1',
  orders: 'irc_demo_orders_v1',
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
    // Storage may be unavailable (private mode). The demo still works for this session.
  }
}

export function remove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

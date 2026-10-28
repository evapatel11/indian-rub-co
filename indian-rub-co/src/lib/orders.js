// Demo orders: saved to localStorage, never sent anywhere.
import { KEYS, load, save, remove } from './storage';

// Simulated fulfilment timeline. Minutes are compressed so the
// status visibly advances during a classroom demonstration.
export const ORDER_STAGES = [
  { key: 'placed', label: 'Order placed', afterMinutes: 0 },
  { key: 'packed', label: 'Packed', afterMinutes: 1 },
  { key: 'shipped', label: 'Shipped', afterMinutes: 3 },
  { key: 'delivered', label: 'Delivered', afterMinutes: 6 },
];

export function getOrders() {
  return load(KEYS.orders, []);
}

export function getOrder(id) {
  return getOrders().find((o) => o.id === id);
}

export function createOrder({ items, totals, customer }) {
  const id = 'IRC-DEMO-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const order = {
    id,
    createdAt: new Date().toISOString(),
    items: items.map(({ id, name, price, qty, weight, imageSmall }) => ({ id, name, price, qty, weight, imageSmall })),
    totals: {
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      total: totals.total,
      coupon: totals.coupon?.code ?? null,
    },
    customer,
    demo: true,
  };
  save(KEYS.orders, [order, ...getOrders()]);
  return order;
}

export function clearOrders() {
  remove(KEYS.orders);
}

// Returns the index of the current stage based on elapsed time.
export function stageIndex(order, now = Date.now()) {
  const minutes = (now - new Date(order.createdAt).getTime()) / 60000;
  let idx = 0;
  ORDER_STAGES.forEach((s, i) => {
    if (minutes >= s.afterMinutes) idx = i;
  });
  return idx;
}

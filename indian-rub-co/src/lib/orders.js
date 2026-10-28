// Orders placed on this site, saved with the browser's local storage.
import { KEYS, load, save, remove } from './storage';

export const ORDER_STAGES = [
  { key: 'placed', label: 'Order placed' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

// New orders sit at "Processing". Later stages are shown as upcoming.
export const CURRENT_STAGE = 1;

export function getOrders() {
  return load(KEYS.orders, []);
}

export function getOrder(id) {
  return getOrders().find((o) => o.id === id);
}

export function createOrder({ items, totals, customer, payment }) {
  const id = 'IRC-' + Date.now().toString().slice(-6) + Math.random().toString(36).slice(2, 4).toUpperCase();
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
    payment,
  };
  save(KEYS.orders, [order, ...getOrders()]);
  return order;
}

export function clearOrders() {
  remove(KEYS.orders);
}

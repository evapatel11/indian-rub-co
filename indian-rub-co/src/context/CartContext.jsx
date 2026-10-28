import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { products } from '../data/products';
import { KEYS, load, save, remove } from '../lib/storage';
import { calculateTotals, validateCoupon } from '../lib/pricing';

const CartContext = createContext(null);
const MAX_QTY = 10;

export function CartProvider({ children }) {
  // Cart is stored as [{ id, qty }] and joined with local product data,
  // so price changes in products.js are always reflected.
  const [lines, setLines] = useState(() => load(KEYS.cart, []));
  const [couponCode, setCouponCode] = useState(() => load(KEYS.coupon, ''));
  const [toast, setToast] = useState(null);

  useEffect(() => save(KEYS.cart, lines), [lines]);
  useEffect(() => save(KEYS.coupon, couponCode), [couponCode]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEYS.cart) setLines(load(KEYS.cart, []));
      if (e.key === KEYS.coupon) setCouponCode(load(KEYS.coupon, ''));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const p = products.find((x) => x.id === l.id);
          return p ? { ...p, qty: l.qty } : null;
        })
        .filter(Boolean),
    [lines]
  );

  const totals = useMemo(() => calculateTotals(items, couponCode), [items, couponCode]);

  const addItem = useCallback((id, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      }
      return [...prev, { id, qty: Math.min(MAX_QTY, qty) }];
    });
    const p = products.find((x) => x.id === id);
    setToast({ id: Date.now(), message: `${p?.name ?? 'Item'} added to your cart` });
  }, []);

  const setQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l))
    );
  }, []);

  const removeItem = useCallback((id) => setLines((prev) => prev.filter((l) => l.id !== id)), []);

  const clearCart = useCallback(() => {
    setLines([]);
    setCouponCode('');
    remove(KEYS.cart);
    remove(KEYS.coupon);
  }, []);

  const applyCoupon = useCallback(
    (code) => {
      const result = validateCoupon(code, totals.subtotal);
      if (result.ok) setCouponCode(result.coupon.code);
      return result;
    },
    [totals.subtotal]
  );

  const removeCoupon = useCallback(() => setCouponCode(''), []);

  const value = {
    items,
    totals,
    couponCode,
    addItem,
    setQty,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    toast,
    dismissToast: () => setToast(null),
    MAX_QTY,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}

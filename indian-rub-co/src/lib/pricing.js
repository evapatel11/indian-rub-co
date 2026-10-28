// Pricing rules: shipping and coupons.

export const SHIPPING_FEE = 49; // flat shipping charge in ₹
export const FREE_SHIPPING_THRESHOLD = 599; // subtotal (after discount) for free shipping

export const COUPONS = {
  WELCOME10: { code: 'WELCOME10', type: 'percent', value: 10, label: '10% off your order' },
  RUBCOOK: { code: 'RUBCOOK', type: 'flat', value: 50, minSubtotal: 499, label: '₹50 off orders over ₹499' },
};

export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export function validateCoupon(code, subtotal) {
  const coupon = COUPONS[code?.trim().toUpperCase()];
  if (!coupon) return { ok: false, message: "Sorry, we couldn't find that code. Please check it and try again." };
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) {
    return { ok: false, message: `${coupon.code} applies to orders of ${formatINR(coupon.minSubtotal)} or more.` };
  }
  return { ok: true, coupon };
}

export function calculateTotals(items, couponCode) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  let discount = 0;
  let coupon = null;
  if (couponCode) {
    const result = validateCoupon(couponCode, subtotal);
    if (result.ok) {
      coupon = result.coupon;
      discount = coupon.type === 'percent' ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
      discount = Math.min(discount, subtotal);
    }
  }
  const afterDiscount = subtotal - discount;
  const shipping = items.length === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = afterDiscount + shipping;
  const itemCount = items.reduce((n, i) => n + i.qty, 0);
  return { subtotal, discount, shipping, total, itemCount, coupon };
}

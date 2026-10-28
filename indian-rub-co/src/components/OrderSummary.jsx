import { formatINR, FREE_SHIPPING_THRESHOLD } from '../lib/pricing';

export default function OrderSummary({ totals, title = 'Order Summary', couponCode }) {
  const code = couponCode ?? totals.coupon?.code;
  return (
    <div className="summary">
      <h2 className="summary__title">{title}</h2>
      <dl>
        <div><dt>Subtotal</dt><dd>{formatINR(totals.subtotal)}</dd></div>
        {totals.discount > 0 && (
          <div className="summary__discount"><dt>Discount{code ? ` (${code})` : ''}</dt><dd>−{formatINR(totals.discount)}</dd></div>
        )}
        <div>
          <dt>
            Shipping
            <span className="summary__hint">Free on orders of {formatINR(FREE_SHIPPING_THRESHOLD)} or more</span>
          </dt>
          <dd>{totals.shipping === 0 ? 'Free' : formatINR(totals.shipping)}</dd>
        </div>
        <div className="summary__total"><dt>Total</dt><dd>{formatINR(totals.total)}</dd></div>
      </dl>
    </div>
  );
}

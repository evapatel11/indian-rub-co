import { formatINR, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../lib/pricing';

export default function OrderSummary({ totals, title = 'Summary', couponCode }) {
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
            Demo shipping
            <span className="summary__hint">Flat {formatINR(SHIPPING_FEE)}, free from {formatINR(FREE_SHIPPING_THRESHOLD)}. Illustrative only.</span>
          </dt>
          <dd>{totals.shipping === 0 ? 'Free' : formatINR(totals.shipping)}</dd>
        </div>
        <div className="summary__total"><dt>Demo total</dt><dd>{formatINR(totals.total)}</dd></div>
      </dl>
      <p className="fine">Prices shown inclusive of taxes for simplicity. No money is charged.</p>
    </div>
  );
}

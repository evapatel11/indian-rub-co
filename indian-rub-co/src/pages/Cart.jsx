import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR, FREE_SHIPPING_THRESHOLD } from '../lib/pricing';
import QuantityStepper from '../components/QuantityStepper';
import DemoNotice from '../components/DemoNotice';
import OrderSummary from '../components/OrderSummary';
import { TrashIcon, ArrowIcon } from '../components/Icons';

export default function Cart() {
  const { items, totals, setQty, removeItem, applyCoupon, removeCoupon, couponCode, clearCart, MAX_QTY } = useCart();
  const [code, setCode] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);

  const onApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    const res = applyCoupon(code);
    setCouponMsg(res.ok ? { ok: true, text: `${res.coupon.code} applied: ${res.coupon.label}` } : { ok: false, text: res.message });
    if (res.ok) setCode('');
  };

  if (!items.length) {
    return (
      <div className="page">
        <div className="container narrow center empty empty--page">
          <p className="eyebrow">Your cart</p>
          <h1 className="page-title">Your cart is empty</h1>
          <p>Pick a rub or two and they&rsquo;ll wait here, even if you refresh the page.</p>
          <Link to="/shop" className="btn btn--primary">Browse the rubs <ArrowIcon width={18} height={18} /></Link>
        </div>
      </div>
    );
  }

  const toFree = FREE_SHIPPING_THRESHOLD - (totals.subtotal - totals.discount);

  return (
    <div className="page">
      <div className="container">
        <div className="page-head page-head--flush">
          <p className="eyebrow">Your cart</p>
          <h1 className="page-title">{totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} in your cart</h1>
        </div>

        <DemoNotice>
          Your cart is saved in <strong>this browser&rsquo;s local storage</strong> so it survives a refresh. It is not stored online
          and cannot be seen on any other device.
        </DemoNotice>

        <div className="cart">
          <ul className="cart__list" aria-label="Cart items">
            {items.map((item) => (
              <li key={item.id} className="line">
                <Link to={`/product/${item.slug}`} className="line__img">
                  <img src={item.imageSmall} alt={item.name} width="120" height="142" loading="lazy" />
                </Link>
                <div className="line__info">
                  <h2><Link to={`/product/${item.slug}`}>{item.name}</Link></h2>
                  <p className="fine">{item.weight} · {formatINR(item.price)} each</p>
                  <div className="line__controls">
                    <QuantityStepper value={item.qty} onChange={(n) => setQty(item.id, n)} max={MAX_QTY} label={`Quantity of ${item.name}`} />
                    <button type="button" className="btn btn--text btn--icon" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from cart`}>
                      <TrashIcon width={16} height={16} /> Remove
                    </button>
                  </div>
                </div>
                <p className="line__total">{formatINR(item.price * item.qty)}</p>
              </li>
            ))}
            <li className="cart__clear">
              <button type="button" className="btn btn--text" onClick={clearCart}>Empty cart</button>
            </li>
          </ul>

          <aside className="cart__side">
            <form className="coupon" onSubmit={onApply}>
              <label htmlFor="coupon">Demo coupon</label>
              {couponCode ? (
                <div className="coupon__applied">
                  <span><strong>{couponCode}</strong> applied</span>
                  <button type="button" className="btn btn--text" onClick={() => { removeCoupon(); setCouponMsg(null); }}>Remove</button>
                </div>
              ) : (
                <div className="coupon__row">
                  <input id="coupon" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Try DEMO10" autoComplete="off" />
                  <button type="submit" className="btn btn--outline">Apply</button>
                </div>
              )}
              {couponCode && !totals.coupon && (
                <p className="coupon__msg is-err" role="status">{couponCode} no longer applies to this subtotal, so no discount is shown.</p>
              )}
              {couponMsg && <p className={`coupon__msg ${couponMsg.ok ? 'is-ok' : 'is-err'}`} role="status">{couponMsg.text}</p>}
              {!couponCode && <p className="fine">Demo codes: <code>DEMO10</code> (10% off) · <code>RUBCOOK</code> (₹50 off over ₹499)</p>}
            </form>

            <OrderSummary totals={totals} />
            {toFree > 0 && <p className="fine">Add {formatINR(toFree)} more for free demo shipping.</p>}

            <Link to="/checkout" className="btn btn--primary btn--block">Continue to demo checkout <ArrowIcon width={18} height={18} /></Link>
            <Link to="/shop" className="btn btn--text btn--block">Keep shopping</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

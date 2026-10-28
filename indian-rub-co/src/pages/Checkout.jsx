import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../lib/orders';
import { formatINR } from '../lib/pricing';
import OrderSummary from '../components/OrderSummary';

const EMPTY = { name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', note: '' };

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Please enter a valid email address.';
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ''))) e.phone = 'Please enter a valid 10-digit mobile number.';
  if (f.address.trim().length < 5) e.address = 'Please enter your delivery address.';
  if (!f.city.trim()) e.city = 'Please enter your city.';
  if (!f.state.trim()) e.state = 'Please enter your state.';
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = 'Please enter a valid 6-digit PIN code.';
  return e;
}

export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  if (!items.length && !placing) return <Navigate to="/cart" replace />;

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const order = createOrder({
        items,
        totals,
        customer: { ...form, phone: form.phone.replace(/\s/g, '') },
        payment: 'Cash on Delivery',
      });
      clearCart();
      navigate(`/order/${order.id}`, { replace: true });
    }, 900);
  };

  const field = (k, label, props = {}) => (
    <div className={`field ${props.wide ? 'field--wide' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input
        id={`f-${k}`}
        value={form[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        {...props.input}
      />
      {errors[k] && <p className="field__err" id={`e-${k}`}>{errors[k]}</p>}
    </div>
  );

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <div className="page">
      <div className="container">
        <div className="page-head page-head--flush">
          <p className="eyebrow">Almost there</p>
          <h1 className="page-title">Checkout</h1>
        </div>

        {errorCount > 0 && (
          <p className="form-alert" role="alert">Please check the {errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`} below.</p>
        )}

        <form className="checkout" onSubmit={onSubmit} noValidate>
          <div className="checkout__main">
            <fieldset className="panel">
              <legend>Contact details</legend>
              <div className="fields">
                {field('name', 'Full name', { input: { autoComplete: 'name' } })}
                {field('email', 'Email', { input: { type: 'email', autoComplete: 'email' } })}
                {field('phone', 'Mobile number', { input: { type: 'tel', inputMode: 'numeric', autoComplete: 'tel-national', maxLength: 11 } })}
              </div>
            </fieldset>

            <fieldset className="panel">
              <legend>Delivery address</legend>
              <div className="fields">
                {field('address', 'Address', { wide: true, input: { autoComplete: 'street-address' } })}
                {field('city', 'City', { input: { autoComplete: 'address-level2' } })}
                {field('state', 'State', { input: { autoComplete: 'address-level1' } })}
                {field('pincode', 'PIN code', { input: { inputMode: 'numeric', maxLength: 6, autoComplete: 'postal-code' } })}
                <div className="field field--wide">
                  <label htmlFor="f-note">Delivery instructions (optional)</label>
                  <input id="f-note" value={form.note} onChange={set('note')} placeholder="Landmark, preferred time, etc." />
                </div>
              </div>
            </fieldset>

            <fieldset className="panel">
              <legend>Payment method</legend>
              <label className="radio-card is-selected">
                <input type="radio" name="payment" checked readOnly />
                <span>
                  <strong>Cash on Delivery</strong>
                  <span className="fine">Pay when your order arrives. No card details needed.</span>
                </span>
              </label>
            </fieldset>
          </div>

          <aside className="checkout__side">
            <div className="summary summary--items">
              <h2 className="summary__title">Your items</h2>
              <ul>
                {items.map((i) => (
                  <li key={i.id}>
                    <img src={i.imageSmall} alt="" width="48" height="57" />
                    <span>{i.name} <span className="fine">× {i.qty}</span></span>
                    <span>{formatINR(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <OrderSummary totals={totals} />
            <button type="submit" className="btn btn--primary btn--block" disabled={placing}>
              {placing ? 'Placing your order…' : `Place Order · ${formatINR(totals.total)}`}
            </button>
            <Link to="/cart" className="btn btn--text btn--block">Back to cart</Link>
          </aside>
        </form>
      </div>
    </div>
  );
}

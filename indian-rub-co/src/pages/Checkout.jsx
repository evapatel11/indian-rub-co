import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../lib/orders';
import { formatINR } from '../lib/pricing';
import OrderSummary from '../components/OrderSummary';
import DemoNotice from '../components/DemoNotice';

const EMPTY = { name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', note: '' };

const SAMPLE = {
  name: 'Demo Customer',
  email: 'demo.customer@example.com',
  phone: '9876543210',
  address: '12 Sample Street, Demo Nagar',
  city: 'Panaji',
  state: 'Goa',
  pincode: '403001',
  note: 'Sample details for the class demo',
};

function validate(f) {
  const e = {};
  if (f.name.trim().length < 2) e.name = 'Enter a name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email format, e.g. name@example.com.';
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\s/g, ''))) e.phone = 'Enter a 10-digit Indian mobile number.';
  if (f.address.trim().length < 5) e.address = 'Enter a street address.';
  if (!f.city.trim()) e.city = 'Enter a city.';
  if (!f.state.trim()) e.state = 'Enter a state.';
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = 'Enter a 6-digit PIN code.';
  return e;
}

export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [ack, setAck] = useState(false);
  const [ackError, setAckError] = useState(false);
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
    setAckError(!ack);
    if (Object.keys(errs).length || !ack) {
      const first = Object.keys(errs)[0];
      document.getElementById(first ? `f-${first}` : 'f-ack')?.focus();
      return;
    }
    setPlacing(true);
    // Simulated processing delay so the demo feels realistic. Nothing is sent anywhere.
    setTimeout(() => {
      const order = createOrder({ items, totals, customer: { ...form, phone: form.phone.replace(/\s/g, '') } });
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

  return (
    <div className="page">
      <div className="container">
        <div className="page-head page-head--flush">
          <p className="eyebrow">Checkout · Demonstration only</p>
          <h1 className="page-title">Demo checkout</h1>
        </div>

        <DemoNotice tone="burgundy">
          <strong>This is a simulated checkout for a college project.</strong> No payment is taken, no card details are
          requested, and no order is sent to anyone. Use sample details; the demo order is saved only in this browser.
        </DemoNotice>

        <form className="checkout" onSubmit={onSubmit} noValidate>
          <div className="checkout__main">
            <fieldset className="panel">
              <div className="panel__head">
                <legend>Contact &amp; delivery (sample details)</legend>
                <button type="button" className="btn btn--outline btn--small" onClick={() => { setForm(SAMPLE); setErrors({}); }}>
                  Fill sample details
                </button>
              </div>
              <div className="fields">
                {field('name', 'Full name', { input: { autoComplete: 'name' } })}
                {field('email', 'Email', { input: { type: 'email', autoComplete: 'email' } })}
                {field('phone', 'Mobile number', { input: { type: 'tel', inputMode: 'numeric', autoComplete: 'tel-national', maxLength: 11 } })}
                {field('address', 'Address', { wide: true, input: { autoComplete: 'street-address' } })}
                {field('city', 'City', { input: { autoComplete: 'address-level2' } })}
                {field('state', 'State', { input: { autoComplete: 'address-level1' } })}
                {field('pincode', 'PIN code', { input: { inputMode: 'numeric', maxLength: 6, autoComplete: 'postal-code' } })}
                <div className="field field--wide">
                  <label htmlFor="f-note">Delivery note (optional)</label>
                  <input id="f-note" value={form.note} onChange={set('note')} />
                </div>
              </div>
            </fieldset>

            <fieldset className="panel">
              <legend>Payment</legend>
              <label className="radio-card is-selected">
                <input type="radio" name="payment" checked readOnly />
                <span>
                  <strong>Demo payment (no money involved)</strong>
                  <span className="fine">Real payment gateways are intentionally not connected. There are no card, UPI or bank fields in this project.</span>
                </span>
              </label>
            </fieldset>

            <div className={`ack ${ackError ? 'has-error' : ''}`}>
              <label>
                <input id="f-ack" type="checkbox" checked={ack} onChange={(e) => { setAck(e.target.checked); setAckError(false); }} />
                <span>I understand this is a demonstration order. Nothing will be charged, shipped or delivered.</span>
              </label>
              {ackError && <p className="field__err">Please tick this box to place the demo order.</p>}
            </div>
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
            <OrderSummary totals={totals} title="Demo order total" />
            <button type="submit" className="btn btn--primary btn--block" disabled={placing}>
              {placing ? 'Placing demo order…' : `Place demo order · ${formatINR(totals.total)}`}
            </button>
            <Link to="/cart" className="btn btn--text btn--block">Back to cart</Link>
          </aside>
        </form>
      </div>
    </div>
  );
}

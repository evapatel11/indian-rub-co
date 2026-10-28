import { useState } from 'react';
import { Link } from 'react-router-dom';
import { clearOrders, getOrders, ORDER_STAGES, CURRENT_STAGE } from '../lib/orders';
import { formatINR } from '../lib/pricing';

export default function Orders() {
  const [orders, setOrders] = useState(() => getOrders());
  const [confirming, setConfirming] = useState(false);
  const stage = ORDER_STAGES[CURRENT_STAGE];

  const onClear = () => {
    clearOrders();
    setOrders([]);
    setConfirming(false);
  };

  return (
    <div className="page">
      <div className="container narrow">
        <div className="page-head page-head--flush">
          <p className="eyebrow">Your account</p>
          <h1 className="page-title">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="empty center">
            <h2>No orders yet</h2>
            <p>When you place an order, you&rsquo;ll find it here.</p>
            <Link to="/shop" className="btn btn--primary">Start Shopping</Link>
          </div>
        ) : (
          <>
            <ul className="orders">
              {orders.map((o) => {
                const count = o.items.reduce((n, i) => n + i.qty, 0);
                return (
                  <li key={o.id}>
                    <Link to={`/order/${o.id}`} className="order-row">
                      <span className="order-row__id">
                        <strong>{o.id}</strong>
                        <span className="fine">{new Date(o.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      </span>
                      <span className="order-row__items">{count} {count === 1 ? 'pack' : 'packs'}</span>
                      <span className={`status status--${stage.key}`}>{stage.label}</span>
                      <span className="order-row__total">{formatINR(o.totals.total)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="center mt-lg">
              {confirming ? (
                <div className="btn-row">
                  <span>Remove all orders from this device?</span>
                  <button type="button" className="btn btn--primary btn--small" onClick={onClear}>Yes, remove</button>
                  <button type="button" className="btn btn--text" onClick={() => setConfirming(false)}>Cancel</button>
                </div>
              ) : (
                <button type="button" className="btn btn--text" onClick={() => setConfirming(true)}>Clear order history</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

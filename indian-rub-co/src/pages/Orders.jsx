import { useState } from 'react';
import { Link } from 'react-router-dom';
import { clearOrders, getOrders, ORDER_STAGES, stageIndex } from '../lib/orders';
import { formatINR } from '../lib/pricing';
import DemoNotice from '../components/DemoNotice';

export default function Orders() {
  const [orders, setOrders] = useState(() => getOrders());
  const [confirming, setConfirming] = useState(false);

  const onClear = () => {
    clearOrders();
    setOrders([]);
    setConfirming(false);
  };

  return (
    <div className="page">
      <div className="container narrow">
        <div className="page-head page-head--flush">
          <p className="eyebrow">Demonstration only</p>
          <h1 className="page-title">My demo orders</h1>
        </div>

        <DemoNotice>
          These orders are stored only in <strong>this browser</strong>. Classmates or teachers viewing the site on their own
          devices will see their own (or no) demo orders. There is no shared online order database.
        </DemoNotice>

        {orders.length === 0 ? (
          <div className="empty center">
            <h2>No demo orders yet</h2>
            <p>Add a rub to your cart and complete the demo checkout to see an order here.</p>
            <Link to="/shop" className="btn btn--primary">Start shopping</Link>
          </div>
        ) : (
          <>
            <ul className="orders">
              {orders.map((o) => {
                const stage = ORDER_STAGES[stageIndex(o)];
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
                  <span>Delete all demo orders from this browser?</span>
                  <button type="button" className="btn btn--primary btn--small" onClick={onClear}>Yes, clear</button>
                  <button type="button" className="btn btn--text" onClick={() => setConfirming(false)}>Cancel</button>
                </div>
              ) : (
                <button type="button" className="btn btn--text" onClick={() => setConfirming(true)}>Clear demo order history</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

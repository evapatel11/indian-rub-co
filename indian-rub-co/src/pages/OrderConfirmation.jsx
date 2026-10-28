import { Link, useParams } from 'react-router-dom';
import { getOrder } from '../lib/orders';
import { formatINR } from '../lib/pricing';
import OrderSummary from '../components/OrderSummary';
import OrderStatus from '../components/OrderStatus';
import DemoNotice from '../components/DemoNotice';
import { CheckIcon } from '../components/Icons';

export default function OrderConfirmation() {
  const { id } = useParams();
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="page">
        <div className="container narrow center empty empty--page">
          <h1 className="page-title">Demo order not found</h1>
          <p>Demo orders live only in the browser where they were placed. If you cleared your browser data or are on another device, it won&rsquo;t appear here.</p>
          <Link to="/orders" className="btn btn--primary">View my demo orders</Link>
        </div>
      </div>
    );
  }

  const placed = new Date(order.createdAt);

  return (
    <div className="page">
      <div className="container narrow">
        <div className="confirm">
          <span className="confirm__badge"><CheckIcon width={30} height={30} /></span>
          <p className="eyebrow">Demonstration only</p>
          <h1 className="page-title">Demo order placed</h1>
          <p className="confirm__id">Reference <strong>{order.id}</strong></p>
          <p>
            Thanks, {order.customer.name.split(' ')[0]}. This simulated order has been saved in your browser. <strong>No purchase
            has taken place</strong>: nothing was charged and nothing will be delivered.
          </p>
        </div>

        <DemoNotice>
          This order exists only in this browser&rsquo;s local storage. It is not in any shared database, and no email or SMS
          has been sent to {order.customer.email}.
        </DemoNotice>

        <div className="confirm__grid">
          <section className="panel">
            <h2 className="panel__title">Status</h2>
            <OrderStatus order={order} />
          </section>

          <section className="panel">
            <h2 className="panel__title">Deliver to (sample)</h2>
            <address>
              {order.customer.name}<br />
              {order.customer.address}<br />
              {order.customer.city}, {order.customer.state} {order.customer.pincode}<br />
              {order.customer.phone}
            </address>
            <p className="fine">Placed {placed.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
          </section>
        </div>

        <section className="panel">
          <h2 className="panel__title">Items</h2>
          <ul className="order-items">
            {order.items.map((i) => (
              <li key={i.id}>
                <img src={i.imageSmall} alt="" width="56" height="66" />
                <span>{i.name} <span className="fine">· {i.weight} × {i.qty}</span></span>
                <span>{formatINR(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <OrderSummary totals={order.totals} title="Demo totals" couponCode={order.totals.coupon} />
        </section>

        <div className="center btn-row">
          <Link to="/orders" className="btn btn--primary">View all demo orders</Link>
          <Link to="/shop" className="btn btn--ghost">Back to the shop</Link>
        </div>
      </div>
    </div>
  );
}

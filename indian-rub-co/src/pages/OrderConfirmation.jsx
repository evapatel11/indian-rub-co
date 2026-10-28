import { Link, useParams } from 'react-router-dom';
import { getOrder } from '../lib/orders';
import { formatINR } from '../lib/pricing';
import { BUSINESS } from '../data/business';
import OrderSummary from '../components/OrderSummary';
import OrderStatus from '../components/OrderStatus';
import { CheckIcon } from '../components/Icons';

export default function OrderConfirmation() {
  const { id } = useParams();
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="page">
        <div className="container narrow center empty empty--page">
          <h1 className="page-title">We couldn&rsquo;t find that order</h1>
          <p>Please check your order number, or view your recent orders.</p>
          <div className="btn-row">
            <Link to="/orders" className="btn btn--primary">My Orders</Link>
            <Link to="/contact" className="btn btn--ghost">Contact us</Link>
          </div>
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
          <p className="eyebrow">Order Confirmed</p>
          <h1 className="page-title">Thank you for choosing The Indian Rub Co.!</h1>
          <p className="confirm__id">Order number <strong>{order.id}</strong></p>
          <p>
            Thanks, {order.customer.name.split(' ')[0]}. We&rsquo;ve received your order. Please keep your order number handy if
            you need to get in touch with us.
          </p>
        </div>

        <div className="confirm__grid">
          <section className="panel">
            <h2 className="panel__title">Order status</h2>
            <OrderStatus />
            <p className="fine">Placed {placed.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
          </section>

          <section className="panel">
            <h2 className="panel__title">Delivering to</h2>
            <address>
              {order.customer.name}<br />
              {order.customer.address}<br />
              {order.customer.city}, {order.customer.state} {order.customer.pincode}<br />
              {order.customer.phone}
            </address>
            <p className="fine">Payment: {order.payment ?? 'Cash on Delivery'}</p>
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
          <OrderSummary totals={order.totals} couponCode={order.totals.coupon} />
        </section>

        <p className="center confirm__help">
          Questions about your order? Call <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a> or email{' '}
          <a href={BUSINESS.emailHref}>{BUSINESS.email}</a>.
        </p>

        <div className="center btn-row">
          <Link to="/shop" className="btn btn--primary">Continue Shopping</Link>
          <Link to="/orders" className="btn btn--ghost">View My Orders</Link>
        </div>
      </div>
    </div>
  );
}

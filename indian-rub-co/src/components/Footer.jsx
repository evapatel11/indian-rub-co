import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ContactList from './ContactList';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/images/logo-full-light.webp" alt="The Indian Rub Co." width="200" height="137" loading="lazy" />
          <p className="footer__tag">Rub. Cook. Enjoy.</p>
          <p>
            Ready-to-use dry rubs that bring India&rsquo;s regional spice heritage to the grill, the air fryer, the oven and the pan.
          </p>
        </div>
        <div>
          <h2 className="footer__head">Our Rubs</h2>
          <ul>
            {products.map((p) => (
              <li key={p.id}><Link to={`/product/${p.slug}`}>{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer__head">Quick Links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop All</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer__head">Contact Us</h2>
          <ContactList className="contact-list--footer" />
        </div>
      </div>
      <div className="container footer__base">
        <span>© {YEAR} The Indian Rub Co. All rights reserved.</span>
        <span>Rub. Cook. Enjoy.</span>
      </div>
    </footer>
  );
}

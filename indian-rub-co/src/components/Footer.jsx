import { Link } from 'react-router-dom';
import { products } from '../data/products';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/images/logo-full-light.webp" alt="The Indian Rub Co." width="200" height="137" loading="lazy" />
          <p className="footer__tag">Rub. Cook. Enjoy.</p>
        </div>
        <div>
          <h2 className="footer__head">The rubs</h2>
          <ul>
            {products.map((p) => (
              <li key={p.id}><Link to={`/product/${p.slug}`}>{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer__head">Explore</h2>
          <ul>
            <li><Link to="/shop">Shop all</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/about">Our story</Link></li>
            <li><Link to="/orders">My demo orders</Link></li>
          </ul>
        </div>
        <div className="footer__disclaimer">
          <h2 className="footer__head">About this site</h2>
          <p>
            A college entrepreneurship project by Group B3. This is a demonstration storefront, not a live shop.
            No products are sold, no payments are taken and no order is sent anywhere.
          </p>
          <p>Your cart and demo orders are stored only in this browser&rsquo;s local storage and are not shared online.</p>
        </div>
      </div>
      <div className="container footer__base">
        <span>© {YEAR} The Indian Rub Co. · Student demo project</span>
        <span>Product descriptions and ingredient lists are concept formulations.</span>
      </div>
    </footer>
  );
}

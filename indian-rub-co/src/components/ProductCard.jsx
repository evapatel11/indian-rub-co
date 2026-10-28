import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/pricing';
import HeatMeter from './HeatMeter';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <article className={`card card--${product.accent}`}>
      <Link to={`/product/${product.slug}`} className="card__media" aria-label={`View ${product.name}`}>
        <img src={product.imageSmall} alt={`${product.name} dry rub pouch, ${product.weight}`} loading="lazy" width="560" height="663" />
      </Link>
      <div className="card__body">
        <p className="eyebrow">{product.region}</p>
        <h3 className="card__title">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="card__tagline">{product.tagline}</p>
        <div className="card__row">
          <HeatMeter level={product.heat} />
          <p className="price">
            {formatINR(product.price)} <span className="price__unit">/ {product.weight}</span>
          </p>
        </div>
        <div className="card__actions">
          <Link to={`/product/${product.slug}`} className="btn btn--outline btn--small">View Product</Link>
          <button type="button" className="btn btn--small" onClick={() => addItem(product.id)} aria-label={`Add ${product.name} to cart`}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

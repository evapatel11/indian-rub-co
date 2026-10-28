import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, products } from '../data/products';
import { recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';
import { formatINR, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../lib/pricing';
import HeatMeter from '../components/HeatMeter';
import QuantityStepper from '../components/QuantityStepper';
import ProductCard from '../components/ProductCard';
import RecipeCard from '../components/RecipeCard';
import ProductReviews from '../components/ProductReviews';
import { Stars } from '../components/Stars';
import { getReviews, summarise } from '../lib/reviews';
import NotFound from './NotFound';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  const { addItem, MAX_QTY } = useCart();
  const [qty, setQty] = useState(1);
  const [, refreshRating] = useState(0);

  if (!product) return <NotFound />;

  const recipe = recipes.find((r) => r.product === product.id);
  const rating = summarise(getReviews(product.id));
  const others = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="page">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span aria-hidden="true">/</span> <Link to="/shop">Shop</Link> <span aria-hidden="true">/</span>{' '}
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className={`pdp pdp--${product.accent}`} key={product.id}>
          <div className="pdp__media">
            <img src={product.image} alt={`${product.name} gourmet dry rub and seasoning pouch, ${product.weight}`} width="1100" height="1331" />
          </div>

          <div className="pdp__info">
            <p className="eyebrow">{product.region}</p>
            <h1 className="pdp__title">{product.name}</h1>
            <p className="pdp__tagline">{product.tagline}</p>
            <a href="#reviews" className="pdp__rating">
              {rating.count ? (
                <><Stars value={rating.average} size={16} /> <span>{rating.average.toFixed(1)} · {rating.count} {rating.count === 1 ? 'review' : 'reviews'}</span></>
              ) : (
                <><Stars value={0} size={16} label="No ratings yet" /> <span>Be the first to review</span></>
              )}
            </a>

            <div className="pdp__meta">
              <HeatMeter level={product.heat} size="lg" />
              <ul className="tags" aria-label="Flavour notes">
                {product.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>

            <p className="pdp__price">
              {formatINR(product.price)} <span className="price__unit">/ {product.weight} pouch</span>
            </p>

            <div className="pdp__buy">
              <QuantityStepper value={qty} onChange={setQty} max={MAX_QTY} />
              <button type="button" className="btn btn--primary btn--grow" onClick={() => { addItem(product.id, qty); setQty(1); }}>
                Add {qty > 1 ? `${qty} ` : ''}to cart · {formatINR(product.price * qty)}
              </button>
            </div>
            <p className="fine">
              Free shipping on orders of {formatINR(FREE_SHIPPING_THRESHOLD)} or more, otherwise {formatINR(SHIPPING_FEE)}. Pay on delivery.
            </p>

            <p className="pdp__desc">{product.description}</p>

            <div className="pdp__specs">
              <div>
                <h2>Best for</h2>
                <p>{product.bestFor.join(' · ')}</p>
              </div>
              <div>
                <h2>Cook it</h2>
                <p>{product.methods.join(' · ')}</p>
              </div>
            </div>

            <details className="accordion" open>
              <summary>How to use</summary>
              <p>{product.usage}</p>
            </details>
            <details className="accordion">
              <summary>Ingredients</summary>
              <p>{product.ingredients.join(', ')}.</p>
            </details>
            <details className="accordion">
              <summary>Storage</summary>
              <p>Reseal the pouch after use. Store in a cool, dry place away from sunlight.</p>
            </details>
          </div>
        </div>

        <ProductReviews product={product} key={`reviews-${product.id}`} onAdded={() => refreshRating((n) => n + 1)} />

        {recipe && (
          <section className="section section--tight">
            <h2 className="section__title section__title--sm">Cook this with {product.name}</h2>
            <div className="grid grid--one-wide">
              <RecipeCard recipe={recipe} />
            </div>
          </section>
        )}

        <section className="section section--tight">
          <h2 className="section__title section__title--sm">You might also like</h2>
          <div className="grid grid--three">
            {others.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

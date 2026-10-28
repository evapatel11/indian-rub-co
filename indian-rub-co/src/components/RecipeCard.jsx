import { Link } from 'react-router-dom';
import { getProduct } from '../data/products';
import { ClockIcon } from './Icons';

export default function RecipeCard({ recipe }) {
  const product = getProduct(recipe.product);
  return (
    <Link to={`/recipes/${recipe.slug}`} className={`recipe-card recipe-card--${product.accent}`}>
      <div className="recipe-card__art" aria-hidden="true">
        <span className="recipe-card__method">{recipe.method}</span>
        <img src={product.imageSmall} alt="" loading="lazy" width="560" height="663" />
      </div>
      <div className="recipe-card__body">
        <p className="eyebrow">With {product.name}</p>
        <h3>{recipe.title}</h3>
        <p>{recipe.summary}</p>
        <p className="recipe-card__meta"><ClockIcon width={16} height={16} /> {recipe.time} · Serves {recipe.serves}</p>
      </div>
    </Link>
  );
}

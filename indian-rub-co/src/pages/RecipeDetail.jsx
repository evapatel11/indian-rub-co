import { Link, useParams } from 'react-router-dom';
import { getRecipe } from '../data/recipes';
import { getProduct } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/pricing';
import { ClockIcon } from '../components/Icons';
import NotFound from './NotFound';

export default function RecipeDetail() {
  const { slug } = useParams();
  const recipe = getRecipe(slug);
  const { addItem } = useCart();
  if (!recipe) return <NotFound />;
  const product = getProduct(recipe.product);

  return (
    <div className="page">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span aria-hidden="true">/</span> <Link to="/recipes">Recipes</Link> <span aria-hidden="true">/</span>{' '}
          <span aria-current="page">{recipe.title}</span>
        </nav>

        <article className="recipe">
          <header className="recipe__head">
            <p className="eyebrow">{recipe.method} · With {product.name}</p>
            <h1 className="page-title">{recipe.title}</h1>
            <p className="section__lede">{recipe.summary}</p>
            <p className="recipe__meta"><ClockIcon width={18} height={18} /> {recipe.time} <span>·</span> Serves {recipe.serves}</p>
          </header>

          <div className="recipe__grid">
            <section className="panel">
              <h2 className="panel__title">Ingredients</h2>
              <ul className="ticks">
                {recipe.ingredients.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </section>
            <section className="recipe__method">
              <h2 className="panel__title">Method</h2>
              <ol className="method">
                {recipe.steps.map((s, i) => <li key={i}><span>{i + 1}</span><p>{s}</p></li>)}
              </ol>
            </section>
          </div>

          <aside className={`recipe__product recipe__product--${product.accent}`}>
            <img src={product.imageSmall} alt={`${product.name} pouch`} width="160" height="190" loading="lazy" />
            <div>
              <p className="eyebrow">The rub in this recipe</p>
              <h2>{product.name}</h2>
              <p>{product.tagline}</p>
              <div className="btn-row">
                <button type="button" className="btn btn--primary" onClick={() => addItem(product.id)}>Add to cart · {formatINR(product.price)}</button>
                <Link to={`/product/${product.slug}`} className="btn btn--ghost">View rub</Link>
              </div>
            </div>
          </aside>
        </article>
      </div>
    </div>
  );
}

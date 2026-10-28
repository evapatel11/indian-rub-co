import { useState } from 'react';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import Reveal from '../components/Reveal';

const METHODS = ['All', ...new Set(recipes.map((r) => r.method))];

export default function Recipes() {
  const [method, setMethod] = useState('All');
  const list = method === 'All' ? recipes : recipes.filter((r) => r.method === method);

  return (
    <div className="page">
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Recipes</p>
          <h1 className="page-title">Rub it. Cook it. Here&rsquo;s how.</h1>
          <p className="section__lede">Quick, protein-friendly recipes built around each rub. Most take under 30 minutes.</p>
          <div className="chips mt-md" role="group" aria-label="Filter recipes by cooking method">
            {METHODS.map((m) => (
              <button key={m} type="button" className={`chip ${method === m ? 'is-active' : ''}`} aria-pressed={method === m} onClick={() => setMethod(m)}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="container">
        <div className="grid grid--two">
          {list.map((r, i) => (
            <Reveal key={r.slug} delay={i * 70}>
              <RecipeCard recipe={r} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

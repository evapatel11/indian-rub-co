import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, PROTEINS, METHODS, HEAT_LABELS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { SearchIcon } from '../components/Icons';

const HEAT_GROUPS = [
  { value: 'mild', label: 'Mild to gentle', test: (h) => h <= 2 },
  { value: 'medium', label: 'Medium', test: (h) => h === 3 },
  { value: 'hot', label: 'Hot to extra hot', test: (h) => h >= 4 },
];

const SORTS = {
  featured: { label: 'Featured', fn: () => 0 },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  'heat-asc': { label: 'Heat: mildest first', fn: (a, b) => a.heat - b.heat },
  'heat-desc': { label: 'Heat: hottest first', fn: (a, b) => b.heat - a.heat },
};

export default function Shop() {
  // Filters live in the URL (?q=&heat=&for=&method=&sort=) so they survive refresh and can be shared.
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const heat = params.get('heat') ?? '';
  const forWhat = params.get('for') ?? '';
  const method = params.get('method') ?? '';
  const sort = params.get('sort') ?? 'featured';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products
      .filter((p) => {
        if (term) {
          const hay = [p.name, p.tagline, p.region, p.description, HEAT_LABELS[p.heat], ...p.notes, ...p.bestFor, ...p.methods, ...p.ingredients]
            .join(' ')
            .toLowerCase();
          if (!term.split(/\s+/).every((t) => hay.includes(t))) return false;
        }
        if (heat && !HEAT_GROUPS.find((g) => g.value === heat)?.test(p.heat)) return false;
        if (forWhat && !p.bestFor.includes(forWhat)) return false;
        if (method && !p.methods.includes(method)) return false;
        return true;
      })
      .sort(SORTS[sort]?.fn ?? SORTS.featured.fn);
  }, [q, heat, forWhat, method, sort]);

  const activeCount = [q, heat, forWhat, method].filter(Boolean).length;

  return (
    <div className="page">
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Shop</p>
          <h1 className="page-title">All rubs</h1>
          <p className="section__lede">Filter by heat, by what you&rsquo;re cooking, or by how you&rsquo;re cooking it.</p>
        </div>
      </section>

      <div className="container shop">
        <aside className="filters" aria-label="Product filters">
          <div className="search">
            <label htmlFor="shop-search" className="sr-only">Search products</label>
            <SearchIcon width={18} height={18} />
            <input id="shop-search" type="search" placeholder="Search by name, spice or protein" value={q} onChange={(e) => update('q', e.target.value)} />
          </div>

          <fieldset className="filter-group">
            <legend>Heat level</legend>
            <div className="chips">
              <button type="button" className={`chip ${!heat ? 'is-active' : ''}`} aria-pressed={!heat} onClick={() => update('heat', '')}>Any</button>
              {HEAT_GROUPS.map((g) => (
                <button type="button" key={g.value} className={`chip ${heat === g.value ? 'is-active' : ''}`} aria-pressed={heat === g.value} onClick={() => update('heat', heat === g.value ? '' : g.value)}>
                  {g.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="filter-group">
            <legend>Best for</legend>
            <div className="chips">
              {PROTEINS.map((p) => (
                <button type="button" key={p} className={`chip ${forWhat === p ? 'is-active' : ''}`} aria-pressed={forWhat === p} onClick={() => update('for', forWhat === p ? '' : p)}>
                  {p}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="filter-group">
            <legend>Cooking method</legend>
            <div className="chips">
              {METHODS.map((m) => (
                <button type="button" key={m} className={`chip ${method === m ? 'is-active' : ''}`} aria-pressed={method === m} onClick={() => update('method', method === m ? '' : m)}>
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          {activeCount > 0 && (
            <button type="button" className="btn btn--text" onClick={() => setParams({}, { replace: true })}>
              Clear all filters
            </button>
          )}
        </aside>

        <section className="shop__results" aria-label="Products">
          <div className="shop__bar">
            <p aria-live="polite">
              {results.length} {results.length === 1 ? 'rub' : 'rubs'}
              {q && <> matching &ldquo;{q}&rdquo;</>}
            </p>
            <label className="select">
              <span>Sort</span>
              <select value={sort} onChange={(e) => update('sort', e.target.value === 'featured' ? '' : e.target.value)}>
                {Object.entries(SORTS).map(([k, s]) => (
                  <option key={k} value={k}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>

          {results.length ? (
            <div className="grid grid--shop">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="empty">
              <h2>No rubs match those filters</h2>
              <p>Try a different search, or clear the filters to see the full range.</p>
              <button type="button" className="btn btn--primary" onClick={() => setParams({}, { replace: true })}>Show all rubs</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

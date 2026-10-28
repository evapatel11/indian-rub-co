import { Link } from 'react-router-dom';
import { products, getProduct } from '../data/products';
import { getAllReviews } from '../lib/reviews';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { Stars } from '../components/Stars';
import { ArrowIcon } from '../components/Icons';

const STEPS = [
  { n: '01', word: 'Rub.', text: 'Sprinkle a spoonful over chicken, paneer, fish or vegetables. No measuring, no mixing six jars.' },
  { n: '02', word: 'Cook.', text: 'Grill it, air fry it, roast it or sear it in a pan. Every rub is built for dry, high-heat cooking.' },
  { n: '03', word: 'Enjoy.', text: 'Regional Indian flavour on everyday meals, from weeknight protein bowls to weekend barbecues.' },
];

const ORIGINS = [
  { name: 'Kashmir Valley', spice: 'Kashmiri chilli', note: 'Prized for colour over heat', slug: 'kashmiri-smoked-chilli' },
  { name: 'Northeast India', spice: 'Bhut Jolokia', note: 'The legendary ghost pepper', slug: 'bhut-jolokia-fire' },
  { name: 'Malabar Coast', spice: 'Black pepper', note: 'The original spice trade', slug: 'malabar-pepper' },
  { name: 'North India', spice: 'Tandoori blend', note: 'Clay-oven char and smoke', slug: 'smoky-tandoori' },
];

const WHY = [
  { title: 'Flavour', text: 'Each blend is built around one signature regional ingredient, balanced so it tastes of India, not just of heat.' },
  { title: 'Convenience', text: 'One pouch replaces a row of spice jars. Rub it on, rest a few minutes, cook.' },
  { title: 'Versatility', text: 'Chicken, paneer, fish, meat or vegetables. Grill, air fryer, oven or pan. One rub, many meals.' },
  { title: 'Inspiration', text: 'Rooted in the kitchens of Kashmir, the Northeast, the Malabar Coast and the North Indian tandoor.' },
];

const METHODS = [
  { method: 'Grilling', idea: 'Paneer and vegetable skewers with tikka-style char.', product: 'smoky-tandoori', link: '/recipes/smoky-tandoori-paneer-skewers', big: true },
  { method: 'BBQ', idea: 'Sticky, charred wings for the heat seekers.', product: 'bhut-jolokia-fire', link: '/recipes/bhut-jolokia-fire-wings' },
  { method: 'Roasting', idea: 'Oven-roasted mushrooms, potatoes and cauliflower with a peppery crust.', product: 'malabar-pepper', link: '/product/malabar-pepper' },
  { method: 'Air frying', idea: 'Glossy red chicken tikka in under 30 minutes.', product: 'kashmiri-smoked-chilli', link: '/recipes/air-fryer-kashmiri-chicken-tikka' },
  { method: 'Pan cooking', idea: 'A crisp, aromatic pepper crust on firm white fish.', product: 'malabar-pepper', link: '/recipes/malabar-pepper-crusted-fish' },
];

export default function Home() {
  const [kashmiri, bhut, malabar] = products;
  const latestReviews = getAllReviews()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--gold">Gourmet Indian dry rubs</p>
            <h1 className="hero__title">
              Rub. <em>Cook.</em> Enjoy.
            </h1>
            <p className="hero__lede">
              India&rsquo;s regional spice heritage, blended into ready-to-use rubs for the grill, the air fryer, the oven and the pan.
              Bold flavour for everyday cooking, no marinade jar required.
            </p>
            <div className="hero__ctas">
              <Link to="/shop" className="btn btn--primary">Shop Now <ArrowIcon width={18} height={18} /></Link>
              <a href="#flavours" className="btn btn--ghost">Explore Our Flavours</a>
            </div>
            <ul className="hero__facts">
              <li><strong>4</strong> regional rubs</li>
              <li><strong>250 g</strong> resealable pouch</li>
              <li><strong>1 tbsp</strong> per 250 g</li>
            </ul>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__glow" />
            <img className="hero__pack hero__pack--back-l" src={malabar.imageSmall} alt="" width="560" height="657" />
            <img className="hero__pack hero__pack--front" src={kashmiri.image} alt="" width="1100" height="1331" fetchPriority="high" />
            <img className="hero__pack hero__pack--side" src={bhut.imageSmall} alt="" width="560" height="655" />
          </div>
        </div>
      </section>

      {/* Methods marquee */}
      <div className="marquee" aria-label="Made for grill, air fryer, oven, pan and barbecue">
        <div className="marquee__track" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>Grill <i>✦</i> Air fryer <i>✦</i> Oven <i>✦</i> Pan <i>✦</i> BBQ <i>✦</i> Chicken <i>✦</i> Paneer <i>✦</i> Fish <i>✦</i> Vegetables <i>✦</i>&nbsp;</span>
          ))}
        </div>
      </div>

      {/* Featured products */}
      <section className="section" id="flavours">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Our flavours</p>
            <h2 className="section__title">Four regions. Four rubs.</h2>
            <p className="section__lede">Each blend starts with one signature Indian ingredient and is balanced for dry, high-heat cooking.</p>
          </Reveal>
          <div className="grid grid--products">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flavour philosophy */}
      <section className="section section--paper">
        <div className="container origins">
          <Reveal className="origins__intro">
            <p className="eyebrow">Our flavour philosophy</p>
            <h2 className="section__title">Regional Indian spice, made for modern cooking.</h2>
            <p>
              Traditional masalas are built for particular dishes. Most barbecue rubs are built for Western flavours. We take
              India&rsquo;s best-loved regional ingredients and blend them into dry rubs that work wherever, and however, you cook.
            </p>
            <Link to="/about" className="link-arrow">Our story <ArrowIcon width={16} height={16} /></Link>
          </Reveal>
          <ul className="origins__list">
            {ORIGINS.map((o, i) => (
              <Reveal as="li" key={o.name} delay={i * 70}>
                <Link to={`/product/${o.slug}`} className="origin">
                  <span className="origin__n">0{i + 1}</span>
                  <span className="origin__name">{o.name}</span>
                  <span className="origin__spice">{o.spice}</span>
                  <span className="origin__note">{o.note}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section section--green">
        <div className="container">
          <Reveal className="section__head section__head--light">
            <p className="eyebrow eyebrow--gold">Why choose us</p>
            <h2 className="section__title">Simple meals that never taste the same twice.</h2>
          </Reveal>
          <div className="grid grid--four">
            {WHY.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="audience">
                <span className="audience__n">0{i + 1}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section--burgundy">
        <div className="container">
          <Reveal className="section__head section__head--light">
            <p className="eyebrow eyebrow--gold">How it works</p>
            <h2 className="section__title">Three steps. No marinade jar.</h2>
          </Reveal>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 100} className="step">
                <span className="step__n">{s.n}</span>
                <h3 className="step__word">{s.word}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Cooking inspiration */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head section__head--row">
            <div>
              <p className="eyebrow">Cooking inspiration</p>
              <h2 className="section__title">However you cook, there&rsquo;s a rub for it.</h2>
            </div>
            <Link to="/recipes" className="link-arrow">All recipes <ArrowIcon width={16} height={16} /></Link>
          </Reveal>
          <div className="bento">
            {METHODS.map((m, i) => {
              const p = getProduct(m.product);
              return (
                <Reveal key={m.method} delay={i * 70} className={`bento__item bento__item--${p.accent} ${m.big ? 'bento__item--big' : ''}`}>
                  <Link to={m.link} className="bento__link">
                    <span className="bento__n">0{i + 1}</span>
                    <h3 className="bento__method">{m.method}</h3>
                    <p className="bento__idea">{m.idea}</p>
                    <span className="bento__rub">Try with {p.name} <ArrowIcon width={15} height={15} /></span>
                    <img src={p.imageSmall} alt="" loading="lazy" width="560" height="663" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <section className="section section--paper">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Customer reviews</p>
            <h2 className="section__title">What our customers say</h2>
          </Reveal>
          {latestReviews.length ? (
            <div className="grid grid--three">
              {latestReviews.map((r) => {
                const p = getProduct(r.productId);
                return (
                  <Reveal key={r.id} className="quote">
                    <Stars value={r.rating} size={16} label={`Rated ${r.rating} out of 5`} />
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                    <p className="quote__by"><strong>{r.name}</strong> on <Link to={`/product/${p.slug}#reviews`}>{p.name}</Link></p>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal className="reviews__empty reviews__empty--wide">
              <Stars value={0} size={26} label="No ratings yet" />
              <h3>Be the first to share your thoughts</h3>
              <p>Tried one of our rubs? Leave a review on the product page and help other home cooks find their flavour.</p>
              <div className="btn-row">
                {products.map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}#reviews`} className="chip">{p.name}</Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Call to action */}
      <section className="cta">
        <div className="container cta__inner">
          <Reveal>
            <p className="eyebrow eyebrow--gold">Find your flavour</p>
            <h2 className="section__title">Bring India&rsquo;s regions to your next meal.</h2>
            <p className="section__lede section__lede--light">From gentle Kashmiri warmth to Bhut Jolokia fire, explore the full collection.</p>
            <div className="btn-row btn-row--start mt-lg">
              <Link to="/shop" className="btn btn--light">Shop the Collection <ArrowIcon width={18} height={18} /></Link>
              <Link to="/recipes" className="btn btn--ghost-light">Browse Recipes</Link>
            </div>
          </Reveal>
          <div className="cta__packs" aria-hidden="true">
            {products.map((p) => <img key={p.id} src={p.imageSmall} alt="" loading="lazy" width="560" height="663" />)}
          </div>
        </div>
      </section>
    </>
  );
}

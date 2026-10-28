import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { recipes } from '../data/recipes';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import RecipeCard from '../components/RecipeCard';
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

const AUDIENCES = [
  { title: 'High-protein eaters', text: 'Make the same grilled chicken, fish and paneer taste different every night.' },
  { title: 'Air fryer cooks', text: 'Big flavour with a teaspoon of oil, not a curry-style masala.' },
  { title: 'Weekend grillers', text: 'Tikka-style char on the balcony grill or the farmhouse barbecue.' },
  { title: 'Vegetarian kitchens', text: 'Paneer, mushrooms, cauliflower and corn love every rub in the range.' },
];

export default function Home() {
  const [hero1, hero2, hero3, hero4] = products;
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
              India&rsquo;s regional spice heritage, blended into ready-to-use rubs for the grill, the air fryer, the oven
              and the pan.
            </p>
            <div className="hero__ctas">
              <Link to="/shop" className="btn btn--primary">Shop the collection <ArrowIcon width={18} height={18} /></Link>
              <Link to="/recipes" className="btn btn--ghost">Find a recipe</Link>
            </div>
            <ul className="hero__facts">
              <li><strong>4</strong> regional rubs</li>
              <li><strong>250 g</strong> resealable pouch</li>
              <li><strong>1 tbsp</strong> per 250 g</li>
            </ul>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__glow" />
            <img className="hero__pack hero__pack--back-l" src={hero3.imageSmall} alt="" width="560" height="657" />
            <img className="hero__pack hero__pack--back-r" src={hero4.imageSmall} alt="" width="560" height="663" />
            <img className="hero__pack hero__pack--front" src={hero1.image} alt="" width="1100" height="1331" fetchPriority="high" />
            <img className="hero__pack hero__pack--side" src={hero2.imageSmall} alt="" width="560" height="655" />
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

      {/* Collection */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">The collection</p>
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
          <div className="center mt-lg">
            <Link to="/shop" className="link-arrow">Compare all rubs <ArrowIcon width={16} height={16} /></Link>
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

      {/* Origins */}
      <section className="section">
        <div className="container origins">
          <Reveal className="origins__intro">
            <p className="eyebrow">Regional heritage</p>
            <h2 className="section__title">A spice map of India, one pouch at a time.</h2>
            <p>
              Traditional masalas are built for particular dishes. Most barbecue rubs are built for Western flavours. We
              take India&rsquo;s best-known regional ingredients and put them in a format made for modern cooking.
            </p>
            <Link to="/about" className="link-arrow">Read our story <ArrowIcon width={16} height={16} /></Link>
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

      {/* Audiences */}
      <section className="section section--green">
        <div className="container">
          <Reveal className="section__head section__head--light">
            <p className="eyebrow eyebrow--gold">Made for</p>
            <h2 className="section__title">Simple meals that never taste the same twice.</h2>
          </Reveal>
          <div className="grid grid--four">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.title} delay={i * 80} className="audience">
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head section__head--row">
            <div>
              <p className="eyebrow">From the kitchen</p>
              <h2 className="section__title">Recipes to start with</h2>
            </div>
            <Link to="/recipes" className="link-arrow">All recipes <ArrowIcon width={16} height={16} /></Link>
          </Reveal>
          <div className="grid grid--three">
            {recipes.slice(0, 3).map((r, i) => (
              <Reveal key={r.slug} delay={i * 80}>
                <RecipeCard recipe={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { products } from '../data/products';
import { ArrowIcon } from '../components/Icons';

const COMPARE = [
  { now: 'Single spices at home', gap: 'Many jars, measuring and skill', ours: 'One pouch, no measuring' },
  { now: 'Traditional masalas', gap: 'Built for curries and set dishes', ours: 'Made for grill, air fryer, oven and pan' },
  { now: 'Imported BBQ rubs', gap: 'Smoky-sweet Western flavours', ours: 'Indian regional flavours' },
  { now: 'Homemade marinades', gap: 'Needs planning and overnight time', ours: 'Ready in minutes' },
];

const VALUES = [
  { title: 'Regional at heart', text: 'Every rub is built around one ingredient with a sense of place: Kashmir, the Northeast, the Malabar Coast and the North Indian tandoor.' },
  { title: 'Made for modern kitchens', text: 'Dry rubs that work on the grill, in the air fryer, in the oven and in a hot pan, not only in a curry.' },
  { title: 'A focused range', text: 'We started with four flavours we could stand behind rather than a long list. Each one earns its place.' },
];

export default function About() {
  return (
    <div className="page">
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div>
            <p className="eyebrow eyebrow--gold">About Us</p>
            <h1 className="page-title">Making Indian flavour a natural part of modern home cooking.</h1>
            <p className="about-hero__lede">The Indian Rub Co. creates gourmet dry rubs that carry India&rsquo;s regional spice heritage into the way people cook today.</p>
          </div>
          <img src="/images/logo-full-light.webp" alt="" width="360" height="247" />
        </div>
      </section>

      <div className="container narrow prose">
        <Reveal>
          <p className="eyebrow">Our story</p>
          <p className="prose__lead">
            Grilled chicken, seared fish, paneer and roasted vegetables are the backbone of so many weeknight meals. They are also
            easy to get bored of.
          </p>
          <p>
            Mixing a marinade from five or six spices takes time and practice. Traditional Indian masalas are wonderful, but they are
            usually built for particular dishes. Most barbecue rubs, meanwhile, lean on familiar Western flavour profiles.
          </p>
          <p>
            We wanted something in between: the depth of Indian regional spices in a format that is ready the moment you open the
            pouch. So we built a range of dry rubs around Kashmiri chilli, Bhut Jolokia, Malabar pepper and the smoky character of
            the tandoor. Apply, cook however you like, and enjoy. <strong>Rub. Cook. Enjoy.</strong>
          </p>
        </Reveal>
      </div>

      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Our vision</p>
            <h2 className="section__title">To make &ldquo;Indian rub&rdquo; a flavour everyone reaches for.</h2>
          </Reveal>
          <div className="grid grid--three">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="value">
                <span className="value__n">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--green">
        <div className="container">
          <Reveal className="section__head section__head--light">
            <p className="eyebrow eyebrow--gold">The range</p>
            <h2 className="section__title">Four rubs, four regions</h2>
          </Reveal>
          <ul className="range">
            {products.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 70}>
                <Link to={`/product/${p.slug}`} className="range__item">
                  <img src={p.imageSmall} alt="" width="560" height="663" loading="lazy" />
                  <span className="range__region">{p.region}</span>
                  <span className="range__name">{p.name}</span>
                  <span className="range__tag">{p.tagline}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Why a rub</p>
            <h2 className="section__title">Simpler than a marinade. Bolder than a seasoning.</h2>
          </Reveal>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr><th scope="col">What you might use now</th><th scope="col">Where it falls short</th><th scope="col">The Indian Rub Co.</th></tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.now}><th scope="row">{r.now}</th><td>{r.gap}</td><td>{r.ours}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--burgundy">
        <div className="container narrow center">
          <p className="eyebrow eyebrow--gold">Find your flavour</p>
          <h2 className="section__title">From gentle Kashmiri warmth to Northeast fire.</h2>
          <div className="btn-row mt-lg">
            <Link to="/shop" className="btn btn--light">Shop the Collection <ArrowIcon width={18} height={18} /></Link>
            <Link to="/contact" className="btn btn--ghost-light">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

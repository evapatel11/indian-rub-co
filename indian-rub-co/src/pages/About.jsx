import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { ArrowIcon } from '../components/Icons';

const COMPARE = [
  { now: 'Single spices at home', gap: 'Many jars, measuring and skill', ours: 'One pouch, no measuring' },
  { now: 'Traditional masalas', gap: 'Built for curries and set dishes', ours: 'Made for grill, air fryer, oven and pan' },
  { now: 'Imported BBQ rubs', gap: 'Smoky-sweet Western flavours', ours: 'Indian regional flavours' },
  { now: 'Homemade marinades', gap: 'Needs planning and overnight time', ours: 'Ready in minutes' },
];

const TEAM = ['Debjyoti Basu', 'Dhiraj Patil', 'Divyanshu Chadda', 'Eva Patel', 'Harsh Raj', 'Yougantar Dutta'];

export default function About() {
  return (
    <div className="page">
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div>
            <p className="eyebrow eyebrow--gold">Our story</p>
            <h1 className="page-title">Making Indian flavour a normal part of modern home cooking.</h1>
          </div>
          <img src="/images/logo-full-light.webp" alt="" width="360" height="247" />
        </div>
      </section>

      <div className="container narrow prose">
        <Reveal>
          <p className="prose__lead">
            Simple protein meals like grilled chicken, fish, paneer and vegetables get repetitive fast. Mixing a marinade from five
            or six spices takes time and skill. And most of the shortcuts don&rsquo;t quite fit.
          </p>
          <p>
            Traditional Indian masalas are usually built for particular dishes. Most barbecue rubs and seasonings lean on
            conventional international flavour profiles. We saw a gap for a ready-to-use product that combines convenience with
            distinctly Indian regional flavours.
          </p>
          <p>
            The Indian Rub Co. brings ingredients like Kashmiri chilli, Malabar pepper, tandoori spice and Bhut Jolokia into
            the modern dry-rub format. Apply the rub, cook it however you like, and enjoy: <strong>Rub. Cook. Enjoy.</strong>
          </p>
        </Reveal>
      </div>

      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Why a rub</p>
            <h2 className="section__title">What it replaces</h2>
          </Reveal>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr><th scope="col">What people use now</th><th scope="col">Where it falls short</th><th scope="col">The Indian Rub Co.</th></tr>
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

      <section className="section section--green">
        <div className="container narrow center">
          <p className="eyebrow eyebrow--gold">Our commitments</p>
          <h2 className="section__title">Focused range. Consistent batches. Clear labels.</h2>
          <p className="section__lede section__lede--light">
            We start with four strong flavours rather than a long list, and plan for batch testing, traceable sourcing and
            FSSAI-compliant labelling before any real launch.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow center">
          <p className="eyebrow">The team</p>
          <h2 className="section__title section__title--sm">Group B3 · Entrepreneurship project</h2>
          <ul className="team">
            {TEAM.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <p className="fine mt-md">This website is a college demonstration. The Indian Rub Co. is not currently trading.</p>
          <Link to="/shop" className="btn btn--primary mt-md">Explore the rubs <ArrowIcon width={18} height={18} /></Link>
        </div>
      </section>
    </div>
  );
}

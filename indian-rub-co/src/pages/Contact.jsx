import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business';
import ContactList from '../components/ContactList';
import Reveal from '../components/Reveal';

const TOPICS = [
  { title: 'Orders', text: 'Questions about an order you have placed? Share your order number and we will help.' },
  { title: 'Product questions', text: 'Not sure which rub suits your cooking, or how hot Bhut Jolokia Fire really is? Ask away.' },
  { title: 'Bulk & cafés', text: 'Cooking for a café, restaurant or cloud kitchen? Tell us what you need.' },
];

export default function Contact() {
  return (
    <div className="page">
      <section className="page-head">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1 className="page-title">We&rsquo;d love to hear from you</h1>
          <p className="section__lede">Questions about our rubs, your order or cooking with spice? Get in touch.</p>
        </div>
      </section>

      <div className="container contact">
        <Reveal className="contact__card">
          <h2 className="panel__title">Get in touch</h2>
          <ContactList />
          <div className="btn-row btn-row--start mt-md">
            <a href={BUSINESS.emailHref} className="btn btn--primary">Email Us</a>
            <a href={BUSINESS.phoneHref} className="btn btn--ghost">Call Us</a>
          </div>
        </Reveal>

        <div className="contact__topics">
          {TOPICS.map((t, i) => (
            <Reveal key={t.title} delay={i * 80} className="topic">
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </Reveal>
          ))}
          <Reveal delay={260} className="topic topic--cta">
            <h3>Looking for a recipe?</h3>
            <p>Browse quick, protein-friendly ideas for every rub.</p>
            <Link to="/recipes" className="link-arrow">See recipes</Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

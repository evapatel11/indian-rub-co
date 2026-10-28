import { useMemo, useState } from 'react';
import { addReview, getReviews, summarise } from '../lib/reviews';
import { Stars, StarInput } from './Stars';

const EMPTY = { rating: 0, title: '', text: '', name: '' };

function validate(f) {
  const e = {};
  if (!f.rating) e.rating = 'Please choose a star rating.';
  if (f.title.trim().length < 3) e.title = 'Please add a short title.';
  if (f.text.trim().length < 10) e.text = 'Please write at least a sentence about the rub.';
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  return e;
}

export default function ProductReviews({ product, onAdded }) {
  // Remount (via key on the parent) resets this per product, so reviews stay product-specific.
  const [reviews, setReviews] = useState(() => getReviews(product.id));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [thanks, setThanks] = useState('');
  const stats = useMemo(() => summarise(reviews), [reviews]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`r-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    const review = addReview(product.id, form);
    setReviews((r) => [review, ...r]);
    onAdded?.();
    setThanks(`Thank you, ${review.name.split(' ')[0]}! Your review has been added.`);
    setForm(EMPTY);
    setOpen(false);
  };

  const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="reviews__tabs">
        <h2 id="reviews-title">Customer Reviews <span>({stats.count})</span></h2>
      </div>

      <div className="reviews__grid">
        <div className="reviews__summary">
          <p className="reviews__label">Average rating</p>
          {stats.count ? (
            <>
              <p className="reviews__avg">{stats.average.toFixed(2)}</p>
              <Stars value={stats.average} size={22} />
              <p className="reviews__count">{stats.count} {stats.count === 1 ? 'review' : 'reviews'}</p>
            </>
          ) : (
            <>
              <p className="reviews__avg reviews__avg--empty">–</p>
              <Stars value={0} size={22} label="No ratings yet" />
              <p className="reviews__count">No reviews yet</p>
            </>
          )}

          <ul className="bars" aria-label="Rating breakdown">
            {stats.breakdown.map((b) => (
              <li key={b.star}>
                <span>{b.star} star</span>
                <span className="bars__track"><span className="bars__fill" style={{ width: `${b.pct}%` }} /></span>
                <span className="bars__pct">{b.pct}%</span>
              </li>
            ))}
          </ul>

          {!open && (
            <button type="button" className="btn btn--primary" onClick={() => { setOpen(true); setThanks(''); }} aria-controls="review-form">
              Write a Review
            </button>
          )}
        </div>

        <div className="reviews__main">
          {thanks && <p className="reviews__thanks" role="status">{thanks}</p>}

          {open && (
            <form className="review-form" id="review-form" onSubmit={onSubmit} noValidate>
              <h3>Review {product.name}</h3>
              <div className="field">
                <span className="field__label" id="r-rating-label">Your rating</span>
                <div id="r-rating" tabIndex={-1} aria-labelledby="r-rating-label">
                  <StarInput value={form.rating} onChange={(n) => { setForm((f) => ({ ...f, rating: n })); setErrors((er) => ({ ...er, rating: undefined })); }} invalid={!!errors.rating} />
                </div>
                {errors.rating && <p className="field__err">{errors.rating}</p>}
              </div>
              <div className="field">
                <label htmlFor="r-title">Review title</label>
                <input id="r-title" value={form.title} onChange={set('title')} maxLength={80} aria-invalid={!!errors.title} placeholder="Sum it up in a few words" />
                {errors.title && <p className="field__err">{errors.title}</p>}
              </div>
              <div className="field">
                <label htmlFor="r-text">Your review</label>
                <textarea id="r-text" rows={5} value={form.text} onChange={set('text')} maxLength={1000} aria-invalid={!!errors.text} placeholder="What did you cook, and how did it taste?" />
                {errors.text && <p className="field__err">{errors.text}</p>}
              </div>
              <div className="field">
                <label htmlFor="r-name">Name</label>
                <input id="r-name" value={form.name} onChange={set('name')} maxLength={60} autoComplete="name" aria-invalid={!!errors.name} />
                {errors.name && <p className="field__err">{errors.name}</p>}
              </div>
              <div className="btn-row btn-row--start">
                <button type="submit" className="btn btn--primary">Submit Review</button>
                <button type="button" className="btn btn--text" onClick={() => { setOpen(false); setErrors({}); }}>Cancel</button>
              </div>
            </form>
          )}

          {reviews.length ? (
            <ul className="review-list">
              {reviews.map((r) => (
                <li key={r.id} className="review">
                  <span className="review__avatar" aria-hidden="true">{r.name.charAt(0).toUpperCase()}</span>
                  <div>
                    <Stars value={r.rating} size={16} label={`Rated ${r.rating} out of 5`} />
                    <p className="review__meta"><strong>{r.name}</strong> · <time dateTime={r.createdAt}>{fmtDate(r.createdAt)}</time></p>
                    <h3 className="review__title">{r.title}</h3>
                    <p className="review__text">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !open && (
              <div className="reviews__empty">
                <Stars value={0} size={26} label="No ratings yet" />
                <h3>Be the first to review this product</h3>
                <p>Cooked with {product.name}? Tell other home cooks what you made and how it tasted.</p>
                <button type="button" className="btn btn--outline" onClick={() => { setOpen(true); setThanks(''); }}>Write a Review</button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

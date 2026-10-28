// Read-only star display. `value` can be fractional (e.g. 4.5).
export function Stars({ value = 0, size = 16, label }) {
  return (
    <span className="stars" role="img" aria-label={label ?? `${value.toFixed(1)} out of 5 stars`} style={{ '--size': `${size}px` }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, value - (n - 1)));
        return (
          <span key={n} className="star" aria-hidden="true">
            <svg viewBox="0 0 24 24" width={size} height={size}><path className="star__bg" d={STAR} /></svg>
            <span className="star__fill" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 24 24" width={size} height={size}><path d={STAR} /></svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}

// Accessible star picker built on radio buttons.
export function StarInput({ value, onChange, name = 'rating', invalid }) {
  return (
    <div className={`star-input ${invalid ? 'is-invalid' : ''}`} role="radiogroup" aria-label="Your rating" aria-invalid={invalid || undefined}>
      {[1, 2, 3, 4, 5].map((n) => (
        <label key={n} className={n <= value ? 'is-on' : ''}>
          <input type="radio" name={name} value={n} checked={value === n} onChange={() => onChange(n)} className="sr-only" />
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d={STAR} /></svg>
          <span className="sr-only">{n} star{n > 1 ? 's' : ''}</span>
        </label>
      ))}
    </div>
  );
}

const STAR = 'M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3-4.7-4.4 6.4-.8L12 2.8z';

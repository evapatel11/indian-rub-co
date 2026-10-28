import { HEAT_LABELS } from '../data/products';
import { FlameIcon } from './Icons';

export default function HeatMeter({ level, showLabel = true, size = 'sm' }) {
  return (
    <div className={`heat heat--${size}`} role="img" aria-label={`Heat level ${level} of 5: ${HEAT_LABELS[level]}`}>
      <span className="heat__flames" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <FlameIcon key={n} className={n <= level ? 'is-on' : ''} width={size === 'lg' ? 20 : 15} height={size === 'lg' ? 20 : 15} />
        ))}
      </span>
      {showLabel && <span className="heat__label">{HEAT_LABELS[level]}</span>}
    </div>
  );
}

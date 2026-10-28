import { ORDER_STAGES, CURRENT_STAGE } from '../lib/orders';
import { CheckIcon } from './Icons';

export default function OrderStatus() {
  return (
    <ol className="timeline" aria-label="Order status">
      {ORDER_STAGES.map((s, i) => (
        <li key={s.key} className={i < CURRENT_STAGE ? 'is-done' : i === CURRENT_STAGE ? 'is-current' : ''} aria-current={i === CURRENT_STAGE ? 'step' : undefined}>
          <span className="timeline__dot">{i < CURRENT_STAGE && <CheckIcon width={14} height={14} />}</span>
          <span className="timeline__label">{s.label}</span>
        </li>
      ))}
    </ol>
  );
}

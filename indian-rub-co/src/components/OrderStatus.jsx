import { useEffect, useState } from 'react';
import { ORDER_STAGES, stageIndex } from '../lib/orders';
import { CheckIcon } from './Icons';

// Simulated status timeline. Re-checks every 15 seconds so it advances during a demo.
export default function OrderStatus({ order }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(t);
  }, []);
  const current = stageIndex(order, now);

  return (
    <div>
      <ol className="timeline" aria-label="Simulated order status">
        {ORDER_STAGES.map((s, i) => (
          <li key={s.key} className={i < current ? 'is-done' : i === current ? 'is-current' : ''} aria-current={i === current ? 'step' : undefined}>
            <span className="timeline__dot">{i <= current && <CheckIcon width={14} height={14} />}</span>
            <span className="timeline__label">{s.label}</span>
          </li>
        ))}
      </ol>
      <p className="fine">Simulated status: it advances automatically over a few minutes for demonstration. No real shipment exists.</p>
    </div>
  );
}

import { MinusIcon, PlusIcon } from './Icons';

export default function QuantityStepper({ value, onChange, min = 1, max = 10, label = 'Quantity' }) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease ${label.toLowerCase()}`}>
        <MinusIcon width={16} height={16} />
      </button>
      <output aria-live="polite" aria-label={`${label}: ${value}`}>{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase ${label.toLowerCase()}`}>
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  );
}

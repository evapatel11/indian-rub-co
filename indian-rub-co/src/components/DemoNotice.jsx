import { InfoIcon } from './Icons';

// Reusable "this is a demo" disclosure used on cart, checkout and orders.
export default function DemoNotice({ children, tone = 'gold' }) {
  return (
    <div className={`notice notice--${tone}`} role="note">
      <InfoIcon width={18} height={18} />
      <div>{children}</div>
    </div>
  );
}

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckIcon, CloseIcon } from './Icons';

export default function Toast() {
  const { toast, dismissToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(dismissToast, 3200);
    return () => clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {toast && (
        <div className="toast" key={toast.id}>
          <CheckIcon width={18} height={18} />
          <span>{toast.message}</span>
          <Link to="/cart" onClick={dismissToast} className="toast__link">View cart</Link>
          <button type="button" onClick={dismissToast} aria-label="Dismiss notification" className="toast__close">
            <CloseIcon width={16} height={16} />
          </button>
        </div>
      )}
    </div>
  );
}

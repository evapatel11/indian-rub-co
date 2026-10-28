import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to top on route change (React Router does not do this by default).
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
